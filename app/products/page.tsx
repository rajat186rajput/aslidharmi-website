"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLang, tx } from "@/lib/i18n";
import { FormEmbed } from "@/components/FormEmbed";

const EASE = [0.22, 1, 0.36, 1] as const;

// TODO: Rajat to supply the real Google Form URL for the Products waitlist
// (use the dedicated `aslidharmi` Google account — never personal Gmail).
// Must be the `?embedded=true` form URL. 1-line swap when ready.
const PRODUCTS_WAITLIST_FORM_URL =
  "https://docs.google.com/forms/d/e/PLACEHOLDER_PRODUCTS_WAITLIST/viewform?embedded=true";

const C = {
  heroEyebrow: { en: "Marketplace · Worldwide", hinglish: "Marketplace · Worldwide", hi: "मार्केटप्लेस · दुनिया भर" },
  heroTitle: { en: "A marketplace,", hinglish: "Ek marketplace,", hi: "एक मार्केटप्लेस," },
  heroEm: { en: "worldwide", hinglish: "poori duniya", hi: "पूरी दुनिया" },
  heroIntro: {
    en: "Buy a product or service made by skilled hands — from anywhere, to anywhere. Fair margins, by principle, not as a favour.",
    hinglish: "Skilled haathon se bana product ya service khareedo — kahin se bhi, kahin bhi. Fair margin, principle se, ehsaan se nahi.",
    hi: "कुशल हाथों से बना उत्पाद या सेवा ख़रीदो — कहीं से भी, कहीं भी। उचित मार्जिन, सिद्धांत से, एहसान से नहीं।",
  },

  valueLabel: { en: "Why This Marketplace", hinglish: "Yeh Marketplace Kyun", hi: "यह मार्केटप्लेस क्यों" },
  valueItems: [
    {
      title: { en: "Fair margin, by principle", hinglish: "Fair Margin, Principle Se", hi: "उचित मार्जिन, सिद्धांत से" },
      body: {
        en: "Low margins are locked in — that's a value, not a compromise. The maker keeps the dignity of a real income.",
        hinglish: "Low margin lock hai — yeh value hai, compromise nahi. Banane wale ke paas ek asli income ki dignity rehti hai.",
        hi: "कम मार्जिन तय है — यह मूल्य है, समझौता नहीं। बनाने वाले के पास एक असली आय की गरिमा रहती है।",
      },
    },
    {
      title: { en: "Made by skilled hands", hinglish: "Skilled Haathon Se Bana", hi: "कुशल हाथों से बना" },
      body: {
        en: "Every product comes from a trained maker — many of them rural women building an independent income.",
        hinglish: "Har product ek trained maker se aata hai — inme se kai rural women jo apni independent income bana rahi hain.",
        hi: "हर उत्पाद एक प्रशिक्षित निर्माता से आता है — इनमें से कई ग्रामीण महिलाएँ जो अपनी स्वतंत्र आय बना रही हैं।",
      },
    },
    {
      title: { en: "Buy from anywhere", hinglish: "Kahin Se Bhi Khareedo", hi: "कहीं से भी ख़रीदो" },
      body: {
        en: "Village to the world. Anyone, anywhere, can buy — and ship worldwide. The market has no borders.",
        hinglish: "Gaon se duniya tak. Koi bhi, kahin se bhi, khareed sakta hai — aur worldwide ship. Market ki koi seemaa nahi.",
        hi: "गाँव से दुनिया तक। कोई भी, कहीं से भी, ख़रीद सकता है — और दुनिया भर भेज सकता है। बाज़ार की कोई सीमा नहीं।",
      },
    },
  ],

  waitlistEyebrow: { en: "Launching Soon", hinglish: "Jaldi Aa Raha Hai", hi: "जल्द आ रहा है" },
  waitlistTitle: { en: "Join the waitlist", hinglish: "Waitlist Join Karo", hi: "वेटलिस्ट जॉइन करो" },
  waitlistSub: {
    en: "The marketplace is being built. Leave your details and you'll be the first to know when it opens — as a buyer or a seller.",
    hinglish: "Marketplace ban raha hai. Apni details chhod do — jab khulega, sabse pehle aapko pata chalega — buyer ya seller, dono ke liye.",
    hi: "मार्केटप्लेस बन रहा है। अपनी जानकारी छोड़ दो — जब खुलेगा, सबसे पहले आपको पता चलेगा — ख़रीदार या विक्रेता, दोनों के लिए।",
  },
  formOpen: { en: "Open the form ↗", hinglish: "Form Kholo ↗", hi: "फ़ॉर्म खोलो ↗" },
  phHeading: {
    en: "We're opening the waitlist soon",
    hinglish: "Waitlist jaldi khul raha hai",
    hi: "वेटलिस्ट जल्द खुल रहा है",
  },
  phNote: {
    en: "The form will appear here when it's ready. Leave us a note at aslidharmi@gmail.com to be notified first.",
    hinglish: "Form jab ready hoga yahan aayega. Sabse pehle jaanno — aslidharmi@gmail.com pe likho.",
    hi: "फ़ॉर्म तैयार होने पर यहाँ आएगा। सबसे पहले जानने के लिए — aslidharmi@gmail.com पर लिखो।",
  },

  teaserLabel: { en: "Coming Categories", hinglish: "Aane Wali Categories", hi: "आने वाली श्रेणियाँ" },
  teaserStatus: { en: "Coming Soon", hinglish: "Coming Soon", hi: "जल्द आ रहा है" },
  teaserCards: [
    {
      title: { en: "Handicrafts", hinglish: "Handicrafts", hi: "हस्तशिल्प" },
      desc: { en: "Hand-made crafts from village artisans — honest, durable, and rooted in skill.", hinglish: "Gaon ke artisans se hand-made crafts — honest, durable, aur skill mein rooted.", hi: "गाँव के कारीगरों से हस्तनिर्मित शिल्प — ईमानदार, टिकाऊ, और कौशल में जड़ें।" },
    },
    {
      title: { en: "Home Foods", hinglish: "Home Foods", hi: "घरेलू खाद्य" },
      desc: { en: "Pickles, spices, and preserves — made in small batches, the way home does it.", hinglish: "Achaar, masale, aur preserves — chhote batch mein, ghar wale tareeke se.", hi: "अचार, मसाले, और संरक्षित खाद्य — छोटे बैच में, घर वाले तरीक़े से।" },
    },
    {
      title: { en: "Textiles", hinglish: "Textiles", hi: "वस्त्र" },
      desc: { en: "Tailored and woven goods — stitched by trained hands, priced fairly.", hinglish: "Tailored aur woven goods — trained haathon se sila, fair price pe.", hi: "सिले और बुने सामान — प्रशिक्षित हाथों से सिला, उचित दाम पर।" },
    },
    {
      title: { en: "Digital Services", hinglish: "Digital Services", hi: "डिजिटल सेवाएँ" },
      desc: { en: "Skill-based services delivered remotely — from data entry to design, by skilled providers.", hinglish: "Skill-based services remotely — data entry se design tak, skilled providers se.", hi: "कौशल-आधारित सेवाएँ दूर से — डेटा एंट्री से डिज़ाइन तक, कुशल प्रदाताओं से।" },
    },
  ],

  ctaHeading: { en: "Want to sell with us?", hinglish: "Humse Bechna Chahte Ho?", hi: "हमसे बेचना चाहते हो?" },
  ctaSub: { en: "If you have a skill, the marketplace is for you too. Join the movement and we'll reach out.", hinglish: "Agar aapke paas skill hai, marketplace aapke liye bhi hai. Movement join karo, hum baat karenge.", hi: "अगर आपके पास कौशल है, मार्केटप्लेस आपके लिए भी है। आंदोलन में जुड़ो, हम बात करेंगे।" },
  ctaBtn: { en: "Join the Movement →", hinglish: "Movement Mein Shaamil Ho →", hi: "आंदोलन में जुड़ें →" },
} as const;

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

