/* ------------------------------------------------------------------
   STAND-IN BLOOM — prototype only.

   This file pretends to be Bloom's "doorway" so the world prototype can
   run without touching the real app. It offers the same entries the real
   doorway will offer (see docs/world/09-plug-in-contract.md).

   - Every practice item below is a STAND-IN written for this prototype.
     None is copied, adapted or derived from js/data.js, and this page
     never loads js/data.js or js/app.js.
   - Coins here are FAKE prototype coins.
   - Everything is stored under the name "bloomworldproto_", which Bloom's
     Export, Import and server backup do not read (they read "bloom_v1_").
   - This file makes no network calls of any kind.
------------------------------------------------------------------- */

const STORE_PREFIX = "bloomworldproto_";
const DOOR_VERSION = 1;

/* ---------- storage (prototype's own, never Bloom's) ---------- */
function read(key, fallback){
  try{
    const raw = localStorage.getItem(STORE_PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  }catch(e){ return fallback; }
}
function write(key, val){
  try{ localStorage.setItem(STORE_PREFIX + key, JSON.stringify(val)); return true; }
  catch(e){ return false; }
}

/* ---------- stand-in skills ---------- */
const SKILLS = {
  "standin.sentence-boundaries": { name: "Sentence boundaries", standIn: true },
  "standin.punctuation":         { name: "Punctuation",         standIn: true }
};

/* ---------- stand-in lesson (fakes "the world can start a skill") ---------- */
const LESSON = {
  standIn: true,
  skillId: "standin.sentence-boundaries",
  title: "Sentence boundaries",
  why: "Clear sentence boundaries let a reader take in one idea at a time.",
  rule: "A complete sentence has a subject and a verb and can stand alone. Join two complete sentences with a period, a semicolon or a comma plus a joining word such as “and.”",
  reason: "A comma alone is too weak to hold two full statements apart.",
  exampleBefore: "The gate is open",
  exampleMark: ";",
  exampleAfter: " travelers may cross."
};

/* ---------- stand-in practice items ----------
   format "choice":  options[], answer (index)
   format "fix":     parts[] (sentence pieces), spots[] (indexes that can be
                     tapped), bad (index of the piece with the mistake),
                     fixes[] (replacements for that piece), answer (index)
   format "arrange": tiles[] in the one right order (shown shuffled)
   Every item: d = difficulty 1-10, rule / reason / fixed = feedback,
   praise = what was done well.                                         */
const B = "standin.sentence-boundaries", P = "standin.punctuation";
const ITEMS = [
  { id:"si-c1", skill:B, format:"choice", d:3,
    prompt:"Which notice is a complete sentence?",
    options:["Because the lamps were lit at dusk.","The lamps were lit at dusk.","Lighting the lamps at dusk.","When the lamps at dusk."], answer:1,
    rule:"A complete sentence has a subject and a verb and can stand alone.",
    reason:"“Because,” “when” and “-ing” openers leave the reader waiting for the rest.",
    fixed:"The lamps were lit at dusk.",
    praise:"You picked the one notice that stands on its own." },
  { id:"si-c2", skill:B, format:"choice", d:4,
    prompt:"Which notice joins its two statements correctly?",
    options:["The bridge is open, travelers may cross.","The bridge is open travelers may cross.","The bridge is open; travelers may cross.","The bridge is open, travelers, may cross."], answer:2,
    rule:"Join two complete sentences with a period, a semicolon or a comma plus a joining word.",
    reason:"A comma alone cannot hold two full statements apart.",
    fixed:"The bridge is open; travelers may cross.",
    praise:"You joined two complete statements with a semicolon." },
  { id:"si-c3", skill:P, format:"choice", d:5,
    prompt:"Which notice uses its comma correctly?",
    options:["After the bell rings, the market opens.","After the bell, rings the market opens.","After the bell rings the market, opens.","After, the bell rings the market opens."], answer:0,
    rule:"Put a comma after an opening clause, right before the main statement begins.",
    reason:"The comma shows the reader where the setup ends.",
    fixed:"After the bell rings, the market opens.",
    praise:"You placed the comma where the opening clause ends." },
  { id:"si-c4", skill:B, format:"choice", d:5,
    prompt:"Which reply is punctuated correctly?",
    options:["Thank you for your order, it will ship Monday.","Thank you for your order it will ship Monday.","Thank you, for your order it will ship Monday.","Thank you for your order. It will ship Monday."], answer:3,
    rule:"Two complete sentences need a period or a semicolon between them.",
    reason:"Each statement here can stand alone, so a comma is not enough.",
    fixed:"Thank you for your order. It will ship Monday.",
    praise:"You gave each complete statement its own sentence." },
  { id:"si-c5", skill:B, format:"choice", d:6,
    prompt:"Which notice is a complete sentence?",
    options:["The archive closes early on feast days.","Although the archive closes early on feast days.","The archive, which closes early on feast days.","Closing early on feast days, the archive."], answer:0,
    rule:"A complete sentence has a subject and a verb and can stand alone.",
    reason:"“Although” and “which” turn a statement into a piece that needs more.",
    fixed:"The archive closes early on feast days.",
    praise:"You spotted the notice with a subject, a verb and nothing left hanging." },
  { id:"si-c6", skill:P, format:"choice", d:6,
    prompt:"Which notice joins its statements correctly?",
    options:["The ferry leaves at noon, however, it returns by dusk.","The ferry leaves at noon; however, it returns by dusk.","The ferry leaves at noon however it returns by dusk.","The ferry leaves at noon, however it returns by dusk."], answer:1,
    rule:"When “however” joins two complete sentences, put a semicolon before it and a comma after it.",
    reason:"“However” is not a joining word like “and,” so a comma before it is too weak.",
    fixed:"The ferry leaves at noon; however, it returns by dusk.",
    praise:"You put the semicolon before “however” and the comma after it." },

  { id:"si-f1", skill:B, format:"fix", d:3,
    prompt:"Tap the part that needs fixing.",
    parts:["Travelers","may rest","here,","the fountain","is safe","to drink from."], spots:[0,2,3,5], bad:2,
    fixes:["here","here;","here, also"], answer:1,
    rule:"Join two complete sentences with a period, a semicolon or a comma plus a joining word.",
    reason:"“Travelers may rest here” and “the fountain is safe to drink from” can each stand alone.",
    fixed:"Travelers may rest here; the fountain is safe to drink from.",
    praise:"You found the comma splice and mended it with a semicolon." },
  { id:"si-f2", skill:B, format:"fix", d:4,
    prompt:"Tap the part that needs fixing.",
    parts:["The market","opens at","dawn. Closing","only when","the last lamp","is lit."], spots:[0,2,4,5], bad:2,
    fixes:["dawn; closing","dawn, closing","dawn. Closing,"], answer:1,
    rule:"A piece that cannot stand alone must be attached to a complete sentence.",
    reason:"“Closing only when the last lamp is lit” has no subject, so it is a fragment.",
    fixed:"The market opens at dawn, closing only when the last lamp is lit.",
    praise:"You attached the fragment to the sentence it belongs to." },
  { id:"si-f3", skill:B, format:"fix", d:5,
    prompt:"Tap the part that needs fixing.",
    parts:["Please sign","the ledger","before you enter","the archive, it","closes","at dusk."], spots:[1,3,4,5], bad:3,
    fixes:["the archive it","the archive, It","the archive. It"], answer:2,
    rule:"Two complete sentences need a period or a semicolon between them.",
    reason:"“It closes at dusk” is a full statement, so a comma alone runs the two together.",
    fixed:"Please sign the ledger before you enter the archive. It closes at dusk.",
    praise:"You split the run-on into two clear sentences." },
  { id:"si-f4", skill:P, format:"fix", d:5,
    prompt:"Tap the part that needs fixing.",
    parts:["If","the bell rings","twice","the gate","will open","for visitors."], spots:[0,2,3,5], bad:2,
    fixes:["twice,","twice;","twice."], answer:0,
    rule:"Put a comma after an opening clause, right before the main statement begins.",
    reason:"“If the bell rings twice” is the setup. The comma shows where it ends.",
    fixed:"If the bell rings twice, the gate will open for visitors.",
    praise:"You marked the end of the opening clause with a comma." },
  { id:"si-f5", skill:P, format:"fix", d:6,
    prompt:"Tap the part that needs fixing.",
    parts:["The courier","arrived","late;","because","the bridge","was closed."], spots:[0,2,3,5], bad:2,
    fixes:["late.","late:","late"], answer:2,
    rule:"A semicolon joins two complete sentences. Do not use one before a piece that cannot stand alone.",
    reason:"“Because the bridge was closed” cannot stand alone, so no semicolon belongs before it.",
    fixed:"The courier arrived late because the bridge was closed.",
    praise:"You removed a semicolon that was splitting one sentence in two." },
  { id:"si-f6", skill:B, format:"fix", d:4,
    prompt:"Tap the part that needs fixing.",
    parts:["Welcome","to the Star","Market, we","open when","the first lamp","is lit."], spots:[0,2,4,5], bad:2,
    fixes:["Market. We","Market we","Market, We"], answer:0,
    rule:"Two complete sentences need a period or a semicolon between them.",
    reason:"“We open when the first lamp is lit” is a full statement of its own.",
    fixed:"Welcome to the Star Market. We open when the first lamp is lit.",
    praise:"You gave the second statement its own sentence." },

  { id:"si-a1", skill:P, format:"arrange", d:4,
    prompt:"Tap the pieces in order to rebuild the inscription.",
    tiles:["When the bell rings,","the gate opens","for travelers."],
    rule:"An opening clause comes first and ends with a comma. The main statement follows.",
    reason:"The capital letter marks the start and the period marks the end.",
    fixed:"When the bell rings, the gate opens for travelers.",
    praise:"You set the opening clause first and closed it with its comma." },
  { id:"si-a2", skill:P, format:"arrange", d:5,
    prompt:"Tap the pieces in order to rebuild the inscription.",
    tiles:["Visitors may enter","; however,","they must sign","the ledger."],
    rule:"When “however” joins two complete sentences, put a semicolon before it and a comma after it.",
    reason:"Each half is a full statement, so the semicolon holds them apart.",
    fixed:"Visitors may enter; however, they must sign the ledger.",
    praise:"You placed “however” between two complete statements with the right marks." },
  { id:"si-a3", skill:B, format:"arrange", d:5,
    prompt:"Tap the pieces in order to rebuild the inscription.",
    tiles:["The lamps are lit",", and","the bridge is open","."],
    rule:"Join two complete sentences with a comma plus a joining word such as “and.”",
    reason:"The comma and “and” work together to link two full statements.",
    fixed:"The lamps are lit, and the bridge is open.",
    praise:"You linked two complete statements with a comma and “and.”" },
  { id:"si-a4", skill:P, format:"arrange", d:6,
    prompt:"Tap the pieces in order to rebuild the inscription.",
    tiles:["Because the tide was high,","the ferry waited","until dusk."],
    rule:"An opening clause comes first and ends with a comma. The main statement follows.",
    reason:"“Because the tide was high” is the setup, so it leads into the main statement.",
    fixed:"Because the tide was high, the ferry waited until dusk.",
    praise:"You led with the reason and followed with the main statement." }
];
const ITEM_BY_ID = {};
ITEMS.forEach(function(it){ ITEM_BY_ID[it.id] = it; });

/* ---------- saved stand-in state ---------- */
let S = read("standin", null) || {
  level: { "standin.sentence-boundaries": 5, "standin.punctuation": 5 },
  started: {},
  seen: {},            // itemId -> order last served
  seenCount: 0,
  coins: 0,
  ledger: [],          // { at, amount, reason }
  log: [],             // answer log: { at, itemId, skill, correct, where }
  tasks: {},           // taskId -> task
  nextTask: 1,
  lessonDone: {}
};
function persist(){ write("standin", S); }

function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/* What the world is allowed to see of an item: never the answer key. */
function publicItem(it){
  const out = { id: it.id, skillId: it.skill, format: it.format, prompt: it.prompt, standIn: true };
  if(it.format === "choice") out.options = it.options.slice();
  if(it.format === "fix"){ out.parts = it.parts.slice(); out.spots = it.spots.slice(); }
  if(it.format === "arrange"){
    let tiles = shuffle(it.tiles);
    if(tiles.join("|") === it.tiles.join("|")) tiles = it.tiles.slice().reverse();
    out.tiles = tiles;
  }
  return out;
}

/* Pick the next item: the stand-in "engine" picks the difficulty first,
   then avoids repeating the last activity type, then prefers items not
   seen yet (or seen longest ago). */
function pickItem(task, avoidFormat){
  const formats = task.formats;
  let pool = ITEMS.filter(function(it){
    return formats.indexOf(it.format) !== -1 && task.served.indexOf(it.id) === -1;
  });
  if(pool.length === 0) pool = ITEMS.filter(function(it){ return formats.indexOf(it.format) !== -1; });
  if(task.focusSkill){
    const same = pool.filter(function(it){ return it.skill === task.focusSkill; });
    if(same.length) pool = same;
  }
  const varied = pool.filter(function(it){ return it.format !== avoidFormat; });
  if(varied.length) pool = varied;
  const lvl = S.level[task.focusSkill || task.skillId] || 5;
  const jitter = {};
  pool.forEach(function(it){ jitter[it.id] = Math.random() * 0.9; });   // so the opening item varies
  pool.sort(function(a, b){
    const sa = (S.seen[a.id] || 0), sb = (S.seen[b.id] || 0);
    if(sa !== sb) return sa - sb;                      // unseen / longest ago first
    return (Math.abs(a.d - lvl) + jitter[a.id]) - (Math.abs(b.d - lvl) + jitter[b.id]);  // then closest to level
  });
  return pool[0];
}

function serve(task, avoidFormat){
  const it = pickItem(task, avoidFormat);
  task.served.push(it.id);
  task.current = publicItem(it);
  task.stage = null;
  S.seen[it.id] = ++S.seenCount;
  return task.current;
}

function nudgeLevel(skill, correct){
  const now = S.level[skill] || 5;
  S.level[skill] = Math.max(1, Math.min(10, now + (correct ? 0.5 : -1)));
}

function feedbackFor(it, correct){
  return { correct: correct, rule: it.rule, reason: it.reason, fixed: it.fixed,
           praise: correct ? it.praise : null, standIn: true };
}

/* ---------- the doorway ---------- */
export const BloomDoor = {
  version: DOOR_VERSION,
  standIn: true,
  storagePrefix: STORE_PREFIX,

  getLearner: function(){
    return { name: "Traveler", avatar: "default", standIn: true };
  },

  getSkills: function(skillIds){
    return skillIds.map(function(id){
      return { skillId: id, name: (SKILLS[id] || {}).name || id, started: !!S.started[id],
               level: Math.round(S.level[id] || 5), reviewDue: false, standIn: true };
    });
  },

  /* Two to four choices for a place, already ordered. */
  getPlan: function(placeId){
    const skill = "standin.sentence-boundaries";
    return [{ skillId: skill, label: "Repair the inscription",
              lessonFirst: !S.lessonDone[skill], placeId: placeId, standIn: true }];
  },

  /* The short calm lesson a host can open for a skill not yet started. */
  getLesson: function(skillId){
    return Object.assign({}, LESSON, { skillId: skillId });
  },
  finishLesson: function(skillId){
    S.lessonDone[skillId] = true; S.started[skillId] = true; persist();
  },

  startTask: function(placeId, skillId, count, formats){
    if(!SKILLS[skillId]) throw new Error("Every activity must name a sub-skill.");
    const id = "t" + (S.nextTask++);
    const task = { id: id, placeId: placeId, skillId: skillId, count: count,
                   formats: formats.slice(), lit: 0, misses: 0, served: [],
                   current: null, stage: null, focusSkill: null, done: false, paid: false };
    S.tasks[id] = task;
    S.started[skillId] = true;
    serve(task, null);
    persist();
    return BloomDoor.getTask(id);
  },

  getTask: function(taskId){
    const t = S.tasks[taskId];
    if(!t) return null;
    return { taskId: t.id, placeId: t.placeId, count: t.count, lit: t.lit, done: t.done,
             item: t.current, stage: t.stage };
  },

  /* The world sends the pick, never a verdict. The answer is recorded and
     the stand-in skill level updated here, at once. */
  checkAnswer: function(taskId, itemId, pick){
    const t = S.tasks[taskId];
    const it = ITEM_BY_ID[itemId];
    if(!t || !it || !t.current || t.current.id !== itemId) return { error: "No such item in this task." };

    // "fix" has two steps: find the spot, then choose the repair.
    if(it.format === "fix" && pick && pick.fix === undefined){
      if(pick.spot === it.bad){
        t.stage = { spot: it.bad, fixes: it.fixes.slice() };
        persist();
        return { step: "spot", correct: true, fixes: it.fixes.slice() };
      }
    }

    let correct = false;
    if(it.format === "choice") correct = pick && pick.option === it.answer;
    if(it.format === "fix")    correct = pick && pick.spot === it.bad && pick.fix === it.answer;
    if(it.format === "arrange") correct = pick && Array.isArray(pick.order) && pick.order.join("|") === it.tiles.join("|");

    S.log.push({ at: Date.now(), itemId: it.id, skill: it.skill, correct: !!correct, where: "world:" + t.placeId });
    nudgeLevel(it.skill, !!correct);

    const fb = feedbackFor(it, !!correct);
    if(correct){
      t.lit += 1;
      t.focusSkill = null;
      if(t.lit >= t.count){ t.done = true; t.current = null; }
      else serve(t, it.format);
    }else{
      // The light stays dark. A fresh item on the same point comes next.
      t.misses += 1;
      t.focusSkill = it.skill;
      serve(t, null);
    }
    persist();
    fb.lit = t.lit; fb.count = t.count; fb.done = t.done; fb.next = t.current;
    return fb;
  },

  /* Coins are decided here, never by the world. Paid on finishing,
     the same amount however many retries it took. */
  finishTask: function(taskId, reasonText){
    const t = S.tasks[taskId];
    if(!t || !t.done) return { coins: [], balance: S.coins };
    if(t.paid) return { coins: [], balance: S.coins, alreadyEarned: true };
    t.paid = true;
    const amount = t.count * 2;
    const entry = { at: Date.now(), amount: amount, reason: reasonText || "you finished a practice set", fake: true };
    S.coins += amount;
    S.ledger.push(entry);
    persist();
    return { coins: [entry], balance: S.coins };
  },

  getBalance: function(){ return S.coins; },

  spend: function(){ return { ok: false, reason: "Nothing is for sale in the prototype." }; },

  saveWorld: function(state){ return write("world", state); },
  loadWorld: function(){ return read("world", null); },

  /* Prototype only: wipe the prototype's own storage. Touches nothing else. */
  resetPrototype: function(){
    try{
      const doomed = [];
      for(let i = 0; i < localStorage.length; i++){
        const k = localStorage.key(i);
        if(k && k.indexOf(STORE_PREFIX) === 0) doomed.push(k);
      }
      doomed.forEach(function(k){ localStorage.removeItem(k); });
    }catch(e){ /* storage unavailable */ }
  }
};
