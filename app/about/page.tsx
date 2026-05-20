"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { useLang, tx } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Page copy (trilingual) ───────────────────────────────────────────────
const C = {
  heroEyebrow: { en: "Asli Dharmi · Rajat Rajput", hinglish: "Asli Dharmi · Rajat Rajput", hi: "असली धर्मी · रजत राजपूत" },
  heroTitle: { en: "Rajat Rajput —", hinglish: "Rajat Rajput —", hi: "रजत राजपूत —" },
  heroTitleItalic: { en: "Why all this?", hinglish: "Kyun Yeh Sab?", hi: "क्यों यह सब?" },
  heroSub: {
    en: "An engineer who draws technical drawings by day and reads philosophy by night.",
    hinglish: "Ek engineer, jo din mein technical drawings karta hai aur raat mein philosophy padhta hai.",
    hi: "एक इंजीनियर, जो दिन में टेक्निकल ड्रॉइंग करता है और रात में दर्शन पढ़ता है।",
  },

  label1: { en: "The Beginning", hinglish: "Shuruwat", hi: "शुरुआत" },
  para1: {
    en: "I'm an engineer — I design railway coaches in Gurgaon. Technical drawings by day, philosophy by night. For me these aren't separate — in both I look for the same thing: seeing a thing exactly as it is.",
    hinglish: "Main ek engineer hun — railway coach design karta hun, Gurgaon mein. Din mein technical drawings, raat mein philosophy. Yeh dono mere liye alag nahi hain — dono mein same cheez dhundhta hun: jo cheez jaisi hai, usko vaisa dekhna.",
    hi: "मैं एक इंजीनियर हूँ — रेलवे कोच डिज़ाइन करता हूँ, गुड़गाँव में। दिन में टेक्निकल ड्रॉइंग, रात में दर्शन। ये दोनों मेरे लिए अलग नहीं हैं — दोनों में एक ही चीज़ ढूँढता हूँ: जो चीज़ जैसी है, उसको वैसा देखना।",
  },
  para2: {
    en: "I've read since college. Started with self-help, then philosophy, then psychology, then sociology. Then Hindu scriptures — Geeta, Upanishad, Puran. Listened to Osho. Listened to Acharya Prashant. They gave me vocabulary — but I am no one's disciple. What I saw, I saw with my own eyes. Alone.",
    hinglish: "College ke baad se padha. Self-help se shuru hua, phir philosophy aayi, phir psychology, phir sociology. Phir Hindu scriptures — Geeta, Upanishad, Puran. Osho suna. Acharya Prashant suna. Inse vocabulary mila — lekin main kisi ka shishya nahi hun. Jo maine dekha, wo meri apni aankhon se dekha. Akele.",
    hi: "कॉलेज के बाद से पढ़ा। सेल्फ-हेल्प से शुरू हुआ, फिर दर्शन आया, फिर मनोविज्ञान, फिर समाजशास्त्र। फिर हिंदू ग्रंथ — गीता, उपनिषद, पुराण। ओशो सुना। आचार्य प्रशांत सुना। इनसे शब्द मिले — लेकिन मैं किसी का शिष्य नहीं हूँ। जो मैंने देखा, वो अपनी आँखों से देखा। अकेले।",
  },
  quote: {
    en: "“To see a thing exactly as it is — that is true dharma. To mould it to suit your comfort — that is adharma.”",
    hinglish: "“Jo cheez jaisi hai, usko vaisa dekhna — yahi asli dharma hai. Comfort ke hisaab se use mold kar lena — adharma hai.”",
    hi: "“जो चीज़ जैसी है, उसको वैसा देखना — यही असली धर्म है। आराम के हिसाब से उसे मोड़ लेना — अधर्म है।”",
  },
  label2: { en: "What I Saw", hinglish: "Jo Dekha", hi: "जो देखा" },
  para3: {
    en: "I saw it in society — a pretense is running. Few follow real dharma, perhaps don't even know it. They just mould religion to suit their convenience. I saw speciesism — at the level of species, of power and money, of caste, and the biggest: gender. At every level the same pattern — everyone finds someone to place below themselves.",
    hinglish: "Society mein dekha — ek aadambar chal raha hai. Jo asli dharm hai log usko follow nahi karte, shayad jaante bhi nahi. Bas apni suwidha ke hisaab se religion ko mold kar lete hain. Speciesism dekha — species level pe, power-money level pe, varna level pe, aur sabse bada: gender level pe. Har ek level pe ek hi pattern — koi na koi apne se neeche dhoondh leta hai.",
    hi: "समाज में देखा — एक आडंबर चल रहा है। जो असली धर्म है लोग उसको फॉलो नहीं करते, शायद जानते भी नहीं। बस अपनी सुविधा के हिसाब से धर्म को मोड़ लेते हैं। स्पीशीज़िज़्म देखा — प्रजाति के स्तर पर, ताकत-पैसे के स्तर पर, वर्ण के स्तर पर, और सबसे बड़ा: जेंडर के स्तर पर। हर स्तर पर एक ही पैटर्न — कोई न कोई अपने से नीचे ढूँढ लेता है।",
  },
  label3: { en: "A Great Loss", hinglish: "Ek Bada Loss", hi: "एक बड़ा नुकसान" },
  para4a: {
    en: "There was a great loss in my life — losing my mother. She had three heart attacks. The first two times she didn't even tell anyone. It was society's pressure — a woman hid her pain, because perhaps she felt what good would speaking do. I cannot forget this.",
    hinglish: "Meri life mein ek bada loss hua — meri maa ka jaana. Unhe teen baar heart attack aaya. Pehle do baar unhone kisi ko bataya bhi nahi. Yeh society ka dabaaw tha — ek aurat ne apna dard chhupaaya, kyunki shayad lagta tha ki kehne se kya hoga. Yeh mujhe nahi bhoolti.",
    hi: "मेरी ज़िंदगी में एक बड़ा नुकसान हुआ — मेरी माँ का जाना। उन्हें तीन बार हार्ट अटैक आया। पहले दो बार उन्होंने किसी को बताया भी नहीं। यह समाज का दबाव था — एक औरत ने अपना दर्द छुपाया, क्योंकि शायद लगता था कि कहने से क्या होगा। यह मुझे नहीं भूलती।",
  },
  para4b: {
    en: "I want this mindset to change. Treating a woman as weak, and always making her the one to compromise — this is not right.",
    hinglish: "Main chahta hun ki yeh mansikta badle. Aurat ko kamzor samajhna, hamesha compromise karna aurat ko hi padta hai — yeh sahi nahi hai.",
    hi: "मैं चाहता हूँ कि यह मानसिकता बदले। औरत को कमज़ोर समझना, हमेशा समझौता औरत को ही करना पड़ता है — यह सही नहीं है।",
  },
  label4: { en: "Hence, Asli Dharmi", hinglish: "Isliye Asli Dharmi", hi: "इसलिए असली धर्मी" },
  para5: {
    en: "Asli Dharmi is the result of all this. I saw concentration of power, taxes paid to the government with nothing in return, the exploitation of women. And one thought formed: speaking against what looks wrong is not enough. You have to build alternatives. That's why — not just content, but ground projects too.",
    hinglish: "Asli Dharmi in sab ka result hai. Power concentration dekha, government ko tax bhaarta dekha aur badlay mein kuch nahi, women ka shoshan dekha. Aur ek soch bani: jo cheez galat dikh rahi hai, uske against bolna kafi nahi. Uske alternative banaane padte hain. Isliye sirf content nahi — ground projects bhi.",
    hi: "असली धर्मी इन सब का परिणाम है। ताकत का केंद्रीकरण देखा, सरकार को टैक्स भरते देखा और बदले में कुछ नहीं, महिलाओं का शोषण देखा। और एक सोच बनी: जो चीज़ ग़लत दिख रही है, उसके ख़िलाफ़ बोलना काफ़ी नहीं। उसके विकल्प बनाने पड़ते हैं। इसलिए सिर्फ़ कंटेंट नहीं — ज़मीनी प्रोजेक्ट भी।",
  },

  notEyebrow: { en: "Clearly", hinglish: "Clearly", hi: "साफ़ तौर पर" },
  notHeading1: { en: "What This Is ", hinglish: "Yeh Kya ", hi: "यह क्या " },
  notHeadingEm: { en: "Not", hinglish: "Nahi", hi: "नहीं" },
  notItems: [
    {
      en: "This is not a religion-bashing channel. I am Hindu, I've read the scriptures, and I respect them. But superstition and dharma are not the same.",
      hinglish: "Yeh religion-bashing channel nahi hai. Main Hindu hun, scriptures padhe hain, unka respect bhi karta hun. Lekin andhvishwas aur dharma ek nahi hain.",
      hi: "यह धर्म पर हमला करने वाला चैनल नहीं है। मैं हिंदू हूँ, ग्रंथ पढ़े हैं, उनका सम्मान भी करता हूँ। लेकिन अंधविश्वास और धर्म एक नहीं हैं।",
    },
    {
      en: "This is not a platform for Hindu pride or any nationalism. No religion's or party's flag will fly here.",
      hinglish: "Yeh Hindu pride ya kisi bhi nationalism ka platform nahi hai. Koi bhi religion ya party ka jhanda yahan nahi chalega.",
      hi: "यह हिंदू गौरव या किसी भी राष्ट्रवाद का मंच नहीं है। किसी भी धर्म या पार्टी का झंडा यहाँ नहीं चलेगा।",
    },
    {
      en: "This is not atheism propaganda. Scientific temperament and genuine spiritual inquiry can go together — for me, they do.",
      hinglish: "Yeh atheism ka propaganda nahi hai. Scientific temperament aur genuine spiritual inquiry ek saath chal sakte hain — Rajat ke liye chalte hain.",
      hi: "यह नास्तिकता का प्रचार नहीं है। वैज्ञानिक सोच और सच्ची आध्यात्मिक जिज्ञासा साथ चल सकते हैं — मेरे लिए चलते हैं।",
    },
    {
      en: "This is not just a content channel. Reels are a tool — one part of the movement. The other three tools work on the ground.",
      hinglish: "Yeh sirf content channel nahi hai. Reels ek tool hain — movement ka ek hissa. Baaki teen tools ground pe kaam karte hain.",
      hi: "यह सिर्फ़ कंटेंट चैनल नहीं है। रील्स एक टूल हैं — आंदोलन का एक हिस्सा। बाक़ी तीन टूल ज़मीन पर काम करते हैं।",
    },
  ],

  toolsLabel: { en: "4 Tools", hinglish: "4 Tools", hi: "4 टूल" },
  toolsHeading: { en: "Asli Dharmi: ", hinglish: "Asli Dharmi: ", hi: "असली धर्मी: " },
  toolsHeadingEm: { en: "Not Just a Channel", hinglish: "Sirf Ek Channel Nahi", hi: "सिर्फ़ एक चैनल नहीं" },
  toolsIntro: {
    en: "This is a 4-tool movement. One thread runs through all: make people independent, not dependent.",
    hinglish: "Yeh ek 4-tool movement hai. In sab mein ek hi sutra: insaan ko independent banana, dependent nahi.",
    hi: "यह एक 4-टूल आंदोलन है। इन सब में एक ही सूत्र: इंसान को आत्मनिर्भर बनाना, परनिर्भर नहीं।",
  },
  tools: [
    {
      href: "/content",
      title: { en: "Content Creation", hinglish: "Content Creation", hi: "कंटेंट क्रिएशन" },
      body: {
        en: "Reels, essays, long-form — giving philosophy a voice. Gyani Tau asks, Saakshi answers.",
        hinglish: "Reels, essays, long-form — philosophy ko voice dena. Gyani Tau puchhta hai, Saakshi jawab deti hai.",
        hi: "रील्स, निबंध, लॉन्ग-फ़ॉर्म — दर्शन को आवाज़ देना। ज्ञानी ताऊ पूछता है, साक्षी जवाब देती है।",
      },
    },
    {
      href: "/kaam#women",
      title: { en: "Women Empowerment", hinglish: "Women Empowerment", hi: "महिला सशक्तिकरण" },
      body: {
        en: "Skill + income source for rural women. Layer 1: skill training. Layer 2: marketplace platform.",
        hinglish: "Gaon ki ladies ko skill + income source. Layer 1: skill training. Layer 2: marketplace platform.",
        hi: "गाँव की महिलाओं को स्किल + आय का स्रोत। लेयर 1: स्किल ट्रेनिंग। लेयर 2: मार्केटप्लेस प्लेटफ़ॉर्म।",
      },
    },
    {
      href: "/kaam#systems",
      title: { en: "Self-Sustainable Systems", hinglish: "Self-Sustainable Systems", hi: "आत्मनिर्भर सिस्टम" },
      body: {
        en: "Hill Homestay (Nani ka Ghar, Jawar, Garhwal) + Panchmukhi Village Hub — a 5-in-1 rural service center.",
        hinglish: "Hill Homestay (Nani ka Ghar, Jawar, Garhwal) + Panchmukhi Village Hub — 5-in-1 rural service center.",
        hi: "हिल होमस्टे (नानी का घर, जवार, गढ़वाल) + पंचमुखी विलेज हब — 5-इन-1 ग्रामीण सेवा केंद्र।",
      },
    },
    {
      href: "/kaam#sangha",
      title: { en: "Sangha & Community", hinglish: "Sangha & Community", hi: "संघ और समुदाय" },
      body: {
        en: "Sangha App — 1-tap SOS for elders + a hyper-local community help feed.",
        hinglish: "Sangha App — 1-tap SOS for elders + hyper-local community help feed.",
        hi: "संघ ऐप — बुज़ुर्गों के लिए 1-टैप SOS + हाइपर-लोकल कम्युनिटी हेल्प फ़ीड।",
      },
    },
  ],

  ctaHeading: { en: "If it resonates — come inside", hinglish: "Agar resonance ho — andar aao", hi: "अगर बात जमे — अंदर आओ" },
  ctaSub: { en: "Not just a follower — become a participant.", hinglish: "Sirf follower nahi — participant bano.", hi: "सिर्फ़ फ़ॉलोअर नहीं — सहभागी बनो।" },
  ctaJoin: { en: "Join the Movement", hinglish: "Movement Mein Shaamil Ho", hi: "आंदोलन में जुड़ें" },
  ctaPhilosophy: { en: "Read Our Philosophy", hinglish: "Hamaari Soch Padho", hi: "हमारी सोच पढ़ें" },
} as const;

