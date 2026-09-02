"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLang, tx } from "@/lib/i18n";
import { whatsappHref, WHATSAPP_MAILTO_FALLBACK } from "@/lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Page copy (trilingual) — /services/event-management ──────────────────
// Services & Bundles spec 2026-09-02 §5. Hard rules: no founder name, no
// geography, no fabricated proof, no pricing, WhatsApp-only CTA.
// DEVIATION FROM SPEC §5a (Rajat's ruling, post-preview): Antim Vidai is now
// the 5th card INSIDE C.bundles / the grid below — NOT a standalone section.
// Rajat's note: he wants it in the row, not exiled; keep it quieter than the
// other four instead (muted:true → no ochre, no hover, no numeral, no
// entrance animation — renders at full opacity straight from server HTML).
// Do NOT "restore" the standalone section; that was the previous design,
// superseded here.
const C = {
  heroEyebrow: { en: "Event Management", hinglish: "Event Management", hi: "इवेंट मैनेजमेंट" },
  heroTitle: { en: "One Team, Every", hinglish: "Ek Team, Har", hi: "एक टीम, हर" },
  heroEm: { en: "Moment", hinglish: "Pal", hi: "पल" },
  heroIntro: {
    en: "Shaadi, Birthday, Griha Pravesh, Nayi Gaadi, Antim Vidai — every life moment handled by one team, start to finish.",
    hinglish: "Shaadi, Birthday, Griha Pravesh, Nayi Gaadi, Antim Vidai — zindagi ka har pal ek team sambhalti hai, shuru se aakhir tak.",
    hi: "शादी, बर्थडे, गृह प्रवेश, नई गाड़ी, अंतिम विदाई — जीवन का हर पल एक टीम संभालती है, शुरू से अंत तक।",
  },

  bundlesLabel: { en: "The Bundles", hinglish: "Bundles", hi: "बंडल्स" },
  bundlesTitle: { en: "Five Moments We Cover", hinglish: "Paanch Pal Jo Hum Sambhalte Hain", hi: "पाँच पल जो हम संभालते हैं" },

  bundles: [
    {
      title: { en: "Shaadi", hinglish: "Shaadi", hi: "शादी" },
      items: {
        en: "Card + digital invite, decor, food, mehndi, makeover, tailoring, photo + reels, transport, shopping support, guest coordination, event captain, 3D stage preview",
        hinglish: "Card + digital invite, decor, khaana, mehndi, makeover, tailoring, photo + reels, transport, shopping mein saath, mehmaan-vyavastha, event captain, 3D stage preview",
        hi: "कार्ड + डिजिटल आमंत्रण, सजावट, खाना, मेहंदी, मेकओवर, सिलाई, फ़ोटो + रील्स, परिवहन, ख़रीदारी में साथ, मेहमान-व्यवस्था, इवेंट कैप्टन, 3D स्टेज प्रीव्यू",
      },
      size: "large" as const,
      muted: false as const,
    },
    {
      title: { en: "Birthday", hinglish: "Birthday", hi: "बर्थडे" },
      items: {
        en: "Decor, food, cards, photo/reels, craft, 3D theme",
        hinglish: "Decor, khaana, cards, photo/reels, craft, 3D theme",
        hi: "सजावट, खाना, कार्ड्स, फ़ोटो/रील्स, क्राफ़्ट, 3D थीम",
      },
      size: "standard" as const,
      muted: false as const,
    },
    {
      title: { en: "Griha Pravesh", hinglish: "Griha Pravesh", hi: "गृह प्रवेश" },
      items: {
        en: "Decor, food, photo, transport, Big Asset Recording",
        hinglish: "Decor, khaana, photo, transport, Big Asset Recording",
        hi: "सजावट, खाना, फ़ोटो, परिवहन, बिग एसेट रिकॉर्डिंग",
      },
      size: "standard" as const,
      muted: false as const,
    },
    {
      title: { en: "Nayi Gaadi", hinglish: "Nayi Gaadi", hi: "नई गाड़ी" },
      items: {
        en: "Photo/reels, decor, Big Asset Recording",
        hinglish: "Photo/reels, decor, Big Asset Recording",
        hi: "फ़ोटो/रील्स, सजावट, बिग एसेट रिकॉर्डिंग",
      },
      size: "standard" as const,
      muted: false as const,
    },
    // Antim Vidai — 5th card, deliberately muted (see deviation note above).
    // title/items reuse the approved antimEyebrow/antimBody copy below verbatim.
    {
      title: { en: "Last Farewell", hinglish: "Antim Vidai", hi: "अंतिम विदाई" },
      items: {
        en: "For the last farewell. Transport, rituals, paperwork, and someone standing beside your family when it is hardest to stand alone.",
        hinglish: "Antim vidai ke waqt. Transport, riti-rivaaj, kaagzi kaam, aur parivaar ke saath khade rehna — jab akela khada hona sabse mushkil hota hai.",
        hi: "अंतिम विदाई के समय। परिवहन, रीति-रिवाज, काग़ज़ी काम, और आपके परिवार के साथ खड़े रहना — जब अकेला खड़ा होना सबसे मुश्किल होता है।",
      },
      size: "standard" as const,
      muted: true as const,
    },
  ],

  coverageLabel: { en: "Everything We Handle", hinglish: "Hum Kya-Kya Sambhalte Hain", hi: "हम क्या-क्या संभालते हैं" },
  coverageTitle: { en: "Start to End Coverage", hinglish: "Shuru Se Aakhir Tak", hi: "शुरू से अंत तक" },
  coverageItems: [
    { en: "Invitation + digital card", hinglish: "Card + digital invite", hi: "आमंत्रण + डिजिटल कार्ड" },
    { en: "Decor", hinglish: "Decor", hi: "सजावट" },
    { en: "Food", hinglish: "Khaana", hi: "खाना" },
    { en: "Mehndi", hinglish: "Mehndi", hi: "मेहंदी" },
    { en: "Makeover", hinglish: "Makeover", hi: "मेकओवर" },
    { en: "Tailoring", hinglish: "Tailoring", hi: "सिलाई" },
    { en: "Photo + video", hinglish: "Photo + video", hi: "फ़ोटो + वीडियो" },
    { en: "Transport", hinglish: "Transport", hi: "परिवहन" },
    { en: "Shopping support", hinglish: "Shopping mein saath", hi: "ख़रीदारी में साथ" },
    { en: "Day-of coordination", hinglish: "Event ke din ka intezaam", hi: "दिन-भर की व्यवस्था" },
  ],

  mechanicsLabel: { en: "Peace of Mind", hinglish: "Peace of Mind", hi: "मन की शांति" },
  mechanicsTitle: { en: "Why It Feels Different", hinglish: "Kyun Yeh Alag Lagta Hai", hi: "क्यों यह अलग लगता है" },
  mechanics: [
    {
      label: { en: "One Name, One Number", hinglish: "Ek Naam, Ek Number", hi: "एक नाम, एक नंबर" },
      body: { en: "You will never need to talk to a vendor yourself.", hinglish: "Aapko kabhi khud kisi vendor se baat nahi karni padegi.", hi: "आपको कभी ख़ुद किसी वेंडर से बात नहीं करनी पड़ेगी।" },
    },
    {
      label: { en: "Planned Before It Breaks", hinglish: "Pehle Se Socha Hua Intezaam", hi: "टूटने से पहले तय" },
      body: { en: "What could go wrong is already answered, before the day arrives.", hinglish: "Jo galat ho sakta hai, uska jawaab din aane se pehle hi taiyaar hai.", hi: "जो ग़लत हो सकता है, उसका जवाब दिन आने से पहले ही तैयार है।" },
    },
    {
      label: { en: "Reels the Same Night", hinglish: "Usi Raat Milne Wali Reels", hi: "उसी रात मिलने वाली रील्स" },
      body: { en: "Your story is ready to post before the night is over.", hinglish: "Raat khatam hone se pehle aapki story post karne ke liye taiyaar hai.", hi: "रात ख़त्म होने से पहले आपकी कहानी पोस्ट करने के लिए तैयार है।" },
    },
  ],

  ctaHeading: { en: "Talk to Us About Your Event", hinglish: "Apne Event Ke Baare Mein Baat Karein", hi: "अपने इवेंट के बारे में बात करें" },
  ctaSub: { en: "One conversation. One person. No forms.", hinglish: "Ek baatcheet. Ek insaan. Koi form nahi.", hi: "एक बातचीत। एक व्यक्ति। कोई फ़ॉर्म नहीं।" },
  ctaBtn: { en: "Message Us →", hinglish: "Message Karo →", hi: "संदेश भेजें →" },
  ctaBtnMail: { en: "Email Us →", hinglish: "Email Karo →", hi: "ईमेल भेजें →" },
} as const;

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

