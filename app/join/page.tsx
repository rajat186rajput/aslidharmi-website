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

const WHAT_YOU_GET: Array<{ num: string; title: Tri; body: Tri }> = [
  {
    num: "01",
    title: { en: "A chance to work in a sub-system", hinglish: "Sub-system mein kaam karne ka mauka", hi: "किसी सब-सिस्टम में काम करने का मौका" },
    body: {
      en: "Women Empowerment, Sangha, Hill Homestay, Content — choose by your skill. Real work, real impact.",
      hinglish: "Women Empowerment, Sangha, Hill Homestay, Content — apni skill ke hisaab se choose karo. Real work, real impact.",
      hi: "महिला सशक्तिकरण, संघ, हिल होमस्टे, कंटेंट — अपनी स्किल के हिसाब से चुनो। असली काम, असली असर।",
    },
  },
  {
    num: "02",
    title: { en: "Asli Dharmi Credit Economy", hinglish: "Asli Dharmi Credit Economy", hi: "असली धर्मी क्रेडिट इकोनॉमी" },
    body: {
      en: "Volunteer and earn credits. Redeem them on Hill Homestay stays, skill training modules, or priority platform slots.",
      hinglish: "Volunteer kaam karo, credits kamao. Credits redeem karo Hill Homestay stays, skill training modules, ya priority platform slots pe.",
      hi: "वॉलंटियर काम करो, क्रेडिट कमाओ। क्रेडिट हिल होमस्टे स्टे, स्किल ट्रेनिंग मॉड्यूल, या प्रायोरिटी स्लॉट पर रिडीम करो।",
    },
  },
  {
    num: "03",
    title: { en: "A co-traveler community", hinglish: "Co-traveler community", hi: "सह-यात्री समुदाय" },
    body: {
      en: "A place where questions are welcome — no guru-disciple, just co-travelers. No hierarchy, no rank.",
      hinglish: "Ek jagah jahan sawaal welcome hain — guru-disciple nahi, co-travelers hain. Koi hierarchy nahi, koi rank nahi.",
      hi: "एक जगह जहाँ सवाल का स्वागत है — गुरु-शिष्य नहीं, सह-यात्री हैं। कोई पदानुक्रम नहीं, कोई रैंक नहीं।",
    },
  },
  {
    num: "04",
    title: { en: "Direct feedback from Rajat", hinglish: "Rajat se direct feedback", hi: "रजत से सीधा फ़ीडबैक" },
    body: {
      en: "Rajat personally reads and responds to any genuine project idea. No middleman, no auto-reply.",
      hinglish: "Koi bhi genuine project idea pe Rajat khud padhe aur respond kare. Koi middleman nahi, koi auto-reply nahi.",
      hi: "किसी भी सच्चे प्रोजेक्ट आइडिया पर रजत खुद पढ़ता और जवाब देता है। कोई बिचौलिया नहीं, कोई ऑटो-रिप्लाई नहीं।",
    },
  },
];

const CREDIT_EARN: Array<{ system: string; work: Tri; rate: string }> = [
  { system: "Women Empowerment", work: { en: "Skill training, fulfilment support", hinglish: "Skill training dena, fulfilment support", hi: "स्किल ट्रेनिंग देना, फ़ुलफ़िलमेंट सपोर्ट" }, rate: "0.7 – 1 credit/hr" },
  { system: "Panchmukhi Village Hub", work: { en: "Rotational volunteer, audit visits", hinglish: "Rotational volunteer, audit visits", hi: "रोटेशनल वॉलंटियर, ऑडिट विज़िट" }, rate: "1.2 credits/hr" },
  { system: "Sangha App", work: { en: "Verified neighbour help (confirmed)", hinglish: "Verified neighbour help (confirmed)", hi: "सत्यापित पड़ोसी मदद (कन्फ़र्म्ड)" }, rate: "0.3 – 2 credits/help" },
  { system: "Content Creation", work: { en: "Filming, editing, research", hinglish: "Filming, editing, research", hi: "फ़िल्मिंग, एडिटिंग, रिसर्च" }, rate: "0.5 – 1 credit/hr" },
  { system: "Hill Homestay", work: { en: "On-site help — garden, kitchen, hosting", hinglish: "On-site help — garden, kitchen, hosting", hi: "ऑन-साइट मदद — बग़ीचा, रसोई, होस्टिंग" }, rate: "0.8 credit/hr" },
];

