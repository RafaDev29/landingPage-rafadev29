"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Radial glow texture generated on canvas */
function glowTex(r: number, g: number, b: number, size = 64): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0,   `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.4, `rgba(${r},${g},${b},0.3)`);
  grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

/* Add a single glowing sprite */
function addSprite(
  scene: THREE.Scene,
  tex: THREE.Texture,
  x: number, y: number, z: number,
  scale: number,
  opacity: number
) {
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const s = new THREE.Sprite(mat);
  s.position.set(x, y, z);
  s.scale.setScalar(scale);
  scene.add(s);
}

/* Cat paw constellation: 1 large pad + 4 toe pads */
function addPaw(
  scene: THREE.Scene,
  tex: THREE.Texture,
  cx: number, cy: number, cz: number
) {
  addSprite(scene, tex, cx, cy, cz, 0.22, 0.8);
  for (let t = 0; t < 4; t++) {
    const angle = (Math.PI * 0.72 / 3) * t - Math.PI * 0.36 + Math.PI / 2;
    addSprite(
      scene, tex,
      cx + Math.cos(angle) * 0.16,
      cy + Math.sin(angle) * 0.16 + 0.14,
      cz,
      0.12, 0.6
    );
  }
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1, 100
    );
    camera.position.z = 5;

    /* ── Stars ── */
    const COUNT = 2400;
    const pos   = new Float32Array(COUNT * 3);
    const col   = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#ddd6fe"),
      new THREE.Color("#c4b5fd"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#818cf8"),
    ];

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 4 + Math.random() * 14;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(geo, mat);
    scene.add(stars);

    /* ── Nebula clouds ── */
    const nTex1 = glowTex(139, 92, 246);   // purple
    const nTex2 = glowTex(79,  70, 229);   // indigo

    const nebulae: [number, number, number, number][] = [
      [-3.5,  1.2, -5,  3.8],
      [ 4,   -1.5, -6,  4.2],
      [-0.5, -3,   -4,  3],
      [ 3.5,  3,   -7,  5],
      [-4.5, -0.5, -5,  3.5],
      [ 0.5,  4,   -6,  4.5],
    ];
    nebulae.forEach(([x, y, z, sc], i) => {
      addSprite(scene, i % 2 === 0 ? nTex1 : nTex2, x, y, z, sc, 0.1 + Math.random() * 0.07);
    });

    /* ── Cat paw constellations ── */
    const pawTex = glowTex(192, 132, 252);  // purple-300

    const pawPositions: [number, number, number][] = [
      [-4.5,  2,   -3],
      [ 4,   -1.8, -2.5],
      [-2,   -3.5, -3.5],
      [ 4.5,  3.2, -4],
      [-3.5,  0.2, -2.5],
      [ 1.2, -2.5, -3],
      [-1,    4,   -4],
      [ 2.5,  1.5, -3],
    ];
    pawPositions.forEach(([x, y, z]) => addPaw(scene, pawTex, x, y, z));

    /* ── Mouse parallax ── */
    let tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth  - 0.5) * 0.7;
      ty = -(e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── Render loop ── */
    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      stars.rotation.y += 0.00022;
      stars.rotation.x += 0.00007;
      camera.position.x += (tx - camera.position.x) * 0.04;
      camera.position.y += (ty - camera.position.y) * 0.04;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  );
}
