/* Effects: lamp halos, drifting motes and the light-up burst.
   Each is one batch, so each costs the phone a single draw. */
import { THREE, C } from "./kit.js";

const VERT = [
  "attribute float size; attribute vec3 tint; attribute float seed; uniform float time; uniform float pr; uniform float scale;",
  "varying vec3 vTint; varying float vA;",
  "void main(){ vTint = tint; vA = 0.8 + 0.2 * sin(time * 1.6 + seed);",
  " vec4 mv = modelViewMatrix * vec4(position, 1.0);",
  " gl_PointSize = min(size * scale * pr / max(0.1, -mv.z), 220.0 * pr);",
  " gl_Position = projectionMatrix * mv; }"].join("\n");
const FRAG = "uniform float alpha; varying vec3 vTint; varying float vA; void main(){ float d = length(gl_PointCoord - 0.5);" +
  " float a = smoothstep(0.5, 0.0, d); a = a * a; gl_FragColor = vec4(vTint, a * vA * alpha); }";

function pointsMesh(count, alpha){
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  g.setAttribute("tint", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  g.setAttribute("size", new THREE.BufferAttribute(new Float32Array(count), 1));
  g.setAttribute("seed", new THREE.BufferAttribute(new Float32Array(count), 1));
  const m = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 }, pr: { value: 1 }, scale: { value: 300 }, alpha: { value: alpha } },
    vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, fog: false
  });
  const p = new THREE.Points(g, m);
  p.frustumCulled = false;
  return p;
}

export function buildEffects(scene){
  const col = new THREE.Color();

  // --- Lamp halos (fixed) ---
  let lampPts = null;
  function setLamps(list){
    if(lampPts){ scene.remove(lampPts); lampPts.geometry.dispose(); }
    lampPts = pointsMesh(list.length, 0.55);
    const g = lampPts.geometry;
    list.forEach(function(l, i){
      g.attributes.position.setXYZ(i, l.p[0], l.p[1], l.p[2]);
      col.set(l.color); g.attributes.tint.setXYZ(i, col.r, col.g, col.b);
      g.attributes.size.setX(i, l.size); g.attributes.seed.setX(i, i * 1.7);
    });
    scene.add(lampPts);
  }

  // --- Drifting motes around an isle ---
  const MOTES = 160;
  const motes = pointsMesh(MOTES, 0.5);
  const mBase = [];
  (function(){
    const g = motes.geometry, tints = [C.moonWhite, C.rose, C.starBlue, C.aqua];
    for(let i = 0; i < MOTES; i++){
      const a = Math.random() * 6.28, r = 4 + Math.random() * 40;
      mBase.push([Math.cos(a) * r, -4 + Math.random() * 26, Math.sin(a) * r, Math.random() * 6.28]);
      col.set(tints[i % 4]); g.attributes.tint.setXYZ(i, col.r, col.g, col.b);
      g.attributes.size.setX(i, 0.35 + Math.random() * 0.6); g.attributes.seed.setX(i, Math.random() * 6.28);
    }
  })();
  scene.add(motes);
  let moteLimit = MOTES;

  // --- The light-up burst ---
  const BURST = 110;
  const burst = pointsMesh(BURST, 0);
  const bVel = new Float32Array(BURST * 3);
  let burstLife = 0;
  scene.add(burst);
  function fireBurst(origin, hex){
    const g = burst.geometry;
    col.set(hex);
    for(let i = 0; i < BURST; i++){
      const a = Math.random() * 6.28, up = Math.random() * 1.2 - 0.2, sp = 3 + Math.random() * 8;
      g.attributes.position.setXYZ(i, origin.x + (Math.random() - 0.5) * 4, origin.y + (Math.random() - 0.5) * 6, origin.z);
      bVel[i*3] = Math.cos(a) * sp; bVel[i*3+1] = up * sp; bVel[i*3+2] = Math.sin(a) * sp * 0.6 + 1.5;
      g.attributes.tint.setXYZ(i, col.r, col.g, col.b);
      g.attributes.size.setX(i, 0.6 + Math.random() * 1.2); g.attributes.seed.setX(i, Math.random() * 6.28);
    }
    g.attributes.tint.needsUpdate = g.attributes.size.needsUpdate = g.attributes.seed.needsUpdate = true;
    burstLife = 1.6;
  }

  return {
    setLamps: setLamps, fireBurst: fireBurst,
    setMoteLimit: function(n){ moteLimit = Math.min(MOTES, n); motes.geometry.setDrawRange(0, moteLimit); },
    moteCount: function(){ return moteLimit; },
    setPixelRatio: function(pr, viewportH){
      [lampPts, motes, burst].forEach(function(p){ if(p){ p.material.uniforms.pr.value = pr; p.material.uniforms.scale.value = viewportH * 0.9; } });
    },
    update: function(t, dt, center, calm){
      if(lampPts) lampPts.material.uniforms.time.value = calm ? 0 : t;
      motes.material.uniforms.time.value = t;
      motes.visible = !calm;
      if(!calm){
        const P = motes.geometry.attributes.position;
        for(let i = 0; i < moteLimit; i++){
          const b = mBase[i];
          P.setXYZ(i, center.x + b[0] + Math.sin(t * 0.21 + b[3]) * 1.6, b[1] + Math.sin(t * 0.33 + b[3] * 2.0) * 1.2, center.z + b[2] + Math.cos(t * 0.19 + b[3]) * 1.6);
        }
        P.needsUpdate = true;
      }
      if(burstLife > 0){
        burstLife -= dt;
        const P = burst.geometry.attributes.position;
        for(let i = 0; i < BURST; i++){
          P.setXYZ(i, P.getX(i) + bVel[i*3] * dt, P.getY(i) + bVel[i*3+1] * dt, P.getZ(i) + bVel[i*3+2] * dt);
          bVel[i*3+1] -= 2.2 * dt;
        }
        P.needsUpdate = true;
        burst.material.uniforms.alpha.value = Math.max(0, burstLife / 1.6) * 0.9;
        burst.visible = true;
      }else burst.visible = false;
    }
  };
}
