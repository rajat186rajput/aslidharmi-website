import { redirect } from "next/navigation";

// IA restructure 2026-06-01: /philosophy merged into /hamari-soch (10 beliefs live there).
// next.config.ts also 308-redirects this route; this stub is a belt-and-braces fallback.
export default function PhilosophyRedirect() {
  redirect("/hamari-soch");
}
