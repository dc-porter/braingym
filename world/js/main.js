/* Aurelune world prototype: starts everything and runs the flow.
   Arrive -> meet Amaris -> repair the gate on the calm card -> the gate
   lights -> step through -> stroll the terrace.
   The world asks Bloom for everything about learning through `door`. */
import { THREE, C, Builder, softMaterial, glowMaterial, lerp, clamp, ease } from "./kit.js";
import { door } from "./door.js";
import { buildSky } from "./sky.js";
import { buildWater } from "./water.js";
import { buildCrownIsle, buildFarIsle, buildDistantIsles } from "./island.js";
import { buildGate } from "./gate.js";
import { buildCharacter, AMARIS, TRAVELER } from "./character.js";
import { buildEffects } from "./effects.js";
import { createCard } from "./taskcard.js";
import * as ui from "./ui.js";

const $ = function(id){ return document.getElementById(id); };
const params = new URLSearchParams(location.search);
const T0 = performance.now();
const V3 = THREE.Vector3;

/* ---------------- saved world state (through the doorway) ---------------- */
const systemCalm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
const fresh = function(){
  return { v: 1, arrived: false, introDone: false, gateLit: false, place: "crown", pos: [0, 2.6],
           taskId: null, signTaskId: null, signFixed: false,
           prefs: { sound: false, calm: !!(systemCalm && systemCalm.matches), calmTouched: false, arrange: true, readout: false } };
};
let world = door.loadWorld();
if(!world || world.v !== 1) world = fresh();
function save(){ door.saveWorld(world); }
const prefs = world.prefs;
if(!prefs.calmTouched && systemCalm) prefs.calm = systemCalm.matches;
if(params.get("readout")) prefs.readout = true;

/* ---------------- renderer ---------------- */
const canvas = $("scene");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
renderer.setClearColor(C.voidIndigo);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.5, 2000);

/* ---------------- quality steps ---------------- */
const STEPS = [
  { pr: 2,    motes: 160, simple: false, cap30: false },
  { pr: 2,    motes: 70,  simple: false, cap30: false },
  { pr: 1.5,  motes: 70,  simple: false, cap30: false },
  { pr: 1.5,  motes: 40,  simple: true,  cap30: false },
  { pr: 1.25, motes: 0,   simple: true,  cap30: false },
  { pr: 1,    motes: 0,   simple: true,  cap30: true  }
];
const lockedQ = params.get("q") !== null ? clamp(parseInt(params.get("q"), 10) || 0, 0, STEPS.length - 1) : null;
let qStep = lockedQ !== null ? lockedQ : 0, qUps = 0, qGood = 0;
function pixelRatio(){ return Math.min(window.devicePixelRatio || 1, STEPS[qStep].pr); }

/* ---------------- build the scene ---------------- */
scene.add(new THREE.HemisphereLight(0xcfd6ff, 0x6a3fa8, 1.55));
const moonLight = new THREE.DirectionalLight(0xdfe6ff, 1.9); moonLight.position.set(-30, 60, 40); scene.add(moonLight);
const warm = new THREE.DirectionalLight(0xffc9a8, 0.75); warm.position.set(20, 12, 50); scene.add(warm);

const sky = buildSky(scene, pixelRatio());
const water = buildWater(scene, sky.mood.fog);
const distant = buildDistantIsles(); scene.add(distant.group);
const crown = buildCrownIsle(); scene.add(crown.group);
const FAR = new V3(140, 8, -150);
const farIsle = buildFarIsle(); farIsle.group.position.copy(FAR); scene.add(farIsle.group);
const effects = buildEffects(scene);
effects.setLamps(crown.lamps.concat(farIsle.lamps.map(function(l){ return { p: [l.p[0] + FAR.x, l.p[1] + FAR.y, l.p[2] + FAR.z], color: l.color, size: l.size }; })));
[[-21,-9,5,26,0.4],[22.5,-6,4,24,-0.5],[-9,21.6,3.2,22,2.8],[14,-20,4,24,-1.2]].forEach(function(f){ water.addFall(f[0], f[1], f[2], f[3], -1.2, f[4]); });
water.addFall(FAR.x - 12, FAR.z + 2, 3, 20, FAR.y - 1.2, 0.5);

