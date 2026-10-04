// Rajat 2026-10-04: English-only until he says otherwise. Flip to true to restore en/hinglish/hi.
// Lives in a plain (non-"use client") module so server components (app/layout.tsx) can read the value.
// lib/i18n.tsx re-exports it. This is the ONE line to flip.
export const MULTILINGUAL_ENABLED: boolean = false;
