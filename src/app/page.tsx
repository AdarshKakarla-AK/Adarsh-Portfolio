"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown, ArrowUpRight,
  Code2, Clapperboard, Rocket, Trophy, Mountain, Cpu, FileText, Play, Mail, Zap,
} from "lucide-react";
import { LINKS, PROJECTS, TIMELINE, PIPELINE } from "./content";

/* ---------- tiny brand icons ---------- */
const GithubIcon = (props: { size?: number }) => (
  <svg width={props.size ?? 17} height={props.size ?? 17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" /></svg>
);
const LinkedinIcon = (props: { size?: number }) => (
  <svg width={props.size ?? 17} height={props.size ?? 17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" /></svg>
);
const InstagramIcon = (props: { size?: number }) => (
  <svg width={props.size ?? 17} height={props.size ?? 17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
);

/* ---------- motion ---------- */
const fade = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

/* ---------- marquee row ---------- */
function Ticker({ items, dark = true }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items, ...items];
  return (
    <div className={`overflow-hidden border-y-2 ${dark ? "bg-[#0b0b0c] text-[#f4f1ea] border-[#0b0b0c]" : "bg-[#e10600] text-white border-[#0b0b0c]"}`} aria-hidden="true">
      <div className="animate-marquee flex whitespace-nowrap py-2.5 w-max">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {row.map((t, i) => (
              <span key={`${half}-${i}`} className="mono text-[11px] md:text-xs font-bold tracking-[0.25em] px-6 flex items-center gap-6">
                {t} <span className={dark ? "text-[#e10600]" : "text-[#0b0b0c]"}>✕</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- poster section head ---------- */
function Head({ no, tag, title, sub, theme = "paper" }: {
  no: string; tag: string; title: React.ReactNode; sub?: string; theme?: "paper" | "ink";
}) {
  const dark = theme === "ink";
  return (
    <div className={`max-w-6xl mx-auto px-5 md:px-8 ${dark ? "text-[#f4f1ea]" : "text-[#0b0b0c]"}`}>
      <motion.div {...fade}>
        <div className="flex items-center gap-3">
          <span className="font-display text-sm bg-[#e10600] text-white px-3 py-1.5 border-2 border-[#0b0b0c] hard-sm">{no}</span>
          <span className="mono text-[11px] font-bold tracking-[0.25em]">{tag}</span>
          <span className={`h-[2px] flex-1 ${dark ? "bg-[#f4f1ea]/20" : "bg-[#0b0b0c]/15"}`} />
          <span className="mono text-[11px] text-[#e10600] font-bold hidden sm:inline">● AK/26</span>
        </div>
        <h2 className="font-display uppercase leading-[0.92] tracking-tight text-5xl md:text-7xl mt-5">{title}</h2>
        {sub && <p className={`max-w-2xl mt-4 text-base md:text-lg font-medium ${dark ? "text-[#f4f1ea]/70" : "text-[#0b0b0c]/70"}`}>{sub}</p>}
      </motion.div>
    </div>
  );
}

/* ================= PAGE ================= */
export default function Page() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  const [stage, setStage] = useState(0);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date()
        .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        .replace(/ /g, " ")
        .toUpperCase()
    );
  }, []);

  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % PIPELINE.length), 1600);
    return () => clearInterval(id);
  }, []);

  const stageCopy = [
    "C · Java · Python · DSA · ML. Foundations, daily reps. No shortcuts.",
    "Small trials: dashboards, templates, prompt tests. Fast and public.",
    "EduExam AI · fitness app · driving-school site. Real artifacts.",
    "Reels, commercials, documentary cuts. Things people actually watch.",
    "Client posts shipped. GitHub pushed. Evidence over claims.",
    "Back to 01. The story is still being written — on purpose.",
  ];

  return (
    <div className="grain bg-[#f4f1ea] text-[#0b0b0c] min-h-screen">
      {/* scroll progress */}
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-1 bg-[#e10600] origin-left z-[80]" aria-hidden="true" />
      <a href="#build" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[90] focus:bg-[#e10600] focus:text-white focus:px-3 focus:py-2 focus:font-bold">Skip to content</a>

      {/* top league ticker */}
      <div className="bg-[#0b0b0c] text-[#f4f1ea] overflow-hidden" aria-hidden="true">
        <div className="animate-marquee-fast flex whitespace-nowrap w-max py-1.5">
          {[0, 1].map((h) => (
            <div key={h} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="mono text-[10px] tracking-[0.3em] px-8 text-[#f4f1ea]/80">
                  ADARSH KAKARLA <span className="text-[#e10600] font-bold">●</span> BUILD <span className="text-[#e10600] font-bold">●</span> CREATE <span className="text-[#e10600] font-bold">●</span> EXPERIMENT
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-[60] bg-[#f4f1ea]/95 backdrop-blur border-b-2 border-[#0b0b0c]">
        <nav className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between" aria-label="Primary">
          <a href="#top" className="font-display uppercase text-lg tracking-tight">Adarsh<span className="text-[#e10600]">✕</span>Kakarla</a>
          <div className="hidden md:flex items-center gap-7 mono text-[11px] font-bold tracking-[0.2em]">
            <a href="#work" className="hover:text-[#e10600]">WORK</a>
            <a href="#lab" className="hover:text-[#e10600]">LAB</a>
            <a href="#now" className="hover:text-[#e10600]">NOW</a>
            <a href="#journey" className="hover:text-[#e10600]">JOURNEY</a>
            <a href="#contact" className="hover:text-[#e10600]">CONTACT</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex mono text-[10px] font-bold tracking-[0.15em] items-center gap-2 bg-[#0b0b0c] text-white px-3.5 py-2 border-2 border-[#0b0b0c]">
              <span className="w-2 h-2 bg-[#e10600] animate-pulse" /> BUILDING: EDUEXAM AI
            </span>
            <a href="#contact" className="mono text-[11px] font-bold bg-[#e10600] text-white border-2 border-[#0b0b0c] hard-sm px-4 py-2 hover:bg-[#0b0b0c] transition-colors">CONNECT</a>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* ============ HERO — MATCHDAY POSTER ============ */}
        <section className="relative overflow-hidden border-b-2 border-[#0b0b0c]">
          <div className="max-w-6xl mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-10 grid lg:grid-cols-[1.45fr_1fr] gap-8 items-start">
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap items-center gap-2">
                <span className="mono text-[10px] md:text-[11px] font-bold tracking-[0.25em] bg-[#0b0b0c] text-white px-3 py-1.5">MATCHDAY{today ? ` · ${today}` : ""}</span>
                <span className="mono text-[10px] md:text-[11px] font-bold tracking-[0.25em] border-2 border-[#0b0b0c] px-3 py-1">BENGALURU · CSE · ATRIA</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display uppercase leading-[0.88] tracking-tight text-[19vw] sm:text-[15vw] lg:text-[6.2rem] mt-5">
                Adarsh<br />
                <span className="stroke-ink">Kakarla</span>
                <span className="text-[#e10600]">.</span>
              </motion.h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className="flex items-center gap-0 mt-5">
                  <span className="h-3 w-24 bg-[#e10600] border-2 border-[#0b0b0c]" />
                  <span className="h-3 flex-1 stripes border-y-2 border-[#0b0b0c]" />
                </div>
                <p className="font-display uppercase text-xl md:text-3xl mt-5 leading-tight">
                  “I don&apos;t just learn technology. <span className="bg-[#e10600] text-white px-2">I build with it.</span>”
                </p>
                <p className="text-[#0b0b0c]/70 font-medium mt-3 text-sm md:text-base">
                  First-year Computer Science · AI &amp; Tech Builder · Aspiring Entrepreneur · Creator
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <a href="#work" className="inline-flex items-center justify-center gap-2 bg-[#0b0b0c] text-white font-bold text-sm px-7 py-4 border-2 border-[#0b0b0c] hard hover:bg-[#e10600] transition-colors">
                    SEE WHAT I&apos;M BUILDING <ArrowDown size={16} />
                  </a>
                  <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-white font-bold text-sm px-7 py-4 border-2 border-[#0b0b0c] hard hover:bg-[#e10600] hover:text-white transition-colors">
                    CONNECT WITH ME <ArrowUpRight size={16} />
                  </a>
                </div>
                {/* stat strip */}
                <div className="grid grid-cols-3 border-2 border-[#0b0b0c] mt-6 bg-white hard-sm">
                  {[
                    { n: "01", l: "AI BUILD IN PROGRESS" },
                    { n: "02", l: "CLIENTS SHIPPED FOR" },
                    { n: "05+", l: "BUILDS + EXPERIMENTS" },
                  ].map((s) => (
                    <div key={s.l} className="px-4 py-3 border-r-2 last:border-r-0 border-[#0b0b0c]">
                      <p className="font-display text-2xl md:text-3xl">{s.n}</p>
                      <p className="mono text-[9px] md:text-[10px] font-bold tracking-[0.18em] text-[#0b0b0c]/60">{s.l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* GAME-DAY card */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-[#0b0b0c] text-[#f4f1ea] border-2 border-[#0b0b0c] hard"
              aria-label="Gameday poster">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/15">
                <span className="mono text-[10px] font-bold tracking-[0.3em]">MATCHDAY</span>
                <span className="mono text-[10px] font-bold tracking-[0.3em] bg-[#e10600] text-white px-2 py-0.5">AK — 01</span>
              </div>
              <div className="px-5 pt-5 pb-2">
                <p className="font-display uppercase leading-[0.9] text-6xl md:text-7xl">Build<span className="text-[#e10600]">-</span><br />Day</p>
                <p className="mono text-[11px] tracking-[0.2em] text-[#f4f1ea]/60 mt-3">BUILD VS CLIENTS — FULL TIME</p>
              </div>
              {/* score */}
              <div className="mx-4 mt-2 border-2 border-white/20 grid grid-cols-3 text-center">
                <div className="py-4 border-r border-white/20">
                  <p className="mono text-[10px] tracking-[0.2em] text-[#f4f1ea]/60">BUILD</p>
                  <p className="font-display text-5xl">3</p>
                </div>
                <div className="py-4 flex items-center justify-center font-display text-2xl text-[#e10600]">✕</div>
                <div className="py-4 border-l border-white/20">
                  <p className="mono text-[10px] tracking-[0.2em] text-[#f4f1ea]/60">CLIENTS</p>
                  <p className="font-display text-5xl">2</p>
                </div>
              </div>
              {/* code strip */}
              <div className="m-4 border border-white/15 bg-white/5 p-3">
                <p className="mono text-[10px] text-[#f4f1ea]/70 leading-relaxed">
                  <span className="text-[#e10600] font-bold">$</span> eduexam-ai — portion → blueprint → questions → rubric<br />
                  <span className="text-[#f4f1ea]/50">lyzr.run(syllabus.units) · human-in-loop ✓</span>
                </p>
              </div>
              <div className="mx-4 mb-4 flex items-center justify-between bg-[#e10600] px-3 py-2">
                <span className="mono text-[10px] font-bold tracking-[0.2em]">● REC · MYFLAVOURS_COMMERCIAL.MP4</span>
                <span className="mono text-[10px] font-bold">00:12</span>
              </div>
              <div className="h-2 stripes-red border-t border-white/10" />
            </motion.aside>
          </div>
        </section>

        <Ticker items={["BUILD", "CREATE", "EXPERIMENT", "LEARN", "SHIP", "REPEAT"]} dark={false} />

        {/* ============ 01 — THREE WORLDS ============ */}
        <section id="build" className="bg-[#0b0b0c] text-[#f4f1ea] py-16 md:py-24 scroll-mt-16">
          <Head no="01" tag="THIS IS WHAT I DO" theme="ink"
            title={<>Build. <span className="text-[#e10600]">Create.</span><br />Experiment.</>}
            sub="Three worlds, one ecosystem. Every claim below ships with evidence further down this page." />
          <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-3 gap-5 mt-10">
            {[
              { n: "01", icon: <Cpu size={22} />, t: "TECH + AI", d: "Software, AI workflows, automation. Ideas into working experiments.", e: "EVIDENCE → EDUEXAM AI · GITHUB", bg: "bg-[#f4f1ea] text-[#0b0b0c]", num: "text-[#e10600]", href: "#work" },
              { n: "02", icon: <Rocket size={22} />, t: "ENTREPRENEURSHIP", d: "Gaps, tests, products. Thinking beyond the classroom.", e: "EVIDENCE → CLIENT WORK · TRIALS", bg: "bg-[#e10600] text-white", num: "text-white", href: "#ideas" },
              { n: "03", icon: <Clapperboard size={22} />, t: "CONTENT + CREATIVITY", d: "Videos, visuals, stories people actually watch.", e: "EVIDENCE → REELS · DOCUMENTARIES", bg: "bg-[#1a1a1c] text-[#f4f1ea] border-2 border-[#f4f1ea]/20", num: "stroke-paper", href: "#lab" },
            ].map((c, i) => (
              <motion.a key={c.t} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} href={c.href}
                className={`${c.bg} p-6 md:p-7 border-2 border-[#0b0b0c] hard-white hover:-translate-y-1.5 transition-transform block`}>
                <div className="flex items-start justify-between">
                  <span className={`font-display text-6xl ${c.num}`}>{c.n}</span>
                  <span className="border-2 border-current p-2">{c.icon}</span>
                </div>
                <h3 className="font-display uppercase text-2xl md:text-3xl mt-5">{c.t}</h3>
                <p className="font-medium text-sm mt-2 opacity-80">{c.d}</p>
                <p className="mono text-[10px] font-bold tracking-[0.2em] mt-5 opacity-70">{c.e}</p>
              </motion.a>
            ))}
          </div>
        </section>

        {/* ============ 02 — FEATURED BUILDS ============ */}
        <section id="work" className="py-16 md:py-24 scroll-mt-16 border-b-2 border-[#0b0b0c]">
          <Head no="02" tag="FEATURED BUILDS — SHOW, DON'T TELL"
            title={<>Proof, <span className="stroke-ink">not promises.</span></>}
            sub="Bigger poster = more important. EduExam AI leads. Small trials follow, honestly labelled." />
          <div className="max-w-6xl mx-auto px-5 md:px-8 mt-10 space-y-6">

            {/* VICTORY poster — EduExam AI */}
            <motion.article {...fade} className="border-2 border-[#0b0b0c] hard overflow-hidden bg-[#e10600] text-white">
              <div className="flex items-center justify-between px-5 md:px-8 py-3 bg-[#0b0b0c] text-[#f4f1ea]">
                <span className="mono text-[10px] font-bold tracking-[0.3em]">FEATURED · 01 / 05</span>
                <span className="mono text-[10px] font-bold tracking-[0.2em] bg-[#e10600] px-2.5 py-1">CURRENTLY BUILDING</span>
              </div>
              <div className="grid md:grid-cols-2">
                <div className="p-6 md:p-10">
                  <p className="mono text-[11px] font-bold tracking-[0.25em]">AI · CLASSROOM ASSESSMENT ASSISTANT</p>
                  <h3 className="font-display uppercase leading-[0.9] text-6xl md:text-8xl mt-3">Edu—<br />Exam<br />AI</h3>
                  <p className="font-semibold mt-4 max-w-md">An AI assistant designed around Indian school assessment — turning portions into questions, rubrics and feedback.</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {["Lyzr AI", "Python", "LLM workflows", "Next.js UI"].map((s) => (
                      <span key={s} className="mono text-[11px] font-bold bg-[#0b0b0c] text-white px-3 py-1.5">{s}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <a href={LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#0b0b0c] text-white font-bold text-sm px-6 py-3 border-2 border-[#0b0b0c] hover:bg-white hover:text-[#0b0b0c] transition-colors">
                      <GithubIcon size={15} /> EXPLORE PROJECT
                    </a>
                    <a href="#now" className="inline-flex items-center gap-2 bg-white text-[#0b0b0c] font-bold text-sm px-6 py-3 border-2 border-[#0b0b0c] hover:bg-[#0b0b0c] hover:text-white transition-colors">LIVE STATUS</a>
                  </div>
                </div>
                <div className="bg-[#0b0b0c] text-[#f4f1ea] p-6 md:p-10 md:border-l-2 border-[#0b0b0c]">
                  <p className="mono text-[11px] font-bold tracking-[0.25em] text-[#e10600]">HOW IT WORKS — 03 ROUNDS</p>
                  <div className="mt-4 space-y-3">
                    {[
                      ["R1", "Portion parsed → blueprint (CBSE · 3h · 80m)"],
                      ["R2", "Questions + marking scheme drafted"],
                      ["R3", "Human review → final paper + feedback"],
                    ].map(([r, t]) => (
                      <div key={r} className="flex gap-3 items-start border border-white/15 p-3.5 bg-white/5">
                        <span className="font-display text-xl bg-[#e10600] text-white px-2.5 py-0.5">{r}</span>
                        <p className="text-sm font-medium pt-0.5">{t}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mono text-[11px] text-[#f4f1ea]/60 mt-5">LEARNED → prompt design, evaluation, keeping AI output checkable.</p>
                  <p className="mono text-[11px] font-bold text-[#f4f1ea]/80 mt-2 border-t border-white/15 pt-4">HONEST NOTE — currently developing. No invented users, revenue or metrics.</p>
                </div>
              </div>
            </motion.article>

            {/* Roster grid — remaining projects */}
            <div className="grid sm:grid-cols-2 gap-5">
              {PROJECTS.slice(1).map((p, i) => (
                <motion.article key={p.no} {...fade} transition={{ ...fade.transition, delay: (i % 2) * 0.08 }}
                  className={`border-2 border-[#0b0b0c] hard-sm ${i % 2 === 0 ? "bg-white" : "bg-[#0b0b0c] text-[#f4f1ea]"}`}>
                  <div className="flex items-center justify-between px-5 py-2.5 border-b-2 border-[#0b0b0c] bg-[#f4f1ea] text-[#0b0b0c]">
                    <span className="font-display text-lg">{p.no}</span>
                    <span className="mono text-[9px] font-bold tracking-[0.2em] bg-[#e10600] text-white px-2 py-1">{p.status.toUpperCase()}</span>
                  </div>
                  <div className="p-5 md:p-6">
                    <p className="mono text-[10px] font-bold tracking-[0.22em] text-[#e10600]">{p.kind}</p>
                    <h3 className="font-display uppercase text-2xl md:text-3xl mt-1">{p.title}</h3>
                    <p className={`text-sm font-medium mt-2 ${i % 2 === 0 ? "text-[#0b0b0c]/70" : "text-[#f4f1ea]/70"}`}>{p.concept}</p>
                    <ul className="mt-3 space-y-1.5 text-sm font-medium">
                      {p.points.map((pt) => <li key={pt} className="flex gap-2"><span className="text-[#e10600] font-bold">→</span>{pt}</li>)}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {p.stack.map((s) => <span key={s} className={`mono text-[10px] font-bold px-2.5 py-1 border ${i % 2 === 0 ? "border-[#0b0b0c]/25" : "border-white/25"}`}>{s}</span>)}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* GitHub strip */}
            <div className="border-2 border-[#0b0b0c] hard bg-[#0b0b0c] text-[#f4f1ea] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="mono text-[11px] font-bold tracking-[0.25em] text-[#e10600]">GITHUB · ADARSHKAKARLA-AK</p>
                <p className="font-display uppercase text-2xl md:text-3xl mt-1">Experiments live in public.</p>
              </div>
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#e10600] text-white font-bold text-sm px-6 py-3.5 border-2 border-[#f4f1ea] hover:bg-white hover:text-[#0b0b0c] hover:border-[#0b0b0c] transition-colors">
                <GithubIcon size={16} /> GITHUB.COM/ADARSHKAKARLA-AK
              </a>
            </div>
          </div>
        </section>

        {/* ============ BUILDER LOOP ============ */}
        <section className="bg-[#0b0b0c] text-[#f4f1ea] py-16 md:py-24 border-b-2 border-[#0b0b0c]">
          <Head no="03" tag="SIGNATURE — THE BUILDER LOOP" theme="ink"
            title={<>Learn → Experiment → <span className="text-[#e10600]">Build</span> → Repeat.</>} />
          <div className="max-w-6xl mx-auto px-5 md:px-8 mt-10">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Builder stages">
              {PIPELINE.map((s, i) => (
                <button key={s} role="tab" aria-selected={i === stage} onClick={() => setStage(i)}
                  className={`mono text-[11px] font-bold tracking-[0.2em] px-5 py-3 border-2 transition-all ${i === stage ? "bg-[#e10600] text-white border-[#e10600]" : i < stage ? "border-[#e10600]/60 text-[#e10600]" : "border-white/25 text-[#f4f1ea]/50 hover:text-white hover:border-white"}`}>
                  {String(i + 1).padStart(2, "0")} · {s}
                </button>
              ))}
            </div>
            <div className="mt-5 border-2 border-[#f4f1ea]/25 bg-[#131314] p-6 md:p-8 min-h-[140px]" aria-live="polite">
              <p className="mono text-[11px] font-bold tracking-[0.25em] text-[#e10600]">STAGE {String(stage + 1).padStart(2, "0")} / 06 — {PIPELINE[stage]}</p>
              <p className="font-display uppercase text-2xl md:text-4xl mt-2">{stageCopy[stage]}</p>
            </div>
          </div>
        </section>

        {/* ============ 04 — CONTENT LAB ============ */}
        <section id="lab" className="bg-[#0b0b0c] text-[#f4f1ea] py-16 md:py-24 scroll-mt-16 border-b-2 border-[#0b0b0c]">
          <Head no="04" tag="CONTENT / CREATIVE LAB" theme="ink"
            title={<>I turn ideas into <span className="text-[#e10600]">things people watch.</span></>}
            sub="Warmer, cinematic, competitive. Curated posters — not a feed mirror. No invented reach numbers." />
          <div className="max-w-6xl mx-auto px-5 md:px-8 mt-10 grid md:grid-cols-2 gap-5">
            {[
              { tag: "CLIENT · CREATIVE DIRECTION", l1: "Younique", l2: "Boutique", d: "Product presentation, promotional design and visual consistency for a boutique.", items: ["Product + offer creatives", "Grid consistency system", "Festive / drop campaigns"], score: "A", link: LINKS.younique },
              { tag: "CLIENT · SOCIAL MEDIA MANAGER", l1: "MyFlavours", l2: "Kitchen", d: "Short-form food videos, content planning, promotional storytelling for a food business.", items: ["Reels + menu storytelling", "Shoot → edit → caption → post", "Marketing tied to footfall"], score: "B", link: LINKS.myflavours },
            ].map((c) => (
              <motion.article key={c.l1} {...fade} className="bg-[#f4f1ea] text-[#0b0b0c] border-2 border-[#0b0b0c] hard-white overflow-hidden">
                <div className="bg-[#0b0b0c] text-[#f4f1ea] px-5 py-4 flex items-end justify-between relative overflow-hidden">
                  <div>
                    <p className="mono text-[10px] font-bold tracking-[0.25em] text-[#e10600]">● CASE STUDY · {c.score}</p>
                    <p className="font-display uppercase text-4xl md:text-5xl leading-none mt-1">{c.l1}<span className="text-[#e10600]"> ✕</span><br />{c.l2}</p>
                  </div>
                  <span className="w-12 h-12 rounded-full bg-[#e10600] text-white flex items-center justify-center shrink-0" aria-hidden="true"><Play size={18} /></span>
                  <span className="absolute -right-4 -bottom-7 font-display text-[7rem] leading-none text-white/5 select-none" aria-hidden="true">{c.score}</span>
                </div>
                <div className="p-5 md:p-6">
                  <p className="mono text-[10px] font-bold tracking-[0.2em]">{c.tag}</p>
                  <p className="font-medium text-sm mt-2 text-[#0b0b0c]/75">{c.d}</p>
                  <ul className="mt-3 space-y-1.5 text-sm font-semibold">{c.items.map((x) => <li key={x}>→ {x}</li>)}</ul>
                  <a href={c.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-5 text-sm font-bold bg-[#0b0b0c] text-white px-5 py-2.5 border-2 border-[#0b0b0c] hover:bg-[#e10600] transition-colors">
                    VIEW WORK <ArrowUpRight size={15} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="max-w-6xl mx-auto px-5 md:px-8 mt-5 grid md:grid-cols-2 gap-5">
            <motion.div {...fade} className="border-2 border-[#f4f1ea]/25 bg-[#131314] p-6 md:p-8">
              <p className="mono text-[11px] font-bold tracking-[0.22em] text-[#e10600]"><Mountain size={13} className="inline mr-1" /> THE JOURNEY / BEYOND THE SCREEN</p>
              <h3 className="font-display uppercase text-3xl mt-2">A 3-part bike-trip documentary trial.</h3>
              <p className="text-[#f4f1ea]/65 font-medium text-sm mt-2">Planning, route, breakdowns, persistence — documented like a builder logs builds.</p>
              <div className="flex gap-2 mt-4 mono text-[10px] font-bold">{["EP.01 PLAN", "EP.02 RIDE", "EP.03 RETURN"].map((e) => <span key={e} className="border border-white/25 px-3 py-1.5">{e}</span>)}</div>
            </motion.div>
            <motion.div {...fade} className="border-2 border-[#f4f1ea]/25 bg-[#131314] p-6 md:p-8">
              <p className="mono text-[11px] font-bold tracking-[0.22em] text-[#f4f1ea]/50">BEFORE THE BUILDER · OLD YOUTUBE</p>
              <h3 className="font-display uppercase text-3xl mt-2">Where the camera habit started.</h3>
              <p className="text-[#f4f1ea]/65 font-medium text-sm mt-2">Early uploads → editing reps → client work → AI builds. Evidence of evolution, kept small on purpose.</p>
              <p className="mono text-[11px] font-bold text-[#e10600] mt-4">→ MEDIA SLOT — swap with real channel URL + 3 best videos</p>
            </motion.div>
          </div>
        </section>

        {/* ============ 05 — NOW (red) ============ */}
        <section id="now" className="bg-[#e10600] text-white py-16 md:py-24 scroll-mt-16 border-b-2 border-[#0b0b0c]">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <motion.div {...fade}>
              <div className="flex items-center gap-3">
                <span className="font-display text-sm bg-[#0b0b0c] text-white px-3 py-1.5">05</span>
                <span className="mono text-[11px] font-bold tracking-[0.25em]">CURRENTLY BUILDING</span>
                <span className="h-[2px] flex-1 bg-white/30" />
              </div>
              <h2 className="font-display uppercase leading-[0.92] text-5xl md:text-7xl mt-5">My operating<br />system, right now.</h2>
              <p className="font-semibold text-white/85 max-w-2xl mt-4">Actively learning + actively applying. Nothing here claims expert-level mastery.</p>
            </motion.div>
            <motion.div {...fade} className="mt-10 bg-[#0b0b0c] text-[#f4f1ea] border-2 border-[#0b0b0c] hard overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/15">
                <span className="w-2.5 h-2.5 bg-[#e10600]" /><span className="w-2.5 h-2.5 bg-white/30" /><span className="w-2.5 h-2.5 bg-white/30" />
                <span className="mono text-[11px] text-[#f4f1ea]/50 ml-2">adarsh@build:~$ status --now</span>
                <span className="mono text-[10px] font-bold ml-auto bg-[#e10600] px-2 py-0.5">LIVE</span>
              </div>
              <div className="grid md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-white/10">
                {[
                  { k: "NOW", v: "EduExam AI", d: "AI assessment assistant on Lyzr AI. Portion → blueprint → questions → rubric." },
                  { k: "LEARNING", v: "C · Java · Python · DSA · ML", d: "Foundation semester + daily coding reps. Web dev alongside." },
                  { k: "EXPLORING", v: "AI · Automation · Products", d: "AI tools, workflows, and the gap between idea and something used." },
                ].map((b, i) => (
                  <div key={b.k} className="p-6 md:p-8">
                    <p className="font-display text-5xl text-white/15">0{i + 1}</p>
                    <p className="mono text-[11px] font-bold tracking-[0.25em] text-[#e10600] mt-1">{b.k}</p>
                    <p className="font-display uppercase text-xl mt-2">{b.v}</p>
                    <p className="text-[#f4f1ea]/65 text-sm font-medium mt-2">{b.d}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ 06 — IDEAS ============ */}
        <section id="ideas" className="py-16 md:py-24 scroll-mt-16 border-b-2 border-[#0b0b0c]">
          <Head no="06" tag="IDEAS INTO EXPERIMENTS"
            title={<>The gap between an idea <span className="stroke-ink">and something used.</span></>}
            sub="Not a founder story yet — a thinking log. Curiosity → gap → experiment → prototype → learning." />
          <div className="max-w-6xl mx-auto px-5 md:px-8 mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { t: "AI paper-setter for schools", d: "EduExam AI v1. The wedge: assessment, not generic tutoring." },
              { t: "Content retainer for local brands", d: "Tested with food + boutique. Shoot systems that scale." },
              { t: "Skill → income loops", d: "Editing, sites, automation. Small paid reps over big pitches." },
              { t: "Document → audience → product", d: "Build in public. Journey series as top-of-funnel." },
            ].map((c, i) => (
              <motion.div key={c.t} {...fade} transition={{ ...fade.transition, delay: i * 0.07 }}
                className="bg-white border-2 border-[#0b0b0c] hard-sm p-6 hover:bg-[#0b0b0c] hover:text-[#f4f1ea] transition-colors group">
                <p className="font-display text-5xl text-[#e10600]">0{i + 1}</p>
                <p className="mono text-[10px] font-bold tracking-[0.2em] mt-1 opacity-60">EXP.0{i + 1}</p>
                <h3 className="font-display uppercase text-lg mt-3 leading-tight">{c.t}</h3>
                <p className="text-sm font-medium mt-2 opacity-70">{c.d}</p>
              </motion.div>
            ))}
          </div>
          <p className="max-w-6xl mx-auto px-5 md:px-8 mono text-[11px] font-bold tracking-[0.15em] mt-6 text-[#0b0b0c]/60">
            <Zap size={13} className="inline mr-1 text-[#e10600]" /> “I&apos;M INTERESTED IN THE GAP BETWEEN AN IDEA AND SOMETHING PEOPLE ACTUALLY USE.”
          </p>
        </section>

        {/* ============ 07 — JOURNEY ============ */}
        <section id="journey" className="py-16 md:py-24 scroll-mt-16 border-b-2 border-[#0b0b0c] bg-white">
          <Head no="07" tag="JOURNEY — LEARNING → EXPERIMENTING → BUILDING"
            title={<>Still early. <span className="text-[#e10600]">Already moving.</span></>} />
          <div className="max-w-6xl mx-auto px-5 md:px-8 mt-10 border-2 border-[#0b0b0c] hard bg-[#f4f1ea]">
            {TIMELINE.map((t, i) => (
              <motion.div key={t.title + i} {...fade}
                className="grid md:grid-cols-[130px_1fr_1.4fr] gap-1 md:gap-6 items-baseline px-5 md:px-8 py-5 border-b-2 last:border-b-0 border-[#0b0b0c]/12 hover:bg-[#0b0b0c] hover:text-[#f4f1ea] transition-colors group">
                <p className="font-display uppercase text-2xl md:text-3xl text-[#e10600]">{t.year}</p>
                <h3 className="font-display uppercase text-lg md:text-xl">{t.title}</h3>
                <p className="text-sm font-medium opacity-70">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ LEADERSHIP + BEYOND ============ */}
        <section className="py-16 md:py-24 border-b-2 border-[#0b0b0c]">
          <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-5">
            <motion.div {...fade} className="bg-[#0b0b0c] text-[#f4f1ea] border-2 border-[#0b0b0c] hard p-6 md:p-10">
              <p className="mono text-[11px] font-bold tracking-[0.22em] text-[#e10600]"><Trophy size={13} className="inline mr-1" /> LEADERSHIP</p>
              <h3 className="font-display uppercase text-3xl md:text-4xl mt-3 leading-[0.95]">I don&apos;t just build things. I lead people too.</h3>
              <div className="mt-6 border-2 border-white/20 divide-y divide-white/15">
                {["Volleyball captain — run the court, own the result", "Class representative — bridge students ↔ faculty", "Student coordinator + technical team lead — ship events", "Event organisation + public speaking reps"].map((x, i) => (
                  <p key={x} className="flex gap-3 text-sm font-semibold px-4 py-3"><span className="font-display text-[#e10600]">0{i + 1}</span>{x}</p>
                ))}
              </div>
            </motion.div>
            <motion.div {...fade} className="bg-white border-2 border-[#0b0b0c] hard p-6 md:p-10">
              <p className="mono text-[11px] font-bold tracking-[0.22em] text-[#e10600]">BEYOND THE CODE</p>
              <h3 className="font-display uppercase text-3xl md:text-4xl mt-3">Fuel for the build.</h3>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Motorcycles", "Volleyball", "Fitness", "Travel", "Drawing", "Filmmaking", "Public speaking", "Learning"].map((x) => (
                  <span key={x} className="mono text-[11px] font-bold border-2 border-[#0b0b0c] px-3.5 py-1.5 hover:bg-[#e10600] hover:text-white hover:border-[#e10600] transition-colors cursor-default">{x}</span>
                ))}
              </div>
              <p className="font-medium text-sm mt-6 text-[#0b0b0c]/70">Present, not dominant. You leave thinking <strong>AI + tech + content builder</strong> — with a pulse. Not a biker who also codes.</p>
              <div className="mt-6 border-2 border-[#0b0b0c] p-5 flex gap-4 items-start bg-[#f4f1ea]">
                <div className="w-14 h-14 bg-[#e10600] text-white font-display text-2xl flex items-center justify-center shrink-0 border-2 border-[#0b0b0c]">A</div>
                <div>
                  <p className="mono text-[10px] font-bold tracking-[0.2em]">QUICK INTRO — BUILDER · EXPLORER · STUDENT · CREATOR</p>
                  <p className="font-medium text-sm mt-2">I&apos;m Adarsh — CSE student in Bengaluru who likes finding gaps and turning them into projects. Client content, software trials, leadership reps, and now AI builds like <strong>EduExam AI</strong>.</p>
                  <div className="flex flex-wrap gap-2.5 mt-4">
                    <a href={LINKS.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold bg-[#0b0b0c] text-white px-5 py-2.5 border-2 border-[#0b0b0c] hover:bg-[#e10600] transition-colors"><FileText size={14} /> VIEW RESUME</a>
                    <a href={LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold bg-white px-5 py-2.5 border-2 border-[#0b0b0c] hover:bg-[#e10600] hover:text-white hover:border-[#e10600] transition-colors"><Code2 size={14} /> GITHUB</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ CONTACT — HEIST POSTER ============ */}
        <section id="contact" className="bg-[#0b0b0c] text-[#f4f1ea] py-20 md:py-28 scroll-mt-16 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start relative">
            <motion.div {...fade}>
              <p className="mono text-[11px] font-bold tracking-[0.25em] text-[#e10600]">FOR PROJECTS · COLLABS · IDEAS · INTERESTING CONVERSATIONS</p>
              <h2 className="font-display uppercase leading-[0.9] text-6xl md:text-8xl mt-4">Let&apos;s build<br />something<span className="text-[#e10600]">.</span></h2>
              <div className="flex items-center gap-0 mt-6 max-w-md">
                <span className="h-3 w-24 bg-[#e10600]" />
                <span className="h-3 flex-1 stripes-red opacity-70" />
              </div>
              <p className="font-medium text-[#f4f1ea]/70 mt-5 max-w-md">There&apos;s more coming. The best time to connect is while it&apos;s being built.</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-7">
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#e10600] text-white font-bold text-sm px-8 py-4 border-2 border-[#e10600] hover:bg-white hover:text-[#0b0b0c] hover:border-white transition-colors"><Mail size={16} /> CONNECT WITH ME</a>
                <a href="#work" className="inline-flex items-center justify-center gap-2 font-bold text-sm px-8 py-4 border-2 border-white/40 hover:border-[#e10600] hover:text-[#e10600] transition-colors"><ArrowDown size={16} /> SEE THE WORK</a>
              </div>
              <div className="flex gap-3 mt-7">
                {[
                  { icon: <GithubIcon size={17} />, href: LINKS.github, label: "GitHub" },
                  { icon: <LinkedinIcon size={17} />, href: LINKS.linkedin, label: "LinkedIn" },
                  { icon: <InstagramIcon size={17} />, href: LINKS.instagram, label: "Instagram" },
                  { icon: <Mail size={17} />, href: LINKS.email, label: "Email" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" aria-label={s.label}
                    className="w-11 h-11 border-2 border-white/25 flex items-center justify-center hover:border-[#e10600] hover:text-[#e10600] transition-colors">{s.icon}</a>
                ))}
              </div>
            </motion.div>
            {/* fixture card */}
            <motion.aside {...fade} className="bg-[#f4f1ea] text-[#0b0b0c] border-2 border-[#f4f1ea] p-6 md:p-8" aria-label="Contact fixture">
              <div className="flex items-center justify-between border-b-2 border-[#0b0b0c] pb-4">
                <p className="mono text-[10px] font-bold tracking-[0.25em]">NEXT FIXTURE</p>
                <p className="mono text-[10px] font-bold tracking-[0.25em] bg-[#e10600] text-white px-2 py-1">OPEN</p>
              </div>
              <p className="font-display uppercase text-4xl mt-4 leading-none">You<br />vs<br />The Next<br />Build<span className="text-[#e10600]">.</span></p>
              <div className="grid grid-cols-2 gap-px bg-[#0b0b0c] border-2 border-[#0b0b0c] mt-6 text-center">
                <div className="bg-[#f4f1ea] py-3">
                  <p className="mono text-[9px] font-bold tracking-[0.2em] opacity-60">RESPONSE</p>
                  <p className="font-display text-xl">24 HRS</p>
                </div>
                <div className="bg-[#f4f1ea] py-3">
                  <p className="mono text-[9px] font-bold tracking-[0.2em] opacity-60">BASE</p>
                  <p className="font-display text-xl">BLR · IN</p>
                </div>
              </div>
              <p className="mono text-[10px] font-bold tracking-[0.15em] mt-5 opacity-60">PREFER EMAIL? → ADARSHKAKARLA@GMAIL.COM</p>
            </motion.aside>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b0b0c] text-[#f4f1ea] border-t border-white/15 px-5 md:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-display uppercase">Adarsh<span className="text-[#e10600]">✕</span>Kakarla</p>
          <p className="mono text-[10px] font-bold tracking-[0.25em] text-[#f4f1ea]/60">AI · TECH · CONTENT · ENTREPRENEURSHIP</p>
          <p className="mono text-[10px] font-bold text-[#f4f1ea]/60">“LEARN → EXPERIMENT → BUILD → REPEAT.”</p>
        </div>
      </footer>
    </div>
  );
}
