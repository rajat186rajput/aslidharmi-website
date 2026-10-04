"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLang, tx } from "@/lib/i18n";
import { DynamicFrameLayout, type Frame } from "@/components/ui/dynamic-frame-layout";
import { whatsappHref, mailtoFallback, WHATSAPP_MAILTO_FALLBACK } from "@/lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Page copy (trilingual) — /services overview ───────────────────────────
// Services & Bundles spec 2026-09-02. Hard rules: no founder name, no
// geography, no fabricated proof, no pricing, WhatsApp-only CTA.
const C = {
  // P2-2 (consistency-fix-spec-2026-09-02): eyebrow was "Piece of Peace", repeating the h1's
  // own phrase verbatim — changed to a plain category label, matching t.nav.services in
  // lib/i18n.tsx, consistent with every other sub-page's eyebrow-then-headline pattern.
  heroEyebrow: { en: "Services", hinglish: "Services", hi: "सेवाएँ" },
  heroTitle: { en: "A", hinglish: "Ek", hi: "शांति का एक" },
  heroEm: { en: "Piece", hinglish: "Piece", hi: "टुकड़ा" },
  heroTail: { en: "of Peace", hinglish: "of Peace", hi: "" },
  // P2-3: expanded from the 3-word fragment "Peace in Privacy." to a full sentence matching
  // every sibling hero's heroIntro/heroSub length and register (spec's proposed copy, taste —
  // Rajat can reword later; the objective defect fixed here is the length/register mismatch).
  heroSub: {
    en: "Every service handled by one team — quietly, without a hundred phone calls.",
    hinglish: "Har service ek team sambhalti hai — chup-chaap, sau phone calls ke bina.",
    hi: "हर सेवा एक टीम संभालती है — चुपचाप, सौ फ़ोन कॉल्स के बिना।",
  },

  seeEventMgmt: { en: "See Event Management →", hinglish: "Event Management Dekho →", hi: "इवेंट मैनेजमेंट देखें →" },

  ctaHeading: { en: "Let's Talk", hinglish: "Baat Karein", hi: "बात करें" },
  ctaSub: { en: "One conversation. One person. No forms.", hinglish: "Ek baatcheet. Ek insaan. Koi form nahi.", hi: "एक बातचीत। एक व्यक्ति। कोई फ़ॉर्म नहीं।" },
  ctaBtn: { en: "Message Us →", hinglish: "Message Karo →", hi: "संदेश भेजें →" },
  ctaBtnMail: { en: "Email Us →", hinglish: "Email Karo →", hi: "ईमेल भेजें →" },
} as const;

// ─── Service cards — 15 standalone cards, regrouped under 9 categories ──────
// Cards 1-14 verbatim from vault spec "Website Service Cards - 2026-10-04" (bd-ad); card 15
// (Decoration) and the 9 categories from "Website Service Categories - 2026-10-04".
// Hard-coded by design (not DB-wired). English-only site (MULTILINGUAL_ENABLED=false): the
// hinglish/hi strings on cards 1-14 are retained as-is; NEW strings carry en only and reuse
// the English text for hinglish/hi because tx() requires all three keys.
// Makeover is intentionally absent (inactive). No prices, founder name, geography or proof.
const en3 = (s: string) => ({ en: s, hinglish: s, hi: s }); // English reused for hinglish/hi (site is English-only)

