"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { useLang, t, tx, Lang } from "@/lib/i18n";
import { LangSelector } from "@/components/LangSelector";

const EASE = [0.22, 1, 0.36, 1] as const;

function WordBlur({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.65,
            delay: delay + i * 0.08,
            ease: EASE,
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroPremium() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <>
      {/* ── NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4 flex items-center justify-between backdrop-blur-md bg-[#F5F0E8]/80 border-b border-[#2C2A27]/8"
      >
        <Link href="/" className="font-heading text-lg font-semibold text-[#2C2A27] tracking-tight select-none">
          {tx(t.nav.brand, lang)}
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-[#2C2A27]/55">
          <Link href="/about" className="hover:text-[#2C2A27] transition-colors duration-200 font-sans">{tx(t.nav.about, lang)}</Link>
          <Link href="/philosophy" className="hover:text-[#2C2A27] transition-colors duration-200 font-sans">{tx(t.nav.philosophy, lang)}</Link>
          <Link href="/content" className="hover:text-[#2C2A27] transition-colors duration-200 font-sans">{tx(t.nav.content, lang)}</Link>
          <LangSelector />
          <Link href="/join" className="px-5 py-2 bg-[#2C2A27] text-[#F5F0E8] rounded-sm text-sm font-sans font-medium hover:bg-[#C8832A] transition-colors duration-300">
            {tx(t.nav.join, lang)}
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <LangSelector />
          <Link href="/join" className="px-4 py-2 bg-[#2C2A27] text-[#F5F0E8] rounded-sm text-xs font-sans font-medium">
            {tx(t.nav.join, lang)}
          </Link>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F5F0E8]">

        {/* Animated gradient orb — subtle ochre/sage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute pointer-events-none"
          style={{ top: "15%", left: "60%", transform: "translate(-50%,-50%)" }}
        >
          <div className="w-[600px] h-[600px] rounded-full bg-[#C8832A]/8 blur-[120px]" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute pointer-events-none"
          style={{ top: "55%", left: "20%", transform: "translate(-50%,-50%)" }}
        >
          <div className="w-[400px] h-[400px] rounded-full bg-[#6B7C5E]/6 blur-[100px]" />
        </motion.div>

        {/* Left edge line draw */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
          className="absolute left-6 md:left-16 top-28 bottom-20 w-px bg-[#2C2A27]/10 origin-top hidden md:block"
        />

        {/* Noise grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px",
          }}
        />

        {/* Main content — parallax */}
        <motion.div style={{ y: parallaxY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl pt-20">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-sans text-xs uppercase tracking-[0.22em] text-[#C8832A] mb-10"
          >
            {tx(t.hero.label, lang)}
          </motion.p>

          {/* H1 — line 1 word-blur */}
          <h1 className="font-heading font-semibold leading-[0.92] tracking-tight text-[#2C2A27] text-6xl md:text-8xl lg:text-[7rem] mb-3 block">
            <WordBlur text={tx(t.hero.line1, lang)} delay={0.25} />
          </h1>

          {/* H1 — line 2 ochre italic */}
          <h1 className="font-heading font-semibold leading-[0.92] tracking-tight italic text-[#C8832A] text-6xl md:text-8xl lg:text-[7rem] mb-14 block">
            <WordBlur text={tx(t.hero.line2, lang)} delay={0.45} />
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            className="font-sans text-lg md:text-xl text-[#2C2A27]/52 max-w-md mx-auto leading-relaxed mb-14"
          >
            {tx(t.hero.sub, lang)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: EASE }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/join"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2C2A27] text-[#F5F0E8] font-sans font-medium text-xs tracking-[0.18em] uppercase hover:bg-[#C8832A] transition-colors duration-300 rounded-sm"
            >
              {tx(t.hero.cta1, lang)}
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", repeatDelay: 1 }}
              >→</motion.span>
            </Link>
            <Link
              href="/philosophy"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#2C2A27]/20 text-[#2C2A27] font-sans font-medium text-xs tracking-[0.18em] uppercase hover:border-[#2C2A27]/50 hover:bg-[#2C2A27]/4 transition-all duration-300 rounded-sm"
            >
              {tx(t.hero.cta2, lang)}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll bounce indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-px h-8 bg-gradient-to-b from-[#2C2A27]/0 to-[#2C2A27]/30" />
            <div className="w-1 h-1 rounded-full bg-[#C8832A]/60" />
          </motion.div>
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#2C2A27]/30">
            {tx(t.hero.scroll, lang)}
          </span>
        </motion.div>
      </section>
    </>
  );
}
