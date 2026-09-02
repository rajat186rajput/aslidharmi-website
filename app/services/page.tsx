import type { Metadata } from "next";
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
    "Event management, technical services, and handmade craft — one team, one conversation, start to finish. No pricing, no booking form.",
  openGraph: {
    title: "Services — Asli Dharmi",
    description:
      "Event management, technical services, and handmade craft — one team, one conversation, start to finish.",
    url: "https://aslidharmi.in/services",
    siteName: "Asli Dharmi",
    locale: "hi_IN",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
