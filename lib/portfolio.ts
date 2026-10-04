// /portfolio data (2026-10-04).
// Photos: Treewood Films (wetransfer "rajat ji", 29-Sep-2026), 102 unique album
// pages → 24 clean single photos for the gallery + 6 card covers, resized to
// 720x900 WebP in /public/portfolio/. Album pages with text overlays/collages
// were left out. Treewood's consent covers showing these couples' faces.
// No names, dates or places here — none were supplied, so none are invented.
// Page stays noindex + off the nav until Rajat signs off.

import type { GalleryImage } from "@/components/ui/3d-parallax-unfurling-gallery";

type Tri = { en: string; hinglish: string; hi: string };

// Caption per gallery photo, by what the photo shows (no names/places — none supplied).
const CAPTIONS: Record<string, { title: Tri; description: Tri }> = {
  dulhan: {
    title: { en: "The Bride", hinglish: "Dulhan", hi: "दुल्हन" },
    description: {
      en: "A quiet portrait before the day takes over.",
      hinglish: "Din ki bhaag-daud se pehle, ek sukoon bhari tasveer.",
      hi: "दिन की भाग-दौड़ से पहले, एक सुकून भरी तस्वीर।",
    },
  },
  mehendi: {
    title: { en: "Mehendi", hinglish: "Mehendi", hi: "मेहंदी" },
    description: {
      en: "Henna, rings and the small details.",
      hinglish: "Mehendi, angoothi aur chhoti-chhoti baatein.",
      hi: "मेहंदी, अंगूठी और छोटी-छोटी बातें।",
    },
  },
  haldi: {
    title: { en: "Haldi", hinglish: "Haldi", hi: "हल्दी" },
    description: {
      en: "Colour, marigolds and a lot of laughter.",
      hinglish: "Rang, genda aur dher saari hansi.",
      hi: "रंग, गेंदा और ढेर सारी हँसी।",
    },
  },
  sagaai: {
    title: { en: "Engagement", hinglish: "Sagaai", hi: "सगाई" },
    description: {
      en: "The rings, the nerves, the first portraits together.",
      hinglish: "Angoothiyan, thodi ghabrahat, saath ki pehli tasveerein.",
      hi: "अंगूठियाँ, थोड़ी घबराहट, साथ की पहली तस्वीरें।",
    },
  },
  couple: {
    title: { en: "Together", hinglish: "Saath", hi: "साथ" },
    description: {
      en: "Two people, not a crowd.",
      hinglish: "Do log, bheed nahi.",
      hi: "दो लोग, भीड़ नहीं।",
    },
  },
  jaimala: {
    title: { en: "Jaimala", hinglish: "Jaimala", hi: "जयमाला" },
    description: {
      en: "Garlands exchanged, petals in the air.",
      hinglish: "Mala badli, hawa mein phool.",
      hi: "माला बदली, हवा में फूल।",
    },
  },
  shaadi: {
    title: { en: "The Wedding", hinglish: "Shaadi", hi: "शादी" },
    description: {
      en: "The day itself, as it happened.",
      hinglish: "Shaadi ka din, jaisa hua.",
      hi: "शादी का दिन, जैसा हुआ।",
    },
  },
};

// g01..g24 in order (contact-sheet picks 2,11,14,18,43,51,54,60,62,63,64,70,71,73,76,83,84,90,91,92,96,34,1,10)
const GALLERY_KINDS = [
  "dulhan", "dulhan", "mehendi", "dulhan", "dulhan", "couple", "haldi", "haldi",
  "dulhan", "sagaai", "sagaai", "sagaai", "sagaai", "couple", "sagaai", "dulhan",
  "couple", "jaimala", "shaadi", "shaadi", "dulhan", "shaadi", "dulhan", "shaadi",
] as const;

export const GALLERY: { src: string; caption: (typeof CAPTIONS)[string] }[] = GALLERY_KINDS.map((k, i) => ({
  src: `/portfolio/g${String(i + 1).padStart(2, "0")}.webp`,
  caption: CAPTIONS[k],
}));

