"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Problems are hardcoded from vault until a backend is wired
const PROBLEMS = [
  {
    id: "001",
    title: "Pahado Mein Healthcare aur Education Ki Problem",
    status: "open" as "open" | "solving" | "solved",
    sub_system: "Self-Sustainable Systems",
    date: "2026-05-20",
    description: "Pahari gaon mein na doctor hain, na accha school. PHC 1-2 ghante door hai aur half the days band rehta hai. Primary school mein single teacher hai — absent zyaada din hota hai. Yeh problem lagbhag har underserved pahari gaon mein hai. Is per kaam shuru ho raha hai Panchmukhi Village Hub ke zariye — lekin pilot site ki zaroorat hai.",
    problem_statement: "Pahari villages mein healthcare aur education services absent ya unreliable hain. PHC 1-2 hours door, half the days closed. Single-teacher primary schools with frequent absences. No telemedicine infrastructure. No quality education access for children.",
    solutions_suggested: [],
    source: "Rajat — community observation",
  },
];

const STATUS_LABELS = {
  open: { label: "Open", color: "text-ochre bg-ochre/10" },
  solving: { label: "Solving", color: "text-sage bg-sage/10" },
  solved: { label: "Solved", color: "text-cream/60 bg-cream/8" },
};

function ProblemCard({ problem }: { problem: typeof PROBLEMS[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      viewport={{ once: true }}
      className="border border-cream/10 p-8"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-sans text-xs text-cream/30 tracking-wider">{problem.id}</span>
          <span className={`font-sans text-xs px-3 py-1 rounded-sm uppercase tracking-wider ${STATUS_LABELS[problem.status].color}`}>
            {STATUS_LABELS[problem.status].label}
          </span>
          <span className="font-sans text-xs text-ochre/50 uppercase tracking-wider">{problem.sub_system}</span>
        </div>
        <span className="font-sans text-xs text-cream/25 shrink-0">{problem.date}</span>
      </div>

      <h3 className="font-heading text-2xl text-cream font-semibold mb-4 leading-snug">{problem.title}</h3>
      <p className="font-sans text-sm text-cream/50 leading-relaxed mb-6">
        {expanded ? problem.problem_statement : problem.description.slice(0, 200) + "..."}
      </p>

      <div className="flex gap-4 items-center flex-wrap">
        <button
          onClick={() => setExpanded(e => !e)}
          className="font-sans text-xs text-cream/40 hover:text-cream/70 transition-colors uppercase tracking-wider"
        >
          {expanded ? "Kam Padho ↑" : "Poora Padho ↓"}
        </button>
        <a
          href="https://forms.gle/aslidharmi-samasya"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-ochre text-cream font-sans text-xs uppercase tracking-widest hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
        >
          Solution Suggest Karo →
        </a>
      </div>
    </motion.div>
  );
}

export default function SamasyaPage() {
  const openProblems = PROBLEMS.filter(p => p.status === "open");
  const solvedProblems = PROBLEMS.filter(p => p.status === "solved");

  return (
    <main className="bg-charcoal text-cream min-h-screen">

      {/* ── HEADER ── */}
      <section className="pt-32 pb-20 px-6 md:px-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-4xl relative"
        >
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-6">Community · Action</p>
          <h1 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92] mb-6">
            Samasya Board —<br />
            <em className="text-ochre">Community Ke Saath</em>
          </h1>
          <p className="font-sans text-xl text-cream/50 max-w-xl leading-relaxed mb-8">
            Koi problem akele solve nahi hoti. Yahan main woh problems likhta hun jo mujhe dikh rahi hain.
            Kuch mere paas bhi solve nahi hain. Isliye yahan hain — batao, seriously.
          </p>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ochre" />
              <span className="font-sans text-xs text-cream/40">{openProblems.length} Open</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cream/20" />
              <span className="font-sans text-xs text-cream/40">{solvedProblems.length} Solved</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURED OPEN PROBLEM ── */}
      {openProblems.length > 0 && (
        <section className="px-6 md:px-16 pb-8">
          <div className="max-w-4xl mx-auto">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-6">Abhi Ki Samasya</p>
            <ProblemCard problem={openProblems[0]} />
          </div>
        </section>
      )}

      {/* ── ALL OPEN PROBLEMS ── */}
      {openProblems.length > 1 && (
        <section className="px-6 md:px-16 py-12 border-t border-cream/8">
          <div className="max-w-4xl mx-auto">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">Sab Khuli Samasyaen</p>
            <div className="space-y-6">
              {openProblems.slice(1).map(p => <ProblemCard key={p.id} problem={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── SOLVED ── */}
      {solvedProblems.length > 0 && (
        <section className="px-6 md:px-16 py-12 border-t border-cream/8">
          <div className="max-w-4xl mx-auto">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">Jo Solve Ho Gayi (Proof)</p>
            <div className="space-y-4">
              {solvedProblems.map(p => (
                <div key={p.id} className="py-4 border-b border-cream/8 flex gap-6 items-start">
                  <span className={`font-sans text-xs px-3 py-1 rounded-sm uppercase tracking-wider shrink-0 ${STATUS_LABELS.solved.color}`}>Solved</span>
                  <div>
                    <p className="font-sans text-sm text-cream/60">{p.title}</p>
                    <p className="font-sans text-xs text-cream/30 mt-1">{p.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SUBMIT CTA ── */}
      <section className="px-6 md:px-16 py-20 border-t border-cream/8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true }}
          >
            <div className="w-px h-12 bg-ochre/40 mx-auto mb-10" />
            <h3 className="font-heading text-3xl text-cream font-semibold mb-4">
              Koi aur samasya hai jo yahan nahi hai?
            </h3>
            <p className="font-sans text-base text-cream/40 mb-8">
              Batao. Main genuinely parhta hun. Aur agar kuch kar sakta hun — karunga.
            </p>
            <a
              href="https://forms.gle/aslidharmi-nayi-samasya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
            >
              Nayi Samasya Suggest Karo →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-cream/8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-cream/30">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-cream/30">
          <Link href="/" className="hover:text-cream/60 transition-colors">Home</Link>
          <Link href="/kaam" className="hover:text-cream/60 transition-colors">Hamare Kaam</Link>
          <Link href="/join" className="hover:text-cream/60 transition-colors">Shaamil Ho</Link>
        </div>
      </footer>
    </main>
  );
}
