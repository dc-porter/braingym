/* Builds a character from a short description. This is the swap point:
   a commissioned 3D model could replace what this returns, and nothing
   else in the world would need to change.

   desc: { scale, skin, robeTop, robeHem, sleeve, trim, hair, hairStyle:
           "long" | "braid", circlet: bool, glowColor }                    */
import { THREE, C, Builder, softMaterial, glowMaterial, halo, blobShadow } from "./kit.js";

const G = THREE;

export const AMARIS = {
  name: "Queen Amaris", scale: 1.12, skin: C.skin, robeTop: C.twilight, robeHem: C.rose,
  sleeve: 0x8e63c9, trim: 0xf6e7b8, hair: C.platinum, hairStyle: "long", circlet: true, glowColor: C.rose
};
export const TRAVELER = {
  name: "Traveler", scale: 0.96, skin: C.skin, robeTop: 0x3f6fc4, robeHem: C.starBlue,
  sleeve: 0x4f86d8, trim: C.moonWhite, hair: C.platinum, hairStyle: "braid", circlet: false, glowColor: C.starBlue
};

function shade(hex, f){ const c = new G.Color(hex); c.multiplyScalar(f); return c.getHex(); }

export function buildCharacter(desc){
  const root = new G.Group();          // position / facing
  const body = new G.Group();          // bobs and bows
  root.add(body);
  const solid = new Builder(), glow = new Builder(), hairB = new Builder();

  // Robe: one smooth turned shape from hem to neck
  const prof = [[0.0,0.2],[1.02,0.2],[1.0,0.3],[0.8,0.75],[0.58,1.45],[0.36,2.02],[0.33,2.14],[0.41,2.5],[0.39,2.68],[0.2,2.82],[0.13,2.9]]
    .map(function(p){ return new G.Vector2(p[0], p[1]); });
  solid.add(new G.LatheGeometry(prof, 22), { color: desc.robeHem, colorTop: desc.robeTop });
  // Over-skirt panel and sash for a layered, draped look
  solid.add(new G.BoxGeometry(0.1, 1.62, 0.03), { p:[0, 1.2, 0.71], r:[-0.335, 0, 0], color: desc.trim });
  solid.add(new G.OctahedronGeometry(0.1, 0), { p:[0, 0.36, 0.99], s:[0.9, 1.5, 0.3], color: desc.trim });
  [-1, 1].forEach(function(sx){
    solid.add(new G.SphereGeometry(0.19, 12, 8), { p:[sx * 0.33, 2.6, 0.01], s:[1.05, 0.8, 0.95], color: desc.sleeve });
  });
  solid.add(new G.TorusGeometry(0.35, 0.05, 6, 20), { p:[0, 2.08, 0], r:[Math.PI/2, 0, 0], color: desc.trim });
  solid.add(new G.TorusGeometry(1.01, 0.035, 5, 28), { p:[0, 0.24, 0], r:[Math.PI/2, 0, 0], color: desc.trim });

  // Neck and head
  const HY = 3.2;
  solid.add(new G.CylinderGeometry(0.1, 0.12, 0.3, 10), { p:[0, 2.95, 0], color: shade(desc.skin, 0.9) });
  solid.add(new G.SphereGeometry(0.3, 22, 18), { p:[0, HY, 0], s:[0.9, 1.08, 0.96], color: shade(desc.skin, 0.92), colorTop: desc.skin });
  // Face: calm closed eyes, soft brows, a small nose and mouth
  const lash = 0x2a1810;
  [-1, 1].forEach(function(sx){
    solid.add(new G.TorusGeometry(0.058, 0.011, 4, 10, Math.PI), { p:[sx * 0.105, HY + 0.03, 0.262], r:[0.12, sx * 0.3, Math.PI], color: lash });
    solid.add(new G.TorusGeometry(0.075, 0.008, 4, 10, Math.PI * 0.7), { p:[sx * 0.108, HY + 0.07, 0.262], r:[0.2, sx * 0.3, 0.26], color: shade(desc.skin, 0.55) });
    solid.add(new G.SphereGeometry(0.045, 8, 6), { p:[sx * 0.155, HY - 0.075, 0.222], s:[1, 0.7, 0.3], color: shade(desc.skin, 1.08) });
  });
  solid.add(new G.SphereGeometry(0.032, 8, 6), { p:[0, HY - 0.045, 0.285], s:[0.8, 1.5, 0.9], color: shade(desc.skin, 1.06) });
  solid.add(new G.SphereGeometry(0.05, 10, 6), { p:[0, HY - 0.15, 0.262], s:[1.1, 0.34, 0.5], color: 0x9a4a4f });

  // Hair cap, swept back so the face is clear
  hairB.add(new G.SphereGeometry(0.33, 22, 14, 0, 6.2832, 0, 1.75), { p:[0, HY + 0.02, -0.035], r:[-0.62, 0, 0], s:[0.97, 1.08, 1.02], color: shade(desc.hair, 0.86), colorTop: desc.hair });
  // Parted sweeps over the crown, so the hair reads as hair and not a hood
  [-1, 1].forEach(function(sx){
    hairB.add(new G.SphereGeometry(0.2, 14, 10), { p:[sx * 0.135, HY + 0.2, 0.075], r:[0.2, 0, sx * -0.55], s:[1.0, 0.62, 1.2], color: shade(desc.hair, 0.9), colorTop: desc.hair });
    hairB.add(new G.SphereGeometry(0.13, 10, 8), { p:[sx * 0.27, HY + 0.02, -0.02], s:[0.6, 1.3, 1.1], color: shade(desc.hair, 0.84), colorTop: desc.hair });
  });

  if(desc.circlet){
    glow.add(new G.TorusGeometry(0.292, 0.016, 5, 28), { p:[0, HY + 0.15, -0.01], r:[Math.PI/2 - 0.2, 0, 0], color: 0xfff1c4 });
    glow.add(new G.OctahedronGeometry(0.03, 0), { p:[0, HY + 0.16, 0.285], color: 0xffffff });
  }
  // Small star clasp
  glow.add(new G.OctahedronGeometry(0.055, 0), { p:[0, 2.7, 0.33], s:[1, 1.4, 0.5], color: 0xfff1c4 });

  const mat = softMaterial(desc.glowColor, 0.5);
  body.add(solid.mesh(mat));
  body.add(glow.mesh(glowMaterial(0xffffff, { vertexColors: true })));

  // Arms: bell sleeves and hands, kept separate so they can gesture
  const armGeo = (function(){
    const b = new Builder();
    b.add(new G.CylinderGeometry(0.115, 0.22, 1.0, 10), { p:[0, -0.5, 0], color: shade(desc.sleeve, 0.85), colorTop: desc.sleeve });
    b.add(new G.SphereGeometry(0.075, 8, 6), { p:[0, -1.06, 0], s:[0.9, 1.25, 0.7], color: desc.skin });
    return b.geometry();
  })();
  const arms = [-1, 1].map(function(sx){
    const pivot = new G.Group();
    pivot.position.set(sx * 0.36, 2.62, 0.02);
    pivot.add(new G.Mesh(armGeo, mat));
    pivot.userData.sx = sx;
    body.add(pivot);
    return pivot;
  });

  // Long hair: ribbons that drift. One mesh, moved a little every frame.
  const ribbons = [];
  const SEG = 9;
  if(desc.hairStyle === "long"){
    for(let i = 0; i < 9; i++){
      const a = (i - 4) / 4;   // -1..1 across the back of the head
      ribbons.push({ a: a, x: Math.sin(a * 1.25) * 0.29, z: -0.06 - Math.cos(a * 1.25) * 0.26,
        len: 2.3 - Math.abs(a) * 0.35, w: 0.3, phase: i * 0.9 });
    }
    [-1, 1].forEach(function(sx){
      ribbons.push({ a: 0, x: sx * 0.275, z: 0.06, len: 1.55, w: 0.13, phase: 3 + sx, front: true });
      ribbons.push({ a: 0, x: sx * 0.31, z: -0.04, len: 1.25, w: 0.12, phase: 5 + sx, front: true });
    });
  }else{
    ribbons.push({ a: 0, x: 0, z: -0.3, len: 1.5, w: 0.2, phase: 0, braid: true });
    ribbons.push({ a: -0.6, x: -0.2, z: -0.22, len: 0.55, w: 0.2, phase: 1 });
    ribbons.push({ a: 0.6, x: 0.2, z: -0.22, len: 0.55, w: 0.2, phase: 2 });
  }
  const hv = ribbons.length * (SEG + 1) * 2;
  const hpos = new Float32Array(hv * 3), hcol = new Float32Array(hv * 3), hidx = [];
  const hcA = new G.Color(desc.hair), hcB = new G.Color(shade(desc.hair, 0.8));
  ribbons.forEach(function(r, ri){
    const base = ri * (SEG + 1) * 2;
    for(let s = 0; s <= SEG; s++){
      const c = hcB.clone().lerp(hcA, 0.35 + 0.65 * Math.abs(Math.sin(ri * 1.7 + s * 0.4)));
      for(let k = 0; k < 2; k++){ const o = (base + s * 2 + k) * 3; hcol[o] = c.r; hcol[o+1] = c.g; hcol[o+2] = c.b; }
      if(s < SEG){ const v = base + s * 2; hidx.push(v, v + 1, v + 2, v + 1, v + 3, v + 2); }
    }
  });
  const hgeo = new G.BufferGeometry();
  hgeo.setAttribute("position", new G.BufferAttribute(hpos, 3));
  hgeo.setAttribute("color", new G.BufferAttribute(hcol, 3));
  hgeo.setIndex(hidx);
  const hairMat = new G.MeshBasicMaterial({ vertexColors: true, side: G.DoubleSide });
  body.add(hairB.mesh(hairMat));
  const hair = new G.Mesh(hgeo, hairMat);
  hair.frustumCulled = false;
  body.add(hair);

  function layHair(t, sway){
    ribbons.forEach(function(r, ri){
      const base = ri * (SEG + 1) * 2;
      for(let s = 0; s <= SEG; s++){
        const f = s / SEG;
        const drift = sway * f * f;
        let cx, cz;
        const cy = HY + 0.06 - f * r.len;
        if(r.front){
          cx = r.x * (1 + Math.sin(f * 2.4) * 0.34) + Math.sin(t * 0.8 + r.phase + f * 2.0) * 0.04 * drift;
          cz = r.z + Math.sin(f * 2.9) * 0.2 + Math.cos(t * 0.7 + r.phase) * 0.03 * drift;
        }else{
          cx = r.x * (1 + f * 0.55) + Math.sin(t * 0.9 + r.phase + f * 2.2) * 0.11 * drift;
          cz = r.z - f * 0.42 - Math.sin(f * 2.6) * 0.16 + Math.cos(t * 0.7 + r.phase * 1.3 + f * 1.8) * 0.09 * drift;
        }
        const w = r.w * (r.braid ? (0.75 + 0.25 * Math.cos(f * 22.0)) : (1 - f * 0.55)) * 0.5;
        const nx = r.front ? 1 : Math.cos(r.a * 1.25), nz = r.front ? 0 : Math.sin(r.a * 1.25);
        const o = (base + s * 2) * 3;
        hpos[o] = cx - nx * w; hpos[o+1] = cy; hpos[o+2] = cz + nz * w;
        hpos[o+3] = cx + nx * w; hpos[o+4] = cy; hpos[o+5] = cz - nz * w;
      }
    });
    hgeo.attributes.position.needsUpdate = true;
  }
  layHair(0, 0);

  const aura = halo(desc.glowColor, 5.2, 0.16); aura.position.set(0, 2.3, -0.4); body.add(aura);
  const hem = halo(desc.glowColor, 3.4, 0.3); hem.position.set(0, 0.35, 0); body.add(hem);
  const shadow = blobShadow(1.25); root.add(shadow);

  root.scale.setScalar(desc.scale);
  let talk = 0, talking = false, greet = 0, moving = 0, movingT = 0;

  return {
    group: root, desc: desc, height: 3.6 * desc.scale,
    setTalking: function(on){ talking = on; },
    greet: function(){ greet = 1; },
    setMoving: function(on){ movingT = on ? 1 : 0; },
    update: function(t, dt, calm){
      talk += ((talking ? 1 : 0) - talk) * Math.min(1, dt * 5);
      moving += (movingT - moving) * Math.min(1, dt * 6);
      greet = Math.max(0, greet - dt / 2.2);
      const g = Math.sin(Math.min(1, (1 - greet) * 1.0) * Math.PI) * (greet > 0 ? 1 : 0);
      const bob = calm ? 0 : Math.sin(t * 1.25 + desc.scale * 7) * 0.07;
      body.position.y = 0.12 + bob;
      body.rotation.x = g * 0.14 + moving * 0.07;
      arms.forEach(function(p){
        const sx = p.userData.sx;
        p.rotation.z = sx * (0.2 + g * 0.5 + talk * 0.12 * (1 + Math.sin(t * 2.1 + sx)));
        p.rotation.x = -0.34 - g * 0.5 - talk * 0.22 - moving * 0.25 + (calm ? 0 : Math.sin(t * 1.1 + sx) * 0.03);
      });
      layHair(t, calm ? 0.25 : 1 + moving * 1.5);
      aura.material.opacity = 0.14 + talk * 0.14 + (calm ? 0 : 0.03 * Math.sin(t * 2.0));
      hem.material.opacity = 0.26 + talk * 0.12;
    }
  };
}
