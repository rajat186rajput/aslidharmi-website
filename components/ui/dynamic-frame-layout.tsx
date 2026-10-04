"use client"

// Source: https://21st.dev/@oeneco/components/dynamic-frame-layout (public 21st.dev registry, author: oeneco)
// Local changes (2026-10-04, /services category grid):
//  - frames are now interactive tiles (anchor -> #slug, smooth scroll) with title + tagline over a scrim
//  - hover-expand also fires on keyboard focus; video plays only on hover/focus at md+ and never under
//    prefers-reduced-motion (poster only); video is preload="none" with a poster
//  - below md the 3x3 expanding grid is not used: a plain 2-column stack of poster tiles, no video
//  - decorative frame props (corner/edge*/border*) and showFrames removed (unused)

import { useState, useEffect, useRef, useSyncExternalStore } from "react"
import { motion } from "framer-motion"

export interface Frame {
  id: number | string
  slug: string
  title: string
  tagline: string
  /** Still image shown until/unless the video plays (also the only media on mobile / reduced motion). */
  poster: string
  /** Silent loop; may be absent on disk at build time (the page must not depend on it). */
  video: string
}

// SSR-safe reduced-motion subscription (server snapshot = false, corrected on hydrate).
function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  )
}

function scrollToSlug(slug: string, reduced: boolean) {
  const el = document.getElementById(slug)
  if (!el) return
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
  history.replaceState(null, "", `#${slug}`)
  // Move keyboard/screen-reader focus to the section without a second scroll.
  window.setTimeout(() => el.focus({ preventScroll: true }), reduced ? 0 : 500)
}

const SCRIM = "bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent"

function TileText({ title, tagline, compact }: { title: string; tagline: string; compact?: boolean }) {
  return (
    <span className="absolute inset-x-0 bottom-0 z-10 block p-4 md:p-5 text-left">
      <span
        className={`block font-heading font-semibold leading-tight text-cream ${compact ? "text-xl" : "text-2xl"}`}
      >
        {title}
      </span>
      <span className="mt-1 block font-sans text-xs md:text-sm leading-snug text-cream/85">{tagline}</span>
    </span>
  )
}

function FrameComponent({
  frame,
  isActive,
  reduced,
}: {
  frame: Frame
  isActive: boolean
  reduced: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (isActive && !reduced) {
      // play() rejects if the file is missing or autoplay is blocked; the poster just stays.
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [isActive, reduced])

  return (
    <div className="absolute inset-0 overflow-hidden bg-charcoal" style={{ transition: "all 0.3s ease-in-out" }}>
      {/* poster is also the video's poster attribute; the extra <img> keeps a still visible if the video 404s */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={frame.poster} alt="" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.visibility = "hidden" }} className="absolute inset-0 h-full w-full object-cover" />
      {!reduced && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={frame.video}
          poster={frame.poster}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <span className={`absolute inset-0 ${SCRIM}`} aria-hidden="true" />
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  hoverSize?: number
  gapSize?: number
}

export function DynamicFrameLayout({ frames, className, hoverSize = 6, gapSize = 4 }: DynamicFrameLayoutProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const reduced = usePrefersReducedMotion()

  const sizes = (index: number | undefined) => {
    if (index === undefined) return "4fr 4fr 4fr"
    const rest = (12 - hoverSize) / 2
    return [0, 1, 2].map((i) => (i === index ? `${hoverSize}fr` : `${rest}fr`)).join(" ")
  }

  const onTileClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault()
    scrollToSlug(slug, reduced)
  }

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-ochre"

  return (
    <>
      {/* md and up: 3x3 expanding grid. The parent must give it an explicit height. */}
      <div
        className={`relative hidden h-full w-full md:grid ${className ?? ""}`}
        style={{
          gridTemplateRows: sizes(hovered?.row),
          gridTemplateColumns: sizes(hovered?.col),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
        data-frame-grid="desktop"
      >
        {frames.map((frame, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          const active = hovered?.row === row && hovered?.col === col
          return (
            <motion.a
              key={frame.id}
              href={`#${frame.slug}`}
              data-frame-tile={frame.slug}
              className={`relative block overflow-hidden ${focusRing}`}
              onClick={(e) => onTileClick(e, frame.slug)}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered({ row, col })}
              onBlur={() => setHovered(null)}
            >
              <FrameComponent frame={frame} isActive={active} reduced={reduced} />
              <TileText title={frame.title} tagline={frame.tagline} />
            </motion.a>
          )
        })}
      </div>

      {/* below md: simple 2-column stack, poster only (no video, no autoplay, no data cost) */}
      <ul className="grid grid-cols-2 gap-3 md:hidden" data-frame-grid="mobile">
        {frames.map((frame) => (
          <li key={frame.id}>
            <a
              href={`#${frame.slug}`}
              data-frame-tile-mobile={frame.slug}
              className={`relative block aspect-[4/5] overflow-hidden bg-charcoal ${focusRing}`}
              onClick={(e) => onTileClick(e, frame.slug)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={frame.poster} alt="" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.visibility = "hidden" }} className="absolute inset-0 h-full w-full object-cover" />
              <span className={`absolute inset-0 ${SCRIM}`} aria-hidden="true" />
              <TileText title={frame.title} tagline={frame.tagline} compact />
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
