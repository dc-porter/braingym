/* Sky: gradient dome, twinkling stars, big planets. Follows the phone's clock. */
import { THREE, C, halo } from "./kit.js";

const MOODS = {
  dawn:  { top: 0x241a5c, mid: 0x7a52c8, low: 0xf2a6d8, stars: 0.6, fog: 0x8163cc },
  day:   { top: 0x1c1556, mid: 0x4a35a0, low: 0xb98cf0, stars: 0.6, fog: 0x6a55c4 },
  dusk:  { top: 0x1b1348, mid: 0x6a3fa8, low: 0xe58ad0, stars: 0.75, fog: 0x7d55c4 },
  night: { top: 0x0d0a26, mid: 0x2a1e5c, low: 0x5b3fa8, stars: 1.0,  fog: 0x4a3a9a }
};
export function moodForHour(h){
  if(h >= 5 && h < 8) return "dawn";
  if(h >= 8 && h < 17) return "day";
  if(h >= 17 && h < 20) return "dusk";
  return "night";
}

export function buildSky(scene, pixelRatio){
  const mood = MOODS[moodForHour(new Date().getHours())];
  const group = new THREE.Group();

  // Gradient dome
  const domeMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new THREE.Color(mood.top) }, mid: { value: new THREE.Color(mood.mid) },
                low: { value: new THREE.Color(mood.low) } },
    vertexShader: "varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
    fragmentShader: [
      "uniform vec3 top; uniform vec3 mid; uniform vec3 low; varying vec3 vDir;",
      "void main(){ float h = vDir.y;",
      " vec3 c = mix(low, mid, smoothstep(-0.12, 0.28, h));",
      " c = mix(c, top, smoothstep(0.22, 0.85, h));",
      " c = mix(c, low * 0.55, smoothstep(-0.12, -0.6, h));",
      " gl_FragColor = vec4(c, 1.0);",
      " #include <colorspace_fragment>",
      "}"].join("\n")
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(900, 24, 16), domeMat);
  dome.renderOrder = -10;
  group.add(dome);

  // Stars
  const N = 520, pos = new Float32Array(N * 3), seed = new Float32Array(N), size = new Float32Array(N);
  for(let i = 0; i < N; i++){
    const u = Math.random() * Math.PI * 2, v = Math.acos(1 - Math.random() * 1.25);
    const r = 860;
    pos[i*3] = r * Math.sin(v) * Math.cos(u); pos[i*3+1] = r * Math.cos(v); pos[i*3+2] = r * Math.sin(v) * Math.sin(u);
    seed[i] = Math.random() * 6.28; size[i] = 1.2 + Math.random() * Math.random() * 3.2;
  }
  const sg = new THREE.BufferGeometry();
  sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  sg.setAttribute("seed", new THREE.BufferAttribute(seed, 1));
  sg.setAttribute("size", new THREE.BufferAttribute(size, 1));
  const starMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending,
    uniforms: { time: { value: 0 }, pr: { value: pixelRatio }, strength: { value: mood.stars } },
    vertexShader: "attribute float seed; attribute float size; uniform float time; uniform float pr; varying float vA;" +
      "void main(){ vA = 0.55 + 0.45 * sin(time * 0.9 + seed * 7.0); gl_PointSize = size * pr;" +
      " gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
    fragmentShader: "uniform float strength; varying float vA; void main(){ vec2 d = gl_PointCoord - 0.5;" +
      " float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(vec3(1.0, 0.96, 1.0), a * vA * strength); }"
  });
  const stars = new THREE.Points(sg, starMat);
  stars.renderOrder = -9;
  group.add(stars);

  // Planets: soft bands plus a bright rim
  function planet(radius, colA, colB, rimCol){
    return new THREE.Mesh(new THREE.SphereGeometry(radius, 40, 28), new THREE.ShaderMaterial({
      fog: false, depthWrite: false,
      uniforms: { a: { value: new THREE.Color(colA) }, b: { value: new THREE.Color(colB) },
                  rim: { value: new THREE.Color(rimCol) }, lightDir: { value: new THREE.Vector3(0.55, 0.6, 0.55).normalize() } },
      vertexShader: "varying vec3 vN; varying vec3 vV; varying vec3 vP; void main(){ vN = normalize(normalMatrix * normal); vP = position;" +
        " vec4 mv = modelViewMatrix * vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",
      fragmentShader: [
        "uniform vec3 a; uniform vec3 b; uniform vec3 rim; uniform vec3 lightDir; varying vec3 vN; varying vec3 vV; varying vec3 vP;",
        "void main(){ float band = 0.5 + 0.5 * sin(vP.y * 0.045 + sin(vP.x * 0.02) * 1.6);",
        " vec3 c = mix(a, b, smoothstep(0.2, 0.8, band));",
        " float lit = clamp(dot(vN, normalize((viewMatrix * vec4(lightDir, 0.0)).xyz)) * 0.6 + 0.55, 0.0, 1.0);",
        "  c *= mix(0.3, 0.92, lit);",
        " float r = pow(1.0 - clamp(dot(vN, vV), 0.0, 1.0), 2.4);",
        " c += rim * r * 0.55;",
        " gl_FragColor = vec4(c, 1.0);",
        " #include <colorspace_fragment>",
        "}"].join("\n")
    }));
  }
  const big = planet(250, 0x4a2f9c, 0xb866c8, 0xffb3de);
  big.position.set(-250, 150, -640); big.renderOrder = -8;
  group.add(big);
  const ring = new THREE.Mesh(new THREE.RingGeometry(310, 440, 64, 1), new THREE.ShaderMaterial({
    side: THREE.DoubleSide, transparent: true, depthWrite: false, fog: false,
    uniforms: { col: { value: new THREE.Color(C.rose) } },
    vertexShader: "varying float vR; void main(){ vR = length(position.xy); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
    fragmentShader: "uniform vec3 col; varying float vR; void main(){ float t = (vR - 310.0) / 130.0;" +
      " float a = smoothstep(0.0, 0.12, t) * smoothstep(1.0, 0.7, t) * (0.35 + 0.3 * sin(t * 38.0));" +
      " gl_FragColor = vec4(col, a * 0.75); }"
  }));
  ring.position.copy(big.position); ring.rotation.set(-1.25, 0.25, 0.3); ring.renderOrder = -7;
  group.add(ring);
  const bigGlow = halo(C.orchid, 820, 0.14); bigGlow.position.copy(big.position); bigGlow.renderOrder = -9;
  group.add(bigGlow);

  const moon = planet(46, 0x6fb7ff, 0xd9d2f2, 0xf4f0ff);
  moon.position.set(300, 330, -520); moon.renderOrder = -8;
  group.add(moon);
  const moonGlow = halo(C.starBlue, 240, 0.35); moonGlow.position.copy(moon.position); moonGlow.renderOrder = -9;
  group.add(moonGlow);

  scene.add(group);
  scene.fog = new THREE.Fog(mood.fog, 70, 520);

  return {
    group: group, mood: mood,
    update: function(t, cameraPos){
      starMat.uniforms.time.value = t;
      group.position.copy(cameraPos);   // the sky never gets closer
      group.position.y = 0;
    },
    setPixelRatio: function(pr){ starMat.uniforms.pr.value = pr; }
  };
}
