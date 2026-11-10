// Checks that this deployment can reach the Postgres database. Reads nothing
// and writes nothing: it connects, asks the server for the number 1, and
// disconnects. The connection setting's value is never logged or returned;
// only its NAME is, so it's clear which one worked.
const { Client } = require("pg");

// A direct connection is a plain postgres:// address. The prisma:// and
// prisma+postgres:// addresses go through Prisma's proxy and are not.
function isDirect(value){
  return typeof value === "string" && /^postgres(ql)?:\/\//i.test(value.trim());
}

function candidateSettings(){
  const names = Object.keys(process.env).filter(function(n){ return n.indexOf("DATABASE") === 0; });
  const direct = names.filter(function(n){ return isDirect(process.env[n]); });
  // If more than one setting is a direct address, try the ones named as
  // unpooled/direct first; each is tried in turn until one connects.
  const rank = function(n){ return /UNPOOLED|DIRECT|NON_POOLING/i.test(n) ? 0 : 1; };
  direct.sort(function(a, b){ return rank(a) - rank(b) || (a < b ? -1 : a > b ? 1 : 0); });
  return { names: names, direct: direct };
}

function send(res, status, text){
  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(text);
}

// An error code (e.g. ECONNREFUSED, 28P01) says what went wrong without
// carrying a host, user or password the way an error's message can.
function safeCode(err){
  return err && typeof err.code === "string" && /^[A-Za-z0-9_]{2,24}$/.test(err.code) ? err.code : null;
}

module.exports = async function handler(req, res){
  if(req.method !== "GET" && req.method !== "HEAD"){
    res.setHeader("Allow", "GET, HEAD");
    return send(res, 405, "Method not allowed.");
  }

  const found = candidateSettings();
  if(!found.direct.length){
    const seen = found.names.length
      ? " DATABASE settings seen: " + found.names.map(function(n){ return n + " (not a direct postgres:// address)"; }).join(", ") + "."
      : " No setting starting with DATABASE exists.";
    return send(res, 500, "No direct Postgres connection setting found." + seen);
  }

  let lastCode = null;
  for(let i = 0; i < found.direct.length; i++){
    const name = found.direct[i];
    const client = new Client({
      connectionString: process.env[name],
      connectionTimeoutMillis: 5000,
      query_timeout: 5000
    });
    // An error event on an idle client must not crash the function.
    client.on("error", function(){});
    try{
      await client.connect();
      await client.query("SELECT 1");
      await client.end().catch(function(){});
      return send(res, 200, "ok (using " + name + ")");
    }catch(err){
      lastCode = safeCode(err) || lastCode;
      try{ await client.end(); }catch(e){ /* already closed */ }
    }
  }
  return send(res, 500, "Database connection failed" + (lastCode ? " (" + lastCode + ")" : "") + ".");
};
