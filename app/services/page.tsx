"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLang, tx } from "@/lib/i18n";
import { whatsappHref, WHATSAPP_MAILTO_FALLBACK } from "@/lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Page copy (trilingual) — /services overview ───────────────────────────
// Services & Bundles spec 2026-09-02. Hard rules: no founder name, no
// geography, no fabricated proof, no pricing, WhatsApp-only CTA.
const C = {
  heroEyebrow: { en: "Piece of Peace", hinglish: "Piece of Peace", hi: "Piece of Peace" },
  heroTitle: { en: "A", hinglish: "Ek", hi: "शांति का एक" },
  heroEm: { en: "Piece", hinglish: "Piece", hi: "टुकड़ा" },
  heroTail: { en: "of Peace", hinglish: "of Peace", hi: "" },
  heroSub: { en: "Peace in Privacy.", hinglish: "Peace in Privacy.", hi: "गोपनीयता में शांति।" },

  bucketsLabel: { en: "What We Do", hinglish: "Hum Kya Karte Hain", hi: "हम क्या करते हैं" },
  bucketsTitle: { en: "Three Ways We Help", hinglish: "Teen Tareeke Se Madad", hi: "मदद के तीन तरीक़े" },

  buckets: [
    {
      num: "01",
      title: { en: "Event Management", hinglish: "Event Management", hi: "इवेंट मैनेजमेंट" },
      items: {
        en: "Shaadi · Birthday · Griha Pravesh · Nayi Gaadi · Antim Vidai",
        hinglish: "Shaadi · Birthday · Griha Pravesh · Nayi Gaadi · Antim Vidai",
        hi: "शादी · बर्थडे · गृह प्रवेश · नई गाड़ी · अंतिम विदाई",
      },
      desc: {
        en: "Every life moment, one team, start to finish.",
        hinglish: "Har zindagi ke pal, ek team, shuru se aakhir tak.",
        hi: "जीवन का हर पल, एक टीम, शुरू से अंत तक।",
      },
      linkable: true,
      href: "/services/event-management",
    },
    {
      num: "02",
      title: { en: "Technical Services", hinglish: "Technical Services", hi: "तकनीकी सेवाएँ" },
      items: {
        en: "Webpage/Social Media · 3D Design · Product Shoot · Big Asset Recording",
        hinglish: "Webpage/Social Media · 3D Design · Product Shoot · Big Asset Recording",
        hi: "वेबपेज/सोशल मीडिया · 3D डिज़ाइन · प्रोडक्ट शूट · बिग एसेट रिकॉर्डिंग",
      },
      desc: {
        en: "The digital work that makes the day easier to plan and easier to remember.",
        hinglish: "Digital kaam jo din ko plan karna aur yaad rakhna dono aasan banata hai.",
        hi: "डिजिटल काम जो दिन को योजना बनाना और याद रखना दोनों आसान बनाता है।",
      },
      linkable: false,
    },
    {
      num: "03",
      title: { en: "Arts & Customisation", hinglish: "Arts & Customisation", hi: "कला और अनुकूलन" },
      items: {
        en: "Craft & Gifting · Tailoring · Makeover · Mehndi · Digital Cards",
        hinglish: "Craft & Gifting · Tailoring · Makeover · Mehndi · Digital Cards",
        hi: "क्राफ़्ट और गिफ़्टिंग · सिलाई · मेकओवर · मेहंदी · डिजिटल कार्ड्स",
      },
      desc: {
        en: "Handmade craft, tailoring, and personal styling — made by skilled hands.",
        hinglish: "Haath se bana craft, tailoring, aur personal styling — skilled haathon se.",
        hi: "हस्तनिर्मित शिल्प, सिलाई, और व्यक्तिगत स्टाइलिंग — कुशल हाथों से।",
      },
      linkable: false,
    },
  ],

  seeEventMgmt: { en: "See Event Management →", hinglish: "Event Management Dekho →", hi: "इवेंट मैनेजमेंट देखें →" },

  ctaHeading: { en: "Let's talk on WhatsApp", hinglish: "WhatsApp Par Baat Karein", hi: "व्हाट्सऐप पर बात करें" },
  ctaSub: { en: "One conversation. One person. No forms.", hinglish: "Ek baatcheet. Ek insaan. Koi form nahi.", hi: "एक बातचीत। एक व्यक्ति। कोई फ़ॉर्म नहीं।" },
  ctaBtn: { en: "Message Us →", hinglish: "Message Karo →", hi: "संदेश भेजें →" },
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

export default function ServicesPage() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const waLink = whatsappHref("Hi! I'd like to know more about your services.");

  return (
    <main className="bg-cream text-charcoal">

      {/* ── (0) HERO — "Piece of Peace" brand promise ── */}
      <section className="pt-32 pb-20 px-6 md:px-16 border-b border-charcoal/10">
        <div className="max-w-4xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-6">{tx(C.heroEyebrow, lang)}</p>
            <h1 className="font-heading text-5xl md:text-7xl text-charcoal font-semibold leading-[0.92] mb-8">
              {tx(C.heroTitle, lang)} <em className="text-ochre">{tx(C.heroEm, lang)}</em> {tx(C.heroTail, lang)}
            </h1>
            <p className="font-sans text-lg text-charcoal/55 max-w-2xl leading-relaxed">
              {tx(C.heroSub, lang)}
            </p>
            <div className="w-px h-16 bg-ochre/40 mt-12" />
          </motion.div>
        </div>
      </section>

      {/* ── (1) THREE SERVICE BUCKETS ── */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-4">{tx(C.bucketsLabel, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-16 leading-tight">
              {tx(C.bucketsTitle, lang)}
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {C.buckets.map((b, i) => {
              const cardBody = (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-3xl text-ochre/20 group-hover:text-ochre/40 font-bold transition-colors">
                      {b.num}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl text-charcoal font-semibold mb-3 leading-snug group-hover:text-ochre transition-colors duration-300">
                    {tx(b.title, lang)}
                  </h3>
                  <p className="font-sans text-sm text-ochre/70 leading-relaxed mb-4">{tx(b.items, lang)}</p>
                  <p className="font-sans text-sm text-charcoal/55 leading-relaxed mb-6 flex-1">{tx(b.desc, lang)}</p>
                  {b.linkable && (
                    <span className="font-sans text-xs uppercase tracking-wider text-charcoal/40 group-hover:text-ochre transition-colors">
                      {tx(C.seeEventMgmt, lang)}
                    </span>
                  )}
                </>
              );
              return (
                <motion.div
                  key={b.num}
                  initial={reduce ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {b.linkable ? (
                    <Link
                      href={b.href!}
                      className="group flex flex-col h-full p-8 border border-charcoal/10 hover:border-ochre/40 transition-colors duration-300 min-h-[210px]"
                    >
                      {cardBody}
                    </Link>
                  ) : (
                    <div className="group flex flex-col h-full p-8 border border-charcoal/10 cursor-default min-h-[210px]">
                      {cardBody}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* PHASE 2 — after first events: testimonials / portfolio grid / event count. DO NOT populate with placeholder content. */}
        </div>
      </section>

      {/* ── (3) WHATSAPP CTA ── */}
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
              {tx(C.ctaBtn, lang)}
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
