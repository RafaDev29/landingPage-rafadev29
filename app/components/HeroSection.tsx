"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const TAGS = ["NestJS", "Node.js", "TypeScript", "AWS"];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.55, // lets Header finish first
      });

      /* 1 — Triangle mark grows up from base */
      tl.fromTo(
        ["#ht-l", "#ht-c", "#ht-r"],
        { scaleY: 0, transformOrigin: "bottom center" },
        { scaleY: 1, stagger: 0.09, duration: 0.5 }
      )

        /* 2 — Each char of "rafadev29" rises (y + opacity, plays safe with gradient text) */
        .fromTo(
          ".title-char",
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.028, duration: 0.65, ease: "power4.out" },
          "-=0.18"
        )

        /* 3 — Role line clips left → right */
        .fromTo(
          ".hero-role",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "power3.inOut" },
          "-=0.38"
        )

        /* 4 — Tech tags stagger up */
        .fromTo(
          ".hero-tag",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.38, ease: "power2.out" },
          "-=0.25"
        )

        /* 5 — CTA buttons */
        .fromTo(
          ".hero-cta",
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.09, duration: 0.38 },
          "-=0.2"
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-20"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 46%, rgba(109,40,217,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* ── Triangle mark (larger version of header mark) ── */}
        <svg
          width="72"
          height="54"
          viewBox="0 0 34 22"
          fill="none"
          aria-hidden
        >
          <polygon id="ht-l" points="0,22 5.5,5 11,22"   fill="#8b5cf6" fillOpacity="0.55" />
          <polygon id="ht-c" points="11.5,22 17,0 22.5,22" fill="#a855f7" />
          <polygon id="ht-r" points="23,22 28.5,5 34,22"  fill="#8b5cf6" fillOpacity="0.55" />
        </svg>

        {/* ── Name — char by char ── */}
        <h1
          className="hero-title flex flex-wrap justify-center leading-none tracking-tight
                     text-8xl md:text-[7.5rem] lg:text-[9rem] font-black"
          aria-label="rafadev29"
        >
          {"rafadev29".split("").map((char, i) => (
            <span key={i} className="title-char inline-block">
              {char}
            </span>
          ))}
        </h1>

        {/* ── Role ── */}
        <p
          className="hero-role text-[13px] md:text-[15px] tracking-[0.32em] uppercase
                     text-purple-300/65 font-light"
        >
          Backend Engineer
        </p>

        {/* ── Tech tags ── */}
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="hero-tag text-[11px] font-mono text-purple-400/50
                         border border-purple-700/30 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── CTAs ── */}
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <a
            href="#stack"
            className="hero-cta px-6 py-2.5 rounded-full text-[12px] font-semibold
                       text-white bg-purple-700 hover:bg-purple-600 transition-colors tracking-wide"
          >
            Ver mi stack
          </a>
          <a
            href="#contact"
            className="hero-cta px-6 py-2.5 rounded-full text-[12px] font-semibold
                       text-purple-300 border border-purple-700/45 hover:border-purple-500
                       hover:text-purple-100 transition-colors tracking-wide"
          >
            Contáctame
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2
                      text-purple-600/35 text-[10px] font-mono select-none">
        <span>scroll</span>
        <div className="w-px h-7 bg-gradient-to-b from-purple-600/35 to-transparent" />
      </div>
    </section>
  );
}
