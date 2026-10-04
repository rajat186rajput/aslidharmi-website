import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

// Photography: Treewood Films (our photography partner), credited on the page.
export const metadata: Metadata = {
  title: "Our Work — Asli Dharmi",
  description:
    "A selection of weddings, engagements and celebrations, documented without staging. Photography by Treewood Films.",
  openGraph: {
    title: "Our Work — Asli Dharmi",
    description: "Weddings, engagements and celebrations, documented without staging.",
    url: "https://aslidharmi.in/portfolio",
    siteName: "Asli Dharmi",
    type: "website",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
