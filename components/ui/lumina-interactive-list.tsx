"use client";

/* Fullscreen photo viewer with a WebGL "glass bubble" transition — adapted from
 * 21st.dev "lumina-interactive-list" (2026-10-04). Changes vs upstream:
 *  - three + gsap come from npm (lazy import), not CDN <script> tags
 *  - it is a LIGHTBOX: opens at `startIndex`, closes with ✕ / Esc / backdrop key
 *  - slides come in as props; text and nav are React-rendered (no innerHTML)
 *  - only the glass effect is kept (upstream's other 4 effects were stubs)
 *  - keyboard ←/→, swipe on touch, body scroll lock, full WebGL cleanup on close
 *  - autoplay progress is a CSS animation that starts after each transition
 *  - no WebGL / reduced motion → plain <img> with a fade
 *  - site fonts/colours; upstream's :root overrides would have clobbered the theme
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import type * as THREE_NS from "three";

export interface LuminaSlide {
  src: string;
  title: string;
  description: string;
  alt?: string;
  /** Wide screens only: a short paragraph shown in the right-hand blank space. */
  summary?: string;
  /** Wide screens only: label/value rows under the summary. */
  details?: { label: string; value: string }[];
  summaryLabel?: string;
}

interface LuminaProps {
  slides: LuminaSlide[];
  startIndex?: number;
  onClose: () => void;
  /** ms each slide stays before auto-advancing. 0 disables autoplay. */
  autoSlideMs?: number;
  closeLabel?: string;
}

const TRANSITION_S = 1.8;

const vertexShader = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;

const fragmentShader = `
  uniform sampler2D uTexture1, uTexture2;
  uniform float uProgress;
  uniform vec2 uResolution, uTexture1Size, uTexture2Size;
  varying vec2 vUv;

  // "contain" fit: whole photo visible (portrait photos on a landscape screen), letterbox is black
  vec2 getContainUV(vec2 uv, vec2 textureSize) {
    vec2 s = uResolution / textureSize;
    float scale = min(s.x, s.y);
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;
    return (uv * uResolution - offset) / scaledSize;
  }
  vec4 sampleContain(sampler2D tex, vec2 uv) {
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0, 0.0, 0.0, 1.0);
    return texture2D(tex, uv);
  }

  void main() {
    float progress = uProgress;
    float time = progress * 5.0;
    vec2 uv1 = getContainUV(vUv, uTexture1Size);
    vec2 uv2 = getContainUV(vUv, uTexture2Size);
    float maxR = length(uResolution) * 0.85;
    float br = progress * maxR;
    vec2 p = vUv * uResolution;
    vec2 c = uResolution * 0.5;
    float d = length(p - c);
    float nd = d / max(br, 0.001);
    float param = smoothstep(br + 3.0, br - 3.0, d);
    vec4 img;
    if (param > 0.0) {
      float ro = 0.08 * pow(smoothstep(0.3, 1.0, nd), 1.5);
      vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
      vec2 distUV = uv2 - dir * ro;
      distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * nd * param;
      float ca = 0.02 * pow(smoothstep(0.3, 1.0, nd), 1.2);
      img = vec4(
        sampleContain(uTexture2, distUV + dir * ca * 1.2).r,
        sampleContain(uTexture2, distUV + dir * ca * 0.2).g,
        sampleContain(uTexture2, distUV - dir * ca * 0.8).b,
        1.0);
      float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
      img.rgb += rim * 0.08;
    } else {
      img = sampleContain(uTexture2, uv2);
    }
    vec4 oldImg = sampleContain(uTexture1, uv1);
    if (progress > 0.95) img = mix(img, sampleContain(uTexture2, uv2), (progress - 0.95) / 0.05);
    gl_FragColor = mix(oldImg, img, param);
  }
`;

type Three = typeof THREE_NS;
type Gsap = typeof import("gsap").gsap;

