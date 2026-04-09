'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const images = [
  {
    src: "/1.webp",
    'x-icon': '/logo.png',
    tag: 'ON',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/28.png?updatedAt=1771934151062",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/29.png?updatedAt=1771934151067",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(6).png?updatedAt=1771934151129",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "/2.webp",
    'x-icon': '/logo.png',
    tag: 'SWAROVSKI',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/39.png?updatedAt=1771934150990",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/41.png?updatedAt=1771934151065",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/40.png?updatedAt=1771934151054",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/5'4%202026%20Lineup%20(3).png",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://cdn.worldvectorlogo.com/logos/massimo-dutti-1.svg",
    'x-icon': '/logo.png',
    tag: 'MASSIMO DUTTI',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/34.png?updatedAt=1771934151044",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/35.png?updatedAt=1771934151087",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(8).png?updatedAt=1771934151124",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "/5.webp",
    'x-icon': '/logo.png',
    tag: 'PUMA',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/31.jpg?updatedAt=1771934151003",
    type: 'horizontal',
    width: 1080,
    height: 1920,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/32.png?updatedAt=1771934151041",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(7).png?updatedAt=1771934151138",
    type: 'center',
    width: 1080,
    height: 1920,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/28.png?updatedAt=1772060168138",
    'x-icon': '/logo.png',
    tag: 'DYSON',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/11.png?updatedAt=1771934151106",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/10.png?updatedAt=1771934150980",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(1).png?updatedAt=1771934151081",
    type: 'center',
    width: 1516,
    height: 975,
  },
  {
    src: "/6.webp",
    'x-icon': '/logo.png',
    tag: 'OAKLEY | META',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: '/7.avif',
    type: 'horizontal',
    width: 1920,
    height: 1080,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/8.png?updatedAt=1771934151092",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup.png?updatedAt=1771934151049",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/35.png?updatedAt=1772060167801",
    'x-icon': '/logo.png',
    tag: 'PS5',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/23.png?updatedAt=1771934151127",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/22.jpg?updatedAt=1771934150974",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup.png",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: '/8.webp',
    'x-icon': '/logo.png',
    tag: 'APPLE',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/13.png?updatedAt=1771934151017",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/14.png?updatedAt=1771934151031",
    type: 'horizontal',
    width: 1516,
    height: 975,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(11).png?updatedAt=1771934151084",
    type: 'center',
    width: 1080,
    height: 1920,
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Swiggy_logo_%28old%29.svg/960px-Swiggy_logo_%28old%29.svg.png',
    'x-icon': '/logo.png',
    tag: 'SWIGGY',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/44.png?updatedAt=1771934151122",
    type: 'horizontal',
    width: 1920,
    height: 1080,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/43.jpg?updatedAt=1771934151023",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: '/10.webp',
    'x-icon': '/logo.png',
    tag: 'RAYMOND',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/25.jpg?updatedAt=1771934150955",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(4).png?updatedAt=1771934151051",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(1).png",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: '/11.webp',
    'x-icon': '/logo.png',
    tag: 'MAHINDRA BE6',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/18.png?updatedAt=1771934151112",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/17.png?updatedAt=1771934151007",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/19.png?updatedAt=1771934151074",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/20.png?updatedAt=1771934151037",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/16.png?updatedAt=1771934151046",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: '/12.webp',
    'x-icon': '/logo.png',
    tag: 'GULLY LABS',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Gully%20Labs%20Pitch%20.jpg?updatedAt=1772060200553",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Gully%20Labs%20Pitch%20.png?updatedAt=1772060255201",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Gully%20Labs%20Pitch%20%20(1).png?updatedAt=1772060254850",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: '/13.webp',
    'x-icon': '/logo.png',
    tag: 'MONKEY SHOULDER',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Monkey%20Shoulder%20.jpg?updatedAt=1772060205372",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Monkey%20Shoulder%20.png?updatedAt=1772060254462",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Monkey%20Shoulder%20%20(1).png?updatedAt=1772060256371",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Monkey%20Shoulder%20%20(2).png?updatedAt=1772060256175",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/41.png?updatedAt=1772060169864",
    'x-icon': '/logo.png',
    tag: 'PARAS DAIRY',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/PARAS%20DAIRY%20.jpg?updatedAt=1772060226572",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/PARAS%20DAIRY%20%20(1).png?updatedAt=1772060254591",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/PARAS%20DAIRY%20.png?updatedAt=1772060254031",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "/15.webp",
    'x-icon': '/logo.png',
    tag: 'TCS',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/TCS.jpg?updatedAt=1772060227867",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/TCS.png?updatedAt=1772060247846",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/TCS%20(1).png?updatedAt=1772060255497",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: '/16.webp',
    'x-icon': '/logo.png',
    tag: 'PHILIPS INDIA',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Philips%20India.jpg?updatedAt=1772060217807",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Philips%20India.png?updatedAt=1772060250785",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: '/17.webp',
    'x-icon': '/logo.png',
    tag: "NANDU'S",
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Nandos%20(1).png?updatedAt=1772060248851",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Nandos.png?updatedAt=1772060253570",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Nandos%20(2).png?updatedAt=1772060254715",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/12.jpg",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/13.jpg",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/14.jpg",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: '/18.webp',
    'x-icon': '/logo.png',
    tag: 'GLENMARK',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Glenmark.png?updatedAt=1772060252947",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Glenmark%20(1).png?updatedAt=1772060253248",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Glenmark%20(2).png?updatedAt=1772060253684",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/42.png?updatedAt=1772060171459",
    'x-icon': '/logo.png',
    tag: 'BAKINGO',
    type: 'center',
    width: 1440,
    height: 900,
    isLogo: true,
    logoHeight: 44,
    logoScale: 32,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Bakingo.png",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Bakingo%20(1).png",
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
]

