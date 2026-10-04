"use client"

// Source: https://21st.dev/@oeneco/components/dynamic-frame-layout (public 21st.dev registry, author: oeneco)
// Local changes (2026-10-04, /services fullscreen category grid):
//  - frames are interactive tiles (real <a href>) with title + tagline over a scrim
//  - hover-expand also fires on keyboard focus (and stays while a tile keeps focus)
//  - md and up only: expansion + video (plays on hover/focus, one at a time). Never under
//    prefers-reduced-motion (poster only, no expansion, no transition).
//  - below md: the same 3x3 grid as a still poster grid (no video, no expansion, title only)
//  - posters are responsive WebP (-320/-640/-1280) with the JPG as fallback
//  - decorative frame props (corner/edge*/border*) and showFrames removed (unused)

import { useState, useEffect, useRef, useSyncExternalStore } from "react"

export interface Frame {
  id: number | string
  slug: string
  title: string
  tagline: string
  /** Fallback still (.jpg). Responsive variants are expected beside it: <name>-320|640|1280.webp */
  poster: string
  /** Silent loop; the page must not depend on it existing at build time. */
  video: string
  /** Real link for the tile (enquiry). */
  href: string
  /** Open in a new tab (true for https links; false for mailto). */
  newTab?: boolean
  /** Above-the-fold tiles get a high fetch priority (never lazy: the whole grid is visible on first paint). */
  priority?: boolean
}

function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

// Stronger bottom scrim + soft text-shadow keep cream text >= 4.5:1 over bright posters.
const SCRIM = "bg-gradient-to-t from-charcoal/95 via-charcoal/60 via-45% to-transparent"
const SHADOW = "[text-shadow:0_1px_3px_rgba(0,0,0,0.75)]"

function TileText({ title, tagline }: { title: string; tagline: string }) {
  return (
    <span className="absolute inset-x-0 bottom-0 z-10 block p-1.5 sm:p-3 md:p-5 text-left">
      <span
        className={`block font-heading font-semibold leading-tight text-cream text-[13px] sm:text-lg md:text-2xl ${SHADOW}`}
      >
        {title}
      </span>
      <span className={`mt-1 hidden md:block font-sans text-sm leading-snug text-cream ${SHADOW}`}>{tagline}</span>
    </span>
  )
}

function Poster({ src, priority }: { src: string; priority?: boolean }) {
  const base = src.replace(/\.jpg$/, "")
  const sizes = "(min-width: 768px) 50vw, 34vw"
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${base}-320.webp 320w, ${base}-640.webp 640w, ${base}-1280.webp 1280w`}
        sizes={sizes}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden"
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  )
}

function TileMedia({ frame, playing, canPlay }: { frame: Frame; playing: boolean; canPlay: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (playing && canPlay) {
      // play() rejects if the file is missing or autoplay is blocked; the poster just stays.
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [playing, canPlay])

  return (
    <div className="absolute inset-0 overflow-hidden bg-charcoal">
      <Poster src={frame.poster} priority={frame.priority} />
      {canPlay && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={frame.video}
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
  const reduced = useMedia("(prefers-reduced-motion: reduce)")
  const wide = useMedia("(min-width: 768px)")
  const interactive = wide && !reduced // expansion + video only here
  // Mouse hover wins; a focused tile keeps its expansion when the mouse leaves it.
  const [hover, setHover] = useState<{ row: number; col: number } | null>(null)
  const [focus, setFocus] = useState<{ row: number; col: number } | null>(null)
  const active = interactive ? (hover ?? focus) : null

  const sizes = (index: number | undefined) => {
    if (index === undefined) return "4fr 4fr 4fr"
    const rest = (12 - hoverSize) / 2
    return [0, 1, 2].map((i) => (i === index ? `${hoverSize}fr` : `${rest}fr`)).join(" ")
  }

  // Ring is an overlay ABOVE the media (z-20), so it is visible over poster and video.
  const ring =
    "pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity group-focus-visible:opacity-100 " +
    "shadow-[inset_0_0_0_4px_var(--color-cream),inset_0_0_0_8px_var(--color-ochre-deep),inset_0_0_0_10px_var(--color-cream)]"

  return (
    <div
      className={`grid h-full w-full ${className ?? ""}`}
      style={{
        gridTemplateRows: sizes(active?.row),
        gridTemplateColumns: sizes(active?.col),
        gap: `${wide ? gapSize : 2}px`,
        transition: interactive ? "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease" : "none",
      }}
      data-frame-grid
    >
      {frames.map((frame, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        return (
          <a
            key={frame.id}
            href={frame.href}
            target={frame.newTab ? "_blank" : undefined}
            rel={frame.newTab ? "noopener noreferrer" : undefined}
            aria-label={`${frame.title}. ${frame.tagline} Enquire.`}
            data-frame-tile={frame.slug}
            className="group relative block min-h-0 min-w-0 overflow-hidden outline-none"
            onMouseEnter={() => setHover({ row, col })}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setFocus({ row, col })}
            onBlur={() => setFocus(null)}
          >
            <TileMedia frame={frame} playing={active?.row === row && active?.col === col} canPlay={interactive} />
            <TileText title={frame.title} tagline={frame.tagline} />
            <span className={ring} aria-hidden="true" />
          </a>
        )
      })}
    </div>
  )
}
