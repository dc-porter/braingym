/* Isles and buildings, all made from recipes. Each isle bakes into two
   meshes: one soft-shaded solid and one glowing layer. */
import { THREE, C, Builder, softMaterial, glowMaterial } from "./kit.js";

const G = THREE;
function rnd(seed){ let s = seed; return function(){ s = (s * 16807 + 11) % 2147483647; return (s % 100000) / 100000; }; }

/* A slender tower: body, ring, tall roof, windows. */
function tower(solid, glow, x, z, r, h, roofA, roofB, baseY){
  baseY = baseY || 0;
  solid.add(new G.CylinderGeometry(r * 0.86, r, h, 10), { p:[x, baseY + h/2, z], color: C.marbleShade, colorTop: C.marble });
  solid.add(new G.TorusGeometry(r * 1.02, r * 0.13, 6, 14), { p:[x, baseY + h * 0.72, z], r:[Math.PI/2,0,0], color: C.marble });
  solid.add(new G.CylinderGeometry(r * 1.08, r * 0.9, r * 0.5, 10), { p:[x, baseY + h + r * 0.25, z], color: C.marble });
  solid.add(new G.ConeGeometry(r * 1.12, r * 3.2, 10), { p:[x, baseY + h + r * 0.5 + r * 1.6, z], color: roofA, colorTop: roofB });
  for(let i = 0; i < 3; i++){
    const y = baseY + h * (0.3 + i * 0.2);
    glow.add(new G.PlaneGeometry(r * 0.3, r * 0.62), { p:[x, y, z + r * 0.93], color: 0xffffff });
  }
}

function tree(solid, x, z, s, rand){
  solid.add(new G.CylinderGeometry(0.12 * s, 0.2 * s, 1.6 * s, 6), { p:[x, 0.8 * s, z], color: 0x6a4fa8 });
  const a = rand() > 0.5 ? C.orchid : C.rose;
  solid.add(new G.IcosahedronGeometry(1.0 * s, 1), { p:[x, 2.2 * s, z], s:[1, 0.86, 1], color: a, colorTop: C.moonWhite, flat: true });
  solid.add(new G.IcosahedronGeometry(0.66 * s, 1), { p:[x + 0.5 * s, 2.9 * s, z - 0.2 * s], color: a, colorTop: C.moonWhite, flat: true });
}

function isleBody(solid, glow, radius, depth, rand){
  solid.add(new G.CylinderGeometry(radius, radius * 0.95, 1.6, 44), { p:[0, -0.8, 0], color: C.grassDeep, colorTop: C.grass });
  solid.add(new G.TorusGeometry(radius - 0.1, 0.42, 6, 56), { p:[0, -0.05, 0], r:[Math.PI/2, 0, 0], color: C.marble });
  solid.add(new G.ConeGeometry(radius * 0.95, depth, 13, 3), { p:[0, -1.6 - depth/2, 0], r:[Math.PI, 0, 0], color: C.rockDeep, colorTop: C.rock, flat: true });
  for(let i = 0; i < 7; i++){
    const a = rand() * 6.28, d = radius * (0.25 + rand() * 0.5), s = 0.8 + rand() * 1.6;
    glow.add(new G.OctahedronGeometry(s, 0), { p:[Math.cos(a) * d, -3 - rand() * depth * 0.45, Math.sin(a) * d], s:[0.55, 1.5, 0.55],
      color: rand() > 0.5 ? C.aqua : C.orchid });
  }
}

