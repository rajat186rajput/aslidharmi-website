"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang, tx, type Lang } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

// TODO: Rajat to supply the real donate link (UPI / Razorpay / Instamojo) for the
// Donate button below. Until then it falls back to a mailto. 1-line swap when ready.
const DONATE_URL = "mailto:aslidharmi@gmail.com?subject=Donation%20-%20Asli%20Dharmi";

interface DashboardData {
  total_donations_cash: number;
  total_donations_inkind: number;
  total_expenses: number;
  unutilized_balance: number;
  generated_at: string;
  by_sub_system: Record<string, number>;
  recent_transactions: Array<{
    date: string;
    type: string;
    amount: number;
    sub_system: string;
    description: string;
    donor?: string;
  }>;
}

type Tri = { en: string; hinglish: string; hi: string };

const SUB_SYSTEM_LABELS: Record<string, Tri> = {
  content_creation: { en: "Content Creation", hinglish: "Content Banane Mein", hi: "कंटेंट बनाने में" },
  women_empowerment: { en: "Women Empowerment", hinglish: "Mahila Sashaktikaran Mein", hi: "महिला सशक्तिकरण में" },
  self_sustainable: { en: "Self-Sustainable Projects", hinglish: "Self-Sustainable Projects Mein", hi: "आत्मनिर्भर प्रोजेक्ट में" },
  sangha: { en: "Sangha App", hinglish: "Sangha App Mein", hi: "संघ ऐप में" },
  movement_wide: { en: "Movement Admin", hinglish: "Movement Admin Mein", hi: "मूवमेंट एडमिन में" },
};

