'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function NotFound() {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const [textVisible, setTextVisible] = useState(false)

  useEffect(() => {
    let renderer, scene, camera, clock
    let mouseX = 0, mouseY = 0
    let group404

    async function init() {
      const THREE = (await import('three')).default || await import('three')

      const canvas = canvasRef.current
      if (!canvas) return

      scene = new THREE.Scene()
      clock = new THREE.Clock()

      camera = new THREE.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.1, 200)
      camera.position.set(0, 0, 9)
      camera.lookAt(0, 0, 0)

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.5
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap

      // ── LIGHTS ──────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.6))

      const key = new THREE.DirectionalLight(0x5bc8f5, 5)
      key.position.set(5, 8, 8)
      key.castShadow = true
      scene.add(key)

      const fill = new THREE.DirectionalLight(0xf83691, 3)
      fill.position.set(-7, 2, 5)
      scene.add(fill)

      const rim = new THREE.DirectionalLight(0xffb800, 2.5)
      rim.position.set(0, -5, -6)
      scene.add(rim)

      const top = new THREE.DirectionalLight(0xffffff, 1.2)
      top.position.set(0, 10, 2)
      scene.add(top)

      // Pulsing point glow
      const glow1 = new THREE.PointLight(0x31a5d9, 4, 12)
      glow1.position.set(-2, 2, 4)
      scene.add(glow1)
      const glow2 = new THREE.PointLight(0xf83691, 3, 10)
      glow2.position.set(2, -1, 3)
      scene.add(glow2)

      // ── BUILD "404" FROM EXTRUDED SHAPES ────────────────────
      group404 = new THREE.Group()
      scene.add(group404)

      // Shared extrude settings
      const extrudeSettings = {
        depth: 0.38,
        bevelEnabled: true,
        bevelThickness: 0.06,
        bevelSize: 0.05,
        bevelSegments: 4,
      }

      // Shared material — white/silver with slight metalness, receives colored light
      const matSolid = new THREE.MeshStandardMaterial({
        color: 0xf5f5f5,
        roughness: 0.25,
        metalness: 0.3,
      })

      // ── Helper: rounded rect path ──────────────────────────
      function roundedRect(x, y, w, h, r) {
        const s = new THREE.Shape()
        s.moveTo(x + r, y)
        s.lineTo(x + w - r, y)
        s.quadraticCurveTo(x + w, y, x + w, y + r)
        s.lineTo(x + w, y + h - r)
        s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
        s.lineTo(x + r, y + h)
        s.quadraticCurveTo(x, y + h, x, y + h - r)
        s.lineTo(x, y + r)
        s.quadraticCurveTo(x, y, x + r, y)
        return s
      }

      // ── Helper: ring (donut) shape ─────────────────────────
      function ringShape(cx, cy, outerR, innerR) {
        const s = new THREE.Shape()
        // outer circle
        s.absarc(cx, cy, outerR, 0, Math.PI * 2, false)
        // hole
        const hole = new THREE.Path()
        hole.absarc(cx, cy, innerR, 0, Math.PI * 2, true)
        s.holes.push(hole)
        return s
      }

      // ── Helper: "4" shape built from rectangles ────────────
      function makeFour(offsetX) {
        const shapes = []
        const r = 0.07

        // Vertical left leg
        shapes.push(roundedRect(offsetX + 0.0, 0.0, 0.32, 1.05, r))
        // Diagonal/angled top part (approximated as a tilted rect via rotated mesh)
        // Horizontal crossbar
        shapes.push(roundedRect(offsetX + 0.0, 0.58, 1.05, 0.32, r))
        // Right vertical leg (full height)
        shapes.push(roundedRect(offsetX + 0.73, 0.0, 0.32, 1.52, r))

        return shapes
      }

      // ── Helper: "0" shape ─────────────────────────────────
      function makeZero(offsetX) {
        return [ringShape(offsetX + 0.52, 0.76, 0.56, 0.32)]
      }

      // ── Assemble digits: "4", "0", "4" ───────────────────
      // "4" at left
      const fourL = makeFour(-2.7)
      fourL.forEach(shape => {
        const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        const mesh = new THREE.Mesh(geo, matSolid)
        mesh.castShadow = true
        group404.add(mesh)
      })

      // "0" center
      const zero = makeZero(-0.52)
      zero.forEach(shape => {
        const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        const mesh = new THREE.Mesh(geo, matSolid)
        mesh.castShadow = true
        group404.add(mesh)
      })

      // "4" at right
      const fourR = makeFour(1.66)
      fourR.forEach(shape => {
        const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        const mesh = new THREE.Mesh(geo, matSolid)
        mesh.castShadow = true
        group404.add(mesh)
      })

      // Center the whole group vertically
      group404.position.set(0, -0.76, 0)
      group404.rotation.x = -0.08

      // ── GROUND SHADOW PLANE ───────────────────────────────
      const planeGeo = new THREE.PlaneGeometry(20, 10)
      const planeMat = new THREE.ShadowMaterial({ opacity: 0.18 })
      const plane = new THREE.Mesh(planeGeo, planeMat)
      plane.receiveShadow = true
      plane.rotation.x = -Math.PI / 2
      plane.position.y = -1.2
      scene.add(plane)

      // ── FLOATING PARTICLES ────────────────────────────────
      const particleCount = 80
      const positions = new Float32Array(particleCount * 3)
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 14
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2
      }
      const partGeo = new THREE.BufferGeometry()
      partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const partMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.025,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
      })
      const particles = new THREE.Points(partGeo, partMat)
      scene.add(particles)

      // ── ZZZ GEOMETRY ─────────────────────────────────────
      // Three small "Z" letter meshes floating top-right of the 0
      const zGroup = new THREE.Group()
      scene.add(zGroup)

      function makeZShape(scale, posX, posY, posZ) {
        const s = new THREE.Shape()
        // Z outline — diagonal slash shape
        s.moveTo(0, 0.5)
        s.lineTo(0.5, 0.5)
        s.lineTo(0.0, 0.0)
        s.lineTo(0.5, 0.0)
        s.lineTo(0.5, -0.06)
        s.lineTo(-0.04, -0.06)
        s.lineTo(0.46, 0.44)
        s.lineTo(-0.04, 0.44)
        s.lineTo(0, 0.5)

        const geo = new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: false })
        const mat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.4,
          metalness: 0.1,
          transparent: true,
          opacity: 0.55,
        })
        const m = new THREE.Mesh(geo, mat)
        m.scale.setScalar(scale)
        m.position.set(posX, posY, posZ)
        return m
      }

      const z1 = makeZShape(0.28, 1.2, 1.0, 0.3)
      const z2 = makeZShape(0.20, 1.52, 1.35, 0.2)
      const z3 = makeZShape(0.13, 1.78, 1.62, 0.1)
      zGroup.add(z1, z2, z3)

      // ── MOUSE ─────────────────────────────────────────────
      const onMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouseMove)

      // ── RESIZE ────────────────────────────────────────────
      const onResize = () => {
        if (!canvas) return
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(canvas.clientWidth, canvas.clientHeight)
      }
      window.addEventListener('resize', onResize)

      // ── ANIMATE ───────────────────────────────────────────
      const animate = () => {
        animFrameRef.current = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()

        // Gentle sleeping float
        group404.position.y = -0.76 + Math.sin(t * 0.65) * 0.09

        // Mouse parallax
        group404.rotation.y += (mouseX * 0.3 - group404.rotation.y) * 0.03
        group404.rotation.x += (-mouseY * 0.1 - 0.08 - group404.rotation.x) * 0.03

        // Z floats
        z1.position.y = 1.0 + Math.sin(t * 0.7 + 0.0) * 0.12
        z2.position.y = 1.35 + Math.sin(t * 0.7 + 0.5) * 0.10
        z3.position.y = 1.62 + Math.sin(t * 0.7 + 1.0) * 0.08
        z1.material.opacity = 0.35 + Math.sin(t * 1.1) * 0.2
        z2.material.opacity = 0.28 + Math.sin(t * 1.1 + 0.5) * 0.18
        z3.material.opacity = 0.20 + Math.sin(t * 1.1 + 1.0) * 0.14

        // Pulse lights
        glow1.intensity = 3.5 + Math.sin(t * 1.3) * 1.2
        glow2.intensity = 2.5 + Math.sin(t * 0.9 + 1) * 1.0

        // Drift particles
        particles.rotation.y = t * 0.015
        particles.rotation.x = t * 0.008

        renderer.render(scene, camera)
      }
      animate()

      setTimeout(() => setTextVisible(true), 600)

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
      }
    }

    const cleanupPromise = init()
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      cleanupPromise.then(fn => fn?.())
    }
  }, [])

  return (
    <>
      <style jsx>{`
        :global(*) { box-sizing: border-box; margin: 0; padding: 0; }
        :global(body) { background: #050508; overflow: hidden; }

        /* ── BG VIDEO ── */
        .bg-video {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .bg-video video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.28;
          filter: saturate(0.45) brightness(0.4);
        }
        .bg-video::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 75% 75% at 50% 50%, transparent 20%, rgba(5,5,8,0.92) 100%),
            linear-gradient(to bottom, rgba(5,5,8,0.55) 0%, transparent 20%, transparent 80%, rgba(5,5,8,0.75) 100%);
          pointer-events: none;
        }

        /* ── ORBS ── */
        .orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          filter: blur(100px);
        }
        .orb-1 {
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(49,165,217,0.11) 0%, transparent 65%);
          top: -250px; left: -250px;
          animation: od1 14s ease-in-out infinite;
        }
        .orb-2 {
          width: 650px; height: 650px;
          background: radial-gradient(circle, rgba(248,54,145,0.09) 0%, transparent 65%);
          bottom: -180px; right: -130px;
          animation: od2 17s ease-in-out infinite;
        }
        .orb-3 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,184,0,0.07) 0%, transparent 65%);
          top: 35%; right: 10%;
          animation: od3 20s ease-in-out infinite;
        }
        @keyframes od1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(50px,35px)} }
        @keyframes od2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-35px,-45px)} }
        @keyframes od3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,30px)} }

        /* ── GRID ── */
        .grid {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px);
          background-size: 68px 68px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 10%, transparent 75%);
        }

        /* ── CANVAS ── */
        .canvas-wrap {
          position: fixed;
          inset: 0;
          z-index: 2;
        }
        .canvas-wrap canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }

        /* ── CORNERS ── */
        .corner {
          position: fixed;
          width: 32px; height: 32px;
          z-index: 10;
          opacity: 0;
          transition: opacity 1s ease 0.7s;
          pointer-events: none;
        }
        .corner.show { opacity: 1; }
        .c-tl { top: 22px; left: 22px; border-top: 1px solid rgba(255,255,255,0.1); border-left: 1px solid rgba(255,255,255,0.1); }
        .c-tr { top: 22px; right: 22px; border-top: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1); }
        .c-bl { bottom: 22px; left: 22px; border-bottom: 1px solid rgba(255,255,255,0.1); border-left: 1px solid rgba(255,255,255,0.1); }
        .c-br { bottom: 22px; right: 22px; border-bottom: 1px solid rgba(255,255,255,0.1); border-right: 1px solid rgba(255,255,255,0.1); }

        /* ── PAGE OVERLAY ── */
        .page {
          position: fixed;
          inset: 0;
          z-index: 10;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          pointer-events: none;
        }

        /* content anchored to bottom */
        .content {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          white-space: nowrap;
        }

        .tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.24);
          margin-bottom: 10px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.7s ease 0s, transform 0.7s ease 0s;
        }
        .tag.show { opacity: 1; transform: translateY(0); }

        /* Gradient "404" text behind/below model for double effect */
        .headline {
          font-size: clamp(46px, 7.5vw, 88px);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 2px;
          background: linear-gradient(90deg, #31A5D9 0%, #F83691 48%, #FFB800 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.85s ease 0.15s, transform 0.85s ease 0.15s;
        }
        .headline.show { opacity: 1; transform: translateY(0); }

        .rule {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.14), transparent);
          margin: 14px auto;
          opacity: 0;
          transition: opacity 0.7s ease 0.3s;
        }
        .rule.show { opacity: 1; }

        .msg {
          font-size: clamp(10px, 1.35vw, 13px);
          font-weight: 300;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.32);
          text-align: center;
          line-height: 1.8;
          margin-bottom: 30px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.8s ease 0.42s, transform 0.8s ease 0.42s;
        }
        .msg.show { opacity: 1; transform: translateY(0); }

        .btn-wrap {
          pointer-events: auto;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.8s ease 0.57s, transform 0.8s ease 0.57s;
        }
        .btn-wrap.show { opacity: 1; transform: translateY(0); }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
        }
        .btn:hover {
          border-color: rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.07);
          transform: translateY(-2px);
        }
        .btn-text {
          background: linear-gradient(90deg, #31A5D9 0%, #F83691 40%, #FFB800 80%, #fff 80%, #fff 100%);
          background-size: 200%;
          background-position: right;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: background-position 0.3s ease;
        }
        .btn:hover .btn-text { background-position: left; }
        .btn-arrow {
          width: 12px; height: 12px;
          opacity: 0.38;
          transition: opacity 0.3s, transform 0.3s;
          flex-shrink: 0;
        }
        .btn:hover .btn-arrow { opacity: 1; transform: translateX(3px); }

        /* ── BOTTOM NAV ── */
        .nav-strip {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          pointer-events: auto;
          transition: opacity 0.8s ease 0.85s;
          white-space: nowrap;
        }
        .nav-strip.show { opacity: 1; }
        .nav-strip a {
          font-size: 9px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          text-decoration: none;
          padding: 4px 2px;
          transition: color 0.3s;
        }
        .nav-strip a:hover { color: rgba(255,255,255,0.65); }
        .ndot {
          width: 2px; height: 2px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .nav-strip { display: none; }
          .content { bottom: 8%; }
        }
        @media (max-width: 480px) {
          .content { bottom: 6%; }
        }
      `}</style>

      {/* BG VIDEO */}
      <div className="bg-video">
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/videos/background.mp4" type="video/mp4" />
          <source src="/background.mp4" type="video/mp4" />
          <source src="/video/bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Atmosphere */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid" />

      {/* Three.js canvas */}
      <div className="canvas-wrap">
        <canvas ref={canvasRef} />
      </div>

      {/* Corners */}
      <div className={`corner c-tl ${textVisible ? 'show' : ''}`} />
      <div className={`corner c-tr ${textVisible ? 'show' : ''}`} />
      <div className={`corner c-bl ${textVisible ? 'show' : ''}`} />
      <div className={`corner c-br ${textVisible ? 'show' : ''}`} />

      {/* Overlay content */}
      <div className="page">
        <div className="content">
          <p className={`tag ${textVisible ? 'show' : ''}`}>Error 404</p>
          <h1 className={`headline ${textVisible ? 'show' : ''}`}>404</h1>
          <div className={`rule ${textVisible ? 'show' : ''}`} />
          <p className={`msg ${textVisible ? 'show' : ''}`}>
            This page must be sleeping.<br />We can't find it anywhere.
          </p>
          <div className={`btn-wrap ${textVisible ? 'show' : ''}`}>
            <Link href="/" className="btn">
              <span className="btn-text">Return home</span>
              <svg className="btn-arrow" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

    </>
  )
}