/* The Crown Isle: plaza, path, castle. Returns meshes and useful points. */
export function buildCrownIsle(){
  const rand = rnd(7);
  const solid = new Builder(), glow = new Builder(), earned = new Builder(), lamps = [];
  const R = 29;
  isleBody(solid, glow, R, 30, rand);

  // Plaza in front of the gate
  solid.add(new G.CylinderGeometry(8.5, 8.5, 0.12, 40), { p:[0, 0.06, -2], color: C.path });
  solid.add(new G.TorusGeometry(8.5, 0.18, 5, 48), { p:[0, 0.14, -2], r:[Math.PI/2,0,0], color: C.marbleShade });
  solid.add(new G.RingGeometry(3.0, 3.25, 40), { p:[0, 0.135, 0.5], r:[-Math.PI/2,0,0], color: C.marbleShade });

  // Stepping stones: terrace path curving to the viewpoint
  const pathPts = [];
  for(let i = 0; i <= 12; i++){
    const t = i / 12;
    const x = 0 + 16 * t * t, z = 6.5 + 7 * Math.sin(t * Math.PI * 0.9) - 4 * t * t;
    pathPts.push([x, z]);
    solid.add(new G.CylinderGeometry(1.15, 1.15, 0.1, 9), { p:[x, 0.05, z], r:[0, i * 0.7, 0], color: C.path });
  }
  const viewpoint = [16.5, 8.2];
  solid.add(new G.CylinderGeometry(1.7, 2.0, 0.5, 8), { p:[viewpoint[0], 0.25, viewpoint[1]], color: C.marbleShade, colorTop: C.marble });
  glow.add(new G.RingGeometry(1.05, 1.3, 24), { p:[viewpoint[0], 0.52, viewpoint[1]], r:[-Math.PI/2,0,0], color: C.starBlue });

  // Low balustrade along the front edge
  for(let i = -9; i <= 9; i++){
    const a = Math.PI / 2 + i * 0.105;
    const x = Math.cos(a) * 22.9, z = Math.sin(a) * 22.9 + 4.2;
    solid.add(new G.CylinderGeometry(0.16, 0.2, 1.1, 6), { p:[x, 0.55, z], color: C.marble });
  }
  solid.add(new G.TorusGeometry(22.9, 0.13, 5, 40, 1.9), { p:[0, 1.1, 4.2], r:[Math.PI/2, 0, -(Math.PI/2 + 0.95)], color: C.marble });

  // Trees and lamps
  [[-13,6,1.5],[-17,-3,1.9],[13,-5,1.7],[20,1,1.3],[-9,15,1.4],[10,19,1.2],[-19,9,1.1],[22,-8,1.5],[-23,-10,1.6],[-12,-12,1.3],[12,-13,1.4]].forEach(function(t){ tree(solid, t[0], t[1], t[2], rand); });
  [[-6.2,5.2],[6.2,5.2],[-9,-1],[9,-1],[5.5,13.2],[12.5,12.2],[-12,11]].forEach(function(l){
    solid.add(new G.CylinderGeometry(0.09, 0.14, 2.6, 6), { p:[l[0], 1.3, l[1]], color: C.marbleShade });
    solid.add(new G.TorusGeometry(0.32, 0.05, 5, 12, Math.PI), { p:[l[0], 2.75, l[1]], color: C.marble });
    glow.add(new G.SphereGeometry(0.26, 10, 8), { p:[l[0], 2.78, l[1]], color: C.starBlue });
    lamps.push({ p:[l[0], 2.78, l[1]], color: C.starBlue, size: 5.5 });
  });

  // ---- The castle, behind the gate ----
  const cz = -21;
  solid.add(new G.CylinderGeometry(5.2, 5.8, 11, 14), { p:[0, 5.5, cz], color: C.marbleShade, colorTop: C.marble });
  solid.add(new G.TorusGeometry(5.5, 0.4, 6, 20), { p:[0, 11, cz], r:[Math.PI/2,0,0], color: C.marble });
  solid.add(new G.SphereGeometry(4.6, 18, 10, 0, 6.2832, 0, 1.5708), { p:[0, 11.1, cz], s:[1, 1.15, 1], color: C.twilight, colorTop: C.orchid });
  solid.add(new G.CylinderGeometry(0.16, 0.3, 3.4, 6), { p:[0, 17.8, cz], color: C.marble });
  tower(solid, earned, -8.2, cz + 2.2, 1.9, 13, C.twilight, C.orchid);
  tower(solid, earned,  8.2, cz + 2.2, 1.9, 13, C.twilight, C.orchid);
  tower(solid, earned, -5.2, cz - 4.5, 1.6, 19, C.twilight, C.rose);
  tower(solid, earned,  5.2, cz - 4.5, 1.6, 19, C.twilight, C.rose);
  tower(solid, earned,  0,   cz - 7.5, 2.0, 25, C.nightViolet, C.orchid);
  tower(solid, earned, -12.5, cz - 1.5, 1.2, 8.5, C.twilight, C.starBlue);
  tower(solid, earned,  12.5, cz - 1.5, 1.2, 8.5, C.twilight, C.starBlue);
  // Curtain walls
  solid.add(new G.BoxGeometry(7, 6.5, 1.2), { p:[-5, 3.25, cz + 3.4], r:[0, 0.32, 0], color: C.marbleShade, colorTop: C.marble });
  solid.add(new G.BoxGeometry(7, 6.5, 1.2), { p:[ 5, 3.25, cz + 3.4], r:[0, -0.32, 0], color: C.marbleShade, colorTop: C.marble });
  // Great door: dark arch with a frame
  solid.add(new G.BoxGeometry(3.0, 4.2, 0.5), { p:[0, 2.1, cz + 5.55], color: C.voidIndigo });
  solid.add(new G.CylinderGeometry(1.5, 1.5, 0.5, 16, 1, false, 0, Math.PI), { p:[0, 4.2, cz + 5.55], r:[Math.PI/2, Math.PI/2, 0], color: C.voidIndigo });
  solid.add(new G.TorusGeometry(1.62, 0.16, 6, 16, Math.PI), { p:[0, 4.2, cz + 5.82], color: C.marble });
  // Rings floating around the tallest tower
  solid.add(new G.TorusGeometry(3.3, 0.09, 5, 40), { p:[0, 21, cz - 7.5], r:[1.2, 0.3, 0], color: C.moonWhite });
  solid.add(new G.TorusGeometry(4.1, 0.06, 5, 44), { p:[0, 23, cz - 7.5], r:[1.75, -0.4, 0], color: C.rose });
  // Keep windows and the crescent: these turn gold once the gate is lit
  for(let i = -2; i <= 2; i++){
    const a = i * 0.36;
    earned.add(new G.PlaneGeometry(0.62, 1.5), { p:[Math.sin(a) * 5.45, 7.6, cz + Math.cos(a) * 5.45], r:[0, a, 0], color: 0xffffff });
  }
  earned.add(new G.TorusGeometry(1.25, 0.2, 6, 20, Math.PI * 1.25), { p:[0, 20.2, cz], r:[0, 0, Math.PI * 0.9], color: 0xffffff });

  // A faint light bridge reaching toward a far isle: "not yet"
  glow.add(new G.PlaneGeometry(2.2, 46), { p:[-40, -0.6, -24], r:[-Math.PI/2 - 0.06, 0, -1.02], color: 0x3a3f8c });

  const mat = softMaterial(C.starBlue, 0.5);
  const group = new G.Group();
  group.add(solid.mesh(mat));
  group.add(glow.mesh(glowMaterial(0xffffff, { vertexColors: true })));
  const earnedMat = glowMaterial(0x5a55a0);
  const earnedMesh = earned.mesh(earnedMat);
  group.add(earnedMesh);

  return {
    group: group, lamps: lamps, pathPts: pathPts, viewpoint: viewpoint, radius: R,
    triangles: solid.triangles + glow.triangles + earned.triangles,
    /* amount 0 = dim, 1 = gold: the castle's windows are "earned" light */
    setEarned: function(amount){
      earnedMat.color.set(0x5a55a0).lerp(new G.Color(C.gold), amount);
    }
  };
}

