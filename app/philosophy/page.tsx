"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang, tx } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const C = {
  eyebrow: { en: "Our Philosophy", hinglish: "Hamaari Soch", hi: "हमारी सोच" },
  h1a: { en: "10 Core", hinglish: "10 Buniyadhi", hi: "10 बुनियादी" },
  h1em: { en: "Beliefs", hinglish: "Vishwas", hi: "विश्वास" },
  intro: {
    en: "Asli Dharmi isn't building a new religion. Nor seeking a guru. This is one individual's thinking — formed by reading, reflecting, and seeing what's wrong. Question it. Disagree. We're here to discuss, not to preach.",
    hinglish: "Asli Dharmi koi naya dharm nahi bana raha. Na koi guru dhundh raha hai. Yeh ek individual ki soch hai — jo padhte-padhte, sochte-sochte, galat dekh-dekh ke bani hai. Sawaal karo. Disagree karo. Hum yahan discuss karne ke liye hain, preach karne ke liye nahi.",
    hi: "असली धर्मी कोई नया धर्म नहीं बना रहा। न कोई गुरु ढूँढ रहा है। यह एक व्यक्ति की सोच है — जो पढ़ते-पढ़ते, सोचते-सोचते, ग़लत देख-देख कर बनी है। सवाल करो। असहमत हो। हम यहाँ चर्चा करने के लिए हैं, उपदेश देने के लिए नहीं।",
  },
  quote: {
    en: "If any of these 10 points stops you, makes you think — then you're in exactly the right place.",
    hinglish: "Agar yeh 10 points mein se koi bhi cheez aapko rokti hai, sochne par majboor karti hai — toh aap bilkul sahi jagah hain.",
    hi: "अगर इन 10 बातों में से कोई भी चीज़ आपको रोकती है, सोचने पर मजबूर करती है — तो आप बिलकुल सही जगह हैं।",
  },
  ctaJoin: { en: "Join the Movement", hinglish: "Movement Mein Shaamil Ho", hi: "आंदोलन में जुड़ें" },
  ctaInsta: { en: "Follow on Instagram", hinglish: "Instagram Pe Follow Karo", hi: "इंस्टाग्राम पर फ़ॉलो करें" },
  note: { en: "Full Manifesto (55+ Core Beliefs) — coming soon", hinglish: "Poora Manifesto (55+ Core Beliefs) — jaldi aayega", hi: "पूरा मैनिफ़ेस्टो (55+ मूल विश्वास) — जल्द आएगा" },
} as const;

