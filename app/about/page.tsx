"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

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
  return (
    <main className="bg-cream text-charcoal">

      {/* ── PARALLAX HERO ── */}
      <ParallaxHero src="/images/about-rajat-bg.jpg" alt="Pahari hills at golden hour">
        <div className="max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre mb-4">
            Asli Dharmi · Rajat Rajput
          </p>
          <h1 className="font-heading text-5xl md:text-7xl text-cream font-semibold leading-[0.92] mb-6">
            Rajat Rajput —<br />
            <span className="italic text-ochre">Kyun Yeh Sab?</span>
          </h1>
          <p className="font-sans text-lg text-cream/60 max-w-xl leading-relaxed">
            Ek engineer, jo din mein technical drawings karta hai aur raat mein philosophy padhta hai.
          </p>
        </div>
      </ParallaxHero>

      {/* ── STORY ── */}
      <section className="px-6 md:px-16 py-28 max-w-4xl mx-auto">
        <div className="space-y-16">

          <RevealBlock>
            <div className="w-px h-16 bg-ochre/40 mb-12" />
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">Shuruwat</p>
            <p className="font-sans text-xl md:text-2xl text-charcoal/80 leading-relaxed">
              Main ek engineer hun — railway coach design karta hun, Gurgaon mein. Din mein technical drawings,
              raat mein philosophy. Yeh dono mere liye alag nahi hain — dono mein same cheez dhundhta hun:{" "}
              <em className="text-charcoal not-italic font-medium">jo cheez jaisi hai, usko vaisa dekhna.</em>
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed">
              College ke baad se padha. Self-help se shuru hua, phir philosophy aayi, phir psychology, phir sociology.
              Phir Hindu scriptures — Geeta, Upanishad, Puran. Osho suna. Acharya Prashant suna.
              Inse vocabulary mila — lekin main kisi ka shishya nahi hun. Jo maine dekha, wo meri apni aankhon se dekha.
              Akele.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <blockquote className="border-l-2 border-ochre/40 pl-8 py-2">
              <p className="font-heading text-2xl md:text-3xl text-charcoal italic leading-relaxed">
                &ldquo;Jo cheez jaisi hai, usko vaisa dekhna — yahi asli dharma hai. Comfort ke hisaab se use
                mold kar lena — adharma hai.&rdquo;
              </p>
            </blockquote>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">Jo Dekha</p>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed">
              Society mein dekha — ek aadambar chal raha hai. Jo asli dharm hai log usko follow nahi karte,
              shayad jaante bhi nahi. Bas apni suwidha ke hisaab se religion ko mold kar lete hain.
              Speciesism dekha — species level pe, power-money level pe, varna level pe, aur sabse bada:
              gender level pe. Har ek level pe ek hi pattern — koi na koi apne se neeche dhoondh leta hai.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">Ek Bada Loss</p>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed">
              Meri life mein ek bada loss hua — meri maa ka jaana. Unhe teen baar heart attack aaya.
              Pehle do baar unhone kisi ko bataya bhi nahi. Yeh society ka dabaaw tha — ek aurat ne apna dard
              chhupaaya, kyunki shayad lagta tha ki kehne se kya hoga. Yeh mujhe nahi bhoolti.
              <br /><br />
              Main chahta hun ki yeh mansikta badle. Aurat ko kamzor samajhna, hamesha compromise karna aurat
              ko hi padta hai — yeh sahi nahi hai.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">Isliye Asli Dharmi</p>
            <p className="font-sans text-lg text-charcoal/65 leading-relaxed">
              Asli Dharmi in sab ka result hai. Power concentration dekha, government ko tax bhaarta dekha aur
              badlay mein kuch nahi, women ka shoshan dekha. Aur ek soch bani: jo cheez galat dikh rahi hai,
              uske against bolna kafi nahi.{" "}
              <strong className="text-charcoal">Uske alternative banaane padte hain.</strong>{" "}
              Isliye sirf content nahi — ground projects bhi.
            </p>
          </RevealBlock>

        </div>
      </section>

      {/* ── WHAT THIS IS NOT ── */}
      <section className="px-6 md:px-16 py-24 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-6">Clearly</p>
            <h2 className="font-heading text-4xl md:text-5xl text-cream font-semibold mb-12 leading-tight">
              Yeh Kya <em>Nahi</em> Hai
            </h2>
          </RevealBlock>
          <div className="space-y-6">
            {[
              "Yeh religion-bashing channel nahi hai. Main Hindu hun, scriptures padhe hain, unka respect bhi karta hun. Lekin andhvishwas aur dharma ek nahi hain.",
              "Yeh Hindu pride ya kisi bhi nationalism ka platform nahi hai. Koi bhi religion ya party ka jhanda yahan nahi chalega.",
              "Yeh atheism ka propaganda nahi hai. Scientific temperament aur genuine spiritual inquiry ek saath chal sakte hain — Rajat ke liye chalte hain.",
              "Yeh sirf content channel nahi hai. Reels ek tool hain — movement ka ek hissa. Baaki teen tools ground pe kaam karte hain.",
            ].map((text, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="flex gap-6 items-start">
                  <span className="text-ochre/40 font-sans text-sm mt-1 shrink-0">✗</span>
                  <p className="font-sans text-base text-cream/60 leading-relaxed">{text}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE MOVEMENT ── */}
      <section className="px-6 md:px-16 py-28 max-w-5xl mx-auto">
        <RevealBlock>
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-6">4 Tools</p>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-10 leading-tight">
            Asli Dharmi: <em className="text-ochre">Sirf Ek Channel Nahi</em>
          </h2>
          <p className="font-sans text-lg text-charcoal/60 leading-relaxed mb-16 max-w-2xl">
            Yeh ek 4-tool movement hai. In sab mein ek hi sutra: insaan ko independent banana, dependent nahi.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { num: "01", title: "Content Creation", body: "Reels, essays, long-form — philosophy ko voice dena. Gyani Tau puchhta hai, Saakshi jawab deti hai.", href: "/content" },
            { num: "02", title: "Women Empowerment", body: "Gaon ki ladies ko skill + income source. Layer 1: skill training. Layer 2: marketplace platform.", href: "/kaam#women" },
            { num: "03", title: "Self-Sustainable Systems", body: "Hill Homestay (Nani ka Ghar, Jawar, Garhwal) + Panchmukhi Village Hub — 5-in-1 rural service center.", href: "/kaam#systems" },
            { num: "04", title: "Sangha & Community", body: "Sangha App — 1-tap SOS for elders + hyper-local community help feed.", href: "/kaam#sangha" },
          ].map((tool, i) => (
            <RevealBlock key={i} delay={i * 0.1}>
              <Link href={tool.href} className="block group p-8 border border-charcoal/10 hover:border-ochre/30 transition-colors duration-300 rounded-sm">
                <span className="font-heading text-4xl text-ochre/15 group-hover:text-ochre/35 font-bold block mb-4 transition-colors duration-500">
                  {tool.num}
                </span>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">{tool.title}</h3>
                <p className="font-sans text-sm text-charcoal/50 leading-relaxed">{tool.body}</p>
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
              Agar resonance ho — andar aao
            </h3>
            <p className="font-sans text-base text-charcoal/50 mb-8">Sirf follower nahi — participant bano.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/join" className="px-8 py-4 bg-ochre text-cream font-sans text-xs tracking-widest uppercase hover:bg-charcoal transition-colors duration-300 rounded-sm">
                Movement Mein Shaamil Ho
              </Link>
              <Link href="/philosophy" className="px-8 py-4 border border-charcoal/20 text-charcoal font-sans text-xs tracking-widest uppercase hover:border-charcoal/50 transition-all duration-300 rounded-sm">
                Hamaari Soch Padho
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
