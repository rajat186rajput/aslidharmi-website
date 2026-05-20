"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { useLang, tx } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tri = { en: string; hinglish: string; hi: string };

function ParallaxSection({
  id, src, alt, eyebrow, number, title, titleItalic, body, children, dark = false,
}: {
  id?: string; src: string; alt: string; eyebrow: string; number: string;
  title: string; titleItalic?: string; body: string; children?: React.ReactNode; dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${dark ? "bg-charcoal" : "bg-cream"}`}>
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

const C = {
  introEyebrow: { en: "Movement", hinglish: "Movement", hi: "मूवमेंट" },
  introH1: { en: "Our Work —", hinglish: "Hamare Kaam —", hi: "हमारे काम —" },
  introH1em: { en: "4 Tools, 1 Mission", hinglish: "4 Tools, 1 Mission", hi: "4 टूल, 1 मिशन" },
  introBody: {
    en: "Asli Dharmi is a platform not just for speaking, but for doing. Every tool runs on one thread: make people independent, not dependent.",
    hinglish: "Asli Dharmi sirf bolne ka nahi, karne ka bhi platform hai. Har tool ek hi sutra se chal raha hai: insaan ko independent banana, dependent nahi.",
    hi: "असली धर्मी सिर्फ़ बोलने का नहीं, करने का भी मंच है। हर टूल एक ही सूत्र पर चलता है: इंसान को आत्मनिर्भर बनाना, परनिर्भर नहीं।",
  },
  pill1: { en: "Content Creation", hinglish: "Content Creation", hi: "कंटेंट क्रिएशन" },
  pill2: { en: "Women Empowerment", hinglish: "Women Empowerment", hi: "महिला सशक्तिकरण" },
  pill3: { en: "Self-Sustainable Systems", hinglish: "Self-Sustainable Systems", hi: "आत्मनिर्भर सिस्टम" },
  pill4: { en: "Sangha & Community", hinglish: "Sangha & Community", hi: "संघ और समुदाय" },

  // 01 Content
  c1Eyebrow: { en: "Tool 01 · Active", hinglish: "Tool 01 · Active", hi: "टूल 01 · सक्रिय" },
  c1Title: { en: "Content Creation", hinglish: "Content Creation", hi: "कंटेंट क्रिएशन" },
  c1Italic: { en: "Giving philosophy a voice", hinglish: "Philosophy ko voice dena", hi: "दर्शन को आवाज़ देना" },
  c1Body: {
    en: "Reels, essays, podcasts — keeping philosophy in an accessible format. Not just to entertain — to question. Gyani Tau asks, Saakshi answers. The goal isn't \"make people quit X\" — it's that people learn to ask questions themselves.",
    hinglish: "Reels, essays, podcasts — philosophy ko accessible format mein rakhna. Sirf entertain karna nahi — sawaal puchhna. Gyani Tau sawaal karta hai, Saakshi jawab deti hai. Goal: log 'X chhod den' nahin — log khud sawaal puchhna seekhen.",
    hi: "रील्स, निबंध, पॉडकास्ट — दर्शन को सुलभ रूप में रखना। सिर्फ़ मनोरंजन नहीं — सवाल पूछना। ज्ञानी ताऊ सवाल करता है, साक्षी जवाब देती है। लक्ष्य: लोग 'X छोड़ दें' नहीं — लोग खुद सवाल पूछना सीखें।",
  },
  c1cardFmtL: { en: "Format", hinglish: "Format", hi: "फ़ॉर्मेट" },
  c1cardFmt: {
    en: "Short Reels (Instagram + YouTube). Long-form essays (website). Podcast — future.",
    hinglish: "Short Reels (Instagram + YouTube). Long-form essays (website). Podcast — future.",
    hi: "शॉर्ट रील्स (इंस्टाग्राम + यूट्यूब)। लॉन्ग-फ़ॉर्म निबंध (वेबसाइट)। पॉडकास्ट — भविष्य में।",
  },
  c1cardCharL: { en: "Characters", hinglish: "Characters", hi: "किरदार" },
  c1cardChar: {
    en: "Gyani Tau (asks) — Danish Khan voice. Saakshi (answers) — Devanagari TTS, calm authority.",
    hinglish: "Gyani Tau (Sawaal) — Danish Khan voice. Saakshi (Jawab) — Devanagari TTS, calm authority.",
    hi: "ज्ञानी ताऊ (सवाल) — दानिश ख़ान आवाज़। साक्षी (जवाब) — देवनागरी TTS, शांत अधिकार।",
  },
  c1cardTopL: { en: "Topics", hinglish: "Topics", hi: "विषय" },
  c1cardTop: {
    en: "Dharma vs Superstition. Speciesism. Gender discrimination. Science + Spirituality. Self-sustainability.",
    hinglish: "Dharma vs Andhvishwas. Speciesism. Gender discrimination. Science + Spirituality. Self-sustainability.",
    hi: "धर्म बनाम अंधविश्वास। स्पीशीज़िज़्म। जेंडर भेदभाव। विज्ञान + अध्यात्म। आत्मनिर्भरता।",
  },
  c1Link: { en: "Watch Reels →", hinglish: "Reels Dekho →", hi: "रील्स देखो →" },

  // 02 Women
  c2Eyebrow: { en: "Tool 02 · Planning Phase", hinglish: "Tool 02 · Planning Phase", hi: "टूल 02 · योजना चरण" },
  c2Title: { en: "Women Empowerment", hinglish: "Women Empowerment", hi: "महिला सशक्तिकरण" },
  c2Italic: { en: "Give skill, give income, set free", hinglish: "Skill do, income do, aazaad karo", hi: "स्किल दो, आय दो, आज़ाद करो" },
  c2Body: {
    en: "Giving village women a skill and then connecting them to the market. Low margin is fine — that's a principle, not a compromise. Not charity — skill + income source. Layer 1: skill training (tailoring, food, handicrafts, digital). Layer 2: a marketplace platform for the skilled (rural + semi-urban + urban).",
    hinglish: "Gaon ki ladies ko skill dena aur phir market tak pohanchana. Low margin chalega — yeh principle hai, compromise nahi. Daan nahi — skill + income source. Layer 1: skill training (tailoring, food, handicrafts, digital). Layer 2: marketplace platform for skilled (rural + semi-urban + urban).",
    hi: "गाँव की महिलाओं को स्किल देना और फिर बाज़ार तक पहुँचाना। कम मार्जिन चलेगा — यह सिद्धांत है, समझौता नहीं। दान नहीं — स्किल + आय का स्रोत। लेयर 1: स्किल ट्रेनिंग (सिलाई, खाद्य, हस्तशिल्प, डिजिटल)। लेयर 2: कुशल लोगों के लिए मार्केटप्लेस (ग्रामीण + अर्ध-शहरी + शहरी)।",
  },
  c2L1L: { en: "Layer 1 — Skill Provision", hinglish: "Layer 1 — Skill Provision", hi: "लेयर 1 — स्किल प्रदान" },
  c2L1: {
    en: "For the unskilled — Tailoring, food processing, handicrafts, digital basics, care services. Priority: rural women.",
    hinglish: "Unskilled ke liye — Tailoring, food processing, handicrafts, digital basics, care services. Priority: rural women.",
    hi: "अकुशल के लिए — सिलाई, खाद्य प्रसंस्करण, हस्तशिल्प, डिजिटल बेसिक्स, केयर सेवाएँ। प्राथमिकता: ग्रामीण महिलाएँ।",
  },
  c2L2L: { en: "Layer 2 — Platform for Skilled", hinglish: "Layer 2 — Platform for Skilled", hi: "लेयर 2 — कुशल के लिए मंच" },
  c2L2: {
    en: "For the skilled — discovery, showcase, order-routing, fair-margin fulfilment. Rural + semi-urban + urban.",
    hinglish: "Skilled ke liye — discovery, showcase, order-routing, fair-margin fulfilment. Rural + semi-urban + urban.",
    hi: "कुशल के लिए — खोज, प्रदर्शन, ऑर्डर-रूटिंग, उचित-मार्जिन फ़ुलफ़िलमेंट। ग्रामीण + अर्ध-शहरी + शहरी।",
  },
  c2pill1: { en: "Rural Women First", hinglish: "Rural Women First", hi: "ग्रामीण महिलाएँ पहले" },
  c2pill2: { en: "Anti-Charity", hinglish: "Anti-Charity", hi: "चैरिटी-विरोधी" },
  c2pill3: { en: "Skill Pipeline", hinglish: "Skill Pipeline", hi: "स्किल पाइपलाइन" },
  c2pill4: { en: "Unskilled → Skilled → Platform → Income", hinglish: "Unskilled → Skilled → Platform → Income", hi: "अकुशल → कुशल → मंच → आय" },
  c2PrincipleL: { en: "Principle", hinglish: "Principle", hi: "सिद्धांत" },
  c2Principle: {
    en: "Dignity doesn't come from charity — it comes from a skill and a fair income source. The mission is to bring income within reach of women, village by village, however low the margin. This is a principle, not a compromise.",
    hinglish: "Daan se dignity nahi aati — ek skill aur fair income source se aati hai. Gaon-gaon tak mahilaon ko income tak pahunchana hi maqsad hai, chahe margin kitna bhi kam ho. Yeh principle hai, compromise nahi.",
    hi: "दान से गरिमा नहीं आती — एक स्किल और उचित आय के स्रोत से आती है। गाँव-गाँव तक महिलाओं को आय तक पहुँचाना ही मक़सद है, चाहे मार्जिन कितना भी कम हो। यह सिद्धांत है, समझौता नहीं।",
  },

  // 03 Self-sustainable
  hhEyebrow: { en: "Tool 03 · Anchor 01 · Phase 1 Build: 2028", hinglish: "Tool 03 · Anchor 01 · Phase 1 Build: 2028", hi: "टूल 03 · एंकर 01 · फ़ेज़ 1 निर्माण: 2028" },
  hhTitle: { en: "Hill Homestay —", hinglish: "Hill Homestay —", hi: "हिल होमस्टे —" },
  hhItalic: { en: "Nani ka Ghar", hinglish: "Nani ka Ghar", hi: "नानी का घर" },
  hhBody: {
    en: "Jawar village, Pauri Garhwal — Kanchan's grandmother's house. Not just a homestay, but a 5-layer vision: Dream Home, Boutique Homestay, Village Regeneration, Nani's Legacy, and Conscious Vegan-First Living. Minimise dependence on the government, build your own system.",
    hinglish: "Jawar village, Pauri Garhwal — Kanchan ki nani ka ghar. Yeh sirf ek homestay nahi, ek 5-layer vision hai: Dream Home, Boutique Homestay, Village Regeneration, Nani ki Legacy, aur Conscious Vegan-First Living. Government pe dependence minimise, apna system build karo.",
    hi: "जवार गाँव, पौड़ी गढ़वाल — कंचन की नानी का घर। यह सिर्फ़ एक होमस्टे नहीं, एक 5-परत दृष्टि है: ड्रीम होम, बुटीक होमस्टे, गाँव का पुनर्निर्माण, नानी की विरासत, और सचेत वीगन-फ़र्स्ट जीवन। सरकार पर निर्भरता घटाओ, अपना सिस्टम बनाओ।",
  },
  hhL: [
    { num: "L1", title: { en: "Dream Home", hinglish: "Dream Home", hi: "ड्रीम होम" }, body: { en: "First our home, then a homestay. Home comfort drives every design decision.", hinglish: "Pehle apna ghar, phir homestay. Home comfort drives every design decision.", hi: "पहले अपना घर, फिर होमस्टे। हर डिज़ाइन फ़ैसला घर के आराम से तय।" } },
    { num: "L2", title: { en: "Boutique Stay", hinglish: "Boutique Stay", hi: "बुटीक स्टे" }, body: { en: "₹4,500–6,500/night. 4-6 rooms max. Picky about guests. No calendar pressure.", hinglish: "₹4,500–6,500/night. 4-6 rooms max. Picky about guests. No calendar pressure.", hi: "₹4,500–6,500/रात। अधिकतम 4-6 कमरे। मेहमानों को लेकर चयनात्मक। कैलेंडर का दबाव नहीं।" } },
    { num: "L3", title: { en: "Village Regen.", hinglish: "Village Regen.", hi: "गाँव पुनर्निर्माण" }, body: { en: "Memory Wall, elder stories, craft platform, health + education charity.", hinglish: "Memory Wall, elder stories, craft platform, health + education charity.", hi: "मेमोरी वॉल, बुज़ुर्गों की कहानियाँ, शिल्प मंच, स्वास्थ्य + शिक्षा सहायता।" } },
    { num: "L4", title: { en: "Nani's Legacy", hinglish: "Nani ki Legacy", hi: "नानी की विरासत" }, body: { en: "Entry plaque, preserved chair, Nani's Recipes book (60+ Garhwali dishes).", hinglish: "Entry plaque, preserved chair, Nani ki Recipes book (60+ Garhwali dishes).", hi: "प्रवेश पट्टिका, सहेजी कुर्सी, नानी की रेसिपी किताब (60+ गढ़वाली व्यंजन)।" } },
    { num: "L5", title: { en: "Conscious Living", hinglish: "Conscious Living", hi: "सचेत जीवन" }, body: { en: "Solar + wind, vegan-first kitchen, organic kitchen garden, no synthetic pesticides.", hinglish: "Solar + wind, vegan-first kitchen, organic kitchen garden, no synthetic pesticides.", hi: "सोलर + विंड, वीगन-फ़र्स्ट रसोई, ऑर्गैनिक किचन गार्डन, कोई कृत्रिम कीटनाशक नहीं।" } },
  ],
  hhPills: [
    { en: "Jawar · Pauri Garhwal", hinglish: "Jawar · Pauri Garhwal", hi: "जवार · पौड़ी गढ़वाल" },
    { en: "Off-Grid Solar", hinglish: "Off-Grid Solar", hi: "ऑफ़-ग्रिड सोलर" },
    { en: "Vegan-First Kitchen", hinglish: "Vegan-First Kitchen", hi: "वीगन-फ़र्स्ट रसोई" },
    { en: "₹51–78L Phase 1", hinglish: "₹51–78L Phase 1", hi: "₹51–78L फ़ेज़ 1" },
    { en: "2028 Build", hinglish: "2028 Build", hi: "2028 निर्माण" },
    { en: "Women Caretakers Hired", hinglish: "Women Caretakers Hired", hi: "महिला केयरटेकर नियुक्त" },
  ],
  phEyebrow: { en: "Tool 03 · Anchor 02 · Pilot: 2027", hinglish: "Tool 03 · Anchor 02 · Pilot: 2027", hi: "टूल 03 · एंकर 02 · पायलट: 2027" },
  phTitle: { en: "Panchmukhi Hub —", hinglish: "Panchmukhi Hub —", hi: "पंचमुखी हब —" },
  phItalic: { en: "5-in-1 Village Service", hinglish: "5-in-1 Village Service", hi: "5-इन-1 ग्राम सेवा" },
  phBody: {
    en: "In every hill village — where government and corporate services are absent or unreliable — one physical hub. Operator: a local woman (trained via Women Empowerment Layer 1). Low margin locked — that's a principle, not a bug.",
    hinglish: "Har ek pahari gaon mein — jahan government aur corporate services absent ya unreliable hain — ek physical hub. Operator: local woman (Women Empowerment Layer 1 se trained). Low margin lock — yeh principle hai, bug nahi.",
    hi: "हर पहाड़ी गाँव में — जहाँ सरकारी और कॉरपोरेट सेवाएँ अनुपस्थित या अविश्वसनीय हैं — एक भौतिक हब। संचालक: स्थानीय महिला (महिला सशक्तिकरण लेयर 1 से प्रशिक्षित)। कम मार्जिन तय — यह सिद्धांत है, ख़ामी नहीं।",
  },
  phM: [
    { mukh: "1", title: { en: "Kirana", hinglish: "Kirana", hi: "किराना" }, body: { en: "Daily essentials, OTC medicines, hygiene — direct from Women Empowerment producers.", hinglish: "Daily essentials, OTC medicines, hygiene — direct from Women Empowerment producers.", hi: "रोज़मर्रा का सामान, OTC दवाइयाँ, स्वच्छता — सीधे महिला सशक्तिकरण उत्पादकों से।" } },
    { mukh: "2", title: { en: "Telemedicine", hinglish: "Telemedicine", hi: "टेलीमेडिसिन" }, body: { en: "Video consult with city doctors, elder vitals (BP/sugar/SpO2), prescription.", hinglish: "Video consult with city doctors, elder vitals (BP/sugar/SpO2), prescription.", hi: "शहरी डॉक्टरों से वीडियो परामर्श, बुज़ुर्गों के वाइटल्स (BP/शुगर/SpO2), पर्चा।" } },
    { mukh: "3", title: { en: "Education", hinglish: "Education", hi: "शिक्षा" }, body: { en: "Online classes for children, computer literacy, exam-prep, Khan Academy Hindi.", hinglish: "Online classes for children, computer literacy, exam-prep, Khan Academy Hindi.", hi: "बच्चों के लिए ऑनलाइन कक्षाएँ, कंप्यूटर साक्षरता, परीक्षा तैयारी, खान अकैडमी हिंदी।" } },
    { mukh: "4", title: { en: "Banking / CSC", hinglish: "Banking / CSC", hi: "बैंकिंग / CSC" }, body: { en: "Cash withdrawal (AePS), Aadhaar, pension, PMJDY, bill payment, train tickets.", hinglish: "Cash withdrawal (AePS), Aadhaar, pension, PMJDY, bill payment, train tickets.", hi: "नकद निकासी (AePS), आधार, पेंशन, PMJDY, बिल भुगतान, ट्रेन टिकट।" } },
    { mukh: "5", title: { en: "Connectivity", hinglish: "Connectivity", hi: "कनेक्टिविटी" }, body: { en: "High-speed internet, Wi-Fi, courier pickup/drop, printing, STD-PCO for elders.", hinglish: "High-speed internet, Wi-Fi, courier pickup/drop, printing, STD-PCO for elders.", hi: "हाई-स्पीड इंटरनेट, वाई-फ़ाई, कूरियर पिकअप/ड्रॉप, प्रिंटिंग, बुज़ुर्गों के लिए STD-PCO।" } },
  ],
  phPills: [
    { en: "₹5.5–9.5L Phase 1", hinglish: "₹5.5–9.5L Phase 1", hi: "₹5.5–9.5L फ़ेज़ 1" },
    { en: "2027 Pilot", hinglish: "2027 Pilot", hi: "2027 पायलट" },
    { en: "Woman Operator", hinglish: "Woman Operator", hi: "महिला संचालक" },
    { en: "Anti-Grant-Dependence", hinglish: "Anti-Grant-Dependence", hi: "अनुदान-निर्भरता विरोधी" },
    { en: "Secular Service", hinglish: "Secular Service", hi: "धर्मनिरपेक्ष सेवा" },
  ],

  // 04 Sangha
  sEyebrow: { en: "Tool 04 · Flagship: Sangha App · 2027 MVP", hinglish: "Tool 04 · Flagship: Sangha App · 2027 MVP", hi: "टूल 04 · फ़्लैगशिप: संघ ऐप · 2027 MVP" },
  sTitle: { en: "Sangha App —", hinglish: "Sangha App —", hi: "संघ ऐप —" },
  sItalic: { en: "Don't stay alone", hinglish: "Akele mat rehna", hi: "अकेले मत रहना" },
  sBody: {
    en: "Many elders live alone — in an emergency no one reaches in time, and sometimes they don't even tell anyone. The Sangha App breaks that silence — 1-tap SOS for elders, a hyper-local community help feed, no algorithm, no ads, no surveillance. Utility first — philosophy later.",
    hinglish: "Bahut se bujurg akele rehte hain — emergency mein koi turant nahi pahunchta, aur kai baar woh kisi ko batate tak nahi. Sangha App us silence ko todta hai — 1-tap SOS for elders, hyper-local community help feed, no algorithm, no ads, no surveillance. Utility pehle — philosophy baad mein.",
    hi: "बहुत से बुज़ुर्ग अकेले रहते हैं — आपात स्थिति में कोई समय पर नहीं पहुँचता, और कई बार वे किसी को बताते तक नहीं। संघ ऐप उस ख़ामोशी को तोड़ता है — बुज़ुर्गों के लिए 1-टैप SOS, हाइपर-लोकल कम्युनिटी हेल्प फ़ीड, कोई एल्गोरिदम नहीं, कोई विज्ञापन नहीं, कोई निगरानी नहीं। उपयोगिता पहले — दर्शन बाद में।",
  },
  sCards: [
    { title: { en: "1-Tap SOS", hinglish: "1-Tap SOS", hi: "1-टैप SOS" }, body: { en: "Elder SOS → 3 nearest family → 3 nearest trusted neighbours → Panchmukhi Hub healthcare coordinator → 108. Location + voice auto-shared. Daily check-in optional.", hinglish: "Elder SOS → 3 nearest family → 3 nearest trusted neighbours → Panchmukhi Hub healthcare coordinator → 108. Location + voice auto-shared. Daily check-in optional.", hi: "बुज़ुर्ग SOS → 3 निकटतम परिवार → 3 निकटतम भरोसेमंद पड़ोसी → पंचमुखी हब हेल्थकेयर कोऑर्डिनेटर → 108। लोकेशन + आवाज़ अपने आप साझा। डेली चेक-इन वैकल्पिक।" } },
    { title: { en: "Community Help Feed", hinglish: "Community Help Feed", hi: "कम्युनिटी हेल्प फ़ीड" }, body: { en: "3 post types only: 'I need help' / 'I can give' / 'Community alert'. No likes, no external shares, no follower-count. Posts expire in 24-72 hrs.", hinglish: "3 post types only: 'I need help' / 'I can give' / 'Community alert'. No likes, no shares-outside, no follower-count. Posts expire in 24-72 hrs.", hi: "सिर्फ़ 3 पोस्ट प्रकार: 'मुझे मदद चाहिए' / 'मैं दे सकता हूँ' / 'कम्युनिटी अलर्ट'। कोई लाइक नहीं, बाहर शेयर नहीं, फ़ॉलोअर-गिनती नहीं। पोस्ट 24-72 घंटे में ख़त्म।" } },
    { title: { en: "Service Directory", hinglish: "Service Directory", hi: "सेवा निर्देशिका" }, body: { en: "Women Empowerment Layer 2 providers listed by skill. One-tap request. Honest reviews — no anonymous shaming.", hinglish: "Women Empowerment Layer 2 providers listed by skill. One-tap request. Honest reviews — no anonymous shaming.", hi: "महिला सशक्तिकरण लेयर 2 प्रदाता स्किल अनुसार सूचीबद्ध। एक-टैप अनुरोध। ईमानदार समीक्षाएँ — कोई गुमनाम बदनामी नहीं।" } },
    { title: { en: "Credit Economy", hinglish: "Credit Economy", hi: "क्रेडिट इकोनॉमी" }, body: { en: "Helping a neighbour earns Asli Dharmi credits — redeemable at Hill Homestay stays or as a stipend.", hinglish: "Helping a neighbour earns Asli Dharmi credits — redeemable at Hill Homestay stays or as stipend.", hi: "पड़ोसी की मदद से असली धर्मी क्रेडिट मिलते हैं — हिल होमस्टे स्टे या स्टाइपेंड के रूप में रिडीम।" } },
  ],
  sPills: [
    { en: "Android First · Hindi First", hinglish: "Android First · Hindi First", hi: "एंड्रॉइड फ़र्स्ट · हिंदी फ़र्स्ट" },
    { en: "No Ads", hinglish: "No Ads", hi: "कोई विज्ञापन नहीं" },
    { en: "No Algorithm", hinglish: "No Algorithm", hi: "कोई एल्गोरिदम नहीं" },
    { en: "No Data Sale", hinglish: "No Data Sale", hi: "कोई डेटा बिक्री नहीं" },
    { en: "Phase 1 MVP: 2027–2028", hinglish: "Phase 1 MVP: 2027–2028", hi: "फ़ेज़ 1 MVP: 2027–2028" },
    { en: "₹10–24L Phase 1", hinglish: "₹10–24L Phase 1", hi: "₹10–24L फ़ेज़ 1" },
  ],
  sWhyL: { en: "Why", hinglish: "Kyun", hi: "क्यों" },
  sWhy: {
    en: "The aim is simple — every elder should have an option to call for help with one tap. For those living alone, this safety net is the first need; everything else comes after.",
    hinglish: "Maqsad simple hai — har bujurg ke paas ek aisa option ho jisse woh ek tap mein madad bula sake. Akele rehne walon ke liye yeh safety net pehli zaroorat hai, baaki sab uske baad.",
    hi: "मक़सद सरल है — हर बुज़ुर्ग के पास एक ऐसा विकल्प हो जिससे वह एक टैप में मदद बुला सके। अकेले रहने वालों के लिए यह सुरक्षा-कवच पहली ज़रूरत है, बाक़ी सब उसके बाद।",
  },

  // Credit Economy
  ceLabel: { en: "Cross-Cutting Mechanism", hinglish: "Cross-Cutting Mechanism", hi: "साझा तंत्र" },
  ceHeadingA: { en: "Asli Dharmi", hinglish: "Asli Dharmi", hi: "असली धर्मी" },
  ceHeadingEm: { en: "Credit Economy", hinglish: "Credit Economy", hi: "क्रेडिट इकोनॉमी" },
  ceIntro: {
    en: "One unified mechanism that links all 4 tools. Volunteer in any sub-system — earn credits. Redeem them at Hill Homestay stays, Panchmukhi Hub priority slots, or training. This isn't charity — it's earned value.",
    hinglish: "Ek unified mechanism jo sab 4 tools ko jodta hai. Volunteer karo kisi bhi sub-system mein — credits milenge. Credits redeem karo Hill Homestay stays mein, ya Panchmukhi Hub priority slots mein, ya training mein. Yeh charity nahi — yeh earned value hai.",
    hi: "एक एकीकृत तंत्र जो चारों टूल को जोड़ता है। किसी भी सब-सिस्टम में वॉलंटियर करो — क्रेडिट मिलेंगे। क्रेडिट हिल होमस्टे स्टे, पंचमुखी हब प्रायोरिटी स्लॉट, या ट्रेनिंग में रिडीम करो। यह चैरिटी नहीं — यह कमाया हुआ मूल्य है।",
  },
  ceCards: [
    { label: { en: "Earn at", hinglish: "Earn at", hi: "कमाओ यहाँ" }, text: { en: "Any sub-system volunteer work", hinglish: "Any sub-system volunteer work", hi: "किसी भी सब-सिस्टम का वॉलंटियर काम" } },
    { label: { en: "Redeem at", hinglish: "Redeem at", hi: "रिडीम यहाँ" }, text: { en: "Hill Homestay · Panchmukhi Hub · Layer 1 Training", hinglish: "Hill Homestay · Panchmukhi Hub · Layer 1 Training", hi: "हिल होमस्टे · पंचमुखी हब · लेयर 1 ट्रेनिंग" } },
    { label: { en: "Hard lock", hinglish: "Hard lock", hi: "हार्ड लॉक" }, text: { en: "NEVER sold for money, NEVER crypto, NEVER gates safety", hinglish: "NEVER sold for money, NEVER crypto, NEVER gates safety", hi: "कभी पैसे में नहीं, कभी क्रिप्टो नहीं, सुरक्षा कभी नहीं रोकता" } },
    { label: { en: "Philosophy", hinglish: "Philosophy", hi: "दर्शन" }, text: { en: "Dignity preserved — earned, not charity", hinglish: "Dignity preserved — earned, not charity", hi: "गरिमा बरक़रार — कमाया, चैरिटी नहीं" } },
  ],

  joinHeading: { en: "If it resonates — come inside", hinglish: "Agar resonance ho — andar aao", hi: "अगर बात जमे — अंदर आओ" },
  joinSub: { en: "No movement is built alone.", hinglish: "Koi movement akele nahi banta.", hi: "कोई मूवमेंट अकेले नहीं बनता।" },
  joinBtn: { en: "Join the Movement →", hinglish: "Movement Mein Shaamil Ho →", hi: "आंदोलन में जुड़ें →" },
} as const;

export default function KaamPage() {
  const { lang } = useLang();
  const T = (k: Tri) => tx(k, lang);

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
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-6">{T(C.introEyebrow)}</p>
          <h1 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92] mb-8">
            {T(C.introH1)}<br />
            <em className="text-ochre">{T(C.introH1em)}</em>
          </h1>
          <p className="font-sans text-xl text-cream/55 max-w-2xl leading-relaxed">
            {T(C.introBody)}
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mt-16">
          {[
            { label: C.pill1, href: "#content" },
            { label: C.pill2, href: "#women" },
            { label: C.pill3, href: "#systems" },
            { label: C.pill4, href: "#sangha" },
          ].map((p) => (
            <a key={p.href} href={p.href}
              className="px-5 py-2.5 border border-cream/15 text-cream/55 font-sans text-xs uppercase tracking-wider hover:border-ochre/50 hover:text-ochre transition-all duration-300 rounded-sm">
              {T(p.label)}
            </a>
          ))}
        </div>
      </section>

      {/* ── 01 CONTENT CREATION ── */}
      <ParallaxSection
        id="content"
        src="/images/about-rajat-bg.jpg"
        alt="Contemplative hills"
        eyebrow={T(C.c1Eyebrow)}
        number="01 /"
        title={T(C.c1Title)}
        titleItalic={T(C.c1Italic)}
        body={T(C.c1Body)}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: C.c1cardFmtL, text: C.c1cardFmt },
            { label: C.c1cardCharL, text: C.c1cardChar },
            { label: C.c1cardTopL, text: C.c1cardTop },
          ].map((item, i) => (
            <RevealBlock key={i} delay={i * 0.1}>
              <div className="p-6 border border-charcoal/10">
                <p className="font-sans text-xs uppercase tracking-wider text-charcoal/40 mb-3">{T(item.label)}</p>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed">{T(item.text)}</p>
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
              {T(C.c1Link)}
            </Link>
          </div>
        </RevealBlock>
      </ParallaxSection>

      {/* ── 02 WOMEN EMPOWERMENT ── */}
      <ParallaxSection
        id="women"
        src="/images/women-empowerment.jpg"
        alt="Rural women artisans working"
        eyebrow={T(C.c2Eyebrow)}
        number="02 /"
        title={T(C.c2Title)}
        titleItalic={T(C.c2Italic)}
        body={T(C.c2Body)}
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { label: C.c2L1L, text: C.c2L1 },
            { label: C.c2L2L, text: C.c2L2 },
          ].map((item, i) => (
            <RevealBlock key={i} delay={i * 0.15}>
              <div className="p-6 border border-cream/10">
                <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-3">{T(item.label)}</p>
                <p className="font-sans text-sm text-cream/60 leading-relaxed">{T(item.text)}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {[C.c2pill1, C.c2pill2, C.c2pill3, C.c2pill4].map((t, i) => <Pill key={i} text={T(t)} dark />)}
        </div>
        <RevealBlock delay={0.2}>
          <div className="mt-8 p-6 border border-ochre/20 max-w-xl">
            <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-2">{T(C.c2PrincipleL)}</p>
            <p className="font-sans text-sm text-cream/50 leading-relaxed">
              {T(C.c2Principle)}
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
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre mb-4">{T(C.hhEyebrow)}</p>
              <h2 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92]">
                <span className="font-sans text-ochre/60 text-2xl block mb-2">03A /</span>
                {T(C.hhTitle)}
                <em className="text-ochre italic block">{T(C.hhItalic)}</em>
              </h2>
            </motion.div>
          </div>
        </div>
        <div className="px-6 md:px-16 py-20 max-w-5xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed mb-12 max-w-2xl">
              {T(C.hhBody)}
            </p>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
            {C.hhL.map((l, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="p-5 border border-charcoal/10 h-full">
                  <span className="font-heading text-3xl text-ochre/20 font-bold block mb-3">{l.num}</span>
                  <p className="font-sans text-xs font-medium text-charcoal uppercase tracking-wide mb-2">{T(l.title)}</p>
                  <p className="font-sans text-xs text-charcoal/50 leading-relaxed">{T(l.body)}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {C.hhPills.map((t, i) => <Pill key={i} text={T(t)} />)}
          </div>
        </div>

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
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre mb-4">{T(C.phEyebrow)}</p>
              <h2 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92]">
                <span className="font-sans text-ochre/60 text-2xl block mb-2">03B /</span>
                {T(C.phTitle)}
                <em className="text-ochre italic block">{T(C.phItalic)}</em>
              </h2>
            </motion.div>
          </div>
        </div>
        <div className="px-6 md:px-16 py-20 max-w-5xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed mb-12 max-w-2xl">
              {T(C.phBody)}
            </p>
          </RevealBlock>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {C.phM.map((m, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="p-5 border border-charcoal/10 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 bg-ochre/20 text-ochre font-heading text-sm flex items-center justify-center rounded-sm font-bold">{m.mukh}</span>
                    <p className="font-sans text-xs font-medium text-charcoal uppercase tracking-wide">{T(m.title)}</p>
                  </div>
                  <p className="font-sans text-xs text-charcoal/50 leading-relaxed">{T(m.body)}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {C.phPills.map((t, i) => <Pill key={i} text={T(t)} />)}
          </div>
        </div>
      </section>

      {/* ── 04 SANGHA & COMMUNITY ── */}
      <ParallaxSection
        id="sangha"
        src="/images/sangha-community.jpg"
        alt="Elderly woman with SOS phone"
        eyebrow={T(C.sEyebrow)}
        number="04 /"
        title={T(C.sTitle)}
        titleItalic={T(C.sItalic)}
        body={T(C.sBody)}
        dark
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {C.sCards.map((item, i) => (
            <RevealBlock key={i} delay={i * 0.1}>
              <div className="p-6 border border-cream/10">
                <p className="font-sans text-xs font-medium text-ochre/70 uppercase tracking-wide mb-3">{T(item.title)}</p>
                <p className="font-sans text-sm text-cream/55 leading-relaxed">{T(item.body)}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap mb-10">
          {C.sPills.map((t, i) => <Pill key={i} text={T(t)} dark />)}
        </div>
        <RevealBlock delay={0.2}>
          <div className="p-6 border border-ochre/20 max-w-xl">
            <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-2">{T(C.sWhyL)}</p>
            <p className="font-sans text-sm text-cream/50 leading-relaxed">
              {T(C.sWhy)}
            </p>
          </div>
        </RevealBlock>
      </ParallaxSection>

      {/* ── CREDIT ECONOMY ── */}
      <section className="px-6 md:px-16 py-24 bg-cream border-t border-charcoal/10">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">{T(C.ceLabel)}</p>
            <h2 className="font-heading text-4xl text-charcoal font-semibold mb-6">
              {T(C.ceHeadingA)} <em className="text-ochre">{T(C.ceHeadingEm)}</em>
            </h2>
            <p className="font-sans text-lg text-charcoal/60 leading-relaxed mb-8 max-w-2xl">
              {T(C.ceIntro)}
            </p>
          </RevealBlock>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {C.ceCards.map((c, i) => (
              <RevealBlock key={i} delay={i * 0.1}>
                <div className="p-5 bg-charcoal/4 border border-charcoal/8">
                  <p className="font-sans text-xs uppercase tracking-wider text-ochre/70 mb-2">{T(c.label)}</p>
                  <p className="font-sans text-sm text-charcoal/65 leading-relaxed">{T(c.text)}</p>
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
              {T(C.joinHeading)}
            </h3>
            <p className="font-sans text-base text-cream/40 mb-8">
              {T(C.joinSub)}
            </p>
            <Link href="/join" className="inline-flex items-center gap-3 px-10 py-5 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm">
              {T(C.joinBtn)}
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
