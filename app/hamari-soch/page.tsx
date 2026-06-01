"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLang, tx } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Page copy (trilingual) — Hamari Soch (merged About + Philosophy + Kaam) ──
// IMPORTANT: this page is about the SOCH, not any person. No founder name, no
// "engineer", no first-person biography. Every idea is restated impersonally.
const C = {
  // (0) HERO / MANIFESTO
  sochHeroEyebrow: { en: "Our Soch", hinglish: "Hamari Soch", hi: "हमारी सोच" },
  sochHeroTitle: { en: "Seeing things", hinglish: "Jo hai,", hi: "जो है," },
  sochHeroEm: { en: "as they are", hinglish: "vaisa dekhna", hi: "वैसा देखना" },
  sochHeroIntro: {
    en: "Asli Dharmi isn't a new religion, and it isn't anyone's following. It's a way of seeing — formed by reading, reflecting, and refusing to look away from what's wrong. These are its ideas. Question them.",
    hinglish: "Asli Dharmi koi naya dharm nahi, aur na hi kisi ka following. Yeh ek dekhne ka tareeka hai — padhte-padhte, sochte-sochte, aur galat se nazar na churaate hue bana. Yeh uski soch hai. Sawaal karo.",
    hi: "असली धर्मी कोई नया धर्म नहीं, और न ही किसी का अनुसरण। यह एक देखने का तरीक़ा है — पढ़ते-पढ़ते, सोचते-सोचते, और ग़लत से नज़र न चुराते हुए बना। यह उसकी सोच है। सवाल करो।",
  },

  // (a) THE SOCH / MANIFESTO BODY (impersonal)
  manifestoLabel: { en: "The Soch", hinglish: "Soch", hi: "सोच" },
  manifestoLead: {
    en: "Technical work and philosophy aren't opposites. In both, the search is the same: to see a thing exactly as it is — not as comfort wants it to be.",
    hinglish: "Technical kaam aur philosophy ulte nahi hain. Dono mein ek hi khoj hai: jo cheez jaisi hai, usko vaisa dekhna — vaisa nahi jaisa comfort chahta hai.",
    hi: "तकनीकी काम और दर्शन विपरीत नहीं हैं। दोनों में एक ही खोज है: जो चीज़ जैसी है, उसको वैसा देखना — वैसा नहीं जैसा आराम चाहता है।",
  },
  dharmaQuote: {
    en: "“To see a thing exactly as it is — that is true dharma. To mould it to suit your comfort — that is adharma.”",
    hinglish: "“Jo cheez jaisi hai, usko vaisa dekhna — yahi asli dharma hai. Comfort ke hisaab se use mold kar lena — adharma hai.”",
    hi: "“जो चीज़ जैसी है, उसको वैसा देखना — यही असली धर्म है। आराम के हिसाब से उसे मोड़ लेना — अधर्म है।”",
  },
  dharmaAttr: { en: "— A core belief of Asli Dharmi", hinglish: "— Asli Dharmi ka ek mool vishwas", hi: "— असली धर्मी का एक मूल विश्वास" },
  seenLabel: { en: "What We See", hinglish: "Jo Dekha", hi: "जो देखा" },
  seenBody: {
    en: "Across society a pretense runs. Real dharma is rarely followed — often not even known. Religion gets moulded to fit convenience. And discrimination shows up at every level — of species, of power and money, of caste, and the largest of all: gender. At each level the same pattern repeats — everyone finds someone to place below themselves.",
    hinglish: "Society mein ek aadambar chal raha hai. Asli dharm shaayad hi follow hota hai — aksar jaana bhi nahi jaata. Religion ko suvidha ke hisaab se mod liya jaata hai. Aur discrimination har level pe dikhta hai — species, power-paisa, varna, aur sabse bada: gender. Har level pe wahi pattern — koi na koi apne se neeche dhoondh leta hai.",
    hi: "समाज में एक आडंबर चल रहा है। असली धर्म शायद ही फॉलो होता है — अक्सर जाना भी नहीं जाता। धर्म को सुविधा के हिसाब से मोड़ लिया जाता है। और भेदभाव हर स्तर पर दिखता है — प्रजाति, ताकत-पैसा, वर्ण, और सबसे बड़ा: जेंडर। हर स्तर पर वही पैटर्न — कोई न कोई अपने से नीचे ढूँढ लेता है।",
  },
  buildLabel: { en: "Why Build Alternatives", hinglish: "Alternative Kyun", hi: "विकल्प क्यों" },
  buildBody: {
    en: "Speaking against what looks wrong is not enough. Power concentrates, taxes are paid for little in return, and women are made to carry the silent cost. The only honest response is to build alternatives — so the answer isn't just content, but work on the ground.",
    hinglish: "Jo galat dikh raha hai, uske against bolna kaafi nahi. Power ek jagah jamaa hoti hai, tax bhar ke badlay mein kam milta hai, aur aurat se silent cost uthwaayi jaati hai. Imaandaar jawab ek hi hai — alternative banana — isliye sirf content nahi, zameen pe kaam bhi.",
    hi: "जो ग़लत दिख रहा है, उसके ख़िलाफ़ बोलना काफ़ी नहीं। ताकत एक जगह जमा होती है, टैक्स भरकर बदले में कम मिलता है, और औरत से मौन क़ीमत उठवाई जाती है। ईमानदार जवाब एक ही है — विकल्प बनाना — इसलिए सिर्फ़ कंटेंट नहीं, ज़मीन पर काम भी।",
  },

  // "WHAT THIS IS NOT" band (depersonalised)
  notEyebrow: { en: "Clearly", hinglish: "Clearly", hi: "साफ़ तौर पर" },
  notHeading1: { en: "What This Is ", hinglish: "Yeh Kya ", hi: "यह क्या " },
  notHeadingEm: { en: "Not", hinglish: "Nahi", hi: "नहीं" },
  notItems: [
    {
      en: "This is not a religion-bashing channel. The scriptures are respected. But superstition and dharma are not the same thing.",
      hinglish: "Yeh religion-bashing channel nahi hai. Scriptures ka respect hai. Lekin andhvishwas aur dharma ek nahi hain.",
      hi: "यह धर्म पर हमला करने वाला चैनल नहीं है। ग्रंथों का सम्मान है। लेकिन अंधविश्वास और धर्म एक नहीं हैं।",
    },
    {
      en: "This is not a platform for Hindu pride or any nationalism. No religion's or party's flag will fly here.",
      hinglish: "Yeh Hindu pride ya kisi bhi nationalism ka platform nahi hai. Koi bhi religion ya party ka jhanda yahan nahi chalega.",
      hi: "यह हिंदू गौरव या किसी भी राष्ट्रवाद का मंच नहीं है। किसी भी धर्म या पार्टी का झंडा यहाँ नहीं चलेगा।",
    },
    {
      en: "This is not atheism propaganda. Scientific temperament and genuine spiritual inquiry can go together — here, they do.",
      hinglish: "Yeh atheism ka propaganda nahi hai. Scientific temperament aur genuine spiritual inquiry ek saath chal sakte hain — yahan, chalte hain.",
      hi: "यह नास्तिकता का प्रचार नहीं है। वैज्ञानिक सोच और सच्ची आध्यात्मिक जिज्ञासा साथ चल सकते हैं — यहाँ, चलते हैं।",
    },
    {
      en: "This is not just a content channel. Reels are a tool — one part of the movement. The other three work on the ground.",
      hinglish: "Yeh sirf content channel nahi hai. Reels ek tool hain — movement ka ek hissa. Baaki teen tools ground pe kaam karte hain.",
      hi: "यह सिर्फ़ कंटेंट चैनल नहीं है। रील्स एक टूल हैं — आंदोलन का एक हिस्सा। बाक़ी तीन टूल ज़मीन पर काम करते हैं।",
    },
  ],

  // (b) 10 CORE BELIEFS
  beliefsEyebrow: { en: "Our Philosophy", hinglish: "Hamaari Soch", hi: "हमारी सोच" },
  beliefsTitle: { en: "10 Core", hinglish: "10 Buniyadhi", hi: "10 बुनियादी" },
  beliefsEm: { en: "Beliefs", hinglish: "Vishwas", hi: "विश्वास" },
  beliefsIntro: {
    en: "If any of these ten points stops you, makes you think — then this is exactly the right place. We're here to discuss, not to preach.",
    hinglish: "Agar in 10 points mein se koi bhi cheez aapko rokti hai, sochne par majboor karti hai — toh aap bilkul sahi jagah hain. Hum yahan discuss karne ke liye hain, preach karne ke liye nahi.",
    hi: "अगर इन 10 बातों में से कोई भी चीज़ आपको रोकती है, सोचने पर मजबूर करती है — तो आप बिलकुल सही जगह हैं। हम यहाँ चर्चा करने के लिए हैं, उपदेश देने के लिए नहीं।",
  },

  // (c) SOCH SE KAAM TAK — the 4 initiatives
  kaamEyebrow: { en: "From Soch to Action", hinglish: "Soch se Kaam tak", hi: "सोच से काम तक" },
  kaamTitle: { en: "Four Works,", hinglish: "Char Kaam,", hi: "चार काम," },
  kaamEm: { en: "One Mission", hinglish: "Ek Mission", hi: "एक मिशन" },
  kaamIntro: {
    en: "The soch doesn't stay in words. It becomes work — four initiatives, one thread running through all: make people independent, not dependent.",
    hinglish: "Soch shabdon mein nahi rukti. Woh kaam ban jaati hai — char initiatives, ek hi sutra sab mein: insaan ko independent banana, dependent nahi.",
    hi: "सोच शब्दों में नहीं रुकती। वह काम बन जाती है — चार पहल, एक ही सूत्र सब में: इंसान को आत्मनिर्भर बनाना, परनिर्भर नहीं।",
  },
  initiatives: [
    {
      title: { en: "Content Creation", hinglish: "Content Creation", hi: "कंटेंट क्रिएशन" },
      body: {
        en: "Philosophy through reels, essays and podcasts — so people learn to ask questions, not just be entertained.",
        hinglish: "Philosophy ko reels, essays aur podcast mein — taaki log sawaal poochhna seekhein, sirf entertain na hon.",
        hi: "दर्शन को रील, निबंध और पॉडकास्ट में — ताकि लोग सवाल पूछना सीखें, सिर्फ़ मनोरंजन न हो।",
      },
    },
    {
      title: { en: "Women Empowerment", hinglish: "Women Empowerment", hi: "महिला सशक्तिकरण" },
      body: {
        en: "Skill and income for rural women — not charity, but dignity. From training all the way to the marketplace.",
        hinglish: "Gaon ki mahilaon ko skill aur income ka zariya — daan nahi, dignity. Training se marketplace tak.",
        hi: "गाँव की महिलाओं को कौशल और आय का ज़रिया — दान नहीं, सम्मान। प्रशिक्षण से बाज़ार तक।",
      },
    },
    {
      title: { en: "Self-Sustainable Systems", hinglish: "Self-Sustainable Systems", hi: "आत्मनिर्भर तंत्र" },
      body: {
        en: "Hill Homestay and the Panchmukhi Village Hub — services where neither government nor corporates reach.",
        hinglish: "Hill Homestay aur Panchmukhi Village Hub — wahaan services jahaan government aur corporate nahi pahunchte.",
        hi: "हिल होमस्टे और पंचमुखी विलेज हब — वहाँ सेवाएँ जहाँ न सरकार पहुँचती है, न कॉरपोरेट।",
      },
    },
    {
      title: { en: "Sangha & Community", hinglish: "Sangha & Community", hi: "संघ और समुदाय" },
      body: {
        en: "1-tap SOS for elders and a hyper-local help network — no ads, no algorithm, no surveillance.",
        hinglish: "Bujurgon ke liye 1-tap SOS aur hyper-local madad ka network — bina ads, bina algorithm, bina surveillance.",
        hi: "बुज़ुर्गों के लिए 1-टैप SOS और हाइपर-लोकल मदद का नेटवर्क — बिना विज्ञापन, बिना एल्गोरिदम, बिना निगरानी।",
      },
    },
  ],

  // (d) CLOSING CTA
  closeQuote: {
    en: "If any of these ten points stops you, makes you think — then you're in exactly the right place.",
    hinglish: "Agar yeh 10 points mein se koi bhi cheez aapko rokti hai, sochne par majboor karti hai — toh aap bilkul sahi jagah hain.",
    hi: "अगर इन 10 बातों में से कोई भी चीज़ आपको रोकती है, सोचने पर मजबूर करती है — तो आप बिलकुल सही जगह हैं।",
  },
  closeJoinCta: { en: "Join the Movement", hinglish: "Movement Mein Shaamil Ho", hi: "आंदोलन में जुड़ें" },
  closeInstaCta: { en: "Follow on Instagram", hinglish: "Instagram Pe Follow Karo", hi: "इंस्टाग्राम पर फ़ॉलो करें" },
  closeNote: { en: "Full Manifesto (55+ Core Beliefs) — coming soon", hinglish: "Poora Manifesto (55+ Core Beliefs) — jaldi aayega", hi: "पूरा मैनिफ़ेस्टो (55+ मूल विश्वास) — जल्द आएगा" },
} as const;