const BELIEFS = [
  {
    num: "01",
    title: {
      en: "True dharma = seeing a thing exactly as it is.",
      hinglish: "Asli dharma = jo cheez jaisi hai, usko vaisa dekhna.",
      hi: "असली धर्म = जो चीज़ जैसी है, उसको वैसा देखना।",
    },
    body: {
      en: "Moulding dharma to suit your comfort — changing religion for your convenience — that is adharma. This is the first and simplest point.",
      hinglish: "Comfort ke hisaab se dharma ko mold karna — apni suwidha ke liye religion change kar lena — yeh adharma hai. Yeh pehli aur sabse seedhi baat hai.",
      hi: "आराम के हिसाब से धर्म को मोड़ना — अपनी सुविधा के लिए धर्म बदल लेना — यह अधर्म है। यह पहली और सबसे सीधी बात है।",
    },
  },
  {
    num: "02",
    title: {
      en: "Discrimination doesn't happen at one level — it happens at every level.",
      hinglish: "Discrimination sirf ek level pe nahi hoti — har level pe hoti hai.",
      hi: "भेदभाव सिर्फ़ एक स्तर पर नहीं होता — हर स्तर पर होता है।",
    },
    body: {
      en: "Species, power, money, caste, gender — these aren't separate. They're different faces of one disease. And the most telling part: everyone who's been oppressed finds someone below themselves too.",
      hinglish: "Species, power, paisa, jaati, gender — yeh sab alag nahi hain. Ek hi bimari ke alag chehere hain. Aur sabse interesting baat: har woh banda jo dabaaya gaya hai, apne se neeche dhoondh bhi leta hai.",
      hi: "प्रजाति, ताकत, पैसा, जाति, जेंडर — ये सब अलग नहीं हैं। एक ही बीमारी के अलग चेहरे हैं। और सबसे ख़ास बात: हर वो इंसान जो दबाया गया है, अपने से नीचे ढूँढ भी लेता है।",
    },
  },
  {
    num: "03",
    title: {
      en: "Gender discrimination is the biggest religious failure — every religion has oppressed women.",
      hinglish: "Gender discrimination is the biggest religious failure — har dharma ne aurat ko dabaaya hai.",
      hi: "जेंडर भेदभाव सबसे बड़ी धार्मिक नाकामी है — हर धर्म ने औरत को दबाया है।",
    },
    body: {
      en: "This isn't just opinion. It's an observation — of every major religion in the world. And the cost is real: silent suffering, double shifts, invisible sacrifice. This \"normal\" must be rejected.",
      hinglish: "Yeh sirf opinion nahi hai. Yeh observation hai — duniya ke har major religion ka. Aur iska cost real hai: silent suffering, double shift, invisible sacrifice. Yeh \"normal\" reject karna padega.",
      hi: "यह सिर्फ़ राय नहीं है। यह अवलोकन है — दुनिया के हर बड़े धर्म का। और इसकी क़ीमत असली है: मौन पीड़ा, दोहरी मेहनत, अदृश्य त्याग। इस \"नॉर्मल\" को नकारना पड़ेगा।",
    },
  },
  {
    num: "04",
    title: {
      en: "People want power — so they keep someone powerless.",
      hinglish: "Insaan power chahta hai — isliye kisi ko powerless rakhta hai.",
      hi: "इंसान ताकत चाहता है — इसलिए किसी को कमज़ोर रखता है।",
    },
    body: {
      en: "Even in the name of love. Even in the name of care. Love that actually makes you dependent — that's not love, it's control. Real love grows capability, not dependence.",
      hinglish: "Pyaar ke naam pe bhi. Parwaah ke naam pe bhi. Jo love actually dependent banaaye — wo love nahi, control hai. Asli pyaar capability badhata hai, dependence nahi.",
      hi: "प्यार के नाम पर भी। परवाह के नाम पर भी। जो प्यार सच में परनिर्भर बनाए — वो प्यार नहीं, नियंत्रण है। असली प्यार क्षमता बढ़ाता है, निर्भरता नहीं।",
    },
  },
  {
    num: "05",
    title: {
      en: "Empower — don't make people dependent.",
      hinglish: "Empower — dependent mat banao.",
      hi: "सशक्त बनाओ — परनिर्भर मत बनाओ।",
    },
    body: {
      en: "Charity is a short-cut. Real help = giving skill, giving an income source, making people able to stand on their own. The mission: an income source for rural women — however low the margin has to be.",
      hinglish: "Charity short-cut hai. Real help = skill dena, income ka source dena, chalne ke kaabil banana. Mission: gaon-gaon ki ladies ko income source — chahe kitna bhi low margin pe kaam karna pade.",
      hi: "चैरिटी शॉर्ट-कट है। असली मदद = स्किल देना, आय का स्रोत देना, अपने पैरों पर खड़ा होने के काबिल बनाना। मिशन: गाँव-गाँव की महिलाओं को आय का स्रोत — चाहे कितने भी कम मार्जिन पर काम करना पड़े।",
    },
  },
  {
    num: "06",
    title: {
      en: "Dependence on systems = vulnerability.",
      hinglish: "System par dependence = vulnerability.",
      hi: "सिस्टम पर निर्भरता = कमज़ोरी।",
    },
    body: {
      en: "Government, corporates, religion — the more you depend on them, the more vulnerable you are. We must become self-sustainable. Build our own system. This isn't laziness, it's survival.",
      hinglish: "Government, corporate, religion — inpe jitna zyaada depend karo, utna zyaada vulnerable. Self-sustainable banna hai. Khud ka system banana hai. Yeh laziness nahi, survival hai.",
      hi: "सरकार, कॉरपोरेट, धर्म — इन पर जितना ज़्यादा निर्भर रहो, उतना ज़्यादा कमज़ोर। आत्मनिर्भर बनना है। अपना सिस्टम बनाना है। यह आलस नहीं, अस्तित्व की बात है।",
    },
  },
  {
    num: "07",
    title: {
      en: "Self-observation — looking at yourself — that is true dharma.",
      hinglish: "Atma-avlokan — khud ko dekhna — yahi asli dharma hai.",
      hi: "आत्म-अवलोकन — खुद को देखना — यही असली धर्म है।",
    },
    body: {
      en: "Applying a tilak isn't dharma. Lighting a lamp isn't dharma. Chanting names isn't dharma. If there's no intent to think or understand behind them — then it's culture, not dharma.",
      hinglish: "Tilak lagana dharma nahi. Diya jalana dharma nahi. Naam-jaap karna dharma nahi. Agar inke peechhe koi sochne ki, samajhne ki niyat nahi hai — toh yeh culture hai, dharma nahi.",
      hi: "तिलक लगाना धर्म नहीं। दीया जलाना धर्म नहीं। नाम-जाप करना धर्म नहीं। अगर इनके पीछे कोई सोचने की, समझने की नीयत नहीं है — तो यह संस्कृति है, धर्म नहीं।",
    },
  },
  {
    num: "08",
    title: {
      en: "Philosophy is the root, dharma the trunk, culture the leaves.",
      hinglish: "Philosophy root hai, dharma trunk hai, culture leaves hain.",
      hi: "दर्शन जड़ है, धर्म तना है, संस्कृति पत्तियाँ हैं।",
    },
    body: {
      en: "Without the root, the whole tree turns hollow. So following tradition blindly — without asking, without thinking — is the superstition of culture, not dharma.",
      hinglish: "Root ke bina poora ped khokla ho jaata hai. Isliye blindly tradition follow karna — bina puche, bina soche — yeh culture ka andhvishwas hai, dharma nahi.",
      hi: "जड़ के बिना पूरा पेड़ खोखला हो जाता है। इसलिए आँख मूँदकर परंपरा फॉलो करना — बिना पूछे, बिना सोचे — यह संस्कृति का अंधविश्वास है, धर्म नहीं।",
    },
  },
  {
    num: "09",
    title: {
      en: "Shraddha = trust + inquiry, both together.",
      hinglish: "Shraddha = trust + inquiry dono ek saath.",
      hi: "श्रद्धा = विश्वास + जिज्ञासा, दोनों एक साथ।",
    },
    body: {
      en: "Just trust and shut down questions — superstition. Just question and never trust — cynicism. Holding both together — that is shraddha. That, in Asli Dharmi's eyes, is what \"being dharmic\" means.",
      hinglish: "Sirf trust karo aur sawaal band karo — andhvishwas. Sirf sawaal karo aur trust kabhi na aaye — cynicism. Dono ek saath rakhna — yahi shraddha hai. Yahi Asli Dharmi ki nazar se \"dhaarmik hona\" hai.",
      hi: "सिर्फ़ विश्वास करो और सवाल बंद करो — अंधविश्वास। सिर्फ़ सवाल करो और विश्वास कभी न आए — संशयवाद। दोनों एक साथ रखना — यही श्रद्धा है। यही असली धर्मी की नज़र से \"धार्मिक होना\" है।",
    },
  },
  {
    num: "10",
    title: {
      en: "Helping others = looking at yourself.",
      hinglish: "Doosron ki madad karna = khud ko dekhna.",
      hi: "दूसरों की मदद करना = खुद को देखना।",
    },
    body: {
      en: "Outer work isn't separate from inner work. When we genuinely help someone, we see our own ego, our limits, our blindness. Both are the same work — not separate.",
      hinglish: "Bahar ka kaam andar ke kaam se alag nahi hai. Jab hum kisi ki genuinely madad karte hain, tab hum apna ego, apni limits, apni blindness dekhte hain. Dono ek hi kaam hain — alag nahi.",
      hi: "बाहर का काम अंदर के काम से अलग नहीं है। जब हम किसी की सच्ची मदद करते हैं, तब हम अपना अहंकार, अपनी सीमाएँ, अपना अंधापन देखते हैं। दोनों एक ही काम हैं — अलग नहीं।",
    },
  },
] as const;

