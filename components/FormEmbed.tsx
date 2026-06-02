"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Brand-framed Google Form embed (used on /products and /skills waitlists).
 *
 * TWO MODES:
 * ─────────
 * PLACEHOLDER mode  — when `src` contains the string "PLACEHOLDER"
 *   Renders a clean brand-styled "coming soon" card instead of the iframe.
 *   No broken Google "form not found" box on the live public site.
 *   Swap in a real URL later → iframe renders as normal (1-line code change).
 *
 * LIVE mode  — when `src` is a real Google Form `?embedded=true` URL
 *   Wraps the iframe in a cream/charcoal brand frame so it reads as an
 *   intentional section, not a foreign white box.
 *   Always includes an "Open the form ↗" fallback link (graceful path for
 *   mobile and no-JS clients).
 *
 * Reduced-motion: the outer wrapper appears with no y-offset under the
 * global CSS guard (globals.css) or Framer's useReducedMotion hook.
 *
 * Props:
 *   src         — Google Form `?embedded=true` URL, or the placeholder constant
 *   title       — accessible title for the iframe / aria-label for the card
 *   openLabel   — text for the "open in new tab" fallback link (live mode only)
 *   placeholderHeading — main heading shown in placeholder mode  (trilingual)
 *   placeholderNote    — sub-note shown in placeholder mode  (trilingual)
 */
export function FormEmbed({
  src,
  title,
  openLabel = "Open the form ↗",
  placeholderHeading = "We're opening the waitlist soon",
  placeholderNote = "The form will appear here. We'll notify you when it's live.",
}: {
  src: string;
  title: string;
  openLabel?: string;
  placeholderHeading?: string;
  placeholderNote?: string;
}) {
  const reduce = useReducedMotion();
  const isPlaceholder = src.includes("PLACEHOLDER");

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      viewport={{ once: true, margin: "-40px" }}
      className="max-w-2xl mx-auto"
    >
      {isPlaceholder ? (
        /* ── PLACEHOLDER: clean brand card, no iframe ── */
        <div
          aria-label={title}
          className="border border-ochre/25 rounded-sm bg-cream-dark/30 px-8 py-16 text-center"
        >
          {/* Ochre tick divider */}
          <div className="w-px h-12 bg-ochre/40 mx-auto mb-8" />

          {/* Eyebrow */}
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre/60 mb-5">
            Coming Soon
          </p>

          {/* Heading */}
          <p className="font-heading text-2xl md:text-3xl text-charcoal font-semibold leading-snug mb-6 max-w-sm mx-auto">
            {placeholderHeading}
          </p>

          {/* Sub-note */}
          <p className="font-sans text-sm text-charcoal/45 leading-relaxed max-w-xs mx-auto">
            {placeholderNote}
          </p>
        </div>
      ) : (
        /* ── LIVE: brand-framed Google Form iframe ── */
        <>
          <div className="border border-charcoal/15 rounded-sm overflow-hidden bg-cream-dark/30 shadow-sm">
            <iframe
              src={src}
              title={title}
              className="w-full block"
              style={{ height: 720, minHeight: 640, border: 0 }}
              loading="lazy"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs uppercase tracking-wider text-charcoal/45 hover:text-ochre transition-colors"
            >
              {openLabel}
            </a>
          </div>
        </>
      )}
    </motion.div>
  );
}
