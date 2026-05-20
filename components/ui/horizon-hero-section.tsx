"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import Link from 'next/link';
import { useLang, t, tx } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

interface ThreeRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  animationId: number | null;
  targetCameraX?: number;
  targetCameraY?: number;
  targetCameraZ?: number;
  locations?: number[];
}

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const [canvasVisible, setCanvasVisible] = useState(true);
  const totalSections = 2;

  const threeRefs = useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const refs = threeRefs.current;

    // Scene
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    // Camera
    refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    refs.camera.position.z = 100;
    refs.camera.position.y = 20;

    // Renderer
    refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    // Post-processing
    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.4, 0.85));

    // Stars
    const starCount = 5000;
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      for (let j = 0; j < starCount; j++) {
        const radius = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);
        const color = new THREE.Color();
        const c = Math.random();
        if (c < 0.7) color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
        else if (c < 0.9) color.setHSL(0.08, 0.5, 0.8);
        else color.setHSL(0.6, 0.5, 0.8);
        colors[j * 3] = color.r; colors[j * 3 + 1] = color.g; colors[j * 3 + 2] = color.b;
        sizes[j] = Math.random() * 2 + 0.5;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: `attribute float size;attribute vec3 color;varying vec3 vColor;uniform float time;uniform float depth;void main(){vColor=color;vec3 pos=position;float angle=time*0.05*(1.0-depth*0.3);mat2 rot=mat2(cos(angle),-sin(angle),sin(angle),cos(angle));pos.xy=rot*pos.xy;vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);gl_PointSize=size*(300.0/-mvPosition.z);gl_Position=projectionMatrix*mvPosition;}`,
        fragmentShader: `varying vec3 vColor;void main(){float dist=length(gl_PointCoord-vec2(0.5));if(dist>0.5)discard;float opacity=1.0-smoothstep(0.0,0.5,dist);gl_FragColor=vec4(vColor,opacity);}`,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const stars = new THREE.Points(geometry, mat);
      refs.scene.add(stars);
      refs.stars.push(stars);
    }

    // Nebula — ochre + sage tones for Asli Dharmi
    const nebGeo = new THREE.PlaneGeometry(8000, 4000, 100, 100);
    const nebMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, color1: { value: new THREE.Color(0xC8832A) }, color2: { value: new THREE.Color(0x6B7C5E) }, opacity: { value: 0.25 } },
      vertexShader: `varying vec2 vUv;varying float vElevation;uniform float time;void main(){vUv=uv;vec3 pos=position;float elevation=sin(pos.x*0.01+time)*cos(pos.y*0.01+time)*20.0;pos.z+=elevation;vElevation=elevation;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);}`,
      fragmentShader: `uniform vec3 color1;uniform vec3 color2;uniform float opacity;uniform float time;varying vec2 vUv;varying float vElevation;void main(){float mixFactor=sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);vec3 color=mix(color1,color2,mixFactor*0.5+0.5);float alpha=opacity*(1.0-length(vUv-0.5)*2.0);alpha*=1.0+vElevation*0.01;gl_FragColor=vec4(color,alpha);}`,
      transparent: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
    });
    refs.nebula = new THREE.Mesh(nebGeo, nebMat);
    refs.nebula.position.z = -1050;
    refs.scene.add(refs.nebula);

    // Mountains — dark charcoal tones
    const layers = [
      { distance: -50, height: 60, color: 0x1a1a18 },
      { distance: -100, height: 80, color: 0x16140e },
      { distance: -150, height: 100, color: 0x0f1208 },
      { distance: -200, height: 120, color: 0x0a0d06 },
    ];
    const locations: number[] = [];
    layers.forEach((layer, index) => {
      const points: THREE.Vector2[] = [];
      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 1000;
        const y = Math.sin(i * 0.1) * layer.height + Math.sin(i * 0.05) * layer.height * 0.5 + Math.random() * layer.height * 0.2 - 100;
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(5000, -300));
      points.push(new THREE.Vector2(-5000, -300));
      const shape = new THREE.Shape(points);
      const geo = new THREE.ShapeGeometry(shape);
      const mat = new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: 1, side: THREE.DoubleSide });
      const mountain = new THREE.Mesh(geo, mat);
      mountain.position.z = layer.distance;
      mountain.position.y = layer.distance;
      mountain.userData = { baseZ: layer.distance, index };
      refs.scene?.add(mountain);
      refs.mountains.push(mountain);
      locations.push(layer.distance);
    });
    refs.locations = locations;

    // Atmosphere
    const atmGeo = new THREE.SphereGeometry(600, 32, 32);
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `varying vec3 vNormal;void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `varying vec3 vNormal;uniform float time;void main(){float intensity=pow(0.7-dot(vNormal,vec3(0.0,0.0,1.0)),2.0);vec3 atmosphere=vec3(0.78,0.51,0.16)*intensity;float pulse=sin(time*2.0)*0.1+0.9;atmosphere*=pulse;gl_FragColor=vec4(atmosphere,intensity*0.2);}`,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true,
    });
    refs.scene.add(new THREE.Mesh(atmGeo, atmMat));

    // Animate
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      refs.stars.forEach(s => { if ((s.material as THREE.ShaderMaterial).uniforms) (s.material as THREE.ShaderMaterial).uniforms.time.value = time; });
      if (refs.nebula) (refs.nebula.material as THREE.ShaderMaterial).uniforms.time.value = time * 0.5;
      if (refs.camera && refs.targetCameraX !== undefined) {
        const f = 0.05;
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * f;
        smoothCameraPos.current.y += (refs.targetCameraY! - smoothCameraPos.current.y) * f;
        smoothCameraPos.current.z += (refs.targetCameraZ! - smoothCameraPos.current.z) * f;
        refs.camera.position.x = smoothCameraPos.current.x + Math.sin(time * 0.1) * 2;
        refs.camera.position.y = smoothCameraPos.current.y + Math.cos(time * 0.15) * 1;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }
      refs.mountains.forEach((m, i) => {
        const pf = 1 + i * 0.5;
        m.position.x = Math.sin(time * 0.1) * 2 * pf;
        m.position.y = 50 + Math.cos(time * 0.15) * 1 * pf;
      });
      refs.composer?.render();
    };
    animate();
    setIsReady(true);

    const handleResize = () => {
      if (!refs.camera || !refs.renderer || !refs.composer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
      refs.stars.forEach(s => { s.geometry.dispose(); (s.material as THREE.Material).dispose(); });
      refs.mountains.forEach(m => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      if (refs.nebula) { refs.nebula.geometry.dispose(); (refs.nebula.material as THREE.Material).dispose(); }
      refs.renderer?.dispose();
    };
  }, []);

  // GSAP entrance
  useEffect(() => {
    if (!isReady) return;
    const tl = gsap.timeline();
    if (menuRef.current) tl.from(menuRef.current, { x: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.title-char');
      tl.from(chars, { y: 200, opacity: 0, duration: 1.5, stagger: 0.05, ease: 'power4.out' }, '-=0.5');
    }
    if (subtitleRef.current) {
      const lines = subtitleRef.current.querySelectorAll('.subtitle-line');
      tl.from(lines, { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=0.8');
    }
    if (scrollProgressRef.current) tl.from(scrollProgressRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' }, '-=0.5');
    return () => { tl.kill(); };
  }, [isReady]);

  // Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);

      // Hide 3D canvas when scrolled past this component's content (~3 screens)
      const componentHeight = window.innerHeight * 3.2;
      setCanvasVisible(scrollY < componentHeight);

      setScrollProgress(progress);
      setCurrentSection(Math.floor(progress * totalSections));
      const refs = threeRefs.current;
      const totalProgress = progress * totalSections;
      const sectionProgress = totalProgress % 1;
      const camPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 },
      ];
      const cur = camPositions[Math.floor(totalProgress)] || camPositions[0];
      const nxt = camPositions[Math.floor(totalProgress) + 1] || cur;
      refs.targetCameraX = cur.x + (nxt.x - cur.x) * sectionProgress;
      refs.targetCameraY = cur.y + (nxt.y - cur.y) * sectionProgress;
      refs.targetCameraZ = cur.z + (nxt.z - cur.z) * sectionProgress;
      refs.mountains.forEach((m, i) => {
        if (progress > 0.7) m.position.z = 600000;
        else m.position.z = refs.locations?.[i] ?? m.position.z;
      });
      if (refs.nebula && refs.mountains[3]) refs.nebula.position.z = refs.mountains[3].position.z;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  const { lang } = useLang();

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Three.js canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%', opacity: canvasVisible ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none' }} />

      {/* Nav handled globally by AnimatedNavFramer (components/ui/navigation-menu.tsx) — consistent across all pages */}

      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <p style={{ fontFamily: 'var(--font-hind)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8832A', marginBottom: '40px' }}>
          {tx(t.hero.label, lang)}
        </p>
        <h1 ref={titleRef} style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(52px, 9vw, 112px)', fontWeight: 600, lineHeight: 0.92, color: '#F5F0E8', marginBottom: '12px', overflow: 'hidden' }}>
          {tx(t.hero.line1, lang).split('').map((c, i) => (
            <span key={i} className="title-char" style={{ display: 'inline-block' }}>{c === ' ' ? ' ' : c}</span>
          ))}
        </h1>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(52px, 9vw, 112px)', fontWeight: 600, lineHeight: 0.92, color: '#C8832A', fontStyle: 'italic', marginBottom: '48px' }}>
          {tx(t.hero.line2, lang)}
        </h1>
        <div ref={subtitleRef}>
          <p className="subtitle-line" style={{ fontFamily: 'var(--font-hind)', fontSize: '18px', color: 'rgba(245,240,232,0.52)', maxWidth: '480px', lineHeight: 1.7, marginBottom: '4px' }}>
            {tx(t.hero.sub, lang).split('.')[0]}.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/join" style={{ padding: '14px 32px', background: 'rgba(245,240,232,0.1)', color: '#F5F0E8', border: '1px solid rgba(245,240,232,0.2)', fontFamily: 'var(--font-hind)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px', backdropFilter: 'blur(8px)' }}>
            {tx(t.hero.cta1, lang)} →
          </Link>
          <Link href="/philosophy" style={{ padding: '14px 32px', background: '#C8832A', color: '#F5F0E8', fontFamily: 'var(--font-hind)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}>
            {tx(t.hero.cta2, lang)}
          </Link>
        </div>
      </div>

      {/* Scroll progress */}
      <div ref={scrollProgressRef} style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: canvasVisible ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}>
        <span style={{ fontFamily: 'var(--font-hind)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)' }}>
          {tx(t.hero.scroll, lang)}
        </span>
        <div style={{ width: '120px', height: '1px', background: 'rgba(245,240,232,0.15)', borderRadius: '1px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${scrollProgress * 100}%`, background: '#C8832A', transition: 'width 0.1s linear' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-hind)', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.3)' }}>
          {String(currentSection).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
        </span>
      </div>

      {/* Scroll sections */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {[
          { title: 'COSMOS', line: lang === 'hi' ? 'कल्पना की सीमाओं से परे' : lang === 'en' ? 'Beyond the boundaries of imagination' : 'Kalpana ki seemao se pare' },
          { title: 'SANGHA', line: lang === 'hi' ? 'विचार और कर्म के बीच की जगह में' : lang === 'en' ? 'In the space between thought and action' : 'Vichar aur karm ke beech mein' },
        ].map((s, i) => (
          <section key={i} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 600, color: '#F5F0E8', letterSpacing: '-0.02em', marginBottom: '24px' }}>{s.title}</h2>
            <p style={{ fontFamily: 'var(--font-hind)', fontSize: '18px', color: 'rgba(245,240,232,0.45)', maxWidth: '420px', lineHeight: 1.7 }}>{s.line}</p>
          </section>
        ))}
      </div>

      {/* Rest of page after 3D sections */}
      <div style={{ position: 'relative', zIndex: 10, background: '#2C2A27' }}>
        {/* Marquee */}
        <div style={{ overflow: 'hidden', padding: '16px 0' }}>
          <div style={{ display: 'flex', gap: '48px', whiteSpace: 'nowrap', animation: 'marquee 20s linear infinite' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} style={{ fontFamily: 'var(--font-playfair)', color: 'rgba(245,240,232,0.15)', fontSize: '17px', fontStyle: 'italic', letterSpacing: '0.05em', flexShrink: 0 }}>
                Dharma · Inquiry · Action · Community · Philosophy · Walk-Talk · Sangha ·
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};
