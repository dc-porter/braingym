/* Panels over the scene: speech, toast, reward, fold, menu, sound.
   These are ordinary page elements, so text stays sharp and follows the
   phone's text-size setting. */
const $ = function(id){ return document.getElementById(id); };

export function el(tag, cls, text){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(text !== undefined) e.textContent = text;
  return e;
}

/* ---------- speech ---------- */
let speechBusy = false;
/* lines: array of short strings. choices: array of labels (2 to 4) or none.
   Resolves with the index of the choice, or -1 when there were none. */
export function say(who, colorHex, lines, choices){
  const box = $("speech"), text = $("speechText"), more = $("speechMore"), ch = $("speechChoices");
  speechBusy = true;
  return new Promise(function(resolve){
    let i = 0;
    $("speechWho").textContent = who;
    $("speechWho").style.color = colorHex;
    box.hidden = false;
    function finish(v){ box.hidden = true; box.onclick = null; speechBusy = false; resolve(v); }
    function show(){
      text.textContent = lines[i];
      ch.textContent = "";
      const last = i === lines.length - 1;
      if(last && choices && choices.length){
        more.hidden = true;
        choices.forEach(function(label, n){
          const b = el("button", "", label);
          b.onclick = function(ev){ ev.stopPropagation(); finish(n); };
          ch.appendChild(b);
        });
      }else{
        more.hidden = false;
        more.textContent = last ? "Tap to close" : "Tap to continue";
      }
    }
    box.onclick = function(){
      if(i < lines.length - 1){ i++; show(); }
      else if(!(choices && choices.length)) finish(-1);
    };
    show();
  });
}
export function isSpeaking(){ return speechBusy; }

/* ---------- toast and reward ---------- */
let toastTimer = 0;
export function toast(msg, ms){
  const t = $("toast");
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.hidden = true; }, ms || 4200);
}
export function hideToast(){ $("toast").hidden = true; clearTimeout(toastTimer); }

export function reward(amount, reason, balance){
  const r = $("reward");
  r.textContent = "";
  r.appendChild(el("span", "amt", "+" + amount));
  r.appendChild(el("span", "why", reason));
  r.appendChild(el("span", "tiny", "prototype coins · not real progress"));
  r.hidden = false;
  $("coinCount").textContent = String(balance);
  return new Promise(function(res){ setTimeout(function(){ r.hidden = true; res(); }, 3200); });
}
export function setCoins(n){ $("coinCount").textContent = String(n); }
export function setPlace(name){ $("place").textContent = name || ""; }

/* ---------- the portal fold ---------- */
export function fold(calm, atMiddle){
  const f = $("fold");
  return new Promise(function(res){
    f.className = ""; void f.offsetWidth;
    f.className = calm ? "fade" : "go";
    setTimeout(atMiddle, 520);
    setTimeout(function(){ f.className = ""; res(); }, 1120);
  });
}

export function dim(on){ $("dim").className = on ? "on" : ""; }

/* ---------- sound: two soft tones made in code, off until turned on ---------- */
let audio = null, soundOn = false;
export function setSound(on){
  soundOn = on;
  if(on && !audio){
    try{ audio = new (window.AudioContext || window.webkitAudioContext)(); }catch(e){ audio = null; }
  }
  if(on && audio && audio.state === "suspended") audio.resume();
}
export function chime(kind){
  if(!soundOn || !audio) return;
  const notes = kind === "gate" ? [392, 523.25, 659.25, 783.99, 1046.5] : kind === "miss" ? [330] : [659.25, 987.77];
  const now = audio.currentTime;
  notes.forEach(function(f, i){
    const o = audio.createOscillator(), g = audio.createGain();
    o.type = "sine"; o.frequency.value = f;
    const t0 = now + i * (kind === "gate" ? 0.14 : 0.08);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(kind === "gate" ? 0.12 : 0.08, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + (kind === "gate" ? 1.6 : 0.7));
    o.connect(g); g.connect(audio.destination);
    o.start(t0); o.stop(t0 + 1.8);
  });
}

/* ---------- menu ---------- */
export function setupMenu(prefs, handlers){
  const sheet = $("sheet");
  function row(id, label, on){
    const b = $(id);
    b.textContent = "";
    b.appendChild(el("span", "", label));
    b.appendChild(el("span", "state" + (on ? "" : " off"), on ? "On" : "Off"));
    b.setAttribute("aria-checked", on ? "true" : "false");
  }
  function paint(){
    row("optSound", "Sound", prefs.sound);
    row("optCalm", "Reduce motion", prefs.calm);
    row("optArrange", "Tap to arrange (experiment)", prefs.arrange);
    row("optReadout", "Performance readout", prefs.readout);
  }
  function flip(key){ prefs[key] = !prefs[key]; paint(); handlers.changed(key); }
  $("optSound").onclick = function(){ flip("sound"); };
  $("optCalm").onclick = function(){ flip("calm"); };
  $("optArrange").onclick = function(){ flip("arrange"); };
  $("optReadout").onclick = function(){ flip("readout"); };
  $("optReplay").onclick = function(){ sheet.hidden = true; handlers.replay(); };
  let armed = false;
  $("optReset").onclick = function(){
    if(!armed){ armed = true; $("optReset").textContent = "Tap again to wipe the prototype's data"; return; }
    handlers.reset();
  };
  $("sheetClose").onclick = function(){ sheet.hidden = true; handlers.closed(); };
  $("menuBtn").onclick = function(){ armed = false; $("optReset").textContent = "Reset prototype"; paint(); sheet.hidden = false; handlers.opened(); };
  paint();
  return { paint: paint };
}