const GATE_Z = -4.6;
const gate = buildGate({ twin: false }); gate.group.position.set(0, 0, GATE_Z); crown.group.add(gate.group);
const twin = buildGate({ twin: true }); twin.group.position.set(0, 0, -3.2); farIsle.group.add(twin.group);
twin.setLit(true, true);

const amaris = buildCharacter(AMARIS);
const AMARIS_HOME = [-4.3, -1.0];
amaris.group.position.set(AMARIS_HOME[0], 0, AMARIS_HOME[1]); amaris.group.rotation.y = 0.5;
crown.group.add(amaris.group);
const avatar = buildCharacter(TRAVELER);
scene.add(avatar.group);

// The flickering sign on the terrace (one quick extra fix)
const SIGN = [6.0, 15.2];
const signMark = (function(){
  const b = new Builder();
  b.add(new THREE.CylinderGeometry(0.1, 0.13, 2.3, 6), { p:[SIGN[0], 1.15, SIGN[1]], color: C.marbleShade });
  b.add(new THREE.BoxGeometry(2.6, 1.3, 0.16), { p:[SIGN[0], 2.6, SIGN[1]], r:[0, 0.25, 0], color: C.marble });
  b.add(new THREE.BoxGeometry(1.9, 0.09, 0.2), { p:[SIGN[0], 2.85, SIGN[1]], r:[0, 0.25, 0], color: C.twilight });
  b.add(new THREE.BoxGeometry(1.5, 0.09, 0.2), { p:[SIGN[0] - 0.19, 2.6, SIGN[1] + 0.05], r:[0, 0.25, 0], color: C.twilight });
  b.add(new THREE.BoxGeometry(1.7, 0.09, 0.2), { p:[SIGN[0] - 0.1, 2.35, SIGN[1] + 0.03], r:[0, 0.25, 0], color: C.twilight });
  crown.group.add(b.mesh(softMaterial(C.starBlue, 0.5)));
  const mat = glowMaterial(C.starBlue);
  const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), mat);   // the "quill mark": shape, not only color
  m.position.set(SIGN[0], 3.9, SIGN[1]); m.scale.set(0.6, 1.5, 0.6);
  crown.group.add(m);
  return m;
})();

/* ---------------- places and things you can tap ---------------- */
const PLACES = {
  crown: { origin: new V3(0, 0, 0), radius: 21.3, minZ: -1.9, label: "Crown Isle · Gate Court" },
  far:   { origin: FAR,             radius: 10.4, minZ: -0.6, label: "A quiet isle · placeholder" }
};
const hitMat = new THREE.MeshBasicMaterial({ visible: false });
const targets = [];
function target(parent, geo, pos, data){
  const m = new THREE.Mesh(geo, hitMat); m.position.set(pos[0], pos[1], pos[2]); m.userData = data;
  parent.add(m); targets.push(m); return m;
}
target(crown.group, new THREE.BoxGeometry(9, 12, 2.4), [0, 6, GATE_Z], { kind: "gate", place: "crown", stand: [0, -0.9], reach: 2.2 });
target(crown.group, new THREE.CylinderGeometry(1.5, 1.5, 4.6, 8), [AMARIS_HOME[0], 2.3, AMARIS_HOME[1]], { kind: "amaris", place: "crown", stand: [-1.9, 0.9], reach: 2.2 });
target(crown.group, new THREE.BoxGeometry(3.4, 4.6, 2.2), [SIGN[0], 2.3, SIGN[1]], { kind: "sign", place: "crown", stand: [SIGN[0] - 0.6, SIGN[1] - 2.6], reach: 1.6 });
target(crown.group, new THREE.CylinderGeometry(2.6, 2.6, 1.6, 10), [crown.viewpoint[0], 0.8, crown.viewpoint[1]], { kind: "view", place: "crown", stand: crown.viewpoint, reach: 1.2 });
target(farIsle.group, new THREE.BoxGeometry(9, 12, 2.4), [0, 6, -3.2], { kind: "twin", place: "far", stand: [0, 0.4], reach: 2.2 });
target(farIsle.group, new THREE.BoxGeometry(3.4, 4.2, 2.2), [farIsle.signPos[0], 2.1, farIsle.signPos[1]], { kind: "farsign", place: "far", stand: [2.6, 4.2], reach: 1.8 });