const CREDIT_SPEND: Array<{ what: Tri; cost: string }> = [
  { what: { en: "Hill Homestay stay (off-peak)", hinglish: "Hill Homestay stay (off-peak)", hi: "हिल होमस्टे स्टे (ऑफ़-पीक)" }, cost: "~10 credits/night" },
  { what: { en: "Hill Homestay stay (peak, private)", hinglish: "Hill Homestay stay (peak, private)", hi: "हिल होमस्टे स्टे (पीक, प्राइवेट)" }, cost: "~25 credits/night" },
  { what: { en: "Skill training module (student)", hinglish: "Skill training module (student)", hi: "स्किल ट्रेनिंग मॉड्यूल (स्टूडेंट)" }, cost: "5 credits/10-hr module" },
  { what: { en: "Telemedicine priority slot", hinglish: "Telemedicine priority slot", hi: "टेलीमेडिसिन प्रायोरिटी स्लॉट" }, cost: "2 – 3 credits" },
  { what: { en: "Small cash stipend", hinglish: "Small cash stipend", hi: "छोटा कैश स्टाइपेंड" }, cost: "1 credit = ₹50–100" },
];

const C = {
  heroEyebrow: { en: "Movement · Participation", hinglish: "Movement · Participation", hi: "मूवमेंट · सहभागिता" },
  heroH1a: { en: "Become a Part of", hinglish: "Is Movement Ka", hi: "इस मूवमेंट का" },
  heroH1em: { en: "This Movement", hinglish: "Hissa Bano", hi: "हिस्सा बनो" },
  heroSub: {
    en: "Asli Dharmi isn't just an IG page. It's a movement with real work happening — women empowerment, sustainable living, community building. If you feel the resonance and genuinely want to contribute — come inside.",
    hinglish: "Asli Dharmi sirf ek IG page nahi hai. Yeh ek movement hai jisme real kaam ho raha hai — women empowerment, sustainable living, community building. Agar aap resonance feel karte hain aur genuinely contribute karna chahte hain — toh andar aao.",
    hi: "असली धर्मी सिर्फ़ एक IG पेज नहीं है। यह एक मूवमेंट है जिसमें असली काम हो रहा है — महिला सशक्तिकरण, टिकाऊ जीवन, समुदाय निर्माण। अगर आप जुड़ाव महसूस करते हैं और सच में योगदान देना चाहते हैं — तो अंदर आओ।",
  },
  ctaIntro: { en: "Introduce Yourself →", hinglish: "Apna Parichay Do →", hi: "अपना परिचय दो →" },
  ctaUnderstand: { en: "Understand First ↓", hinglish: "Pehle Samjho ↓", hi: "पहले समझो ↓" },
  getLabel: { en: "What Being a Participant Means", hinglish: "Participant Hone Ka Matlab", hi: "सहभागी होने का मतलब" },
  getHeadingA: { en: "Not just a follower —", hinglish: "Sirf follower nahi —", hi: "सिर्फ़ फ़ॉलोअर नहीं —" },
  getHeadingEm: { en: "become a participant.", hinglish: "participant bano.", hi: "सहभागी बनो।" },
  ccLabel: { en: "Cross-Cutting Mechanism", hinglish: "Cross-Cutting Mechanism", hi: "साझा तंत्र" },
  ccHeadingA: { en: "Asli Dharmi", hinglish: "Asli Dharmi", hi: "असली धर्मी" },
  ccHeadingEm: { en: "Credit Economy", hinglish: "Credit Economy", hi: "क्रेडिट इकोनॉमी" },
  ccIntro: {
    en: "Volunteer, earn credits. Credits redeem against real services and stays. This isn't charity — it's earned exchange. Dignity intact.",
    hinglish: "Volunteer karo, credits kamao. Credits real services aur stays pe redeem hote hain. Yeh charity nahi — yeh earned exchange hai. Dignity intact.",
    hi: "वॉलंटियर करो, क्रेडिट कमाओ। क्रेडिट असली सेवाओं और स्टे पर रिडीम होते हैं। यह चैरिटी नहीं — यह कमाया हुआ विनिमय है। गरिमा बरक़रार।",
  },
  earnLabel: { en: "How to Earn Credits", hinglish: "Credits Kaise Kamao", hi: "क्रेडिट कैसे कमाओ" },
  spendLabel: { en: "Where to Spend Credits", hinglish: "Credits Kahan Spend Karo", hi: "क्रेडिट कहाँ खर्च करो" },
  locksLabel: { en: "Hard Locks — What Won't Happen", hinglish: "Hard Locks — Kya Nahi Hoga", hi: "हार्ड लॉक — क्या नहीं होगा" },
  locks: {
    en: "Credits can't be sold (for money). Can't be traded between strangers. No cryptocurrency. Safety features (SOS) will never cost a credit. Credits give no status — only services.",
    hinglish: "Credits bech nahi sakte (money ke liye). Trade nahi ho sakta strangers ke beech. Cryptocurrency nahi banega. Safety features (SOS) pe kabhi credit nahi lagega. Status nahi milega credits se — sirf services milegi.",
    hi: "क्रेडिट बेच नहीं सकते (पैसे के लिए)। अजनबियों के बीच ट्रेड नहीं हो सकता। कोई क्रिप्टोकरेंसी नहीं। सेफ़्टी फ़ीचर (SOS) पर कभी क्रेडिट नहीं लगेगा। क्रेडिट से कोई दर्जा नहीं मिलेगा — सिर्फ़ सेवाएँ।",
  },
  formHeading: { en: "Introduce Yourself", hinglish: "Apna Parichay Do", hi: "अपना परिचय दो" },
  formSub: {
    en: "Fill the form below — honestly. No one's judging here. Rajat reads it himself and responds. No auto-reply.",
    hinglish: "Neeche form bharo — honestly. Koi judgemental nahi hai yahan. Rajat khud padhega aur respond karega. Koi auto-reply nahi.",
    hi: "नीचे फ़ॉर्म भरो — ईमानदारी से। यहाँ कोई जजमेंटल नहीं है। रजत खुद पढ़ेगा और जवाब देगा। कोई ऑटो-रिप्लाई नहीं।",
  },
  formLoading: { en: "Loading form…", hinglish: "Form load ho raha hai…", hi: "फ़ॉर्म लोड हो रहा है…" },
  formPrivacy: {
    en: "Your information is used only within the Asli Dharmi movement. Never shared with any third party. No commercial use. We'll contact you directly via WhatsApp or phone — no spam.",
    hinglish: "Aapki jaankari sirf Asli Dharmi movement ke andar use hogi. Kisi bhi third party ko share nahi hogi. Koi commercial use nahi. Hum aapse WhatsApp ya phone pe seedha contact karenge — koi spam nahi.",
    hi: "आपकी जानकारी सिर्फ़ असली धर्मी मूवमेंट के अंदर इस्तेमाल होगी। किसी थर्ड पार्टी को शेयर नहीं होगी। कोई व्यावसायिक उपयोग नहीं। हम आपसे WhatsApp या फ़ोन पर सीधे संपर्क करेंगे — कोई स्पैम नहीं।",
  },
  closingQuote: {
    en: "No movement is built alone. If it resonates — come inside.",
    hinglish: "Koi movement akele nahi banta. Agar resonance ho — andar aao.",
    hi: "कोई मूवमेंट अकेले नहीं बनता। अगर बात जमे — अंदर आओ।",
  },
} as const;

