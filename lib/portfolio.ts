// /portfolio data (2026-10-04).
// Photos: Treewood Films (wetransfer "rajat ji", 29-Sep-2026). 113 files -> 102
// unique -> 101 used (the logo card is left out). Two sizes in /public/portfolio/:
// thumb/ 480x600 for the 3D gallery, full/ 1080x1350 for the fullscreen viewer.
// Treewood's consent covers showing these couples' faces.
// Captions describe what each photo shows. No names, dates or places: none
// were supplied, so none are invented.
// Copy is formal English (Rajat, 2026-10-04): the `hinglish` key carries the
// same English text so the site's default language shows English on this page.
// Page stays noindex + off the nav until Rajat signs off.

import type { GalleryImage } from "@/components/ui/3d-parallax-unfurling-gallery";

export type Tri = { en: string; hinglish: string; hi: string };

/** English for en + hinglish, Hindi for hi. */
const T = (en: string, hi: string): Tri => ({ en, hinglish: en, hi });

const CAPTIONS = {
  bride: { title: T("The Bride", "दुल्हन"), description: T("A quiet portrait before the day begins.", "दिन शुरू होने से पहले, एक शांत तस्वीर।") },
  groom: { title: T("The Groom", "दूल्हा"), description: T("Composed, ready and waiting.", "तैयार, शांत और इंतज़ार में।") },
  couple: { title: T("Together", "साथ"), description: T("Two people, unhurried and at ease.", "दो लोग, बिना जल्दबाज़ी के, सहज।") },
  engagement: { title: T("The Engagement", "सगाई"), description: T("The rings, the nerves and the first portraits together.", "अंगूठियाँ, थोड़ी घबराहट और साथ की पहली तस्वीरें।") },
  haldi: { title: T("Haldi", "हल्दी"), description: T("Turmeric, marigolds and a great deal of laughter.", "हल्दी, गेंदा और ढेर सारी हँसी।") },
  mehendi: { title: T("Mehendi", "मेहंदी"), description: T("Henna and the finer details.", "मेहंदी और बारीक बातें।") },
  sangeet: { title: T("Sangeet", "संगीत"), description: T("Music, lights and the dance floor.", "संगीत, रोशनी और डांस फ़्लोर।") },
  baraat: { title: T("The Baraat", "बारात"), description: T("The groom's procession arrives in full voice.", "दूल्हे की बारात पूरे जोश में।") },
  jaimala: { title: T("Jaimala", "जयमाला"), description: T("Garlands exchanged, petals in the air.", "माला बदली, हवा में फूल।") },
  rituals: { title: T("The Rituals", "रस्में"), description: T("Vows, sindoor and blessings, as they unfolded.", "फेरे, सिंदूर और आशीर्वाद, जैसे हुए।") },
  wedding: { title: T("The Wedding", "शादी"), description: T("The day itself, as it happened.", "शादी का दिन, जैसा हुआ।") },
  family: { title: T("Family", "परिवार"), description: T("A mother and daughter, moments before the vows.", "फेरों से पहले, माँ और बेटी।") },
} satisfies Record<string, { title: Tri; description: Tri }>;

type Kind = keyof typeof CAPTIONS;

// One entry per photo, 001..101, in album order.
const KINDS: Kind[] = [
  "bride", "bride", "couple", "couple", "bride", "bride", "couple", "bride",
  "bride", "wedding", "bride", "family", "bride", "mehendi", "engagement", "wedding",
  "jaimala", "bride", "bride", "wedding", "wedding", "bride", "rituals", "bride",
  "couple", "rituals", "rituals", "bride", "jaimala", "groom", "bride", "rituals",
  "rituals", "wedding", "bride", "wedding", "wedding", "bride", "wedding", "bride",
  "bride", "bride", "bride", "bride", "engagement", "wedding", "sangeet", "sangeet",
  "couple", "couple", "couple", "bride", "haldi", "haldi", "haldi", "haldi",
  "haldi", "haldi", "haldi", "haldi", "haldi", "bride", "engagement", "engagement",
  "engagement", "engagement", "engagement", "engagement", "engagement", "engagement", "engagement", "groom",
  "couple", "groom", "engagement", "engagement", "jaimala", "jaimala", "bride", "rituals",
  "baraat", "baraat", "bride", "couple", "rituals", "rituals", "rituals", "wedding",
  "jaimala", "wedding", "wedding", "wedding", "wedding", "bride", "bride", "couple",
  "couple", "bride", "mehendi", "couple", "bride",
];

export const GALLERY = KINDS.map((k, i) => {
  const n = String(i + 1).padStart(3, "0");
  return { thumb: `/portfolio/thumb/${n}.webp`, full: `/portfolio/full/${n}.webp`, caption: CAPTIONS[k] };
});

export const GALLERY_IMAGES: GalleryImage[] = GALLERY.map((g) => ({
  src: g.thumb,
  alt: `${g.caption.title.en}: wedding photograph by Treewood Films`,
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
    category: T("Wedding", "शादी"),
    title: T("The Wedding Day", "शादी का दिन"),
    summary: T("From the jaimala to the pheras, the entire day documented as it happened.", "जयमाला से फेरों तक, पूरा दिन जैसा हुआ।"),
    cover: "/portfolio/card-wedding.webp",
  },
  {
    id: "engagement",
    category: T("Engagement", "सगाई"),
    title: T("The Ring Ceremony", "रिंग सेरेमनी"),
    summary: T("The exchange of rings and the couple's first portraits together.", "अंगूठियों की अदला-बदली और साथ की पहली तस्वीरें।"),
    cover: "/portfolio/card-engagement.webp",
  },
  {
    id: "haldi",
    category: T("Haldi & Mehendi", "हल्दी और मेहंदी"),
    title: T("Colour and Celebration", "रंग और उत्सव"),
    summary: T("Marigolds, turmeric and family on the dance floor.", "गेंदा, हल्दी और नाचता परिवार।"),
    cover: "/portfolio/card-haldi.webp",
  },
  {
    id: "bridal",
    category: T("Portraits", "पोर्ट्रेट"),
    title: T("The Bride", "दुल्हन"),
    summary: T("Considered, unhurried bridal portraits.", "सुकून से ली गई दुल्हन की तस्वीरें।"),
    cover: "/portfolio/card-bridal.webp",
  },
  {
    id: "baraat",
    category: T("Baraat", "बारात"),
    title: T("The Baraat Arrives", "बारात आ गई"),
    summary: T("Petals in the air and the groom's family in full celebration.", "हवा में फूल और पूरी बारात जोश में।"),
    cover: "/portfolio/card-baraat.webp",
  },
  {
    id: "couple",
    category: T("Couple Portraits", "कपल पोर्ट्रेट"),
    title: T("Just the Two of Them", "सिर्फ़ दो लोग"),
    summary: T("Close, candid portraits of the couple.", "जोड़े की क़रीबी, सहज तस्वीरें।"),
    cover: "/portfolio/card-couple.webp",
  },
];
