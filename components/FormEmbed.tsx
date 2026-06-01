"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Brand-framed Google Form embed (used on /products and /skills waitlists).
 * Wraps a Google Form `?embedded=true` iframe in a cream/charcoal brand frame
 * so it reads as an intentional section, not a foreign white box.
 *
 * Always renders an "Open the form ↗" fallback link below — the graceful path
 * for mobile (embedded forms feel cramped on small screens) and no-JS clients.
 *
 * Reduced-motion: the frame appears with no y-offset (hook-driven, plus the
 * global CSS guard in globals.css).
 */
export function FormEmbed({
  src,
  title,
  openLabel = "Open the form ↗",
}: {
  src: string;
  title: string;
  openLabel?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      viewport={{ once: true, margin: "-40px" }}
      className="max-w-2xl mx-auto"
    >
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
    </motion.div>
  );
}
