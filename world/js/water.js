/* Water: one rippling surface far below, and waterfalls of light. */
import { THREE, C, halo } from "./kit.js";

export function buildWater(scene, fogColor){
  const uniforms = {
    time: { value: 0 }, simple: { value: 0 },
    deep: { value: new THREE.Color(0x2a2a8c) }, shallow: { value: new THREE.Color(C.aqua) },
    far: { value: new THREE.Color(fogColor) }, sparkle: { value: new THREE.Color(C.moonWhite) }
  };
  const mat = new THREE.ShaderMaterial({
    uniforms: uniforms, fog: false, transparent: true, depthWrite: false,
    vertexShader: "varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",
    fragmentShader: [
      "uniform float time; uniform float simple; uniform vec3 deep; uniform vec3 shallow; uniform vec3 far; uniform vec3 sparkle; varying vec3 vW;",
      "void main(){",
      " vec2 p = vW.xz * 0.06;",
      " float r = sin(p.x * 1.7 + time * 0.6) * sin(p.y * 1.3 - time * 0.45) + 0.5 * sin((p.x + p.y) * 3.1 + time * 0.9);",
      " r = mix(r, 0.0, simple);",
      " vec3 c = mix(deep, shallow, 0.38 + 0.22 * r);",
      " float sp = pow(max(0.0, sin(p.x * 9.0 + time * 1.3) * sin(p.y * 11.0 - time * 1.1)), 18.0) * (1.0 - simple);",
      " c += sparkle * sp * 0.8;",
      " float d = length(vW.xz - cameraPosition.xz);",
      " float f = smoothstep(120.0, 620.0, d);",
      " c = mix(c, far, f);",
      " gl_FragColor = vec4(c, mix(0.92, 0.0, smoothstep(520.0, 800.0, d)));",
      " #include <colorspace_fragment>",
      "}"].join("\n")
  });
  const water = new THREE.Mesh(new THREE.PlaneGeometry(1800, 1800, 1, 1), mat);
  water.rotation.x = -Math.PI / 2; water.position.y = -34; water.renderOrder = -5;
  scene.add(water);

  // Waterfalls: moving streaks of light, all drawn as one mesh
  const fallU = { time: { value: 0 }, col: { value: new THREE.Color(C.aqua) } };
  const fallMat = new THREE.ShaderMaterial({
    uniforms: fallU, transparent: true, depthWrite: false, side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending, fog: false,
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
    fragmentShader: "uniform float time; uniform vec3 col; varying vec2 vUv; void main(){" +
      " float streak = 0.5 + 0.5 * sin(vUv.x * 26.0 + sin(vUv.y * 5.0 + time) * 0.6);" +
      " float flow = 0.55 + 0.45 * sin(vUv.y * 22.0 + time * 5.0 + vUv.x * 9.0);" +
      " float edge = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);" +
      " float fade = smoothstep(0.0, 0.1, vUv.y) * (0.25 + 0.75 * vUv.y);" +
      " gl_FragColor = vec4(col + vec3(0.35), streak * flow * edge * fade * 0.6); }"
  });
  const falls = new THREE.Group();
  const mists = [];
  function addFall(x, z, width, height, yTop, rotY){
    const m = new THREE.Mesh(new THREE.PlaneGeometry(width, height, 1, 1), fallMat);
    m.position.set(x, yTop - height / 2, z); m.rotation.y = rotY;
    falls.add(m);
    const mist = halo(C.aqua, width * 4.5, 0.28);
    mist.position.set(x, yTop - height, z);
    falls.add(mist); mists.push(mist);
  }
  scene.add(falls);

  return {
    addFall: addFall,
    update: function(t){ uniforms.time.value = t; fallU.time.value = t; },
    setSimple: function(on){ uniforms.simple.value = on ? 1 : 0; }
  };
}