// 10 Core Beliefs — copied verbatim from the philosophy page (idea content, no person).
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

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export default function HamariSochPage() {
  const { lang } = useLang();
  const reduce = useReducedMotion();

  return (
    <main className="bg-cream text-charcoal">

      {/* ── (0) HERO / MANIFESTO ── */}
      <section className="pt-32 pb-20 px-6 md:px-16 border-b border-charcoal/10">
        <div className="max-w-4xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-6">{tx(C.sochHeroEyebrow, lang)}</p>
            <h1 className="font-heading text-5xl md:text-7xl text-charcoal font-semibold leading-[0.92] mb-8">
              {tx(C.sochHeroTitle, lang)}<br />
              <em className="text-ochre">{tx(C.sochHeroEm, lang)}</em>
            </h1>
            <p className="font-sans text-lg text-charcoal/55 max-w-2xl leading-relaxed">
              {tx(C.sochHeroIntro, lang)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── (a) THE SOCH / MANIFESTO BODY ── */}
      <section className="px-6 md:px-16 py-28 max-w-4xl mx-auto">
        <div className="space-y-16">

          <RevealBlock>
            <div className="w-px h-16 bg-ochre/40 mb-12" />
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">{tx(C.manifestoLabel, lang)}</p>
            <p className="font-sans text-xl md:text-2xl text-charcoal/80 leading-relaxed">
              {tx(C.manifestoLead, lang)}
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <blockquote className="border-l-2 border-ochre/40 pl-8 py-2">
              <p className="font-heading text-2xl md:text-3xl text-charcoal italic leading-relaxed mb-4">
                {tx(C.dharmaQuote, lang)}
              </p>
              <p className="font-sans text-xs uppercase tracking-widest text-charcoal/40">{tx(C.dharmaAttr, lang)}</p>
            </blockquote>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">{tx(C.seenLabel, lang)}</p>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed">
              {tx(C.seenBody, lang)}
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">{tx(C.buildLabel, lang)}</p>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed">
              {tx(C.buildBody, lang)}
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

      {/* ── (b) 10 CORE BELIEFS ── */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-6">{tx(C.beliefsEyebrow, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold leading-tight mb-6">
              {tx(C.beliefsTitle, lang)} <em className="text-ochre">{tx(C.beliefsEm, lang)}</em>
            </h2>
            <p className="font-sans text-lg text-charcoal/55 max-w-2xl leading-relaxed mb-4">
              {tx(C.beliefsIntro, lang)}
            </p>
          </RevealBlock>
          <div className="divide-y divide-charcoal/8">
            {BELIEFS.map((belief) => (
              <motion.div
                key={belief.num}
                initial={reduce ? false : { opacity: 0, x: -20 }}
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

      {/* ── (c) SOCH SE KAAM TAK — the 4 initiatives ── */}
      <section id="kaam" className="px-6 md:px-16 py-28 bg-cream-dark/40 border-t border-charcoal/10 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-6">{tx(C.kaamEyebrow, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-6 leading-tight">
              {tx(C.kaamTitle, lang)} <em className="text-ochre">{tx(C.kaamEm, lang)}</em>
            </h2>
            <p className="font-sans text-lg text-charcoal/60 leading-relaxed mb-16 max-w-2xl">
              {tx(C.kaamIntro, lang)}
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {C.initiatives.map((item, i) => (
              <RevealBlock key={i} delay={i * 0.1}>
                <div className="group h-full p-8 border border-charcoal/10 hover:border-ochre/30 transition-colors duration-300 rounded-sm bg-cream">
                  <span className="font-heading text-4xl text-ochre/15 group-hover:text-ochre/35 font-bold block mb-4 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">{tx(item.title, lang)}</h3>
                  <p className="font-sans text-sm text-charcoal/50 leading-relaxed">{tx(item.body, lang)}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── (d) CLOSING CTA ── */}
      <section className="px-6 md:px-16 py-24 bg-charcoal relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }}
        />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto relative"
        >
          <span className="font-heading text-8xl text-ochre/20 leading-none block mb-6">&ldquo;</span>
          <blockquote className="font-heading text-2xl md:text-3xl text-cream font-semibold leading-snug mb-10">
            {tx(C.closeQuote, lang)}
          </blockquote>
          <div className="flex flex-col sm:flex-row gap-3 mt-12">
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
            >
              {tx(C.closeJoinCta, lang)}
            </Link>
            <a
              href="https://instagram.com/aslidharmi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-cream/20 text-cream/60 font-sans font-medium text-xs tracking-widest uppercase hover:border-cream/50 transition-all duration-300 rounded-sm"
            >
              {tx(C.closeInstaCta, lang)}
            </a>
          </div>
          <p className="font-sans text-xs text-cream/25 mt-8">
            {tx(C.closeNote, lang)}
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-charcoal/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-charcoal/40">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-charcoal/40">
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">Instagram</a>
          <Link href="/help-us" className="hover:text-charcoal transition-colors">{tx({ en: "Help Us", hinglish: "Help Us", hi: "सहयोग करें" }, lang)}</Link>
          <a href="mailto:aslidharmi@gmail.com" className="hover:text-charcoal transition-colors">{tx({ en: "Contact", hinglish: "Contact", hi: "संपर्क" }, lang)}</a>
        </div>
      </footer>
    </main>
  );
}