export default function EventManagementClient() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const waLink = whatsappHref("Hi! I'd like to talk about our event.");

  return (
    <main className="bg-cream text-charcoal">

      {/* ── (0) HERO ── */}
      <section className="pt-32 pb-20 px-6 md:px-16 border-b border-charcoal/10">
        <div className="max-w-4xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-6">{tx(C.heroEyebrow, lang)}</p>
            <h1 className="font-heading text-5xl md:text-7xl text-charcoal font-semibold leading-[0.92] mb-8">
              {tx(C.heroTitle, lang)} <em className="text-ochre">{tx(C.heroEm, lang)}</em>
            </h1>
            <p className="font-sans text-lg text-charcoal/55 max-w-2xl leading-relaxed">
              {tx(C.heroIntro, lang)}
            </p>
            <div className="w-px h-16 bg-ochre/40 mt-12" />
          </motion.div>
        </div>
      </section>

      {/* ── (1) FIVE LIFE-MOMENT BUNDLE CARDS — all 5 moments in the grid; Shaadi spans 2 cols (6 col-units / md:grid-cols-3 = exactly 2 rows). Antim Vidai is the 5th card, deliberately muted (see deviation note in C above) — no ochre, no hover, no numeral, no entrance animation, full opacity from server HTML. ── */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-4">{tx(C.bundlesLabel, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-16 leading-tight">
              {tx(C.bundlesTitle, lang)}
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {C.bundles.map((bnd, i) =>
              bnd.muted ? (
                // Antim Vidai — no motion.div wrapper at all (no initial/whileInView),
                // so this card renders at opacity:1 straight from the server HTML.
                // No ochre, no hover-border, no numeral — quieter than its neighbours.
                <div
                  key={bnd.title.en}
                  className="flex flex-col justify-center h-full p-8 border border-charcoal/10 bg-charcoal/5 min-h-[210px]"
                >
                  {/* Contrast fix 2026-09-02: text-charcoal/50 measured 2.84:1 on this bg-charcoal/5
                      surface (WCAG AA needs 4.5:1 for small/uppercase/letter-spaced text).
                      text-charcoal/70 measures 4.86:1 here — verified via relative-luminance calc,
                      not eyeballed. Still no ochre, still the muted/no-hover/no-motion treatment. */}
                  <p className="font-sans text-xs uppercase tracking-wide text-charcoal/70 mb-4">
                    {tx(bnd.title, lang)}
                  </p>
                  <p className="font-sans text-base text-charcoal/70 leading-loose">
                    {tx(bnd.items, lang)}
                  </p>
                </div>
              ) : (
                <motion.div
                  key={bnd.title.en}
                  initial={reduce ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  viewport={{ once: true, margin: "-40px" }}
                  className={bnd.size === "large" ? "md:col-span-2" : ""}
                >
                  <div className="flex flex-col h-full p-8 border border-charcoal/10 hover:border-ochre/20 transition-colors duration-300 min-h-[210px]">
                    <h3 className="font-heading text-2xl text-charcoal font-semibold mb-4 leading-snug">
                      {tx(bnd.title, lang)}
                    </h3>
                    <p className="font-sans text-sm text-charcoal/55 leading-relaxed">{tx(bnd.items, lang)}</p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── (2) "HUM KYA-KYA SAMBHALTE HAIN" — start-to-end coverage band (dark) ── */}
      <section className="px-6 md:px-16 py-24 bg-charcoal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }}
        />
        <div className="max-w-4xl mx-auto relative">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-4">{tx(C.coverageLabel, lang)}</p>
            <h2 className="font-heading text-3xl md:text-4xl text-cream font-semibold mb-12 leading-tight">
              {tx(C.coverageTitle, lang)}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
              {C.coverageItems.map((item, i) => (
                <p key={i} className="font-sans text-sm text-cream/70 leading-relaxed flex items-baseline gap-2">
                  <span className="text-ochre/60">·</span>
                  {tx(item, lang)}
                </p>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── (3) THREE PEACE-OF-MIND MECHANICS ── */}
      <section className="px-6 md:px-16 py-32">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-4 text-center">
              {tx(C.mechanicsLabel, lang)}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-16 text-center leading-tight">
              {tx(C.mechanicsTitle, lang)}
            </h2>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-charcoal/10">
            {C.mechanics.map((m, i) => (
              <motion.div
                key={m.label.en}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
                viewport={{ once: true, margin: "-60px" }}
                className="px-0 md:px-12 py-10 md:py-0 first:pl-0 last:pr-0"
              >
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-4 leading-snug">
                  {tx(m.label, lang)}
                </h3>
                <p className="font-sans text-base text-charcoal/55 leading-relaxed">{tx(m.body, lang)}</p>
              </motion.div>
            ))}
          </div>

          {/* PHASE 2 — after first events: testimonials / portfolio grid / event count. DO NOT populate with placeholder content. */}
        </div>
      </section>

      {/* ── (5) WHATSAPP CTA ── */}
      <section className="px-6 md:px-16 py-32 bg-cream border-t border-charcoal/10">
        <div className="max-w-2xl mx-auto text-center">
          <RevealBlock>
            <div className="w-px h-16 bg-ochre/40 mx-auto mb-12" />
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-6 leading-tight">
              {tx(C.ctaHeading, lang)}
            </h2>
            <p className="font-sans text-base text-charcoal/50 mb-12 leading-relaxed">
              {tx(C.ctaSub, lang)}
            </p>
            <a
              href={waLink ?? WHATSAPP_MAILTO_FALLBACK}
              target={waLink ? "_blank" : undefined}
              rel={waLink ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-ochre text-cream font-sans font-medium text-sm tracking-widest uppercase hover:bg-charcoal transition-colors duration-300 rounded-sm"
            >
              {tx(waLink ? C.ctaBtn : C.ctaBtnMail, lang)}
            </a>
          </RevealBlock>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-charcoal/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-charcoal/40">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-charcoal/40">
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">Instagram</a>
          <Link href="/hamari-soch" className="hover:text-charcoal transition-colors">{tx({ en: "Our Soch", hinglish: "Hamari Soch", hi: "हमारी सोच" }, lang)}</Link>
          <a href="mailto:aslidharmi@gmail.com" className="hover:text-charcoal transition-colors">{tx({ en: "Contact", hinglish: "Contact", hi: "संपर्क" }, lang)}</a>
        </div>
      </footer>
    </main>
  );
}
