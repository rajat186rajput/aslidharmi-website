"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLang, tx } from "@/lib/i18n";
import { FormEmbed } from "@/components/FormEmbed";

const EASE = [0.22, 1, 0.36, 1] as const;

// TODO: Rajat to supply the real Google Form URL for the Skills enroll/interest list
// (use the dedicated `aslidharmi` Google account — never personal Gmail).
// Must be the `?embedded=true` form URL. 1-line swap when ready.
const SKILLS_ENROLL_FORM_URL =
  "https://docs.google.com/forms/d/e/PLACEHOLDER_SKILLS_ENROLL/viewform?embedded=true";

const C = {
  heroEyebrow: { en: "Learn · Skill · Earn", hinglish: "Learn · Skill · Earn", hi: "सीखो · कौशल · कमाओ" },
  heroTitle: { en: "Learn a", hinglish: "Ek", hi: "एक" },
  heroEm: { en: "skill", hinglish: "skill seekho", hi: "कौशल सीखो" },
  heroIntro: {
    en: "Skill is the surest income — and the surest dignity. Tell us what you want to learn, and we'll build the path.",
    hinglish: "Skill hi sabse pakka income hai — aur sabse pakki dignity. Batao kya seekhna hai, hum raasta banayenge.",
    hi: "कौशल ही सबसे पक्की आय है — और सबसे पक्की गरिमा। बताओ क्या सीखना है, हम रास्ता बनाएँगे।",
  },

  whyLead: {
    en: "Skill is dignity, not charity. We don't hand out help — we hand over capability. Once a skill is yours, no one can take the income it earns.",
    hinglish: "Skill dignity hai, charity nahi. Hum madad nahi baante — capability dete hain. Ek baar skill aapki ho gayi, jo income woh kamati hai use koi nahi le sakta.",
    hi: "कौशल गरिमा है, चैरिटी नहीं। हम मदद नहीं बाँटते — क्षमता देते हैं। एक बार कौशल आपका हो गया, जो आय वह कमाता है उसे कोई नहीं ले सकता।",
  },

  teaserLabel: { en: "Skills We'll Teach", hinglish: "Jo Skills Sikhaenge", hi: "जो कौशल सिखाएँगे" },
  teaserStatus: { en: "Enrolling Soon", hinglish: "Enrolling Soon", hi: "जल्द नामांकन" },
  skillCards: [
    { title: { en: "Tailoring", hinglish: "Tailoring", hi: "सिलाई" }, desc: { en: "Stitching, alterations and finishing — a skill with steady, year-round demand.", hinglish: "Stitching, alterations aur finishing — saal bhar steady demand wali skill.", hi: "सिलाई, फेरबदल और फ़िनिशिंग — साल भर लगातार माँग वाला कौशल।" } },
    { title: { en: "Food Processing", hinglish: "Food Processing", hi: "खाद्य प्रसंस्करण" }, desc: { en: "Pickles, spices, preserves — turning home recipes into a sellable product.", hinglish: "Achaar, masale, preserves — ghar ki recipes ko sellable product banana.", hi: "अचार, मसाले, संरक्षित खाद्य — घर की रेसिपी को बिकने वाले उत्पाद में बदलना।" } },
    { title: { en: "Handicrafts", hinglish: "Handicrafts", hi: "हस्तशिल्प" }, desc: { en: "Craft skills that travel — durable, hand-made goods for the marketplace.", hinglish: "Craft skills jo door tak jaayein — durable, hand-made goods marketplace ke liye.", hi: "शिल्प कौशल जो दूर तक जाए — टिकाऊ, हस्तनिर्मित सामान मार्केटप्लेस के लिए।" } },
    { title: { en: "Digital Basics", hinglish: "Digital Basics", hi: "डिजिटल बेसिक्स" }, desc: { en: "Phone, computer and online basics — the entry door to remote income.", hinglish: "Phone, computer aur online basics — remote income ka entry door.", hi: "फ़ोन, कंप्यूटर और ऑनलाइन बेसिक्स — दूरस्थ आय का प्रवेश द्वार।" } },
    { title: { en: "Care Services", hinglish: "Care Services", hi: "देखभाल सेवाएँ" }, desc: { en: "Elder care and basic health support — a dignified, much-needed skill.", hinglish: "Elder care aur basic health support — ek dignified, zaroori skill.", hi: "बुज़ुर्ग देखभाल और बुनियादी स्वास्थ्य सहायता — एक सम्मानजनक, ज़रूरी कौशल।" } },
    { title: { en: "Spoken English", hinglish: "Spoken English", hi: "बोलचाल अंग्रेज़ी" }, desc: { en: "Confidence to speak — the skill that opens doors across every other one.", hinglish: "Bolne ka confidence — woh skill jo baaki har skill ke darwaze kholti hai.", hi: "बोलने का आत्मविश्वास — वह कौशल जो बाक़ी हर कौशल के दरवाज़े खोलता है।" } },
  ],

  enrollEyebrow: { en: "Enroll · Interest", hinglish: "Enroll · Interest", hi: "नामांकन · रुचि" },
  enrollTitle: { en: "Tell us what you want to learn", hinglish: "Batao Kya Seekhna Hai", hi: "बताओ क्या सीखना है" },
  enrollSub: {
    en: "We're building the first batches now. Leave your interest and we'll reach out when training opens near you.",
    hinglish: "Hum pehle batches abhi bana rahe hain. Apni interest chhod do — jab training aapke paas khulegi, hum baat karenge.",
    hi: "हम पहले बैच अभी बना रहे हैं। अपनी रुचि छोड़ दो — जब प्रशिक्षण आपके पास खुलेगा, हम बात करेंगे।",
  },
  formOpen: { en: "Open the form ↗", hinglish: "Form Kholo ↗", hi: "फ़ॉर्म खोलो ↗" },

  ctaHeading: { en: "Ready to start?", hinglish: "Shuru Karne Ke Liye Ready?", hi: "शुरू करने के लिए तैयार?" },
  ctaSub: { en: "Skilling is one part of a bigger movement. Join, and walk with us.", hinglish: "Skilling ek bade movement ka hissa hai. Join karo, saath chalo.", hi: "कौशल एक बड़े आंदोलन का हिस्सा है। जुड़ो, साथ चलो।" },
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

export default function SkillsPage() {
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
              {tx(C.heroTitle, lang)} <em className="text-ochre">{tx(C.heroEm, lang)}</em>
            </h1>
            <p className="font-sans text-lg text-charcoal/55 max-w-2xl leading-relaxed">
              {tx(C.heroIntro, lang)}
            </p>
            <div className="w-px h-16 bg-ochre/40 mt-12" />
          </motion.div>
        </div>
      </section>

      {/* ── (1) WHY / VALUE ── */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-3xl mx-auto">
          <RevealBlock>
            <p className="font-heading text-2xl md:text-3xl text-charcoal/80 leading-relaxed">
              {tx(C.whyLead, lang)}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ── (2) TEASER SKILL CARDS ── */}
      <section className="px-6 md:px-16 py-16 bg-cream-dark/40 border-t border-charcoal/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-12">{tx(C.teaserLabel, lang)}</p>
          </RevealBlock>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {C.skillCards.map((card, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="flex flex-col h-full p-5 border border-charcoal/10 rounded-sm cursor-default bg-cream">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-2xl text-ochre/20 font-bold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-sans text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm bg-charcoal/5 text-charcoal/45">
                      {tx(C.teaserStatus, lang)}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg text-charcoal font-semibold mb-2 leading-snug">{tx(card.title, lang)}</h3>
                  <p className="font-sans text-sm text-charcoal/55 leading-relaxed">{tx(card.desc, lang)}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── (3) ENROLL / INTEREST WAITLIST ── */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <RevealBlock>
            <div className="w-px h-16 bg-ochre/40 mx-auto mb-8" />
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-6">{tx(C.enrollEyebrow, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-6 leading-tight">{tx(C.enrollTitle, lang)}</h2>
            <p className="font-sans text-base text-charcoal/55 max-w-xl mx-auto leading-relaxed">{tx(C.enrollSub, lang)}</p>
          </RevealBlock>
        </div>
        {/* TODO: Rajat to supply Google Form URL for Skills enroll/interest (see SKILLS_ENROLL_FORM_URL). */}
        <FormEmbed src={SKILLS_ENROLL_FORM_URL} title="Skills Enrollment" openLabel={tx(C.formOpen, lang)} />
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
