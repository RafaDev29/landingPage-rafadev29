"use client";
import CatGSAP from "./CatGSAP";

const TAGS = ["NestJS", "Node.js", "TypeScript", "AWS"];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen grid md:grid-cols-2 overflow-hidden pt-16"
      style={{
        background:
          "linear-gradient(110deg, #070711 45%, #0e0720 100%)",
      }}
    >
      {/* Subtle left-side radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 22% 52%, rgba(109,40,217,0.1) 0%, transparent 70%)",
        }}
      />

      {/* ── LEFT — Text ── */}
      <div className="relative z-10 flex flex-col justify-center px-10 md:px-14 lg:px-20 py-20 gap-7">

        {/* Cat ear mark */}
        <svg width="48" height="34" viewBox="0 0 44 30" fill="none" aria-hidden
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
          <polygon id="ht-l" points="1,30 11,1 22,28"    fill="#7c3aed" />
          <polygon            points="5,27 11,7 17,26"    fill="#c084fc" fillOpacity="0.4" />
          <polygon id="ht-r" points="22,28 33,1 43,30"   fill="#7c3aed" />
          <polygon            points="27,26 33,7 39,27"   fill="#c084fc" fillOpacity="0.4" />
        </svg>

        {/* Title — CSS char-by-char rise */}
        <h1
          className="leading-none tracking-tight
                     text-[15vw] md:text-[6.5rem] lg:text-[7.5rem] xl:text-[8.5rem]
                     font-black"
          aria-label="rafadev29"
        >
          {"rafadev29".split("").map((char, i) => (
            <span
              key={i}
              className="title-char"
              style={{ animationDelay: `${0.55 + i * 0.042}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Role */}
        <p
          className="text-[13px] md:text-[14px] tracking-[0.3em] uppercase
                     text-purple-300/60 font-light"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 1.1s both" }}
        >
          Backend Engineer
        </p>

        {/* Tech tags */}
        <div
          className="flex flex-wrap gap-2"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 1.25s both" }}
        >
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono text-purple-400/45
                         border border-purple-800/40 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-3 mt-1"
          style={{ animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 1.4s both" }}
        >
          <a
            href="#stack"
            className="px-6 py-2.5 rounded-full text-[12px] font-semibold
                       text-white bg-purple-700 hover:bg-purple-600 transition-colors tracking-wide"
          >
            Ver mi stack
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full text-[12px] font-semibold text-purple-300
                       border border-purple-700/40 hover:border-purple-500 hover:text-purple-100
                       transition-colors tracking-wide"
          >
            Contáctame
          </a>
        </div>
      </div>

      {/* ── RIGHT — Cat particles ── */}
      <div className="relative min-h-[55vw] md:min-h-0">
        {/* Right-side purple glow behind the cat */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 65% at 55% 50%, rgba(139,92,246,0.12) 0%, transparent 72%)",
          }}
        />
        <CatGSAP />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-10 md:left-14 lg:left-20 flex flex-col gap-2
                      text-purple-600/30 text-[10px] font-mono select-none"
           style={{ animation: "fade-up 0.5s ease 1.6s both" }}>
        <span>scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-purple-600/30 to-transparent" />
      </div>
    </section>
  );
}