const SERVICE_CARDS = {
  label: { en: "What we do", hinglish: "What we do", hi: "What we do" }, // en only (English-only site)
  title: { en: "Everything, Piece by Piece", hinglish: "Everything, Piece by Piece", hi: "Everything, Piece by Piece" },
  sub: {
    en: "Pick what you need. Ask for just that.",
    hinglish: "Pick what you need. Ask for just that.",
    hi: "Pick what you need. Ask for just that.",
  },
  tag: { en: "On its own, or inside a bundle", hinglish: "Akele bhi, bundle mein bhi", hi: "अकेले भी, बंडल में भी" },
  btn: { en: "Ask on WhatsApp →", hinglish: "WhatsApp par poochho →", hi: "WhatsApp पर पूछें →" },
  groups: [
    {
      num: "01",
      cards: [
        {
          id: 1,
          name: { en: "Photo + Video + Reels", hinglish: "Photo + Video + Reels", hi: "फ़ोटो + वीडियो + रील्स" },
          line: {
            en: "Photos, video and reels of your event, with the shoot taken care of for you.",
            hinglish: "Aapke event ke photo, video aur reels, shoot ka poora intezaam hum sambhalte hain.",
            hi: "आपके इवेंट की फ़ोटो, वीडियो और रील्स, शूट का पूरा इंतज़ाम हम संभालते हैं।",
          },
          wa: "Hi! I'd like to know about Photo + Video + Reels.",
        },
        {
          id: 14,
          name: { en: "Pre-wedding Film", hinglish: "Pre-wedding Film", hi: "प्री-वेडिंग फ़िल्म" },
          line: {
            en: "A short film of the two of you before the wedding, planned and shot with you.",
            hinglish: "Shaadi se pehle aap dono ki ek chhoti film, aapke saath plan aur shoot ki hui.",
            hi: "शादी से पहले आप दोनों की एक छोटी फ़िल्म, आपके साथ प्लान और शूट की हुई।",
          },
          wa: "Hi! I'd like to know about a Pre-wedding Film.",
        },
        {
          id: 2,
          name: { en: "Food & Snacks", hinglish: "Food & Snacks", hi: "खाना और नाश्ता" },
          line: {
            en: "Food and snacks for your event, arranged for you.",
            hinglish: "Aapke event ke liye khaana aur snacks ka intezaam.",
            hi: "आपके इवेंट के लिए खाने और नाश्ते का इंतज़ाम।",
          },
          wa: "Hi! I'd like to know about Food & Snacks.",
        },
        {
          id: 3,
          name: { en: "Transport", hinglish: "Transport", hi: "परिवहन" },
          line: {
            en: "Cars and travel for your family and guests, arranged for you.",
            hinglish: "Parivaar aur mehmaanon ki gaadi aur aane-jaane ka intezaam.",
            hi: "परिवार और मेहमानों के लिए गाड़ी और आने-जाने का इंतज़ाम।",
          },
          wa: "Hi! I'd like to know about Transport.",
        },
      ],
    },
    {
      num: "02",
      cards: [
        {
          id: 4,
          name: { en: "Webpage / Social Media", hinglish: "Webpage / Social Media", hi: "वेबपेज / सोशल मीडिया" },
          line: {
            en: "A simple webpage and a tidy social media presence for your shop, work or family occasion.",
            hinglish: "Aapki dukaan, kaam ya parivaar ke mauke ke liye saaf-suthra webpage aur social media.",
            hi: "आपकी दुकान, काम या परिवार के मौक़े के लिए साफ़-सुथरा वेबपेज और सोशल मीडिया।",
          },
          wa: "Hi! I'd like to know about Webpage / Social Media.",
        },
        {
          id: 5,
          name: { en: "3D Design", hinglish: "3D Design", hi: "3D डिज़ाइन" },
          line: {
            en: "See your stage, theme or space in 3D before anything is built.",
            hinglish: "Kuch banne se pehle, apna stage, theme ya jagah 3D mein dekho.",
            hi: "कुछ बनने से पहले, अपना स्टेज, थीम या जगह 3D में देखें।",
          },
          wa: "Hi! I'd like to know about 3D Design.",
        },
        {
          id: 6,
          name: { en: "Big Asset Recording", hinglish: "Big Asset Recording", hi: "बिग एसेट रिकॉर्डिंग" },
          line: {
            en: "A clean film record of something big in your life - a new home, a new vehicle.",
            hinglish: "Zindagi ki kisi badi cheez ka saaf film record - naya ghar, nayi gaadi.",
            hi: "ज़िंदगी की किसी बड़ी चीज़ का साफ़ फ़िल्म रिकॉर्ड - नया घर, नई गाड़ी।",
          },
          wa: "Hi! I'd like to know about Big Asset Recording.",
        },
        {
          id: 7,
          name: { en: "Product Shoot", hinglish: "Product Shoot", hi: "प्रोडक्ट शूट" },
          line: {
            en: "Clear, honest photos of your products, ready for your shop or page.",
            hinglish: "Aapke products ki saaf, sachchi tasveerein, dukaan ya page ke liye taiyaar.",
            hi: "आपके प्रोडक्ट्स की साफ़, सच्ची तस्वीरें, दुकान या पेज के लिए तैयार।",
          },
          wa: "Hi! I'd like to know about Product Shoot.",
        },
        {
          id: 8,
          name: { en: "Video Editing", hinglish: "Video Editing", hi: "वीडियो एडिटिंग" },
          line: {
            en: "Your wedding or event footage, edited into a film you will want to keep. For families, and for other photographers and studios.",
            hinglish: "Aapki shaadi ya event ki footage, ek aisi film mein edit jo aap sambhal kar rakhna chahoge. Parivaaron ke liye, aur doosre photographers aur studios ke liye bhi.",
            hi: "आपकी शादी या इवेंट की फ़ुटेज, एक ऐसी फ़िल्म में एडिट जिसे आप सँभालकर रखना चाहेंगे। परिवारों के लिए, और दूसरे फ़ोटोग्राफ़रों और स्टूडियो के लिए भी।",
          },
          wa: "Hi! I'd like to know about Video Editing.",
        },
      ],
    },
    {
      num: "03",
      cards: [
        {
          id: 9,
          name: { en: "Craft & Gifting", hinglish: "Craft & Gifting", hi: "क्राफ़्ट और गिफ़्टिंग" },
          line: {
            en: "Handmade paper craft and resin keepsakes, made with your names and dates.",
            hinglish: "Haath se bane paper craft aur resin keepsakes, aapke naam aur tareekh ke saath.",
            hi: "हाथ से बने पेपर क्राफ़्ट और रेज़िन कीपसेक, आपके नाम और तारीख़ के साथ।",
          },
          wa: "Hi! I'd like to know about Craft & Gifting.",
        },
        {
          id: 10,
          name: { en: "Tailoring", hinglish: "Tailoring", hi: "सिलाई" },
          line: {
            en: "Stitching and fitting for your occasion, made by skilled hands.",
            hinglish: "Aapke mauke ke liye silai aur fitting, skilled haathon se.",
            hi: "आपके मौक़े के लिए सिलाई और फ़िटिंग, कुशल हाथों से।",
          },
          wa: "Hi! I'd like to know about Tailoring.",
        },
        {
          id: 11,
          name: { en: "Mehndi", hinglish: "Mehndi", hi: "मेहंदी" },
          line: {
            en: "Mehndi for your occasion, arranged for you.",
            hinglish: "Aapke mauke ke liye mehndi ka intezaam.",
            hi: "आपके मौक़े के लिए मेहंदी का इंतज़ाम।",
          },
          wa: "Hi! I'd like to know about Mehndi.",
        },
        {
          id: 12,
          name: { en: "Digital Cards", hinglish: "Digital Cards", hi: "डिजिटल कार्ड्स" },
          line: {
            en: "Invitation cards you can share on WhatsApp, designed for your occasion.",
            hinglish: "WhatsApp par bhejne layak invitation cards, aapke mauke ke hisaab se design.",
            hi: "WhatsApp पर भेजने लायक आमंत्रण कार्ड, आपके मौक़े के हिसाब से डिज़ाइन।",
          },
          wa: "Hi! I'd like to know about Digital Cards.",
        },
      ],
    },
    {
      num: "04",
      cards: [
        {
          id: 13,
          name: { en: "Hill Trips & Stays", hinglish: "Hill Trips & Stays", hi: "पहाड़ की ट्रिप और ठहरना" },
          line: {
            en: "A trip to the hills, with rooms, travel and food arranged for you.",
            hinglish: "Pahad ki trip, kamre, gaadi aur khaane ka intezaam hum karte hain.",
            hi: "पहाड़ की ट्रिप, कमरे, गाड़ी और खाने का इंतज़ाम हम करते हैं।",
          },
          wa: "Hi! I'd like to know about a Hill Trip.",
        },
      ],
    },
  ],
} as const;