export default function JoinPage() {
  const { lang } = useLang();

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
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-8">{tx(C.heroEyebrow, lang)}</p>
            <h1 className="font-heading text-5xl md:text-8xl text-cream font-semibold leading-[0.88] mb-8">
              {tx(C.heroH1a, lang)}<br />
              <em className="text-ochre">{tx(C.heroH1em, lang)}</em>
            </h1>
            <p className="font-sans text-xl text-cream/55 max-w-2xl leading-relaxed mb-10">
              {tx(C.heroSub, lang)}
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#form"
                className="inline-flex items-center gap-3 px-10 py-5 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
              >
                {tx(C.ctaIntro, lang)}
              </a>
              <a
                href="#what-you-get"
                className="inline-flex items-center gap-3 px-10 py-5 border border-cream/20 text-cream/60 font-sans font-medium text-xs tracking-widest uppercase hover:border-cream/50 transition-all duration-300 rounded-sm"
              >
                {tx(C.ctaUnderstand, lang)}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section id="what-you-get" className="px-6 md:px-16 py-24 border-b border-charcoal/8">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-4">{tx(C.getLabel, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold leading-[0.95] mb-16 max-w-xl">
              {tx(C.getHeadingA, lang)}<br /><em className="text-ochre">{tx(C.getHeadingEm, lang)}</em>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHAT_YOU_GET.map((item, i) => (
              <RevealBlock key={item.num} delay={i * 0.08}>
                <div className="p-8 border border-charcoal/10 h-full">
                  <span className="font-heading text-5xl text-ochre/15 font-bold leading-none block mb-4">{item.num}</span>
                  <h3 className="font-heading text-xl text-charcoal font-semibold mb-3 leading-snug">{tx(item.title, lang)}</h3>
                  <p className="font-sans text-sm text-charcoal/60 leading-relaxed">{tx(item.body, lang)}</p>
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
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-4">{tx(C.ccLabel, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-cream font-semibold leading-[0.95] mb-6 max-w-2xl">
              {tx(C.ccHeadingA, lang)}<br /><em className="text-ochre">{tx(C.ccHeadingEm, lang)}</em>
            </h2>
            <p className="font-sans text-lg text-cream/50 max-w-2xl leading-relaxed mb-16">
              {tx(C.ccIntro, lang)}
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Earn */}
            <RevealBlock>
              <p className="font-sans text-xs uppercase tracking-widest text-ochre mb-6">{tx(C.earnLabel, lang)}</p>
              <div className="space-y-4">
                {CREDIT_EARN.map(e => (
                  <div key={e.system} className="flex gap-4 pb-4 border-b border-cream/8">
                    <div className="flex-1">
                      <p className="font-sans text-sm text-cream/80 font-medium">{e.system}</p>
                      <p className="font-sans text-xs text-cream/40 mt-0.5">{tx(e.work, lang)}</p>
                    </div>
                    <span className="font-sans text-xs text-ochre/80 shrink-0 pt-0.5">{e.rate}</span>
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* Spend */}
            <RevealBlock delay={0.1}>
              <p className="font-sans text-xs uppercase tracking-widest text-ochre mb-6">{tx(C.spendLabel, lang)}</p>
              <div className="space-y-4">
                {CREDIT_SPEND.map((s, i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b border-cream/8">
                    <div className="flex-1">
                      <p className="font-sans text-sm text-cream/80">{tx(s.what, lang)}</p>
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
              <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-3">{tx(C.locksLabel, lang)}</p>
              <p className="font-sans text-sm text-cream/45 leading-relaxed">
                {tx(C.locks, lang)}
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
              {tx(C.formHeading, lang)}
            </h2>
            <p className="font-sans text-lg text-charcoal/55 mb-10 leading-relaxed max-w-lg">
              {tx(C.formSub, lang)}
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
                {tx(C.formLoading, lang)}
              </iframe>
            </div>
            <p className="font-sans text-xs text-charcoal/35 mt-5 leading-relaxed">
              {tx(C.formPrivacy, lang)}
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
              {tx(C.closingQuote, lang)}
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
