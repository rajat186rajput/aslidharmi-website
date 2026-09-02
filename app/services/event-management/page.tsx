import type { Metadata } from "next";
import EventManagementClient from "./EventManagementClient";

// Page-specific SEO metadata (2026-09-02 QA fix). Split into a server-component
// page.tsx + client-component EventManagementClient.tsx because Next.js App
// Router does not allow `export const metadata` from a "use client" file — this
// page's body needs client hooks (useLang, framer-motion) so the content stays
// client-side. Copy follows the same hard rules as the page itself: no personal
// name, no place name, no pricing, no claim of work already done.
export const metadata: Metadata = {
  title: "Event Management — Asli Dharmi",
  description:
    "One team for Shaadi, Birthday, Griha Pravesh, Nayi Gaadi and Antim Vidai — start to finish, one point of contact. No pricing, no booking form.",
  openGraph: {
    title: "Event Management — Asli Dharmi",
    description:
      "One team for every life moment — start to finish, one point of contact.",
    url: "https://aslidharmi.in/services/event-management",
    siteName: "Asli Dharmi",
    locale: "hi_IN",
    type: "website",
  },
};

export default function EventManagementPage() {
  return <EventManagementClient />;
}
