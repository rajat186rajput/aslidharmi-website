"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream flex flex-col">
      {/* Nav */}
      <nav className="w-full px-6 md:px-16 py-5 flex items-center justify-between border-b border-charcoal/10">
        <Link href="/" className="font-heading text-xl font-semibold text-charcoal tracking-tight">
          Asli Dharmi
        </Link>
        <div className="hidden md:flex items-center gap-8 font-sans text-sm text-charcoal/70">
          <Link href="/about" className="hover:text-charcoal transition-colors">Hamare Baare Mein</Link>
          <Link href="/philosophy" className="hover:text-charcoal transition-colors">Philosophy</Link>
          <Link href="/content" className="hover:text-charcoal transition-colors">Content</Link>
          <Link href="/join" className="px-4 py-2 bg-ochre text-cream rounded-sm text-sm font-medium hover:bg-ochre-light transition-colors">
            Judiye
          </Link>
        </div>
      </nav>

      <section className="flex-1 flex flex-col justify-center px-6 md:px-16 py-24 max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-sans text-sm uppercase tracking-[0.2em] text-ochre mb-6"
        >
          Baat karo
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl md:text-5xl font-semibold text-charcoal leading-tight mb-8"
        >
          Seedha baat karo — <span className="text-ochre">koi gatekeeping nahi.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="space-y-8"
        >
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-charcoal/40 mb-2">Preferred</p>
            <a
              href="https://instagram.com/aslidharmi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-2xl text-charcoal hover:text-ochre transition-colors"
            >
              @aslidharmi on Instagram
            </a>
            <p className="font-sans text-sm text-charcoal/50 mt-1">
              DM karo — real conversations welcome hain.
            </p>
          </div>

          <div className="w-8 h-px bg-charcoal/15" />

          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-charcoal/40 mb-2">Email</p>
            <a
              href="mailto:aslidharmi@gmail.com"
              className="font-heading text-2xl text-charcoal hover:text-ochre transition-colors"
            >
              aslidharmi@gmail.com
            </a>
            <p className="font-sans text-sm text-charcoal/50 mt-1">
              Collaborations, feedback, ya kuch bhi — Rajat personally padhta hai.
            </p>
          </div>

          <div className="w-8 h-px bg-charcoal/15" />

          <p className="font-sans text-sm text-charcoal/50 leading-relaxed">
            Movement mein judna hai? <Link href="/join" className="text-ochre hover:underline">Yahan join karo</Link> — contact form se better hai.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-charcoal/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-charcoal/50">© 2026 Asli Dharmi</span>
        <div className="flex gap-6 font-sans text-sm text-charcoal/50">
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">Instagram</a>
          <a href="mailto:aslidharmi@gmail.com" className="hover:text-charcoal transition-colors">Contact</a>
        </div>
      </footer>
    </main>
  );
}
