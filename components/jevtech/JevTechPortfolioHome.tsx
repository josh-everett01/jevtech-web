"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  ArrowDownToLine,
  ArrowRight,
  Circle,
  Cloud,
  Code2,
  CreditCard,
  ExternalLink,
  Github,
  Globe,
  Home,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Orbit,
  Server,
  Sun,
  X,
  Zap,
} from "lucide-react"
import {
  themeIds,
  themeMap,
  type JevTheme,
  type JevThemeId,
} from "@/lib/jevtech-themes"

const PHI = 1.618033988749895

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const

type PageKey = "home" | "about" | "projects" | "contact"

const pageContent: Record<
  "about" | "contact",
  {
    title: string
    eyebrow: string
    body: string
    bullets: string[]
  }
> = {
  about: {
    title: "About",
    eyebrow: "Practical engineering. Real results.",
    body:
      "JevTech is a solo software engineering practice focused on designing and building custom web applications for businesses — from initial concept through deployment and ongoing iteration.",
    bullets: [
      "Services: full-stack web development, e-commerce & payment integration, real-time systems, AWS cloud solutions, backend APIs (.NET / Node.js), systems architecture, and consulting.",
      "Stack: React / Next.js, .NET, Node.js, PostgreSQL, AWS, Stripe, TypeScript, and modern DevOps practices.",
      "Approach: clarify the actual problem, architect a system that fits, and build it right the first time — secure, efficient, scalable, and built to be relied on.",
    ],
  },
  contact: {
    title: "Contact",
    eyebrow: "Start the next build",
    body:
      "Available for custom software projects, technical consulting, and systems architecture work. Reach out to discuss what you need to build.",
    bullets: [
      "Email: hello@jevtech.net",
      "Project inquiries: share what you're building, your timeline, and your goals — and we'll figure out the best path forward.",
      "Best fit: e-commerce platforms, custom web apps, API and payment integrations, real-time features, and projects that need a reliable path from idea to launch.",
    ],
  },
}

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

function goldenRect(width = 987) {
  return { width, height: width / PHI }
}

function getPageFromPath(pathname: string | null): PageKey {
  if (pathname === "/about") return "about"
  if (pathname === "/projects") return "projects"
  if (pathname === "/contact") return "contact"
  return "home"
}

function runSelfTests() {
  const results: Array<{ name: string; passed: boolean }> = []
  const test = (name: string, condition: boolean) =>
    results.push({ name, passed: Boolean(condition) })

  const rect = goldenRect(987)

  test(
    "only light, dark, and cosmic themes exist",
    Object.keys(themeMap).sort().join(",") === "cosmic,dark,light"
  )

  test(
    "each theme has a production image path",
    Object.values(themeMap).every(
      (theme) =>
        theme.image.startsWith("/images/themes/") &&
        theme.image.endsWith("-hero.png")
    )
  )

  test(
    "each theme has four cards",
    Object.values(themeMap).every((theme) => theme.cards.length === 4)
  )

  test(
    "golden ratio constant is accurate",
    Math.abs(PHI - 1.618033988749895) < 0.0000000001
  )

  test(
    "golden rectangle computes width / height as phi",
    Math.abs(rect.width / rect.height - PHI) < 0.0000000001
  )

  test(
    "navigation uses real routes",
    navItems.map((item) => item.href).join(",") === "/,/about,/projects,/contact"
  )

  test(
    "page path resolver maps about/projects/contact",
    getPageFromPath("/about") === "about" &&
    getPageFromPath("/projects") === "projects" &&
    getPageFromPath("/contact") === "contact"
  )

  test(
    "logo renders a real golden rectangle / Fibonacci spiral mark",
    typeof GoldenMeanLogo === "function"
  )

  return results
}

declare global {
  interface Window {
    __JEVTECH_PORTFOLIO_TESTS__?: typeof runSelfTests
  }
}

function GoldenMeanLogo({
  theme,
  className = "",
}: {
  theme: JevTheme
  className?: string
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

      <g
        fill="none"
        stroke={theme.accent}
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M55 89 A89 89 0 0 0 144 0" />
        <path d="M0 34 A55 55 0 0 0 55 89" />
        <path d="M34 0 A34 34 0 0 0 0 34" />
        <path d="M55 21 A21 21 0 0 0 34 0" />
        <path d="M42 34 A13 13 0 0 0 55 21" />
        <path d="M34 26 A8 8 0 0 0 42 34" />
      </g>

      <circle cx="39" cy="30" r="3.4" fill={theme.accent} />
    </svg>
  )
}

