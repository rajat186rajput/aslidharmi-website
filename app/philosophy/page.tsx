"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const BELIEFS = [
  {
    num: "01",
    title: "Asli dharma = jo cheez jaisi hai, usko vaisa dekhna.",
    body: "Comfort ke hisaab se dharma ko mold karna — apni suwidha ke liye religion change kar lena — yeh adharma hai. Yeh pehli aur sabse seedhi baat hai.",
  },
  {
    num: "02",
    title: "Discrimination sirf ek level pe nahi hoti — har level pe hoti hai.",
    body: "Species, power, paisa, jaati, gender — yeh sab alag nahi hain. Ek hi bimari ke alag chehere hain. Aur sabse interesting baat: har woh banda jo dabaaya gaya hai, apne se neeche dhoondh bhi leta hai.",
  },
  {
    num: "03",
    title: "Gender discrimination is the biggest religious failure — har dharma ne aurat ko dabaaya hai.",
    body: "Yeh sirf opinion nahi hai. Yeh observation hai — duniya ke har major religion ka. Aur iska cost real hai: silent suffering, double shift, invisible sacrifice. Yeh \"normal\" reject karna padega.",
  },
  {
    num: "04",
    title: "Insaan power chahta hai — isliye kisi ko powerless rakhta hai.",
    body: "Pyaar ke naam pe bhi. Parwaah ke naam pe bhi. Jo love actually dependent banaaye — wo love nahi, control hai. Asli pyaar capability badhata hai, dependence nahi.",
  },
  {
    num: "05",
    title: "Empower — dependent mat banao.",
    body: "Charity short-cut hai. Real help = skill dena, income ka source dena, chalne ke kaabil banana. Rajat ka mission: gaon-gaon ki ladies ko income source — chahe kitna bhi low margin pe kaam karna pade.",
  },
  {
    num: "06",
    title: "System par dependence = vulnerability.",
    body: "Government, corporate, religion — inpe jitna zyaada depend karo, utna zyaada vulnerable. Self-sustainable banna hai. Khud ka system banana hai. Yeh laziness nahi, survival hai.",
  },
  {
    num: "07",
    title: "Atma-avlokan — khud ko dekhna — yahi asli dharma hai.",
    body: "Tilak lagana dharma nahi. Diya jalana dharma nahi. Naam-jaap karna dharma nahi. Agar inke peechhe koi sochne ki, samajhne ki niyat nahi hai — toh yeh culture hai, dharma nahi.",
  },
  {
    num: "08",
    title: "Philosophy root hai, dharma trunk hai, culture leaves hain.",
    body: "Root ke bina poora ped khokla ho jaata hai. Isliye blindly tradition follow karna — bina puche, bina soche — yeh culture ka andhvishwas hai, dharma nahi.",
  },
  {
    num: "09",
    title: "Shraddha = trust + inquiry dono ek saath.",
    body: "Sirf trust karo aur sawaal band karo — andhvishwas. Sirf sawaal karo aur trust kabhi na aaye — cynicism. Dono ek saath rakhna — yahi shraddha hai. Yahi Asli Dharmi ki nazar se \"dhaarmik hona\" hai.",
  },
  {
    num: "10",
    title: "Doosron ki madad karna = khud ko dekhna.",
    body: "Bahar ka kaam andar ke kaam se alag nahi hai. Jab hum kisi ki genuinely madad karte hain, tab hum apna ego, apni limits, apni blindness dekhte hain. Dono ek hi kaam hain — alag nahi.",
  },
];

export default function PhilosophyPage() {
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
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-6">Hamaari Soch</p>
            <h1 className="font-heading text-5xl md:text-7xl text-charcoal font-semibold leading-[0.92] mb-8">
              10 Buniyadhi<br />
              <em className="text-ochre">Vishwas</em>
            </h1>
            <p className="font-sans text-lg text-charcoal/55 max-w-2xl leading-relaxed">
              Asli Dharmi koi naya dharm nahi bana raha. Na koi guru dhundh raha hai.
              Yeh ek individual ki soch hai — jo padhte-padhte, sochte-sochte, galat dekh-dekh ke bani hai.
              Sawaal karo. Disagree karo. Hum yahan discuss karne ke liye hain, preach karne ke liye nahi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── BELIEFS ── */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="divide-y divide-charcoal/8">
            {BELIEFS.map((belief, i) => (
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
                    {belief.title}
                  </h3>
                  <p className="font-sans text-base text-charcoal/55 leading-relaxed">
                    {belief.body}
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
            Agar yeh 10 points mein se koi bhi cheez aapko rokti hai, sochne par majboor karti hai —
            toh aap bilkul sahi jagah hain.
          </blockquote>
          <div className="flex flex-col sm:flex-row gap-3 mt-12">
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
            >
              Movement Mein Shaamil Ho
            </Link>
            <a
              href="https://instagram.com/aslidharmi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-cream/20 text-cream/60 font-sans font-medium text-xs tracking-widest uppercase hover:border-cream/50 transition-all duration-300 rounded-sm"
            >
              Instagram Pe Follow Karo
            </a>
          </div>
          <p className="font-sans text-xs text-cream/25 mt-8">
            Poora Manifesto (55+ Core Beliefs) — jaldi aayega
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
