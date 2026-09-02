// WhatsApp CTA helper — mirrors FormEmbed's PLACEHOLDER-string pattern (components/FormEmbed.tsx).
// DEV TODO: Rajat to supply the real WhatsApp business number in E.164 format
// (e.g. "91XXXXXXXXXX", no "+", no spaces). One-line swap when ready.
const WHATSAPP_NUMBER = "PLACEHOLDER_WHATSAPP_NUMBER";

// Working interim channel until the number is set — confirm this is the
// dedicated brand account (feedback_brand_dedicated_email), never personal Gmail.
export const WHATSAPP_MAILTO_FALLBACK =
  "mailto:aslidharmi@gmail.com?subject=" + encodeURIComponent("Services enquiry");

export function whatsappHref(message: string): string | null {
  if (WHATSAPP_NUMBER.includes("PLACEHOLDER")) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
