'use client'

import { useEffect, useRef } from 'react'

export default function Ads() {
  const videoRefs = useRef([])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 1200,
        once: true,
        offset: 120,
        easing: 'ease-out-cubic',
      })
    }

    // --- Background Blur Logic ---
    const heroSection = document.querySelector('.hero-section')
    const updateBlur = () => {
      if (!heroSection) return
      const rect = heroSection.getBoundingClientRect()

      // Trigger blur when hero is 70% scrolled out of view
      if (rect.bottom < window.innerHeight * 0.3) {
        document.body.classList.add('blur-active')
      } else {
        document.body.classList.remove('blur-active')
      }
    }

    // --- Grid Video Observer (Play/Pause on scroll) ---
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

    // --- Scroll Listener ---
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
    updateBlur() // Run on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('blur-active')
      videoObserver.disconnect()
    }
  }, [])

  const handleSoundToggle = (e, index) => {
    e.stopPropagation()
    e.preventDefault()

    const workItem = e.currentTarget.closest('.work-item')
    const video = videoRefs.current[index]
    const isCurrentlyUnmuted = workItem.classList.contains('unmuted')

    videoRefs.current.forEach((v) => { if (v) v.muted = true })
    document.querySelectorAll('.work-item').forEach((item) => item.classList.remove('unmuted'))

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
          filter: blur(15px) brightness(0.5);
          transition: filter 0.8s ease;
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
        }

        .section-header p {
          font-size: clamp(18px, 2.2vw, 26px);
          opacity: 0.75;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.7;
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
          height: 100%;
          min-height: 500px;
        }

        .work-item.horizontal { grid-column: span 2; }
        .work-item:hover { transform: translateY(-12px); box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6); }

        .work-item video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .work-item:hover video { transform: scale(1.08); }

        .work-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
          padding: 35px 30px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease;
        }

        .work-item:hover .work-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .sound-toggle {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          backdrop-filter: blur(10px);
        }

        .icon-unmuted { display: none; }
        .work-item.unmuted .icon-muted { display: none; }
        .work-item.unmuted .icon-unmuted { display: block; }

        @media (max-width: 1200px) {
          .work-grid { grid-template-columns: repeat(2, 1fr); }
          .work-item.horizontal { grid-column: span 2; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 80px; }
          .work-grid { grid-template-columns: 1fr; }
          .work-item.horizontal, .work-item.vertical { grid-column: span 1; min-height: 50vh; }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-content" data-aos="fade-up">
          <h1 className="hero-title">Creative<br />Stories</h1>
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
                onClick={(e) => handleSoundToggle(e, index)}
              >
                <svg className="icon-muted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M11 5L6 9H2V15H6L11 19V5Z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                <svg className="icon-unmuted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M11 5L6 9H2V15H6L11 19V5Z" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
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