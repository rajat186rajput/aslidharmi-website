"use client";

import { DynamicFrameLayout, type Frame } from "@/components/ui/dynamic-frame-layout";

// /services = ONLY the 3x3 category video-tile grid, fullscreen (Rajat 2026-10-04 16:59 IST).
// Spec: vault "Website Service Categories - 2026-10-04" (tile titles/taglines verbatim, row-major order).
// English-only site. Tiles are static (not links) per Rajat 2026-10-04 17:17 IST.
// Hard rules: no prices, founder name, geography or proof.
const TILE_DIR = "/services/tiles";
const CATEGORIES = [
  { slug: "photos-film", title: "Photos & Film", tagline: "Photos, film and reels for every occasion." },
  { slug: "3d-design", title: "3D Design", tagline: "See it in 3D before it is built." },
  { slug: "clothing", title: "Clothing", tagline: "Stitched and fitted for your occasion." },
  { slug: "food", title: "Food", tagline: "Food and snacks, arranged for you." },
  { slug: "gifts", title: "Gifts", tagline: "Handmade keepsakes with your names and dates." },
  { slug: "decoration", title: "Decoration", tagline: "Decoration for your event, arranged for you." },
  { slug: "beauty-mehndi", title: "Beauty & Mehndi", tagline: "Mehndi for your occasion, arranged for you." },
  { slug: "travel-stay", title: "Travel & Stay", tagline: "Cars, hill trips and stays, arranged for you." },
  { slug: "digital-online", title: "Digital & Online", tagline: "Webpages, social media and digital invitations." },
] as const;

const FRAMES: Frame[] = CATEGORIES.map((c, i) => {
  return {
    id: i + 1,
    slug: c.slug,
    title: c.title,
    tagline: c.tagline,
    poster: `${TILE_DIR}/${c.slug}.jpg`,
    video: `${TILE_DIR}/${c.slug}.mp4`,
    priority: i < 3,
  };
});

export default function ServicesClient() {
  return (
    // Fullscreen: the global nav is fixed and floats over the grid. h-screen is the 100vh fallback for h-dvh.
    <main className="h-screen h-dvh w-full overflow-hidden bg-charcoal">
      <h1 className="sr-only">Services</h1>
      <DynamicFrameLayout frames={FRAMES} />
    </main>
  );
}
