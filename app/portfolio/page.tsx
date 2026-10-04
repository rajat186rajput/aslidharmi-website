import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

// SKELETON (2026-10-04): placeholder content — noindex until lib/portfolio.ts
// carries real work, and the route is deliberately NOT in the nav yet.
export const metadata: Metadata = {
  title: "Hamara Kaam — Asli Dharmi",
  description: "A look at the work — events, shoots and craft, as they actually happened.",
  robots: { index: false, follow: false },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
