import type { Metadata } from "next";
import { MULTILINGUAL_ENABLED } from "@/lib/multilingual";
import ServicesClient from "./ServicesClient";

// Page-specific SEO metadata (2026-09-02 QA fix). Split into a server-component
// page.tsx + client-component ServicesClient.tsx because Next.js App Router does
// not allow `export const metadata` from a "use client" file — this page's body
// needs client hooks (useLang, framer-motion) so the content stays client-side.
// Copy follows the same hard rules as the page itself: no personal name, no
// place name, no pricing, no claim of work already done — plain and true.
export const metadata: Metadata = {
  title: "Services — Asli Dharmi",
  description:
    "Photos and film, 3D design, clothing, food, gifts, decoration, travel and digital, one team for every occasion.",
  openGraph: {
    title: "Services — Asli Dharmi",
    description:
      "Photos and film, 3D design, clothing, food, gifts, decoration, travel and digital, one team for every occasion.",
    url: "https://aslidharmi.in/services",
    siteName: "Asli Dharmi",
    locale: MULTILINGUAL_ENABLED ? "hi_IN" : "en_IN",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