/* The small placeholder isle on the far side of the portal. */
export function buildFarIsle(){
  const rand = rnd(23);
  const solid = new Builder(), glow = new Builder(), lamps = [];
  isleBody(solid, glow, 13, 18, rand);
  solid.add(new G.CylinderGeometry(6.5, 6.5, 0.12, 32), { p:[0, 0.06, -1], color: C.path });
  tree(solid, -8, 3, 1.5, rand); tree(solid, 8.5, 1, 1.7, rand); tree(solid, -5, -8, 1.2, rand); tree(solid, 6, -8, 1.3, rand);
  [[-5,4.5],[5,4.5]].forEach(function(l){
    solid.add(new G.CylinderGeometry(0.09, 0.14, 2.6, 6), { p:[l[0], 1.3, l[1]], color: C.marbleShade });
    glow.add(new G.SphereGeometry(0.26, 10, 8), { p:[l[0], 2.78, l[1]], color: C.rose });
    lamps.push({ p:[l[0], 2.78, l[1]], color: C.rose, size: 5.5 });
  });
  // A dim spire waiting to be lit, and a sign post
  tower(solid, glow, 0, -9.5, 1.5, 9, C.dim, C.twilight);
  solid.add(new G.CylinderGeometry(0.1, 0.12, 2.2, 6), { p:[4.2, 1.1, 2.2], color: C.marbleShade });
  solid.add(new G.BoxGeometry(2.4, 1.1, 0.14), { p:[4.2, 2.3, 2.2], r:[0, -0.35, 0], color: C.marble });
  const group = new G.Group();
  group.add(solid.mesh(softMaterial(C.orchid, 0.5)));
  group.add(glow.mesh(glowMaterial(0x8a84c8, { vertexColors: true })));
  return { group: group, lamps: lamps, radius: 13, signPos: [4.2, 2.2], triangles: solid.triangles + glow.triangles };
}

