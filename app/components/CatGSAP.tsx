"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CatGSAP() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Entrance animation only — no float
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#cat-img-wrap",
        { opacity: 0, scale: 0.93 },
        { opacity: 1, scale: 1, duration: 1.7, ease: "power3.out", delay: 0.8 }
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  // Disintegration particles — sample edge pixels from cat.png
  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = wrapRef.current;
    if (!canvas || !container) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const resize = () => {
      canvas.width  = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      size: number;
    };

    let spawnPoints: Array<{ nx: number; ny: number; ox: number; oy: number }> = [];
    const particles: Particle[] = [];
    let cancelled = false;

    const img = new Image();
    img.src = "/cat3.jpg";

    img.onload = () => {
      if (cancelled) return;

      // Sample edge pixels at reduced resolution
      const SW = 240;
      const SH = Math.round((img.naturalHeight / img.naturalWidth) * SW);
      const off = document.createElement("canvas");
      off.width  = SW;
      off.height = SH;
      const offCtx = off.getContext("2d")!;
      offCtx.drawImage(img, 0, 0, SW, SH);
      const { data } = offCtx.getImageData(0, 0, SW, SH);

      const alpha = (px: number, py: number) => {
        if (px < 0 || py < 0 || px >= SW || py >= SH) return 0;
        return data[(py * SW + px) * 4 + 3];
      };

      // Collect edge pixels (opaque pixel next to transparent)
      for (let sy = 0; sy < SH; sy += 2) {
        for (let sx = 0; sx < SW; sx += 2) {
          if (alpha(sx, sy) < 40) continue;
          const hasTransparentNeighbor =
            alpha(sx - 2, sy) < 40 || alpha(sx + 2, sy) < 40 ||
            alpha(sx, sy - 2) < 40 || alpha(sx, sy + 2) < 40;
          if (!hasTransparentNeighbor) continue;

          // Outward normal from alpha gradient
          const dnx = alpha(sx - 1, sy) - alpha(sx + 1, sy);
          const dny = alpha(sx, sy - 1) - alpha(sx, sy + 1);
          const len  = Math.hypot(dnx, dny) || 1;

          spawnPoints.push({
            ox: sx / SW,   // normalized 0-1
            oy: sy / SH,
            nx: dnx / len,
            ny: dny / len,
          });
        }
      }

      // Pre-populate with staggered lifetimes
      for (let i = 0; i < 280; i++) {
        const p = makeParticle();
        if (p) { p.life = Math.random() * p.maxLife; particles.push(p); }
      }
    };

    const makeParticle = (): Particle | null => {
      if (!spawnPoints.length) return null;
      const W  = canvas.width;
      const H  = canvas.height;
      const sp = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];

      // Map normalized position to actual canvas coords
      const catW = Math.min(360, W * 0.70);
      const catH = catW * ((img.naturalHeight / img.naturalWidth) || 1.3);
      const catX = (W - catW) / 2;
      const catY = (H - catH) / 2;

      const speed = 0.25 + Math.random() * 0.7;
      return {
        x:       catX + sp.ox * catW,
        y:       catY + sp.oy * catH,
        vx:      sp.nx * speed * 0.5 + (Math.random() - 0.5) * 0.55,
        vy:      sp.ny * speed * 0.35 - (0.15 + Math.random() * 0.5),
        life:    0,
        maxLife: 60 + Math.random() * 110,
        size:    0.7 + Math.random() * 2.2,
      };
    };

    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life > p.maxLife) {
          const next = makeParticle();
          if (next) { particles[i] = next; } else { particles.splice(i, 1); }
          continue;
        }

        p.x  += p.vx;
        p.y  += p.vy;
        p.vy -= 0.009;
        p.vx += (Math.random() - 0.5) * 0.05;

        const t = p.life / p.maxLife;
        const a = t < 0.12 ? t / 0.12 : t > 0.62 ? (1 - t) / 0.38 : 1;

        // Purple-lavender palette
        const jitter = Math.random() * 40;
        ctx2d.globalAlpha = a * 0.72;
        ctx2d.fillStyle   = `rgb(${170 + jitter | 0}, ${90 + jitter * 0.6 | 0}, 255)`;
        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx2d.fill();
      }
      ctx2d.globalAlpha = 1;
    };
    tick();

    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      {/* Particles fly out from the cat's edges */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Cat — pure CSS purple tint, edges dissolved by mask */}
      <div
        id="cat-img-wrap"
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(360px, 70%)",
          // Dissolve mask: center solid, edges fade away where particles take over
          maskImage:
            "radial-gradient(ellipse 52% 56% at 50% 44%, black 30%, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.32) 68%, transparent 83%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 52% 56% at 50% 44%, black 30%, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.32) 68%, transparent 83%)",
          filter:
            "drop-shadow(0 0 22px rgba(139,92,246,0.5)) drop-shadow(0 0 6px rgba(109,40,217,0.6))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cat3.jpg"
          alt="cat"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            // Purple tint with no overlay div — sepia shifts warm → purple after hue-rotate
            filter:
              "grayscale(1) sepia(1) hue-rotate(205deg) saturate(2.8) brightness(0.78) contrast(1.1)",
          }}
        />
      </div>
    </div>
  );
}
