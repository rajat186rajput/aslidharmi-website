"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang, tx } from "@/lib/i18n";
import { whatsappHref, mailtoFallback } from "@/lib/whatsapp";
import ParallaxUnfurlingGallery from "@/components/ui/3d-parallax-unfurling-gallery";
import { GALLERY_IMAGES, PROJECTS } from "@/lib/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Page copy (trilingual) — skeleton wording, Rajat to finalise ──────────
const C = {
  eyebrow: { en: "Our Work", hinglish: "Hamara Kaam", hi: "हमारा काम" },
  title: { en: "Work,", hinglish: "Kaam,", hi: "काम," },
  titleEm: { en: "not words", hinglish: "baatein nahi", hi: "बातें नहीं" },
  sub: {
    en: "A look at what we have done — events, shoots and craft, as they actually happened.",
    hinglish: "Jo kiya hai, uski ek jhalak — events, shoots aur craft, jaise sach mein hue.",
    hi: "जो किया है, उसकी एक झलक — इवेंट, शूट और शिल्प, जैसे सच में हुए।",
  },
  scrollHint: { en: "Scroll", hinglish: "Scroll karein", hi: "स्क्रॉल करें" },
  projectsLabel: { en: "Projects", hinglish: "Projects", hi: "प्रोजेक्ट्स" },
  projectsTitle: { en: "Job by Job", hinglish: "Ek-Ek Kaam", hi: "एक-एक काम" },
  ctaTitle: { en: "Want something like this?", hinglish: "Aisa kuch chahiye?", hi: "ऐसा कुछ चाहिए?" },
  ctaBtn: { en: "Talk to us", hinglish: "Baat karein", hi: "बात करें" },
};

export default function PortfolioClient() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const ctaMsg = "Hi! I saw your work page and would like to talk.";
  const ctaHref = whatsappHref(ctaMsg) ?? mailtoFallback("Portfolio enquiry");

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <main className="flex-1">
      {/* 1 — Hero */}
      <section className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 pt-28 pb-16 text-center">
        <motion.p {...fadeUp(0)} className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-ochre-deep">
          {tx(C.eyebrow, lang)}
        </motion.p>
        <motion.h1
          {...fadeUp(0.1)}
          className="font-heading text-5xl font-semibold leading-tight text-charcoal sm:text-6xl md:text-7xl"
        >
          {tx(C.title, lang)} <em className="text-ochre">{tx(C.titleEm, lang)}</em>
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="mt-6 max-w-2xl text-lg text-charcoal/70">
          {tx(C.sub, lang)}
        </motion.p>
        <motion.p {...fadeUp(0.35)} className="mt-12 text-xs uppercase tracking-[0.25em] text-charcoal/40">
          {tx(C.scrollHint, lang)} ↓
        </motion.p>
      </section>

      {/* 2 — 3D parallax gallery */}
      <ParallaxUnfurlingGallery images={GALLERY_IMAGES} heightVh={400} />

      {/* 3 — Project cards */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <motion.p {...fadeUp(0)} className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-ochre-deep">
          {tx(C.projectsLabel, lang)}
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="mb-12 font-heading text-4xl font-semibold text-charcoal">
          {tx(C.projectsTitle, lang)}
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              {...fadeUp(0.05 * (i % 3))}
              className="group overflow-hidden rounded-2xl border border-charcoal/10 bg-cream-dark/60"
            >
              <div className="aspect-[4/3] overflow-hidden bg-charcoal/10">
                {/* eslint-disable-next-line @next/next/no-img-element -- placeholder remote URLs */}
                <img
                  src={p.cover}
                  alt={tx(p.title, lang)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wider text-charcoal/50">
                  <span className="text-ochre-deep">{tx(p.category, lang)}</span>
                  <span>{p.date}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-charcoal">{tx(p.title, lang)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{tx(p.summary, lang)}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 4 — CTA */}
      <section className="bg-charcoal px-6 py-20 text-center text-cream">
        <motion.h2 {...fadeUp(0)} className="font-heading text-3xl font-semibold sm:text-4xl">
          {tx(C.ctaTitle, lang)}
        </motion.h2>
        <motion.a
          {...fadeUp(0.1)}
          href={ctaHref}
          target={ctaHref.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-ochre px-8 py-3 font-medium text-charcoal transition-colors hover:bg-ochre-light"
        >
          {tx(C.ctaBtn, lang)}
        </motion.a>
      </section>
    </main>
  );
}