function ParallaxHero({ src, alt, children }: { src: string; alt: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image src={src} alt={alt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-charcoal/60" />
      </motion.div>
      <motion.div style={{ opacity }} className="relative z-10 h-full flex items-end pb-20 px-6 md:px-16">
        {children}
      </motion.div>
    </div>
  );
}

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const { lang } = useLang();

  return (
    <main className="bg-cream text-charcoal">

      {/* ── PARALLAX HERO ── */}
      <ParallaxHero src="/images/about-rajat-bg.jpg" alt="Pahari hills at golden hour">
        <div className="max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre mb-4">
            {tx(C.heroEyebrow, lang)}
          </p>
          <h1 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92] mb-6">
            {tx(C.heroTitle, lang)}<br />
            <span className="italic text-ochre">{tx(C.heroTitleItalic, lang)}</span>
          </h1>
          <p className="font-sans text-lg text-cream/60 max-w-xl leading-relaxed">
            {tx(C.heroSub, lang)}
          </p>
        </div>
      </ParallaxHero>

      {/* ── STORY ── */}
      <section className="px-6 md:px-16 py-28 max-w-4xl mx-auto">
        <div className="space-y-16">

          <RevealBlock>
            <div className="w-px h-16 bg-ochre/40 mb-12" />
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">{tx(C.label1, lang)}</p>
            <p className="font-sans text-xl md:text-2xl text-charcoal/80 leading-relaxed">
              {tx(C.para1, lang)}
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed">
              {tx(C.para2, lang)}
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <blockquote className="border-l-2 border-ochre/40 pl-8 py-2">
              <p className="font-heading text-2xl md:text-3xl text-charcoal italic leading-relaxed">
                {tx(C.quote, lang)}
              </p>
            </blockquote>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">{tx(C.label2, lang)}</p>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed">
              {tx(C.para3, lang)}
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">{tx(C.label3, lang)}</p>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed">
              {tx(C.para4a, lang)}
              <br /><br />
              {tx(C.para4b, lang)}
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">{tx(C.label4, lang)}</p>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed">
              {tx(C.para5, lang)}
            </p>
          </RevealBlock>

        </div>
      </section>

      {/* ── WHAT THIS IS NOT ── */}
      <section className="px-6 md:px-16 py-24 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-6">{tx(C.notEyebrow, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-cream font-semibold mb-12 leading-tight">
              {tx(C.notHeading1, lang)}<em>{tx(C.notHeadingEm, lang)}</em>{lang === "en" ? "" : tx({ en: "", hinglish: " Hai", hi: " है" }, lang)}
            </h2>
          </RevealBlock>
          <div className="space-y-6">
            {C.notItems.map((item, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="flex gap-6 items-start">
                  <span className="text-ochre/40 font-sans text-sm mt-1 shrink-0">✗</span>
                  <p className="font-sans text-base text-cream/60 leading-relaxed">{tx(item, lang)}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE MOVEMENT ── */}
      <section className="px-6 md:px-16 py-28 max-w-5xl mx-auto">
        <RevealBlock>
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">{tx(C.toolsLabel, lang)}</p>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-10 leading-tight">
            {tx(C.toolsHeading, lang)}<em className="text-ochre">{tx(C.toolsHeadingEm, lang)}</em>
          </h2>
          <p className="font-sans text-lg text-charcoal/60 leading-relaxed mb-16 max-w-2xl">
            {tx(C.toolsIntro, lang)}
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {C.tools.map((tool, i) => (
            <RevealBlock key={i} delay={i * 0.1}>
              <Link href={tool.href} className="block group p-8 border border-charcoal/10 hover:border-ochre/30 transition-colors duration-300 rounded-sm">
                <span className="font-heading text-4xl text-ochre/15 group-hover:text-ochre/35 font-bold block mb-4 transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">{tx(tool.title, lang)}</h3>
                <p className="font-sans text-sm text-charcoal/50 leading-relaxed">{tx(tool.body, lang)}</p>
              </Link>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-16 py-20 border-t border-charcoal/10">
        <div className="max-w-2xl mx-auto text-center">
          <RevealBlock>
            <div className="w-px h-12 bg-ochre/40 mx-auto mb-10" />
            <h3 className="font-heading text-3xl text-charcoal font-semibold mb-4">
              {tx(C.ctaHeading, lang)}
            </h3>
            <p className="font-sans text-base text-charcoal/50 mb-8">{tx(C.ctaSub, lang)}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/join" className="px-8 py-4 bg-ochre text-cream font-sans text-xs tracking-widest uppercase hover:bg-charcoal transition-colors duration-300 rounded-sm">
                {tx(C.ctaJoin, lang)}
              </Link>
              <Link href="/philosophy" className="px-8 py-4 border border-charcoal/20 text-charcoal font-sans text-xs tracking-widest uppercase hover:border-charcoal/50 transition-all duration-300 rounded-sm">
                {tx(C.ctaPhilosophy, lang)}
              </Link>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-charcoal/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-charcoal/40">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-charcoal/40">
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">Instagram</a>
          <Link href="/philosophy" className="hover:text-charcoal transition-colors">Philosophy</Link>
          <a href="mailto:aslidharmi@gmail.com" className="hover:text-charcoal transition-colors">Contact</a>
        </div>
      </footer>
    </main>
  );
}
