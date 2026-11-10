// Creates the table that will hold saved progress, if it isn't there yet.
// It runs only "create the table if it isn't there": safe to run again, and
// it never drops, alters, empties or fills anything. Nothing calls it from
// the app. Errors reply with a short code only, never a host, user or secret.
const { Client } = require("pg");

// The same way api/ping.js finds the connection: settings starting with
// DATABASE whose value is a plain postgres:// address (not prisma://), tried
// unpooled/direct first. Copied rather than shared so ping stays untouched.
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

const COLUMNS = ["id", "person_id", "device_key", "progress", "version", "created_at", "updated_at"];

const CREATE_TABLE = [
  "CREATE TABLE IF NOT EXISTS bloom_progress (",
  "  id         BIGSERIAL PRIMARY KEY,",
  "  person_id  TEXT UNIQUE,",
  "  device_key TEXT NOT NULL UNIQUE,",
  "  progress   JSONB NOT NULL DEFAULT '{}'::jsonb,",
  "  version    INTEGER NOT NULL DEFAULT 1,",
  "  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),",
  "  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()",
  ")"
].join("\n");

function send(res, status, text){
  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(text);
}
function fail(res, code){
  send(res, 500, "Setup failed" + (code ? " (" + code + ")" : "") + ".");
}
// An error code says what went wrong without carrying a host, user or
// password the way an error's own message can.
function safeCode(err){
  return err && typeof err.code === "string" && /^[A-Za-z0-9_]{2,24}$/.test(err.code) ? err.code : null;
}

// True only if the table is there with every column this table needs.
async function tableIsReady(client){
  const r = await client.query(
    "SELECT column_name FROM information_schema.columns WHERE table_schema = current_schema() AND table_name = 'bloom_progress'"
  );
  const have = r.rows.map(function(row){ return row.column_name; });
  return COLUMNS.every(function(c){ return have.indexOf(c) !== -1; });
}

module.exports = async function handler(req, res){
  // A browser address bar sends GET, so GET has to work from a phone.
  if(req.method !== "GET" && req.method !== "POST"){
    res.setHeader("Allow", "GET, POST");
    return send(res, 405, "Method not allowed.");
  }

  const names = candidateSettings();
  if(!names.length) return fail(res, "NO_DATABASE_SETTING");

  let lastCode = null;
  for(let i = 0; i < names.length; i++){
    const client = new Client({
      connectionString: process.env[names[i]],
      connectionTimeoutMillis: 5000,
      query_timeout: 10000
    });
    client.on("error", function(){});
    try{
      await client.connect();
    }catch(err){
      // Couldn't connect with this setting; try the next one.
      lastCode = safeCode(err) || lastCode;
      try{ await client.end(); }catch(e){ /* already closed */ }
      continue;
    }

    // Connected: whatever happens now is the answer.
    try{
      try{
        await client.query(CREATE_TABLE);
      }catch(err){
        // Two first-time runs at once can collide while creating the same
        // table. If so, the table is being made by the other run; check below.
        if(safeCode(err) !== "23505" && safeCode(err) !== "42P07") throw err;
      }
      if(!(await tableIsReady(client))){
        await client.end().catch(function(){});
        return fail(res, "SCHEMA_MISMATCH");
      }
      await client.end().catch(function(){});
      return send(res, 200, "table ready");
    }catch(err){
      try{ await client.end(); }catch(e){ /* already closed */ }
      return fail(res, safeCode(err));
    }
  }
  return fail(res, lastCode);
};
