"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Cat ear mark — two proper ears with inner highlight. Clean, brand-level. */
function CatEarMark() {
  return (
    <svg
      width="30"
      height="22"
      viewBox="0 0 44 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="ear-mark overflow-visible"
    >
      {/* Left ear — outer */}
      <polygon id="ear-l" points="1,30 11,1 22,28" fill="#7c3aed" />
      {/* Left ear — inner highlight */}
      <polygon points="5,27 11,7 17,26" fill="#c084fc" fillOpacity="0.45" />
      {/* Right ear — outer */}
      <polygon id="ear-r" points="22,28 33,1 43,30" fill="#7c3aed" />
      {/* Right ear — inner highlight */}
      <polygon points="27,26 33,7 39,27" fill="#c084fc" fillOpacity="0.45" />
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
        ["#ear-l", "#ear-r"],
        { scaleY: 0, transformOrigin: "bottom center" },
        { scaleY: 1, stagger: 0.1, duration: 0.48 }
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
        <CatEarMark />
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
