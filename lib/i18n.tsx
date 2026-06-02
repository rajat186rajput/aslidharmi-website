"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "hi" | "hinglish";

export const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  hinglish: "HG",
  hi: "हिं",
};

// ─── Translations ─────────────────────────────────────────────────────────────

export const t = {
  nav: {
    // ── Live nav (6 IA items): brand · soch · products · skills · help · join ──
    soch:      { en: "Our Soch",            hinglish: "Hamari Soch",          hi: "हमारी सोच" },
    products:  { en: "Products & Services", hinglish: "Products & Services",  hi: "उत्पाद और सेवाएँ" },
    skills:    { en: "Skills",              hinglish: "Skills",               hi: "कौशल" },
    help:      { en: "Help Us",             hinglish: "Help Us",              hi: "सहयोग करें" },
    join:      { en: "Join",                hinglish: "Shaamil Ho",           hi: "जुड़िए" },
    brand:     { en: "Asli Dharmi",         hinglish: "Asli Dharmi",          hi: "असली धर्मी" },
    // ── Legacy keys (kept — still referenced by footers / old links) ──
    about:     { en: "About",         hinglish: "Hamare Baare Mein", hi: "हमारे बारे में" },
    philosophy:{ en: "Philosophy",    hinglish: "Hamaari Soch",      hi: "दर्शन" },
    kaam:      { en: "Our Work",      hinglish: "Hamare Kaam",       hi: "हमारे काम" },
    content:   { en: "Content",       hinglish: "Reels & Essays",    hi: "सामग्री" },
    paisa:     { en: "Finances",      hinglish: "Paisa",             hi: "पैसा" },
  },
  hero: {
    label:   { en: "A philosophy movement · India", hinglish: "Ek philosophy movement · India", hi: "एक दर्शन आंदोलन · भारत" },
    line1:   { en: "Labeled as Adharmi,",           hinglish: "Adharmi label,",                 hi: "अधर्मी का लेबल," },
    line2:   { en: "but a dharmic mind.",            hinglish: "dharmi soch.",                   hi: "धर्मी सोच।" },
    sub:     {
      en:       "Those who truly think rarely fit a single label. Asli Dharmi is for those who want to live their questions.",
      hinglish: "Jo sach mein sochta hai — woh kabhi ek label mein fit nahi hota. Asli Dharmi unke liye hai jo apne sawaalon ko jeena chahte hain.",
      hi:       "जो सच में सोचता है — वह कभी एक लेबल में फिट नहीं होता। असली धर्मी उनके लिए है जो अपने सवालों को जीना चाहते हैं।",
    },
    cta1:    { en: "Join the Movement", hinglish: "Movement Mein Judiye", hi: "आंदोलन में जुड़ें" },
    cta2:    { en: "Read the Philosophy", hinglish: "Philosophy Padhiye", hi: "दर्शन पढ़ें" },
    scroll:  { en: "Scroll",             hinglish: "Scroll",              hi: "स्क्रॉल" },
  },
  marquee: {
    text: {
      en:       "Dharma · Inquiry · Action · Community · Philosophy · Walk-Talk · Sangha ·",
      hinglish: "Dharma · Inquiry · Action · Community · Philosophy · Walk-Talk · Sangha ·",
      hi:       "धर्म · जिज्ञासा · कर्म · समुदाय · दर्शन · आचरण · संघ ·",
    },
  },
  values: {
    label: { en: "What happens here", hinglish: "Yahan kya hota hai", hi: "यहाँ क्या होता है" },
    items: [
      {
        num: "01",
        title: { en: "Dharma — without a label",        hinglish: "Dharma — bina label ke",     hi: "धर्म — बिना लेबल के" },
        body:  {
          en:       "No sect. No guru. Just one honest question: does what you believe match how you live?",
          hinglish: "Koi sect nahi. Koi guru nahi. Sirf ek seedha sawaal: kya jo soch rahe ho, woh jeena chahte ho?",
          hi:       "कोई संप्रदाय नहीं। कोई गुरु नहीं। बस एक सीधा सवाल: जो सोचते हो, वह जीना चाहते हो?",
        },
      },
      {
        num: "02",
        title: { en: "Walking — not just talking",         hinglish: "Chalna — baat nahi",       hi: "चलना — बात नहीं" },
        body:  {
          en:       "Philosophy is hollow if it stays in words. Here we act.",
          hinglish: "Philosophy tab tak khokhi hai jab tak woh sirf bolne mein rahe. Yahan hum karte hain.",
          hi:       "दर्शन तब तक खोखला है जब तक वह सिर्फ बोलने में रहे। यहाँ हम करते हैं।",
        },
      },
      {
        num: "03",
        title: { en: "Together — not alone",                hinglish: "Milkar — akele nahi",      hi: "मिलकर — अकेले नहीं" },
        body:  {
          en:       "One person alone doesn't go far. We walk together — each helping the other.",
          hinglish: "Ek akela insaan zyada dur nahi jaata. Saath chalte hain — ek doosre ki madad se.",
          hi:       "एक अकेला इंसान ज़्यादा दूर नहीं जाता। साथ चलते हैं — एक दूसरे की मदद से।",
        },
      },
    ],
  },
  quote: {
    text:   {
      en:       "If an idea makes you comfortable, question it.",
      hinglish: "Agar koi idea tumhe comfortable feel karata hai, uspe shak karo.",
      hi:       "अगर कोई विचार तुम्हें आरामदायक महसूस कराता है, उस पर शक करो।",
    },
    attr: { en: "— Core Belief 02, Asli Dharmi", hinglish: "— Core Belief 02, Asli Dharmi", hi: "— मूल विश्वास 02, असली धर्मी" },
    cta:  { en: "Read all 10 beliefs →",          hinglish: "Saari 10 beliefs padhiye →",    hi: "सभी 10 विश्वास पढ़ें →" },
  },
  joinCta: {
    ready: { en: "Are you ready to walk?",       hinglish: "Kya aap ready hain chalne ke liye?", hi: "क्या आप चलने के लिए तैयार हैं?" },
    sub:   {
      en:       "No fee. No membership. Just one honest conversation — who you are and what you want to do.",
      hinglish: "Koi fee nahi. Koi membership nahi. Sirf ek honest conversation — tum kaun ho aur kya karna chahte ho.",
      hi:       "कोई शुल्क नहीं। कोई सदस्यता नहीं। बस एक ईमानदार बातचीत — तुम कौन हो और क्या करना चाहते हो।",
    },
    cta: { en: "Join — Now →", hinglish: "Judiye — Abhi →", hi: "जुड़ें — अभी →" },
  },
  home: {
    servicesLabel: { en: "What We Do", hinglish: "Hum Kya Karte Hain", hi: "हम क्या करते हैं" },
    servicesTitle: { en: "Four Works, One Mission", hinglish: "Char Kaam, Ek Mission", hi: "चार काम, एक मिशन" },
    servicesIntro: {
      en:       "Asli Dharmi isn't just a thought — it's work on the ground. Every effort has one aim: to make people independent, not dependent.",
      hinglish: "Asli Dharmi sirf soch nahi — zameen pe kaam hai. Har kaam ka ek hi maqsad: insaan ko dependent nahi, independent banana.",
      hi:       "असली धर्मी सिर्फ़ सोच नहीं — ज़मीन पर काम है। हर काम का एक ही मक़सद: इंसान को परतंत्र नहीं, स्वतंत्र बनाना।",
    },
    learnMore: { en: "Learn More →", hinglish: "Aur Jaano →", hi: "और जानो →" },
    services: [
      {
        num: "01",
        href: "/hamari-soch#kaam",
        status: { en: "Active", hinglish: "Active", hi: "सक्रिय" },
        title:  { en: "Content Creation", hinglish: "Content Creation", hi: "कंटेंट क्रिएशन" },
        desc:   {
          en:       "Philosophy through reels, essays and podcasts — so people learn to ask questions, not just be entertained.",
          hinglish: "Philosophy ko reels, essays aur podcast mein — taaki log sawaal poochhna seekhein, sirf entertain na hon.",
          hi:       "दर्शन को रील, निबंध और पॉडकास्ट में — ताकि लोग सवाल पूछना सीखें, सिर्फ़ मनोरंजन न हो।",
        },
      },
      {
        num: "02",
        href: "/hamari-soch#kaam",
        status: { en: "Planning", hinglish: "Planning", hi: "योजना में" },
        title:  { en: "Women Empowerment", hinglish: "Women Empowerment", hi: "महिला सशक्तिकरण" },
        desc:   {
          en:       "Skills and income for rural women — not charity, but dignity. From training all the way to the marketplace.",
          hinglish: "Gaon ki mahilaon ko skill aur income ka zariya — daan nahi, dignity. Training se marketplace tak.",
          hi:       "गाँव की महिलाओं को कौशल और आय का ज़रिया — दान नहीं, सम्मान। प्रशिक्षण से बाज़ार तक।",
        },
      },
      {
        num: "03",
        href: "/hamari-soch#kaam",
        status: { en: "Build 2027–28", hinglish: "Build 2027–28", hi: "निर्माण 2027–28" },
        title:  { en: "Self-Sustainable Systems", hinglish: "Self-Sustainable Systems", hi: "आत्मनिर्भर तंत्र" },
        desc:   {
          en:       "Hill Homestay and the Panchmukhi Village Hub — services where neither government nor corporates reach.",
          hinglish: "Hill Homestay aur Panchmukhi Village Hub — wahaan services jahaan government aur corporate nahi pahunchte.",
          hi:       "हिल होमस्टे और पंचमुखी विलेज हब — वहाँ सेवाएँ जहाँ न सरकार पहुँचती है, न कॉरपोरेट।",
        },
      },
      {
        num: "04",
        href: "/hamari-soch#kaam",
        status: { en: "MVP 2027", hinglish: "MVP 2027", hi: "MVP 2027" },
        title:  { en: "Sangha & Community", hinglish: "Sangha & Community", hi: "संघ और समुदाय" },
        desc:   {
          en:       "1-tap SOS for elders and a hyper-local help network — no ads, no algorithm, no surveillance.",
          hinglish: "Bujurgon ke liye 1-tap SOS aur hyper-local madad ka network — bina ads, bina algorithm, bina surveillance.",
          hi:       "बुज़ुर्गों के लिए 1-टैप SOS और हाइपर-लोकल मदद का नेटवर्क — बिना विज्ञापन, बिना एल्गोरिदम, बिना निगरानी।",
        },
      },
    ],
    link1: { en: "Our Philosophy — 10 Beliefs →", hinglish: "Hamaari Soch — 10 Vishwas →", hi: "हमारी सोच — 10 विश्वास →" },
    link2: { en: "Problems Board →",               hinglish: "Samasya Board →",            hi: "समस्या बोर्ड →" },
    link3: { en: "Help Us — Full Transparency →", hinglish: "Help Us — Poora Hisaab →",     hi: "सहयोग करें — पूरा हिसाब →" },
  },
  footer: {
    copy:    { en: "© 2026 Asli Dharmi — Philosophy in Action", hinglish: "© 2026 Asli Dharmi — Philosophy in Action", hi: "© 2026 असली धर्मी — कर्म में दर्शन" },
    contact: { en: "Contact", hinglish: "Contact", hi: "संपर्क" },
  },
} as const;

export function tx(key: { en: string; hinglish: string; hi: string }, lang: Lang): string {
  return key[lang];
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangCtx>({ lang: "hinglish", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hinglish");

  useEffect(() => {
    const saved = localStorage.getItem("ad-lang") as Lang | null;
    if (saved && ["en", "hi", "hinglish"].includes(saved)) setLangState(saved);
  }, []);

  // Expose active language to CSS (Devanagari needs looser line-height than Latin)
  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ad-lang", l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
