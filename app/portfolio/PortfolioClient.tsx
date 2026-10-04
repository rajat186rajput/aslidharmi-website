"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLang, tx } from "@/lib/i18n";
import { whatsappHref, mailtoFallback } from "@/lib/whatsapp";
import ParallaxUnfurlingGallery from "@/components/ui/3d-parallax-unfurling-gallery";
import { LuminaViewer } from "@/components/ui/lumina-interactive-list";
import { GALLERY, GALLERY_IMAGES, PROJECTS } from "@/lib/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Page copy (trilingual) — skeleton wording, Rajat to finalise ──────────
const E = (en: string, hi: string) => ({ en, hinglish: en, hi });

// Formal English (Rajat, 2026-10-04): the hinglish key carries the English text.
const C = {
  eyebrow: E("Our Work", "हमारा काम"),
  title: E("The work,", "काम,"),
  titleEm: E("as it happened", "जैसा हुआ"),
  sub: E(
    "A selection of weddings, engagements and celebrations, documented without staging.",
    "शादियों, सगाइयों और उत्सवों की एक झलक, बिना किसी बनावट के।"
  ),
  credit: E(
    "Photography by Treewood Films, our photography partner",
    "फ़ोटोग्राफ़ी: Treewood Films, हमारे फ़ोटोग्राफ़ी पार्टनर"
  ),
  close: E("Close", "बंद करें"),
  scrollHint: E(
    "Scroll to explore · Select any photograph to view it in full",
    "स्क्रॉल करें · पूरी तस्वीर देखने के लिए किसी पर भी क्लिक करें"
  ),
  projectsLabel: E("Projects", "प्रोजेक्ट्स"),
  projectsTitle: E("Selected Work", "चुनिंदा काम"),
  ctaTitle: E("Planning an occasion?", "कोई अवसर आने वाला है?"),
  ctaBtn: E("Get in touch", "संपर्क करें"),
};


export default function PortfolioClient() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const ctaMsg = "Hello, I saw your portfolio and would like to discuss an upcoming occasion.";
  const ctaHref = whatsappHref(ctaMsg) ?? mailtoFallback("Portfolio enquiry");
  const [viewerAt, setViewerAt] = useState<number | null>(null);
  const slides = useMemo(
    () =>
      GALLERY.map((g) => ({
        src: g.full,
        title: tx(g.caption.title, lang),
        description: tx(g.caption.description, lang),
      })),
    [lang]
  );

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
        <motion.p {...fadeUp(0.3)} className="mt-4 text-sm text-charcoal/50">
          {tx(C.credit, lang)}
        </motion.p>
        <motion.p {...fadeUp(0.35)} className="mt-12 text-xs uppercase tracking-[0.25em] text-charcoal/40">
          {tx(C.scrollHint, lang)}
        </motion.p>
      </section>

      {/* 2 — 3D parallax gallery */}
      <ParallaxUnfurlingGallery images={GALLERY_IMAGES} heightVh={900} onSelect={setViewerAt} />
      {viewerAt !== null && (
        <LuminaViewer
          slides={slides}
          startIndex={viewerAt}
          onClose={() => setViewerAt(null)}
          closeLabel={tx(C.close, lang)}
        />
      )}

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
                  {p.date && <span>{p.date}</span>}
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
