"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

function ParallaxSection({
  id, src, alt, eyebrow, number, title, titleItalic, body, children,
  dark = false,
}: {
  id?: string; src: string; alt: string; eyebrow: string; number: string;
  title: string; titleItalic?: string; body: string; children?: React.ReactNode; dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${dark ? "bg-charcoal" : "bg-cream"}`}>
      {/* Parallax image strip */}
      <div className="relative h-[70vh] overflow-hidden">
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
          <Image src={src} alt={alt} fill className="object-cover" />
          <div className={`absolute inset-0 ${dark ? "bg-charcoal/75" : "bg-charcoal/50"}`} />
        </motion.div>
        <div className="relative z-10 h-full flex items-end pb-16 px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre mb-4">{eyebrow}</p>
            <h2 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92]">
              <span className="font-sans text-ochre/60 text-2xl block mb-2">{number}</span>
              {title}
              {titleItalic && <em className="text-ochre italic block">{titleItalic}</em>}
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Content below image */}
      <div className="px-6 md:px-16 py-20 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className={`font-sans text-lg leading-relaxed mb-12 max-w-2xl ${dark ? "text-cream/65" : "text-charcoal/65"}`}
        >
          {body}
        </motion.p>
        {children}
      </div>
    </section>
  );
}

function Pill({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <span className={`inline-block px-4 py-1.5 font-sans text-xs uppercase tracking-wider rounded-sm mr-2 mb-2 ${
      dark ? "bg-ochre/15 text-ochre/80" : "bg-charcoal/8 text-charcoal/60"
    }`}>
      {text}
    </span>
  );
}

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

export default function KaamPage() {
  return (
    <main className="bg-cream text-charcoal">

      {/* ── PAGE INTRO ── */}
      <section className="pt-32 pb-20 px-6 md:px-16 bg-charcoal relative overflow-hidden">
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
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-6">Movement</p>
          <h1 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92] mb-8">
            Hamare Kaam —<br />
            <em className="text-ochre">4 Tools, 1 Mission</em>
          </h1>
          <p className="font-sans text-xl text-cream/55 max-w-2xl leading-relaxed">
            Asli Dharmi sirf bolne ka nahi, karne ka bhi platform hai. Har tool ek hi sutra se chal raha hai:
            insaan ko independent banana, dependent nahi.
          </p>
        </motion.div>

        {/* 4-tool nav pills */}
        <div className="flex flex-wrap gap-3 mt-16">
          {[
            { label: "Content Creation", href: "#content" },
            { label: "Women Empowerment", href: "#women" },
            { label: "Self-Sustainable Systems", href: "#systems" },
            { label: "Sangha & Community", href: "#sangha" },
          ].map((t) => (
            <a key={t.label} href={t.href}
              className="px-5 py-2.5 border border-cream/15 text-cream/55 font-sans text-xs uppercase tracking-wider hover:border-ochre/50 hover:text-ochre transition-all duration-300 rounded-sm">
              {t.label}
            </a>
          ))}
        </div>
      </section>

      {/* ── 01 CONTENT CREATION ── */}
      <ParallaxSection
        id="content"
        src="/images/about-rajat-bg.jpg"
        alt="Contemplative hills"
        eyebrow="Tool 01 · Active"
        number="01 /"
        title="Content Creation"
        titleItalic="Philosophy ko voice dena"
        body="Reels, essays, podcasts — philosophy ko accessible format mein rakhna. Sirf entertain karna nahi — sawaal puchhna. Gyani Tau sawaal karta hai, Saakshi jawab deti hai. Goal: log 'X chhod den' nahin — log khud sawaal puchhna seekhen."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Format", text: "Short Reels (Instagram + YouTube). Long-form essays (website). Podcast — future." },
            { label: "Characters", text: "Gyani Tau (Sawaal) — Danish Khan voice. Saakshi (Jawab) — Devanagari TTS, calm authority." },
            { label: "Topics", text: "Dharma vs Andhvishwas. Speciesism. Gender discrimination. Science + Spirituality. Self-sustainability." },
          ].map((item, i) => (
            <RevealBlock key={i} delay={i * 0.1}>
              <div className="p-6 border border-charcoal/10">
                <p className="font-sans text-xs uppercase tracking-wider text-charcoal/40 mb-3">{item.label}</p>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed">{item.text}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap">
          {["Dharma", "Andhvishwas", "Gender", "Speciesism", "Science + Spirituality", "Veganism"].map(t => <Pill key={t} text={t} />)}
        </div>
        <RevealBlock delay={0.2}>
          <div className="mt-8">
            <Link href="/content" className="inline-flex items-center gap-3 font-sans text-sm text-charcoal/60 hover:text-ochre transition-colors uppercase tracking-wider">
              Reels Dekho →
            </Link>
          </div>
        </RevealBlock>
      </ParallaxSection>

      {/* ── 02 WOMEN EMPOWERMENT ── */}
      <ParallaxSection
        id="women"
        src="/images/women-empowerment.jpg"
        alt="Rural women artisans working"
        eyebrow="Tool 02 · Planning Phase"
        number="02 /"
        title="Women Empowerment"
        titleItalic="Skill do, income do, aazaad karo"
        body="Gaon ki ladies ko skill dena aur phir market tak pohanchana. Low margin chalega — yeh principle hai, compromise nahi. Daan nahi — skill + income source. Layer 1: skill training (tailoring, food, handicrafts, digital). Layer 2: marketplace platform for skilled (rural + semi-urban + urban)."
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { label: "Layer 1 — Skill Provision", text: "Unskilled ke liye — Tailoring, food processing, handicrafts, digital basics, care services. Priority: rural women.", dark: true },
            { label: "Layer 2 — Platform for Skilled", text: "Skilled ke liye — discovery, showcase, order-routing, fair-margin fulfilment. Rural + semi-urban + urban.", dark: true },
          ].map((item, i) => (
            <RevealBlock key={i} delay={i * 0.15}>
              <div className="p-6 border border-cream/10">
                <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-3">{item.label}</p>
                <p className="font-sans text-sm text-cream/60 leading-relaxed">{item.text}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Rural Women First", "Anti-Charity", "Skill Pipeline", "Unskilled → Skilled → Platform → Income"].map(t => <Pill key={t} text={t} dark />)}
        </div>
        <RevealBlock delay={0.2}>
          <div className="mt-8 p-6 border border-ochre/20 max-w-xl">
            <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-2">Source</p>
            <p className="font-sans text-sm text-cream/50 leading-relaxed italic">
              &ldquo;Main chahta hun ki gaon-gaon, door-door kahin, gaon ki ladies ko ek source of income provide karun
              chahe uske liye mujhe kitna bhi low margin pe work karna pade.&rdquo; — Rajat, Manifesto §1.7
            </p>
          </div>
        </RevealBlock>
      </ParallaxSection>

      {/* ── 03 SELF-SUSTAINABLE SYSTEMS ── */}
      <section id="systems" className="bg-cream">
        {/* Hill Homestay */}
        <div className="relative h-[70vh] overflow-hidden">
          <Image src="/images/hill-homestay.jpg" alt="Nani ka Ghar, Jawar village, Pauri Garhwal" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/55" />
          <div className="relative z-10 h-full flex items-end pb-16 px-6 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre mb-4">Tool 03 · Anchor 01 · Phase 1 Build: 2028</p>
              <h2 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92]">
                <span className="font-sans text-ochre/60 text-2xl block mb-2">03A /</span>
                Hill Homestay —
                <em className="text-ochre italic block">Nani ka Ghar</em>
              </h2>
            </motion.div>
          </div>
        </div>
        <div className="px-6 md:px-16 py-20 max-w-5xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed mb-12 max-w-2xl">
              Jawar village, Pauri Garhwal — Kanchan ki nani ka ghar. Yeh sirf ek homestay nahi, ek 5-layer vision hai:
              Dream Home, Boutique Homestay, Village Regeneration, Nani ki Legacy, aur Conscious Vegan-First Living.
              Government pe dependence minimise, apna system build karo.
            </p>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
            {[
              { num: "L1", title: "Dream Home", body: "Pehle apna ghar, phir homestay. Home comfort drives every design decision." },
              { num: "L2", title: "Boutique Stay", body: "₹4,500–6,500/night. 4-6 rooms max. Picky about guests. No calendar pressure." },
              { num: "L3", title: "Village Regen.", body: "Memory Wall, elder stories, craft platform, health + education charity." },
              { num: "L4", title: "Nani ki Legacy", body: "Entry plaque, preserved chair, Nani ki Recipes book (60+ Garhwali dishes)." },
              { num: "L5", title: "Conscious Living", body: "Solar + wind, vegan-first kitchen, organic kitchen garden, no synthetic pesticides." },
            ].map((l, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="p-5 border border-charcoal/10 h-full">
                  <span className="font-heading text-3xl text-ochre/20 font-bold block mb-3">{l.num}</span>
                  <p className="font-sans text-xs font-medium text-charcoal uppercase tracking-wide mb-2">{l.title}</p>
                  <p className="font-sans text-xs text-charcoal/50 leading-relaxed">{l.body}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Jawar · Pauri Garhwal", "Off-Grid Solar", "Vegan-First Kitchen", "₹51–78L Phase 1", "2028 Build", "Women Caretakers Hired"].map(t => <Pill key={t} text={t} />)}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-charcoal/10 mx-6 md:mx-16" />

        {/* Panchmukhi Hub */}
        <div className="relative h-[70vh] overflow-hidden">
          <Image src="/images/panchmukhi-hub.jpg" alt="Panchmukhi Village Hub" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/60" />
          <div className="relative z-10 h-full flex items-end pb-16 px-6 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre mb-4">Tool 03 · Anchor 02 · Pilot: 2027</p>
              <h2 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92]">
                <span className="font-sans text-ochre/60 text-2xl block mb-2">03B /</span>
                Panchmukhi Hub —
                <em className="text-ochre italic block">5-in-1 Village Service</em>
              </h2>
            </motion.div>
          </div>
        </div>
        <div className="px-6 md:px-16 py-20 max-w-5xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed mb-12 max-w-2xl">
              Har ek pahari gaon mein — jahan government aur corporate services absent ya unreliable hain — ek physical hub.
              Operator: local woman (Women Empowerment Layer 1 se trained). Low margin lock — yeh principle hai, bug nahi.
            </p>
          </RevealBlock>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {[
              { mukh: "1", title: "Kirana", body: "Daily essentials, OTC medicines, hygiene — direct from Women Empowerment producers." },
              { mukh: "2", title: "Telemedicine", body: "Video consult with city doctors, elder vitals (BP/sugar/SpO2), prescription." },
              { mukh: "3", title: "Education", body: "Online classes for children, computer literacy, exam-prep, Khan Academy Hindi." },
              { mukh: "4", title: "Banking / CSC", body: "Cash withdrawal (AePS), Aadhaar, pension, PMJDY, bill payment, train tickets." },
              { mukh: "5", title: "Connectivity", body: "High-speed internet, Wi-Fi, courier pickup/drop, printing, STD-PCO for elders." },
            ].map((m, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="p-5 border border-charcoal/10 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 bg-ochre/20 text-ochre font-heading text-sm flex items-center justify-center rounded-sm font-bold">{m.mukh}</span>
                    <p className="font-sans text-xs font-medium text-charcoal uppercase tracking-wide">{m.title}</p>
                  </div>
                  <p className="font-sans text-xs text-charcoal/50 leading-relaxed">{m.body}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {["₹5.5–9.5L Phase 1", "2027 Pilot", "Woman Operator", "Anti-Grant-Dependence", "Secular Service"].map(t => <Pill key={t} text={t} />)}
          </div>
        </div>
      </section>

      {/* ── 04 SANGHA & COMMUNITY ── */}
      <ParallaxSection
        id="sangha"
        src="/images/sangha-community.jpg"
        alt="Elderly woman with SOS phone"
        eyebrow="Tool 04 · Flagship: Sangha App · 2027 MVP"
        number="04 /"
        title="Sangha App —"
        titleItalic="Akele mat rehna"
        body="Maa ko teen baar heart attack aaya. Pehle do baar unhone kisi ko bataya bhi nahi. Sangha App us silence ko todta hai — 1-tap SOS for elders, hyper-local community help feed, no algorithm, no ads, no surveillance. Utility pehle — philosophy baad mein."
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { title: "1-Tap SOS", body: "Elder SOS → 3 nearest family → 3 nearest trusted neighbours → Panchmukhi Hub healthcare coordinator → 108. Location + voice auto-shared. Daily check-in optional.", dark: true },
            { title: "Community Help Feed", body: "3 post types only: 'I need help' / 'I can give' / 'Community alert'. No likes, no shares-outside, no follower-count. Posts expire in 24-72 hrs.", dark: true },
            { title: "Service Directory", body: "Women Empowerment Layer 2 providers listed by skill. One-tap request. Honest reviews — no anonymous shaming.", dark: true },
            { title: "Credit Economy", body: "Helping a neighbour earns Asli Dharmi credits — redeemable at Hill Homestay stays or as stipend.", dark: true },
          ].map((item, i) => (
            <RevealBlock key={i} delay={i * 0.1}>
              <div className="p-6 border border-cream/10">
                <p className="font-sans text-xs font-medium text-ochre/70 uppercase tracking-wide mb-3">{item.title}</p>
                <p className="font-sans text-sm text-cream/55 leading-relaxed">{item.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap mb-10">
          {["Android First · Hindi First", "No Ads", "No Algorithm", "No Data Sale", "Phase 1 MVP: 2027–2028", "₹10–24L Phase 1"].map(t => <Pill key={t} text={t} dark />)}
        </div>
        <RevealBlock delay={0.2}>
          <div className="p-6 border border-ochre/20 max-w-xl">
            <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-2">Founding Pain</p>
            <p className="font-sans text-sm text-cream/50 leading-relaxed italic">
              &ldquo;Sangha App ka idea tha jo app bane, jisme sabhi ke liye, jo bade buzurg hain,
              unke liye SOS ka option ho.&rdquo; — Rajat, Manifesto §1.10
            </p>
          </div>
        </RevealBlock>
      </ParallaxSection>

      {/* ── CREDIT ECONOMY ── */}
      <section className="px-6 md:px-16 py-24 bg-cream border-t border-charcoal/10">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">Cross-Cutting Mechanism</p>
            <h2 className="font-heading text-4xl text-charcoal font-semibold mb-6">
              Asli Dharmi <em className="text-ochre">Credit Economy</em>
            </h2>
            <p className="font-sans text-lg text-charcoal/60 leading-relaxed mb-8 max-w-2xl">
              Ek unified mechanism jo sab 4 tools ko jodta hai. Volunteer karo kisi bhi sub-system mein — credits milenge.
              Credits redeem karo Hill Homestay stays mein, ya Panchmukhi Hub priority slots mein, ya training mein.
              Yeh charity nahi — yeh earned value hai.
            </p>
          </RevealBlock>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Earn at", text: "Any sub-system volunteer work" },
              { label: "Redeem at", text: "Hill Homestay · Panchmukhi Hub · Layer 1 Training" },
              { label: "Hard lock", text: "NEVER sold for money, NEVER crypto, NEVER gates safety" },
              { label: "Philosophy", text: "Dignity preserved — earned, not charity" },
            ].map((c, i) => (
              <RevealBlock key={i} delay={i * 0.1}>
                <div className="p-5 bg-charcoal/4 border border-charcoal/8">
                  <p className="font-sans text-xs uppercase tracking-wider text-ochre/70 mb-2">{c.label}</p>
                  <p className="font-sans text-sm text-charcoal/65 leading-relaxed">{c.text}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="px-6 md:px-16 py-20 bg-charcoal">
        <div className="max-w-2xl mx-auto text-center">
          <RevealBlock>
            <div className="w-px h-12 bg-ochre/40 mx-auto mb-10" />
            <h3 className="font-heading text-3xl text-cream font-semibold mb-4">
              Agar resonance ho — andar aao
            </h3>
            <p className="font-sans text-base text-cream/40 mb-8">
              Koi movement akele nahi banta.
            </p>
            <Link href="/join" className="inline-flex items-center gap-3 px-10 py-5 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm">
              Movement Mein Shaamil Ho →
            </Link>
          </RevealBlock>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-charcoal/10 bg-cream flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-charcoal/40">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-charcoal/40">
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">Instagram</a>
          <Link href="/philosophy" className="hover:text-charcoal transition-colors">Philosophy</Link>
          <Link href="/about" className="hover:text-charcoal transition-colors">About</Link>
        </div>
      </footer>
    </main>
  );
}