/* Distant isles: scenery only, baked into two meshes. */
export function buildDistantIsles(){
  const rand = rnd(99);
  const solid = new Builder(), glow = new Builder();
  const spots = [[-95,-8,-130,11],[70,14,-175,14],[150,-4,-70,9],[-170,20,-40,12],[-60,30,-260,16],[210,26,-230,15],[-230,-12,-190,10],[30,40,-330,13],[120,6,60,8],[-140,2,90,9]];
  spots.forEach(function(s){
    const x = s[0], y = s[1], z = s[2], r = s[3];
    solid.add(new G.CylinderGeometry(r, r * 0.92, 1.4, 14), { p:[x, y - 0.7, z], color: C.grassDeep, colorTop: C.grass });
    solid.add(new G.ConeGeometry(r * 0.92, r * 1.5, 9, 2), { p:[x, y - 1.4 - r * 0.75, z], r:[Math.PI,0,0], color: C.rockDeep, colorTop: C.rock, flat: true });
    const n = 1 + Math.floor(rand() * 3);
    for(let i = 0; i < n; i++){
      const tx = x + (rand() - 0.5) * r, tz = z + (rand() - 0.5) * r, tr = 0.9 + rand() * 0.9, th = 6 + rand() * 12;
      solid.add(new G.CylinderGeometry(tr * 0.85, tr, th, 7), { p:[tx, y + th/2, tz], color: C.dim, colorTop: C.marbleShade });
      solid.add(new G.ConeGeometry(tr * 1.15, tr * 3.2, 7), { p:[tx, y + th + tr * 1.6, tz], color: C.twilight, colorTop: C.dim });
      glow.add(new G.PlaneGeometry(tr * 0.34, tr * 0.8), { p:[tx, y + th * 0.6, tz + tr], color: 0x7a78c8 });
    }
    solid.add(new G.IcosahedronGeometry(r * 0.28, 0), { p:[x + r * 0.5, y + r * 0.3, z + r * 0.2], color: C.orchid, colorTop: C.rose, flat: true });
  });
  const group = new G.Group();
  group.add(solid.mesh(softMaterial(C.rose, 0.35)));
  group.add(glow.mesh(glowMaterial(0xffffff, { vertexColors: true, fog: true })));
  return { group: group, triangles: solid.triangles + glow.triangles };
}
