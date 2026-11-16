/* A portal gate. Dim with shimmering ghost copies until restored, then
   gold with a living portal. Gates come in twins with mirrored colors. */
import { THREE, C, Builder, softMaterial, glowMaterial, halo, lerp, ease } from "./kit.js";

const G = THREE;
const W = 3.1, H = 6.6;   // half-width and pillar height

function frameGeometry(){
  const b = new Builder();
  b.add(new G.CylinderGeometry(0.62, 0.82, H, 8), { p:[-W, H/2, 0], color: 0xdddddd, colorTop: 0xffffff });
  b.add(new G.CylinderGeometry(0.62, 0.82, H, 8), { p:[ W, H/2, 0], color: 0xdddddd, colorTop: 0xffffff });
  b.add(new G.CylinderGeometry(1.0, 1.15, 0.6, 8), { p:[-W, 0.3, 0], color: 0xcccccc });
  b.add(new G.CylinderGeometry(1.0, 1.15, 0.6, 8), { p:[ W, 0.3, 0], color: 0xcccccc });
  b.add(new G.CylinderGeometry(0.86, 0.7, 0.4, 8), { p:[-W, H, 0], color: 0xffffff });
  b.add(new G.CylinderGeometry(0.86, 0.7, 0.4, 8), { p:[ W, H, 0], color: 0xffffff });
  b.add(new G.TorusGeometry(W, 0.62, 8, 28, Math.PI), { p:[0, H, 0], color: 0xe6e6e6, colorTop: 0xffffff });
  b.add(new G.TorusGeometry(W + 0.85, 0.1, 5, 30, Math.PI), { p:[0, H, 0], color: 0xffffff });
  // crescent keystone
  b.add(new G.TorusGeometry(0.72, 0.15, 6, 16, Math.PI * 1.3), { p:[0, H + W + 1.35, 0], r:[0, 0, Math.PI * 0.85], color: 0xffffff });
  return b.geometry();
}

function portalShape(){
  const s = new G.Shape();
  s.moveTo(-W + 0.5, 0.25); s.lineTo(W - 0.5, 0.25); s.lineTo(W - 0.5, H);
  s.absarc(0, H, W - 0.5, 0, Math.PI, false);
  s.lineTo(-W + 0.5, 0.25);
  return new G.ShapeGeometry(s, 20);
}

export function buildGate(opts){
  opts = opts || {};
  const colA = new G.Color(opts.twin ? C.starBlue : C.orchid);
  const colB = new G.Color(opts.twin ? C.orchid : C.starBlue);
  const group = new G.Group();
  const geo = frameGeometry();

  const frameMat = softMaterial(C.starBlue, 0.6);
  frameMat.color.set(C.dim);
  const frame = new G.Mesh(geo, frameMat);
  group.add(frame);

  // Ghost copies: the "not yet settled" shimmer
  const ghosts = [];
  [C.starBlue, C.orchid].forEach(function(hex, i){
    const m = new G.Mesh(geo, new G.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.2,
      blending: G.AdditiveBlending, depthWrite: false, fog: false }));
    m.userData.dir = i === 0 ? -1 : 1;
    group.add(m); ghosts.push(m);
  });

  // The portal surface
  const pu = { time: { value: 0 }, lit: { value: 0 }, a: { value: colA }, b: { value: colB }, flash: { value: 0 } };
  const portal = new G.Mesh(portalShape(), new G.ShaderMaterial({
    uniforms: pu, transparent: true, depthWrite: false, side: G.DoubleSide, fog: false,
    vertexShader: "varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
    fragmentShader: [
      "uniform float time; uniform float lit; uniform float flash; uniform vec3 a; uniform vec3 b; varying vec2 vP;",
      "void main(){ vec2 c = vP - vec2(0.0, 4.6); float r = length(c); float ang = atan(c.y, c.x);",
      " float swirl = 0.5 + 0.5 * sin(ang * 3.0 + r * 2.2 - time * (0.4 + lit * 1.6));",
      " float rings = 0.5 + 0.5 * sin(r * 5.0 - time * (0.6 + lit * 2.0));",
      " vec3 col = mix(a, b, swirl);",
      " col = mix(col * 0.35, col + vec3(0.25) * rings, lit);",
      " float core = smoothstep(2.6, 0.0, r);",
      " col += vec3(1.0, 0.95, 0.85) * core * (0.25 + 0.75 * lit) * 0.6 + vec3(1.0, 0.9, 0.7) * flash;",
      " float alpha = mix(0.16 + 0.1 * swirl, 0.78 + 0.2 * rings, lit);",
      " gl_FragColor = vec4(col, alpha);",
      " #include <colorspace_fragment>",
      "}"].join("\n")
  }));
  portal.position.z = -0.05;
  group.add(portal);

  // Five glyph stones along the arch: one lights with each repaired line
  const glyphDim = glowMaterial(0x6a66a8), glyphGold = glowMaterial(C.gold);
  const glyphGeo = new G.OctahedronGeometry(0.3, 0);
  const glyphs = [];
  for(let i = 0; i < 5; i++){
    const a = Math.PI * (0.16 + 0.17 * i);
    const m = new G.Mesh(glyphGeo, glyphDim);
    m.position.set(Math.cos(a) * W, H + Math.sin(a) * W, 0.68);
    m.scale.set(0.9, 1.25, 0.5);
    group.add(m); glyphs.push(m);
  }

  const glow = halo(C.gold, 22, 0); glow.position.set(0, H * 0.75, -0.6);
  group.add(glow);

  let lit = 0, litTarget = 0, litCount = 0, flash = 0;
  const api = {
    group: group, portal: portal, frame: frame, top: H + W,
    setGlyphs: function(n){
      litCount = n;
      glyphs.forEach(function(g, i){ g.material = i < n ? glyphGold : glyphDim; });
    },
    /* instant = true skips the animation (used when restoring a saved world) */
    setLit: function(on, instant){
      litTarget = on ? 1 : 0;
      if(instant) lit = litTarget; else if(on) flash = 1;
      if(on) api.setGlyphs(5);
    },
    isLit: function(){ return litTarget === 1; },
    update: function(t, dt, calm){
      lit = lit < litTarget ? Math.min(litTarget, lit + dt / 1.6) : Math.max(litTarget, lit - dt / 1.6);
      flash = Math.max(0, flash - dt / 1.2);
      const e = ease(lit);
      pu.time.value = t; pu.lit.value = e; pu.flash.value = flash * flash;
      frameMat.color.set(C.dim).lerp(new G.Color(C.moonWhite), e);
      frameMat.userData.rim.value.set(C.starBlue).lerp(new G.Color(C.gold), e);
      glow.material.opacity = e * (0.5 + 0.08 * Math.sin(t * 1.7)) + flash * 0.5;
      ghosts.forEach(function(g){
        const spread = (1 - e) * (calm ? 0.22 : 0.3 + 0.14 * Math.sin(t * 0.9 + g.userData.dir));
        g.position.x = g.userData.dir * spread;
        g.position.y = calm ? 0 : (1 - e) * 0.1 * Math.sin(t * 1.3 + g.userData.dir * 2.0);
        g.material.opacity = 0.2 * (1 - e);
        g.visible = e < 0.99;
      });
      glyphs.forEach(function(g, i){
        const s = i < litCount ? 1.0 + 0.08 * Math.sin(t * 2.2 + i) : 0.9;
        g.scale.set(0.9 * s, 1.25 * s, 0.5);
      });
    }
  };
  return api;
}
