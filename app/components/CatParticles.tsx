"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Draw sitting cat on offscreen canvas → return world-space home positions
function buildCatHomes(H: number): [number, number][] {
  const CW = 260, CH = 380;
  const canvas = document.createElement("canvas");
  canvas.width = CW;
  canvas.height = CH;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#fff";

  // Left ear
  ctx.beginPath();
  ctx.moveTo(50, 84); ctx.lineTo(40, 8); ctx.lineTo(88, 70);
  ctx.closePath(); ctx.fill();

  // Right ear
  ctx.beginPath();
  ctx.moveTo(132, 70); ctx.lineTo(180, 8); ctx.lineTo(170, 84);
  ctx.closePath(); ctx.fill();

  // Head
  ctx.beginPath();
  ctx.ellipse(110, 112, 66, 62, 0, 0, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.beginPath();
  ctx.ellipse(110, 182, 28, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.beginPath();
  ctx.ellipse(110, 278, 72, 92, 0, 0, Math.PI * 2);
  ctx.fill();

  // Left paw
  ctx.beginPath();
  ctx.ellipse(68, 366, 24, 13, 0, 0, Math.PI * 2);
  ctx.fill();

  // Right paw
  ctx.beginPath();
  ctx.ellipse(152, 366, 24, 13, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tail — sweeps right, curls back
  ctx.save();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 24;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(176, 310);
  ctx.bezierCurveTo(230, 330, 244, 268, 222, 234);
  ctx.bezierCurveTo(208, 210, 190, 218, 182, 252);
  ctx.stroke();
  ctx.restore();

  // Sample every 2 px for dense cloud
  const STEP   = 2;
  const scale  = H * 0.84 / CH;
  const anchorY = H * 0.42;

  const { data } = ctx.getImageData(0, 0, CW, CH);
  const homes: [number, number][] = [];

  for (let y = 0; y < CH; y += STEP) {
    for (let x = 0; x < CW; x += STEP) {
      if (data[(y * CW + x) * 4 + 3] > 50) {
        homes.push([
          (x - CW / 2) * scale,
          anchorY - y * scale,
        ]);
      }
    }
  }

  return homes;
}

export default function CatParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let W = container.offsetWidth;
    let H = container.offsetHeight;

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(W, H);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const makeCamera = (w: number, h: number) => {
      const cam = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, 0.1, 50);
      cam.position.z = 10;
      return cam;
    };
    let camera = makeCamera(W, H);

    // ── Build particles from cat silhouette ───────────────────────
    const homes = buildCatHomes(H);
    const N     = homes.length;

    const posArr    = new Float32Array(N * 3);
    const homeArr   = new Float32Array(N * 2);   // fixed home position
    const phArr     = new Float32Array(N);        // phase offsets (3 per particle via spacing)
    const ampArr    = new Float32Array(N);        // orbit amplitude
    const speedArr  = new Float32Array(N);
    const sizeArr   = new Float32Array(N);
    const alphaArr  = new Float32Array(N);
    const baseAlpha = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      // Scatter start positions
      posArr[i * 3]     = (Math.random() - 0.5) * W;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * H;
      posArr[i * 3 + 2] = 0;

      homeArr[i * 2]     = homes[i][0];
      homeArr[i * 2 + 1] = homes[i][1];

      phArr[i]    = Math.random() * Math.PI * 2;

      // Three layers: core (30%), mid (50%), aura (20%)
      const r = Math.random();
      if (r < 0.30) {
        ampArr[i]   = 4  + Math.random() * 8;   // core — small orbit
        speedArr[i] = 0.055 + Math.random() * 0.025;
        sizeArr[i]  = 2.0 + Math.random() * 2.0;
        baseAlpha[i] = 0.55 + Math.random() * 0.30;
      } else if (r < 0.80) {
        ampArr[i]   = 12 + Math.random() * 16;  // mid — medium orbit
        speedArr[i] = 0.038 + Math.random() * 0.020;
        sizeArr[i]  = 1.8 + Math.random() * 2.5;
        baseAlpha[i] = 0.38 + Math.random() * 0.30;
      } else {
        ampArr[i]   = 30 + Math.random() * 28;  // aura — wild orbit
        speedArr[i] = 0.018 + Math.random() * 0.014;
        sizeArr[i]  = 1.2 + Math.random() * 1.8;
        baseAlpha[i] = 0.18 + Math.random() * 0.18;
      }
    }

    // ── Geometry + shader ─────────────────────────────────────────
    const geo       = new THREE.BufferGeometry();
    const posAttr   = new THREE.BufferAttribute(posArr, 3);
    const alphaAttr = new THREE.BufferAttribute(alphaArr, 1);
    posAttr.usage   = THREE.DynamicDrawUsage;
    alphaAttr.usage = THREE.DynamicDrawUsage;

    geo.setAttribute("position", posAttr);
    geo.setAttribute("aAlpha",   alphaAttr);
    geo.setAttribute("aSize",    new THREE.BufferAttribute(sizeArr, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float aSize;
        attribute float aAlpha;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          gl_PointSize = aSize;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          vec2 p = gl_PointCoord - 0.5;
          float d = length(p) * 2.0;
          if (d > 1.0) discard;
          float a = smoothstep(1.0, 0.0, d) * vAlpha;
          vec3 col = mix(vec3(0.80, 0.38, 1.00), vec3(0.42, 0.16, 0.82), d);
          gl_FragColor = vec4(col, a);
        }
      `,
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(geo, mat));

    // ── Animation — particles chase a continuously moving target ──
    let time = 0;
    let raf: number;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      time += 0.007;

      for (let i = 0; i < N; i++) {
        const ph  = phArr[i];
        const amp = ampArr[i];
        const hx  = homeArr[i * 2];
        const hy  = homeArr[i * 2 + 1];

        // Compound wave: 3 overlapping sine/cosine with different speeds
        const tx = hx
          + amp        * Math.sin(time * 0.80 + ph)
          + amp * 0.45 * Math.sin(time * 1.55 + ph * 1.3 + 1.8)
          + amp * 0.25 * Math.cos(time * 2.40 + ph * 0.7 + 3.1);

        const ty = hy
          + amp        * Math.cos(time * 0.68 + ph)
          + amp * 0.45 * Math.cos(time * 1.30 + ph * 0.9 + 2.4)
          + amp * 0.25 * Math.sin(time * 2.10 + ph * 1.5 + 0.7);

        const sp = speedArr[i];
        posArr[i * 3]     += (tx - posArr[i * 3])     * sp;
        posArr[i * 3 + 1] += (ty - posArr[i * 3 + 1]) * sp;

        // Alpha: fades in as particle nears home (not moving target)
        const dHome = Math.hypot(
          posArr[i * 3]     - hx,
          posArr[i * 3 + 1] - hy
        );
        const proximity = Math.max(0, 1 - dHome / (amp + 50));
        const breath = 0.80 + 0.20 * Math.sin(time * 1.3 + ph);
        alphaArr[i] += (baseAlpha[i] * proximity * breath - alphaArr[i]) * 0.028;
      }

      posAttr.needsUpdate   = true;
      alphaAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      W = container.offsetWidth;
      H = container.offsetHeight;
      renderer.setSize(W, H);
      camera = makeCamera(W, H);
      const next = buildCatHomes(H);
      for (let i = 0; i < Math.min(N, next.length); i++) {
        homeArr[i * 2]     = next[i][0];
        homeArr[i * 2 + 1] = next[i][1];
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
