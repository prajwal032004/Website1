'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const videos = [
  {
    src: 'https://vimeo.com/1167679730/a43599f39f',
    title: 'Brand Campaign',
    desc: 'Creative storytelling meets brand vision',
    tag: 'Campaign',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167682809/d726843f75',
    title: 'Social Content',
    desc: 'Viral-ready content that drives engagement',
    tag: 'Social',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167685194/a9c74513ab',
    title: 'Uniqlo',
    desc: "Stay cool with UNIQLO's Summer Collection",
    tag: 'Commercial',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167691944',
    title: 'Music Video',
    desc: 'Rhythm and visuals in perfect harmony',
    tag: 'Music',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167689633',
    title: 'Documentary',
    desc: 'Authentic stories, beautifully told',
    tag: 'Doc',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167689020/c15b90820f',
    title: 'Commercial',
    desc: 'High-impact commercials that convert',
    tag: 'Production',
    type: 'horizontal',
  },
  {
    src: 'https://vimeo.com/1167684995/8a9eb1db9a',
    title: 'Fashion Film',
    desc: 'Elegance captured frame by frame',
    tag: 'Fashion',
    type: 'vertical',
  },
]

function getVimeoData(url) {
  const idMatch = url.match(/vimeo\.com\/(\d+)/)
  const hashMatch = url.match(/\/(\d+)\/([a-f0-9]+)/)
  return {
    id: idMatch ? idMatch[1] : null,
    hash: hashMatch ? hashMatch[2] : null,
  }
}

