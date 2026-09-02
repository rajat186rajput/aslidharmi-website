// WhatsApp CTA helper — mirrors FormEmbed's PLACEHOLDER-string pattern (components/FormEmbed.tsx).
// 2026-09-02 ruling: no phone number is published on the site right now — this is
// deliberately withheld, not merely missing. Format when supplied: E.164
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