/* ---------------- avatar movement ---------------- */
const av = { x: world.pos[0], z: world.pos[1], tx: world.pos[0], tz: world.pos[1], facing: Math.PI, moving: false, pending: null };
function placeNow(){ return PLACES[world.place]; }
function clampWalk(x, z){
  const p = placeNow();
  const d = Math.hypot(x, z);
  if(d > p.radius){ x *= p.radius / d; z *= p.radius / d; }
  if(z < p.minZ) z = p.minZ;
  if(world.place === "crown"){   // do not walk through the Queen
    const dx = x - AMARIS_HOME[0], dz = z - AMARIS_HOME[1], dd = Math.hypot(dx, dz);
    if(dd < 1.5 && dd > 0.001){ x = AMARIS_HOME[0] + dx / dd * 1.5; z = AMARIS_HOME[1] + dz / dd * 1.5; }
  }
  return [x, z];
}
function walkTo(x, z, then){
  const c = clampWalk(x, z);
  av.tx = c[0]; av.tz = c[1]; av.pending = then || null; av.moving = true;
}
function updateAvatar(dt, t){
  if(av.moving){
    const dx = av.tx - av.x, dz = av.tz - av.z, d = Math.hypot(dx, dz);
    if(d < 0.08){
      av.moving = false;
      world.pos = [av.x, av.z]; save();
      const p = av.pending; av.pending = null; if(p) p();
    }else{
      const step = Math.min(d, 7.2 * dt);
      av.x += dx / d * step; av.z += dz / d * step;
      const want = Math.atan2(dx, dz);
      let diff = want - av.facing; while(diff > Math.PI) diff -= 6.2832; while(diff < -Math.PI) diff += 6.2832;
      av.facing += diff * Math.min(1, dt * 9);
    }
  }
  const o = placeNow().origin;
  avatar.group.position.set(o.x + av.x, o.y, o.z + av.z);
  avatar.group.rotation.y = av.facing;
  avatar.setMoving(av.moving);
  avatar.update(t, dt, prefs.calm);
}
function faceToward(x, z){ av.facing = Math.atan2(x - av.x, z - av.z); }

/* ---------------- camera ---------------- */
let mode = "boot";   // boot | banner | arrival | talk | play | vista | fold
let yaw = 0, yawTarget = 0, dragging = false;
const camPos = new V3(18, 58, 78), camLook = new V3(-180, 150, -520), wantPos = new V3(), wantLook = new V3();
function portrait(){ return camera.aspect < 1; }
function followPose(outPos, outLook){
  const o = placeNow().origin, bx = o.x + av.x, bz = o.z + av.z;
  const d = portrait() ? 13.5 : 10.5, h = portrait() ? 6.2 : 4.6;
  outPos.set(bx + Math.sin(yaw) * d, o.y + h, bz + Math.cos(yaw) * d);
  outLook.set(bx - Math.sin(yaw) * 4, o.y + 4.4, bz - Math.cos(yaw) * 4);
}
function talkPose(outPos, outLook){
  const mx = (av.x + AMARIS_HOME[0]) / 2, mz = (av.z + AMARIS_HOME[1]) / 2;
  const d = portrait() ? 11.5 : 8.5;
  outPos.set(mx + 1.6, 4.4, mz + d); outLook.set(mx - 0.2, 4.0, mz - 3);
}
function vistaPose(outPos, outLook){
  outPos.set(av.x + 5, 17, av.z + 20); outLook.set(-6, 12, -24);
}
let cineT = 0;
const CINE = 7.6;
function updateCamera(dt){
  yaw += (yawTarget - yaw) * Math.min(1, dt * (dragging ? 14 : 3));
  if(mode === "arrival"){
    cineT += dt;
    followPose(wantPos, wantLook);
    const k0p = [18, 58, 78], k0l = [-180, 150, -520], k1p = [27, 38, 76], k1l = [0, 10, -12];
    if(cineT < 3.4){
      const e = ease(cineT / 3.4);
      camPos.set(lerp(k0p[0], k1p[0], e), lerp(k0p[1], k1p[1], e), lerp(k0p[2], k1p[2], e));
      camLook.set(lerp(k0l[0], k1l[0], e), lerp(k0l[1], k1l[1], e), lerp(k0l[2], k1l[2], e));
    }else{
      const e = ease((cineT - 3.4) / (CINE - 3.4));
      camPos.set(lerp(k1p[0], wantPos.x, e), lerp(k1p[1], wantPos.y, e), lerp(k1p[2], wantPos.z, e));
      camLook.set(lerp(k1l[0], wantLook.x, e), lerp(k1l[1], wantLook.y, e), lerp(k1l[2], wantLook.z, e));
    }
  }else if(mode === "free"){ /* test camera: left where it was put */
  }else{
    if(mode === "talk" && world.place === "crown") talkPose(wantPos, wantLook);
    else if(mode === "vista") vistaPose(wantPos, wantLook);
    else followPose(wantPos, wantLook);
    const k = prefs.calm ? 1 : 1 - Math.exp(-dt * 3.6);
    camPos.lerp(wantPos, k); camLook.lerp(wantLook, k);
  }
  camera.position.copy(camPos); camera.lookAt(camLook);
}
function snapCamera(){
  if(mode === "talk" && world.place === "crown") talkPose(camPos, camLook); else followPose(camPos, camLook);
}

