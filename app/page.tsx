import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ScrollReveal from "./components/ScrollReveal";

/* ─────────────────────────────────────────────
   Cat logo — SVG inline, purple cat face
───────────────────────────────────────────── */
function CatLogo({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="rafadev29 logo"
    >
      {/* Ears */}
      <polygon points="20,56 14,4 48,44" fill="#6d28d9" />
      <polygon points="100,56 106,4 72,44" fill="#6d28d9" />
      <polygon points="24,52 22,18 45,43" fill="#a855f7" />
      <polygon points="96,52 98,18 75,43" fill="#a855f7" />
      {/* Head */}
      <circle cx="60" cy="70" r="47" fill="#6d28d9" />
      {/* Eyes */}
      <ellipse cx="43" cy="65" rx="11" ry="12" fill="#12003a" className="cat-eye" />
      <ellipse cx="77" cy="65" rx="11" ry="12" fill="#12003a" className="cat-eye" />
      {/* Shine */}
      <circle cx="46" cy="60" r="4" fill="white" />
      <circle cx="80" cy="60" r="4" fill="white" />
      {/* Pupils */}
      <ellipse cx="45" cy="67" rx="4.5" ry="6" fill="#2a0060" />
      <ellipse cx="79" cy="67" rx="4.5" ry="6" fill="#2a0060" />
      {/* Nose */}
      <path d="M 55 78 L 60 73 L 65 78 Z" fill="#e879f9" />
      <line x1="60" y1="78" x2="60" y2="82" stroke="#e879f9" strokeWidth="1.6" />
      {/* Mouth */}
      <path d="M 56 82 Q 51 88 46 85" stroke="#e879f9" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 64 82 Q 69 88 74 85" stroke="#e879f9" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="2" y1="73" x2="47" y2="76" stroke="#c084fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <line x1="2" y1="83" x2="47" y2="80" stroke="#c084fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <line x1="118" y1="73" x2="73" y2="76" stroke="#c084fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <line x1="118" y1="83" x2="73" y2="80" stroke="#c084fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Cat ear divider — two subtle triangles + label
   Replaces the plain horizontal rule
───────────────────────────────────────────── */
function CatDivider({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 mb-14">
      {/* Cat ears — two small triangles, very low opacity */}
      <div className="flex items-end gap-2 opacity-30">
        <svg width="11" height="10" viewBox="0 0 11 10" fill="none">
          <polygon points="0,10 5.5,0 11,10" fill="#a855f7" />
        </svg>
        <svg width="11" height="10" viewBox="0 0 11 10" fill="none">
          <polygon points="0,10 5.5,0 11,10" fill="#a855f7" />
        </svg>
      </div>
      {/* Label row */}
      <div className="flex items-center gap-5">
        <div className="h-px w-14 bg-purple-800/35" />
        <span className="text-purple-500/55 text-[11px] font-mono tracking-[0.28em] uppercase">
          {label}
        </span>
        <div className="h-px w-14 bg-purple-800/35" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tech stack data
───────────────────────────────────────────── */
type TechItem = {
  name: string;
  color: string;
  bg: string;
  border: string;
  description?: string;
  badge?: string;
  featured?: boolean;
};

type TechGroup = { category: string; items: TechItem[] };

const techStack: TechGroup[] = [
  {
    category: "Mi Pasión",
    items: [
      {
        name: "NestJS",
        color: "#ea2845",
        bg: "bg-red-950/40",
        border: "border-red-500/50",
        description:
          "El framework que cambió mi carrera. Arquitectura modular, TypeScript-first, inyección de dependencias — todo lo que el backend necesita.",
        badge: "Favorito",
        featured: true,
      },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", color: "#68a063", bg: "bg-green-950/30", border: "border-green-700/40" },
      { name: "TypeScript", color: "#3b82f6", bg: "bg-blue-950/30", border: "border-blue-700/40" },
      { name: "JavaScript", color: "#eab308", bg: "bg-yellow-950/30", border: "border-yellow-600/40" },
      { name: "AWS", color: "#f97316", bg: "bg-orange-950/30", border: "border-orange-600/40" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "Vue 3", color: "#42b883", bg: "bg-emerald-950/30", border: "border-emerald-700/40" },
      { name: "Next.js", color: "#e2e8f0", bg: "bg-slate-900/50", border: "border-slate-600/40" },
    ],
  },
  {
    category: "Bases de Datos",
    items: [
      { name: "PostgreSQL", color: "#60a5fa", bg: "bg-blue-950/30", border: "border-blue-800/40" },
      { name: "MySQL", color: "#22d3ee", bg: "bg-cyan-950/30", border: "border-cyan-800/40" },
      { name: "MongoDB", color: "#4ade80", bg: "bg-green-950/30", border: "border-green-800/40" },
      { name: "SQL Server", color: "#f87171", bg: "bg-red-950/30", border: "border-red-800/40" },
    ],
  },
];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#070711" }}>

      <Header />

      <HeroSection />

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <CatDivider label="Sobre mí" />
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.05}>
              <div className="flex flex-col gap-5 text-purple-200/70 leading-relaxed text-[15px]">
                <p className="text-[16px]">
                  Soy{" "}
                  <span className="text-purple-200 font-semibold">Rafael</span>, también conocido como{" "}
                  <span className="text-purple-300 font-semibold">rafadev29</span> o{" "}
                  <span className="text-purple-300 font-semibold">de29</span>.
                </p>
                <p>
                  Me especializo en desarrollo backend con{" "}
                  <span className="text-purple-300">NestJS, Node.js y TypeScript</span>, y en
                  servicios cloud en <span className="text-purple-300">AWS</span>, construyendo
                  APIs robustas y arquitecturas escalables.
                </p>
                <p>
                  También tengo buena base en frontend con{" "}
                  <span className="text-purple-300">Vue 3</span> y{" "}
                  <span className="text-purple-300">Next.js</span>, y manejo bases de datos
                  relacionales (SQL Server, MySQL, PostgreSQL) y NoSQL (MongoDB).
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div
                className="relative p-7 rounded-2xl border"
                style={{
                  background: "rgba(109,28,217,0.07)",
                  borderColor: "rgba(109,40,217,0.28)",
                }}
              >
                {/* Cat ear accent — top-right corner */}
                <div className="absolute -top-3 right-6 flex items-end gap-1.5 opacity-35">
                  <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
                    <polygon points="0,9 5,0 10,9" fill="#a855f7" />
                  </svg>
                  <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
                    <polygon points="0,9 5,0 10,9" fill="#a855f7" />
                  </svg>
                </div>

                <div className="text-3xl text-purple-700/50 leading-none mb-4 font-serif select-none">
                  "
                </div>
                <p className="text-purple-100/80 text-[14px] leading-[1.85] mb-5">
                  NestJS no es solo mi framework favorito — es el que cambió el rumbo de mi
                  carrera. Su estructura, su elegancia TypeScript-first y la forma en que
                  organiza el pensamiento backend lo convirtieron en algo más que una
                  herramienta.{" "}
                  <span className="text-purple-300 font-medium">
                    Es parte de mi historia.
                  </span>
                </p>
                <span className="text-purple-500/50 text-[12px] font-mono">— rafadev29</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section id="stack" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <CatDivider label="Stack" />
          </ScrollReveal>

          <div className="flex flex-col gap-10">
            {techStack.map((group, gi) => (
              <ScrollReveal key={group.category} delay={gi * 0.06}>
                <div>
                  <h3 className="text-purple-500/50 text-[11px] font-mono tracking-[0.25em] uppercase mb-4">
                    {group.category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {group.items.map((tech) => (
                      <div
                        key={tech.name}
                        className={`relative flex flex-col gap-2.5 p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${tech.bg} ${tech.border} ${tech.featured ? "sm:col-span-2 lg:col-span-2" : ""}`}
                      >
                        {tech.badge && (
                          <span className="absolute top-4 right-4 text-[11px] bg-red-500/15 text-red-400/80 border border-red-500/25 px-2.5 py-0.5 rounded-full font-mono">
                            ❤ {tech.badge}
                          </span>
                        )}
                        <span className="text-[17px] font-bold" style={{ color: tech.color }}>
                          {tech.name}
                        </span>
                        {tech.description && (
                          <p className="text-[12px] text-purple-300/50 leading-relaxed pr-16">
                            {tech.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-lg mx-auto text-center">
          <ScrollReveal>
            <CatDivider label="Contacto" />
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="flex flex-col items-center gap-7">
            {/* Yarn ball — tiny decorative element, contact section only */}
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" className="opacity-30">
              <circle cx="21" cy="21" r="18" stroke="#7c3aed" strokeWidth="1.5" />
              <path d="M 21 3 Q 14 12 21 21 Q 28 30 21 39" stroke="#7c3aed" strokeWidth="1" fill="none" />
              <path d="M 3 21 Q 12 14 21 21 Q 30 28 39 21" stroke="#7c3aed" strokeWidth="1" fill="none" />
              <path d="M 7 8 Q 15 16 12 24 Q 9 32 14 37" stroke="#7c3aed" strokeWidth="0.8" fill="none" opacity="0.7" />
              <path d="M 35 8 Q 27 16 30 24 Q 33 32 28 37" stroke="#7c3aed" strokeWidth="0.8" fill="none" opacity="0.7" />
            </svg>

            <div>
              <h2 className="text-3xl font-bold text-purple-100 mb-3 tracking-tight">
                ¿Hablamos?
              </h2>
              <p className="text-purple-300/50 text-[14px] leading-relaxed">
                Siempre abierto a nuevas oportunidades, proyectos interesantes o simplemente
                una buena conversación sobre arquitectura backend.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="mailto:rosselgalarzarafael@gmail.com"
                className="px-6 py-2.5 rounded-full text-[13px] font-semibold text-white bg-purple-700 hover:bg-purple-600 transition-colors"
              >
                Enviar email
              </a>
              <a
                href="https://github.com/RafaDev29"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full text-[13px] font-semibold text-purple-300 border border-purple-700/50 hover:border-purple-500 hover:text-purple-100 transition-colors"
              >
                GitHub
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-7 px-6 md:px-10 border-t border-purple-900/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-purple-600/35 text-[12px]">
        <div className="flex items-center gap-2">
          <CatLogo size={20} />
          <span>rafadev29 © 2025</span>
        </div>
        <span className="font-mono">Built with Next.js &amp; amor por NestJS</span>
      </footer>
    </div>
  );
}
