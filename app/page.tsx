"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang, t, tx } from "@/lib/i18n";
import { Component as CosmosHero } from "@/components/ui/horizon-hero-section";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  const { lang } = useLang();

  return (
    <main className="bg-cream text-charcoal">
      {/* Three.js cosmos hero — includes nav, scroll sections, and marquee */}
      <CosmosHero />

      {/* ── What We Do — Services (services-forward) ── */}
      <section className="px-6 md:px-16 py-28 bg-cream relative z-10 border-t border-charcoal/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true }}
          >
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/70 mb-4">{tx(t.home.servicesLabel, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-5 leading-tight">
              {tx(t.home.servicesTitle, lang)}
            </h2>
            <p className="font-sans text-base text-charcoal/55 max-w-2xl leading-relaxed mb-16">
              {tx(t.home.servicesIntro, lang)}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.home.services.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <Link
                  href={s.href}
                  className="group flex flex-col h-full p-8 border border-charcoal/10 hover:border-ochre/40 transition-colors duration-300 min-h-[210px]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-3xl text-ochre/20 group-hover:text-ochre/40 font-bold transition-colors">
                      {s.num}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm bg-charcoal/5 text-charcoal/45">
                      {tx(s.status, lang)}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl text-charcoal font-semibold mb-3 leading-snug group-hover:text-ochre transition-colors duration-300">
                    {tx(s.title, lang)}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/55 leading-relaxed mb-6 flex-1">{tx(s.desc, lang)}</p>
                  <span className="font-sans text-xs uppercase tracking-wider text-charcoal/40 group-hover:text-ochre transition-colors">
                    {tx(t.home.learnMore, lang)}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Secondary — soul/transparency links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-3 font-sans text-xs uppercase tracking-wider text-charcoal/40"
          >
            <Link href="/hamari-soch" className="hover:text-ochre transition-colors">{tx(t.home.link1, lang)}</Link>
            <Link href="/samasya" className="hover:text-ochre transition-colors">{tx(t.home.link2, lang)}</Link>
            <Link href="/help-us" className="hover:text-ochre transition-colors">{tx(t.home.link3, lang)}</Link>
          </motion.div>
        </div>
      </section>

      {/* Value Props — philosophy / "what happens here" (supporting section) */}
      <section className="px-6 md:px-16 py-32 bg-cream relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal/35 mb-20 text-center"
          >
            {tx(t.values.label, lang)}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-charcoal/10">
            {t.values.items.map((v, i) => (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
                viewport={{ once: true, margin: "-80px" }}
                className="group px-0 md:px-12 py-12 md:py-0 first:pl-0 last:pr-0"
              >
                <span className="block font-heading text-5xl text-ochre/15 group-hover:text-ochre/30 transition-colors duration-500 font-bold mb-6 select-none">
                  {v.num}
                </span>
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-4 leading-snug">
                  {tx(v.title, lang)}
                </h3>
                <p className="font-sans text-base text-charcoal/55 leading-relaxed">{tx(v.body, lang)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 md:px-16 py-32 bg-charcoal relative overflow-hidden z-10">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative"
        >
          <span className="font-heading text-8xl text-ochre/20 leading-none block mb-6">&ldquo;</span>
          <blockquote className="font-heading text-3xl md:text-4xl text-cream font-semibold leading-snug mb-10">
            {tx(t.quote.text, lang)}
          </blockquote>
          <p className="font-sans text-sm text-cream/40 tracking-widest uppercase">{tx(t.quote.attr, lang)}</p>
          <div className="mt-12">
            <Link
              href="/hamari-soch"
              className="inline-flex items-center gap-3 font-sans text-sm text-cream/60 hover:text-ochre transition-colors duration-300 tracking-wide uppercase"
            >
              {tx(t.quote.cta, lang)}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Join CTA */}
      <section className="px-6 md:px-16 py-32 bg-cream relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true }}
          >
            <div className="w-px h-16 bg-ochre/40 mx-auto mb-12" />
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-6 leading-tight">
              {tx(t.joinCta.ready, lang)}
            </h2>
            <p className="font-sans text-base text-charcoal/50 mb-12 leading-relaxed">
              {tx(t.joinCta.sub, lang)}
            </p>
            <Link
              href="/join"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-ochre text-cream font-sans font-medium text-sm tracking-widest uppercase hover:bg-charcoal transition-colors duration-300 rounded-sm"
            >
              {tx(t.joinCta.cta, lang)}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-charcoal/10 flex flex-col md:flex-row items-center justify-between gap-4 bg-cream relative z-10">
        <span className="font-heading text-sm text-charcoal/40">{tx(t.footer.copy, lang)}</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-charcoal/40">
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">Instagram</a>
          <Link href="/hamari-soch" className="hover:text-charcoal transition-colors">{tx(t.nav.soch, lang)}</Link>
          <a href="mailto:aslidharmi@gmail.com" className="hover:text-charcoal transition-colors">{tx(t.footer.contact, lang)}</a>
        </div>
      </footer>
    </main>
  );
}
