import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── IA restructure 2026-06-01: old routes → new homes ──
      // About + Philosophy merged into the single "Hamari Soch" narrative page.
      { source: "/about", destination: "/hamari-soch", permanent: true },
      { source: "/philosophy", destination: "/hamari-soch", permanent: true },
      // "Hamare Kaam" folded into the soch→action arc (the #kaam band on /hamari-soch).
      { source: "/kaam", destination: "/hamari-soch#kaam", permanent: true },
      // Finances/Paisa renamed to "Help Us" (dashboard kept intact + donate band on top).
      { source: "/paisa", destination: "/help-us", permanent: true },
    ];
  },
};

export default nextConfig;
