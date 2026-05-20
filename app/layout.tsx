import type { Metadata } from "next";
import { Playfair_Display, Hind } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
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
  description:
    "Asli Dharmi ek philosophy movement hai — jo sochta hai usse jeeta hai. Join the movement.",
  openGraph: {
    title: "Asli Dharmi",
    description: "Philosophy movement rooted in Dharma, not religion.",
    url: "https://aslidharmi.in",
    siteName: "Asli Dharmi",
    locale: "hi_IN",
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
      lang="hi"
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
