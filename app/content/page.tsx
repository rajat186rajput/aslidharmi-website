"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

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

const REEL_TOPICS = [
  { num: "001", title: "Krishna Ki Jaati Kya Thi?", tag: "Dharma" },
  { num: "002", title: "Shradh Ka Asli Logic Kya Hai?", tag: "Traditions" },
  { num: "003", title: "Mangalik Dosha — Science Ya Fear?", tag: "Andhvishwas" },
  { num: "004", title: "Charvaka — Woh Philosopher Jo Bhula Diya Gaya", tag: "History" },
  { num: "005", title: "Mandir Mein Chadhawa vs Roads Mein Rishwat", tag: "Society" },
  { num: "006", title: "Amavasya Ka Logic — Kyun Aur Kab Se?", tag: "Traditions" },
  { num: "007", title: "Yagya Ka Asli Arth — Jo Koi Nahi Batata", tag: "Dharma" },
  { num: "008", title: "Buddha Ne Diya Jalane Se Mana Kiya Tha", tag: "Irony" },
  { num: "009", title: "Vastu Shastra — Origin Aur Corruption", tag: "History" },
  { num: "010", title: "Karva Chauth — Love Ya Control?", tag: "Gender" },
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

export default function ContentPage() {
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
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-6">Reels · Essays · Sawaal</p>
          <h1 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92] mb-6">
            Content Jo<br />
            <em className="text-ochre">Discomfort Deta Hai</em>
          </h1>
          <p className="font-sans text-xl text-cream/50 max-w-2xl leading-relaxed">
            Instagram aur YouTube pe short reels hain — topics: dharma, speciesism, gender, andhvishwas, self-sustainability.
            Asli Dharmi ka content feel-good nahi hai. Woh sawaal uthata hai — aur phir tumhare saath baithta hai.
          </p>
        </motion.div>
      </section>

      {/* ── FORMAT CARD — GYANI TAU + SAAKSHI ── */}
      <section className="px-6 md:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <div className="p-8 border border-ochre/20 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-4">Format</p>
                <h3 className="font-heading text-2xl text-cream font-semibold mb-4 leading-snug">
                  Gyani Tau puchhta hai.<br />Saakshi jawab deti hai.
                </h3>
                <p className="font-sans text-sm text-cream/50 leading-relaxed">
                  Do characters — do nazariye. Ek sawaal karta hai jo aksar galatfehmi se bhara hota hai.
                  Doosra honestly jawab deta hai — bina lecture ke, bina morale ke.
                  Har reel ek conversation hai, sermon nahi.
                </p>
              </div>
              <div className="space-y-5 border-l border-cream/8 pl-10">
                <div>
                  <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-1">Gyani Tau</p>
                  <p className="font-sans text-sm text-cream/60 leading-relaxed">
                    Wo banda jo "sab jaanta hai" — traditions follow karta hai bina pooche,
                    sab ke baap-dada ne kiya isliye karta hai. Common misconceptions ki awaaz.
                  </p>
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-wider text-sage mb-1">Saakshi</p>
                  <p className="font-sans text-sm text-cream/60 leading-relaxed">
                    Naam ka matlab "witness" — dekha hua batati hai, theek kiya hua nahi.
                    Koi agenda nahi, koi guru nahi — sirf jo samajh aaya woh.
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
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-2">Latest Reels</p>
                <h2 className="font-heading text-3xl text-cream font-semibold">10 Reels Live</h2>
              </div>
              <a
                href="https://instagram.com/aslidharmi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs text-ochre/70 hover:text-ochre transition-colors uppercase tracking-widest"
              >
                @aslidharmi par dekho →
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
                      {reel.title}
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
                Instagram feed embed — Behold.so integration pending account setup
              </p>
              <a
                href="https://instagram.com/aslidharmi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
              >
                Instagram Pe Seedha Dekho →
              </a>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── YOUTUBE ── */}
      <section className="px-6 md:px-16 py-16 border-t border-cream/8">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-8">YouTube Pe Bhi Hain</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="font-heading text-3xl text-cream font-semibold mb-4 leading-snug">
                  Same content,<br />YouTube pe bhi.
                </h2>
                <p className="font-sans text-base text-cream/50 leading-relaxed mb-6">
                  Instagram prefer nahi karte? YouTube subscribe karo — exact same reels wahan bhi hain.
                  Long-form conversations bhi YouTube pe hi aayenge.
                </p>
                <a
                  href="https://youtube.com/@aslidharmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-cream/20 text-cream/60 font-sans font-medium text-xs tracking-widest uppercase hover:border-cream/50 hover:text-cream transition-all duration-300 rounded-sm"
                >
                  YouTube Subscribe Karo →
                </a>
              </div>
              <div className="p-8 border border-cream/8">
                <p className="font-sans text-xs uppercase tracking-wider text-ochre/60 mb-3">@aslidharmi</p>
                <p className="font-heading text-lg text-cream/60 leading-relaxed italic">
                  &ldquo;Kuch topics hain jo 60 seconds mein nahi samajh aate.
                  Unke liye long-form conversations aayenge — free, seedha yahan, koi paywall nahi.&rdquo;
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
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-4">Long-form</p>
                <h2 className="font-heading text-4xl text-cream font-semibold mb-6 leading-[0.95]">
                  Essays —<br /><em className="text-ochre">Jaldi Aa Rahe Hain</em>
                </h2>
                <p className="font-sans text-lg text-cream/50 leading-relaxed mb-6">
                  Kuch topics hain jo 60 seconds mein nahi samajh aate.
                  Unke liye yahan essays aayenge — free, seedha yahan, koi paywall nahi.
                </p>
                <div className="border border-cream/8 p-6 mb-8">
                  <p className="font-sans text-xs text-ochre/60 uppercase tracking-wider mb-2">Pehla Essay</p>
                  <p className="font-heading text-lg text-cream/70">
                    &ldquo;Andhvishwas aur Shraddha mein fark kya hai?&rdquo;
                  </p>
                </div>
                <Link
                  href="/join"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
                >
                  Participant Bano — Early Access Pao →
                </Link>
              </div>
              <div className="flex items-center">
                <div className="w-full border border-ochre/20 p-8">
                  <span className="inline-block px-3 py-1 border border-ochre/30 text-ochre/60 font-sans text-xs uppercase tracking-wider mb-4">Coming Soon</span>
                  <p className="font-sans text-sm text-cream/40 leading-relaxed">
                    Participants ko pehle milega — 2-3 din pehle notification aata hai before public release.
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
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-cream/30 mb-3">Pehle Samjho</p>
                <p className="font-heading text-2xl text-cream font-semibold leading-snug">
                  Content ka source — 10 buniyadhi vishwas — wahan hain.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap shrink-0">
                <Link
                  href="/philosophy"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-cream/20 text-cream/60 font-sans font-medium text-xs tracking-widest uppercase hover:border-cream/50 transition-all duration-300 rounded-sm"
                >
                  Philosophy Padho →
                </Link>
                <Link
                  href="/join"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
                >
                  Shaamil Ho →
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
          <Link href="/" className="hover:text-cream/60 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-cream/60 transition-colors">About</Link>
          <Link href="/join" className="hover:text-cream/60 transition-colors">Shaamil Ho</Link>
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-cream/60 transition-colors">Instagram</a>
        </div>
      </footer>
    </main>
  );
}
