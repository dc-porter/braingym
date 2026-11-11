// Saves and loads one phone's progress in the bloom_progress table.
//
//   GET  — load:  replies with the saved progress and its version, or
//                 "nothing saved yet" for a phone with no row.
//   GET ?check=1  replies with only the saved version and a fingerprint of
//                 the saved progress, never the progress itself.
//   POST — save:  body { "lastSeenVersion": <number> | "none", "progress": {...} }
//                 and the reply to a successful save carries the fingerprint.
//
// The phone identifies itself in the X-Bloom-Device-Id header, never in the
// address. The raw ID is never stored, logged or echoed: it is scrambled with
// SHA-256 and only that result (device_key) touches the database. Replies
// never carry a secret, host, user name or device ID, and nothing here logs.
const crypto = require("crypto");
const { Client } = require("pg");

const DEVICE_HEADER = "x-bloom-device-id";
const MIN_DEVICE_ID = 16;
const MAX_DEVICE_ID = 200;
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

// The same way api/ping.js finds the connection: settings starting with
// DATABASE whose value is a plain postgres:// address (not prisma://), tried
// unpooled/direct first. Copied rather than shared so ping stays untouched;
// api/setup.js holds the same copy.
function isDirect(value){
  return typeof value === "string" && /^postgres(ql)?:\/\//i.test(value.trim());
}
function candidateSettings(){
  const direct = Object.keys(process.env).filter(function(n){
    return n.indexOf("DATABASE") === 0 && isDirect(process.env[n]);
  });
  const rank = function(n){ return /UNPOOLED|DIRECT|NON_POOLING/i.test(n) ? 0 : 1; };
  direct.sort(function(a, b){ return rank(a) - rank(b) || (a < b ? -1 : a > b ? 1 : 0); });
  return direct;
}

function reply(res, status, body){
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}
function error(res, status, message){
  reply(res, status, { status: "error", message: message });
}
// An error code says what went wrong without carrying a host, user or
// password the way an error's own message can.
function safeCode(err){
  return err && typeof err.code === "string" && /^[A-Za-z0-9_]{2,24}$/.test(err.code) ? err.code : null;
}
function isPlainObject(v){
  return !!v && typeof v === "object" && !Array.isArray(v);
}

// A short fingerprint of a progress object: SHA-256 of its canonical JSON
// (keys sorted, no spaces), cut to 32 hex characters. Canonical so it does
// not depend on key order or on how Postgres re-stores the JSON; the app
// computes it the same way, so the two can be compared.
function canonicalJson(v){
  if(v === null || typeof v !== "object") return JSON.stringify(v);
  if(Array.isArray(v)) return "[" + v.map(canonicalJson).join(",") + "]";
  return "{" + Object.keys(v).sort().map(function(k){ return JSON.stringify(k) + ":" + canonicalJson(v[k]); }).join(",") + "}";
}
function fingerprintOf(progress){
  return crypto.createHash("sha256").update(canonicalJson(progress), "utf8").digest("hex").slice(0, 32);
}

function deviceKeyFrom(req){
  const raw = req.headers[DEVICE_HEADER];
  if(raw === undefined || raw === "") return { error: "Missing device ID. Send it in the X-Bloom-Device-Id header." };
  if(typeof raw !== "string") return { error: "Device ID is not valid." };
  if(raw.length < MIN_DEVICE_ID) return { error: "Device ID is too short." };
  if(raw.length > MAX_DEVICE_ID || !/^[A-Za-z0-9._-]+$/.test(raw)) return { error: "Device ID is not valid." };
  return { key: crypto.createHash("sha256").update(raw, "utf8").digest("hex") };
}

// Reads the request body, stopping as soon as it passes the size limit
// rather than buffering an oversized upload.
function readBody(req){
  return new Promise(function(resolve, reject){
    const declared = Number(req.headers["content-length"]);
    if(declared > MAX_UPLOAD_BYTES) return resolve({ tooLarge: true });
    const chunks = [];
    let size = 0;
    let done = false;
    req.on("data", function(chunk){
      if(done) return;
      size += chunk.length;
      if(size > MAX_UPLOAD_BYTES){
        done = true;
        req.removeAllListeners("data");
        req.resume();
        return resolve({ tooLarge: true });
      }
      chunks.push(chunk);
    });
    req.on("end", function(){ if(!done){ done = true; resolve({ text: Buffer.concat(chunks).toString("utf8") }); } });
    req.on("error", function(e){ if(!done){ done = true; reject(e); } });
  });
}

