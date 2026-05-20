"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang, tx } from "@/lib/i18n";

const C = {
  eyebrow: { en: "Get in touch", hinglish: "Baat karo", hi: "बात करो" },
  h1a: { en: "Talk directly — ", hinglish: "Seedha baat karo — ", hi: "सीधी बात करो — " },
  h1em: { en: "no gatekeeping.", hinglish: "koi gatekeeping nahi.", hi: "कोई गेटकीपिंग नहीं।" },
  preferred: { en: "Preferred", hinglish: "Preferred", hi: "पसंदीदा" },
  igSub: {
    en: "DM us — real conversations welcome.",
    hinglish: "DM karo — real conversations welcome hain.",
    hi: "DM करो — असली बातचीत का स्वागत है।",
  },
  emailLabel: { en: "Email", hinglish: "Email", hi: "ईमेल" },
  emailSub: {
    en: "Collaborations, feedback, or anything — Rajat reads personally.",
    hinglish: "Collaborations, feedback, ya kuch bhi — Rajat personally padhta hai.",
    hi: "कोलैबोरेशन, फ़ीडबैक, या कुछ भी — रजत खुद पढ़ता है।",
  },
  joinPre: { en: "Want to join the movement? ", hinglish: "Movement mein judna hai? ", hi: "आंदोलन में जुड़ना है? " },
  joinLink: { en: "Join here", hinglish: "Yahan join karo", hi: "यहाँ जुड़ें" },
  joinPost: { en: " — better than a contact form.", hinglish: " — contact form se better hai.", hi: " — कॉन्टैक्ट फ़ॉर्म से बेहतर है।" },
} as const;

export default function ContactPage() {
  const { lang } = useLang();

  return (
    <main className="min-h-screen bg-cream flex flex-col">
      <section className="flex-1 flex flex-col justify-center px-6 md:px-16 pt-28 pb-24 max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-sans text-sm uppercase tracking-[0.2em] text-ochre mb-6"
        >
          {tx(C.eyebrow, lang)}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl md:text-5xl font-semibold text-charcoal leading-tight mb-8"
        >
          {tx(C.h1a, lang)}<span className="text-ochre">{tx(C.h1em, lang)}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="space-y-8"
        >
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-charcoal/40 mb-2">{tx(C.preferred, lang)}</p>
            <a
              href="https://instagram.com/aslidharmi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-2xl text-charcoal hover:text-ochre transition-colors"
            >
              @aslidharmi on Instagram
            </a>
            <p className="font-sans text-sm text-charcoal/50 mt-1">
              {tx(C.igSub, lang)}
            </p>
          </div>

          <div className="w-8 h-px bg-charcoal/15" />

          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-charcoal/40 mb-2">{tx(C.emailLabel, lang)}</p>
            <a
              href="mailto:aslidharmi@gmail.com"
              className="font-heading text-2xl text-charcoal hover:text-ochre transition-colors"
            >
              aslidharmi@gmail.com
            </a>
            <p className="font-sans text-sm text-charcoal/50 mt-1">
              {tx(C.emailSub, lang)}
            </p>
          </div>

          <div className="w-8 h-px bg-charcoal/15" />

          <p className="font-sans text-sm text-charcoal/50 leading-relaxed">
            {tx(C.joinPre, lang)}<Link href="/join" className="text-ochre hover:underline">{tx(C.joinLink, lang)}</Link>{tx(C.joinPost, lang)}
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-charcoal/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-charcoal/50">© 2026 Asli Dharmi</span>
        <div className="flex gap-6 font-sans text-sm text-charcoal/50">
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">Instagram</a>
          <a href="mailto:aslidharmi@gmail.com" className="hover:text-charcoal transition-colors">Contact</a>
        </div>
      </footer>
    </main>
  );
}
