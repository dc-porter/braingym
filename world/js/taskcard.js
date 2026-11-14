/* The calm card. When a task starts the world dims and pauses and this
   plain, high-contrast card takes over. It hosts the short lesson and
   every activity type: questions (choice), a hands-on repair (tap to find
   and fix) and a small building game (tap to arrange).

   The card never knows an answer. It sends the learner's pick through the
   doorway and shows what comes back. */
import { el } from "./ui.js";

const $ = function(id){ return document.getElementById(id); };

function joinTiles(tiles){
  // pieces that start with a punctuation mark attach to the piece before
  return tiles.reduce(function(s, t){ return s + (/^[;,.:]/.test(t) || s === "" ? "" : " ") + t; }, "");
}

export function createCard(door, hooks){
  const card = $("card"), body = $("cardBody"), foot = $("cardFoot"), lights = $("lights");
  let task = null, onClose = null, open = false;

  function show(){ card.hidden = false; open = true; hooks.opened(); }
  function hide(){ card.hidden = true; open = false; body.textContent = ""; foot.textContent = ""; hooks.closed(); }
  function clear(){ body.textContent = ""; foot.textContent = ""; body.scrollTop = 0; }
  function button(cls, label, fn){ const b = el("button", cls, label); b.onclick = fn; return b; }

  function paintLights(count, lit, justLit){
    lights.textContent = "";
    lights.setAttribute("aria-label", lit + " of " + count + " lit");
    for(let i = 0; i < count; i++){
      const d = el("span", "light" + (i < lit ? " on" : "") + (justLit && i === lit - 1 ? " just" : ""));
      lights.appendChild(d);
    }
  }

  /* ---------- the short calm lesson ---------- */
  function lesson(L, done){
    show();
    lights.textContent = "";
    $("cardTag").textContent = "sample lesson";
    clear();
    body.appendChild(el("p", "kicker", "Why this matters"));
    body.appendChild(el("p", "big", L.why));
    foot.appendChild(button("primary", "Next", function(){
      clear();
      body.appendChild(el("p", "kicker", L.title));
      const t = el("div", "teach");
      t.appendChild(el("p", "", L.rule));
      const ex = el("p", "ex");
      ex.appendChild(document.createTextNode(L.exampleBefore));
      ex.appendChild(el("span", "hl", L.exampleMark));
      ex.appendChild(document.createTextNode(L.exampleAfter));
      t.appendChild(ex);
      body.appendChild(t);
      body.appendChild(el("p", "", L.reason));
      foot.appendChild(button("primary", "Start the repair", function(){ done(); }));
    }));
  }

  /* ---------- feedback, after the learner has committed ---------- */
  function feedback(fb, next){
    const box = el("div", "fb " + (fb.correct ? "right" : "notyet"));
    const h = el("h3", "", fb.correct ? "✓  That’s it" : "→  Not yet. Here’s the rule.");
    box.appendChild(h);
    if(fb.correct){
      box.appendChild(el("p", "", fb.praise));
    }else{
      const r = el("p"); r.appendChild(el("span", "lbl", "Rule")); r.appendChild(document.createTextNode(fb.rule)); box.appendChild(r);
      const w = el("p"); w.appendChild(el("span", "lbl", "Why")); w.appendChild(document.createTextNode(fb.reason)); box.appendChild(w);
      const f = el("p"); f.appendChild(el("span", "lbl", "Corrected")); f.appendChild(el("div", "fixed", fb.fixed)); box.appendChild(f);
    }
    body.appendChild(box);
    foot.textContent = "";
    const label = fb.done ? "See what happened" : (fb.correct ? "Next" : "Try a fresh one");
    foot.appendChild(button("primary", label, next));
    requestAnimationFrame(function(){ box.scrollIntoView({ block: "nearest" }); });
  }

  function afterCheck(fb){
    hooks.answered(fb);
    paintLights(fb.count, fb.lit, fb.correct);
    feedback(fb, function(){
      if(fb.done){ const cb = onClose; hide(); cb && cb({ done: true }); }
      else renderItem(fb.next);
    });
  }

  /* ---------- activity: multiple choice ---------- */
  function renderChoice(item){
    body.appendChild(el("p", "prompt", item.prompt));
    const wrap = el("div", "options"); let sel = -1; const btns = [];
    item.options.forEach(function(text, i){
      const b = el("button", "opt");
      b.appendChild(el("span", "mark", ""));
      b.appendChild(el("span", "", text));
      b.onclick = function(){ sel = i; btns.forEach(function(x, n){ x.className = "opt" + (n === i ? " sel" : ""); }); check.disabled = false; };
      wrap.appendChild(b); btns.push(b);
    });
    body.appendChild(wrap);
    const check = button("primary", "Check", function(){
      const fb = door.checkAnswer(task.taskId, item.id, { option: sel });
      btns.forEach(function(x, n){ x.disabled = true; if(n === sel){ x.className = "opt " + (fb.correct ? "right" : "miss"); x.firstChild.textContent = fb.correct ? "✓" : "→"; } });
      afterCheck(fb);
    });
    check.disabled = true;
    foot.appendChild(check);
  }

  /* ---------- activity: tap to find and fix ---------- */
  function renderFix(item, stage){
    const prompt = el("p", "prompt", item.prompt);
    body.appendChild(prompt);
    const plate = el("div", "plate"); let sel = -1; const spotBtns = {};
    item.parts.forEach(function(text, i){
      if(item.spots.indexOf(i) !== -1){
        const b = el("button", "part", text);
        b.onclick = function(){ sel = i; Object.keys(spotBtns).forEach(function(k){ spotBtns[k].className = "part" + (Number(k) === i ? " sel" : ""); }); check.disabled = false; };
        plate.appendChild(b); spotBtns[i] = b;
      }else plate.appendChild(el("span", "part", text));
      plate.appendChild(document.createTextNode(" "));
    });
    body.appendChild(plate);

    function repairStep(spot, fixes){
      prompt.textContent = "Good eye. Now choose the repair.";
      Object.keys(spotBtns).forEach(function(k){ spotBtns[k].disabled = true; spotBtns[k].className = "part" + (Number(k) === spot ? " found" : ""); });
      const wrap = el("div", "options"); let pick = -1; const btns = [];
      fixes.forEach(function(text, i){
        const b = el("button", "opt");
        b.appendChild(el("span", "mark", "")); b.appendChild(el("span", "", text));
        b.onclick = function(){ pick = i; btns.forEach(function(x, n){ x.className = "opt" + (n === i ? " sel" : ""); }); go.disabled = false; };
        wrap.appendChild(b); btns.push(b);
      });
      body.appendChild(wrap);
      foot.textContent = "";
      const go = button("primary", "Check", function(){
        const fb = door.checkAnswer(task.taskId, item.id, { spot: spot, fix: pick });
        btns.forEach(function(x, n){ x.disabled = true; if(n === pick){ x.className = "opt " + (fb.correct ? "right" : "miss"); x.firstChild.textContent = fb.correct ? "✓" : "→"; } });
        afterCheck(fb);
      });
      go.disabled = true;
      foot.appendChild(go);
    }

    const check = button("primary", "Check", function(){
      const res = door.checkAnswer(task.taskId, item.id, { spot: sel });
      if(res.step === "spot") repairStep(sel, res.fixes);
      else{ Object.keys(spotBtns).forEach(function(k){ spotBtns[k].disabled = true; }); afterCheck(res); }
    });
    check.disabled = true;
    foot.appendChild(check);
    if(stage && stage.fixes) repairStep(stage.spot, stage.fixes);   // resumed mid-item
  }

  /* ---------- activity: tap to arrange (experiment) ---------- */
  function renderArrange(item){
    body.appendChild(el("p", "prompt", item.prompt));
    const line = el("div", "line"), bank = el("div", "bank");
    line.setAttribute("aria-label", "Your inscription");
    const placed = [];
    const tiles = item.tiles.map(function(text){
      const b = el("button", "tile", text);
      b.onclick = function(){ placed.push(text); b.className = "tile ghost"; b.disabled = true; redraw(); };
      bank.appendChild(b);
      return b;
    });
    function redraw(){
      line.textContent = "";
      placed.forEach(function(text, n){
        const b = el("button", "tile", text);
        b.setAttribute("aria-label", text + ", tap to take back");
        b.onclick = function(){
          placed.splice(n, 1);
          const home = tiles.filter(function(t){ return t.textContent === text && t.disabled; })[0];
          if(home){ home.className = "tile"; home.disabled = false; }
          redraw();
        };
        line.appendChild(b);
      });
      check.disabled = placed.length !== item.tiles.length;
    }
    body.appendChild(line); body.appendChild(bank);
    const check = button("primary", "Check", function(){
      const fb = door.checkAnswer(task.taskId, item.id, { order: placed.slice() });
      Array.prototype.forEach.call(line.children, function(x){ x.disabled = true; });
      if(fb.correct){ line.textContent = ""; line.appendChild(el("span", "", joinTiles(placed))); }
      afterCheck(fb);
    });
    check.disabled = true;
    foot.appendChild(check);
  }

  function renderItem(item, stage){
    clear();
    $("cardTag").textContent = "practice sample";
    if(item.format === "choice") renderChoice(item);
    else if(item.format === "fix") renderFix(item, stage);
    else renderArrange(item);
  }

  $("leaveBtn").onclick = function(){ const cb = onClose; hide(); cb && cb({ done: false }); };

  return {
    isOpen: function(){ return open; },
    /* Opens the short lesson, then calls done. */
    lesson: function(L, done, closed){ onClose = closed; lesson(L, done); },
    /* Runs (or resumes) a task. closed({done}) is called when the card shuts. */
    run: function(taskView, closed){
      task = taskView; onClose = closed;
      show();
      paintLights(task.count, task.lit, false);
      renderItem(task.item, task.stage);
    }
  };
}