function Logo({ theme }: { theme: JevTheme }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Go home">
      <span
        className={cn(
          "grid h-10 w-[64px] place-items-center rounded-[10px] border bg-current/[.025]",
          theme.accentBorder
        )}
      >
        <GoldenMeanLogo theme={theme} className="h-7 w-[45px]" />
      </span>

      <span className="text-sm font-semibold uppercase tracking-[.28em]">
        JevTech
      </span>
    </Link>
  )
}

function TopNav({
  theme,
  activeTheme,
  setActiveTheme,
  currentPage,
}: {
  theme: JevTheme
  activeTheme: JevThemeId
  setActiveTheme: (theme: JevThemeId) => void
  currentPage: PageKey
}) {
  const [open, setOpen] = useState(false)

  return (
    <header className={cn("relative z-30 border-b backdrop-blur-xl", theme.nav)}>
      <div className="mx-auto flex h-[74px] max-w-[1160px] items-center justify-between px-5 lg:px-8">
        <Logo theme={theme} />

        <nav className="hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[.22em] md:flex">
          {navItems.map((item) => {
            const page = item.href === "/" ? "home" : item.href.slice(1)
            const isActive = currentPage === page

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b py-2 transition",
                  isActive
                    ? cn(theme.accentText, theme.accentBorder)
                    : "border-transparent opacity-85 hover:opacity-100"
                )}
              >
                {item.label}
              </Link>
            )
          })}

          <a
            href="/resume.pdf"
            className={cn(
              "inline-flex items-center gap-2 border px-4 py-3 transition",
              theme.buttonClass
            )}
          >
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
                activeTheme === id
                  ? cn(theme.accentText, theme.accentBorder)
                  : "border-current/15 opacity-70 hover:opacity-100"
              )}
            >
              {id}
            </button>
          ))}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="grid gap-3 border-t border-current/10 px-5 py-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-left text-sm uppercase tracking-[.18em]"
            >
              {item.label}
            </Link>
          ))}

          <div className="flex gap-2 pt-2">
            {themeIds.map((id) => (
              <button
                key={id}
                onClick={() => setActiveTheme(id)}
                className={cn(
                  "flex-1 border px-3 py-2 text-xs uppercase",
                  activeTheme === id ? theme.accentBorder : "border-current/15"
                )}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function LeftRail({
  theme,
  activeTheme,
  setActiveTheme,
}: {
  theme: JevTheme
  activeTheme: JevThemeId
  setActiveTheme: (theme: JevThemeId) => void
}) {
  const icons = [
    ["light", Sun],
    ["dark", Moon],
    ["cosmic", Orbit],
  ] as const

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
  )
}

function HeroImage({ theme }: { theme: JevTheme }) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden after:absolute after:inset-0",
        theme.imageBlend
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: theme.heroFallback }}
      />

      <img
        src={theme.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-100"
      />
    </div>
  )
}

const services = [
  {
    icon: Globe,
    title: "Full-Stack Web Development",
    description: "End-to-end web applications built with React, Next.js, and modern frontend practices.",
  },
  {
    icon: Server,
    title: "Backend & API Development",
    description: "Scalable server-side systems and REST APIs built with .NET and Node.js.",
  },
  {
    icon: CreditCard,
    title: "E-Commerce & Payments",
    description: "Complete commerce platforms with Stripe and PayPal integration, carts, and order management.",
  },
  {
    icon: Zap,
    title: "Real-Time Systems",
    description: "Live bidding, push notifications, and event-driven features built for performance under load.",
  },
  {
    icon: Cloud,
    title: "AWS Cloud Solutions",
    description: "Cloud infrastructure, deployments, and managed services architected for reliability and scale.",
  },
  {
    icon: MessageSquare,
    title: "Consulting & Architecture",
    description: "Technical planning, system design, and hands-on guidance from idea to a buildable plan.",
  },
  {
    icon: Code2,
    title: "Code Review & Audits",
    description: "Deep review of existing codebases — security, performance, structure, and practical recommendations.",
  },
]