type ServiceCard = {
  id: number;
  name: { en: string; hinglish: string; hi: string };
  line: { en: string; hinglish: string; hi: string };
  wa: string;
};

// Card 15 - Decoration (new 2026-10-04, readiness to_arrange: "arranged for you", never "our team").
const DECORATION_CARD: ServiceCard = {
  id: 15,
  name: en3("Decoration"),
  line: en3("Decoration for your event, arranged for you."),
  wa: "Hi! I'd like to know about Decoration.",
};

const CARD_BY_ID: Record<number, ServiceCard> = Object.fromEntries(
  [...SERVICE_CARDS.groups.flatMap((g) => g.cards as readonly ServiceCard[]), DECORATION_CARD].map((c) => [c.id, c]),
);

// ─── 9 categories (row-major 3x3 order = spec order; same order on mobile) ──
// Media paths are wired now; the files may not exist yet (the build never reads them).
const TILE_DIR = "/services/tiles";
const CATEGORIES = [
  { slug: "photos-film", title: "Photos & Film", tagline: "Photos, film and reels for every occasion.", intro: "Memories of your event, shot and edited into something you will want to keep.", cards: [1, 14, 8, 7, 6] },
  { slug: "3d-design", title: "3D Design", tagline: "See it in 3D before it is built.", intro: "Stages, spaces and products shown in 3D first, so you can decide before anything is made.", cards: [5] },
  { slug: "clothing", title: "Clothing", tagline: "Stitched and fitted for your occasion.", intro: "Stitching and fitting, made by skilled hands.", cards: [10] },
  { slug: "food", title: "Food", tagline: "Food and snacks, arranged for you.", intro: "Food and snacks for your event, arranged so you do not have to chase it.", cards: [2] },
  { slug: "gifts", title: "Gifts", tagline: "Handmade keepsakes with your names and dates.", intro: "Handmade paper craft and resin keepsakes, made to be kept.", cards: [9] },
  { slug: "decoration", title: "Decoration", tagline: "Decoration for your event, arranged for you.", intro: "Stage, mandap, flowers and tent, arranged for your occasion.", cards: [15] },
  { slug: "beauty-mehndi", title: "Beauty & Mehndi", tagline: "Mehndi for your occasion, arranged for you.", intro: "Mehndi for your occasion, arranged for you.", cards: [11] },
  { slug: "travel-stay", title: "Travel & Stay", tagline: "Cars, hill trips and stays, arranged for you.", intro: "Cars for your family and guests, and trips to the hills with rooms and food arranged.", cards: [3, 13] },
  { slug: "digital-online", title: "Digital & Online", tagline: "Webpages, social media and digital invitations.", intro: "A simple online presence and invitation cards you can share on WhatsApp.", cards: [4, 12] },
] as const;

