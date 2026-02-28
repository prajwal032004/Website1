'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function About() {
  const scrollSectionRef = useRef(null)
  const scrollTextRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [expandedCard, setExpandedCard] = useState(null)   // desktop: "rowIdx-cardIdx" | mobile: number index
  const [activeCard, setActiveCard] = useState(null)        // mobile IntersectionObserver

  const stripRef = useRef(null)
  const setARef = useRef(null)
  const setBRef = useRef(null)
  const mobileCardRefs = useRef([])

  const teamMembers = [
    {
      img: '/profile/6.jpeg',
      name: 'KARAN CHANDA',
      role: 'Content Strategist',
      desc: 'Driving creative direction for high-performing social media content. Focused on crafting scroll-stopping visuals and messaging that convert attention into real engagement and growth for clients.',
      instagram: 'https://www.instagram.com/karan.chanda.17/',
      objPos: '48.8% 24.8%',
    },
    {
      img: '/profile/7.jpeg',
      name: 'AIMAN KALIA',
      role: 'Producer',
      desc: 'Overseeing seamless execution from concept to final cut. Coordinating teams, timelines, and resources to deliver polished content and sustainable growth for every client.',
      instagram: 'https://www.instagram.com/aimankalia/',
      objPos: '50% 16.4%',
    },
    {
      img: '/profile/1.jpeg',
      name: 'KANNAN VERMA',
      role: 'Production Lead',
      desc: 'Leading teams and elevating visual storytelling. Delivering cinematic content that resonates deeply and consistently drives measurable results for every client.',
      instagram: 'https://www.instagram.com/_verma.kannan/',
      objPos: '52.3% 12.8%',
    },
    {
      img: '/profile/2.jpeg',
      name: 'Junaid Ansari',
      role: 'Creative Director',
      desc: 'Shaping the visual identity behind every campaign. Blending art direction with strategic insight to ensure every frame tells a story worth remembering and sharing.',
      instagram: 'https://www.instagram.com/jexstro/',
      objPos: '48.8% 24.8%',
    },
    {
      img: '/profile/3.jpeg',
      name: 'Amol Gakhal',
      role: 'Video Editor',
      desc: 'Crafting high-impact cuts that hold attention and drive retention. Specialised in short-form content that feels native, engaging, and always on-brand.',
      instagram: 'https://instagram.com/thegakhal/',
      objPos: '55% 18%',
    },
    {
      img: '/profile/5.jpeg',
      name: 'MEHUL SINGHVI',
      role: 'Brand Strategist',
      desc: 'Building brand identities that resonate and last. Translating business goals into clear creative frameworks that connect authentically with audiences.',
      instagram: 'https://www.instagram.com/mehulsinghviii/',
      objPos: '42% 20%',
    },
    {
      img: '/profile/4.jpeg',
      name: 'PRAJWAL',
      role: 'Web Dev',
      desc: 'Bringing ideas to life through kinetic design and animation. Transforming static concepts into dynamic visuals that captivate and communicate with precision.',
      instagram: 'https://www.instagram.com/_prajwal__2004/?hl=en',
      objPos: '48.8% 24.8%',
    },
  ]

  const logoSrcs = [
    "/4.png",
    "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/33.png?updatedAt=1772060169498",
    "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/16.png?updatedAt=1772060168724",
    "/15.webp", "/17.webp", "/6.webp", "/13.webp", "/5.webp",
    "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/38.png?updatedAt=1772060171476",
    "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/11.png?updatedAt=1772060168489",
    "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/42.png?updatedAt=1772060171459",
    "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/17.png?updatedAt=1772060170074",
    "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/3.png?updatedAt=1772060169776",
    "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/5'4%202026%20Lineup%20(2).png",
    "/8.webp", "/3.png",
  ]

  // Desktop: 3-3-1 layout (from file 1)
  const desktopRows = [
    teamMembers.slice(0, 3),
    teamMembers.slice(3, 6),
    teamMembers.slice(6, 7),
  ]

  // ── Image preloading ──
  useEffect(() => {
    const startTime = Date.now()
    const MIN_LOADING_TIME = 2000
    const uniqueTeamImages = [...new Set(teamMembers.map((m) => m.img))]
    const allImageUrls = [...uniqueTeamImages, ...logoSrcs]
    const imagePromises = allImageUrls.map((src) =>
      new Promise((resolve) => {
        const img = document.createElement('img')
        img.onload = () => resolve(true)
        img.onerror = () => resolve(true)
        img.src = src
      })
    )
    Promise.all(imagePromises).then(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, MIN_LOADING_TIME - elapsed)
      setTimeout(() => setIsLoaded(true), remaining)
    })
  }, [])

  // ── Blur on scroll ──
  useEffect(() => {
    if (!isLoaded) return
    const heroSection = document.querySelector('.hero-section')
    const updateBlur = () => {
      if (!heroSection) return
      const rect = heroSection.getBoundingClientRect()
      if (rect.bottom < window.innerHeight * 0.2) {
        document.body.classList.add('blur-active')
      } else {
        document.body.classList.remove('blur-active')
      }
    }
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { updateBlur(); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    updateBlur()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('blur-active')
    }
  }, [isLoaded])

  // ── Scroll text word-reveal ──
  useEffect(() => {
    if (!isLoaded) return
    const scrollText = scrollTextRef.current
    const scrollSection = scrollSectionRef.current
    if (!scrollText || !scrollSection) return
    const words = scrollText.textContent.trim().split(/\s+/).filter(Boolean)
    scrollText.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(' ')
    const wordEls = scrollText.querySelectorAll('.word')
    function update() {
      const rect = scrollSection.getBoundingClientRect()
      const wh = window.innerHeight
      const scrollStart = wh * 0.75
      const scrollEnd = -rect.height * 0.25
      let progress = (scrollStart - rect.top) / (scrollStart - scrollEnd)
      progress = Math.max(0, Math.min(1, progress))
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
      const active = Math.floor(eased * wordEls.length)
      wordEls.forEach((el, i) => el.classList.toggle('active', i < active))
    }
    let ticking = false
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false }) }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [isLoaded])

  // ── RAF marquee ──
  useEffect(() => {
    if (!isLoaded) return
    const strip = stripRef.current
    const setA = setARef.current
    const setB = setBRef.current
    if (!strip || !setA || !setB) return
    setB.innerHTML = ''
    setA.querySelectorAll('img').forEach((img) => {
      const c = img.cloneNode(true)
      c.removeAttribute('alt')
      setB.appendChild(c)
    })
    let rafId = null
    let pos = 0
    let lastTs = null
    let paused = false
    const SPEED = 30
    const onEnter = () => { paused = true }
    const onLeave = () => { paused = false }
    strip.addEventListener('mouseenter', onEnter)
    strip.addEventListener('mouseleave', onLeave)
    function tick(ts) {
      if (!lastTs) lastTs = ts
      const dt = ts - lastTs
      lastTs = ts
      if (!paused) {
        const hw = setA.offsetWidth
        if (hw > 0) {
          pos += (hw / (SPEED * 1000)) * dt
          if (pos >= hw) pos -= hw
          strip.style.transform = `translate3d(-${pos}px, 0, 0)`
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    const startTimer = setTimeout(() => {
      pos = 0; lastTs = null; rafId = requestAnimationFrame(tick)
    }, 120)
    return () => {
      clearTimeout(startTimer)
      cancelAnimationFrame(rafId)
      strip.removeEventListener('mouseenter', onEnter)
      strip.removeEventListener('mouseleave', onLeave)
    }
  }, [isLoaded])

  // ── Mobile IntersectionObserver (from file 2) ──
  useEffect(() => {
    if (!isLoaded) return
    if (window.innerWidth > 768) return
    const cards = mobileCardRefs.current.filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        let best = null
        let bestRatio = 0
        entries.forEach((entry) => {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio
            best = entry
          }
        })
        if (best && best.isIntersecting) {
          setActiveCard(parseInt(best.target.dataset.index))
        }
      },
      {
        threshold: [0.4, 0.5, 0.6, 0.7, 0.8],
        rootMargin: '-5% 0px -5% 0px',
      }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [isLoaded])

  // ── Desktop: close expanded card when tapping outside ──
  useEffect(() => {
    if (expandedCard === null) return
    const handleOutside = (e) => {
      if (!e.target.closest('.team-card-wrap') && !e.target.closest('.mobile-card')) {
        setExpandedCard(null)
      }
    }
    document.addEventListener('touchstart', handleOutside, { passive: true })
    return () => document.removeEventListener('touchstart', handleOutside)
  }, [expandedCard])

  // Desktop tap handler (key = "rowIdx-cardIdx")
  const handleDesktopCardTap = (rowIdx, cardIdx) => {
    const key = `${rowIdx}-${cardIdx}`
    setExpandedCard(prev => prev === key ? null : key)
  }

  // Mobile tap handler (key = number index)
  const handleMobileCardTap = (idx) => {
    setExpandedCard(prev => prev === idx ? null : idx)
  }

  const IgSvg = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )

  return (
    <>
      <style jsx suppressHydrationWarning>{`

        @keyframes skPulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.35; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(255,30,30,0.55); }
          50%       { transform: scale(1.2); opacity: 0.8; box-shadow: 0 0 0 7px rgba(255,30,30,0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes descSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }

        /* ════════════════════════════
           SKELETON
        ════════════════════════════ */
        .skeleton-wrapper {
          position: fixed; inset: 0; z-index: 9999;
          background: #0808084a; overflow-y: auto;
          transition: opacity 0.65s ease-out, visibility 0.65s;
          opacity: 1; visibility: visible;
        }
        .skeleton-wrapper.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .sk-inner { min-height: 100%; display: flex; flex-direction: column; }
        .sk-hero {
          height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 20px; padding: 40px 24px; flex-shrink: 0;
        }
        .sk-hero-title { border-radius: 14px; background: #1c1c1c; animation: skPulse 1.9s ease-in-out infinite; }
        .sk-hero-title.l1 { width: min(55%, 600px); height: clamp(60px, 10vw, 130px); }
        .sk-hero-title.l2 { width: min(25%, 260px); height: clamp(44px, 7.5vw, 105px); animation-delay: 0.18s; }
        .sk-team { padding: 80px 40px; flex-shrink: 0; }
        .sk-team-grid { display: flex; flex-direction: column; gap: 10px; max-width: 1100px; margin: 0 auto; }
        .sk-team-row { display: flex; gap: 10px; height: 420px; }
        .sk-team-row.last { justify-content: center; }
        .sk-card {
          flex: 1 1 0; background: #111; border-radius: 13px;
          border: 1px solid rgba(255,255,255,0.05); position: relative; overflow: hidden;
          animation: skPulse 1.9s ease-in-out infinite;
        }
        .sk-team-row.last .sk-card { flex: 0 0 calc(33.333% - 7px); }
        .sk-card-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 60%, transparent);
          display: flex; flex-direction: column; gap: 10px;
        }
        .sk-line { border-radius: 6px; background: rgba(255,255,255,0.09); animation: skPulse 1.9s ease-in-out infinite; }
        .sk-line.name { height: 20px; width: 52%; }
        .sk-line.role { height: 12px; width: 36%; animation-delay: 0.1s; }
        .sk-scroll { padding: 80px 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; min-height: 40vh; }
        .sk-scroll-inner { max-width: 1100px; width: 100%; display: flex; flex-direction: column; gap: 14px; align-items: center; }
        .sk-t-line { border-radius: 6px; background: #181818; }
        .sk-t-line.t1 { height: 26px; width: 100%; animation: skPulse 1.9s ease-in-out infinite; }
        .sk-t-line.t2 { height: 26px; width: 97%; animation: skPulse 1.9s 0.1s ease-in-out infinite; }
        .sk-t-line.t3 { height: 26px; width: 99%; animation: skPulse 1.9s 0.2s ease-in-out infinite; }
        .sk-t-line.t4 { height: 26px; width: 95%; animation: skPulse 1.9s 0.3s ease-in-out infinite; }
        .sk-t-line.t5 { height: 26px; width: 65%; animation: skPulse 1.9s 0.4s ease-in-out infinite; }
        .sk-trusted { padding: 80px 40px; flex-shrink: 0; text-align: center; }
        .sk-trusted-head { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 60px; }
        .sk-dot { width: 12px; height: 12px; border-radius: 50%; background: #2a2a2a; animation: skPulse 1.9s ease-in-out infinite; }
        .sk-trusted-label { height: 16px; width: 140px; border-radius: 4px; background: #252525; animation: skPulse 1.9s 0.1s ease-in-out infinite; }
        .sk-logo-row { display: flex; gap: 12px; justify-content: center; align-items: center; flex-wrap: wrap; }
        .sk-logo-item { height: 48px; width: 120px; border-radius: 8px; background: #141414; border: 1px solid rgba(255,255,255,0.04); animation: skPulse 1.9s ease-in-out infinite; }
        .sk-wisdom { padding: 60px 40px; flex-shrink: 0; display: flex; justify-content: center; }
        .sk-wisdom-inner {
          max-width: 860px; width: 100%; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 60px 48px;
          display: flex; flex-direction: column; gap: 14px; align-items: center;
        }
        .sk-w-line { border-radius: 6px; background: #191919; }
        .sk-w-line.w1 { height: 24px; width: 95%; animation: skPulse 1.9s ease-in-out infinite; }
        .sk-w-line.w2 { height: 24px; width: 88%; animation: skPulse 1.9s 0.1s ease-in-out infinite; }
        .sk-w-line.w3 { height: 24px; width: 91%; animation: skPulse 1.9s 0.2s ease-in-out infinite; }
        .sk-w-line.w4 { height: 14px; width: 36%; margin-top: 18px; animation: skPulse 1.9s 0.3s ease-in-out infinite; }
        .sk-footer { padding: 50px 20px; flex-shrink: 0; display: flex; justify-content: center; border-top: 1px solid rgba(255,255,255,0.04); margin-top: auto; }
        .sk-footer-text { height: 14px; width: 220px; border-radius: 4px; background: #141414; animation: skPulse 1.9s ease-in-out infinite; }

        /* ════════════════════════════
           CONTENT WRAPPER
        ════════════════════════════ */
        .content-wrapper { opacity: 0; transition: opacity 0.9s ease-in; }
        .content-wrapper.loaded { opacity: 1; }

        :global(body.blur-active .background-video) {
          filter: blur(14px) brightness(0.55);
          transition: filter 0.8s ease;
        }

        /* ════════════════════════════
           HERO
        ════════════════════════════ */
        .hero-section {
          position: relative; height: 100vh;
          display: flex; align-items: center; justify-content: center; flex-direction: column;
          overflow: hidden;
        }
        .hero-content {
          position: relative; z-index: 2; text-align: center;
          mix-blend-mode: difference; animation: fadeInUp 1s ease-out both;
        }
        .hero-title {
          font-size: clamp(64px, 11vw, 148px);
          font-weight: 800; line-height: 1.05; letter-spacing: -3px; color: #fff;
        }

        /* ════════════════════════════
           TEAM — DESKTOP (3-3-1 from file 1)
        ════════════════════════════ */
        #team-section { padding: 100px 40px; position: relative; z-index: 1; }

        .team-wrapper {
          display: flex; flex-direction: column;
          gap: 10px; width: 100%; max-width: 1100px; margin: 0 auto;
        }

        .team-row {
          display: flex;
          gap: 10px;
          height: 420px;
        }

        /* Solo row (7th card) */
        .team-row.solo-row { justify-content: center; }
        .team-row.solo-row .team-card-wrap {
          flex: 0 0 calc(33.333% - 7px);
          transition: flex 0.65s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }
        .team-row.solo-row .team-card-wrap:hover,
        .team-row.solo-row .team-card-wrap.expanded {
          flex: 0 0 calc(66.666% - 5px);
        }

        /* Base card */
        .team-card-wrap {
          position: relative; border-radius: 13px; overflow: hidden;
          cursor: pointer; background: #0e0e0e;
          flex: 1 1 0; min-width: 0;
          opacity: 0;
          animation: cardIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transition: flex 0.65s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Animation delays */
        .team-row:nth-child(1) .team-card-wrap:nth-child(1) { animation-delay: 0.04s; }
        .team-row:nth-child(1) .team-card-wrap:nth-child(2) { animation-delay: 0.10s; }
        .team-row:nth-child(1) .team-card-wrap:nth-child(3) { animation-delay: 0.16s; }
        .team-row:nth-child(2) .team-card-wrap:nth-child(1) { animation-delay: 0.22s; }
        .team-row:nth-child(2) .team-card-wrap:nth-child(2) { animation-delay: 0.28s; }
        .team-row:nth-child(2) .team-card-wrap:nth-child(3) { animation-delay: 0.34s; }
        .team-row:nth-child(3) .team-card-wrap:nth-child(1) { animation-delay: 0.40s; }

        /* Desktop hover expand */
        .team-row:not(.solo-row):has(.team-card-wrap:hover) .team-card-wrap:hover { flex: 2.2 1 0; }
        .team-row:not(.solo-row):has(.team-card-wrap:hover) .team-card-wrap:not(:hover) { flex: 0.65 1 0; }

        /* Desktop tap expand */
        .team-row:not(.solo-row):has(.team-card-wrap.expanded) .team-card-wrap.expanded { flex: 2.2 1 0; }
        .team-row:not(.solo-row):has(.team-card-wrap.expanded) .team-card-wrap:not(.expanded) { flex: 0.65 1 0; }

        /* Photo */
        .card-photo {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .team-card-wrap:hover .card-photo,
        .team-card-wrap.expanded .card-photo { transform: scale(1.05); }

        .card-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 62%, rgba(0,0,0,0.97) 100%);
          z-index: 1;
        }

        /* Card content */
        .card-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 24px 20px 26px; z-index: 5;
        }
        .card-name-row {
          display: flex; align-items: center; gap: 7px; margin-bottom: 4px;
        }
        .card-name {
          font-size: 17px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; line-height: 1;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          flex-shrink: 1; min-width: 0;
        }
        .card-ig-link {
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          opacity: 0; transform: scale(0.6);
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          position: relative;
        }
        .card-ig-link::before { content: ''; position: absolute; inset: -6px; border-radius: 50%; }
        .team-card-wrap:hover .card-ig-link,
        .team-card-wrap.expanded .card-ig-link { opacity: 1; transform: scale(1); }
        .card-ig-link:hover {
          background: rgba(255,255,255,0.22) !important;
          border-color: rgba(255,255,255,0.5) !important;
          color: #fff !important;
          transform: scale(1.18) !important;
        }
        .card-ig-icon { width: 11px; height: 11px; display: block; pointer-events: none; }

        .card-role {
          font-size: 12px; color: rgba(255,255,255,0.52);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          transition: color 0.4s ease;
        }
        .team-card-wrap:hover .card-role,
        .team-card-wrap.expanded .card-role { color: rgba(255,255,255,0.82); }

        .card-divider {
          height: 1px; background: rgba(255,255,255,0.14); width: 0; margin: 0;
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1) 0.08s,
                      margin 0.5s cubic-bezier(0.22,1,0.36,1) 0.08s;
        }
        .team-card-wrap:hover .card-divider,
        .team-card-wrap.expanded .card-divider { width: 100%; margin: 13px 0; }

        .card-bio-wrap {
          display: grid; grid-template-rows: 0fr; opacity: 0;
          transition: grid-template-rows 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s,
                      opacity 0.4s ease 0.2s;
        }
        .team-card-wrap:hover .card-bio-wrap,
        .team-card-wrap.expanded .card-bio-wrap { grid-template-rows: 1fr; opacity: 1; }
        .card-bio-inner { overflow: hidden; }
        .card-bio { font-size: 12.5px; line-height: 1.72; color: rgba(255,255,255,0.68); }

        /* Mobile team — hidden on desktop */
        .team-mobile { display: none; }

        /* ════════════════════════════
           SCROLL TEXT
        ════════════════════════════ */
        .scroll-text-section { padding: 120px 40px; min-height: 60vh; display: flex; align-items: center; justify-content: center; }
        .text-container { max-width: 1200px; width: 100%; text-align: center; }
        .scroll-text { font-size: clamp(26px, 3.8vw, 50px); line-height: 1.75; font-weight: 400; color: #fff; }
        :global(.scroll-text .word) { opacity: 0.18; transition: opacity 0.25s ease; display: inline-block; }
        :global(.scroll-text .word.active) { opacity: 1; }

        /* ════════════════════════════
           TRUSTED BY
        ════════════════════════════ */
        .trusted-section { padding: 80px 20px; display: flex; justify-content: center; }
        .trusted-box {
          width: 100%; max-width: 1400px; padding: 50px 0;
          border-radius: 20px; background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 24px 70px rgba(0,0,0,0.45);
          text-align: center; overflow: hidden;
        }
        .trusted-header { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 48px; padding: 0 40px; }
        .pulse-dot { width: 11px; height: 11px; background: #ff2020; border-radius: 50%; flex-shrink: 0; animation: pulse-dot 2s infinite; }
        .trusted-header h2 { font-size: 0.85rem; letter-spacing: 4px; text-transform: uppercase; font-weight: 700; color: rgba(255,255,255,0.9); }
        .marquee-outer {
          width: 100%; overflow: hidden; height: 130px; display: flex; align-items: center;
          -webkit-mask-image: linear-gradient(to right, transparent 0, #000 100px, #000 calc(100% - 100px), transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 100px, #000 calc(100% - 100px), transparent 100%);
        }
        .marquee-strip {
          display: flex; align-items: center; height: 110px;
          width: max-content; will-change: transform; transform: translate3d(0,0,0);
        }
        .marquee-set { display: flex; align-items: center; gap: 3px; height: 100%; flex-shrink: 0; }
        .marquee-logo {
          display: block; height: 110px; flex-shrink: 0;
          object-fit: contain; object-position: center;
          box-sizing: border-box; padding: 10px 18px;
          filter: brightness(0) invert(1) opacity(0.72);
          transition: filter 0.38s ease, transform 0.38s ease; cursor: pointer;
        }
        .marquee-logo:hover { filter: none; transform: scale(1.1) translateY(-4px); }

        /* ════════════════════════════
           WISDOM
        ════════════════════════════ */
        .wisdom-section {
          margin: 60px auto; padding: 72px 52px;
          background: rgba(255,255,255,0.025); border-radius: 20px;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          max-width: 1100px; text-align: center;
          border: 1px solid rgba(255,255,255,0.08); position: relative;
        }
        .wisdom-section::before {
          content: '"'; position: absolute; top: -20px; left: 40px;
          font-size: 140px; color: rgba(255,255,255,0.06);
          font-family: Georgia, serif; line-height: 1; pointer-events: none;
        }
        .wisdom-section p:first-child { font-size: clamp(1.25rem, 2.3vw, 1.9rem); line-height: 1.75; font-style: italic; margin-bottom: 24px; color: #fff; }
        .wisdom-section p:last-child { font-size: 0.9rem; opacity: 0.5; color: #fff; letter-spacing: 1px; }

        /* ════════════════════════════
           FOOTER
        ════════════════════════════ */
        .copyright-container { width: 100%; padding: 56px 20px; display: flex; justify-content: center; align-items: center; position: relative; z-index: 100; border-top: 1px solid rgba(255,255,255,0.06); }
        .copyright { font-size: 14px; color: rgba(255,255,255,0.8); font-weight: 400; letter-spacing: 0.5px; margin: 0; }
        .copyright-link, .copyright-link:visited, .copyright-link:active { color: #fff; font-weight: 700; text-decoration: none; position: relative; display: inline-block; margin: 0 4px; }
        .copyright-link::after { content: ''; position: absolute; width: 0; height: 1px; bottom: -2px; left: 0; background-color: #fff; transition: width 0.3s ease; }
        .copyright-link:hover::after { width: 100%; }
        .copyright-link:hover { opacity: 0.75; }

        /* ════════════════════════════
           MOBILE (≤ 768px) — full layout from file 2
        ════════════════════════════ */
        @media (max-width: 768px) {

          /* Hero */
          .hero-section { height: 100svh; }
          .hero-title { font-size: clamp(56px, 16vw, 88px); letter-spacing: -2px; }

          /* Team section */
          #team-section { padding: 48px 16px 56px; }
          .team-wrapper { display: none !important; }

          /* Mobile: single column */
          .team-mobile {
            display: flex;
            flex-direction: column;
            gap: 14px;
            max-width: 480px;
            margin: 0 auto;
            width: 100%;
          }

          /* Mobile card */
          .mobile-card {
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            background: #0a0a0a;
            width: 100%;
            cursor: pointer;
            transition: box-shadow 0.4s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          }
          .mobile-card.in-view {
            box-shadow: 0 12px 40px rgba(0,0,0,0.65);
          }

          /* Photo wrapper */
          .mobile-card-photo-wrap {
            position: relative;
            width: 100%;
            aspect-ratio: 3 / 4;
            overflow: hidden;
          }

          /* Photo fills wrapper */
          .mobile-card .card-photo {
            position: absolute; inset: 0;
            width: 100%; height: 100%;
            object-fit: cover;
            transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
          }
          .mobile-card.in-view .card-photo { transform: scale(1.03); }
          .mobile-card.expanded .card-photo { transform: scale(1.06); }

          /* Gradient */
          .mobile-card-gradient {
            position: absolute; inset: 0; z-index: 1;
            background: linear-gradient(
              to bottom,
              rgba(0,0,0,0) 35%,
              rgba(0,0,0,0.6) 62%,
              rgba(0,0,0,0.96) 100%
            );
            transition: background 0.4s ease;
          }
          .mobile-card.expanded .mobile-card-gradient {
            background: linear-gradient(
              to bottom,
              rgba(0,0,0,0.1) 0%,
              rgba(0,0,0,0.55) 45%,
              rgba(0,0,0,0.97) 75%,
              rgba(0,0,0,0.99) 100%
            );
          }

          /* Identity block */
          .mobile-card-identity {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            z-index: 2;
            padding: 16px 16px 18px;
          }

          /* Name + IG row */
          .mobile-name-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 5px;
          }
          .mobile-name {
            font-size: clamp(13px, 3.5vw, 17px);
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #fff;
            line-height: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-shrink: 1;
            min-width: 0;
          }

          /* IG button */
          .mobile-ig-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: rgba(255,255,255,0.15);
            border: 1px solid rgba(255,255,255,0.28);
            color: #fff;
            text-decoration: none;
            transition: background 0.2s ease, transform 0.2s ease;
            position: relative;
          }
          .mobile-ig-btn::before {
            content: '';
            position: absolute;
            inset: -8px;
            border-radius: 50%;
          }
          .mobile-ig-btn:active {
            background: rgba(255,255,255,0.3);
            transform: scale(0.9);
          }
          .mobile-ig-icon {
            width: 12px; height: 12px;
            display: block; pointer-events: none;
          }

          /* Role */
          .mobile-role {
            font-size: clamp(10px, 2.5vw, 12px);
            color: rgba(255,255,255,0.55);
            letter-spacing: 0.06em;
            text-transform: uppercase;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          /* Tap hint */
          .mobile-tap-hint {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 8px;
            opacity: 0.38;
            transition: opacity 0.3s ease;
          }
          .mobile-card.expanded .mobile-tap-hint {
            opacity: 0;
            pointer-events: none;
          }
          .mobile-tap-hint span {
            font-size: 10px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #fff;
          }
          .mobile-tap-hint svg {
            width: 10px; height: 10px; color: #fff;
            animation: bounceY 1.6s ease-in-out infinite;
          }

          /* Expanded desc panel */
          .mobile-desc-panel {
            position: relative;
            z-index: 3;
            background: rgba(8, 8, 8, 0.96);
            border-top: 1px solid rgba(255,255,255,0.08);
            overflow: hidden;
            max-height: 0;
            transition: max-height 0.5s cubic-bezier(0.22,1,0.36,1),
                        padding 0.4s cubic-bezier(0.22,1,0.36,1),
                        opacity 0.35s ease;
            opacity: 0;
            padding: 0 18px;
          }
          .mobile-card.expanded .mobile-desc-panel {
            max-height: 300px;
            opacity: 1;
            padding: 18px 18px 22px;
          }

          .mobile-desc-text {
            font-size: clamp(13px, 3.4vw, 15px);
            line-height: 1.72;
            color: rgba(255,255,255,0.78);
          }
          .mobile-card.expanded .mobile-desc-text {
            animation: descSlideUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.12s both;
          }

          /* Close hint */
          .mobile-close-hint {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 14px;
            opacity: 0.35;
          }
          .mobile-close-hint span {
            font-size: 10px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #fff;
          }
          .mobile-close-hint svg { width: 10px; height: 10px; color: #fff; }

          /* Divider */
          .mobile-desc-divider {
            height: 1px;
            background: rgba(255,255,255,0.12);
            margin-bottom: 14px;
          }

          /* Skeleton mobile */
          .sk-team-grid { display: flex; flex-direction: column; }
          .sk-team-row { height: 260px; }
          .sk-team-row.last { height: 260px; }

          /* Scroll text */
          .scroll-text-section { padding: 72px 20px; min-height: auto; }
          .scroll-text { font-size: clamp(20px, 5vw, 32px); line-height: 1.7; }

          /* Trusted by */
          .trusted-section { padding: 40px 12px; }
          .trusted-box { padding: 36px 0; border-radius: 16px; }
          .trusted-header { margin-bottom: 28px; padding: 0 20px; gap: 10px; }
          .trusted-header h2 { font-size: 0.72rem; letter-spacing: 3px; }
          .marquee-outer {
            height: 70px;
            -webkit-mask-image: linear-gradient(to right, transparent 0, #000 50px, #000 calc(100% - 50px), transparent 100%);
            mask-image: linear-gradient(to right, transparent 0, #000 50px, #000 calc(100% - 50px), transparent 100%);
          }
          .marquee-strip { height: 60px; }
          .marquee-logo { height: 60px; width: 100px; padding: 6px 10px; filter: none; opacity: 0.85; }
          .marquee-logo:hover { filter: none; opacity: 1; transform: scale(1.06) translateY(-2px); }

          /* Wisdom */
          .wisdom-section { margin: 0 auto; padding: 36px 24px; border-radius: 16px; }
          .wisdom-section::before { display: none; }
          .wisdom-section p:first-child { font-size: clamp(1rem, 4vw, 1.35rem); line-height: 1.65; margin-bottom: 16px; }
          .wisdom-section p:last-child { font-size: 0.78rem; letter-spacing: 0.5px; }

          /* Footer */
          .copyright-container { padding: 32px 16px; }
          .copyright { font-size: 12px; text-align: center; line-height: 1.6; }
        }

        @media (max-width: 400px) {
          .team-mobile { gap: 10px; }
          .mobile-card-identity { padding: 12px 12px 14px; }
          .mobile-name { font-size: 12px; }
          .mobile-role { font-size: 9px; }
          .mobile-ig-btn { width: 20px; height: 20px; }
          .mobile-ig-icon { width: 10px; height: 10px; }
        }
      `}</style>

      <div style={{ position: 'relative' }}>

        {/* ═══ SKELETON ═══ */}
        <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>
          <div className="sk-inner">
            <section className="sk-hero">
              <div className="sk-hero-title l1" />
              <div className="sk-hero-title l2" />
            </section>
            <section className="sk-team">
              <div className="sk-team-grid">
                <div className="sk-team-row">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="sk-card" style={{ animationDelay: `${i * 0.07}s` }}>
                      <div className="sk-card-bottom"><div className="sk-line name" /><div className="sk-line role" /></div>
                    </div>
                  ))}
                </div>
                <div className="sk-team-row">
                  {[3, 4, 5].map(i => (
                    <div key={i} className="sk-card" style={{ animationDelay: `${i * 0.07}s` }}>
                      <div className="sk-card-bottom"><div className="sk-line name" /><div className="sk-line role" /></div>
                    </div>
                  ))}
                </div>
                <div className="sk-team-row last">
                  <div className="sk-card" style={{ animationDelay: '0.49s' }}>
                    <div className="sk-card-bottom"><div className="sk-line name" /><div className="sk-line role" /></div>
                  </div>
                </div>
              </div>
            </section>
            <section className="sk-scroll">
              <div className="sk-scroll-inner">
                <div className="sk-t-line t1" /><div className="sk-t-line t2" />
                <div className="sk-t-line t3" /><div className="sk-t-line t4" /><div className="sk-t-line t5" />
              </div>
            </section>
            <section className="sk-trusted">
              <div className="sk-trusted-head"><div className="sk-dot" /><div className="sk-trusted-label" /></div>
              <div className="sk-logo-row">
                {[...Array(8)].map((_, i) => <div key={i} className="sk-logo-item" style={{ animationDelay: `${i * 0.08}s` }} />)}
              </div>
            </section>
            <section className="sk-wisdom">
              <div className="sk-wisdom-inner">
                <div className="sk-w-line w1" /><div className="sk-w-line w2" />
                <div className="sk-w-line w3" /><div className="sk-w-line w4" />
              </div>
            </section>
            <div className="sk-footer"><div className="sk-footer-text" /></div>
          </div>
        </div>

        {/* ═══ CONTENT ═══ */}
        <div className={`content-wrapper ${isLoaded ? 'loaded' : ''}`}>

          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">About<br />Us</h1>
            </div>
          </section>

          <section id="team-section">

            {/* ── DESKTOP: 3-3-1 flex-expand rows (from file 1) ── */}
            <div className="team-wrapper">
              {desktopRows.map((row, rowIdx) => {
                const isSolo = row.length === 1
                return (
                  <div key={rowIdx} className={`team-row${isSolo ? ' solo-row' : ''}`}>
                    {row.map((member, cardIdx) => {
                      const key = `${rowIdx}-${cardIdx}`
                      const isExpanded = expandedCard === key
                      return (
                        <div
                          key={cardIdx}
                          className={`team-card-wrap${isExpanded ? ' expanded' : ''}`}
                          onClick={() => handleDesktopCardTap(rowIdx, cardIdx)}
                        >
                          <img
                            className="card-photo"
                            src={member.img}
                            alt={member.name}
                            style={{ objectPosition: member.objPos }}
                          />
                          <div className="card-gradient" />
                          <div className="card-content">
                            <div className="card-name-row">
                              <span className="card-name">{member.name}</span>
                              <a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-ig-link"
                                aria-label={`${member.name} on Instagram`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span className="card-ig-icon"><IgSvg /></span>
                              </a>
                            </div>
                            <span className="card-role">{member.role}</span>
                            <div className="card-divider" />
                            <div className="card-bio-wrap">
                              <div className="card-bio-inner">
                                <p className="card-bio">{member.desc}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            {/* ── MOBILE: single column, tap-to-expand (from file 2) ── */}
            <div className="team-mobile">
              {teamMembers.map((member, idx) => {
                const isExpanded = expandedCard === idx
                return (
                  <div
                    key={idx}
                    ref={(el) => { mobileCardRefs.current[idx] = el }}
                    data-index={idx}
                    className={`mobile-card${activeCard === idx ? ' in-view' : ''}${isExpanded ? ' expanded' : ''}`}
                    onClick={() => handleMobileCardTap(idx)}
                  >
                    {/* Photo wrapper */}
                    <div className="mobile-card-photo-wrap">
                      <img
                        className="card-photo"
                        src={member.img}
                        alt={member.name}
                        style={{ objectPosition: member.objPos }}
                      />
                      <div className="mobile-card-gradient" />
                      <div className="mobile-card-identity">
                        <div className="mobile-name-row">
                          <span className="mobile-name">{member.name}</span>
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mobile-ig-btn"
                            aria-label={`${member.name} on Instagram`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="mobile-ig-icon"><IgSvg /></span>
                          </a>
                        </div>
                        <span className="mobile-role">{member.role}</span>
                        <div className="mobile-tap-hint">
                          <span>Tap to read more</span>
                          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M2 3.5L5 6.5L8 3.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Expandable description panel */}
                    <div className="mobile-desc-panel">
                      <div className="mobile-desc-divider" />
                      <p className="mobile-desc-text">{member.desc}</p>
                      <div className="mobile-close-hint">
                        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M2 6.5L5 3.5L8 6.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Tap to close</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </section>

          <section ref={scrollSectionRef} className="scroll-text-section">
            <div className="text-container">
              <p ref={scrollTextRef} className="scroll-text">
                Specializing in creative direction and full-scale production,
                5feet4 Studio guides your brand from concept to final delivery.
                From pre-production planning to post-production polish, we lead
                the entire process ensuring impactful content that resonates
                across social media, commercials, and creative campaigns.
              </p>
            </div>
          </section>

          <section className="trusted-section">
            <div className="trusted-box">
              <div className="trusted-header">
                <div className="pulse-dot" />
                <h2>Brands we are engaging with</h2>
              </div>
              <div className="marquee-outer">
                <div className="marquee-strip" ref={stripRef}>
                  <div className="marquee-set" ref={setARef}>
                    {logoSrcs.map((src, i) => (
                      <img key={i} className="marquee-logo" src={src} alt={`Client logo ${i + 1}`} draggable={false} />
                    ))}
                  </div>
                  <div className="marquee-set" ref={setBRef} aria-hidden="true" />
                </div>
              </div>
            </div>
          </section>

          <section className="scroll-text-section">
            <div className="text-container">
              <div className="wisdom-section">
                <p>"We don't just capture moments—we create magic through our lens. Every frame tells a story, every shot brings dreams to life."</p>
                <p>— The 5feet4 Team</p>
              </div>
            </div>
          </section>

          <div className="copyright-container">
            <p className="copyright">
              © 2026{' '}
              <Link href="/" className="copyright-link">5feet4</Link>
              . All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </>
  )
}