async function connect(){
  const names = candidateSettings();
  if(!names.length){ const e = new Error("no setting"); e.code = "NO_DATABASE_SETTING"; throw e; }
  let last = null;
  for(let i = 0; i < names.length; i++){
    const client = new Client({
      connectionString: process.env[names[i]],
      connectionTimeoutMillis: 5000,
      query_timeout: 10000
    });
    client.on("error", function(){});
    try{
      await client.connect();
      return client;
    }catch(err){
      last = err;
      try{ await client.end(); }catch(e){ /* already closed */ }
    }
  }
  throw last;
}

async function load(client, deviceKey){
  const r = await client.query("SELECT progress, version FROM bloom_progress WHERE device_key = $1", [deviceKey]);
  if(!r.rows.length) return { status: 200, body: { status: "none", message: "Nothing saved yet." } };
  return { status: 200, body: { status: "ok", version: r.rows[0].version, progress: r.rows[0].progress } };
}

async function check(client, deviceKey){
  const r = await client.query("SELECT progress, version FROM bloom_progress WHERE device_key = $1", [deviceKey]);
  if(!r.rows.length) return { status: 200, body: { status: "none" } };
  // The progress is read here only to fingerprint it; it is not sent back.
  return { status: 200, body: { status: "ok", version: r.rows[0].version, fingerprint: fingerprintOf(r.rows[0].progress) } };
}

async function save(client, deviceKey, lastSeen, progressJson, fingerprint){
  // Each branch decides and writes in ONE statement, so two saves at once
  // can never both win: Postgres serialises them on the row (or the unique
  // device_key), and the loser's condition no longer matches.
  let r;
  if(lastSeen === "none"){
    r = await client.query(
      "INSERT INTO bloom_progress (device_key, progress, version) VALUES ($1, $2::jsonb, 1) " +
      "ON CONFLICT (device_key) DO NOTHING RETURNING version",
      [deviceKey, progressJson]
    );
  }else{
    r = await client.query(
      "UPDATE bloom_progress SET progress = $2::jsonb, version = version + 1, updated_at = now() " +
      "WHERE device_key = $1 AND version = $3 RETURNING version",
      [deviceKey, progressJson, lastSeen]
    );
  }
  if(r.rows.length) return { status: 200, body: { status: "saved", version: r.rows[0].version, fingerprint: fingerprint } };

  // Nothing was written. Read the current version only to report it; the
  // decision above is already final.
  const cur = await client.query("SELECT version FROM bloom_progress WHERE device_key = $1", [deviceKey]);
  return { status: 409, body: { status: "conflict", version: cur.rows.length ? cur.rows[0].version : "none" } };
}

module.exports = async function handler(req, res){
  if(req.method !== "GET" && req.method !== "POST"){
    res.setHeader("Allow", "GET, POST");
    return error(res, 405, "Method not allowed.");
  }

  const device = deviceKeyFrom(req);
  if(device.error) return error(res, 400, device.error);

  let lastSeen = null;
  let progressJson = null;
  let fingerprint = null;
  if(req.method === "POST"){
    let body;
    try{ body = await readBody(req); }
    catch(e){ return error(res, 400, "Could not read the upload."); }
    if(body.tooLarge) return error(res, 413, "Upload too large. The limit is 4 MB.");
    let parsed;
    try{ parsed = JSON.parse(body.text); }
    catch(e){ return error(res, 400, "Upload is not valid JSON."); }
    if(!isPlainObject(parsed) || !isPlainObject(parsed.progress)){
      return error(res, 400, "Upload is not a valid progress object.");
    }
    const v = parsed.lastSeenVersion;
    if(!(v === "none" || (Number.isInteger(v) && v >= 1 && v <= 2147483647))){
      return error(res, 400, 'lastSeenVersion must be "none" or a whole number of 1 or more.');
    }
    lastSeen = v;
    progressJson = JSON.stringify(parsed.progress);
    fingerprint = fingerprintOf(parsed.progress);
  }

  let client;
  try{
    client = await connect();
  }catch(err){
    const code = safeCode(err);
    return error(res, 503, "Database unavailable" + (code ? " (" + code + ")" : "") + ".");
  }
  try{
    const checking = req.method === "GET" && new URL(req.url, "http://localhost").searchParams.get("check") === "1";
    const out = req.method === "GET"
      ? (checking ? await check(client, device.key) : await load(client, device.key))
      : await save(client, device.key, lastSeen, progressJson, fingerprint);
    reply(res, out.status, out.body);
  }catch(err){
    const code = safeCode(err);
    error(res, 500, code === "42P01"
      ? "Progress table not found. Open /api/setup first (42P01)."
      : "Database error" + (code ? " (" + code + ")" : "") + ".");
  }finally{
    try{ await client.end(); }catch(e){ /* already closed */ }
  }
};
