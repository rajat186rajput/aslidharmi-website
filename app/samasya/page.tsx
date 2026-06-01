"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useLang, tx } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tri = { en: string; hinglish: string; hi: string };

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd3zMprVIcOyF0njYE8c0lQWJrRQih6SvnUnF4Wlruxb4-rLw/viewform";

// Problems are hardcoded from vault until a backend is wired
const PROBLEMS: Array<{
  id: string;
  status: "open" | "solving" | "solved";
  sub_system: string;
  date: string;
  title: Tri;
  description: Tri;
  problem_statement: Tri;
}> = [
  {
    id: "001",
    status: "open",
    sub_system: "Self-Sustainable Systems",
    date: "2026-05-20",
    title: {
      en: "Healthcare & Education Gap in the Hills",
      hinglish: "Pahado Mein Healthcare aur Education Ki Problem",
      hi: "पहाड़ों में हेल्थकेयर और शिक्षा की समस्या",
    },
    description: {
      en: "Hill villages have neither doctors nor good schools. The PHC is 1-2 hours away and shut half the days. The primary school has a single teacher who is often absent. This problem exists in almost every underserved hill village. Work is starting on it via the Panchmukhi Village Hub — but a pilot site is needed.",
      hinglish: "Pahari gaon mein na doctor hain, na accha school. PHC 1-2 ghante door hai aur half the days band rehta hai. Primary school mein single teacher hai — absent zyaada din hota hai. Yeh problem lagbhag har underserved pahari gaon mein hai. Is per kaam shuru ho raha hai Panchmukhi Village Hub ke zariye — lekin pilot site ki zaroorat hai.",
      hi: "पहाड़ी गाँव में न डॉक्टर हैं, न अच्छा स्कूल। PHC 1-2 घंटे दूर है और आधे दिन बंद रहता है। प्राइमरी स्कूल में एक ही टीचर है — ज़्यादातर दिन ग़ैरहाज़िर रहता है। यह समस्या लगभग हर उपेक्षित पहाड़ी गाँव में है। इस पर काम शुरू हो रहा है पंचमुखी विलेज हब के ज़रिए — लेकिन पायलट साइट की ज़रूरत है।",
    },
    problem_statement: {
      en: "Healthcare and education services in hill villages are absent or unreliable. PHC 1-2 hours away, closed half the days. Single-teacher primary schools with frequent absences. No telemedicine infrastructure. No quality education access for children.",
      hinglish: "Pahari villages mein healthcare aur education services absent ya unreliable hain. PHC 1-2 hours door, half the days closed. Single-teacher primary schools with frequent absences. No telemedicine infrastructure. No quality education access for children.",
      hi: "पहाड़ी गाँवों में हेल्थकेयर और शिक्षा सेवाएँ अनुपस्थित या भरोसेमंद नहीं हैं। PHC 1-2 घंटे दूर, आधे दिन बंद। एकल-शिक्षक प्राइमरी स्कूल, बार-बार ग़ैरहाज़िरी। कोई टेलीमेडिसिन ढाँचा नहीं। बच्चों के लिए गुणवत्तापूर्ण शिक्षा की पहुँच नहीं।",
    },
  },
];

const STATUS_LABELS: Record<"open" | "solving" | "solved", { label: Tri; color: string }> = {
  open: { label: { en: "Open", hinglish: "Open", hi: "खुली" }, color: "text-ochre bg-ochre/10" },
  solving: { label: { en: "Solving", hinglish: "Solving", hi: "हल हो रही" }, color: "text-sage bg-sage/10" },
  solved: { label: { en: "Solved", hinglish: "Solved", hi: "हल हो गई" }, color: "text-cream/60 bg-cream/8" },
};

const C = {
  eyebrow: { en: "Community · Action", hinglish: "Community · Action", hi: "समुदाय · कर्म" },
  h1a: { en: "Problem Board —", hinglish: "Samasya Board —", hi: "समस्या बोर्ड —" },
  h1em: { en: "With the Community", hinglish: "Community Ke Saath", hi: "समुदाय के साथ" },
  intro: {
    en: "No problem is solved alone. Here I write the problems I can see. Some I can't solve myself either. That's why they're here — tell us, seriously.",
    hinglish: "Koi problem akele solve nahi hoti. Yahan main woh problems likhta hun jo mujhe dikh rahi hain. Kuch mere paas bhi solve nahi hain. Isliye yahan hain — batao, seriously.",
    hi: "कोई समस्या अकेले हल नहीं होती। यहाँ मैं वो समस्याएँ लिखता हूँ जो मुझे दिख रही हैं। कुछ मेरे पास भी हल नहीं हैं। इसलिए यहाँ हैं — बताओ, सच में।",
  },
  open: { en: "Open", hinglish: "Open", hi: "खुली" },
  solved: { en: "Solved", hinglish: "Solved", hi: "हल" },
  current: { en: "The Current Problem", hinglish: "Abhi Ki Samasya", hi: "अभी की समस्या" },
  allOpen: { en: "All Open Problems", hinglish: "Sab Khuli Samasyaen", hi: "सभी खुली समस्याएँ" },
  solvedProof: { en: "Solved (Proof)", hinglish: "Jo Solve Ho Gayi (Proof)", hi: "जो हल हो गईं (प्रमाण)" },
  readMore: { en: "Read full ↓", hinglish: "Poora Padho ↓", hi: "पूरा पढ़ो ↓" },
  readLess: { en: "Read less ↑", hinglish: "Kam Padho ↑", hi: "कम पढ़ो ↑" },
  suggestSol: { en: "Suggest a Solution →", hinglish: "Solution Suggest Karo →", hi: "समाधान सुझाओ →" },
  ctaHeading: { en: "Got another problem that's not here?", hinglish: "Koi aur samasya hai jo yahan nahi hai?", hi: "कोई और समस्या है जो यहाँ नहीं है?" },
  ctaSub: {
    en: "Tell us. I genuinely read them. And if I can do something — I will.",
    hinglish: "Batao. Main genuinely parhta hun. Aur agar kuch kar sakta hun — karunga.",
    hi: "बताओ। मैं सच में पढ़ता हूँ। और अगर कुछ कर सकता हूँ — करूँगा।",
  },
  ctaBtn: { en: "Suggest a New Problem →", hinglish: "Nayi Samasya Suggest Karo →", hi: "नई समस्या सुझाओ →" },
  footHome: { en: "Home", hinglish: "Home", hi: "होम" },
  footKaam: { en: "Our Work", hinglish: "Hamare Kaam", hi: "हमारे काम" },
  footJoin: { en: "Join", hinglish: "Shaamil Ho", hi: "जुड़ें" },
} as const;