/* ---------------- size, rotation, browser bars ---------------- */
function resize(){
  const w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
  const pr = pixelRatio();
  renderer.setPixelRatio(pr); renderer.setSize(w, h, false);
  camera.aspect = w / h;
  // keep a comfortable width of view on a tall screen
  const hfov = 46 * Math.PI / 180;
  camera.fov = clamp(2 * Math.atan(Math.tan(hfov / 2) / camera.aspect) * 180 / Math.PI, 42, 82);
  camera.updateProjectionMatrix();
  sky.setPixelRatio(pr); effects.setPixelRatio(pr, h);
  needsFrame = true;
}
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", function(){ setTimeout(resize, 250); });
if(window.visualViewport) window.visualViewport.addEventListener("resize", resize);

/* ---------------- the calm card ---------------- */
let needsFrame = true;
const card = createCard(door, {
  opened: function(){ ui.dim(true); $("hud").hidden = true; ui.hideToast(); needsFrame = true; },
  closed: function(){ ui.dim(false); $("hud").hidden = false; lastInput = performance.now(); },
  answered: function(fb){
    ui.chime(fb.correct ? "right" : "miss");
    if(activeTask === "gate") gate.setGlyphs(fb.lit);
    save();
  }
});
let activeTask = null;
function formats(){ return prefs.arrange ? ["fix", "choice", "arrange"] : ["fix", "choice"]; }

function runGateTask(){
  let view = world.taskId ? door.getTask(world.taskId) : null;
  if(view && view.done) view = null;
  const begin = function(){
    if(!view){ view = door.startTask("gate-court", "standin.sentence-boundaries", 5, formats()); world.taskId = view.taskId; save(); }
    activeTask = "gate";
    gate.setGlyphs(view.lit);
    card.run(view, function(res){ activeTask = null; mode = "play"; if(res.done) gatePayoff(); else ui.toast("Saved. Tap the Gate to carry on."); });
  };
  const plan = door.getPlan("gate-court")[0];
  mode = "play";
  if(!view && plan.lessonFirst){
    card.lesson(door.getLesson(plan.skillId), function(){ door.finishLesson(plan.skillId); begin(); },
      function(){ activeTask = null; });
  }else begin();
}

function gatePayoff(){
  mode = "talk";
  world.gateLit = true; save();
  gate.setLit(true, false);
  ui.chime("gate");
  if(!prefs.calm) effects.fireBurst(new V3(0, 6, GATE_Z + 0.5), C.gold);
  earnedT = 0; earnedGo = true;
  setTimeout(function(){
    const paid = door.finishTask(world.taskId, "you restored the First Gate");
    const amt = paid.coins.length ? paid.coins[0].amount : 0;
    const after = function(){
      amaris.setTalking(true);
      ui.say("Queen Amaris", "#ffb3de", ["The First Gate remembers its words. Thank you.", "Step through when you like. Its twin is waiting."])
        .then(function(){ amaris.setTalking(false); mode = "play"; ui.toast("Tap the Gate to step through, or tap the ground to stroll."); });
    };
    if(amt) ui.reward(amt, paid.coins[0].reason, paid.balance).then(after); else after();
  }, 2100);
}
let earnedT = 1, earnedGo = false;