export default function ProductsPage() {
  const { lang } = useLang();
  const reduce = useReducedMotion();

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
              {tx(C.heroTitle, lang)}<br />
              <em className="text-ochre">{tx(C.heroEm, lang)}</em>
            </h1>
            <p className="font-sans text-lg text-charcoal/55 max-w-2xl leading-relaxed">
              {tx(C.heroIntro, lang)}
            </p>
            <div className="w-px h-16 bg-ochre/40 mt-12" />
          </motion.div>
        </div>
      </section>

      {/* ── (1) VALUE PROP ── */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-12">{tx(C.valueLabel, lang)}</p>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-charcoal/10">
            {C.valueItems.map((v, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
                viewport={{ once: true, margin: "-60px" }}
                className="group px-0 md:px-12 py-10 md:py-0 first:pl-0 last:pr-0"
              >
                <span className="block font-heading text-5xl text-ochre/15 group-hover:text-ochre/30 transition-colors duration-500 font-bold mb-6 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-4 leading-snug">{tx(v.title, lang)}</h3>
                <p className="font-sans text-base text-charcoal/55 leading-relaxed">{tx(v.body, lang)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── (2) LAUNCHING SOON + WAITLIST ── */}
      <section className="px-6 md:px-16 py-24 bg-cream-dark/40 border-t border-charcoal/10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <RevealBlock>
            <div className="w-px h-16 bg-ochre/40 mx-auto mb-8" />
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-6">{tx(C.waitlistEyebrow, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-6 leading-tight">{tx(C.waitlistTitle, lang)}</h2>
            <p className="font-sans text-base text-charcoal/55 max-w-xl mx-auto leading-relaxed">{tx(C.waitlistSub, lang)}</p>
          </RevealBlock>
        </div>
        {/* TODO: Rajat to supply Google Form URL for Products waitlist (see PRODUCTS_WAITLIST_FORM_URL). */}
        {/* Until the real URL is supplied, FormEmbed renders a graceful "coming soon" card (no broken iframe). */}
        <FormEmbed
          src={PRODUCTS_WAITLIST_FORM_URL}
          title="Products Waitlist"
          openLabel={tx(C.formOpen, lang)}
          placeholderHeading={tx(C.phHeading, lang)}
          placeholderNote={tx(C.phNote, lang)}
        />
      </section>

      {/* ── (3) TEASER CATEGORY CARDS ── */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-12">{tx(C.teaserLabel, lang)}</p>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {C.teaserCards.map((card, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="flex flex-col h-full p-8 border border-charcoal/10 rounded-sm cursor-default min-h-[180px]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-3xl text-ochre/20 font-bold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-sans text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm bg-charcoal/5 text-charcoal/45">
                      {tx(C.teaserStatus, lang)}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl text-charcoal font-semibold mb-3 leading-snug">{tx(card.title, lang)}</h3>
                  <p className="font-sans text-sm text-charcoal/55 leading-relaxed">{tx(card.desc, lang)}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── (4) CTA ── */}
      <section className="px-6 md:px-16 py-20 border-t border-charcoal/10">
        <div className="max-w-2xl mx-auto text-center">
          <RevealBlock>
            <div className="w-px h-12 bg-ochre/40 mx-auto mb-10" />
            <h3 className="font-heading text-3xl text-charcoal font-semibold mb-4">{tx(C.ctaHeading, lang)}</h3>
            <p className="font-sans text-base text-charcoal/50 mb-8">{tx(C.ctaSub, lang)}</p>
            <Link href="/join" className="inline-flex items-center gap-3 px-10 py-5 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-charcoal transition-colors duration-300 rounded-sm">
              {tx(C.ctaBtn, lang)}
            </Link>
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
