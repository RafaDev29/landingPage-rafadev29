function CatLogo({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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
      {/* Philtrum */}
      <line x1="60" y1="78" x2="60" y2="82" stroke="#e879f9" strokeWidth="1.6" />
      {/* Mouth */}
      <path d="M 56 82 Q 51 88 46 85" stroke="#e879f9" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 64 82 Q 69 88 74 85" stroke="#e879f9" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Whiskers left */}
      <line x1="2" y1="73" x2="47" y2="76" stroke="#c084fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
      <line x1="2" y1="83" x2="47" y2="80" stroke="#c084fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
      {/* Whiskers right */}
      <line x1="118" y1="73" x2="73" y2="76" stroke="#c084fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
      <line x1="118" y1="83" x2="73" y2="80" stroke="#c084fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

type TechItem = {
  name: string;
  color: string;
  bg: string;
  border: string;
  description?: string;
  badge?: string;
  featured?: boolean;
};

type TechGroup = {
  category: string;
  items: TechItem[];
};

const techStack: TechGroup[] = [
  {
    category: "Mi Pasión ❤️",
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

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div className="h-px flex-1 bg-purple-800/30" />
      <span className="text-purple-400/80 text-xs font-mono tracking-widest uppercase">{label}</span>
      <div className="h-px flex-1 bg-purple-800/30" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#070711" }}>
      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 border-b border-purple-800/20"
        style={{ background: "rgba(7,7,17,0.85)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-2.5">
          <CatLogo size={34} />
          <span className="font-bold text-purple-200 tracking-wide">rafadev29</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-purple-400">
          <a href="#about" className="hover:text-purple-200 transition-colors">Sobre mí</a>
          <a href="#stack" className="hover:text-purple-200 transition-colors">Stack</a>
          <a href="#contact" className="hover:text-purple-200 transition-colors">Contacto</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-16"
      >
        {/* Radial glow behind cat */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(109,40,217,0.22) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <CatLogo size={200} className="cat-float" />

          <div className="flex flex-col items-center gap-4 fade-in-up fade-delay-1">
            <h1
              className="text-6xl md:text-8xl font-black tracking-tight"
              style={{
                background: "linear-gradient(to bottom, #f3e8ff 0%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              rafadev29
            </h1>
            <p className="text-xl md:text-2xl text-purple-300 font-light tracking-widest uppercase">
              Backend Engineer
            </p>
            <p className="text-sm text-purple-400/70 tracking-wider font-mono">
              NestJS · Node.js · TypeScript · AWS
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 fade-in-up fade-delay-2">
            <a
              href="#stack"
              className="px-7 py-3 rounded-full text-sm font-semibold text-white bg-purple-700 hover:bg-purple-800 transition-all"
            >
              Ver mi stack
            </a>
            <a
              href="#contact"
              className="px-7 py-3 rounded-full text-sm font-semibold text-purple-300 border border-purple-600/50 hover:border-purple-400 hover:text-purple-100 transition-all"
            >
              Contáctame
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-purple-500/50 text-xs font-mono">
          <span>scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-purple-500/50 to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <Divider label="Sobre mí" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bio */}
            <div className="flex flex-col gap-5 text-purple-200/75 leading-relaxed text-[15px]">
              <p className="text-base">
                Soy <span className="text-purple-200 font-semibold">Rafael</span>, también conocido como{" "}
                <span className="text-purple-300 font-semibold">rafadev29</span> o{" "}
                <span className="text-purple-300 font-semibold">de29</span>.
              </p>
              <p>
                Me especializo en desarrollo backend con{" "}
                <span className="text-purple-300">NestJS, Node.js, TypeScript</span> y servicios cloud en{" "}
                <span className="text-purple-300">AWS</span>, construyendo APIs robustas y
                arquitecturas escalables.
              </p>
              <p>
                También tengo buena base en frontend con{" "}
                <span className="text-purple-300">Vue 3</span> y{" "}
                <span className="text-purple-300">Next.js</span>, y manejo tanto bases de datos
                relacionales (SQL Server, MySQL, PostgreSQL) como NoSQL (MongoDB).
              </p>
            </div>

            {/* NestJS card */}
            <div
              className="relative p-7 rounded-2xl border"
              style={{
                background: "rgba(109,28,217,0.08)",
                borderColor: "rgba(109,40,217,0.35)",
              }}
            >
              <div className="absolute -top-4 -right-4">
                <CatLogo size={52} />
              </div>
              <div className="text-4xl text-purple-600/50 leading-none mb-4 font-serif">"</div>
              <p className="text-purple-100/85 text-sm leading-7 mb-5">
                NestJS no es solo mi framework favorito — es el que cambió el rumbo de mi
                carrera. Su estructura, su elegancia TypeScript-first y la forma en que organiza
                el pensamiento backend lo convirtieron en algo más que una herramienta.{" "}
                <span className="text-purple-300 font-medium">Es parte de mi historia.</span>
              </p>
              <span className="text-purple-400/60 text-xs font-mono">— rafadev29</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section id="stack" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Divider label="Stack" />

          <div className="flex flex-col gap-10">
            {techStack.map((group) => (
              <div key={group.category}>
                <h3 className="text-purple-400/60 text-xs font-mono tracking-widest uppercase mb-4">
                  {group.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {group.items.map((tech) => (
                    <div
                      key={tech.name}
                      className={`relative flex flex-col gap-2.5 p-5 rounded-xl border transition-all hover:-translate-y-1 hover:shadow-lg ${tech.bg} ${tech.border} ${tech.featured ? "sm:col-span-2 lg:col-span-2" : ""}`}
                      style={tech.featured ? { boxShadow: "0 0 0 0 transparent" } : {}}
                    >
                      {tech.badge && (
                        <span className="absolute top-4 right-4 text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full font-mono">
                          {tech.badge} ❤️
                        </span>
                      )}
                      <span className="text-lg font-bold" style={{ color: tech.color }}>
                        {tech.name}
                      </span>
                      {tech.description && (
                        <p className="text-xs text-purple-300/55 leading-relaxed pr-8">
                          {tech.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-lg mx-auto text-center">
          <Divider label="Contacto" />

          <div className="flex flex-col items-center gap-7">
            <CatLogo size={72} className="opacity-70" />
            <div>
              <h2 className="text-3xl font-bold text-purple-100 mb-3">¿Hablamos?</h2>
              <p className="text-purple-300/60 text-sm leading-relaxed">
                Siempre abierto a nuevas oportunidades, proyectos interesantes o simplemente
                charlar sobre NestJS y gatos.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:rosselgalarzarafael@gmail.com"
                className="px-7 py-3 rounded-full text-sm font-semibold text-white bg-purple-700 hover:bg-purple-800 transition-all"
              >
                Enviar email
              </a>
              <a
                href="https://github.com/RafaDev29"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-full text-sm font-semibold text-purple-300 border border-purple-600/50 hover:border-purple-400 hover:text-purple-100 transition-all"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 border-t border-purple-800/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-purple-500/40 text-xs">
        <div className="flex items-center gap-2">
          <CatLogo size={22} />
          <span>rafadev29 © 2025</span>
        </div>
        <span className="font-mono">Built with Next.js &amp; amor por NestJS</span>
      </footer>
    </div>
  );
}
