"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/* 3 triangles — cat claw / ear mark. No face, no whiskers, just geometry. */
function TriMark() {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 34 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="tri-mark overflow-visible"
    >
      {/* Left — slightly shorter, recedes */}
      <polygon
        id="tri-l"
        points="0,22 5.5,5 11,22"
        fill="#8b5cf6"
        fillOpacity="0.65"
      />
      {/* Center — tallest, dominant */}
      <polygon
        id="tri-c"
        points="11.5,22 17,0 22.5,22"
        fill="#a855f7"
      />
      {/* Right — mirror of left */}
      <polygon
        id="tri-r"
        points="23,22 28.5,5 34,22"
        fill="#8b5cf6"
        fillOpacity="0.65"
      />
    </svg>
  );
}

export default function Header() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* Claws grow up from the base — like a cat extending its nails */
      tl.fromTo(
        ["#tri-l", "#tri-c", "#tri-r"],
        { scaleY: 0, transformOrigin: "bottom center" },
        { scaleY: 1, stagger: 0.09, duration: 0.48 }
      )
        /* Brand name clips in left → right */
        .fromTo(
          ".brand-name",
          { clipPath: "inset(0 100% 0 0)", opacity: 1 },
          { clipPath: "inset(0 0% 0 0)", duration: 0.52, ease: "power3.inOut" },
          "-=0.22"
        )
        /* Nav links drop in with stagger */
        .fromTo(
          ".nav-link",
          { y: -8, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.38 },
          "-=0.28"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={ref}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-7 md:px-12 py-4 border-b border-white/[0.04]"
      style={{ background: "rgba(7,7,17,0.82)", backdropFilter: "blur(16px)" }}
    >
      {/* Logo — mark + wordmark */}
      <a href="#hero" className="flex items-end gap-3 select-none" aria-label="Home">
        <TriMark />
        <span
          className="brand-name font-bold text-[15px] tracking-widest text-purple-100/90 uppercase"
          style={{ letterSpacing: "0.18em" }}
        >
          rafadev29
        </span>
      </a>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-9">
        {["Sobre mí", "Stack", "Contacto"].map((label) => (
          <a
            key={label}
            href={`#${label === "Sobre mí" ? "about" : label.toLowerCase()}`}
            className="nav-link text-[12px] font-mono tracking-[0.18em] uppercase text-purple-400/60 hover:text-purple-200 transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