const C = {
  // ── NEW: Help Us / Donate-Volunteer band ──
  helpEyebrow: { en: "Help Us", hinglish: "Help Us", hi: "सहयोग करें" },
  helpTitleA: { en: "Be ", hinglish: "Iska ", hi: "इसका " },
  helpTitleEm: { en: "part", hinglish: "hissa", hi: "हिस्सा" },
  helpTitleB: { en: " of it", hinglish: " bano", hi: " बनो" },
  helpSub: {
    en: "Two ways to help — give money, or give time. Both are public.",
    hinglish: "Madad ke do tareeke — paisa do, ya samay do. Dono public hain.",
    hi: "मदद के दो तरीक़े — पैसा दो, या समय दो। दोनों सार्वजनिक हैं।",
  },
  donateTitle: { en: "Donate", hinglish: "Daan Do", hi: "दान दो" },
  donateBody: {
    en: "Every rupee is public — tracked below, to the rupee.",
    hinglish: "Har rupaya public — neeche, ek-ek rupaye tak.",
    hi: "हर रुपया सार्वजनिक — नीचे, एक-एक रुपये तक।",
  },
  donateBtn: { en: "Donate Now", hinglish: "Abhi Daan Do", hi: "अभी दान दो" },
  volunteerTitle: { en: "Volunteer", hinglish: "Samay Do", hi: "समय दो" },
  volunteerBody: {
    en: "Give time, earn Asli Dharmi credits. Earned, not charity.",
    hinglish: "Samay do, Asli Dharmi credits kamao. Kamaya, charity nahi.",
    hi: "समय दो, असली धर्मी क्रेडिट कमाओ। कमाया, चैरिटी नहीं।",
  },
  volunteerBtn: { en: "Volunteer →", hinglish: "Volunteer Karo →", hi: "वॉलंटियर करो →" },
  trustLink: { en: "100% of it shows up below ↓", hinglish: "100% neeche dikhta hai ↓", hi: "100% नीचे दिखता है ↓" },

  // ── Existing dashboard copy (kept byte-for-byte from paisa) ──
  eyebrow: { en: "Transparency", hinglish: "Transparency", hi: "पारदर्शिता" },
  h1a: { en: "Where the Money", hinglish: "Paisa Kahan", hi: "पैसा कहाँ" },
  h1em: { en: "Goes", hinglish: "Ja Raha Hai", hi: "जा रहा है" },
  intro: {
    en: "Every rupee is public. Nothing hidden. Every donation that comes in — each rupee of it shows up here.",
    hinglish: "Har rupaya public hai. Kuch bhi chhupaana nahi. Jo bhi donation aata hai — uska ek-ek rupaya yahan dikhta hai.",
    hi: "हर रुपया सार्वजनिक है। कुछ भी छुपाना नहीं। जो भी दान आता है — उसका एक-एक रुपया यहाँ दिखता है।",
  },
  accountSoFar: { en: "The Account So Far", hinglish: "Abhi Tak Ka Hisaab", hi: "अब तक का हिसाब" },
  statCash: { en: "Total Donations (Cash)", hinglish: "Total Donations (Cash)", hi: "कुल दान (नकद)" },
  statInkind: { en: "Total Donations (In-Kind)", hinglish: "Total Donations (In-Kind)", hi: "कुल दान (वस्तु रूप)" },
  statSpent: { en: "Total Spent", hinglish: "Total Spent", hi: "कुल खर्च" },
  statUnused: { en: "Unutilized", hinglish: "Bacha Hua (Unutilized)", hi: "बचा हुआ" },
  ofTotal: { en: "of total received", hinglish: "of total received", hi: "कुल प्राप्त का" },
  whereWent: { en: "Where the Money Went", hinglish: "Kahan Gaya Paisa", hi: "पैसा कहाँ गया" },
  recent: { en: "Recent Transactions", hinglish: "Pichhle Transactions", hi: "पिछले लेन-देन" },
  emptyA: { en: "No transactions yet.", hinglish: "Abhi tak koi transaction nahi hua hai.", hi: "अभी तक कोई लेन-देन नहीं हुआ है।" },
  emptyB: { en: "The movement is still in its early phase.", hinglish: "Movement abhi shuruwati phase mein hai.", hi: "मूवमेंट अभी शुरुआती दौर में है।" },
  noteA: {
    en: "These numbers are updated manually whenever a transaction happens. Last updated: ",
    hinglish: "Yeh numbers manually update hote hain jab bhi koi transaction hota hai. Last updated: ",
    hi: "ये संख्याएँ हर लेन-देन पर मैन्युअल रूप से अपडेट होती हैं। आख़िरी अपडेट: ",
  },
  noteB: { en: "Any questions: ", hinglish: "Koi sawaal ho toh: ", hi: "कोई सवाल हो तो: " },
  principleLabel: { en: "Principle", hinglish: "Principle", hi: "सिद्धांत" },
  principle: {
    en: "“Anti-power-concentration. Money shouldn't pile up in one place. So every rupee is public — accounting is the movement's duty, not an option.”",
    hinglish: "“Anti-power-concentration. Paisa ek jagah nahi rukna chahiye. Isliye har rupaya public hai — hisaab dena movement ka farz hai, option nahi.”",
    hi: "“शक्ति-केंद्रीकरण के ख़िलाफ़। पैसा एक जगह नहीं रुकना चाहिए। इसलिए हर रुपया सार्वजनिक है — हिसाब देना मूवमेंट का फ़र्ज़ है, विकल्प नहीं।”",
  },
  footHome: { en: "Home", hinglish: "Home", hi: "होम" },
  footJoin: { en: "Join", hinglish: "Shaamil Ho", hi: "जुड़ें" },
} as const;

function StatCard({ label, value, sub }: { label: string; value: number; sub?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      viewport={{ once: true }}
      className="p-8 border border-cream/10"
    >
      <p className="font-sans text-xs uppercase tracking-widest text-cream/40 mb-3">{label}</p>
      <p className="font-heading text-4xl text-cream font-semibold mb-1">
        ₹{value.toLocaleString("en-IN")}
      </p>
      {sub && <p className="font-sans text-xs text-cream/30">{sub}</p>}
    </motion.div>
  );
}

