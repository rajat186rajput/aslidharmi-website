"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang, tx } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tri = { en: string; hinglish: string; hi: string };

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

const REEL_TOPICS: Array<{ num: string; tag: string; title: Tri }> = [
  { num: "001", tag: "Dharma", title: { en: "What Was Krishna's Caste?", hinglish: "Krishna Ki Jaati Kya Thi?", hi: "कृष्ण की जाति क्या थी?" } },
  { num: "002", tag: "Traditions", title: { en: "What's the Real Logic of Shradh?", hinglish: "Shradh Ka Asli Logic Kya Hai?", hi: "श्राद्ध का असली तर्क क्या है?" } },
  { num: "003", tag: "Andhvishwas", title: { en: "Mangalik Dosha — Science or Fear?", hinglish: "Mangalik Dosha — Science Ya Fear?", hi: "मांगलिक दोष — विज्ञान या डर?" } },
  { num: "004", tag: "History", title: { en: "Charvaka — The Philosopher We Forgot", hinglish: "Charvaka — Woh Philosopher Jo Bhula Diya Gaya", hi: "चार्वाक — वह दार्शनिक जो भुला दिया गया" } },
  { num: "005", tag: "Society", title: { en: "Temple Offerings vs Bribes on the Road", hinglish: "Mandir Mein Chadhawa vs Roads Mein Rishwat", hi: "मंदिर में चढ़ावा बनाम सड़कों में रिश्वत" } },
  { num: "006", tag: "Traditions", title: { en: "The Logic of Amavasya — Why and Since When?", hinglish: "Amavasya Ka Logic — Kyun Aur Kab Se?", hi: "अमावस्या का तर्क — क्यों और कब से?" } },
  { num: "007", tag: "Dharma", title: { en: "The Real Meaning of Yagya — That No One Tells", hinglish: "Yagya Ka Asli Arth — Jo Koi Nahi Batata", hi: "यज्ञ का असली अर्थ — जो कोई नहीं बताता" } },
  { num: "008", tag: "Irony", title: { en: "Buddha Forbade Lighting Lamps for Him", hinglish: "Buddha Ne Diya Jalane Se Mana Kiya Tha", hi: "बुद्ध ने दीया जलाने से मना किया था" } },
  { num: "009", tag: "History", title: { en: "Vastu Shastra — Origin and Corruption", hinglish: "Vastu Shastra — Origin Aur Corruption", hi: "वास्तु शास्त्र — उत्पत्ति और बिगाड़" } },
  { num: "010", tag: "Gender", title: { en: "Karva Chauth — Love or Control?", hinglish: "Karva Chauth — Love Ya Control?", hi: "करवा चौथ — प्यार या नियंत्रण?" } },
];

const TAG_COLORS: Record<string, string> = {
  Dharma: "text-ochre/80 bg-ochre/10",
  Traditions: "text-sage bg-sage/10",
  Andhvishwas: "text-cream/60 bg-cream/8",
  History: "text-ochre/60 bg-ochre/8",
  Society: "text-sage/80 bg-sage/8",
  Irony: "text-cream/50 bg-cream/6",
  Gender: "text-ochre/70 bg-ochre/10",
};

