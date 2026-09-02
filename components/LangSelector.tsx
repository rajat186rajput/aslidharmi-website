"use client";

import { useLang, LANG_LABELS, Lang } from "@/lib/i18n";
import { motion } from "framer-motion";

const LANGS: Lang[] = ["hinglish", "hi", "en"];

export function LangSelector({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-0.5 rounded-sm overflow-hidden border border-charcoal/15 shrink-0">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          // P2-5 (consistency-fix-spec-2026-09-02): हिं reads optically smaller/cramped next
          // to HG/EN at the same class string — lang="hi" is correct for a11y regardless,
          // and data-devanagari is a narrow, button-scoped hook (NOT the sitewide
          // [lang="hi"]/[data-lang="hi"] body-copy rules in globals.css, which are a
          // different concept — "Hindi is the active reading language" — left untouched).
          lang={l === "hi" ? "hi" : undefined}
          data-devanagari={l === "hi" ? "" : undefined}
          className={`relative px-2.5 py-1 font-sans text-xs font-medium tracking-wider transition-colors duration-200 ${
            lang === l
              ? dark
                ? "bg-ochre text-cream"
                : "bg-charcoal text-cream"
              : dark
              ? "text-cream/40 hover:text-cream/70"
              : "text-charcoal/40 hover:text-charcoal/70"
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className={`absolute inset-0 ${dark ? "bg-ochre" : "bg-charcoal"} -z-10`}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
