'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  const scrollSectionRef = useRef(null)
  const scrollTextRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const teamMembers = [
    {
      img: 'https://framerusercontent.com/images/kzXamvuqsPYwBBGCcSPysFAeNg.png',
      name: 'John',
      role: 'Content Strategist',
      desc: 'Driving creative direction for high-performing social media content. Focused on crafting scroll-stopping visuals.',
    },
    {
      img: 'https://framerusercontent.com/images/nWuBJonrjn7pFV4h3SBbU7ozog.png',
      name: 'Darshan',
      role: 'Producer',
      desc: 'Overseeing seamless execution from concept to final cut. Focused on coordinating teams and resources.',
    },
    {
      img: 'https://framerusercontent.com/images/NjG12P0Ks1gMTdEsYOHezB84vtU.png',
      name: 'Roman',
      role: 'Production Lead',
      desc: 'Leading teams, elevating visual storytelling, and delivering cinematic content that drives results.',
    },
    {
      img: 'https://framerusercontent.com/images/NjG12P0Ks1gMTdEsYOHezB84vtU.png',
      name: 'Roman',
      role: 'Production Lead',
      desc: 'Leading teams, elevating visual storytelling, and delivering cinematic content that drives results.',
    },
    {
      img: 'https://framerusercontent.com/images/NjG12P0Ks1gMTdEsYOHezB84vtU.png',
      name: 'Roman',
      role: 'Production Lead',
      desc: 'Leading teams, elevating visual storytelling, and delivering cinematic content that drives results.',
    },
    {
      img: 'https://framerusercontent.com/images/kzXamvuqsPYwBBGCcSPysFAeNg.png',
      name: 'John',
      role: 'Content Strategist',
      desc: 'Driving creative direction for high-performing social media content. Focused on crafting scroll-stopping visuals.',
    },
    {
      img: 'https://framerusercontent.com/images/NjG12P0Ks1gMTdEsYOHezB84vtU.png',
      name: 'Roman',
      role: 'Production Lead',
      desc: 'Leading teams, elevating visual storytelling, and delivering cinematic content that drives results.',
    },
    {
      img: 'https://framerusercontent.com/images/nWuBJonrjn7pFV4h3SBbU7ozog.png',
      name: 'Darshan',
      role: 'Producer',
      desc: 'Overseeing seamless execution from concept to final cut. Focused on coordinating teams and resources.',
    },
  ]

  const logos = [
    'https://framerusercontent.com/images/k1pA1LiCJg6nUlCNRlaxu8SZDog.png',
    'https://brandlogos.net/wp-content/uploads/2011/06/swarovski-crystal-logo-vector.png',
    'https://framerusercontent.com/images/evN3P0cbS9xsJjpDA9L5ibL4.png',
    'https://framerusercontent.com/images/k4O62oeDUdl4WVuArbshE8e40o.png',
    'https://framerusercontent.com/images/q3wQHUngCJoGMPGvAkCaZAVtPk.png',
  ]

  // Optimized image preloading
  useEffect(() => {
    const startTime = Date.now()
    const MIN_LOADING_TIME = 2300

    // Preload unique team images
    const uniqueTeamImages = [...new Set(teamMembers.map((m) => m.img))]
    const allImageUrls = [...uniqueTeamImages, ...logos]

    const imagePromises = allImageUrls.map((src) => {
      return new Promise((resolve) => {
        const img = document.createElement('img')
        img.onload = () => resolve(true)
        img.onerror = () => resolve(true)
        img.src = src
      })
    })

    Promise.all(imagePromises).then(() => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime)
      setTimeout(() => setIsLoaded(true), remainingTime)
    })
  }, [])

  // Blur effect on scroll
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
        window.requestAnimationFrame(() => {
          updateBlur()
          ticking = false
        })
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

  // Progressive scroll text animation with optimization
  useEffect(() => {
    if (!isLoaded) return

    const scrollText = scrollTextRef.current
    const scrollSection = scrollSectionRef.current

    if (!scrollText || !scrollSection) return

    const fullText = scrollText.textContent.trim()
    const words = fullText.split(/\s+/).filter((w) => w.length > 0)

    // Create word spans
    scrollText.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(' ')
    const wordEls = scrollText.querySelectorAll('.word')

    function updateTextOnScroll() {
      const rect = scrollSection.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      const scrollStart = windowHeight * 0.75
      const scrollEnd = -sectionHeight * 0.25
      const scrollRange = scrollStart - scrollEnd
      const current = scrollStart - sectionTop

      let progress = current / scrollRange
      progress = Math.max(0, Math.min(1, progress))

      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2

      const total = wordEls.length
      const activeCount = Math.floor(eased * total)

      wordEls.forEach((el, i) => {
        el.classList.toggle('active', i < activeCount)
      })
    }

    let textTicking = false
    function onScroll() {
      if (!textTicking) {
        textTicking = true
        requestAnimationFrame(() => {
          updateTextOnScroll()
          textTicking = false
        })
      }
    }

    updateTextOnScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateTextOnScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateTextOnScroll)
    }
  }, [isLoaded])

  return (
    <>
      <style jsx suppressHydrationWarning>{`

        /* ============================================
           SHIMMER KEYFRAMES
           ============================================ */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        /* ============================================
           SKELETON WRAPPER
           ============================================ */
        .skeleton-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          transition: opacity 0.6s ease-out, visibility 0.6s;
          opacity: 1;
          visibility: visible;
        }
        .skeleton-wrapper.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .skeleton-block {
          background-color: #0f0f0f;
          position: relative;
          overflow: hidden;
        }
        .skeleton-block::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.08) 20%,
            rgba(255,255,255,0.12) 60%,
            rgba(255,255,255,0) 100%
          );
          animation: shimmer 2s infinite;
        }

        /* ============================================
           HERO SKELETON
           ============================================ */
        .sk-hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .sk-hero-title {
          height: clamp(60px, 10vw, 120px);
          border-radius: 12px;
          background: #111;
        }

        .sk-hero-title.line1 {
          width: 65%;
        }

        .sk-hero-title.line2 {
          width: 25%;
          height: clamp(50px, 8vw, 100px);
        }

        /* ============================================
           TEAM SECTION SKELETON
           ============================================ */
        .sk-team-section {
          padding: 100px 40px;
          min-height: 100vh;
          background: transparent;
        }

        .sk-team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .sk-team-card {
          aspect-ratio: 3/4;
          background: #0a0a0a;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .sk-team-card::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%);
          animation: shimmer 2.2s ease-in-out infinite;
        }

        .sk-card-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.4));
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sk-card-text {
          width: 55%;
          height: 22px;
          border-radius: 4px;
          background: rgba(255,255,255,0.08);
        }

        .sk-card-subtext {
          width: 40%;
          height: 14px;
          border-radius: 4px;
          background: rgba(255,255,255,0.06);
        }

        .sk-card-desc {
          width: 100%;
          height: 12px;
          border-radius: 3px;
          background: rgba(255,255,255,0.05);
          margin-top: 8px;
        }

        .sk-card-desc:last-of-type {
          width: 75%;
        }

        /* ============================================
           WISDOM SECTION SKELETON
           ============================================ */
        .sk-wisdom-section {
          padding: 100px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sk-wisdom-box {
          max-width: 900px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }

        .sk-wisdom-line {
          height: 28px;
          border-radius: 6px;
          background: #111;
        }

        .sk-wisdom-line.line1 { width: 95%; }
        .sk-wisdom-line.line2 { width: 88%; }
        .sk-wisdom-line.line3 { width: 92%; }
        .sk-wisdom-line.line4 { width: 50%; margin-top: 20px; }

        /* ============================================
           TRUSTED SECTION SKELETON
           ============================================ */
        .sk-trusted-section {
          padding: 100px 40px;
          text-align: center;
        }

        .sk-trusted-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 60px;
        }

        .sk-pulse-dot {
          width: 12px;
          height: 12px;
          background: #1a1a1a;
          border-radius: 50%;
        }

        .sk-trusted-title {
          width: 180px;
          height: 18px;
          border-radius: 4px;
          background: #111;
        }

        .sk-logo-track {
          display: flex;
          gap: 80px;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .sk-logo {
          width: 140px;
          height: 40px;
          background: #0d0d0d;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
        }

        .sk-logo::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0) 100%);
          animation: shimmer 2.2s ease-in-out infinite;
        }

        /* ============================================
           SCROLL TEXT SKELETON
           ============================================ */
        .sk-scroll-section {
          padding: 100px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sk-scroll-text {
          max-width: 1000px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
        }

        .sk-text-line {
          height: 26px;
          border-radius: 5px;
          background: #111;
        }

        .sk-text-line.line1 { width: 100%; }
        .sk-text-line.line2 { width: 96%; }
        .sk-text-line.line3 { width: 98%; }
        .sk-text-line.line4 { width: 94%; }
        .sk-text-line.line5 { width: 72%; }

        /* ============================================
           STATS SKELETON
           ============================================ */
        .sk-stats-section {
          padding: 100px 40px;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sk-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          max-width: 1400px;
          width: 100%;
        }

        .sk-stat-card {
          background: rgba(255,255,255,0.02);
          padding: 60px 40px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
        }

        .sk-stat-card::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0) 100%);
          animation: shimmer 2.2s ease-in-out infinite;
        }

        .sk-stat-num {
          width: 140px;
          height: 60px;
          border-radius: 8px;
          background: #1a1a1a;
          margin-bottom: 30px;
        }

        .sk-stat-text {
          width: 100%;
          height: 14px;
          border-radius: 4px;
          background: #1a1a1a;
          margin-bottom: 10px;
        }

        .sk-stat-text:last-child {
          width: 85%;
        }

        /* ============================================
           FOOTER SKELETON
           ============================================ */
        .sk-footer {
          padding: 60px 20px;
          display: flex;
          justify-content: center;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .sk-footer-text {
          width: 250px;
          height: 14px;
          border-radius: 4px;
          background: #111;
        }

        /* ============================================
           RESPONSIVE SKELETON
           ============================================ */
        @media (max-width: 1200px) {
          .sk-team-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .sk-team-section { padding: 80px 32px; }
        }

        @media (max-width: 1024px) {
          .sk-team-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .sk-team-section { padding: 80px 24px; }
          .sk-wisdom-section { padding: 80px 24px; }
          .sk-scroll-section { padding: 80px 24px; }
          .sk-stats-section { padding: 80px 24px; }
          .sk-trusted-section { padding: 80px 24px; }
        }

        @media (max-width: 768px) {
          .sk-hero-section { padding: 40px 20px; }
          .sk-hero-title.line1 { width: 85%; }
          .sk-hero-title.line2 { width: 60%; }

          .sk-team-section { padding: 60px 20px; }
          .sk-team-grid { grid-template-columns: 1fr; gap: 16px; }
          .sk-team-card { aspect-ratio: 9/12; }

          .sk-wisdom-section { padding: 60px 20px; }
          .sk-wisdom-line.line1 { width: 100%; }
          .sk-wisdom-line.line2 { width: 95%; }
          .sk-wisdom-line.line4 { width: 70%; }

          .sk-trusted-section { padding: 60px 20px; }
          .sk-logo-track { gap: 40px; }
          .sk-logo { width: 100px; height: 30px; }

          .sk-scroll-section { padding: 60px 20px; }
          .sk-text-line { height: 22px; }
          .sk-text-line.line5 { width: 85%; }

          .sk-stats-section { padding: 60px 20px; }
          .sk-stats-grid { grid-template-columns: 1fr; gap: 24px; }

          .sk-footer { padding: 40px 20px; }
        }

        @media (max-width: 480px) {
          .sk-hero-title.line1 { width: 90%; height: 70px; }
          .sk-hero-title.line2 { width: 65%; height: 55px; }

          .sk-team-section { padding: 50px 16px; }
          .sk-team-card { aspect-ratio: 9/13; }

          .sk-wisdom-section { padding: 50px 16px; }
          .sk-wisdom-box { gap: 12px; }
          .sk-wisdom-line { height: 24px; }

          .sk-trusted-section { padding: 50px 16px; }
          .sk-logo { width: 85px; height: 25px; }

          .sk-scroll-section { padding: 50px 16px; }
          .sk-text-line { height: 20px; }

          .sk-stats-section { padding: 50px 16px; }
          .sk-stat-card { padding: 40px 24px; }

          .sk-footer { padding: 30px 16px; }
        }

        /* ============================================
           CONTENT WRAPPER
           ============================================ */
        .content-wrapper {
          opacity: 0;
          transition: opacity 0.8s ease-in;
        }
        .content-wrapper.loaded {
          opacity: 1;
        }

        /* ============================================
           MAIN STYLES
           ============================================ */
        :global(body.blur-active .background-video) {
          filter: blur(12px) brightness(0.6);
          transition: filter 0.8s ease;
        }

        .hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          mix-blend-mode: difference;
        }

        .hero-title {
          font-size: clamp(60px, 10vw, 140px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -2px;
          color: #fff;
          animation: fadeInUp 1s ease-out;
        }

        /* ============================================
           TEAM SECTION
           ============================================ */
        #team-section {
          min-height: 100vh;
          padding: 100px 40px;
          position: relative;
          z-index: 1;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
        }

        .team-card {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          background: #0a0a0a;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }

        .team-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .team-card:hover img {
          transform: scale(1.08);
        }

        .team-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.4) 60%, transparent);
          padding: 30px;
          transition: all 0.3s ease;
        }

        .team-info h3 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 5px;
          color: #fff;
        }

        .team-info p {
          font-size: 14px;
          opacity: 0.7;
          margin-bottom: 15px;
          color: #fff;
        }

        .team-description {
          font-size: 13px;
          line-height: 1.6;
          opacity: 0.9;
          color: #fff;
        }

        /* ============================================
           WISDOM SECTION
           ============================================ */
        .wisdom-section {
          margin: 80px auto;
          padding: 80px 40px;
          background: rgba(0,0,0,0.4);
          border-radius: 16px;
          backdrop-filter: blur(5px);
          max-width: 1200px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .wisdom-section p:first-child {
          font-size: clamp(1.3rem, 2.5vw, 2rem);
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 24px;
          color: #fff;
        }

        .wisdom-section p:last-child {
          font-size: 0.95rem;
          opacity: 0.65;
          color: #fff;
        }

        /* ============================================
           TRUSTED SECTION
           ============================================ */
        .trusted-section {
          padding: 100px 40px;
          text-align: center;
          overflow: hidden;
        }

        .trusted-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 80px;
        }

        .pulse-dot {
          width: 12px;
          height: 12px;
          background: #ff0000;
          border-radius: 50%;
          animation: pulse-dot 2s infinite;
        }

        .trusted-header h2 {
          font-size: 1.1rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 600;
          color: #fff;
        }

        .carousel-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }

        .logo-track {
          display: flex;
          gap: 80px;
          align-items: center;
          width: fit-content;
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .logo-track img {
          height: 40px;
          opacity: 0.6;
          filter: grayscale(1) brightness(1.2);
          transition: all 0.4s ease;
          flex-shrink: 0;
        }

        .logo-track img:hover {
          opacity: 1;
          filter: grayscale(0) brightness(1);
          transform: scale(1.15);
        }

        /* ============================================
           SCROLL TEXT SECTION
           ============================================ */
        .scroll-text-section {
          padding: 100px 40px;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text-container {
          max-width: 1200px;
          width: 100%;
          text-align: center;
        }

        .scroll-text {
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.7;
          font-weight: 400;
          color: #fff;
        }

        :global(.scroll-text .word) {
          opacity: 0.2;
          transition: opacity 0.3s ease;
        }

        :global(.scroll-text .word.active) {
          opacity: 1;
        }

        /* ============================================
           STATS SECTION
           ============================================ */
        .stats-section {
          padding: 100px 40px;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          padding: 60px 40px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .stat-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-8px);
        }

        .stat-card h3 {
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 700;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #fff, #999);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-card p {
          font-size: 15px;
          line-height: 1.6;
          opacity: 0.75;
          color: #fff;
        }

        /* ============================================
           FOOTER
           ============================================ */
        .copyright-container {
          width: 100%;
          padding: 60px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 100;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .copyright {
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          font-weight: 400;
          letter-spacing: 0.5px;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .copyright-link, .copyright-link:visited, .copyright-link:active {
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
        .copyright-link:hover { opacity: 0.8; transform: translateY(-1px); }

        /* ============================================
           RESPONSIVE
           ============================================ */
        @media (max-width: 1200px) {
          .team-grid { gap: 24px; }
          #team-section { padding: 80px 32px; }
        }

        @media (max-width: 1024px) {
          .team-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          #team-section { padding: 80px 24px; }
          .wisdom-section { padding: 60px 32px; }
          .scroll-text-section { padding: 80px 24px; }
          .stats-section { padding: 80px 24px; }
          .trusted-section { padding: 80px 24px; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: clamp(50px, 12vw, 100px); }

          #team-section { padding: 60px 20px; }
          .team-grid { grid-template-columns: 1fr; gap: 16px; }
          .team-card { aspect-ratio: 9/12; }

          .wisdom-section { margin: 60px auto; padding: 60px 24px; }
          .wisdom-section p:first-child { font-size: clamp(1.1rem, 2.2vw, 1.6rem); }

          .trusted-section { padding: 60px 20px; }
          .trusted-header { margin-bottom: 50px; }
          .logo-track { gap: 50px; }
          .logo-track img { height: 30px; }

          .scroll-text-section { padding: 60px 20px; }
          .scroll-text { font-size: clamp(22px, 3.5vw, 36px); }

          .stats-section { padding: 60px 20px; }
          .stats-grid { grid-template-columns: 1fr; gap: 24px; }
          .stat-card { padding: 40px 24px; }

          .copyright-container { padding: 40px 20px; }
          .copyright { font-size: 12px; text-align: center; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: clamp(42px, 14vw, 80px); }

          #team-section { padding: 50px 16px; }
          .team-grid { gap: 12px; }

          .wisdom-section { margin: 50px 0; padding: 50px 20px; border-radius: 12px; }
          .wisdom-section p:first-child { font-size: clamp(1rem, 2vw, 1.4rem); }

          .trusted-section { padding: 50px 16px; }
          .logo-track { gap: 40px; }
          .logo-track img { height: 25px; }

          .scroll-text-section { padding: 50px 16px; }
          .scroll-text { font-size: clamp(18px, 3vw, 28px); line-height: 1.5; }

          .stats-section { padding: 50px 16px; }
          .stat-card { padding: 30px 20px; }
          .stat-card h3 { font-size: clamp(36px, 5vw, 52px); }
          .stat-card p { font-size: 13px; }

          .copyright-container { padding: 30px 16px; }
          .copyright { font-size: 11px; }
        }
      `}</style>

      {/* ════════════════════════════════════════
          SKELETON LOADER — position absolute
          Scrolls with page, fades out on load
      ════════════════════════════════════════ */}
      <div style={{ position: 'relative' }}>
        <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>

          {/* HERO SKELETON */}
          <section className="sk-hero-section">
            <div className="skeleton-block sk-hero-title line1" />
            <div className="skeleton-block sk-hero-title line2" />
          </section>

          {/* TEAM SKELETON */}
          <section className="sk-team-section">
            <div className="sk-team-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton-block sk-team-card">
                  <div className="sk-card-overlay">
                    <div className="skeleton-block sk-card-text" />
                    <div className="skeleton-block sk-card-subtext" />
                    <div className="skeleton-block sk-card-desc" />
                    <div className="skeleton-block sk-card-desc" style={{ width: '75%' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WISDOM SKELETON */}
          <section className="sk-wisdom-section">
            <div className="sk-wisdom-box">
              <div className="skeleton-block sk-wisdom-line line1" />
              <div className="skeleton-block sk-wisdom-line line2" />
              <div className="skeleton-block sk-wisdom-line line3" />
              <div className="skeleton-block sk-wisdom-line line4" />
            </div>
          </section>

          {/* TRUSTED SKELETON */}
          <section className="sk-trusted-section">
            <div className="sk-trusted-header">
              <div className="sk-pulse-dot" />
              <div className="skeleton-block sk-trusted-title" />
            </div>
            <div className="sk-logo-track">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton-block sk-logo" />
              ))}
            </div>
          </section>

          {/* SCROLL TEXT SKELETON */}
          <section className="sk-scroll-section">
            <div className="sk-scroll-text">
              <div className="skeleton-block sk-text-line line1" />
              <div className="skeleton-block sk-text-line line2" />
              <div className="skeleton-block sk-text-line line3" />
              <div className="skeleton-block sk-text-line line4" />
              <div className="skeleton-block sk-text-line line5" />
            </div>
          </section>

          {/* STATS SKELETON */}
          <section className="sk-stats-section">
            <div className="sk-stats-grid">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton-block sk-stat-card">
                  <div className="skeleton-block sk-stat-num" />
                  <div className="skeleton-block sk-stat-text" />
                  <div className="skeleton-block sk-stat-text" />
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER SKELETON */}
          <div className="sk-footer">
            <div className="skeleton-block sk-footer-text" />
          </div>

        </div>

        {/* ════════════════════════════════════════
            REAL CONTENT — fades in on load
        ════════════════════════════════════════ */}
        <div className={`content-wrapper ${isLoaded ? 'loaded' : ''}`}>

          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                About
                <br />
                Us
              </h1>
            </div>
          </section>

          <section id="team-section">
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    priority={index < 3}
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div className="team-overlay">
                    <div className="team-info">
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                    </div>
                    <p className="team-description">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="scroll-text-section">
            <div className="text-container">
              <div className="wisdom-section">
                <p>
                  "We don't just capture moments—we create magic through our lens.
                  Every frame tells a story, every shot brings dreams to life."
                </p>
                <p>— The 5feet4 Team</p>
              </div>
            </div>
          </section>

          <section className="trusted-section">
            <div className="trusted-header">
              <div className="pulse-dot"></div>
              <h2>TRUSTED BY</h2>
            </div>

            <div className="carousel-container">
              <div className="logo-track">
                {[...logos, ...logos].map((logo, i) => (
                  <Image
                    key={i}
                    src={logo}
                    alt={`Client ${(i % logos.length) + 1}`}
                    width={140}
                    height={40}
                    quality={80}
                    style={{
                      width: 'auto',
                      height: '40px',
                      objectFit: 'contain'
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          <section ref={scrollSectionRef} className="scroll-text-section">
            <div className="text-container">
              <p ref={scrollTextRef} className="scroll-text">
                Specializing in creative direction and full-scale production, 5feet4 Studio guides your brand from concept to final delivery. From
                pre-production planning to post-production polish, we lead the
                entire process ensuring impactful content that resonates across
                social media, commercials, and creative campaigns.
              </p>
            </div>
          </section>

          <section className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>10M+</h3>
                <p>
                  With over 10M+ views for our clients, we craft high-impact content
                  that captivates and drives engagement.
                </p>
              </div>

              <div className="stat-card">
                <h3>100+</h3>
                <p>
                  With over 100+ clients served, we've partnered with brands of all
                  sizes to create compelling content.
                </p>
              </div>

              <div className="stat-card">
                <h3>10+</h3>
                <p>
                  Our team of 10+ includes creative directors, editors, animators,
                  and a skilled film crew.
                </p>
              </div>
            </div>
          </section>

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
      </div>
    </>
  )
}