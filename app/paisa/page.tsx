import { redirect } from "next/navigation";

// IA restructure 2026-06-01: /paisa renamed to /help-us (dashboard kept intact + donate band on top).
// next.config.ts also 308-redirects this route; this stub is a belt-and-braces fallback.
export default function PaisaRedirect() {
  redirect("/help-us");
}