function runSignTask(){
  let view = world.signTaskId ? door.getTask(world.signTaskId) : null;
  if(!view || view.done){ view = door.startTask("terrace-sign", "standin.punctuation", 1, ["fix", "choice"]); world.signTaskId = view.taskId; save(); }
  activeTask = "sign";
  card.run(view, function(res){
    activeTask = null;
    if(!res.done) return;
    world.signFixed = true; save();
    ui.chime("gate");
    const paid = door.finishTask(world.signTaskId, "you mended a sign on the terrace");
    if(paid.coins.length) ui.reward(paid.coins[0].amount, paid.coins[0].reason, paid.balance);
  });
}

/* ---------------- story flow ---------------- */
function meetAmaris(){
  mode = "talk";
  amaris.greet(); amaris.setTalking(true);
  faceToward(AMARIS_HOME[0], AMARIS_HOME[1]);
  ui.say("Queen Amaris", "#ffb3de",
    ["You came through the First Gate. No one has done that in an age.", "Its inscription has slipped out of true. Will you look?"],
    ["I’ll take a look", "Let me look around first"]).then(function(choice){
      amaris.setTalking(false);
      world.introDone = true; save();
      if(choice === 0) walkTo(0, -0.9, function(){ faceToward(0, GATE_Z); runGateTask(); });
      else{ mode = "play"; ui.toast("Tap the ground to walk. Tap the Gate when you are ready."); }
      if(choice === 0) mode = "play";
    });
}

function startArrival(){
  mode = "arrival"; cineT = 0;
  world.place = "crown"; av.x = av.tx = 0; av.z = av.tz = 2.6; av.facing = 0; av.moving = false;
  avatar.group.visible = false;
  $("skipBtn").hidden = false; ui.setPlace("");
  if(prefs.calm) cineT = CINE;     // reduce motion: no sweep
}
function endArrival(){
  $("skipBtn").hidden = true;
  avatar.group.visible = true;
  world.arrived = true; save();
  ui.setPlace(placeNow().label);
  if(!world.introDone) meetAmaris(); else mode = "play";
}
$("skipBtn").onclick = function(){ cineT = CINE; };

function travel(toPlace){
  mode = "fold"; ui.hideToast();
  ui.fold(prefs.calm, function(){
    world.place = toPlace;
    av.x = av.tx = 0; av.z = av.tz = toPlace === "crown" ? 0.2 : 1.4; av.facing = 0; av.moving = false;
    world.pos = [av.x, av.z]; yaw = yawTarget = 0;
    updateAvatar(0, clock); followPose(camPos, camLook);
    ui.setPlace(placeNow().label); save(); needsFrame = true;
  }).then(function(){
    mode = "play";
    if(toPlace === "far") ui.toast("The twin gate brought you here. Tap it to go back.");
  });
}

function use(kind){
  if(kind === "gate"){
    faceToward(0, GATE_Z);
    if(world.gateLit) travel("far");
    else if(!world.introDone) meetAmaris();
    else runGateTask();
  }else if(kind === "twin"){
    travel("crown");
  }else if(kind === "amaris"){
    mode = "talk"; amaris.setTalking(true); amaris.greet(); faceToward(AMARIS_HOME[0], AMARIS_HOME[1]);
    if(!world.introDone){ amaris.setTalking(false); meetAmaris(); return; }
    if(world.gateLit){
      ui.say("Queen Amaris", "#ffb3de", ["Every window you see in gold is light you brought back."]).then(function(){ amaris.setTalking(false); mode = "play"; });
    }else{
      ui.say("Queen Amaris", "#ffb3de", ["The Gate is ready when you are."], ["Repair the inscription", "Not yet"]).then(function(c){
        amaris.setTalking(false); mode = "play";
        if(c === 0) walkTo(0, -0.9, function(){ faceToward(0, GATE_Z); runGateTask(); });
      });
    }
  }else if(kind === "sign"){
    faceToward(SIGN[0], SIGN[1]);
    if(world.signFixed){ ui.say("Terrace sign", "#ffd98a", ["This sign reads clearly now. You mended it."]); return; }
    ui.say("A flickering sign", "#8cc6ff", ["One line on this sign has slipped."], ["Mend it", "Leave it"]).then(function(c){ if(c === 0) runSignTask(); });
  }else if(kind === "view"){
    mode = "vista"; ui.toast("Tap anywhere to step down.", 6000);
  }else if(kind === "farsign"){
    ui.say("Sign", "#cfc8ee", ["More of Aurelune will open here.", "This isle is a placeholder in the prototype."]);
  }
}

