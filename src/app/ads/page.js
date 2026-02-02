'use client'

import { useEffect, useRef, useState } from 'react'

export default function Ads() {
  const videoRefs = useRef([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Initialize AOS if available
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 1200,
        once: true,
        offset: 120,
        easing: 'ease-out-cubic',
      })
    }

    // Background Blur Logic
    const heroSection = document.querySelector('.hero-section')
    const updateBlur = () => {
      if (!heroSection) return
      const rect = heroSection.getBoundingClientRect()
      if (rect.bottom < window.innerHeight * 0.3) {
        document.body.classList.add('blur-active')
      } else {
        document.body.classList.remove('blur-active')
      }
    }

    // Grid Video Observer (Play/Pause on scroll)
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (entry.isIntersecting) {
            video.play().catch(() => { })
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    videoRefs.current.forEach((video) => {
      if (video) videoObserver.observe(video)
    })

    // Mobile center detection for overlays
    let centerObserver
    if (isMobile) {
      centerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              entry.target.classList.add('in-center')
            } else {
              entry.target.classList.remove('in-center')
            }
          })
        },
        {
          threshold: [0.5],
          rootMargin: '-10% 0px -10% 0px',
        }
      )

      document.querySelectorAll('.work-item').forEach((item) => {
        centerObserver.observe(item)
      })
    }

    // Scroll Listener
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
      window.removeEventListener('resize', checkMobile)
      document.body.classList.remove('blur-active')
      videoObserver.disconnect()
      if (centerObserver) centerObserver.disconnect()
    }
  }, [isMobile])

  const handleSoundToggle = (e, index) => {
    e.stopPropagation()
    e.preventDefault()

    const workItem = e.currentTarget.closest('.work-item')
    const video = videoRefs.current[index]
    const isCurrentlyUnmuted = workItem.classList.contains('unmuted')

    // Mute all videos
    videoRefs.current.forEach((v) => {
      if (v) v.muted = true
    })
    document.querySelectorAll('.work-item').forEach((item) => item.classList.remove('unmuted'))

    // Unmute clicked video if it wasn't already unmuted
    if (!isCurrentlyUnmuted) {
      video.muted = false
      video.volume = 1
      workItem.classList.add('unmuted')
      video.play().catch(() => { })
    }
  }

  const videos = [
    { src: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/11.mp4', title: 'Brand Campaign', desc: 'Creative storytelling meets brand vision', type: 'vertical' },
    { src: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/12.mp4', title: 'Social Media Content', desc: 'Viral-ready content that drives engagement', type: 'vertical' },
    { src: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/13.mp4', title: 'Commercial Production', desc: 'High-impact commercials that convert', type: 'vertical' },
    { src: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/14.mp4', title: 'Cinematic Feature', desc: 'Full-scale production excellence with stunning visuals', type: 'horizontal' },
    { src: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/15.mp4', title: 'Music Video', desc: 'Rhythm and visuals in perfect harmony', type: 'vertical' },
    { src: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/11.mp4', title: 'Documentary Style', desc: 'Authentic stories, beautifully told', type: 'vertical' },
    { src: 'https://ik.imagekit.io/pqkj4p4ii/5feet4/12.mp4', title: 'Fashion Film', desc: 'Elegance captured frame by frame', type: 'vertical' },
  ]

  return (
    <>
      <style jsx>{`
        /* Global Blur Transition */
        :global(body.blur-active .background-video) {
          filter: blur(15px) brightness(0.7);
        }

        :global(body.blur-active .video-overlay) {
          background: rgba(0, 0, 0, 0.7);
        }

        .background-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
          transition: filter 0.5s ease;
        }

        .video-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: -1;
          pointer-events: none;
          transition: background 0.5s ease;
        }

        .hero-section {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          mix-blend-mode: difference;
        }

        .hero-title {
          font-size: clamp(70px, 12vw, 160px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -3px;
          animation: fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          text-transform: uppercase;
          color: #fff;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        #work-section {
          min-height: 100vh;
          padding: 120px 40px;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-header h2 {
          font-size: clamp(52px, 7vw, 80px);
          font-weight: 700;
          margin-bottom: 25px;
          letter-spacing: -2px;
          text-transform: uppercase;
          color: #fff;
        }

        .section-header p {
          font-size: clamp(18px, 2.2vw, 26px);
          opacity: 0.75;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 400;
          color: #fff;
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          max-width: 1600px;
          margin: 0 auto;
        }

        .work-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          background: #111;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          height: 100%;
          min-height: 500px;
        }

        .work-item.vertical {
          grid-column: span 1;
        }

        .work-item.horizontal {
          grid-column: span 2;
        }

        .work-item:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
        }

        .work-item video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .work-item:hover video {
          transform: scale(1.08);
        }

        .work-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.95),
            rgba(0, 0, 0, 0.3) 70%,
            transparent
          );
          padding: 35px 30px;
          opacity: 0;
          transform: translateY(25px);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (min-width: 769px) {
          .work-item:hover .work-overlay {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .work-overlay h3 {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
          color: #fff;
        }

        .work-overlay p {
          font-size: 15px;
          opacity: 0.85;
          line-height: 1.6;
          font-weight: 400;
          color: #fff;
        }

        .sound-toggle {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          backdrop-filter: blur(10px);
        }

        .sound-toggle:hover {
          background: rgba(0, 0, 0, 0.9);
          transform: scale(1.15);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .sound-toggle svg {
          width: 22px;
          height: 22px;
          stroke: #fff;
          pointer-events: none;
        }

        .icon-muted {
          display: block;
        }

        .icon-unmuted {
          display: none;
        }

        :global(.work-item.unmuted) .icon-muted {
          display: none;
        }

        :global(.work-item.unmuted) .icon-unmuted {
          display: block;
        }

        /* TABLET BREAKPOINT */
        @media (max-width: 1200px) {
          .work-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .work-item.horizontal {
            grid-column: span 2;
          }

          .work-item.vertical {
            grid-column: span 1;
          }
        }

        /* MOBILE BREAKPOINT - CRITICAL STYLES */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 110px;
          }

          #work-section {
            padding: 100px 20px;
          }

          .work-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .work-item.horizontal,
          .work-item.vertical {
            grid-column: span 1;
          }

          /* Mobile-specific video heights */
          .work-item.vertical {
            min-height: 65vh;
            max-height: 65vh;
          }

          .work-item.horizontal {
            min-height: 40vh;
            max-height: 40vh;
          }

          /* Mobile overlay animation */
          .work-overlay {
            opacity: 0;
            transform: translateY(25px);
            transition: none;
            animation: none;
          }

          :global(.work-item.in-center) .work-overlay {
            animation: fadeInUpBottom 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          @keyframes fadeInUpBottom {
            from {
              opacity: 0;
              transform: translateY(25px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }

        /* SMALL MOBILE */
        @media (max-width: 480px) {
          .hero-title {
            font-size: 68px;
          }

          .section-header h2 {
            font-size: 42px;
          }

          .work-overlay {
            padding: 25px 20px;
          }

          .work-overlay h3 {
            font-size: 22px;
          }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-content" data-aos="fade-up">
          <h1 className="hero-title">
            Creative
            <br />
            Stories
          </h1>
        </div>
      </section>

      <section id="work-section">
        <div className="section-header" data-aos="fade-up">
          <h2>Our Work</h2>
          <p>Crafting visual stories that captivate, engage, and inspire audiences worldwide</p>
        </div>

        <div className="work-grid">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`work-item ${video.type}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src={video.src} type="video/mp4" />
              </video>

              <button
                className="sound-toggle"
                aria-label="Toggle sound"
                onClick={(e) => handleSoundToggle(e, index)}
              >
                <svg className="icon-muted" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11 5L6 9H2V15H6L11 19V5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="icon-unmuted" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11 5L6 9H2V15H6L11 19V5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.364 5.63599C19.9926 7.26465 20.9087 9.49077 20.9087 11.8095C20.9087 14.1282 19.9926 16.3543 18.364 17.983"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="work-overlay">
                <h3>{video.title}</h3>
                <p>{video.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}