const FRAMES: Frame[] = CATEGORIES.map((c, i) => ({
  id: i + 1,
  slug: c.slug,
  title: c.title,
  tagline: c.tagline,
  poster: `${TILE_DIR}/${c.slug}.jpg`,
  video: `${TILE_DIR}/${c.slug}.mp4`,
}));

// Event Management band (spec: below the last category section; small link under the grid scrolls to it).
const EVENT_BAND = {
  id: "event-packages",
  gridLink: "Looking for the whole event? See packages",
  title: "The whole event, one team",
  body: "Planning the whole event? Our packages bring it together with one team: Shaadi, Birthday, Griha Pravesh, Nayi Gaadi and Antim Vidai.",
};

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesClient() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const waLink = whatsappHref("Hi! I'd like to know more about your services.");

  return (
    <main className="bg-cream text-charcoal">

      {/* ── (0) HERO — "Piece of Peace" brand promise ── */}
      <section className="pt-32 pb-20 px-6 md:px-16 border-b border-charcoal/10">
        <div className="max-w-4xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre-deep mb-6">{tx(C.heroEyebrow, lang)}</p>
            <h1 className="font-heading text-5xl md:text-7xl text-charcoal font-semibold leading-[0.92] mb-8">
              {tx(C.heroTitle, lang)} <em className="text-ochre">{tx(C.heroEm, lang)}</em> {tx(C.heroTail, lang)}
            </h1>
            <p className="font-sans text-lg text-charcoal/55 max-w-2xl leading-relaxed">
              {tx(C.heroSub, lang)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── (1) CATEGORY GRID — 9 video tiles; tap/click scrolls to that category's cards ── */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre-deep mb-4">{tx(SERVICE_CARDS.label, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-4 leading-tight">
              {tx(SERVICE_CARDS.title, lang)}
            </h2>
            <p className="font-sans text-lg text-charcoal/55 max-w-2xl leading-relaxed mb-12">{tx(SERVICE_CARDS.sub, lang)}</p>
          </RevealBlock>

          {/* Explicit height at md+: the grid is h-full and relies on its parent. */}
          <div className="md:h-[clamp(520px,75vh,760px)]">
            <DynamicFrameLayout frames={FRAMES} />
          </div>

          <p className="mt-6">
            <a
              href={`#${EVENT_BAND.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(EVENT_BAND.id);
                el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
                if (el) history.replaceState(null, "", `#${EVENT_BAND.id}`);
              }}
              className="font-sans text-sm text-ochre-deep underline underline-offset-4 hover:text-charcoal transition-colors"
            >
              {EVENT_BAND.gridLink}
            </a>
          </p>
        </div>
      </section>

      {/* ── (2) NINE CATEGORY SECTIONS — 15 standalone service cards ── */}
      {CATEGORIES.map((cat, n) => (
        <section
          key={cat.slug}
          id={cat.slug}
          tabIndex={-1}
          data-service-group={cat.slug}
          className="px-6 md:px-16 py-16 md:py-20 border-t border-charcoal/10 scroll-mt-20 outline-none"
        >
          <div className="max-w-6xl mx-auto">
            <RevealBlock>
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-heading text-2xl text-ochre/40 font-bold">{String(n + 1).padStart(2, "0")}</span>
                <h2 className="font-heading text-3xl md:text-4xl text-charcoal font-semibold leading-snug">{cat.title}</h2>
              </div>
              <p className="font-sans text-base text-charcoal/55 max-w-2xl leading-relaxed mb-8">{cat.intro}</p>
            </RevealBlock>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.cards.map((id, ci) => {
                const card = CARD_BY_ID[id];
                const href = whatsappHref(card.wa);
                const name = tx(card.name, lang);
                const btnLabel = tx(href ? SERVICE_CARDS.btn : C.ctaBtnMail, lang);
                return (
                  <motion.div
                    key={card.id}
                    data-service-card={card.id}
                    initial={reduce ? false : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: ci * 0.08, ease: EASE }}
                    viewport={{ once: true, margin: "-40px" }}
                    className="h-full"
                  >
                    <div className="flex flex-col h-full p-8 border border-charcoal/10 hover:border-ochre/40 transition-colors duration-300 min-h-[260px]">
                      <h3 className="font-heading text-2xl text-charcoal font-semibold mb-3 leading-snug">{name}</h3>
                      <p className="font-sans text-sm text-charcoal/55 leading-relaxed mb-4 flex-1">{tx(card.line, lang)}</p>
                      <p className="font-sans text-xs uppercase tracking-wider text-ochre-deep mb-6">{tx(SERVICE_CARDS.tag, lang)}</p>
                      <a
                        href={href ?? mailtoFallback(card.wa)}
                        target={href ? "_blank" : undefined}
                        rel={href ? "noopener noreferrer" : undefined}
                        aria-label={`${btnLabel.replace(/\s*→$/, "")}: ${name}`}
                        className="inline-flex items-center self-start px-6 py-3 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-charcoal transition-colors duration-300 rounded-sm"
                      >
                        {btnLabel}
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ── (2b) EVENT MANAGEMENT BAND — after the last category so it never splits grid from sections ── */}
      <section
        id={EVENT_BAND.id}
        tabIndex={-1}
        className="px-6 md:px-16 py-16 md:py-20 bg-charcoal text-cream scroll-mt-20 outline-none"
      >
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold leading-snug mb-4">{EVENT_BAND.title}</h2>
            <p className="font-sans text-base text-cream/75 max-w-2xl leading-relaxed mb-8">{EVENT_BAND.body}</p>
            <Link
              href="/services/event-management"
              className="inline-flex items-center px-6 py-3 bg-ochre text-cream font-sans font-medium text-xs tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-colors duration-300 rounded-sm"
            >
              {tx(C.seeEventMgmt, lang)}
            </Link>
          </RevealBlock>
        </div>
      </section>

      {/* ── (3) WHATSAPP CTA ── */}
      <section className="px-6 md:px-16 py-32 bg-cream border-t border-charcoal/10">
        <div className="max-w-2xl mx-auto text-center">
          <RevealBlock>
            <div className="w-px h-16 bg-ochre/40 mx-auto mb-12" />
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-6 leading-tight">
              {tx(C.ctaHeading, lang)}
            </h2>
            <p className="font-sans text-base text-charcoal/50 mb-12 leading-relaxed">
              {tx(C.ctaSub, lang)}
            </p>
            <a
              href={waLink ?? WHATSAPP_MAILTO_FALLBACK}
              target={waLink ? "_blank" : undefined}
              rel={waLink ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-ochre text-cream font-sans font-medium text-sm tracking-widest uppercase hover:bg-charcoal transition-colors duration-300 rounded-sm"
            >
              {tx(waLink ? C.ctaBtn : C.ctaBtnMail, lang)}
            </a>
          </RevealBlock>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 border-t border-charcoal/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-heading text-sm text-charcoal/40">© 2026 Asli Dharmi</span>
        <div className="flex gap-8 font-sans text-xs uppercase tracking-widest text-charcoal/40">
          <a href="https://instagram.com/aslidharmi" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">Instagram</a>
          <Link href="/hamari-soch" className="hover:text-charcoal transition-colors">{tx({ en: "Our Soch", hinglish: "Hamari Soch", hi: "हमारी सोच" }, lang)}</Link>
          <a href="mailto:aslidharmi@gmail.com" className="hover:text-charcoal transition-colors">{tx({ en: "Contact", hinglish: "Contact", hi: "संपर्क" }, lang)}</a>
        </div>
      </footer>
    </main>
  );
}