// ─── LOGO CARD ────────────────────────────────────────────────────────────────
function LogoCard({ brandSrc, xIconSrc, tag, isMobile = false }) {
  const bLogoH = isMobile ? 42 : 72
  const ffLogoH = isMobile ? 32 : 54
  const LOGO_W = isMobile ? 120 : 200
  const GAP = isMobile ? 16 : 32
  const X_SIZE = isMobile ? '16px' : '24px'

  const logoBox = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: `${LOGO_W}px`, flexShrink: 0, overflow: 'visible',
  }
  const imgStyle = (h) => ({
    display: 'block', height: `${h}px`, width: 'auto', maxWidth: '100%',
    objectFit: 'contain', objectPosition: 'center',
    filter: 'brightness(0) invert(1)', opacity: 0.92,
  })
  const fallback = {
    fontSize: isMobile ? '9px' : '13px', fontWeight: 700,
    letterSpacing: isMobile ? '2px' : '3px', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap', textAlign: 'center',
  }
  const rule = {
    flex: '1 1 0', height: '1px', minWidth: isMobile ? '12px' : '30px',
    backgroundColor: 'rgba(255,255,255,0.28)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <div style={{ ...rule, maskImage: 'linear-gradient(to right, transparent 0%, black 60%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 60%)' }} />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: isMobile ? '0 16px' : '0 32px' }}>
        <div style={logoBox}>
          <img src={brandSrc} alt={tag} style={imgStyle(bLogoH)} onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'block' }} />
          <span style={{ display: 'none', ...fallback }}>{tag}</span>
        </div>
        <div style={{ width: `${GAP}px`, flexShrink: 0 }} />
        <span style={{ flexShrink: 0, fontSize: X_SIZE, fontWeight: 200, color: 'rgba(255,255,255,0.45)', lineHeight: 1, userSelect: 'none', display: 'block', letterSpacing: 0 }}>×</span>
        <div style={{ width: `${GAP}px`, flexShrink: 0 }} />
        <div style={logoBox}>
          <img src={xIconSrc} alt="5feet4" style={imgStyle(ffLogoH)} onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'block' }} />
          <span style={{ display: 'none', ...fallback }}>5'4</span>
        </div>
      </div>
      <div style={{ ...rule, maskImage: 'linear-gradient(to left, transparent 0%, black 60%)', WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 60%)' }} />
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Gallery() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (!isLoaded) return

    const heroSection = document.querySelector('.hero-section')
    const updateBlur = () => {
      if (!heroSection) return
      const rect = heroSection.getBoundingClientRect()
      document.body.classList.toggle('blur-active', rect.bottom < window.innerHeight * 0.3)
    }

    let centerObserver
    if (isMobile) {
      centerObserver = new IntersectionObserver(
        (entries) => entries.forEach((e) =>
          e.target.classList.toggle('in-center', e.isIntersecting && e.intersectionRatio >= 0.5)
        ),
        { threshold: [0.5], rootMargin: '-10% 0px -10% 0px' }
      )
      document.querySelectorAll('.gallery-item').forEach((el) => centerObserver.observe(el))
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
      window.removeEventListener('resize', checkMobile)
      document.body.classList.remove('blur-active')
      if (centerObserver) centerObserver.disconnect()
    }
  }, [isMobile, isLoaded])

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInUpMobile {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .page-root {
          position: relative;
          overflow-x: hidden;
        }

        .skeleton-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 50;
          transition: opacity 0.6s ease-out, visibility 0.6s;
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
        .skeleton-wrapper.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        .skeleton-scroll {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }

        .sk-block { background: #000; position: relative; overflow: hidden; }
        .sk-block::after {
          content: ''; position: absolute; inset: 0; transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 50%, transparent);
          animation: shimmer 2s infinite;
        }
        .sk-hero-section {
          height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 20px; padding: 40px;
        }
        .sk-hero-line { border-radius: 12px; background: #111; height: clamp(60px,10vw,140px); }
        .sk-hero-line.line1 { width: 37%; }
        .sk-hero-line.line2 { width: 40%; }
        .sk-gallery-section { padding: 120px 40px; }
        .sk-section-header { text-align: center; margin-bottom: 80px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .sk-heading { width: clamp(200px,25vw,350px); height: clamp(50px,7vw,90px); border-radius: 10px; background: #111; position: relative; overflow: hidden; }
        .sk-heading::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent); animation: shimmer 2.2s ease-in-out infinite; }
        .sk-subtext { width: clamp(250px,50vw,700px); height: 18px; border-radius: 6px; background: #0d0d0d; position: relative; overflow: hidden; max-width: 90vw; }
        .sk-subtext::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent); animation: shimmer 2.2s ease-in-out infinite 0.15s; }
        .sk-subtext.short { width: clamp(180px,30vw,450px); }
        .sk-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; max-width: 1400px; margin: 0 auto; }
        .sk-card { border-radius: 16px; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.05); position: relative; overflow: hidden; }
        .sk-card::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent); animation: shimmer 2.4s ease-in-out infinite; }
        .sk-card.horizontal { grid-column: span 2; aspect-ratio: 16/10; }
        .sk-card.vertical   { grid-column: span 1; aspect-ratio: 9/12; }
        .sk-center-row { grid-column: 1/-1; display: flex; justify-content: center; }
        .sk-center-card { width: 58%; aspect-ratio: 16/9; border-radius: 16px; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.05); position: relative; overflow: hidden; }
        .sk-center-card::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent); animation: shimmer 2.4s ease-in-out infinite; }
        .sk-logo-row {
          grid-column: 1/-1;
          display: flex; align-items: center;
          width: calc(100% + 64px); margin-left: -32px;
          padding: 11px 0; box-sizing: border-box; margin-top: 39px;
        }
        .sk-logo-rule {
          flex: 1 1 0; height: 1px;
          background: rgba(255,255,255,0.18);
        }
        .sk-logo-rule.left  { mask-image: linear-gradient(to right, transparent 0%, black 60%);  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 60%); }
        .sk-logo-rule.right { mask-image: linear-gradient(to left,  transparent 0%, black 60%);  -webkit-mask-image: linear-gradient(to left,  transparent 0%, black 60%); }
        .sk-logo-center {
          display: flex; align-items: center; gap: 20px;
          flex-shrink: 0; padding: 0 32px;
        }
        .sk-logo-block {
          width: 120px; height: 36px; border-radius: 6px;
          background: rgba(255,255,255,0.07);
          animation: skPulse 2s ease-in-out infinite;
        }
        .sk-logo-x {
          font-size: 22px; font-weight: 200; color: rgba(255,255,255,0.2);
          line-height: 1; user-select: none;
        }
        .sk-footer-line { width: 250px; height: 14px; border-radius: 4px; background: #111; position: relative; overflow: hidden; }
        .sk-footer-line::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent); animation: shimmer 2.2s ease-in-out infinite; }

        .content-wrapper { opacity: 0; transition: opacity 0.8s ease-in; }
        .content-wrapper.loaded { opacity: 1; }

        :global(body.blur-active .background-video)  { filter: blur(15px) brightness(0.7); }
        :global(body.blur-active .video-overlay)     { background: rgba(0,0,0,0.7); }
        .background-video { position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; transition: filter 0.5s ease; }
        .video-overlay    { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: -1; pointer-events: none; transition: background 0.5s ease; }

        .hero-section { position: relative; height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; }
        .hero-content { position: relative; z-index: 2; text-align: center; mix-blend-mode: difference; }
        .hero-title { font-size: clamp(70px,12vw,160px); font-weight: 700; line-height: 1; letter-spacing: -3px; text-transform: uppercase; color: #fff; }

        #gallery-section { min-height: 100vh; padding: 120px 32px; position: relative; z-index: 1; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-header h2 { font-size: clamp(52px,7vw,80px); font-weight: 700; margin-bottom: 25px; letter-spacing: -2px; text-transform: uppercase; color: #fff; }
        .section-header p  { font-size: clamp(18px,2.2vw,26px); opacity: 0.75; max-width: 800px; margin: 0 auto; line-height: 1.7; color: #fff; }

        .gallery-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; max-width: 1400px; margin: 0 auto; }

        .gallery-item {
          position: relative; border-radius: 16px; overflow: hidden;
          cursor: pointer; transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          background: #111; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .gallery-item.vertical   { grid-column: span 1; }
        .gallery-item.horizontal { grid-column: span 2; }
        .gallery-image-wrapper { position: relative; width: 100%; height: 100%; overflow: hidden; }

        .gallery-item:not(.center):hover { transform: translateY(-12px); box-shadow: 0 25px 50px rgba(0,0,0,0.6); }
        .gallery-item:not(.center) img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center; transform: scale(1.06); transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .gallery-item:not(.center):hover img { transform: scale(1.13); }

        .gallery-item.center {
          grid-column: 1/-1; display: flex; justify-content: center; align-items: center;
          background: transparent; box-shadow: none; border-radius: 0;
          overflow: visible; cursor: default; pointer-events: none;
        }
        .gallery-item.center:hover { transform: none; box-shadow: none; }

        .gallery-item.center .center-inner {
          position: relative; width: 58%; border-radius: 16px; overflow: hidden;
          background: #111; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          cursor: pointer; pointer-events: auto;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .gallery-item.center .center-inner:hover { transform: translateY(-12px); box-shadow: 0 25px 50px rgba(0,0,0,0.6); }
        .gallery-item.center .center-inner img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center; transform: scale(1.06); transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .gallery-item.center .center-inner:hover img { transform: scale(1.13); }

        .logo-row {
          grid-column: 1/-1; display: flex; align-items: center;
          width: calc(100% + 64px); margin-left: -32px;
          padding: 11px 0; box-sizing: border-box; margin-top: 39px;
          pointer-events: none;
        }

        @media (max-width: 1200px) {
          .gallery-grid { grid-template-columns: repeat(3,1fr); gap: 14px; }
          .gallery-item.horizontal { grid-column: span 1; }
          .gallery-item.center .center-inner { width: 60%; }
          .sk-grid { grid-template-columns: repeat(3,1fr); gap: 14px; }
          .sk-card.horizontal { grid-column: span 1; aspect-ratio: 9/10; }
          .sk-center-card { width: 60%; }
        }

        @media (max-width: 1024px) {
          #gallery-section { padding: 100px 24px; }
          .gallery-grid { grid-template-columns: repeat(2,1fr); gap: 12px; }
          .gallery-item.center .center-inner { width: 65%; }
          .logo-row { width: calc(100% + 48px); margin-left: -24px; }
          .sk-gallery-section { padding: 100px 24px; }
          .sk-grid { grid-template-columns: repeat(2,1fr); gap: 12px; }
          .sk-card.horizontal { grid-column: span 1; aspect-ratio: 1/1; }
          .sk-center-card { width: 65%; }
        }

        @media (max-width: 768px) {
          #gallery-section { padding: 80px 14px; }
          .section-header  { margin-bottom: 44px; }
          .section-header h2 { font-size: 32px; letter-spacing: -1px; margin-bottom: 12px; }
          .section-header p  { font-size: 14px; }
          .gallery-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .gallery-item.horizontal { grid-column: span 2; aspect-ratio: 4/3; border-radius: 12px; }
          .gallery-item.vertical   { grid-column: span 1; aspect-ratio: 3/4; border-radius: 12px; }
          .gallery-item .gallery-image-wrapper { height: 100%; }
          .gallery-item:not(.logo-card-item) img { object-fit: cover; object-position: center; }
          .gallery-item.center {
            grid-column: span 2; display: block; background: #111; border-radius: 12px;
            overflow: hidden; aspect-ratio: 4/3; box-shadow: 0 6px 18px rgba(0,0,0,0.4);
            cursor: default; pointer-events: auto;
          }
          .gallery-item.center:hover { transform: none; box-shadow: 0 6px 18px rgba(0,0,0,0.4); }
          .gallery-item.center .center-inner {
            position: relative !important; inset: unset !important;
            width: 100% !important; height: 100% !important;
            border-radius: 0 !important; box-shadow: none !important;
            background: transparent !important; transform: none !important;
            aspect-ratio: unset !important; overflow: hidden; cursor: default; pointer-events: auto;
          }
          .gallery-item.center:hover .center-inner { transform: none !important; box-shadow: none !important; }
          .gallery-item.center .center-inner:hover { transform: none !important; box-shadow: none !important; }
          .gallery-item.center .center-inner img { width: 100% !important; height: 100% !important; object-fit: cover !important; object-position: center !important; }
          .gallery-item.center .center-inner:hover img { transform: scale(1.06) !important; }
          .gallery-item:not(.center):hover { transform: none; box-shadow: 0 6px 18px rgba(0,0,0,0.4); }
          .logo-row { grid-column: span 2; width: calc(100% + 28px); margin-left: -14px; padding: 32px 0; pointer-events: none; }
          .hero-title { font-size: clamp(52px, 13vw, 90px); }
          .sk-gallery-section { padding: 80px 14px; }
          .sk-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .sk-card.horizontal { grid-column: span 2; aspect-ratio: 4/3; }
          .sk-card.vertical   { grid-column: span 1; aspect-ratio: 3/4; }
          .sk-center-row { grid-column: span 2; }
          .sk-center-card { width: 100%; aspect-ratio: 4/3; }
          .sk-hero-line.line1 { width: 80%; height: 72px; }
          .sk-hero-line.line2 { width: 55%; height: 54px; }
          .copyright-container { padding: 36px 14px; }
          .copyright { font-size: 11px; text-align: center; }
        }

        @media (max-width: 480px) {
          #gallery-section { padding: 60px 10px; }
          .gallery-grid { grid-template-columns: 1fr; gap: 8px; }
          .gallery-item.horizontal, .gallery-item.vertical, .gallery-item.center { grid-column: span 1; border-radius: 10px; }
          .gallery-item.vertical   { aspect-ratio: 3/4; }
          .gallery-item.horizontal { aspect-ratio: 16/9; }
          .gallery-item.center     { aspect-ratio: 16/9; }
          .logo-row { grid-column: span 1; width: calc(100% + 20px); margin-left: -10px; padding: 24px 0; pointer-events: none; }
          .sk-gallery-section { padding: 60px 10px; }
          .sk-grid { grid-template-columns: 1fr; gap: 8px; }
          .sk-card.horizontal, .sk-card.vertical { grid-column: 1; aspect-ratio: 4/3; }
          .sk-card.vertical { aspect-ratio: 3/4; }
          .sk-center-row { grid-column: 1; }
          .sk-center-card { width: 100%; aspect-ratio: 4/3; }
        }

        .copyright-container {
          width: 100%; padding: 60px 20px;
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          gap: 28px; position: relative; z-index: 100;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .copyright { font-size: 14px; color: rgba(255,255,255,0.9); font-weight: 400; letter-spacing: 0.5px; margin: 0; }
        .copyright-link, .copyright-link:visited, .copyright-link:active { color: #fff; font-weight: 700; text-decoration: none; position: relative; display: inline-block; margin: 0 4px; }
        .copyright-link::after { content: ''; position: absolute; width: 0; height: 1px; bottom: -2px; left: 0; background: #fff; transition: width 0.3s ease; }
        .copyright-link:hover::after { width: 100%; }
        .copyright-link:hover { opacity: 0.8; transform: translateY(-1px); }
      `}</style>

      <div className="page-root">

        {/* ── SKELETON ── */}
        <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>
          <div className="skeleton-scroll">
            <section className="sk-hero-section">
              <div className="sk-block sk-hero-line line1" />
              <div className="sk-block sk-hero-line line2" />
            </section>
            <div className="sk-gallery-section">
              <div className="sk-section-header">
                <div className="sk-block sk-heading" />
                <div className="sk-block sk-subtext" />
                <div className="sk-block sk-subtext short" />
              </div>
              <div className="sk-grid">
                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.12s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.06s' }} /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.12s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.18s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.24s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.12s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.12s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.12s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.12s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.12s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.12s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.00s' }} /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.12s' }} />

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.12s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.18s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.24s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.00s' }} /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.12s' }} />

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.00s' }} /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.12s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.18s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.00s' }} /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.12s' }} />

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.00s' }} /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.12s' }} />

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.00s' }} /></div>
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.06s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.12s' }} /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.18s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.24s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.30s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
                <div className="sk-center-row"><div className="sk-center-card" style={{ animationDelay: '0.12s' }} /></div>

                <div className="sk-logo-row"><div className="sk-logo-rule left" /><div className="sk-logo-center"><div className="sk-logo-block" /><span className="sk-logo-x">×</span><div className="sk-logo-block" style={{ width: 80, opacity: 0.5 }} /></div><div className="sk-logo-rule right" /></div>
                <div className="sk-card horizontal" style={{ animationDelay: '0.00s' }} />
                <div className="sk-card horizontal" style={{ animationDelay: '0.06s' }} />
              </div>
            </div>
            <div className="sk-footer"><div className="sk-block sk-footer-line" /></div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className={`content-wrapper ${isLoaded ? 'loaded' : ''}`}>

          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Prints &amp;<br />banners</h1>
            </div>
          </section>

          <section id="gallery-section">
            <div className="section-header">
              <h2>Our Work</h2>
              <p>Crafting visual stories that captivate, engage, and inspire audiences worldwide</p>
            </div>

            <div className="gallery-grid">
              {images.map((image, index) => {

                if (image.isLogo) {
                  return (
                    <div key={index} className="logo-row">
                      <LogoCard brandSrc={image.src} xIconSrc={image['x-icon']} tag={image.tag} isMobile={isMobile} />
                    </div>
                  )
                }

                if (image.type === 'center') {
                  return (
                    <div key={index} className="gallery-item center">
                      <div className="center-inner">
                        <Image src={image.src} alt="" width={image.width} height={image.height} priority quality={100} unoptimized style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                    </div>
                  )
                }

                return (
                  <div key={index} className={`gallery-item ${image.type}`}>
                    <div className="gallery-image-wrapper">
                      <Image src={image.src} alt="" width={image.width} height={image.height} priority quality={100} unoptimized style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  </div>
                )
              })}
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