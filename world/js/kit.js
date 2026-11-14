/* Shared building kit: colors, the merged-shape builder, materials, halos.
   Everything in the world is made from these, so the whole scene can be
   rebuilt from code at any time. */
import * as THREE from "../vendor/three/three.module.min.js";
export { THREE };

export const C = {
  voidIndigo: 0x141033, nightViolet: 0x2a1e5c, twilight: 0x5b3fa8,
  orchid: 0xe58ad0, rose: 0xffb3de, starBlue: 0x6fb7ff, aqua: 0x58e0e6,
  moonWhite: 0xf4f0ff, gold: 0xffd98a, dim: 0x4a4468,
  marble: 0xd9d2f2, marbleShade: 0xa99fd6, rock: 0x4b3a86, rockDeep: 0x2f2462,
  grass: 0x4f9fb0, grassDeep: 0x3b6fa0, path: 0xe9e2ff,
  skinLight: 0xc6905f, skin: 0xb27a48, skinDeep: 0x7b4a2a, platinum: 0xf3ebd3
};

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler();
const _p = new THREE.Vector3(), _s = new THREE.Vector3(), _c = new THREE.Color();

/* Collects many simple shapes and bakes them into ONE mesh, so a whole
   castle costs the phone a single draw. Colors are stored per corner. */
export class Builder {
  constructor(){ this.pos = []; this.nor = []; this.col = []; }

  /* geo: any three.js geometry. opts: { p:[x,y,z], r:[x,y,z], s:number|[x,y,z],
     color, colorTop (vertical gradient), flat (faceted look) } */
  add(geo, opts){
    opts = opts || {};
    let g = geo.index ? geo.toNonIndexed() : geo.clone();
    if(opts.flat) g.computeVertexNormals();
    const s = opts.s === undefined ? [1,1,1] : (typeof opts.s === "number" ? [opts.s, opts.s, opts.s] : opts.s);
    const r = opts.r || [0,0,0], p = opts.p || [0,0,0];
    _e.set(r[0], r[1], r[2]); _q.setFromEuler(_e);
    _m.compose(_p.set(p[0], p[1], p[2]), _q, _s.set(s[0], s[1], s[2]));
    g.applyMatrix4(_m);
    const P = g.attributes.position, N = g.attributes.normal;
    g.computeBoundingBox();
    const y0 = g.boundingBox.min.y, y1 = g.boundingBox.max.y, span = Math.max(1e-6, y1 - y0);
    const cA = new THREE.Color(opts.color === undefined ? 0xffffff : opts.color);
    const cB = opts.colorTop === undefined ? null : new THREE.Color(opts.colorTop);
    for(let i = 0; i < P.count; i++){
      this.pos.push(P.getX(i), P.getY(i), P.getZ(i));
      this.nor.push(N.getX(i), N.getY(i), N.getZ(i));
      if(cB){ _c.copy(cA).lerp(cB, (P.getY(i) - y0) / span); } else _c.copy(cA);
      this.col.push(_c.r, _c.g, _c.b);
    }
    g.dispose(); geo.dispose();
    return this;
  }

  geometry(){
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute("normal", new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(this.col, 3));
    g.computeBoundingSphere();
    return g;
  }

  mesh(material){ return new THREE.Mesh(this.geometry(), material); }
  get triangles(){ return this.pos.length / 9; }
}

/* Soft-shaded surface with an edge glow ("rim light") on the side facing
   away from the viewer. One shared material per rim color. */
export function softMaterial(rimHex, rimStrength, extra){
  const mat = new THREE.MeshLambertMaterial(Object.assign({ vertexColors: true }, extra || {}));
  const rim = { value: new THREE.Color(rimHex === undefined ? C.starBlue : rimHex) };
  const strength = { value: rimStrength === undefined ? 0.55 : rimStrength };
  mat.userData.rim = rim; mat.userData.rimStrength = strength;
  mat.onBeforeCompile = function(shader){
    shader.uniforms.uRim = rim; shader.uniforms.uRimStrength = strength;
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform vec3 uRim; uniform float uRimStrength;")
      .replace("#include <opaque_fragment>",
        "float rimAmt = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.6);\n" +
        "outgoingLight += uRim * rimAmt * uRimStrength;\n#include <opaque_fragment>");
  };
  return mat;
}

/* Flat glowing color that ignores lighting (windows, glyphs, lamps). */
export function glowMaterial(hex, extra){
  return new THREE.MeshBasicMaterial(Object.assign({ color: hex, fog: false }, extra || {}));
}

let _halo = null;
export function haloTexture(){
  if(_halo) return _halo;
  const cv = document.createElement("canvas"); cv.width = cv.height = 64;
  const ctx = cv.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(0.6, "rgba(255,255,255,0.14)"); g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
  _halo = new THREE.CanvasTexture(cv);
  return _halo;
}

/* A soft see-through glow that always faces the viewer. */
export function halo(hex, size, opacity){
  const mat = new THREE.SpriteMaterial({ map: haloTexture(), color: hex, transparent: true,
    opacity: opacity === undefined ? 0.6 : opacity, blending: THREE.AdditiveBlending,
    depthWrite: false, fog: false });
  const sp = new THREE.Sprite(mat);
  sp.scale.set(size, size, 1);
  return sp;
}

/* A soft dark oval under things, in place of real shadows. */
export function blobShadow(radius){
  const mat = new THREE.MeshBasicMaterial({ map: haloTexture(), color: 0x0a0620, transparent: true,
    opacity: 0.55, depthWrite: false });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(radius * 2, radius * 2), mat);
  m.rotation.x = -Math.PI / 2; m.position.y = 0.03; m.renderOrder = 1;
  return m;
}

export function lerp(a, b, t){ return a + (b - a) * t; }
export function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
export function ease(t){ t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
