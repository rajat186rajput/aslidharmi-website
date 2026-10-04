"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLang, tx } from "@/lib/i18n";
import { whatsappHref, WHATSAPP_MAILTO_FALLBACK } from "@/lib/whatsapp";

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

  bucketsLabel: { en: "What We Do", hinglish: "Hum Kya Karte Hain", hi: "हम क्या करते हैं" },
  bucketsTitle: { en: "Four Ways We Help", hinglish: "Chaar Tareeke Se Madad", hi: "मदद के चार तरीक़े" },

  buckets: [
    {
      num: "01",
      title: { en: "Event Management", hinglish: "Event Management", hi: "इवेंट मैनेजमेंट" },
      items: {
        en: "Shaadi · Birthday · Griha Pravesh · Nayi Gaadi · Antim Vidai",
        hinglish: "Shaadi · Birthday · Griha Pravesh · Nayi Gaadi · Antim Vidai",
        hi: "शादी · बर्थडे · गृह प्रवेश · नई गाड़ी · अंतिम विदाई",
      },
      desc: {
        en: "Every life moment, one team, start to finish.",
        hinglish: "Har zindagi ke pal, ek team, shuru se aakhir tak.",
        hi: "जीवन का हर पल, एक टीम, शुरू से अंत तक।",
      },
      linkable: true,
      href: "/services/event-management",
    },
    {
      num: "02",
      title: { en: "Technical Services", hinglish: "Technical Services", hi: "तकनीकी सेवाएँ" },
      items: {
        en: "Webpage/Social Media · 3D Design · Product Shoot · Big Asset Recording",
        hinglish: "Webpage/Social Media · 3D Design · Product Shoot · Big Asset Recording",
        hi: "वेबपेज/सोशल मीडिया · 3D डिज़ाइन · प्रोडक्ट शूट · बिग एसेट रिकॉर्डिंग",
      },
      desc: {
        en: "The digital work that makes the day easier to plan and easier to remember.",
        hinglish: "Digital kaam jo din ko plan karna aur yaad rakhna dono aasan banata hai.",
        hi: "डिजिटल काम जो दिन को योजना बनाना और याद रखना दोनों आसान बनाता है।",
      },
      linkable: false,
    },
    {
      num: "03",
      title: { en: "Arts & Customisation", hinglish: "Arts & Customisation", hi: "कला और अनुकूलन" },
      items: {
        en: "Craft & Gifting · Tailoring · Makeover · Mehndi · Digital Cards",
        hinglish: "Craft & Gifting · Tailoring · Makeover · Mehndi · Digital Cards",
        hi: "क्राफ़्ट और गिफ़्टिंग · सिलाई · मेकओवर · मेहंदी · डिजिटल कार्ड्स",
      },
      desc: {
        en: "Handmade craft, tailoring, and personal styling — made by skilled hands.",
        hinglish: "Haath se bana craft, tailoring, aur personal styling — skilled haathon se.",
        hi: "हस्तनिर्मित शिल्प, सिलाई, और व्यक्तिगत स्टाइलिंग — कुशल हाथों से।",
      },
      linkable: false,
    },
    // Hospitality (2026-09-02, Rajat's annotation): hill trips/homestay arranged at OTHER
    // people's properties for now, not Asli Dharmi's own — copy must not imply ownership,
    // and no place names (landscape words like "pahad"/"hills" are fine, no town/state names).
    {
      num: "04",
      title: { en: "Hospitality", hinglish: "Hospitality", hi: "आतिथ्य" },
      items: {
        en: "Hill Trips · Honeymoon · Family Getaway · Stay Arrangements",
        hinglish: "Pahad ki Trip · Honeymoon · Parivaar ka Getaway · Thehrne ka Intezaam",
        hi: "पहाड़ की ट्रिप · हनीमून · परिवार का गेटअवे · ठहरने का इंतज़ाम",
      },
      desc: {
        en: "Two nights in the hills after the wedding — rooms, travel, food, all arranged.",
        hinglish: "Shaadi ke baad do raat pahad mein — kamre, gaadi, khaana, sab intezaam.",
        hi: "शादी के बाद पहाड़ में दो रातें — कमरे, गाड़ी, खाना, सब इंतज़ाम।",
      },
      linkable: false,
    },
  ],

  seeEventMgmt: { en: "See Event Management →", hinglish: "Event Management Dekho →", hi: "इवेंट मैनेजमेंट देखें →" },

  ctaHeading: { en: "Let's Talk", hinglish: "Baat Karein", hi: "बात करें" },
  ctaSub: { en: "One conversation. One person. No forms.", hinglish: "Ek baatcheet. Ek insaan. Koi form nahi.", hi: "एक बातचीत। एक व्यक्ति। कोई फ़ॉर्म नहीं।" },
  ctaBtn: { en: "Message Us →", hinglish: "Message Karo →", hi: "संदेश भेजें →" },
  ctaBtnMail: { en: "Email Us →", hinglish: "Email Karo →", hi: "ईमेल भेजें →" },
} as const;

