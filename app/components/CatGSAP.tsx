"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CatGSAP() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      // ── Entrance ──────────────────────────────────────────────
      gsap.set(svg, { opacity: 0, y: 28 });
      gsap.to(svg, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.7 });

      // Ears pop in
      gsap.fromTo(
        ["#ear-l", "#ear-r"],
        { scaleY: 0, transformOrigin: "bottom center" },
        { scaleY: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)", delay: 0.9 }
      );

      // ── Continuous float ───────────────────────────────────────
      gsap.to("#cat-root", {
        y: -18,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });

      // ── Body breathing ────────────────────────────────────────
      gsap.to("#cat-body-shape", {
        scaleY: 1.03,
        scaleX: 0.978,
        transformOrigin: "200px 355px",
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });

      // ── Tail swing ────────────────────────────────────────────
      gsap.to("#cat-tail", {
        rotation: 14,
        svgOrigin: "295 408",
        duration: 2.9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });

      // ── Periodic blink ────────────────────────────────────────
      const blink = () => {
        gsap
          .timeline()
          .to(["#eye-l", "#eye-r"], {
            scaleY: 0.06,
            transformOrigin: "center",
            duration: 0.07,
            ease: "power2.in",
          })
          .to(["#eye-l", "#eye-r"], {
            scaleY: 1,
            duration: 0.12,
            ease: "back.out(2.5)",
          })
          .call(() => gsap.delayedCall(3.5 + Math.random() * 5, blink));
      };
      gsap.delayedCall(2.5 + Math.random() * 2, blink);

      // ── Glasses glint ─────────────────────────────────────────
      gsap.to("#glasses", {
        opacity: 0.95,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // ── Floating code symbols ─────────────────────────────────
      const floatSym = (id: string, delay: number) => {
        const loop = () => {
          gsap.fromTo(
            id,
            { opacity: 0, y: 0 },
            {
              opacity: 0.32,
              y: -72,
              duration: 3.2,
              ease: "power1.out",
              delay: 0,
              onComplete: () =>
                gsap.to(id, {
                  opacity: 0,
                  duration: 0.6,
                  onComplete: () => gsap.delayedCall(2.5 + Math.random() * 3.5, loop),
                }),
            }
          );
        };
        gsap.delayedCall(delay, loop);
      };

      floatSym("#sym1", 1.8);
      floatSym("#sym2", 2.9);
      floatSym("#sym3", 4.1);
      floatSym("#sym4", 3.5);
      floatSym("#sym5", 5.2);
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 420 530"
      width="100%"
      height="100%"
      style={{ maxHeight: "88vh" }}
      aria-hidden
    >
      <defs>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softglow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="bodyGrad" cx="45%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#5b21b6" />
        </radialGradient>
        <radialGradient id="headGrad" cx="42%" cy="36%" r="58%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#6d28d9" />
        </radialGradient>
      </defs>

      {/* ── Ambient glow behind cat ── */}
      <ellipse cx="210" cy="320" rx="155" ry="185" fill="rgba(109,40,217,0.08)" filter="url(#softglow)" />

      {/* ── Floating code symbols ── */}
      <text id="sym1" x="52" y="268" fill="#a855f7" fontSize="13" fontFamily="'Geist Mono', monospace" opacity="0">{"{ }"}</text>
      <text id="sym2" x="338" y="310" fill="#8b5cf6" fontSize="12" fontFamily="'Geist Mono', monospace" opacity="0">{"=>"}</text>
      <text id="sym3" x="64" y="380" fill="#c084fc" fontSize="11" fontFamily="'Geist Mono', monospace" opacity="0">{"const"}</text>
      <text id="sym4" x="332" y="200" fill="#7c3aed" fontSize="11" fontFamily="'Geist Mono', monospace" opacity="0">{"</>"}</text>
      <text id="sym5" x="42" y="168" fill="#a78bfa" fontSize="12" fontFamily="'Geist Mono', monospace" opacity="0">{"//"}</text>

      {/* ── Everything that moves together ── */}
      <g id="cat-root">

        {/* ── Tail (behind body) ── */}
        <path
          id="cat-tail"
          d="M 293 408 Q 366 438 356 368 Q 346 310 304 334"
          stroke="#6d28d9"
          strokeWidth="28"
          fill="none"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* ── Body ── */}
        <ellipse id="cat-body-shape" cx="200" cy="358" rx="108" ry="130" fill="url(#bodyGrad)" />
        {/* Body sheen */}
        <ellipse cx="182" cy="318" rx="52" ry="55" fill="rgba(167,139,250,0.15)" />

        {/* ── Front paws ── */}
        <ellipse cx="148" cy="484" rx="46" ry="20" fill="#5b21b6" />
        <ellipse cx="252" cy="484" rx="46" ry="20" fill="#5b21b6" />
        {/* Toe lines — left paw */}
        <line x1="133" y1="480" x2="133" y2="490" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        <line x1="148" y1="480" x2="148" y2="492" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        <line x1="163" y1="480" x2="163" y2="490" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        {/* Toe lines — right paw */}
        <line x1="237" y1="480" x2="237" y2="490" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        <line x1="252" y1="480" x2="252" y2="492" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        <line x1="267" y1="480" x2="267" y2="490" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />

        {/* ── Neck ── */}
        <ellipse cx="200" cy="263" rx="40" ry="24" fill="#6d28d9" />

        {/* ── Ears (behind head) ── */}
        <polygon id="ear-l" points="118,195 96,106 180,178" fill="#5b21b6" />
        <polygon points="130,188 114,124 170,177" fill="#a855f7" fillOpacity="0.48" />
        <polygon id="ear-r" points="220,178 304,106 282,195" fill="#5b21b6" />
        <polygon points="250,177 286,124 270,188" fill="#a855f7" fillOpacity="0.48" />

        {/* ── Head ── */}
        <circle cx="200" cy="178" r="86" fill="url(#headGrad)" />
        {/* Head sheen */}
        <ellipse cx="184" cy="152" rx="38" ry="34" fill="rgba(167,139,250,0.18)" />

        {/* ── Eyes ── */}
        <ellipse id="eye-l" cx="170" cy="174" rx="20" ry="24" fill="#0d0028" />
        <ellipse id="eye-r" cx="230" cy="174" rx="20" ry="24" fill="#0d0028" />
        {/* Pupils */}
        <ellipse cx="170" cy="177" rx="8" ry="14" fill="#1e0050" />
        <ellipse cx="230" cy="177" rx="8" ry="14" fill="#1e0050" />
        {/* Eye shines */}
        <circle cx="176" cy="166" r="5.5" fill="white" opacity="0.92" />
        <circle cx="236" cy="166" r="5.5" fill="white" opacity="0.92" />
        <circle cx="163" cy="170" r="2.5" fill="white" opacity="0.45" />
        <circle cx="223" cy="170" r="2.5" fill="white" opacity="0.45" />

        {/* ── Programmer glasses ── */}
        <g id="glasses" opacity="0.78">
          {/* Left lens */}
          <rect x="148" y="160" width="45" height="28" rx="5" fill="none" stroke="#c084fc" strokeWidth="1.8" />
          {/* Right lens */}
          <rect x="207" y="160" width="45" height="28" rx="5" fill="none" stroke="#c084fc" strokeWidth="1.8" />
          {/* Bridge */}
          <line x1="193" y1="173" x2="207" y2="173" stroke="#c084fc" strokeWidth="1.8" />
          {/* Left temple */}
          <line x1="148" y1="173" x2="126" y2="171" stroke="#c084fc" strokeWidth="1.8" />
          {/* Right temple */}
          <line x1="252" y1="173" x2="274" y2="171" stroke="#c084fc" strokeWidth="1.8" />
          {/* Lens tint */}
          <rect x="149" y="161" width="43" height="26" rx="4" fill="rgba(139,92,246,0.08)" />
          <rect x="208" y="161" width="43" height="26" rx="4" fill="rgba(139,92,246,0.08)" />
        </g>

        {/* ── Nose ── */}
        <polygon points="193,213 200,203 207,213" fill="#e879f9" />

        {/* ── Mouth ── */}
        <path d="M 200 213 Q 190 222 183 218" stroke="#e879f9" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M 200 213 Q 210 222 217 218" stroke="#e879f9" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* ── Whiskers ── */}
        <line x1="60" y1="200" x2="156" y2="210" stroke="#c084fc" strokeWidth="1.4" opacity="0.65" strokeLinecap="round" />
        <line x1="60" y1="216" x2="156" y2="214" stroke="#c084fc" strokeWidth="1.4" opacity="0.55" strokeLinecap="round" />
        <line x1="340" y1="200" x2="244" y2="210" stroke="#c084fc" strokeWidth="1.4" opacity="0.65" strokeLinecap="round" />
        <line x1="340" y1="216" x2="244" y2="214" stroke="#c084fc" strokeWidth="1.4" opacity="0.55" strokeLinecap="round" />

      </g>
    </svg>
  );
}
