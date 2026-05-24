"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  Circle,
  Grid2X2,
  Home,
  Infinity,
  Menu,
  Moon,
  Orbit,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import {
  themeIds,
  themeMap,
  type JevTheme,
  type JevThemeId,
} from "@/lib/jevtech-themes";

const PHI = 1.618033988749895;
const navItems = ["Home", "About", "Projects", "Contact"] as const;

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function goldenRect(width = 987) {
  return { width, height: width / PHI };
}

function runSelfTests() {
  const results: Array<{ name: string; passed: boolean }> = [];
  const test = (name: string, condition: boolean) =>
    results.push({ name, passed: Boolean(condition) });
  const rect = goldenRect(987);

  test(
    "only light, dark, and cosmic themes exist",
    Object.keys(themeMap).sort().join(",") === "cosmic,dark,light"
  );
  test(
    "each theme has a production image path",
    Object.values(themeMap).every(
      (t) => t.image.startsWith("/images/themes/") && t.image.endsWith("-hero.png")
    )
  );
  test("each theme has four cards", Object.values(themeMap).every((t) => t.cards.length === 4));
  test("golden ratio constant is accurate", Math.abs(PHI - 1.618033988749895) < 0.0000000001);
  test(
    "golden rectangle computes width / height as phi",
    Math.abs(rect.width / rect.height - PHI) < 0.0000000001
  );
  test("navigation includes home, about, projects, contact", navItems.join(",") === "Home,About,Projects,Contact");

  return results;
}

declare global {
  interface Window {
    __JEVTECH_PORTFOLIO_TESTS__?: typeof runSelfTests;
  }
}

function GoldenMeanLogo({
  theme,
  className = "",
}: {
  theme: JevTheme;
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 144 89" aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="142"
        height="87"
        rx="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.34"
      />
      <g fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.34">
        <rect x="55" y="0" width="89" height="89" />
        <rect x="0" y="34" width="55" height="55" />
        <rect x="0" y="0" width="34" height="34" />
        <rect x="34" y="0" width="21" height="21" />
        <rect x="42" y="21" width="13" height="13" />
        <rect x="34" y="26" width="8" height="8" />
      </g>
      <g fill="none" stroke={theme.accent} strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M55 89 A89 89 0 0 0 144 0" />
        <path d="M0 34 A55 55 0 0 0 55 89" />
        <path d="M34 0 A34 34 0 0 0 0 34" />
        <path d="M55 21 A21 21 0 0 0 34 0" />
        <path d="M42 34 A13 13 0 0 0 55 21" />
        <path d="M34 26 A8 8 0 0 0 42 34" />
      </g>
      <circle cx="39" cy="30" r="3.4" fill={theme.accent} />
    </svg>
  );
}

function Logo({ theme, onHome }: { theme: JevTheme; onHome: () => void }) {
  return (
    <button onClick={onHome} className="group flex items-center gap-3" aria-label="Go home">
      <span className={cn("grid h-10 w-[64px] place-items-center rounded-[10px] border bg-current/[.025]", theme.accentBorder)}>
        <GoldenMeanLogo theme={theme} className="h-7 w-[45px]" />
      </span>
      <span className="text-sm font-semibold uppercase tracking-[.28em]">JevTech</span>
    </button>
  );
}

function GoldenSpiral({
  theme,
  className = "",
  opacity = 0.62,
}: {
  theme: JevTheme;
  className?: string;
  opacity?: number;
}) {
  return (
    <svg className={className} viewBox="0 0 610 377" aria-hidden="true" style={{ opacity }}>
      <path d="M233 377 A377 377 0 0 0 610 0" fill="none" stroke={theme.accent} strokeWidth="3" />
      <path d="M0 144 A233 233 0 0 0 233 377" fill="none" stroke={theme.accent} strokeWidth="3" />
      <path d="M144 0 A144 144 0 0 0 0 144" fill="none" stroke={theme.accent} strokeWidth="3" />
      <path d="M233 89 A89 89 0 0 0 144 0" fill="none" stroke={theme.accent} strokeWidth="3" />
      <path d="M178 144 A55 55 0 0 0 233 89" fill="none" stroke={theme.accent} strokeWidth="3" />
      <path d="M144 110 A34 34 0 0 0 178 144" fill="none" stroke={theme.accent} strokeWidth="3" />
      <path d="M165 89 A21 21 0 0 0 144 110" fill="none" stroke={theme.accent} strokeWidth="3" />
      <path d="M178 102 A13 13 0 0 0 165 89" fill="none" stroke={theme.accent} strokeWidth="3" />
      <line x1="0" y1="188" x2="610" y2="188" stroke={theme.accent} strokeWidth="1" opacity=".45" />
      <line x1="305" y1="0" x2="305" y2="377" stroke={theme.accent} strokeWidth="1" opacity=".38" />
    </svg>
  );
}