export default function PhilosophyPage() {
  const { lang } = useLang();

  return (
    <main className="bg-cream text-charcoal">

      {/* ── HEADER ── */}
      <section className="pt-32 pb-20 px-6 md:px-16 border-b border-charcoal/10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-6">{tx(C.eyebrow, lang)}</p>
            <h1 className="font-heading text-5xl md:text-7xl text-charcoal font-semibold leading-[0.92] mb-8">
              {tx(C.h1a, lang)}<br />
              <em className="text-ochre">{tx(C.h1em, lang)}</em>
            </h1>
            <p className="font-sans text-lg text-charcoal/55 max-w-2xl leading-relaxed">
              {tx(C.intro, lang)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── BELIEFS ── */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="divide-y divide-charcoal/8">
            {BELIEFS.map((belief) => (
              <motion.div
                key={belief.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0, ease: EASE }}
                viewport={{ once: true, margin: "-40px" }}
                className="py-10 grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 group"
              >
                <span className="font-heading text-4xl text-ochre/20 group-hover:text-ochre/40 font-bold transition-colors duration-500 leading-none">
                  {belief.num}
                </span>
                <div>
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-charcoal mb-4 leading-snug">
                    {tx(belief.title, lang)}
                  </h3>
                  <p className="font-sans text-base text-charcoal/55 leading-relaxed">
                    {tx(belief.body, lang)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className="px-6 md:px-16 py-24 bg-charcoal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto relative"
        >
          <span className="font-heading text-8xl text-ochre/20 leading-none block mb-6">&ldquo;</span>
          <blockquote className="font-heading text-2xl md:text-3xl text-cream font-semibold leading-snug mb-10">
            {tx(C.quote, lang)}
          </blockquote>
          <div className="flex flex-col sm:flex-row gap-3 mt-12">
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
            >
              {tx(C.ctaJoin, lang)}
            </Link>
            <a
              href="https://instagram.com/aslidharmi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-cream/20 text-cream/60 font-sans font-medium text-xs tracking-widest uppercase hover:border-cream/50 transition-all duration-300 rounded-sm"
            >
              {tx(C.ctaInsta, lang)}
            </a>
          </div>
          <p className="font-sans text-xs text-cream/25 mt-8">
            {tx(C.note, lang)}
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-charcoal/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-charcoal/40">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-charcoal/40">
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">Instagram</a>
          <Link href="/about" className="hover:text-charcoal transition-colors">About</Link>
          <Link href="/kaam" className="hover:text-charcoal transition-colors">Hamare Kaam</Link>
        </div>
      </footer>
    </main>
  );
}
