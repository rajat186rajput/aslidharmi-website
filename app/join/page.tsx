"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

function RevealBlock({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const WHAT_YOU_GET = [
  {
    num: "01",
    title: "Sub-system mein kaam karne ka mauka",
    body: "Women Empowerment, Sangha, Hill Homestay, Content — apni skill ke hisaab se choose karo. Real work, real impact.",
  },
  {
    num: "02",
    title: "Asli Dharmi Credit Economy",
    body: "Volunteer kaam karo, credits kamao. Credits redeem karo Hill Homestay stays, skill training modules, ya priority platform slots pe.",
  },
  {
    num: "03",
    title: "Co-traveler community",
    body: "Ek jagah jahan sawaal welcome hain — guru-disciple nahi, co-travelers hain. Koi hierarchy nahi, koi rank nahi.",
  },
  {
    num: "04",
    title: "Rajat se direct feedback",
    body: "Koi bhi genuine project idea pe Rajat khud padhe aur respond kare. Koi middleman nahi, koi auto-reply nahi.",
  },
];

const CREDIT_EARN = [
  { system: "Women Empowerment", work: "Skill training dena, fulfilment support", rate: "0.7 – 1 credit/hr" },
  { system: "Panchmukhi Village Hub", work: "Rotational volunteer, audit visits", rate: "1.2 credits/hr" },
  { system: "Sangha App", work: "Verified neighbour help (confirmed)", rate: "0.3 – 2 credits/help" },
  { system: "Content Creation", work: "Filming, editing, research", rate: "0.5 – 1 credit/hr" },
  { system: "Hill Homestay", work: "On-site help — garden, kitchen, hosting", rate: "0.8 credit/hr" },
];

const CREDIT_SPEND = [
  { what: "Hill Homestay stay (off-peak)", cost: "~10 credits/night" },
  { what: "Hill Homestay stay (peak, private)", cost: "~25 credits/night" },
  { what: "Skill training module (student)", cost: "5 credits/10-hr module" },
  { what: "Telemedicine priority slot", cost: "2 – 3 credits" },
  { what: "Small cash stipend", cost: "1 credit = ₹50–100" },
];

export default function JoinPage() {
  return (
    <main className="bg-cream text-charcoal min-h-screen">

      {/* ── DARK HERO ── */}
      <section className="bg-charcoal min-h-[85vh] flex items-end relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }}
        />
        <div className="px-6 md:px-16 pb-20 pt-40 max-w-5xl relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-8">Movement · Participation</p>
            <h1 className="font-heading text-5xl md:text-8xl text-cream font-semibold leading-[0.88] mb-8">
              Is Movement Ka<br />
              <em className="text-ochre">Hissa Bano</em>
            </h1>
            <p className="font-sans text-xl text-cream/55 max-w-2xl leading-relaxed mb-10">
              Asli Dharmi sirf ek IG page nahi hai. Yeh ek movement hai jisme real kaam ho raha hai —
              women empowerment, sustainable living, community building. Agar aap resonance feel karte hain
              aur genuinely contribute karna chahte hain — toh andar aao.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#form"
                className="inline-flex items-center gap-3 px-10 py-5 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
              >
                Apna Parichay Do →
              </a>
              <a
                href="#what-you-get"
                className="inline-flex items-center gap-3 px-10 py-5 border border-cream/20 text-cream/60 font-sans font-medium text-xs tracking-widest uppercase hover:border-cream/50 transition-all duration-300 rounded-sm"
              >
                Pehle Samjho ↓
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section id="what-you-get" className="px-6 md:px-16 py-24 border-b border-charcoal/8">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-4">Participant Hone Ka Matlab</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold leading-[0.95] mb-16 max-w-xl">
              Sirf follower nahi —<br /><em className="text-ochre">participant bano.</em>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHAT_YOU_GET.map((item, i) => (
              <RevealBlock key={item.num} delay={i * 0.08}>
                <div className="p-8 border border-charcoal/10 h-full">
                  <span className="font-heading text-5xl text-ochre/15 font-bold leading-none block mb-4">{item.num}</span>
                  <h3 className="font-heading text-xl text-charcoal font-semibold mb-3 leading-snug">{item.title}</h3>
                  <p className="font-sans text-sm text-charcoal/60 leading-relaxed">{item.body}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDIT ECONOMY ── */}
      <section className="bg-charcoal px-6 md:px-16 py-24">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-4">Cross-Cutting Mechanism</p>
            <h2 className="font-heading text-4xl md:text-5xl text-cream font-semibold leading-[0.95] mb-6 max-w-2xl">
              Asli Dharmi<br /><em className="text-ochre">Credit Economy</em>
            </h2>
            <p className="font-sans text-lg text-cream/50 max-w-2xl leading-relaxed mb-16">
              Volunteer karo, credits kamao. Credits real services aur stays pe redeem hote hain.
              Yeh charity nahi — yeh earned exchange hai. Dignity intact.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Earn */}
            <RevealBlock>
              <p className="font-sans text-xs uppercase tracking-widest text-ochre mb-6">Credits Kaise Kamao</p>
              <div className="space-y-4">
                {CREDIT_EARN.map(e => (
                  <div key={e.system} className="flex gap-4 pb-4 border-b border-cream/8">
                    <div className="flex-1">
                      <p className="font-sans text-sm text-cream/80 font-medium">{e.system}</p>
                      <p className="font-sans text-xs text-cream/40 mt-0.5">{e.work}</p>
                    </div>
                    <span className="font-sans text-xs text-ochre/80 shrink-0 pt-0.5">{e.rate}</span>
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* Spend */}
            <RevealBlock delay={0.1}>
              <p className="font-sans text-xs uppercase tracking-widest text-ochre mb-6">Credits Kahan Spend Karo</p>
              <div className="space-y-4">
                {CREDIT_SPEND.map(s => (
                  <div key={s.what} className="flex gap-4 pb-4 border-b border-cream/8">
                    <div className="flex-1">
                      <p className="font-sans text-sm text-cream/80">{s.what}</p>
                    </div>
                    <span className="font-sans text-xs text-ochre/80 shrink-0 pt-0.5">{s.cost}</span>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>

          {/* Hard locks */}
          <RevealBlock className="mt-12">
            <div className="p-8 border border-ochre/20">
              <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-3">Hard Locks — Kya Nahi Hoga</p>
              <p className="font-sans text-sm text-cream/45 leading-relaxed">
                Credits bech nahi sakte (money ke liye). Trade nahi ho sakta strangers ke beech. Cryptocurrency nahi banega.
                Safety features (SOS) pe kabhi credit nahi lagega. Status nahi milega credits se — sirf services milegi.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section id="form" className="px-6 md:px-16 py-24">
        <div className="max-w-3xl mx-auto">
          <RevealBlock>
            <div className="w-px h-12 bg-ochre/40 mb-10" />
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-4 leading-[0.95]">
              Apna Parichay Do
            </h2>
            <p className="font-sans text-lg text-charcoal/55 mb-10 leading-relaxed max-w-lg">
              Neeche form bharo — honestly. Koi judgemental nahi hai yahan.
              Rajat khud padhega aur respond karega. Koi auto-reply nahi.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="w-full overflow-hidden border border-charcoal/10">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSd3zMprVIcOyF0njYE8c0lQWJrRQih6SvnUnF4Wlruxb4-rLw/viewform?embedded=true"
                width="100%"
                height="900"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="bg-cream block"
              >
                Form load ho raha hai…
              </iframe>
            </div>
            <p className="font-sans text-xs text-charcoal/35 mt-5 leading-relaxed">
              Aapki jaankari sirf Asli Dharmi movement ke andar use hogi.
              Kisi bhi third party ko share nahi hogi. Koi commercial use nahi.
              Hum aapse WhatsApp ya phone pe seedha contact karenge — koi spam nahi.
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ── CLOSING QUOTE ── */}
      <section className="px-6 md:px-16 py-20 bg-charcoal border-t border-cream/8">
        <div className="max-w-3xl mx-auto">
          <RevealBlock>
            <span className="font-heading text-7xl text-ochre/20 leading-none block mb-4">&ldquo;</span>
            <blockquote className="font-heading text-2xl md:text-3xl text-cream font-semibold leading-snug mb-6">
              Koi movement akele nahi banta.
              Agar resonance ho — andar aao.
            </blockquote>
            <p className="font-sans text-xs text-cream/30">— Asli Dharmi Manifesto</p>
          </RevealBlock>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-charcoal/8 bg-charcoal flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-cream/30">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-cream/30">
          <Link href="/" className="hover:text-cream/60 transition-colors">Home</Link>
          <Link href="/philosophy" className="hover:text-cream/60 transition-colors">Hamaari Soch</Link>
          <Link href="/kaam" className="hover:text-cream/60 transition-colors">Hamare Kaam</Link>
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-cream/60 transition-colors">Instagram</a>
        </div>
      </footer>
    </main>
  );
}
