import { redirect } from "next/navigation";

// IA restructure 2026-06-01: /kaam folded into the soch→action arc on /hamari-soch (#kaam band).
// next.config.ts also 308-redirects this route; this stub is a belt-and-braces fallback.
export default function KaamRedirect() {
  redirect("/hamari-soch#kaam");
}