export default function Ads() {
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [unmutedIndex, setUnmutedIndex] = useState(null)
  const containerRefs = useRef([])
  const iframeRefs = useRef([])

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setLoaded(true), 2200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = parseInt(e.target.dataset.idx)
          const iframe = iframeRefs.current[idx]
          if (!iframe) return
          iframe.contentWindow?.postMessage(
            { method: e.isIntersecting ? 'play' : 'pause' },
            '*'
          )
        })
      },
      { threshold: 0.4 }
    )
    containerRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [loaded])

  const toggleSound = (e, idx) => {
    e.stopPropagation()
    const isUnmuted = unmutedIndex === idx
    iframeRefs.current.forEach((iframe) => {
      iframe?.contentWindow?.postMessage({ method: 'setVolume', value: 0 }, '*')
    })
    if (!isUnmuted) {
      setUnmutedIndex(idx)
      iframeRefs.current[idx]?.contentWindow?.postMessage(
        { method: 'setVolume', value: 1 },
        '*'
      )
    } else {
      setUnmutedIndex(null)
    }
  }

  if (!mounted) return null

  return (
    <>
      <style jsx suppressHydrationWarning>{`
        :global(html), :global(body) {
          margin: 0; padding: 0;
          overflow-x: hidden;
          width: 100%;
          background: #050505;   /* ← dark bg so white text is always visible */
          color: #fff;
        }
        :global(*) { box-sizing: border-box; }

        /* ─────────────────────────────────────
           SKELETON
        ───────────────────────────────────── */
        .skeleton {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: #050505;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          transition: opacity 0.7s ease, visibility 0.7s;
          opacity: 1; visibility: visible;
        }
        .skeleton.hidden { opacity: 0; visibility: hidden; pointer-events: none; }

        .sk-noise {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .sk-logo-area {
          text-align: center;
          margin-bottom: 36px;
          position: relative; z-index: 1;
        }
        .sk-logo-bar {
          width: 100px; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent);
          margin: 0 auto 22px;
        }
        .sk-title {
          width: 240px; height: 68px;
          background: rgba(255,255,255,0.04);
          border-radius: 4px;
          margin: 0 auto 12px;
          animation: skPulse 2s ease-in-out infinite;
        }
        .sk-subtitle {
          width: 160px; height: 14px;
          background: rgba(255,255,255,0.025);
          border-radius: 2px;
          margin: 0 auto;
          animation: skPulse 2s ease-in-out infinite 0.3s;
        }

        /*
          Skeleton grid mirrors the exact bento layout:
          4 columns, 6 horizontal cards (span 2) + 1 vertical card (span 1).

          Desktop rows:
            Row 1: sk-h  sk-h   (cols 1-2, cols 3-4)
            Row 2: sk-h  sk-h
            Row 3: sk-h  sk-h
            Row 4: sk-v  (col 1 only)
        */
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          width: min(1400px, 92vw);
          position: relative; z-index: 1;
          align-items: start;
          grid-auto-flow: dense;
        }

        /* Horizontal skeleton card — matches .video-card.horizontal */
        .sk-h {
          grid-column: span 2;
          height: 420px;
        }

        /* Vertical skeleton card — matches .video-card.vertical */
        .sk-v {
          grid-column: span 1;
          height: 550px;
        }

        .sk-card {
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
          overflow: hidden;
          position: relative;
          animation: skPulse 2s ease-in-out infinite;
          width: 100%;
        }
        .sk-card::after {
          content: '';
          position: absolute; inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          animation: skSweep 2.2s ease-in-out infinite;
        }
        .sk-card:nth-child(2) { animation-delay: 0.1s; }
        .sk-card:nth-child(3) { animation-delay: 0.2s; }
        .sk-card:nth-child(4) { animation-delay: 0.3s; }
        .sk-card:nth-child(5) { animation-delay: 0.4s; }
        .sk-card:nth-child(6) { animation-delay: 0.5s; }
        .sk-card:nth-child(7) { animation-delay: 0.6s; }

        .sk-progress {
          position: absolute;
          bottom: 36px; left: 50%;
          transform: translateX(-50%);
          width: 150px; height: 1px;
          background: rgba(255,255,255,0.06);
          overflow: hidden;
          z-index: 1;
        }
        .sk-progress-fill {
          height: 100%; width: 0%;
          background: rgba(255,255,255,0.28);
          animation: skLoad 2.2s ease-in-out forwards;
        }

        @keyframes skPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes skSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes skLoad {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        /* ── Tablet skeleton ── */
        @media (max-width: 1024px) {
          .sk-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .sk-h { grid-column: 1 / -1; height: 340px; }
          .sk-v { grid-column: span 1; height: 0; padding-bottom: 177.78%; }
          /* Show only 4 cards so it doesn't overflow the preview area */
          .sk-card:nth-child(n+5) { display: none; }
        }

        /* ── Mobile skeleton ── */
        @media (max-width: 768px) {
          .sk-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; width: 92vw; }
          .sk-h { grid-column: 1 / -1; height: 220px; }
          .sk-v { grid-column: span 1; height: 0; padding-bottom: 177.78%; }
          .sk-card:nth-child(n+4) { display: none; }
          .sk-logo-area { margin-bottom: 24px; }
        }

        /* ── Small mobile skeleton ── */
        @media (max-width: 480px) {
          .sk-grid { grid-template-columns: 1fr; }
          .sk-h { grid-column: 1; height: 0; padding-bottom: 56.25%; }
          .sk-v { grid-column: 1; height: 0; padding-bottom: 177.78%; }
          .sk-card:nth-child(n+4) { display: none; }
        }

        /* ─────────────────────────────────────
           PAGE
        ───────────────────────────────────── */
        .page {
          min-height: 100vh;
          background: #050505;   /* ← ensures dark bg even if body override fails */
          opacity: 0;
          transition: opacity 0.9s ease;
          display: flex;
          flex-direction: column;
        }
        .page.loaded { opacity: 1; }

        /* ─────────────────────────────────────
           HERO
        ───────────────────────────────────── */
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 0 24px;
        }

        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 28px;
          opacity: 0;
          animation: heroFade 1s ease 0.4s forwards;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          mix-blend-mode: difference;
        }

        .hero-title {
          font-size: clamp(72px, 13vw, 180px);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #fff;
          text-align: center;
          opacity: 0;
          animation: fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
        }

        .hero-scroll {
          position: absolute;
          bottom: 40px; left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: heroFade 1s ease 1.3s forwards;
        }
        .hero-scroll-label {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
        }
        .hero-scroll-line {
          width: 1px; height: 44px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.28), transparent);
          animation: scrollPulse 1.6s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: clamp(58px, 18vw, 110px); }
          .hero-eyebrow { font-size: 10px; }
          .hero-scroll { bottom: 24px; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: clamp(50px, 20vw, 88px); }
        }

        /* ─────────────────────────────────────
           WORK
        ───────────────────────────────────── */
        .work {
          padding: 100px 32px 80px;
          max-width: 1500px;
          margin: 0 auto;
          width: 100%;
        }
        .work-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 52px;
        }
        .work-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          line-height: 1;
          color: #fff;
          text-align: center;
        }
        .work-count {
          position: absolute;
          right: 0;
          bottom: 6px;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          white-space: nowrap;
        }
        .work-divider {
          width: 40px; height: 1px;
          background: rgba(255,255,255,0.1);
          margin-bottom: 44px;
        }

        /* ─────────────────────────────────────
           BENTO GRID
        ───────────────────────────────────── */
        .bento {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          grid-auto-flow: dense;
          align-items: start;
        }

        .video-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: #080808;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.45s ease,
                      border-color 0.3s ease;
        }
        .video-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 28px 70px rgba(0,0,0,0.65);
          border-color: rgba(255,255,255,0.14);
        }

        .video-card.horizontal {
          grid-column: span 2;
          height: 420px;
        }
        .video-card.vertical {
          grid-column: span 1;
          height: 550px;
        }

        .vimeo-wrap {
          position: absolute; inset: 0;
          background: #000;
          overflow: hidden;
        }
        .vimeo-wrap iframe {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 170%; height: 170%;
          border: none;
          pointer-events: none;
        }
        .video-card.vertical .vimeo-wrap iframe {
          width: 130%; height: 130%;
        }

        .card-info {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.92) 0%,
            rgba(0,0,0,0.35) 50%,
            transparent 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 28px 28px;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .video-card:hover .card-info { opacity: 1; }

        .card-tag {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 8px;
        }
        .card-title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .card-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }

        .card-badge {
          position: absolute;
          top: 16px; left: 16px;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(10px);
          padding: 5px 12px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .sound-btn {
          position: absolute;
          top: 16px; right: 16px;
          width: 42px; height: 42px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
        }
        .sound-btn:hover {
          background: rgba(255,255,255,0.12);
          transform: scale(1.1);
        }
        .sound-btn svg {
          width: 17px; height: 17px;
          stroke: #fff; fill: none;
        }

        /* ─── TABLET ≤1024px ─── */
        @media (max-width: 1024px) {
          .bento {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .video-card.horizontal {
            grid-column: 1 / -1;
            height: 340px;
          }
          .video-card.vertical {
            grid-column: span 1;
            height: auto;
            aspect-ratio: 9 / 16;
          }
          .video-card.vertical .vimeo-wrap {
            position: absolute !important;
            inset: 0 !important;
          }
        }

        /* ─── MOBILE ≤768px ─── */
        @media (max-width: 768px) {
          .work { padding: 60px 16px 56px; }
          .work-header {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 24px;
            gap: 6px;
          }
          .work-divider { margin-bottom: 28px; }
          .bento { gap: 8px; }

          .video-card.horizontal {
            grid-column: 1 / -1;
            height: 220px;
          }
          .video-card.vertical {
            grid-column: span 1;
            height: auto;
            aspect-ratio: 9 / 16;
          }
          .video-card.vertical .vimeo-wrap {
            position: absolute !important;
            inset: 0 !important;
          }

          .card-info { opacity: 1; padding: 14px; }
          .card-desc { display: none; }
          .card-title { font-size: 14px; margin-bottom: 0; }
          .card-tag { font-size: 8px; margin-bottom: 4px; }
          .card-badge { font-size: 8px; padding: 3px 8px; top: 10px; left: 10px; }

          .sound-btn { width: 34px; height: 34px; top: 10px; right: 10px; }
          .sound-btn svg { width: 13px; height: 13px; }
          .video-card:hover { transform: none; box-shadow: none; }
        }

        /* ─── SMALL MOBILE ≤480px ─── */
        @media (max-width: 480px) {
          .work { padding: 52px 14px 48px; }
          .bento {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .video-card.horizontal {
            grid-column: 1;
            height: auto;
            aspect-ratio: 16 / 9;
          }
          .video-card.vertical {
            grid-column: 1;
            height: auto;
            aspect-ratio: 9 / 16;
          }
          .video-card.horizontal .vimeo-wrap,
          .video-card.vertical .vimeo-wrap {
            position: absolute !important;
            inset: 0 !important;
          }
          .video-card.vertical .vimeo-wrap iframe {
            width: 130%; height: 130%;
          }
        }

        /* ─────────────────────────────────────
           FOOTER
        ───────────────────────────────────── */
        .copyright-container {
          width: 100%;
          padding: 60px 20px;
          margin-top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 100;
          /* subtle top separator so footer reads clearly */
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .copyright {
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          font-weight: 400;
          letter-spacing: 0.5px;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .copyright-link,
        .copyright-link:visited,
        .copyright-link:active {
          color: #ffffff;
          font-weight: 700;
          text-decoration: none;
          position: relative;
          display: inline-block;
          margin: 0 4px;
          cursor: pointer;
        }

        .copyright-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: #ffffff;
          transition: width 0.3s ease;
        }

        .copyright-link:hover::after { width: 100%; }
        .copyright-link:hover {
          opacity: 0.8;
          transform: translateY(-1px);
        }
      `}</style>

      {/* ── SKELETON ──
          Mirrors exact bento layout:
          6 horizontal cards (span 2 each) → 3 rows of 2
          1 vertical card  (span 1)        → row 4, col 1
      */}
      <div className={`skeleton ${loaded ? 'hidden' : ''}`}>
        <div className="sk-noise" />
        <div className="sk-logo-area">
          <div className="sk-logo-bar" />
          <div className="sk-title" />
          <div className="sk-subtitle" />
        </div>
        <div className="sk-grid">
          {/* Row 1 */}
          <div className="sk-card sk-h" />
          <div className="sk-card sk-h" />
          {/* Row 2 */}
          <div className="sk-card sk-h" />
          <div className="sk-card sk-h" />
          {/* Row 3 */}
          <div className="sk-card sk-h" />
          <div className="sk-card sk-h" />
          {/* Row 4 — single vertical */}
          <div className="sk-card sk-v" />
        </div>
        <div className="sk-progress">
          <div className="sk-progress-fill" />
        </div>
      </div>

      {/* ── PAGE ── */}
      <div className={`page ${loaded ? 'loaded' : ''}`}>

        <section className="hero">
          <p className="hero-eyebrow">5feet4 Studio — Mumbai</p>
          <div className="hero-content">
            <h1 className="hero-title">
              Creative <br />
              Stories
            </h1>
          </div>
          <div className="hero-scroll">
            <span className="hero-scroll-label">Scroll</span>
            <div className="hero-scroll-line" />
          </div>
        </section>

        <section className="work">
          <div className="work-header">
            <h2 className="work-title">Our Work</h2>
            <span className="work-count">0{videos.length} Projects</span>
          </div>
          <div className="work-divider" />

          <div className="bento">
            {videos.map((video, i) => {
              const { id, hash } = getVimeoData(video.src)
              const iframeSrc = hash
                ? `https://player.vimeo.com/video/${id}?h=${hash}&autoplay=1&muted=1&loop=1&background=1`
                : `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`
              const isUnmuted = unmutedIndex === i

              return (
                <div
                  key={i}
                  className={`video-card ${video.type}`}
                  ref={(el) => (containerRefs.current[i] = el)}
                  data-idx={i}
                >
                  <div className="vimeo-wrap">
                    <iframe
                      ref={(el) => (iframeRefs.current[i] = el)}
                      src={iframeSrc}
                      title={video.title}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="card-badge">{video.tag}</div>

                  <button
                    className="sound-btn"
                    aria-label="Toggle sound"
                    onClick={(e) => toggleSound(e, i)}
                  >
                    {isUnmuted ? (
                      <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    )}
                  </button>

                  <div className="card-info">
                    <p className="card-tag">{video.tag}</p>
                    <h3 className="card-title">{video.title}</h3>
                    <p className="card-desc">{video.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div className="copyright-container">
          <p className="copyright">
            © 2026{' '}
            <Link href="/" className="copyright-link">
              5feet4
            </Link>
            . All Rights Reserved.
          </p>
        </div>

      </div>
    </>
  )
}