function ProblemCard({ problem }: { problem: typeof PROBLEMS[0] }) {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const desc = tx(problem.description, lang);
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
            {tx(STATUS_LABELS[problem.status].label, lang)}
          </span>
          <span className="font-sans text-xs text-ochre/50 uppercase tracking-wider">{problem.sub_system}</span>
        </div>
        <span className="font-sans text-xs text-cream/25 shrink-0">{problem.date}</span>
      </div>

      <h3 className="font-heading text-2xl text-cream font-semibold mb-4 leading-snug">{tx(problem.title, lang)}</h3>
      <p className="font-sans text-sm text-cream/50 leading-relaxed mb-6">
        {expanded ? tx(problem.problem_statement, lang) : desc.slice(0, 200) + "..."}
      </p>

      <div className="flex gap-4 items-center flex-wrap">
        <button
          onClick={() => setExpanded(e => !e)}
          className="font-sans text-xs text-cream/40 hover:text-cream/70 transition-colors uppercase tracking-wider"
        >
          {expanded ? tx(C.readLess, lang) : tx(C.readMore, lang)}
        </button>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-ochre text-cream font-sans text-xs uppercase tracking-widest hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
        >
          {tx(C.suggestSol, lang)}
        </a>
      </div>
    </motion.div>
  );
}

export default function SamasyaPage() {
  const { lang } = useLang();
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
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-6">{tx(C.eyebrow, lang)}</p>
          <h1 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92] mb-6">
            {tx(C.h1a, lang)}<br />
            <em className="text-ochre">{tx(C.h1em, lang)}</em>
          </h1>
          <p className="font-sans text-xl text-cream/50 max-w-xl leading-relaxed mb-8">
            {tx(C.intro, lang)}
          </p>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ochre" />
              <span className="font-sans text-xs text-cream/40">{openProblems.length} {tx(C.open, lang)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cream/20" />
              <span className="font-sans text-xs text-cream/40">{solvedProblems.length} {tx(C.solved, lang)}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURED OPEN PROBLEM ── */}
      {openProblems.length > 0 && (
        <section className="px-6 md:px-16 pb-8">
          <div className="max-w-4xl mx-auto">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-6">{tx(C.current, lang)}</p>
            <ProblemCard problem={openProblems[0]} />
          </div>
        </section>
      )}

      {/* ── ALL OPEN PROBLEMS ── */}
      {openProblems.length > 1 && (
        <section className="px-6 md:px-16 py-12 border-t border-cream/8">
          <div className="max-w-4xl mx-auto">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">{tx(C.allOpen, lang)}</p>
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
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">{tx(C.solvedProof, lang)}</p>
            <div className="space-y-4">
              {solvedProblems.map(p => (
                <div key={p.id} className="py-4 border-b border-cream/8 flex gap-6 items-start">
                  <span className={`font-sans text-xs px-3 py-1 rounded-sm uppercase tracking-wider shrink-0 ${STATUS_LABELS.solved.color}`}>{tx(STATUS_LABELS.solved.label, lang)}</span>
                  <div>
                    <p className="font-sans text-sm text-cream/60">{tx(p.title, lang)}</p>
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
              {tx(C.ctaHeading, lang)}
            </h3>
            <p className="font-sans text-base text-cream/40 mb-8">
              {tx(C.ctaSub, lang)}
            </p>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
            >
              {tx(C.ctaBtn, lang)}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-cream/8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-cream/30">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-cream/30">
          <Link href="/" className="hover:text-cream/60 transition-colors">{tx(C.footHome, lang)}</Link>
          <Link href="/hamari-soch#kaam" className="hover:text-cream/60 transition-colors">{tx(C.footKaam, lang)}</Link>
          <Link href="/join" className="hover:text-cream/60 transition-colors">{tx(C.footJoin, lang)}</Link>
        </div>
      </footer>
    </main>
  );
}