// ─── "Har Service Alag Se" — 14 standalone service cards ───────────────────
// Verbatim from vault spec "Website Service Cards - 2026-10-04" (bd-ad). Hard-coded by
// design (not DB-wired); re-sync when ad_services.active changes. Bucket order 01-04 and
// card order follow the spec (Pre-wedding Film sits after Photo + Video + Reels).
// Makeover is intentionally absent (inactive) but stays in the bucket-03 line above.
// No prices, founder name, geography or proof. Hindi needs a native read before ship.
const SERVICE_CARDS = {
  label: { en: "Each Service", hinglish: "Har Service", hi: "हर सेवा" },
  title: { en: "Each Service, On Its Own", hinglish: "Har Service Alag Se", hi: "हर सेवा, अलग से" },
  sub: {
    en: "Need just one thing? Ask for just that.",
    hinglish: "Sirf ek cheez chahiye? Sirf wahi poochho.",
    hi: "सिर्फ़ एक चीज़ चाहिए? सिर्फ़ वही पूछिए।",
  },
  tag: { en: "On its own, or inside a bundle", hinglish: "Akele bhi, bundle mein bhi", hi: "अकेले भी, बंडल में भी" },
  btn: { en: "Ask on WhatsApp →", hinglish: "WhatsApp par poochho →", hi: "WhatsApp पर पूछें →" },
  // groups[i] pairs with C.buckets[i] (same order) for the bucket heading.
  // Mailto fallback label reuses the page's existing C.ctaBtnMail.
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

      {/* ── (1) THREE SERVICE BUCKETS ── */}
      <section className="px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre-deep mb-4">{tx(C.bucketsLabel, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-16 leading-tight">
              {tx(C.bucketsTitle, lang)}
            </h2>
          </RevealBlock>

          {/* 2-col grid for 4 buckets (was 3-col for 3) — matches the sitewide 4-card pattern
              already used for the home "What We Do" initiatives band (app/page.tsx) and the
              /products teaser categories, rather than leaving an orphan on a 3-col grid. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {C.buckets.map((b, i) => {
              const cardBody = (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-3xl text-ochre/20 group-hover:text-ochre/40 font-bold transition-colors">
                      {b.num}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl text-charcoal font-semibold mb-3 leading-snug group-hover:text-ochre transition-colors duration-300">
                    {tx(b.title, lang)}
                  </h3>
                  <p className="font-sans text-sm text-ochre/70 leading-relaxed mb-4">{tx(b.items, lang)}</p>
                  <p className="font-sans text-sm text-charcoal/55 leading-relaxed mb-6 flex-1">{tx(b.desc, lang)}</p>
                  {b.linkable && (
                    <span className="font-sans text-xs uppercase tracking-wider text-charcoal/40 group-hover:text-ochre transition-colors">
                      {tx(C.seeEventMgmt, lang)}
                    </span>
                  )}
                </>
              );
              return (
                <motion.div
                  key={b.num}
                  initial={reduce ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {b.linkable ? (
                    <Link
                      href={b.href!}
                      className="group flex flex-col h-full p-8 border border-charcoal/10 hover:border-ochre/40 transition-colors duration-300 min-h-[210px]"
                    >
                      {cardBody}
                    </Link>
                  ) : (
                    <div className="flex flex-col h-full p-8 border border-charcoal/10 cursor-default min-h-[210px]">
                      {cardBody}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* PHASE 2 — after first events: testimonials / portfolio grid / event count. DO NOT populate with placeholder content. */}
        </div>
      </section>

      {/* ── (2) HAR SERVICE ALAG SE — 14 standalone service cards ── */}
      <section className="px-6 md:px-16 py-24 border-t border-charcoal/10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-ochre-deep mb-4">{tx(SERVICE_CARDS.label, lang)}</p>
            <h2 className="font-heading text-4xl md:text-5xl text-charcoal font-semibold mb-4 leading-tight">
              {tx(SERVICE_CARDS.title, lang)}
            </h2>
            <p className="font-sans text-lg text-charcoal/55 max-w-2xl leading-relaxed mb-16">{tx(SERVICE_CARDS.sub, lang)}</p>
          </RevealBlock>

          <div className="space-y-16">
            {SERVICE_CARDS.groups.map((g, gi) => (
              <div key={g.num} data-service-group={g.num}>
                <RevealBlock>
                  <div className="flex items-baseline gap-4 mb-6 pb-3 border-b border-charcoal/10">
                    <span className="font-heading text-2xl text-ochre/40 font-bold">{g.num}</span>
                    <h3 className="font-heading text-xl md:text-2xl text-charcoal font-semibold leading-snug">
                      {tx(C.buckets[gi].title, lang)}
                    </h3>
                  </div>
                </RevealBlock>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {g.cards.map((card, ci) => {
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
                          <h4 className="font-heading text-2xl text-charcoal font-semibold mb-3 leading-snug">{name}</h4>
                          <p className="font-sans text-sm text-charcoal/55 leading-relaxed mb-4 flex-1">{tx(card.line, lang)}</p>
                          <p className="font-sans text-xs uppercase tracking-wider text-ochre-deep mb-6">{tx(SERVICE_CARDS.tag, lang)}</p>
                          <a
                            href={href ?? WHATSAPP_MAILTO_FALLBACK}
                            target={href ? "_blank" : undefined}
                            rel={href ? "noopener noreferrer" : undefined}
                            aria-label={`${btnLabel} ${name}`}
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
            ))}
          </div>
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