function TopNav({
  theme,
  activeTheme,
  setActiveTheme,
  setPage,
}: {
  theme: JevTheme;
  activeTheme: JevThemeId;
  setActiveTheme: (theme: JevThemeId) => void;
  setPage: (page: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("relative z-30 border-b backdrop-blur-xl", theme.nav)}>
      <div className="mx-auto flex h-[74px] max-w-[1160px] items-center justify-between px-5 lg:px-8">
        <Logo theme={theme} onHome={() => setPage("home")} />

        <nav className="hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[.22em] md:flex">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => setPage(item.toLowerCase())}
              className={cn(
                "border-b py-2 transition",
                index === 0 ? cn(theme.accentText, theme.accentBorder) : "border-transparent opacity-85 hover:opacity-100"
              )}
            >
              {item}
            </button>
          ))}
          <a href="/resume.pdf" className={cn("inline-flex items-center gap-2 border px-4 py-3 transition", theme.buttonClass)}>
            <ArrowDownToLine size={15} /> Resume
          </a>
        </nav>

        <div className="hidden gap-2 md:flex">
          {themeIds.map((id) => (
            <button
              key={id}
              onClick={() => setActiveTheme(id)}
              className={cn(
                "rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[.18em] transition",
                activeTheme === id ? cn(theme.accentText, theme.accentBorder) : "border-current/15 opacity-70 hover:opacity-100"
              )}
            >
              {id}
            </button>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="grid gap-3 border-t border-current/10 px-5 py-4 md:hidden">
          {navItems.map((item) => (
            <button key={item} onClick={() => setPage(item.toLowerCase())} className="py-2 text-left text-sm uppercase tracking-[.18em]">
              {item}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            {themeIds.map((id) => (
              <button
                key={id}
                onClick={() => setActiveTheme(id)}
                className={cn("flex-1 border px-3 py-2 text-xs uppercase", activeTheme === id ? theme.accentBorder : "border-current/15")}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function LeftRail({
  theme,
  activeTheme,
  setActiveTheme,
}: {
  theme: JevTheme;
  activeTheme: JevThemeId;
  setActiveTheme: (theme: JevThemeId) => void;
}) {
  const icons = [
    ["light", Sun],
    ["dark", Moon],
    ["cosmic", Orbit],
    ["grid", Grid2X2],
    ["spark", Sparkles],
    ["loop", Infinity],
  ] as const;

  return (
    <aside className="absolute left-4 top-28 z-20 hidden overflow-hidden rounded-md border border-current/15 bg-black/5 backdrop-blur-md lg:block">
      {icons.map(([id, Icon]) => (
        <button
          key={id}
          onClick={() => id in themeMap && setActiveTheme(id as JevThemeId)}
          className={cn(
            "grid h-14 w-14 place-items-center border-b border-current/10 transition last:border-b-0",
            activeTheme === id ? theme.accentText : "opacity-65 hover:opacity-100"
          )}
          aria-label={id in themeMap ? `Switch to ${id}` : id}
        >
          <Icon size={18} />
        </button>
      ))}
    </aside>
  );
}

function HeroImage({ theme }: { theme: JevTheme }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden after:absolute after:inset-0", theme.imageBlend)}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: theme.heroFallback }} />
      <img
        src={theme.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-100"
      />
    </div>
  );
}

function HomePage({
  theme,
  activeTheme,
  setActiveTheme,
  setPage,
}: {
  theme: JevTheme;
  activeTheme: JevThemeId;
  setActiveTheme: (theme: JevThemeId) => void;
  setPage: (page: string) => void;
}) {
  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[600px] overflow-hidden border-b border-current/10">
        <HeroImage theme={theme} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px)] bg-[length:96px_96px] opacity-45" />
        <LeftRail theme={theme} activeTheme={activeTheme} setActiveTheme={setActiveTheme} />

        <section className="relative z-10 mx-auto grid min-h-[600px] max-w-[1160px] items-center px-5 py-10 lg:grid-cols-[390px_1fr] lg:px-8">
          <div className="max-w-[360px] lg:pl-12">
            <p className={cn("mb-5 text-[11px] font-black uppercase tracking-[.34em]", theme.accentText)}>
              {theme.navMission}
            </p>
            <h1 className="text-[2.85rem] font-black uppercase leading-[.92] tracking-[-.055em] md:text-[3.7rem]">
              {theme.mission.split(" ").map((word) => (
                <span key={word} className="block">
                  {word}
                </span>
              ))}
            </h1>
            <p className="mt-6 text-[13px] font-black uppercase leading-6 tracking-[.09em]">
              {theme.eyebrow}
            </p>
            <p className="mt-6 max-w-[300px] text-[13px] leading-6 opacity-78">
              {theme.body}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setPage("projects")}
                className={cn(
                  "inline-flex items-center justify-center gap-3 border px-5 py-3.5 text-[11px] font-black uppercase tracking-[.18em] transition",
                  theme.buttonClass
                )}
              >
                {theme.button} <ArrowRight size={16} />
              </button>
              <a
                href="/resume.pdf"
                className="inline-flex items-center justify-center gap-3 border border-current/20 px-5 py-3.5 text-[11px] font-black uppercase tracking-[.18em] transition hover:bg-current/10"
              >
                Resume <ArrowDownToLine size={16} />
              </a>
            </div>
          </div>

          <div className="relative hidden min-h-[420px] lg:block" aria-hidden="true" />
        </section>
      </section>

      <section className="relative z-10 bg-black/[.09] py-8 backdrop-blur-sm">
        <div className="mx-auto max-w-[1160px] px-5 lg:px-8">
          <h2 className="text-center text-[12px] font-black uppercase tracking-[.24em]">
            {theme.sectionTitle}
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-4">
            {theme.cards.map(([title, copy]) => (
              <article
                key={title}
                className="min-h-[106px] rounded-md border border-current/12 bg-current/[.025] p-5 backdrop-blur-md"
              >
                <Circle className={theme.accentText} size={22} />
                <h3 className="mt-4 text-[12px] font-black uppercase tracking-[.14em]">
                  {title}
                </h3>
                <p className="mt-2 text-[11px] leading-5 opacity-70">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function InteriorPage({ theme, page, setPage }: { theme: JevTheme; page: string; setPage: (page: string) => void }) {
  const content =
    {
      about: [
        "About",
        "The mission behind the work",
        "JevTech is built around making things happen: learning what is needed, finding the path forward, and building useful systems. This portfolio turns that story into a themed experience built around Light, Dark, and Cosmic modes.",
      ],
      projects: [
        "Projects",
        "Artifacts of the mission",
        "Featured work includes Mineral Kingdom, JevTech Portfolio, systems design studies, and future tools that show practical software engineering from idea to shipped result.",
      ],
      contact: [
        "Contact",
        "Start the next build",
        "Reach out for software engineering work, project collaboration, systems design conversations, or portfolio feedback.",
      ],
    }[page] || ["Page", "", ""];

  return (
    <main className="relative min-h-[calc(100vh-74px)] overflow-hidden px-5 py-14 lg:px-8">
      <HeroImage theme={theme} />
      <div className="relative z-10 mx-auto max-w-[960px]">
        <button
          onClick={() => setPage("home")}
          className={cn("mb-8 inline-flex items-center gap-2 border px-4 py-3 text-[11px] font-black uppercase tracking-[.18em] transition", theme.buttonClass)}
        >
          <Home size={15} /> Back Home
        </button>
        <div className="rounded-xl border border-current/12 bg-black/20 p-8 backdrop-blur-xl md:p-12">
          <p className={cn("text-[11px] font-black uppercase tracking-[.32em]", theme.accentText)}>{content[1]}</p>
          <h1 className="mt-4 text-5xl font-black uppercase tracking-[-.04em] md:text-7xl">{content[0]}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 opacity-80">{content[2]}</p>
        </div>
      </div>
    </main>
  );
}

function Footer({ theme, setPage }: { theme: JevTheme; setPage: (page: string) => void }) {
  return (
    <footer className="relative z-20 border-t border-current/10 px-5 py-8 lg:px-8">
      <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <Logo theme={theme} onHome={() => setPage("home")} />
        <p className={cn("text-[11px] font-black uppercase tracking-[.25em]", theme.accentText)}>{theme.footer}</p>
        <span className={cn("grid h-10 w-10 place-items-center rounded-full border", theme.accentBorder)}>
          <Orbit size={18} />
        </span>
      </div>
    </footer>
  );
}

export default function JevTechPortfolioHome() {
  const [activeTheme, setActiveTheme] = useState<JevThemeId>("cosmic");
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.__JEVTECH_PORTFOLIO_TESTS__ = runSelfTests;
  }, []);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("jevtech-theme") as JevThemeId | null;
      if (savedTheme && themeMap[savedTheme]) setActiveTheme(savedTheme);
    } catch {
      // Ignore localStorage failures in preview/sandbox contexts.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("jevtech-theme", activeTheme);
    } catch {
      // Ignore localStorage failures in preview/sandbox contexts.
    }
  }, [activeTheme]);

  const theme = useMemo(() => themeMap[activeTheme], [activeTheme]);

  return (
    <div className={cn("min-h-screen font-sans transition-colors duration-500", theme.page)}>
      <TopNav theme={theme} activeTheme={activeTheme} setActiveTheme={setActiveTheme} setPage={setPage} />
      {page === "home" ? (
        <HomePage theme={theme} activeTheme={activeTheme} setActiveTheme={setActiveTheme} setPage={setPage} />
      ) : (
        <InteriorPage theme={theme} page={page} setPage={setPage} />
      )}
      <Footer theme={theme} setPage={setPage} />
    </div>
  );
}
