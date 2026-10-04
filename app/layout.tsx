import type { Metadata } from "next";
import { Playfair_Display, Hind } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { MULTILINGUAL_ENABLED } from "@/lib/multilingual";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hind = Hind({
  variable: "--font-hind",
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Asli Dharmi — Philosophy in Action",
  // English-only mode uses the existing en OG line; the Hinglish text is kept for restore.
  description: MULTILINGUAL_ENABLED
    ? "Asli Dharmi ek philosophy movement hai — jo sochta hai usse jeeta hai. Join the movement."
    : "Philosophy movement rooted in Dharma, not religion.",
  openGraph: {
    title: "Asli Dharmi",
    description: "Philosophy movement rooted in Dharma, not religion.",
    url: "https://aslidharmi.in",
    siteName: "Asli Dharmi",
    locale: MULTILINGUAL_ENABLED ? "hi_IN" : "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={MULTILINGUAL_ENABLED ? "hi" : "en"}
      className={`${playfair.variable} ${hind.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <LanguageProvider>
          <AnimatedNavFramer />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