// 6 title entrances, cycled per slide (as upstream)
function animateTitle(gsap: Gsap, chars: Element[], desc: Element | null, idx: number) {
  gsap.killTweensOf(chars);
  gsap.set(chars, { opacity: 0, x: 0, y: 0, scale: 1, rotationX: 0, filter: "blur(0px)" });
  if (desc) gsap.fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.25, ease: "power3.out" });
  switch (idx % 6) {
    case 0:
      gsap.fromTo(chars, { y: 20 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
      break;
    case 1:
      gsap.fromTo(chars, { y: -20 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "back.out(1.7)" });
      break;
    case 2:
      gsap.fromTo(chars, { filter: "blur(10px)", scale: 1.5 }, { filter: "blur(0px)", scale: 1, opacity: 1, duration: 1, stagger: { amount: 0.5, from: "random" }, ease: "power2.out" });
      break;
    case 3:
      gsap.fromTo(chars, { scale: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.5)" });
      break;
    case 4:
      gsap.fromTo(chars, { rotationX: 90, transformOrigin: "50% 50%" }, { rotationX: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "power2.out" });
      break;
    default:
      gsap.fromTo(chars, { x: 30 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
  }
}

export function LuminaViewer({ slides, startIndex = 0, onClose, autoSlideMs = 5000, closeLabel = "Close" }: LuminaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const [index, setIndex] = useState(startIndex);
  const [transitioning, setTransitioning] = useState(false);
  const [glReady, setGlReady] = useState(false);
  // Viewer only mounts after a click, so window exists here
  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [glFailed, setGlFailed] = useState(reducedMotion);
  const [paused, setPaused] = useState(false);

  // WebGL handles live in refs — they never drive a render
  const gl = useRef<{
    THREE: Three;
    gsap: Gsap;
    renderer: THREE_NS.WebGLRenderer;
    material: THREE_NS.ShaderMaterial;
    textures: Map<number, Promise<THREE_NS.Texture>>;
    raf: number;
  } | null>(null);
  const indexRef = useRef(startIndex);
  const busyRef = useRef(false);


  // ── body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ── WebGL setup (lazy-imported three + gsap) ──────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    let disposed = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    (async () => {
      try {
        const [THREE, gsapMod] = await Promise.all([import("three"), import("gsap")]);
        if (disposed) return;
        const gsap = gsapMod.gsap;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture1: { value: null },
            uTexture2: { value: null },
            uProgress: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uTexture1Size: { value: new THREE.Vector2(1, 1) },
            uTexture2Size: { value: new THREE.Vector2(1, 1) },
          },
          vertexShader,
          fragmentShader,
        });
        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

        const loader = new THREE.TextureLoader();
        const textures = new Map<number, Promise<THREE_NS.Texture>>();
        const state = { THREE, gsap, renderer, material, textures, raf: 0 };
        gl.current = state;

        const tex = await loadTexture(state, indexRef.current, loader, slides);
        if (disposed) return;
        material.uniforms.uTexture1.value = tex;
        material.uniforms.uTexture2.value = tex;
        material.uniforms.uTexture1Size.value = tex.userData.size;
        material.uniforms.uTexture2Size.value = tex.userData.size;

        const render = () => {
          state.raf = requestAnimationFrame(render);
          renderer.render(scene, camera);
        };
        render();
        setGlReady(true);

        // warm neighbours
        [1, -1].forEach((o) => loadTexture(state, (indexRef.current + o + slides.length) % slides.length, loader, slides));
      } catch {
        if (!disposed) setGlFailed(true);
      }
    })();

    const onResize = () => {
      const s = gl.current;
      if (!s) return;
      s.renderer.setSize(window.innerWidth, window.innerHeight);
      (s.material.uniforms.uResolution.value as THREE_NS.Vector2).set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      const s = gl.current;
      if (s) {
        cancelAnimationFrame(s.raf);
        s.gsap.killTweensOf(s.material.uniforms.uProgress);
        s.textures.forEach((p) => p.then((t) => t.dispose()).catch(() => {}));
        s.material.dispose();
        s.renderer.dispose();
        gl.current = null;
      }
    };
    // slides is stable for the lifetime of one open viewer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── navigation ────────────────────────────────────────────────────────────
  const goTo = useCallback(
    async (target: number) => {
      const n = slides.length;
      target = ((target % n) + n) % n;
      if (busyRef.current || target === indexRef.current) return;
      const s = gl.current;

      if (!s || glFailed) {
        indexRef.current = target;
        setIndex(target);
        return;
      }

      busyRef.current = true;
      setTransitioning(true);
      const loader = new s.THREE.TextureLoader();
      const [from, to] = await Promise.all([
        loadTexture(s, indexRef.current, loader, slides),
        loadTexture(s, target, loader, slides),
      ]);
      const u = s.material.uniforms;
      u.uTexture1.value = from;
      u.uTexture2.value = to;
      u.uTexture1Size.value = from.userData.size;
      u.uTexture2Size.value = to.userData.size;

      indexRef.current = target;
      setIndex(target);

      s.gsap.fromTo(
        u.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: TRANSITION_S,
          ease: "power2.inOut",
          onComplete: () => {
            u.uProgress.value = 0;
            u.uTexture1.value = to;
            u.uTexture1Size.value = to.userData.size;
            busyRef.current = false;
            setTransitioning(false);
            [1, -1].forEach((o) => loadTexture(s, (target + o + n) % n, loader, slides));
          },
        }
      );
    },
    [slides, glFailed]
  );

  // ── title animation on slide change ───────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled || !titleRef.current) return;
      animateTitle(gsap, Array.from(titleRef.current.querySelectorAll("[data-ch]")), descRef.current, index);
    });
    // keep the active nav item in view
    const el = navRef.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    return () => {
      cancelled = true;
    };
  }, [index]);

  // ── keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goTo(indexRef.current + 1);
      else if (e.key === "ArrowLeft") goTo(indexRef.current - 1);
      else if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, onClose]);

  // ── swipe ─────────────────────────────────────────────────────────────────
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) goTo(indexRef.current + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  const slide = slides[index];
  const autoplay = autoSlideMs > 0 && !paused && !transitioning && (glReady || glFailed);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={slide.title}
      className="fixed inset-0 z-[200] overflow-hidden bg-black text-white"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        @keyframes lumina-fill { from { width: 0% } to { width: 100% } }
        @keyframes lumina-fade { from { opacity: 0 } to { opacity: 1 } }
        /* Default (phones, tablets, square-ish screens): caption over the bottom of the photo */
        .lumina-caption { position: absolute; left: 0; right: 0; bottom: 7rem; padding: 0 1.5rem; text-align: center; pointer-events: none; }
        .lumina-right { display: none; }
        @media (min-width: 640px) { .lumina-caption { bottom: 8rem; } }
        /* Wide screens: the 4:5 photo fills the height and leaves a band either side
           of width (100vw - 80vh) / 2. Title goes in the left band, summary in the right. */
        @media (min-width: 1024px) and (min-aspect-ratio: 7/5) {
          .lumina-caption, .lumina-right {
            top: 0; bottom: 6rem; width: calc((100vw - 80vh) / 2);
            display: flex; flex-direction: column; justify-content: center; padding: 0 3rem;
          }
          .lumina-caption { left: 0; right: auto; text-align: left; }
          .lumina-caption .lumina-desc { margin-left: 0; }
          .lumina-right { position: absolute; right: 0; }
          .lumina-gradient { height: 9rem; }
          .lumina-prev, .lumina-next { top: auto; bottom: 7rem; transform: none; }
          .lumina-prev { left: 3rem; }
          .lumina-next { right: 3rem; }
        }
      `}</style>

      {/* Image layer */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${glReady && !glFailed ? "opacity-100" : "opacity-0"}`}
      />
      {glFailed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt ?? slide.title}
          className="absolute inset-0 h-full w-full animate-[lumina-fade_0.5s_ease] object-contain"
        />
      )}

      {/* Bottom gradient so text stays readable over light photos */}
      <div className="lumina-gradient pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* Counter */}
      <div className="absolute top-5 left-5 font-mono text-xs tracking-widest text-white/70 sm:top-8 sm:left-8">
        <span className="text-white">{pad(index + 1)}</span> / {pad(slides.length)}
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xl backdrop-blur transition-colors hover:bg-white hover:text-black sm:top-6 sm:right-6"
      >
        ✕
      </button>

      {/* Prev / next (desktop) */}
      <button
        type="button"
        aria-label="Previous"
        onClick={() => goTo(index - 1)}
        className="lumina-prev absolute top-1/2 left-4 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-lg backdrop-blur transition-colors hover:bg-white hover:text-black md:flex"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => goTo(index + 1)}
        className="lumina-next absolute top-1/2 right-4 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-lg backdrop-blur transition-colors hover:bg-white hover:text-black md:flex"
      >
        →
      </button>

      {/* Title + description: bottom-centre by default, left band on wide screens */}
      <div className="lumina-caption">
        <h2
          ref={titleRef}
          key={`t-${index}`}
          className="font-heading text-4xl font-semibold leading-tight [perspective:600px] sm:text-6xl"
        >
          {slide.title.split(" ").map((word, w, words) => (
            <React.Fragment key={w}>
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((ch, i) => (
                  <span key={i} data-ch className="inline-block opacity-0">
                    {ch}
                  </span>
                ))}
              </span>
              {w < words.length - 1 && " "}
            </React.Fragment>
          ))}
        </h2>
        <p
          ref={descRef}
          key={`d-${index}`}
          className="lumina-desc mx-auto mt-3 max-w-xl text-sm text-white/75 opacity-0 sm:text-base"
        >
          {slide.description}
        </p>
      </div>

      {/* Summary: right band on wide screens only */}
      {(slide.summary || (slide.details && slide.details.length > 0)) && (
        <aside key={`s-${index}`} className="lumina-right pointer-events-none animate-[lumina-fade_0.8s_ease]">
          {slide.summaryLabel && (
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ochre">{slide.summaryLabel}</p>
          )}
          {slide.summary && <p className="text-[15px] leading-relaxed text-white/80">{slide.summary}</p>}
          {slide.details && slide.details.length > 0 && (
            <dl className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm">
              {slide.details.map((d) => (
                <div key={d.label} className="flex flex-col gap-0.5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{d.label}</dt>
                  <dd className="text-white/85">{d.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </aside>
      )}

      {/* Slide nav with autoplay progress */}
      <nav
        ref={navRef}
        aria-label="Photos"
        className="absolute inset-x-0 bottom-5 flex gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:bottom-8 sm:px-10"
      >
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-current={active}
              className={`group flex w-28 flex-shrink-0 flex-col gap-2 text-left transition-opacity ${active ? "opacity-100" : "opacity-45 hover:opacity-80"}`}
            >
              <span className="relative block h-[2px] w-full overflow-hidden bg-white/25">
                {active && (
                  <span
                    key={`${index}-${autoplay}`}
                    className="absolute inset-y-0 left-0 bg-ochre"
                    style={
                      autoplay
                        ? { animation: `lumina-fill ${autoSlideMs}ms linear forwards` }
                        : { width: transitioning ? "0%" : paused ? "100%" : "0%" }
                    }
                    onAnimationEnd={() => goTo(indexRef.current + 1)}
                  />
                )}
              </span>
              <span className="truncate font-mono text-[10px] uppercase tracking-wider">
                {pad(i + 1)} · {s.title}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function loadTexture(
  s: { THREE: Three; textures: Map<number, Promise<THREE_NS.Texture>> },
  i: number,
  loader: THREE_NS.TextureLoader,
  slides: LuminaSlide[]
): Promise<THREE_NS.Texture> {
  const hit = s.textures.get(i);
  if (hit) return hit;
  const p = new Promise<THREE_NS.Texture>((resolve, reject) => {
    loader.load(
      slides[i].src,
      (t) => {
        t.minFilter = t.magFilter = s.THREE.LinearFilter;
        // no colorSpace: the raw ShaderMaterial passes sRGB bytes straight through
        const img = t.image as HTMLImageElement;
        t.userData = { size: new s.THREE.Vector2(img.width, img.height) };
        resolve(t);
      },
      undefined,
      reject
    );
  });
  s.textures.set(i, p);
  return p;
}

export default LuminaViewer;
