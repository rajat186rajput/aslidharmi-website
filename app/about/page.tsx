import { redirect } from "next/navigation";

// IA restructure 2026-06-01: /about merged into /hamari-soch (depersonalised).
// next.config.ts also 308-redirects this route; this stub is a belt-and-braces fallback.
export default function AboutRedirect() {
  redirect("/hamari-soch");
}