export const GALLERY_IMAGES: GalleryImage[] = GALLERY.map((g) => ({
  src: g.src,
  alt: `${g.caption.title.en} — wedding photograph by Treewood Films`,
}));

export interface PortfolioProject {
  id: string;
  category: Tri;
  title: Tri;
  summary: Tri;
  date?: string; // shown only when known
  cover: string;
}

export const PROJECTS: PortfolioProject[] = [
  {
    id: "wedding",
    category: { en: "Wedding", hinglish: "Shaadi", hi: "शादी" },
    title: { en: "The Wedding Day", hinglish: "Shaadi Ka Din", hi: "शादी का दिन" },
    summary: {
      en: "Jaimala, pheras and every glance in between — the whole day, as it happened.",
      hinglish: "Jaimala, phere aur beech ki har nazar — poora din, jaisa hua.",
      hi: "जयमाला, फेरे और बीच की हर नज़र — पूरा दिन, जैसा हुआ।",
    },
    cover: "/portfolio/card-wedding.webp",
  },
  {
    id: "engagement",
    category: { en: "Engagement", hinglish: "Sagaai", hi: "सगाई" },
    title: { en: "Ring Ceremony", hinglish: "Ring Ceremony", hi: "रिंग सेरेमनी" },
    summary: {
      en: "The rings, the nerves, the first portraits together.",
      hinglish: "Angoothiyan, thodi ghabrahat, aur saath ki pehli tasveerein.",
      hi: "अंगूठियाँ, थोड़ी घबराहट, और साथ की पहली तस्वीरें।",
    },
    cover: "/portfolio/card-engagement.webp",
  },
  {
    id: "haldi",
    category: { en: "Haldi & Mehendi", hinglish: "Haldi & Mehendi", hi: "हल्दी और मेहंदी" },
    title: { en: "Colour and Laughter", hinglish: "Rang Aur Hansi", hi: "रंग और हँसी" },
    summary: {
      en: "Marigolds, turmeric and family dancing — the loudest day of the week.",
      hinglish: "Genda, haldi aur naachta parivaar — hafte ka sabse rangeen din.",
      hi: "गेंदा, हल्दी और नाचता परिवार — हफ़्ते का सबसे रंगीन दिन।",
    },
    cover: "/portfolio/card-haldi.webp",
  },
  {
    id: "bridal",
    category: { en: "Portraits", hinglish: "Portraits", hi: "पोर्ट्रेट" },
    title: { en: "The Bride", hinglish: "Dulhan", hi: "दुल्हन" },
    summary: {
      en: "Quiet, unhurried portraits before the day takes over.",
      hinglish: "Din ki bhaag-daud se pehle, sukoon se li gayi tasveerein.",
      hi: "दिन की भाग-दौड़ से पहले, सुकून से ली गई तस्वीरें।",
    },
    cover: "/portfolio/card-bridal.webp",
  },
  {
    id: "baraat",
    category: { en: "Baraat", hinglish: "Baraat", hi: "बारात" },
    title: { en: "The Baraat Arrives", hinglish: "Baraat Aa Gayi", hi: "बारात आ गई" },
    summary: {
      en: "Petals in the air and the groom's side in full voice.",
      hinglish: "Hawa mein phool aur poori baraat josh mein.",
      hi: "हवा में फूल और पूरी बारात जोश में।",
    },
    cover: "/portfolio/card-baraat.webp",
  },
  {
    id: "couple",
    category: { en: "Couple Shoot", hinglish: "Couple Shoot", hi: "कपल शूट" },
    title: { en: "Just the Two of Them", hinglish: "Sirf Do Log", hi: "सिर्फ़ दो लोग" },
    summary: {
      en: "Close, candid frames of two people, not a crowd.",
      hinglish: "Do logon ki kareeb, bina banaawat ki tasveerein.",
      hi: "दो लोगों की क़रीब, बिना बनावट की तस्वीरें।",
    },
    cover: "/portfolio/card-couple.webp",
  },
];