const C = {
  eyebrow: { en: "Reels · Essays · Questions", hinglish: "Reels · Essays · Sawaal", hi: "रील्स · निबंध · सवाल" },
  h1a: { en: "Content That", hinglish: "Content Jo", hi: "कंटेंट जो" },
  h1em: { en: "Makes You Uncomfortable", hinglish: "Discomfort Deta Hai", hi: "बेचैन करता है" },
  intro: {
    en: "Short reels on Instagram and YouTube — topics: dharma, speciesism, gender, superstition, self-sustainability. Asli Dharmi's content isn't feel-good. It raises questions — and then sits with you.",
    hinglish: "Instagram aur YouTube pe short reels hain — topics: dharma, speciesism, gender, andhvishwas, self-sustainability. Asli Dharmi ka content feel-good nahi hai. Woh sawaal uthata hai — aur phir tumhare saath baithta hai.",
    hi: "इंस्टाग्राम और यूट्यूब पर शॉर्ट रील्स हैं — विषय: धर्म, स्पीशीज़िज़्म, जेंडर, अंधविश्वास, आत्मनिर्भरता। असली धर्मी का कंटेंट फ़ील-गुड नहीं है। वो सवाल उठाता है — और फिर तुम्हारे साथ बैठता है।",
  },
  formatLabel: { en: "Format", hinglish: "Format", hi: "फ़ॉर्मेट" },
  formatHeading: { en: "Gyani Tau asks.\nSaakshi answers.", hinglish: "Gyani Tau puchhta hai.\nSaakshi jawab deti hai.", hi: "ज्ञानी ताऊ पूछता है।\nसाक्षी जवाब देती है।" },
  formatBody: {
    en: "Two characters — two viewpoints. One asks a question that's often full of misconceptions. The other answers honestly — no lecture, no moralising. Every reel is a conversation, not a sermon.",
    hinglish: "Do characters — do nazariye. Ek sawaal karta hai jo aksar galatfehmi se bhara hota hai. Doosra honestly jawab deta hai — bina lecture ke, bina morale ke. Har reel ek conversation hai, sermon nahi.",
    hi: "दो किरदार — दो नज़रिए। एक सवाल करता है जो अक्सर ग़लतफ़हमी से भरा होता है। दूसरा ईमानदारी से जवाब देता है — बिना भाषण के, बिना उपदेश के। हर रील एक बातचीत है, प्रवचन नहीं।",
  },
  gyaniBody: {
    en: "The one who \"knows it all\" — follows traditions without asking, does it because the elders did. The voice of common misconceptions.",
    hinglish: "Wo banda jo \"sab jaanta hai\" — traditions follow karta hai bina pooche, sab ke baap-dada ne kiya isliye karta hai. Common misconceptions ki awaaz.",
    hi: "वो इंसान जो \"सब जानता है\" — परंपराएँ बिना पूछे फॉलो करता है, बाप-दादा ने किया इसलिए करता है। आम ग़लतफ़हमियों की आवाज़।",
  },
  saakshiBody: {
    en: "The name means \"witness\" — she states what's been seen, not what's been fixed. No agenda, no guru — only what she's understood.",
    hinglish: "Naam ka matlab \"witness\" — dekha hua batati hai, theek kiya hua nahi. Koi agenda nahi, koi guru nahi — sirf jo samajh aaya woh.",
    hi: "नाम का मतलब \"साक्षी\" — देखा हुआ बताती है, ठीक किया हुआ नहीं। कोई एजेंडा नहीं, कोई गुरु नहीं — सिर्फ़ जो समझ आया वो।",
  },
  latestReels: { en: "Latest Reels", hinglish: "Latest Reels", hi: "नई रील्स" },
  reelsLive: { en: "10 Reels Live", hinglish: "10 Reels Live", hi: "10 रील्स लाइव" },
  seeOnInsta: { en: "See on @aslidharmi →", hinglish: "@aslidharmi par dekho →", hi: "@aslidharmi पर देखो →" },
  embedNote: {
    en: "Instagram feed embed — Behold.so integration pending account setup",
    hinglish: "Instagram feed embed — Behold.so integration pending account setup",
    hi: "इंस्टाग्राम फ़ीड एम्बेड — Behold.so इंटीग्रेशन अकाउंट सेटअप के बाद",
  },
  watchInsta: { en: "Watch Directly on Instagram →", hinglish: "Instagram Pe Seedha Dekho →", hi: "इंस्टाग्राम पर सीधा देखो →" },
  ytLabel: { en: "On YouTube Too", hinglish: "YouTube Pe Bhi Hain", hi: "यूट्यूब पर भी हैं" },
  ytHeading: { en: "Same content,\non YouTube too.", hinglish: "Same content,\nYouTube pe bhi.", hi: "वही कंटेंट,\nयूट्यूब पर भी।" },
  ytBody: {
    en: "Don't prefer Instagram? Subscribe on YouTube — the exact same reels are there. Long-form conversations will come on YouTube too.",
    hinglish: "Instagram prefer nahi karte? YouTube subscribe karo — exact same reels wahan bhi hain. Long-form conversations bhi YouTube pe hi aayenge.",
    hi: "इंस्टाग्राम पसंद नहीं? यूट्यूब सब्सक्राइब करो — बिलकुल वही रील्स वहाँ भी हैं। लॉन्ग-फ़ॉर्म बातचीत भी यूट्यूब पर ही आएगी।",
  },
  ytSubscribe: { en: "Subscribe on YouTube →", hinglish: "YouTube Subscribe Karo →", hi: "यूट्यूब सब्सक्राइब करो →" },
  ytQuote: {
    en: "“Some topics can't be grasped in 60 seconds. For those, long-form conversations are coming — free, right here, no paywall.”",
    hinglish: "“Kuch topics hain jo 60 seconds mein nahi samajh aate. Unke liye long-form conversations aayenge — free, seedha yahan, koi paywall nahi.”",
    hi: "“कुछ विषय हैं जो 60 सेकंड में समझ नहीं आते। उनके लिए लॉन्ग-फ़ॉर्म बातचीत आएगी — मुफ़्त, सीधे यहाँ, कोई पेवॉल नहीं।”",
  },
  essayLabel: { en: "Long-form", hinglish: "Long-form", hi: "लॉन्ग-फ़ॉर्म" },
  essayHeadingA: { en: "Essays —", hinglish: "Essays —", hi: "निबंध —" },
  essayHeadingEm: { en: "Coming Soon", hinglish: "Jaldi Aa Rahe Hain", hi: "जल्द आ रहे हैं" },
  essayBody: {
    en: "Some topics can't be grasped in 60 seconds. For those, essays will come here — free, right here, no paywall.",
    hinglish: "Kuch topics hain jo 60 seconds mein nahi samajh aate. Unke liye yahan essays aayenge — free, seedha yahan, koi paywall nahi.",
    hi: "कुछ विषय हैं जो 60 सेकंड में समझ नहीं आते। उनके लिए यहाँ निबंध आएँगे — मुफ़्त, सीधे यहाँ, कोई पेवॉल नहीं।",
  },
  firstEssayLabel: { en: "First Essay", hinglish: "Pehla Essay", hi: "पहला निबंध" },
  firstEssay: {
    en: "“What's the difference between superstition and shraddha?”",
    hinglish: "“Andhvishwas aur Shraddha mein fark kya hai?”",
    hi: "“अंधविश्वास और श्रद्धा में फ़र्क क्या है?”",
  },
  earlyAccessBtn: { en: "Become a Participant — Get Early Access →", hinglish: "Participant Bano — Early Access Pao →", hi: "सहभागी बनो — अर्ली एक्सेस पाओ →" },
  comingSoon: { en: "Coming Soon", hinglish: "Coming Soon", hi: "जल्द आ रहा है" },
  earlyNote: {
    en: "Participants get it first — a 2-3 day notification before public release.",
    hinglish: "Participants ko pehle milega — 2-3 din pehle notification aata hai before public release.",
    hi: "सहभागियों को पहले मिलेगा — सार्वजनिक रिलीज़ से 2-3 दिन पहले नोटिफ़िकेशन।",
  },
  pehleLabel: { en: "Understand First", hinglish: "Pehle Samjho", hi: "पहले समझो" },
  pehleHeading: {
    en: "The source of the content — the 10 core beliefs — is there.",
    hinglish: "Content ka source — 10 buniyadhi vishwas — wahan hain.",
    hi: "कंटेंट का स्रोत — 10 बुनियादी विश्वास — वहाँ हैं।",
  },
  readPhilosophy: { en: "Read the Philosophy →", hinglish: "Philosophy Padho →", hi: "दर्शन पढ़ो →" },
  joinBtn: { en: "Join →", hinglish: "Shaamil Ho →", hi: "जुड़ें →" },
  footHome: { en: "Home", hinglish: "Home", hi: "होम" },
  footJoin: { en: "Join", hinglish: "Shaamil Ho", hi: "जुड़ें" },
} as const;