/* ---------------- input: one thumb ---------------- */
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), ground = new THREE.Plane(new V3(0, 1, 0), 0), hitPt = new V3();
let lastInput = performance.now(), down = null;
canvas.addEventListener("pointerdown", function(e){
  lastInput = performance.now();
  down = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false, yaw: yawTarget, id: e.pointerId };
  try{ canvas.setPointerCapture(e.pointerId); }catch(err){ /* not supported */ }
});
canvas.addEventListener("pointermove", function(e){
  if(!down || e.pointerId !== down.id) return;
  const dx = e.clientX - down.x, dy = e.clientY - down.y;
  if(Math.hypot(dx, dy) > 12) down.moved = true;
  if(down.moved && mode === "play"){ dragging = true; yawTarget = clamp(down.yaw - dx / canvas.clientWidth * 1.6, -0.9, 0.9); }
});
function release(e){
  if(!down || e.pointerId !== down.id) return;
  const wasTap = !down.moved && performance.now() - down.t < 600;
  const x = down.x, y = down.y;
  down = null; dragging = false; yawTarget = 0;    // the view eases back by itself
  if(wasTap) tap(x, y);
}
canvas.addEventListener("pointerup", release);
canvas.addEventListener("pointercancel", function(){ down = null; dragging = false; yawTarget = 0; });
canvas.addEventListener("contextmenu", function(e){ e.preventDefault(); });
document.addEventListener("gesturestart", function(e){ e.preventDefault(); });