export default function HelpUsPage() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/paisa")
      .then(r => r.json())
      .then(setData)
      .catch(() => {
        fetch("/dashboard.json")
          .then(r => r.json())
          .then(setData)
          .catch(() => {});
      });
  }, []);

  const d: DashboardData = data ?? {
    total_donations_cash: 0,
    total_donations_inkind: 0,
    total_expenses: 0,
    unutilized_balance: 0,
    generated_at: new Date().toISOString(),
    by_sub_system: {},
    recent_transactions: [],
  };

  const totalIn = d.total_donations_cash + d.total_donations_inkind;
  const maxSubSystem = Math.max(...Object.values(d.by_sub_system), 1);
  const subLabel = (key: string): string =>
    tx(SUB_SYSTEM_LABELS[key] ?? { en: key, hinglish: key, hi: key }, lang);
  const localeForLang = (l: Lang) => (l === "hi" ? "hi-IN" : "en-IN");

  const ctaCards = [
    {
      kind: "donate" as const,
      title: tx(C.donateTitle, lang),
      body: tx(C.donateBody, lang),
      btn: tx(C.donateBtn, lang),
    },
    {
      kind: "volunteer" as const,
      title: tx(C.volunteerTitle, lang),
      body: tx(C.volunteerBody, lang),
      btn: tx(C.volunteerBtn, lang),
    },
  ];

  return (
    <main className="bg-charcoal text-cream min-h-screen">

      {/* ── HEADER ── */}
      <section className="pt-32 pb-20 px-6 md:px-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }}
        />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-4xl relative"
        >
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-6">{tx(C.eyebrow, lang)}</p>
          <h1 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92] mb-6">
            {tx(C.h1a, lang)}<br />
            <em className="text-ochre">{tx(C.h1em, lang)}</em>
          </h1>
          <p className="font-sans text-xl text-cream/50 max-w-xl leading-relaxed">
            {tx(C.intro, lang)}
          </p>
        </motion.div>
      </section>

      {/* ── NEW: DONATE / VOLUNTEER BAND (trust ask first, proof below) ── */}
      <section className="px-6 md:px-16 py-20 border-t border-cream/8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-6">{tx(C.helpEyebrow, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-cream font-semibold leading-tight mb-5">
              {tx(C.helpTitleA, lang)}<em className="text-ochre">{tx(C.helpTitleEm, lang)}</em>{tx(C.helpTitleB, lang)}
            </h2>
            <p className="font-sans text-base text-cream/50 max-w-xl leading-relaxed">{tx(C.helpSub, lang)}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ctaCards.map((card, i) => (
              <motion.div
                key={card.kind}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                viewport={{ once: true }}
                className={`flex flex-col p-8 rounded-sm border ${card.kind === "donate" ? "border-ochre/25 bg-ochre/5" : "border-cream/15"}`}
              >
                <span className="font-heading text-4xl text-ochre/25 font-bold mb-4">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading text-2xl text-cream font-semibold mb-3">{card.title}</h3>
                <p className="font-sans text-sm text-cream/55 leading-relaxed mb-8 flex-1">{card.body}</p>
                {card.kind === "donate" ? (
                  // TODO: Rajat to supply donate link (UPI/Razorpay) — see DONATE_URL. Falls back to mailto.
                  <a
                    href={DONATE_URL}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
                  >
                    {card.btn}
                  </a>
                ) : (
                  <Link
                    href="/join"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-cream/25 text-cream/70 font-sans font-medium text-xs tracking-widest uppercase hover:border-cream/60 hover:text-cream transition-all duration-300 rounded-sm"
                  >
                    {card.btn}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          <p className="font-sans text-xs uppercase tracking-wider text-cream/40 mt-8 text-center">
            {tx(C.trustLink, lang)}
          </p>
        </div>
      </section>

      {/* ── STAT CARDS ── */}
      <section className="px-6 md:px-16 pb-16 border-t border-cream/8 pt-16">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">{tx(C.accountSoFar, lang)}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <StatCard label={tx(C.statCash, lang)} value={d.total_donations_cash} />
            <StatCard label={tx(C.statInkind, lang)} value={d.total_donations_inkind} />
            <StatCard label={tx(C.statSpent, lang)} value={d.total_expenses} />
            <StatCard label={tx(C.statUnused, lang)} value={d.unutilized_balance} sub={`${totalIn > 0 ? Math.round((d.unutilized_balance / totalIn) * 100) : 0}% ${tx(C.ofTotal, lang)}`} />
          </div>
        </div>
      </section>

      {/* ── SUB-SYSTEM BREAKDOWN ── */}
      {Object.keys(d.by_sub_system).length > 0 && (
        <section className="px-6 md:px-16 py-16 border-t border-cream/8">
          <div className="max-w-3xl mx-auto">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">{tx(C.whereWent, lang)}</p>
            <div className="space-y-5">
              {Object.entries(d.by_sub_system).map(([key, val], i) => (
                <motion.div
                  key={key}
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-sans text-sm text-cream/60">{subLabel(key)}</p>
                    <p className="font-sans text-sm text-cream/40">₹{val.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="h-px bg-cream/8 relative">
                    <motion.div
                      initial={reduce ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                      viewport={{ once: true }}
                      className="absolute top-0 left-0 h-[2px] bg-ochre origin-left"
                      style={{ width: `${(val / maxSubSystem) * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RECENT TRANSACTIONS ── */}
      <section className="px-6 md:px-16 py-16 border-t border-cream/8">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">{tx(C.recent, lang)}</p>
          {d.recent_transactions.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-sans text-cream/30 text-sm">
                {tx(C.emptyA, lang)}<br />
                {tx(C.emptyB, lang)}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-cream/8">
              {d.recent_transactions.slice(0, 5).map((txn, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className="py-4 grid grid-cols-2 md:grid-cols-5 gap-4"
                >
                  <p className="font-sans text-xs text-cream/40">{txn.date}</p>
                  <p className="font-sans text-xs text-cream/60">{txn.type}</p>
                  <p className="font-sans text-sm text-cream font-medium">₹{txn.amount.toLocaleString("en-IN")}</p>
                  <p className="font-sans text-xs text-ochre/70">{subLabel(txn.sub_system)}</p>
                  <p className="font-sans text-xs text-cream/40 md:col-span-1">{txn.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER NOTE ── */}
      <section className="px-6 md:px-16 py-12 border-t border-cream/8">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs text-cream/30 leading-relaxed">
            {tx(C.noteA, lang)}
            {d.generated_at
              ? new Date(d.generated_at).toLocaleDateString(localeForLang(lang), { day: "numeric", month: "long", year: "numeric" })
              : "—"}
            <br />
            {tx(C.noteB, lang)}
            <a href="mailto:aslidharmi@gmail.com" className="text-ochre/60 hover:text-ochre transition-colors">
              aslidharmi@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* ── PRINCIPLE BOX ── */}
      <section className="px-6 md:px-16 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 border border-ochre/20">
            <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-3">{tx(C.principleLabel, lang)}</p>
            <p className="font-sans text-base text-cream/50 leading-relaxed">
              {tx(C.principle, lang)}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-cream/8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-cream/30">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-cream/30">
          <Link href="/" className="hover:text-cream/60 transition-colors">{tx(C.footHome, lang)}</Link>
          <Link href="/join" className="hover:text-cream/60 transition-colors">{tx(C.footJoin, lang)}</Link>
          <a href="mailto:aslidharmi@gmail.com" className="hover:text-cream/60 transition-colors">Contact</a>
        </div>
      </footer>
    </main>
  );
}
