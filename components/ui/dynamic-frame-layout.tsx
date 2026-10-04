"use client"

// Source: https://21st.dev/@oeneco/components/dynamic-frame-layout (public 21st.dev registry, author: oeneco)
// Local changes (2026-10-04, /services black-tile grid):
//  - tiles are static (no link, no tab stop): black at rest, name on the left, services as a bulleted list on the right
//  - desktop (min-width 768px AND pointer: fine): 3x3 fullscreen grid, hover expands the tile and its video
//    fades in over black (one at a time); leaving pauses, resets to 0 and fades back to black
//  - touch / narrow screens: a plain stack of black tiles (name + bullets), no video, no expansion
//  - prefers-reduced-motion: no video, no expansion, no transition
//  - no poster / image anywhere: nothing downloads until a tile is hovered
//  - decorative frame props (corner/edge*/border*) and showFrames removed (unused)

import { useState, useEffect, useRef, useSyncExternalStore } from "react"

export interface Frame {
  id: number | string
  slug: string
  title: string
  /** The services inside this category, shown as a bulleted list to the right of the name. */
  services: readonly string[]
  /** Silent loop. Only requested after the tile is first hovered; the page never depends on it existing. */
  video: string
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

function TileText({ title, services }: { title: string; services: readonly string[] }) {
  return (
    <div className="relative z-10 flex h-full w-full items-center gap-3 p-3 sm:p-4 xl:gap-5 xl:p-6 text-cream">
      <h2 className="font-heading font-semibold leading-tight text-lg xl:text-2xl 2xl:text-3xl shrink-0 max-w-[46%] break-words">
        {title}
      </h2>
      <ul
        data-frame-list
        className="min-w-0 flex-1 list-disc space-y-0.5 pl-4 font-sans text-xs xl:text-sm 2xl:text-base leading-snug marker:text-ochre"
      >
        {services.map((s) => (
          <li key={s} className="break-words">
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TileVideo({ src, active }: { src: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (active) {
      v.play().catch(() => {}) // rejects if the file is missing; the tile just stays black
    } else {
      v.pause()
      setReady(false)
      // reset after the fade-out so the frame does not jump while fading
      const t = window.setTimeout(() => {
        if (ref.current) ref.current.currentTime = 0
      }, 320)
      return () => window.clearTimeout(t)
    }
  }, [active])

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${active && ready ? "opacity-100" : "opacity-0"}`}
      src={src}
      muted
      playsInline
      loop
      preload="none"
      aria-hidden="true"
      onPlaying={() => setReady(true)}
    />
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
  const fineWide = useMedia("(min-width: 768px) and (pointer: fine)")
  const interactive = fineWide && !reduced // expansion + video only here
  const [hover, setHover] = useState<{ row: number; col: number } | null>(null)
  const [armed, setArmed] = useState<Set<number | string>>(new Set()) // tiles whose video may be mounted
  const active = interactive ? hover : null

  const sizes = (index: number | undefined) => {
    if (index === undefined) return "4fr 4fr 4fr"
    const rest = (12 - hoverSize) / 2
    return [0, 1, 2].map((i) => (i === index ? `${hoverSize}fr` : `${rest}fr`)).join(" ")
  }

  return (
    <div
      className={`flex flex-col [@media(min-width:768px)_and_(pointer:fine)]:grid [@media(min-width:768px)_and_(pointer:fine)]:h-full w-full bg-cream/20 ${className ?? ""}`}
      style={{
        gridTemplateRows: sizes(active?.row),
        gridTemplateColumns: sizes(active?.col),
        gap: `${gapSize}px`,
        transition: interactive ? "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease" : "none",
      }}
      data-frame-grid
    >
      {frames.map((frame, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const isActive = active?.row === row && active?.col === col
        return (
          <div
            key={frame.id}
            data-frame-tile={frame.slug}
            className="relative min-h-28 [@media(min-width:768px)_and_(pointer:fine)]:min-h-0 min-w-0 overflow-hidden bg-black"
            onMouseEnter={() => {
              if (!interactive) return
              setHover({ row, col })
              setArmed((s) => (s.has(frame.id) ? s : new Set(s).add(frame.id)))
            }}
            onMouseLeave={() => setHover(null)}
          >
            {interactive && armed.has(frame.id) && <TileVideo src={frame.video} active={isActive} />}
            {/* scrim keeps the text legible over the video; invisible against the black rest state */}
            <span className="absolute inset-0 bg-black/55" aria-hidden="true" />
            <TileText title={frame.title} services={frame.services} />
          </div>
        )
      })}
    </div>
  )
}
