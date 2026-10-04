"use client";

/* 3D parallax "unfurling" gallery — adapted from 21st.dev (2026-10-04).
 * Changes vs the upstream component:
 *  - images come in as a prop (data lives in lib/portfolio.ts), not a hardcoded list
 *  - tracks the PAGE scroll instead of its own h-screen overflow box, so the
 *    site nav, footer and browser scroll restoration keep working
 *  - prefers-reduced-motion gets a plain static grid instead of the 3D scroll
 *  - section height is a prop (upstream 600vh felt endless with a real page around it)
 */

import React, { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageCardProps {
  image: GalleryImage;
}

const ImageCard = ({ image }: ImageCardProps) => (
  <div
    className="relative h-[200px] w-full flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-[#111] transition-transform duration-300 will-change-transform hover:scale-[1.02] sm:h-[300px] md:h-[400px]"
    style={{ backfaceVisibility: "hidden" }}
  >
    {/* eslint-disable-next-line @next/next/no-img-element -- remote placeholder URLs; swap to next/image once real assets are in /public */}
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      className="h-full w-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
    />
  </div>
);

interface ParallaxGalleryProps {
  images: GalleryImage[];
  /** Total scroll length of the section, in vh. Default 400. */
  heightVh?: number;
}

export default function ParallaxUnfurlingGallery({ images, heightVh = 400 }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Split into 4 columns, doubled so each column is long enough to parallax.
  const cols = useMemo(() => {
    const split = [0, 1, 2, 3].map((c) => images.filter((_, i) => i % 4 === c));
    return split.map((col) => [...col, ...col]);
  }, [images]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

  // Banner: framed card → full bleed
  const bannerWidth = useTransform(smooth, [0, 0.15], ["90vw", "100vw"]);
  const bannerHeight = useTransform(smooth, [0, 0.15], ["80vh", "100vh"]);
  const bannerRadius = useTransform(smooth, [0, 0.15], ["48px", "0px"]);
  const bannerBorderWidth = useTransform(smooth, [0, 0.15], ["4px", "0px"]);

  // 3D matrix: tilted far away → nearly flat and close
  const rotateY = useTransform(smooth, [0.15, 1], [-45, -8]);
  const rotateX = useTransform(smooth, [0.15, 1], [25, 4]);
  const rotateZ = useTransform(smooth, [0.15, 1], [15, 2]);
  const translateZ = useTransform(smooth, [0.15, 1], [-800, 0]);

  // Column parallax (alternate directions)
  const yCol1 = useTransform(smooth, [0.15, 1], ["0%", "-40%"]);
  const yCol2 = useTransform(smooth, [0.15, 1], ["-40%", "10%"]);
  const yCol3 = useTransform(smooth, [0.15, 1], ["0%", "-40%"]);
  const yCol4 = useTransform(smooth, [0.15, 1], ["-30%", "20%"]);
  const colY = [yCol1, yCol2, yCol3, yCol4];

  if (reduceMotion) {
    return (
      <section className="bg-[#050505] px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img, i) => (
            <ImageCard key={`static-${i}`} image={img} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white"
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{
            width: bannerWidth,
            height: bannerHeight,
            borderRadius: bannerRadius,
            borderWidth: bannerBorderWidth,
            borderColor: "#2c2738",
            backfaceVisibility: "hidden",
          }}
          className="relative mx-auto flex max-w-[1920px] items-center justify-center overflow-hidden bg-black will-change-transform"
        >
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            {/* Edge vignettes */}
            <div className="absolute inset-0 z-20 shadow-[inset_0_100px_150px_-50px_rgba(0,0,0,1),inset_0_-100px_150px_-50px_rgba(0,0,0,1)]" />
            <div className="absolute inset-0 z-20 shadow-[inset_150px_0_150px_-50px_rgba(0,0,0,1),inset_-150px_0_150px_-50px_rgba(0,0,0,1)]" />

            <motion.div
              style={{ rotateX, rotateY, rotateZ, z: translateZ, transformStyle: "preserve-3d" }}
              className="flex h-[150vh] w-[120vw] origin-center items-center justify-center gap-4 will-change-transform md:gap-6"
            >
              {cols.map((col, c) => (
                <motion.div
                  key={`col-${c}`}
                  style={{ y: colY[c] }}
                  className="pointer-events-auto flex w-[22vw] min-w-[200px] flex-col gap-4 md:gap-6"
                >
                  {col.map((img, i) => (
                    <ImageCard key={`col${c}-${i}`} image={img} />
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