export default function ContentPage() {
  const { lang } = useLang();

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
          <p className="font-sans text-xl text-cream/50 max-w-2xl leading-relaxed">
            {tx(C.intro, lang)}
          </p>
        </motion.div>
      </section>

      {/* ── FORMAT CARD — GYANI TAU + SAAKSHI ── */}
      <section className="px-6 md:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <div className="p-8 border border-ochre/20 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-4">{tx(C.formatLabel, lang)}</p>
                <h3 className="font-heading text-2xl text-cream font-semibold mb-4 leading-snug whitespace-pre-line">
                  {tx(C.formatHeading, lang)}
                </h3>
                <p className="font-sans text-sm text-cream/50 leading-relaxed">
                  {tx(C.formatBody, lang)}
                </p>
              </div>
              <div className="space-y-5 border-l border-cream/8 pl-10">
                <div>
                  <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-1">Gyani Tau</p>
                  <p className="font-sans text-sm text-cream/60 leading-relaxed">
                    {tx(C.gyaniBody, lang)}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-wider text-sage mb-1">Saakshi</p>
                  <p className="font-sans text-sm text-cream/60 leading-relaxed">
                    {tx(C.saakshiBody, lang)}
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── REEL TOPICS ── */}
      <section className="px-6 md:px-16 py-16 border-t border-cream/8">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-2">{tx(C.latestReels, lang)}</p>
                <h2 className="font-heading text-3xl text-cream font-semibold">{tx(C.reelsLive, lang)}</h2>
              </div>
              <a
                href="https://instagram.com/aslidharmi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs text-ochre/70 hover:text-ochre transition-colors uppercase tracking-widest"
              >
                {tx(C.seeOnInsta, lang)}
              </a>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REEL_TOPICS.map((reel, i) => (
              <RevealBlock key={reel.num} delay={i * 0.04}>
                <a
                  href="https://instagram.com/aslidharmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-5 p-5 border border-cream/8 hover:border-ochre/30 transition-colors duration-300"
                >
                  <span className="font-sans text-xs text-cream/20 tracking-wider shrink-0 pt-1">{reel.num}</span>
                  <div className="flex-1">
                    <p className="font-sans text-sm text-cream/75 group-hover:text-cream transition-colors leading-snug mb-2">
                      {tx(reel.title, lang)}
                    </p>
                    <span className={`font-sans text-xs px-2.5 py-0.5 rounded-sm uppercase tracking-wider ${TAG_COLORS[reel.tag] ?? "text-cream/40 bg-cream/8"}`}>
                      {reel.tag}
                    </span>
                  </div>
                  <span className="text-cream/20 group-hover:text-ochre/60 transition-colors text-lg shrink-0">↗</span>
                </a>
              </RevealBlock>
            ))}
          </div>

          {/* Instagram Embed Placeholder */}
          <RevealBlock className="mt-12">
            <div className="border border-cream/8 p-10 text-center">
              <p className="font-sans text-sm text-cream/30 mb-4">
                {tx(C.embedNote, lang)}
              </p>
              <a
                href="https://instagram.com/aslidharmi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
              >
                {tx(C.watchInsta, lang)}
              </a>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── YOUTUBE ── */}
      <section className="px-6 md:px-16 py-16 border-t border-cream/8">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">{tx(C.ytLabel, lang)}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="font-heading text-3xl text-cream font-semibold mb-4 leading-snug whitespace-pre-line">
                  {tx(C.ytHeading, lang)}
                </h2>
                <p className="font-sans text-base text-cream/50 leading-relaxed mb-6">
                  {tx(C.ytBody, lang)}
                </p>
                <a
                  href="https://youtube.com/@aslidharmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-cream/20 text-cream/60 font-sans font-medium text-xs tracking-widest uppercase hover:border-cream/50 hover:text-cream transition-all duration-300 rounded-sm"
                >
                  {tx(C.ytSubscribe, lang)}
                </a>
              </div>
              <div className="p-8 border border-cream/8">
                <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-3">@aslidharmi</p>
                <p className="font-heading text-lg text-cream/60 leading-relaxed italic">
                  {tx(C.ytQuote, lang)}
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── ESSAYS (COMING SOON) ── */}
      <section className="px-6 md:px-16 py-20 border-t border-cream/8">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-4">{tx(C.essayLabel, lang)}</p>
                <h2 className="font-heading text-4xl text-cream font-semibold mb-6 leading-[0.95]">
                  {tx(C.essayHeadingA, lang)}<br /><em className="text-ochre">{tx(C.essayHeadingEm, lang)}</em>
                </h2>
                <p className="font-sans text-lg text-cream/50 leading-relaxed mb-6">
                  {tx(C.essayBody, lang)}
                </p>
                <div className="border border-cream/8 p-6 mb-8">
                  <p className="font-sans text-xs text-ochre/60 uppercase tracking-wider mb-2">{tx(C.firstEssayLabel, lang)}</p>
                  <p className="font-heading text-lg text-cream/70">
                    {tx(C.firstEssay, lang)}
                  </p>
                </div>
                <Link
                  href="/join"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
                >
                  {tx(C.earlyAccessBtn, lang)}
                </Link>
              </div>
              <div className="flex items-center">
                <div className="w-full border border-ochre/20 p-8">
                  <span className="inline-block px-3 py-1 border border-ochre/30 text-ochre/60 font-sans text-xs uppercase tracking-wider mb-4">{tx(C.comingSoon, lang)}</span>
                  <p className="font-sans text-sm text-cream/40 leading-relaxed">
                    {tx(C.earlyNote, lang)}
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── PHILOSOPHY CTA ── */}
      <section className="px-6 md:px-16 py-16 border-t border-cream/8">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
              <div className="max-w-lg">
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-3">{tx(C.pehleLabel, lang)}</p>
                <p className="font-heading text-2xl text-cream font-semibold leading-snug">
                  {tx(C.pehleHeading, lang)}
                </p>
              </div>
              <div className="flex gap-3 flex-wrap shrink-0">
                <Link
                  href="/hamari-soch"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-cream/20 text-cream/60 font-sans font-medium text-xs tracking-widest uppercase hover:border-cream/50 transition-all duration-300 rounded-sm"
                >
                  {tx(C.readPhilosophy, lang)}
                </Link>
                <Link
                  href="/join"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
                >
                  {tx(C.joinBtn, lang)}
                </Link>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-cream/8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-cream/30">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-cream/30">
          <Link href="/" className="hover:text-cream/60 transition-colors">{tx(C.footHome, lang)}</Link>
          <Link href="/hamari-soch" className="hover:text-cream/60 transition-colors">{tx({ en: "Our Soch", hinglish: "Hamari Soch", hi: "हमारी सोच" }, lang)}</Link>
          <Link href="/join" className="hover:text-cream/60 transition-colors">{tx(C.footJoin, lang)}</Link>
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-cream/60 transition-colors">Instagram</a>
        </div>
      </footer>
    </main>
  );
}
