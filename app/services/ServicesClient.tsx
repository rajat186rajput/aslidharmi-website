"use client";

import { DynamicFrameLayout, type Frame } from "@/components/ui/dynamic-frame-layout";

// /services = ONLY the 3x3 category tile grid (Rajat 2026-10-04). Tiles are black at rest; the video appears on hover.
// Spec: vault "Website Service Categories - 2026-10-04" + "Website Service Cards - 2026-10-04".
// services[] = the card public names (verbatim). 3D Design has a single card, so its list uses the spec's own
// category wording ("Stages, spaces and products shown in 3D first"), nothing invented.
// English-only site. Hard rules: no prices, founder name, geography or proof.
const TILE_DIR = "/services/tiles";
const CATEGORIES = [
  { slug: "photos-film", title: "Photos & Film", services: ["Photo + Video + Reels", "Pre-wedding Film", "Video Editing", "Product Shoot", "Big Asset Recording"] },
  { slug: "3d-design", title: "3D Design", services: ["Stages", "Spaces", "Products"] },
  { slug: "clothing", title: "Clothing", services: ["Tailoring"] },
  { slug: "food", title: "Food", services: ["Food & Snacks"] },
  { slug: "gifts", title: "Gifts", services: ["Craft & Gifting"] },
  { slug: "decoration", title: "Decoration", services: ["Decoration"] },
  { slug: "beauty-mehndi", title: "Beauty & Mehndi", services: ["Mehndi"] },
  { slug: "travel-stay", title: "Travel & Stay", services: ["Transport", "Hill Trips & Stays"] },
  { slug: "digital-online", title: "Digital & Online", services: ["Webpage / Social Media", "Digital Cards"] },
] as const;

const FRAMES: Frame[] = CATEGORIES.map((c, i) => ({
  id: i + 1,
  slug: c.slug,
  title: c.title,
  services: c.services,
  video: `${TILE_DIR}/${c.slug}.mp4`,
}));

export default function ServicesClient() {
  return (
    // Desktop (>=768px, fine pointer): fullscreen, no scroll; the fixed global nav floats over the grid.
    // Touch / narrow: a scrollable stack of black tiles under the nav.
    <main className="w-full bg-black min-h-dvh pt-20 [@media(min-width:768px)_and_(pointer:fine)]:pt-0 [@media(min-width:768px)_and_(pointer:fine)]:h-screen [@media(min-width:768px)_and_(pointer:fine)]:h-dvh [@media(min-width:768px)_and_(pointer:fine)]:min-h-0 [@media(min-width:768px)_and_(pointer:fine)]:overflow-hidden">
      <h1 className="sr-only">Services</h1>
      <DynamicFrameLayout frames={FRAMES} />
    </main>
  );
}