function HomePage({
  theme,
  activeTheme,
  setActiveTheme,
}: {
  theme: JevTheme
  activeTheme: JevThemeId
  setActiveTheme: (theme: JevThemeId) => void
}) {
  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[600px] overflow-hidden border-b border-current/10">
        <HeroImage theme={theme} />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px)] bg-[length:96px_96px] opacity-45" />

        <LeftRail
          theme={theme}
          activeTheme={activeTheme}
          setActiveTheme={setActiveTheme}
        />

        <section className="relative z-10 mx-auto grid min-h-[600px] max-w-[1160px] items-center px-5 py-10 lg:grid-cols-[390px_1fr] lg:px-8">
          <div className="max-w-[360px] lg:pl-12">
            <p
              className={cn(
                "mb-5 text-[11px] font-black uppercase tracking-[.34em]",
                theme.accentText,
                theme.id !== "light" && "[text-shadow:0_1px_8px_rgba(0,0,0,0.85)]"
              )}
            >
              {theme.navMission}
            </p>

            <h1 className={cn(
              "text-[2.85rem] font-black uppercase leading-[.92] tracking-[-.055em] md:text-[3.7rem]",
              theme.id !== "light" && "[text-shadow:0_2px_16px_rgba(0,0,0,0.7)]"
            )}>
              {theme.mission.split(" ").map((word) => (
                <span key={word} className="block">
                  {word}
                </span>
              ))}
            </h1>

            <p className={cn(
              "mt-6 text-[13px] font-black uppercase leading-6 tracking-[.09em]",
              theme.id !== "light" && "[text-shadow:0_1px_10px_rgba(0,0,0,0.9)]"
            )}>
              {theme.eyebrow}
            </p>

            <p className={cn(
              "mt-6 max-w-[300px] text-[13px] leading-6 opacity-78",
              theme.id !== "light" && "[text-shadow:0_1px_10px_rgba(0,0,0,0.9)]"
            )}>
              {theme.body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className={cn(
                  "inline-flex items-center justify-center gap-3 border px-5 py-3.5 text-[11px] font-black uppercase tracking-[.18em] transition",
                  theme.buttonClass
                )}
              >
                {theme.button} <ArrowRight size={16} />
              </Link>

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

                <p className="mt-2 text-[11px] leading-5 opacity-70">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-[1160px]">
          <h2 className="text-center text-[12px] font-black uppercase tracking-[.24em]">
            Services
          </h2>
          <p className={cn("mt-2 text-center text-[11px] font-semibold uppercase tracking-[.18em]", theme.accentText)}>
            What JevTech builds
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-md border border-current/12 bg-current/[.025] p-5 backdrop-blur-md"
              >
                <Icon className={theme.accentText} size={22} />

                <h3 className="mt-4 text-[12px] font-black uppercase tracking-[.14em]">
                  {title}
                </h3>

                <p className="mt-2 text-[11px] leading-5 opacity-70">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

// ─── Projects ────────────────────────────────────────────────────────────────

type Project = {
  id: string
  title: string
  url: string
  tagline: string
  description: string
  tech: string[]
  images: string[]
}

const projects: Project[] = [
  {
    id: "mineral-kingdom",
    title: "Mineral Kingdom",
    url: "https://mineralkingdom.net",
    tagline: "Full-stack e-commerce & auction platform",
    description:
      "A full-featured commerce and auction platform built for a mineral and gem dealer. The admin suite covers the complete business workflow: mineral taxonomy and specimen database management, product listings with media, store offers and discount configuration, timed auctions with live bidding, order and refund processing, fulfillment with shipping label and invoice generation, open-box item workflows, customer support ticketing, CMS for public pages, sales analytics, system health monitoring, and user role management. Customer-facing features include authenticated accounts and PayPal and Stripe payment processing.",
    tech: ["Next.js", "PostgreSQL", "Stripe", "PayPal", "Real-time", "Auth", "Fulfillment", "Admin"],
    images: [
      "/images/projects/mineral-kingdom-1.png",
      "/images/projects/mineral-kingdom-2.png",
    ],
  },
  {
    id: "jevtech",
    title: "JevTech Custom Solutions",
    url: "https://jevtech.net",
    tagline: "Personal brand site & portfolio",
    description:
      "Personal brand and portfolio site for JevTech Custom Solutions, built as a demonstration of front-end craft and systems thinking. Features three independently designed visual themes — Light, Dark, and Cosmic — built around a golden ratio and Fibonacci spiral design system. Includes a custom SVG logo derived from the golden rectangle, persistent theme state, responsive navigation, and a project showcase with detail modals. The site itself is a live example of the work.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "SVG", "Design System"],
    images: [
      "/images/projects/jevtech-1.png",
      "/images/projects/jevtech-2.png",
    ],
  },
]

function ProjectCard({
  project,
  theme,
  onOpen,
}: {
  project: Project
  theme: JevTheme
  onOpen: () => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <article className="overflow-hidden rounded-xl border border-current/12 bg-current/[.025] backdrop-blur-md">
      <button
        className="relative block h-48 w-full overflow-hidden bg-black/20"
        onClick={onOpen}
        aria-label={`View ${project.title} details`}
      >
        {!imgError ? (
          <img
            src={project.images[0]}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs uppercase tracking-[.18em] opacity-35">
              Screenshot coming soon
            </span>
          </div>
        )}
      </button>

      <div className="p-6">
        <p className={cn("mb-1 text-[10px] font-black uppercase tracking-[.3em]", theme.accentText)}>
          {project.tagline}
        </p>
        <h3 className="text-2xl font-black uppercase tracking-[-.03em]">
          {project.title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded border border-current/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.14em] opacity-75"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={onOpen}
            className={cn(
              "inline-flex items-center gap-2 border px-4 py-2.5 text-[11px] font-black uppercase tracking-[.16em] transition",
              theme.buttonClass
            )}
          >
            View Details <ArrowRight size={14} />
          </button>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-current/20 px-4 py-2.5 text-[11px] font-black uppercase tracking-[.16em] transition hover:bg-current/10"
          >
            Live Site <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </article>
  )
}

function ProjectModal({
  project,
  theme,
  onClose,
}: {
  project: Project
  theme: JevTheme
  onClose: () => void
}) {
  const [activeImage, setActiveImage] = useState(0)
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-current/15 shadow-2xl",
          theme.page
        )}
      >
        <div className="flex items-start justify-between border-b border-current/10 p-6 md:p-8">
          <div>
            <p className={cn("mb-1 text-[10px] font-black uppercase tracking-[.3em]", theme.accentText)}>
              {project.tagline}
            </p>
            <h2 className="text-3xl font-black uppercase tracking-[-.03em] md:text-4xl">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="ml-4 mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-current/20 opacity-70 transition hover:opacity-100"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-current/10">
          <div className="relative h-64 w-full overflow-hidden bg-black/20 md:h-80">
            {!imgErrors[activeImage] ? (
              <img
                key={activeImage}
                src={project.images[activeImage]}
                alt={`${project.title} screenshot ${activeImage + 1}`}
                className="h-full w-full object-cover"
                onError={() =>
                  setImgErrors((prev) => ({ ...prev, [activeImage]: true }))
                }
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <span className="text-xs uppercase tracking-[.18em] opacity-30">
                  Screenshot coming soon
                </span>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("text-xs font-semibold underline", theme.accentText)}
                >
                  Visit live site →
                </a>
              </div>
            )}
          </div>

          {project.images.length > 1 && (
            <div className="flex gap-2 px-4 py-3">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "h-1.5 rounded-full bg-current transition-all",
                    i === activeImage ? "w-8 opacity-90" : "w-4 opacity-30"
                  )}
                  aria-label={`Screenshot ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          <p className="text-sm leading-7 opacity-80">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded border px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em]",
                  theme.accentBorder,
                  theme.accentText
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 border px-5 py-3 text-[11px] font-black uppercase tracking-[.18em] transition",
                theme.buttonClass
              )}
            >
              Visit Live Site <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectsPage({ theme }: { theme: JevTheme }) {
  const [selected, setSelected] = useState<Project | null>(null)
  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <main className="relative min-h-[calc(100vh-74px)] overflow-hidden px-5 py-14 lg:px-8">
      <HeroImage theme={theme} />

      {selected && (
        <ProjectModal project={selected} theme={theme} onClose={handleClose} />
      )}

      <div className="relative z-10 mx-auto max-w-[960px]">
        <Link
          href="/"
          className={cn(
            "mb-8 inline-flex items-center gap-2 border px-4 py-3 text-[11px] font-black uppercase tracking-[.18em] transition",
            theme.buttonClass
          )}
        >
          <Home size={15} /> Back Home
        </Link>

        <div className="mb-10">
          <p
            className={cn(
              "mb-3 text-[11px] font-black uppercase tracking-[.32em]",
              theme.accentText
            )}
          >
            Artifacts of the work
          </p>
          <h1 className="text-5xl font-black uppercase tracking-[-.04em] md:text-7xl">
            Projects
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 opacity-80">
            Selected builds — from full e-commerce platforms to systems design work. Each project starts with a real problem and ends with shipped software.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              theme={theme}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

// ─── Interior (About / Contact) ───────────────────────────────────────────────

function InteriorPage({
  theme,
  page,
}: {
  theme: JevTheme
  page: "about" | "contact"
}) {
  const content = pageContent[page]

  return (
    <main className="relative min-h-[calc(100vh-74px)] overflow-hidden px-5 py-14 lg:px-8">
      <HeroImage theme={theme} />

      <div className="relative z-10 mx-auto max-w-[960px]">
        <Link
          href="/"
          className={cn(
            "mb-8 inline-flex items-center gap-2 border px-4 py-3 text-[11px] font-black uppercase tracking-[.18em] transition",
            theme.buttonClass
          )}
        >
          <Home size={15} /> Back Home
        </Link>

        <div className="rounded-xl border border-current/12 bg-black/20 p-8 backdrop-blur-xl md:p-12">
          <p
            className={cn(
              "text-[11px] font-black uppercase tracking-[.32em]",
              theme.accentText
            )}
          >
            {content.eyebrow}
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase tracking-[-.04em] md:text-7xl">
            {content.title}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 opacity-80">
            {content.body}
          </p>

          <div className="mt-8 grid gap-3">
            {content.bullets.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-current/12 bg-current/[.035] p-4 text-sm leading-7 opacity-85"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

function ContactPage({ theme }: { theme: JevTheme }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [honeypot, setHoneypot] = useState("")
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (honeypot) return // bot trap — silently bail
    setSubmitStatus("sending")
    setErrorMsg("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitStatus("success")
        setForm({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
      }
    } catch {
      setSubmitStatus("error")
      setErrorMsg("Network error. Please try again.")
    }
  }

  const inputClass =
    theme.id === "light"
      ? "w-full rounded-lg border border-black/25 bg-white/80 text-[#111111] px-4 py-3 text-sm placeholder:text-black/35 outline-none transition focus:border-black/50"
      : "w-full rounded-lg border border-current/20 bg-white/[.07] px-4 py-3 text-sm placeholder:opacity-40 outline-none transition focus:border-current/50"

  const links = [
    { icon: Mail, label: "Email", display: "hello@jevtech.net", href: "mailto:hello@jevtech.net", external: false },
    { icon: Github, label: "GitHub", display: "josh-everett01", href: "https://github.com/josh-everett01", external: true },
    { icon: Linkedin, label: "LinkedIn", display: "joshua-everett", href: "https://www.linkedin.com/in/joshua-everett", external: true },
  ]

  return (
    <main className="relative min-h-[calc(100vh-74px)] overflow-hidden px-5 py-14 lg:px-8">
      <HeroImage theme={theme} />

      <div className="relative z-10 mx-auto max-w-[960px]">
        <Link
          href="/"
          className={cn(
            "mb-8 inline-flex items-center gap-2 border px-4 py-3 text-[11px] font-black uppercase tracking-[.18em] transition",
            theme.buttonClass
          )}
        >
          <Home size={15} /> Back Home
        </Link>

        <div className="rounded-xl border border-current/12 bg-black/20 p-8 backdrop-blur-xl md:p-12">
          <p className={cn("text-[11px] font-black uppercase tracking-[.32em]", theme.accentText)}>
            Start the next build
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase tracking-[-.04em] md:text-7xl">
            Contact
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 opacity-80">
            Available for custom software projects, technical consulting, and systems architecture
            work. Describe what you need and I&apos;ll get back to you.
          </p>

          {/* Contact form */}
          {submitStatus === "success" ? (
            <div className="mt-8 rounded-lg border border-current/12 bg-current/[.05] p-6 text-center">
              <p className={cn("text-lg font-black uppercase tracking-[.06em]", theme.accentText)}>Message sent.</p>
              <p className="mt-2 text-sm opacity-70">I&apos;ll be in touch soon.</p>
              <button
                onClick={() => setSubmitStatus("idle")}
                className={cn("mt-5 border px-5 py-2.5 text-[11px] font-black uppercase tracking-[.18em] transition", theme.buttonClass)}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-4">
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                className="absolute opacity-0 pointer-events-none"
                autoComplete="off"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[.18em] opacity-55">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[.18em] opacity-55">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[.18em] opacity-55">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your project or what you need help with…"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className={cn(inputClass, "resize-none")}
                />
              </div>

              {submitStatus === "error" && (
                <p className="text-sm text-red-400">{errorMsg}</p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={submitStatus === "sending"}
                  className={cn(
                    "border px-7 py-3 text-[11px] font-black uppercase tracking-[.18em] transition disabled:opacity-50",
                    theme.buttonClass
                  )}
                >
                  {submitStatus === "sending" ? "Sending…" : "Send Message"}
                </button>
              </div>
            </form>
          )}

          {/* Divider */}
          <div className="mt-10 flex items-center gap-4 opacity-40">
            <div className="h-px flex-1 bg-current/30" />
            <span className="text-[10px] font-black uppercase tracking-[.22em]">Or reach out directly</span>
            <div className="h-px flex-1 bg-current/30" />
          </div>

          {/* Link tiles */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {links.map(({ icon: Icon, label, display, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-4 rounded-lg border border-current/12 bg-current/[.035] p-5 transition hover:bg-current/[.07]"
              >
                <Icon className={cn("shrink-0", theme.accentText)} size={22} />
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[.18em] opacity-55">{label}</p>
                  <p className="truncate text-sm font-semibold">{display}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-current/12 bg-current/[.035] p-5 text-sm leading-7 opacity-80">
            Best fit: e-commerce platforms, custom web apps, API and payment integrations, real-time
            features, and projects that need a reliable path from idea to launch.
          </div>
        </div>
      </div>
    </main>
  )
}

function Footer({ theme }: { theme: JevTheme }) {
  return (
    <footer className="relative z-20 border-t border-current/10 px-5 py-8 lg:px-8">
      <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <Logo theme={theme} />

        <p
          className={cn(
            "text-[11px] font-black uppercase tracking-[.25em]",
            theme.accentText
          )}
        >
          {theme.footer}
        </p>

        <span
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full border",
            theme.accentBorder
          )}
        >
          <Orbit size={18} />
        </span>
      </div>
    </footer>
  )
}

export default function JevTechPortfolioHome() {
  const pathname = usePathname()
  const currentPage = getPageFromPath(pathname)
  const [activeTheme, setActiveTheme] = useState<JevThemeId>(() => {
    if (typeof window === "undefined") return "cosmic"
    try {
      const saved = localStorage.getItem("jevtech-theme") as JevThemeId | null
      if (saved && themeMap[saved]) return saved
    } catch {
      // Ignore localStorage failures in preview/sandbox contexts.
    }
    return "cosmic"
  })

  useEffect(() => {
    window.__JEVTECH_PORTFOLIO_TESTS__ = runSelfTests
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("jevtech-theme", activeTheme)
    } catch {
      // Ignore localStorage failures in preview/sandbox contexts.
    }
  }, [activeTheme])

  const theme = useMemo(() => themeMap[activeTheme], [activeTheme])

  return (
    <div className={cn("min-h-screen font-sans transition-colors duration-500", theme.page)}>
      <TopNav
        theme={theme}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        currentPage={currentPage}
      />

      {currentPage === "home" ? (
        <HomePage
          theme={theme}
          activeTheme={activeTheme}
          setActiveTheme={setActiveTheme}
        />
      ) : currentPage === "projects" ? (
        <ProjectsPage theme={theme} />
      ) : currentPage === "contact" ? (
        <ContactPage theme={theme} />
      ) : (
        <InteriorPage theme={theme} page="about" />
      )}

      <Footer theme={theme} />
    </div>
  )
}