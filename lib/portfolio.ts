// /portfolio data — SKELETON (2026-10-04).
// Everything here is PLACEHOLDER: stock images from the 21st.dev demo and
// dummy project cards. Site rule: no claim of work already done until it is
// real — so the page ships noindex and stays off the nav until this file
// carries actual Asli Dharmi work. Swap this file only; the page reads from it.

import type { GalleryImage } from "@/components/ui/3d-parallax-unfurling-gallery";

type Tri = { en: string; hinglish: string; hi: string };

// TODO(real data): replace with real event/shoot photos (ideally in /public/portfolio/).
// 8–16 images works best — they are split into 4 columns.
export const GALLERY_IMAGES: GalleryImage[] = [
  "https://cdn.21st.dev/assets/mirror/a9/a9c2900d44fe6288b344f447cb12a05f7e64c439479a8ccb977d3b20eb371156.jpg",
  "https://cdn.21st.dev/assets/mirror/29/29cf6ad39eb198c05b8d915fca0becfd3d270d510d32eaec1b886c426c681c67.jpg",
  "https://cdn.21st.dev/assets/mirror/61/6154958e9df110914005256ff2319d43a2c2e0fc8bb54e9f8bce7b91fdce5df1.jpg",
  "https://cdn.21st.dev/assets/mirror/6d/6db92aff3c02cce69e2c672a6dd4e99cbf5c55d68fbf08c460527e6c7c5b64ba.jpg",
  "https://cdn.21st.dev/assets/mirror/42/42ad2d0680dba697d578434e5af5620c7ab1c7c55bc36cec3b55eec8b7a79cbf.jpg",
  "https://cdn.21st.dev/assets/mirror/cd/cd3dc09b1bbed97cfc879e2c5e62fdbc68dc4070b6105e476410d70e31d1e459.jpg",
  "https://cdn.21st.dev/assets/mirror/02/0232d63e3e0cb8d3599a77e29f87f8ec4b9fadfd031592296b3f19a730a5348c.jpg",
  "https://cdn.21st.dev/assets/mirror/56/562b212caa6ec06d8b0b313660dac6aa0bbfb729092cc4f16d04558a319af6b1.jpg",
  "https://cdn.21st.dev/assets/mirror/02/02cbcd62720734d469f2ea8e5ed7a212e18cb05e73457445b4d755ad0ae1fcd8.jpg",
  "https://cdn.21st.dev/assets/mirror/c4/c42df7c9c444a1189dad0570c0d01986454cd6a10eaf253a9ab40eb921a5bae5.jpg",
  "https://cdn.21st.dev/assets/mirror/27/275fbf3f84c5258c7a8235a8a47022f847d0f408c950288c532aefa83d072a2c.jpg",
  "https://cdn.21st.dev/assets/mirror/7e/7e2fb073870b2f578a37a693b1e0c9402a98201149509b54da2f86a2ee6abf5e.jpg",
  "https://cdn.21st.dev/assets/mirror/3d/3d74651780292fb5a2ba23e525d9d09860bb83fbfafc7ede17b8e3662d7b1022.jpg",
].map((src, i) => ({ src, alt: `Placeholder image ${i + 1}` }));

export interface PortfolioProject {
  id: string;
  category: Tri; // e.g. Event Management / Technical / Craft / Hospitality (matches /services buckets)
  title: Tri;
  summary: Tri;
  date: string; // free text, e.g. "Sep 2026"
  cover: string; // image URL or /public path
}

// TODO(real data): one entry per real job. Keep copy plain and true.
export const PROJECTS: PortfolioProject[] = [1, 2, 3, 4, 5, 6].map((n, i) => ({
  id: `placeholder-${n}`,
  category: { en: "Category", hinglish: "Category", hi: "श्रेणी" },
  title: { en: `Project title ${n}`, hinglish: `Project ka naam ${n}`, hi: `प्रोजेक्ट का नाम ${n}` },
  summary: {
    en: "One or two lines on what was done, for whom, and what changed.",
    hinglish: "Ek-do line: kya kiya, kiske liye, aur kya badla.",
    hi: "एक-दो लाइन: क्या किया, किसके लिए, और क्या बदला।",
  },
  date: "Month YYYY",
  cover: GALLERY_IMAGES[i % GALLERY_IMAGES.length].src,
}));
