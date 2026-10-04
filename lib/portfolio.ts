// /portfolio data (2026-10-04).
// Photos: Treewood Films (wetransfer "rajat ji", 29-Sep-2026). 113 files -> 102
// unique -> 101 used (the logo card is left out). Two sizes in /public/portfolio/:
// thumb/ 480x600 for the 3D gallery, full/ 1080x1350 for the fullscreen viewer.
// Treewood's consent covers showing these couples' faces.
// Captions describe what each photo shows. No names, dates or places: none
// were supplied, so none are invented.
// Copy is formal English (Rajat, 2026-10-04): the `hinglish` key carries the
// same English text so the site's default language shows English on this page.
// Live on aslidharmi.in/portfolio (nav: "Our Work") from 2026-10-04, on Rajat's go.

import type { GalleryImage } from "@/components/ui/3d-parallax-unfurling-gallery";

export type Tri = { en: string; hinglish: string; hi: string };

/** English for en + hinglish, Hindi for hi. */
const T = (en: string, hi: string): Tri => ({ en, hinglish: en, hi });

const CAPTIONS = {
  bride: { title: T("The Bride", "दुल्हन"), description: T("A quiet portrait before the day begins.", "दिन शुरू होने से पहले, एक शांत तस्वीर।"), summary: T("Bridal portraits are made in the quiet before the ceremony, when there is still time for light, posture and detail. The outfit, the jewellery and the expression are each given their due.", "दुल्हन की तस्वीरें रस्मों से पहले के शांत समय में ली जाती हैं, जब रोशनी, मुद्रा और बारीकियों के लिए समय होता है।") },
  groom: { title: T("The Groom", "दूल्हा"), description: T("Composed, ready and waiting.", "तैयार, शांत और इंतज़ार में।"), summary: T("The groom is photographed as he is on the day: composed, a little nervous, and surrounded by family who have waited a long time for this moment.", "दूल्हे की तस्वीरें वैसी ही, जैसा वह उस दिन है: शांत, थोड़ा घबराया हुआ, और परिवार से घिरा।") },
  couple: { title: T("Together", "साथ"), description: T("Two people, unhurried and at ease.", "दो लोग, बिना जल्दबाज़ी के, सहज।"), summary: T("Couple portraits are given time of their own, away from the crowd. The aim is to record how two people actually are with each other, not a pose they have been asked to hold.", "जोड़े की तस्वीरों को भीड़ से दूर अपना समय मिलता है, ताकि दिखे कि दो लोग सच में एक-दूसरे के साथ कैसे हैं।") },
  engagement: { title: T("The Engagement", "सगाई"), description: T("The rings, the nerves and the first portraits together.", "अंगूठियाँ, थोड़ी घबराहट और साथ की पहली तस्वीरें।"), summary: T("The engagement is often the first time both families come together formally. The ring exchange, the first portraits and the small, unplanned reactions are all kept.", "सगाई अक्सर वह पहला मौक़ा होता है जब दोनों परिवार औपचारिक रूप से मिलते हैं। अंगूठी, पहली तस्वीरें और छोटे-छोटे पल, सब सहेजे जाते हैं।") },
  haldi: { title: T("Haldi", "हल्दी"), description: T("Turmeric, marigolds and a great deal of laughter.", "हल्दी, गेंदा और ढेर सारी हँसी।"), summary: T("Haldi is the loudest and least formal ceremony of the wedding. It is photographed for its colour and its energy: marigolds, turmeric, music and family dancing.", "हल्दी शादी की सबसे रंगीन और सबसे बेफ़िक्र रस्म है। इसकी तस्वीरें इसके रंग और जोश के लिए ली जाती हैं।") },
  mehendi: { title: T("Mehendi", "मेहंदी"), description: T("Henna and the finer details.", "मेहंदी और बारीक बातें।"), summary: T("Mehendi is a ceremony of patience and fine detail. Close photographs record the henna, the hands and the rings before the celebrations begin in earnest.", "मेहंदी धैर्य और बारीकी की रस्म है। क़रीबी तस्वीरें मेहंदी, हाथों और अंगूठियों को सहेजती हैं।") },
  sangeet: { title: T("Sangeet", "संगीत"), description: T("Music, lights and the dance floor.", "संगीत, रोशनी और डांस फ़्लोर।"), summary: T("The sangeet is an evening of music, performance and lights. Coverage follows the stage, the dance floor and the guests who make the evening.", "संगीत की शाम गाने, प्रस्तुति और रोशनी की होती है। तस्वीरें मंच, डांस फ़्लोर और मेहमानों पर रहती हैं।") },
  baraat: { title: T("The Baraat", "बारात"), description: T("The groom's procession arrives in full voice.", "दूल्हे की बारात पूरे जोश में।"), summary: T("The baraat brings the groom and his family to the venue in full celebration. It moves quickly, so it is photographed from within the procession.", "बारात दूल्हे और उसके परिवार को पूरे जश्न के साथ लाती है। यह तेज़ी से चलती है, इसलिए इसकी तस्वीरें बारात के बीच से ली जाती हैं।") },
  jaimala: { title: T("Jaimala", "जयमाला"), description: T("Garlands exchanged, petals in the air.", "माला बदली, हवा में फूल।"), summary: T("The jaimala, the exchange of garlands, is one of the most watched moments of the day. It is photographed from more than one angle so that both faces are kept.", "जयमाला दिन के सबसे देखे जाने वाले पलों में से एक है। इसे एक से ज़्यादा कोणों से लिया जाता है ताकि दोनों चेहरे सहेजे जाएँ।") },
  rituals: { title: T("The Rituals", "रस्में"), description: T("Vows, sindoor and blessings, as they unfolded.", "फेरे, सिंदूर और आशीर्वाद, जैसे हुए।"), summary: T("The rituals are recorded quietly and without interruption: the pheras, the sindoor and the blessings, in the order in which they take place.", "रस्में शांति से और बिना रुकावट के सहेजी जाती हैं: फेरे, सिंदूर और आशीर्वाद, उसी क्रम में जिसमें वे होते हैं।") },
  wedding: { title: T("The Wedding", "शादी"), description: T("The day itself, as it happened.", "शादी का दिन, जैसा हुआ।"), summary: T("The wedding day is documented from start to finish, as it happens. Nothing is restaged; the photographs follow the day rather than direct it.", "शादी का दिन शुरू से अंत तक, जैसा होता है वैसा सहेजा जाता है। कुछ भी दोबारा नहीं करवाया जाता।") },
  family: { title: T("Family", "परिवार"), description: T("A mother and daughter, moments before the vows.", "फेरों से पहले, माँ और बेटी।"), summary: T("Some of the most important photographs of a wedding are not of the couple at all, but of the family around them in the moments before the ceremony.", "शादी की कुछ सबसे ज़रूरी तस्वीरें जोड़े की नहीं, बल्कि उनके आसपास के परिवार की होती हैं।") },
} satisfies Record<string, { title: Tri; description: Tri; summary: Tri }>;

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
  return {
    thumb: `/portfolio/thumb/${n}.webp`,
    full: `/portfolio/full/${n}.webp`,
    caption: CAPTIONS[k],
    kindCount: KINDS.filter((x) => x === k).length,
  };
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
