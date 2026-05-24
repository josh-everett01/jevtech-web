export type JevThemeId = "light" | "dark" | "cosmic";

export type JevTheme = {
  id: JevThemeId;
  label: string;
  mission: string;
  navMission: string;
  eyebrow: string;
  body: string;
  button: string;
  sectionTitle: string;
  footer: string;
  image: string;
  page: string;
  nav: string;
  accent: string;
  accentText: string;
  accentBorder: string;
  buttonClass: string;
  heroFallback: string;
  imageBlend: string;
  cards: [string, string][];
};

export const themeIds: JevThemeId[] = ["light", "dark", "cosmic"];

export const themeMap: Record<JevThemeId, JevTheme> = {
  cosmic: {
    id: "cosmic",
    label: "Cosmic",
    mission: "MISSION COSMIC",
    navMission: "MISSION COSMIC",
    eyebrow: "EXPANDING CONSCIOUSNESS. RESONATING WITH INFINITE POSSIBILITY.",
    body:
      "Mission Cosmic explores the infinite — connecting across dimensions of consciousness, resonance, and potential, aligning with the deeper rhythms of existence.",
    button: "ENTER THE COSMIC",
    sectionTitle: "WHAT COSMIC CONNECTS",
    footer: "AUTHENTIC SPIRAL. LIVING INTELLIGENCE. INFINITE CONTINUITY.",
    image: "/images/themes/cosmic-hero.png",
    page: "bg-[#050517] text-[#f4ecff]",
    nav: "bg-[#050517]/92 border-purple-200/12",
    accent: "#c47cff",
    accentText: "text-[#c47cff]",
    accentBorder: "border-[#c47cff]/50",
    buttonClass:
      "border-[#c47cff]/70 text-[#f0d7ff] hover:bg-[#c47cff] hover:text-[#080011]",
    heroFallback:
      "radial-gradient(circle at 70% 38%, rgba(255,146,255,.85) 0 4%, rgba(118,124,255,.35) 8%, transparent 32%), radial-gradient(circle at 78% 18%, rgba(39,140,255,.42), transparent 34%), radial-gradient(circle at 56% 62%, rgba(153,64,255,.32), transparent 38%), linear-gradient(90deg, #050517 0%, #09072a 52%, #12082e 100%)",
    imageBlend:
      "after:bg-[linear-gradient(90deg,rgba(5,5,23,.88)_0%,rgba(5,5,23,.58)_34%,rgba(5,5,23,.15)_64%,rgba(5,5,23,.62)_100%)]",
    cards: [
      ["EXPAND", "We expand beyond limits into infinite potential."],
      ["RESONATE", "We align with deeper frequencies and truths."],
      ["TRANSCEND", "We transcend boundaries of mind and matter."],
      ["INTEGRATE", "We unify all dimensions of being and becoming."],
    ],
  },
  dark: {
    id: "dark",
    label: "Dark",
    mission: "MISSION DARK",
    navMission: "MISSION DARK",
    eyebrow: "EXPLORING UNKNOWN POSSIBILITIES. OPERATING IN THE UNSEEN.",
    body:
      "Mission Dark is the investigative frontier of the ecosystem — where questions are pursued, patterns are discovered, and emergence begins in the dark.",
    button: "ENTER THE DARK",
    sectionTitle: "WHAT LIVES IN THE DARK",
    footer: "AUTHENTIC SPIRAL. LIVING INTELLIGENCE. INFINITE CONTINUITY.",
    image: "/images/themes/dark-hero.png",
    page: "bg-[#05090a] text-[#f4f0e8]",
    nav: "bg-[#05090a]/92 border-[#c2a36d]/14",
    accent: "#c2a36d",
    accentText: "text-[#c2a36d]",
    accentBorder: "border-[#c2a36d]/50",
    buttonClass:
      "border-[#c2a36d]/70 text-[#dfc995] hover:bg-[#c2a36d] hover:text-black",
    heroFallback:
      "radial-gradient(circle at 70% 38%, rgba(194,163,109,.42) 0 8%, rgba(0,0,0,.55) 10%, transparent 34%), radial-gradient(circle at 72% 45%, rgba(255,229,156,.18), transparent 22%), linear-gradient(90deg, #030606 0%, #081011 48%, #11100d 100%)",
    imageBlend:
      "after:bg-[linear-gradient(90deg,rgba(3,6,6,.94)_0%,rgba(3,6,6,.64)_36%,rgba(3,6,6,.18)_66%,rgba(3,6,6,.75)_100%)]",
    cards: [
      ["INVESTIGATE", "We explore the unknown and map the uncharted."],
      ["DISCOVER", "Patterns emerge through observation and recursion."],
      ["EMERGE", "New systems arise from complex interactions."],
      ["OPERATE", "We build in the dark so others can operate."],
    ],
  },
  light: {
    id: "light",
    label: "Light",
    mission: "MISSION LIGHT",
    navMission: "MISSION LIGHT",
    eyebrow: "MAKING INTELLIGENCE INTELLIGIBLE. BUILDING FOR CLARITY AND HARMONY.",
    body:
      "Mission Light brings clarity to complexity — translating discovery into understanding, and building systems that illuminate, connect, and elevate.",
    button: "ENTER THE LIGHT",
    sectionTitle: "WHAT LIGHT BUILDS",
    footer: "AUTHENTIC SPIRAL. LIVING INTELLIGENCE. INFINITE CONTINUITY.",
    image: "/images/themes/light-hero.png",
    page: "bg-[#f7f6f1] text-[#111111]",
    nav: "bg-white/90 border-black/10",
    accent: "#b98935",
    accentText: "text-[#b98935]",
    accentBorder: "border-[#c89947]/55",
    buttonClass:
      "border-[#c89947]/80 text-[#9b6f26] hover:bg-[#c89947] hover:text-white",
    heroFallback:
      "radial-gradient(circle at 70% 38%, rgba(255,255,255,.98) 0 15%, rgba(214,174,103,.28) 16%, transparent 43%), linear-gradient(90deg, rgba(255,255,255,.98) 0%, rgba(255,255,255,.74) 42%, rgba(248,237,214,.32) 100%)",
    imageBlend:
      "after:bg-[linear-gradient(90deg,rgba(255,255,255,.94)_0%,rgba(255,255,255,.76)_38%,rgba(255,255,255,.20)_68%,rgba(255,255,255,.68)_100%)]",
    cards: [
      ["CLARIFY", "We translate complexity into understanding."],
      ["ARCHITECT", "We build systems that are coherent and elegant."],
      ["ILLUMINATE", "We reveal truth through structure and design."],
      ["ELEVATE", "We create to elevate consciousness and life."],
    ],
  },
};