function tap(x, y){
  if(mode === "vista"){ mode = "play"; ui.hideToast(); return; }
  if(mode !== "play" || ui.isSpeaking() || card.isOpen()) return;
  ndc.set(x / canvas.clientWidth * 2 - 1, -(y / canvas.clientHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const here = targets.filter(function(t){ return t.userData.place === world.place; });
  const hits = ray.intersectObjects(here, false);
  if(hits.length){
    const d = hits[0].object.userData;
    const near = Math.hypot(av.x - d.stand[0], av.z - d.stand[1]) <= d.reach;
    ui.hideToast();
    if(near) use(d.kind); else walkTo(d.stand[0], d.stand[1], function(){ use(d.kind); });
    return;
  }
  ground.constant = -placeNow().origin.y;
  if(ray.ray.intersectPlane(ground, hitPt)){
    const o = placeNow().origin;
    walkTo(hitPt.x - o.x, hitPt.z - o.z, null);
  }
}

/* ---------------- menu, sound, readout ---------------- */
function applyPrefs(){
  document.body.classList.toggle("calm", !!prefs.calm);
  ui.setSound(prefs.sound);
  $("readout").hidden = !prefs.readout;
  $("soundBtn").textContent = "Sound: " + (prefs.sound ? "on" : "off");
  $("soundBtn").setAttribute("aria-checked", prefs.sound ? "true" : "false");
}
ui.setupMenu(prefs, {
  changed: function(key){ if(key === "calm") prefs.calmTouched = true; applyPrefs(); save(); needsFrame = true; },
  opened: function(){}, closed: function(){ lastInput = performance.now(); },
  replay: function(){ if(!card.isOpen() && !ui.isSpeaking()){ camPos.set(18, 58, 78); camLook.set(-180, 150, -520); startArrival(); } },
  reset: function(){ door.resetPrototype(); location.href = location.pathname; }
});
$("soundBtn").onclick = function(){ prefs.sound = !prefs.sound; applyPrefs(); save(); };
if(systemCalm && systemCalm.addEventListener) systemCalm.addEventListener("change", function(e){ if(!prefs.calmTouched){ prefs.calm = e.matches; applyPrefs(); } });
let cornerTaps = 0, cornerTimer = 0;
$("corner").addEventListener("pointerdown", function(){
  cornerTaps++; clearTimeout(cornerTimer);
  cornerTimer = setTimeout(function(){ cornerTaps = 0; }, 700);
  if(cornerTaps >= 3){ cornerTaps = 0; prefs.readout = !prefs.readout; applyPrefs(); save(); }
});

/* ---------------- the loop ---------------- */
let clock = 0, last = 0, raf = 0, frameNo = 0, skipFlip = false;
let winFrames = 0, winTime = 0, fps = 0, cpuMs = 0, cpuAcc = 0, lostCount = 0, readyMs = 0;
const stats = { fps: 0, cpuMs: 0, calls: 0, tris: 0 };

function applyQuality(){
  const s = STEPS[qStep];
  effects.setMoteLimit(s.motes); water.setSimple(s.simple);
  resize();
}
function judgeQuality(avgMs){
  if(lockedQ !== null || document.hidden || card.isOpen()) return;
  if(avgMs > 21.5 && qStep < STEPS.length - 1){ qStep++; qGood = 0; applyQuality(); }
  else if(avgMs < 17.4 && qStep > 0 && qUps < 2 && !STEPS[qStep].cap30){
    if(++qGood >= 6){ qStep--; qUps++; qGood = 0; applyQuality(); }
  }else qGood = 0;
}

function frame(now){
  raf = requestAnimationFrame(frame);
  // A task card is open: the world is paused. Draw one dimmed frame, then rest.
  if(card.isOpen()){ if(!needsFrame){ last = now; return; } }
  else{
    const idle = mode === "play" && !av.moving && now - lastInput > 20000;
    if(STEPS[qStep].cap30 || idle){ skipFlip = !skipFlip; if(skipFlip) return; }
  }
  const dtRaw = (now - last) / 1000; last = now;
  const dt = Math.min(0.07, Math.max(0, dtRaw));
  const c0 = performance.now();
  if(!card.isOpen()) clock += dt;
  const t = clock;

  if(mode === "arrival"){
    if(cineT >= 5.4 && !avatar.group.visible){ avatar.group.visible = true; }
    if(cineT >= CINE) endArrival();
  }
  updateAvatar(card.isOpen() ? 0 : dt, t);
  amaris.update(t, dt, prefs.calm);
  if(mode === "talk" && world.place === "crown"){
    const want = Math.atan2(av.x - AMARIS_HOME[0], av.z - AMARIS_HOME[1]);
    amaris.group.rotation.y += (want - amaris.group.rotation.y) * Math.min(1, dt * 4);
  }
  gate.update(t, dt, prefs.calm); twin.update(t, dt, prefs.calm);
  if(earnedGo){ earnedT = Math.min(1, earnedT + dt / 2.4); crown.setEarned(ease(earnedT)); if(earnedT >= 1) earnedGo = false; }
  const flick = world.signFixed ? 1 : (prefs.calm ? 0.8 : 0.55 + 0.45 * Math.sin(t * 5.0) * Math.sin(t * 1.7));
  signMark.material.color.set(world.signFixed ? C.gold : C.starBlue).multiplyScalar(0.5 + 0.5 * flick);
  signMark.rotation.y = prefs.calm ? 0 : t * 0.8;
  updateCamera(card.isOpen() ? 0 : dt);
  sky.update(prefs.calm ? 0 : t, camera.position);
  water.update(prefs.calm ? 0 : t);
  effects.update(t, dt, avatar.group.position, prefs.calm);

  renderer.render(scene, camera);
  needsFrame = false; frameNo++;
  cpuAcc += performance.now() - c0;
  if(frameNo === 2 && !readyMs){ readyMs = Math.round(performance.now() - T0); onReady(); }

  // measure
  if(dtRaw > 0 && dtRaw < 0.5){ winFrames++; winTime += dtRaw; }
  if(winFrames >= 90){
    const avg = winTime / winFrames * 1000;
    fps = 1000 / avg; cpuMs = cpuAcc / winFrames;
    if(frameNo > 150) judgeQuality(avg);
    winFrames = 0; winTime = 0; cpuAcc = 0;
  }
  stats.fps = fps; stats.cpuMs = cpuMs; stats.calls = renderer.info.render.calls; stats.tris = renderer.info.render.triangles;
  if(prefs.readout && frameNo % 15 === 0){
    $("readout").textContent =
      "frames/s  " + fps.toFixed(0) + "\n" +
      "work ms   " + cpuMs.toFixed(1) + "\n" +
      "draws     " + stats.calls + "\n" +
      "triangles " + stats.tris + "\n" +
      "pixels x  " + pixelRatio().toFixed(2) + "\n" +
      "quality   " + (STEPS.length - qStep) + "/" + STEPS.length + (lockedQ !== null ? " locked" : "") + "\n" +
      "ready ms  " + readyMs + "\n" +
      "rebuilt   " + lostCount;
  }
}
function start(){ if(!raf){ last = performance.now(); raf = requestAnimationFrame(frame); } }
function stop(){ if(raf){ cancelAnimationFrame(raf); raf = 0; } }

/* ---------------- surviving real life ---------------- */
document.addEventListener("visibilitychange", function(){
  if(document.hidden){ world.pos = [av.x, av.z]; save(); stop(); }
  else{ lastInput = performance.now(); needsFrame = true; start(); }
});
window.addEventListener("pagehide", function(){ world.pos = [av.x, av.z]; save(); });
canvas.addEventListener("webglcontextlost", function(e){ e.preventDefault(); stop(); });
canvas.addEventListener("webglcontextrestored", function(){ lostCount++; needsFrame = true; resize(); start(); });

/* ---------------- begin ---------------- */
function restore(){
  gate.setLit(world.gateLit, true);
  crown.setEarned(world.gateLit ? 1 : 0);
  if(!world.gateLit && world.taskId){ const v = door.getTask(world.taskId); if(v) gate.setGlyphs(v.lit); }
  ui.setCoins(door.getBalance());
  av.x = av.tx = world.pos[0]; av.z = av.tz = world.pos[1];
  av.facing = Math.PI;
}
function onReady(){
  $("loadNote").textContent = "Ready.";
  $("beginBtn").disabled = false;
  if(params.get("auto")) $("beginBtn").click();
}
$("beginBtn").onclick = function(){
  $("banner").hidden = true; $("hud").hidden = false;
  ui.setSound(prefs.sound);
  lastInput = performance.now();
  if(!world.arrived && !params.get("skip")) { startArrival(); return; }
  if(!world.arrived){ world.arrived = true; }
  mode = "play"; snapCamera(); ui.setPlace(placeNow().label);
  const open = world.taskId ? door.getTask(world.taskId) : null;
  if(!world.introDone && !params.get("skip")) meetAmaris();
  else if(open && !open.done && world.place === "crown"){
    mode = "talk"; amaris.setTalking(true);
    ui.say("Queen Amaris", "#ffb3de", ["Welcome back. The inscription is right where you left it."], ["Carry on", "Not now"]).then(function(c){
      amaris.setTalking(false); mode = "play";
      if(c === 0) runGateTask();
    });
  }else if(open && open.done && !world.gateLit){ gatePayoff(); }
  else ui.toast("Welcome back. You are at " + placeNow().label.split(" · ")[0] + ".");
};

restore(); applyPrefs(); applyQuality();
mode = "banner";
// behind the banner: show the arrival view, so the first thing seen is the sky
if(world.arrived) snapCamera();
start();

// For checks in a test browser only. Holds no real data.
window.__proto = { world: world, stats: stats, door: door, get mode(){ return mode; }, get step(){ return qStep; },
  renderer: renderer, readyMs: function(){ return readyMs; }, av: av, tapAt: tap, use: use, travel: travel,
  look: function(p, l){ mode = "free"; camPos.set(p[0], p[1], p[2]); camLook.set(l[0], l[1], l[2]); }, play: function(){ mode = "play"; } };
