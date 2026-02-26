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
    title: 'ON',
    desc: 'Where every stride meets Swiss precision engineering.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/29.png?updatedAt=1771934151067",
    title: 'ON',
    desc: 'Lightweight design built for runners who demand more.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(6).png?updatedAt=1771934151129",
    title: 'ON',
    desc: 'CloudTec cushioning — feel nothing, perform everything.',
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
    title: 'SWAROVSKI',
    desc: 'Where heritage meets modern glamour, beautifully.',
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/41.png?updatedAt=1771934151065",
    title: 'SWAROVSKI',
    desc: 'Every facet tells a story of light and luxury.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/40.png?updatedAt=1771934151054",
    title: 'SWAROVSKI',
    desc: 'Crystal-cut brilliance crafted for the extraordinary.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(10).png?updatedAt=1771934151145",
    title: 'SWAROVSKI',
    desc: 'Timeless tailoring reimagined for the modern gentleman.',
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/Logo's%20/23.png?updatedAt=1772060171482",
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
    title: 'MASSIMO DUTTI',
    desc: 'Sartorial excellence for the discerning modern wardrobe.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/35.png?updatedAt=1771934151087",
    title: 'MASSIMO DUTTI',
    desc: 'Clean lines and premium fabrics — sophistication redefined.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(8).png?updatedAt=1771934151124",
    title: 'MASSIMO DUTTI',
    desc: 'Effortless style rooted in timeless Mediterranean craftsmanship.',
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
    title: 'PUMA',
    desc: 'Fuelling athletes with raw speed and bold identity.',
    type: 'horizontal',
    width: 1080,
    height: 1920,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/32.png?updatedAt=1771934151041",
    title: 'PUMA',
    desc: 'Street-ready silhouettes engineered for relentless movement.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(7).png?updatedAt=1771934151138",
    title: 'PUMA',
    desc: 'Culture-driven performance that lives beyond the field.',
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
    title: 'DYSON',
    desc: 'Reinventing the everyday with intelligent airflow science.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/10.png?updatedAt=1771934150980",
    title: 'DYSON',
    desc: 'Precision-engineered machines that set the gold standard.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(1).png?updatedAt=1771934151081",
    title: 'DYSON',
    desc: 'Form meets function — where design is the innovation.',
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
    title: 'OAKLEY | META',
    desc: 'Smart glasses built for athletes who live at the edge.',
    type: 'horizontal',
    width: 1920,
    height: 1080,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/8.png?updatedAt=1771934151092",
    title: 'OAKLEY | META',
    desc: 'Blending augmented reality with world-class optics.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup.png?updatedAt=1771934151049",
    title: 'OAKLEY | META',
    desc: 'See the world differently — connected, clear, and bold.',
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
    title: 'PS5',
    desc: 'The future of play, rendered in breathtaking detail.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/22.jpg?updatedAt=1771934150974",
    title: 'PS5',
    desc: 'Lightning-fast loading — zero waiting, pure immersion.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup.png",
    title: 'PS5',
    desc: 'Feel every moment. Next-gen haptics, limitless worlds.',
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
    title: 'APPLE',
    desc: 'Thoughtfully designed accessories for a seamless ecosystem.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/14.png?updatedAt=1771934151031",
    title: 'APPLE',
    desc: 'Silicon power that redefines what a chip can do.',
    type: 'horizontal',
    width: 1516,
    height: 975,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(11).png?updatedAt=1771934151084",
    title: 'APPLE',
    desc: 'Beautiful hardware, unmatched software — perfectly united.',
    type: 'center',
    width: 1080,
    height: 1920,
  },
  {
    src: '/logos/swiggy-logo.png',
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
    title: 'SWIGGY',
    desc: 'Your favourite restaurant, delivered to your door fast.',
    type: 'horizontal',
    width: 1920,
    height: 1080,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/43.jpg?updatedAt=1771934151023",
    title: 'SWIGGY',
    desc: 'Fresh, hot, and on time — every single order, every time.',
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
    title: 'RAYMOND',
    desc: 'Suits that speak confidence before you say a word.',
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(4).png?updatedAt=1771934151051",
    title: 'RAYMOND',
    desc: 'A legacy of fine fabrics woven into every stitch.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Vertical%20images%20/5'4%202026%20Lineup%20(1).png",
    title: 'RAYMOND',
    desc: 'Crafted for the man who commands every room he walks into.',
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
    title: 'MAHINDRA BE6',
    desc: 'An electric SUV engineered to dominate every terrain.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/17.png?updatedAt=1771934151007",
    title: 'MAHINDRA BE6',
    desc: 'Zero emissions, maximum presence — the future is bold.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/19.png?updatedAt=1771934151074",
    title: 'MAHINDRA BE6',
    desc: 'Cutting-edge EV tech wrapped in a fearless design language.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/20.png?updatedAt=1771934151037",
    title: 'MAHINDRA BE6',
    desc: 'Intelligent performance, redefining the Indian electric road.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/16.png?updatedAt=1771934151046",
    title: 'MAHINDRA BE6',
    desc: 'Power, range, and style — the complete electric package.',
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
    title: 'GULLY LABS',
    desc: 'Where street culture collides with startup innovation.',
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Gully%20Labs%20Pitch%20.png?updatedAt=1772060255201",
    title: 'GULLY LABS',
    desc: 'Homegrown ideas built to disrupt and inspire.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Gully%20Labs%20Pitch%20%20(1).png?updatedAt=1772060254850",
    title: 'GULLY LABS',
    desc: 'Hustlers, dreamers, creators — building from the ground up.',
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
    title: 'MONKEY SHOULDER',
    desc: 'Triple malt magic — smooth, rich, and unapologetically bold.',
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Monkey%20Shoulder%20.png?updatedAt=1772060254462",
    title: 'MONKEY SHOULDER',
    desc: 'Blended Scotch crafted for the adventurous palate.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Monkey%20Shoulder%20%20(1).png?updatedAt=1772060256371",
    title: 'MONKEY SHOULDER',
    desc: 'Handcrafted in Speyside, savoured everywhere worth being.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Monkey%20Shoulder%20%20(2).png?updatedAt=1772060256175",
    title: 'MONKEY SHOULDER',
    desc: 'Three malts, one spirit — endlessly smooth, endlessly drinkable.',
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
    title: 'PARAS DAIRY',
    desc: 'Farm-fresh goodness delivered straight to your table.',
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/PARAS%20DAIRY%20%20(1).png?updatedAt=1772060254591",
    title: 'PARAS DAIRY',
    desc: 'Nourishing India with pure, trusted dairy since decades.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/PARAS%20DAIRY%20.png?updatedAt=1772060254031",
    title: 'PARAS DAIRY',
    desc: 'Quality you can taste — wholesome, natural, and real.',
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
    title: 'TCS',
    desc: "Building tomorrow's technology with the world's best minds.",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/TCS.png?updatedAt=1772060247846",
    title: 'TCS',
    desc: 'Transforming industries through intelligent digital solutions.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/TCS%20(1).png?updatedAt=1772060255497",
    title: 'TCS',
    desc: 'Innovation at scale — powering progress for a billion futures.',
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
    title: 'PHILIPS INDIA',
    desc: 'Lighting up lives with meaningful health and home innovations.',
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Philips%20India.png?updatedAt=1772060250785",
    title: 'PHILIPS INDIA',
    desc: 'Trusted technology that brings comfort to every corner of home.',
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
    title: "NANDU'S",
    desc: 'PERi-PERi perfection — bold flavours that ignite the senses.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Nandos.png?updatedAt=1772060253570",
    title: "NANDU'S",
    desc: 'Flame-grilled chicken with a fiery soul and a global heart.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Nandos%20(2).png?updatedAt=1772060254715",
    title: "NANDU'S",
    desc: "Heat levels you choose — a dining experience that's always personal.",
    type: 'center',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/13.jpg?updatedAt=1772060221358",
    title: 'Flame Infused Paneer',
    desc: 'A bold fusion of fire, spice, and cinematic motion — crafted to ignite appetite instantly.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/14.jpg?updatedAt=1772060221738",
    title: 'Smoked Perfection',
    desc: 'Char-grilled layers bursting with flavor, captured in a high-impact visual explosion of taste.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/12.jpg?updatedAt=1772060224404",
    title: 'Sizzle in Motion',
    desc: 'Dynamic food storytelling that blends heat, texture, and movement into a mouthwatering masterpiece.',
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
    title: 'GLENMARK',
    desc: 'Science-backed healthcare making life better, one patient at a time.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Glenmark%20(1).png?updatedAt=1772060253248",
    title: 'GLENMARK',
    desc: 'Pioneering specialty pharma solutions across global markets.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Glenmark%20(2).png?updatedAt=1772060253684",
    title: 'GLENMARK',
    desc: 'Committed to research that transforms patient lives worldwide.',
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
    title: 'BAKINGO',
    desc: 'Celebration cakes crafted with love, delivered with joy.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },
  {
    src: "https://ik.imagekit.io/5feet4imgassests/5'4%202026%20Digital%20Assets%20/Images/Bakingo%20(1).png",
    title: 'BAKINGO',
    desc: 'Every bite a memory — baked fresh, delivered straight to you.',
    type: 'horizontal',
    width: 1440,
    height: 1800,
  },

]

// ─── LOGO CARD ────────────────────────────────────────────────────────────────
// KEY FIX: Both logo boxes are EQUAL WIDTH so the × is the mathematical center.
// Layout: [rule] [brand-box] [gap] [×] [gap] [5feet4-box] [rule]
// BRAND_W === FF_W → × sits exactly at the midpoint of the whole cluster.
function LogoCard({ brandSrc, xIconSrc, tag, isMobile = false }) {

  // ── Sizes ──────────────────────────────────────────────────────────────────
  // Desktop: logos are large and comfortable
  // Mobile : scaled to ~60% so they look great on narrow screens
  const bLogoH = isMobile ? 42 : 72   // brand logo height px
  const ffLogoH = isMobile ? 32 : 54   // 5feet4 logo height px

  // CRITICAL: Both boxes must be the same width for × to be centered
  const LOGO_W = isMobile ? 120 : 200  // equal width for both logo boxes

  // Gap between each logo box and the × glyph (symmetric)
  const GAP = isMobile ? 16 : 32

  // × glyph size
  const X_SIZE = isMobile ? '16px' : '24px'

  // ── Style helpers ──────────────────────────────────────────────────────────
  const logoBox = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${LOGO_W}px`,
    flexShrink: 0,
    overflow: 'visible',
  }

  const imgStyle = (h) => ({
    display: 'block',
    height: `${h}px`,
    width: 'auto',
    maxWidth: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    filter: 'brightness(0) invert(1)',
    opacity: 0.92,
  })

  const fallback = {
    fontSize: isMobile ? '9px' : '13px',
    fontWeight: 700,
    letterSpacing: isMobile ? '2px' : '3px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.85)',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  }

  const rule = {
    flex: '1 1 0',
    height: '1px',
    minWidth: isMobile ? '12px' : '30px',
    backgroundColor: 'rgba(255,255,255,0.28)',
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    }}>

      {/* Left rule — fades in from screen edge */}
      <div style={{
        ...rule,
        maskImage: 'linear-gradient(to right, transparent 0%, black 60%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 60%)',
      }} />

      {/* ── Centre cluster ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: isMobile ? '0 16px' : '0 32px',
      }}>

        {/* Brand logo — left box */}
        <div style={logoBox}>
          <img
            src={brandSrc}
            alt={tag}
            style={imgStyle(bLogoH)}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              if (e.currentTarget.nextElementSibling)
                e.currentTarget.nextElementSibling.style.display = 'block'
            }}
          />
          <span style={{ display: 'none', ...fallback }}>{tag}</span>
        </div>

        {/* Spacer — left of × */}
        <div style={{ width: `${GAP}px`, flexShrink: 0 }} />

        {/* × — true visual center because both sides are equal */}
        <span style={{
          flexShrink: 0,
          fontSize: X_SIZE,
          fontWeight: 200,
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1,
          userSelect: 'none',
          display: 'block',
          letterSpacing: 0,
        }}>×</span>

        {/* Spacer — right of × */}
        <div style={{ width: `${GAP}px`, flexShrink: 0 }} />

        {/* 5feet4 logo — right box, SAME width as brand box */}
        <div style={logoBox}>
          <img
            src={xIconSrc}
            alt="5feet4"
            style={imgStyle(ffLogoH)}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              if (e.currentTarget.nextElementSibling)
                e.currentTarget.nextElementSibling.style.display = 'block'
            }}
          />
          <span style={{ display: 'none', ...fallback }}>5'4</span>
        </div>
      </div>

      {/* Right rule — fades in from screen edge */}
      <div style={{
        ...rule,
        maskImage: 'linear-gradient(to left, transparent 0%, black 60%)',
        WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 60%)',
      }} />

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
        (entries) =>
          entries.forEach((e) =>
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
        /* ── KEYFRAMES ── */
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInUpMobile {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── PAGE ── */
        .page-root { position: relative; overflow-x: hidden; }

        /* ── SKELETON ── */
        .skeleton-wrapper {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          overflow-y: auto; z-index: 9999; background: #000;
          transition: opacity 0.6s ease-out, visibility 0.6s;
          opacity: 1; visibility: visible; pointer-events: auto;
        }
        .skeleton-wrapper.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
        .sk-block { background: #0f0f0f; position: relative; overflow: hidden; }
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
        .sk-footer { padding: 60px 20px; display: flex; justify-content: center; border-top: 1px solid rgba(255,255,255,0.05); }
        .sk-footer-line { width: 250px; height: 14px; border-radius: 4px; background: #111; position: relative; overflow: hidden; }
        .sk-footer-line::after { content: ''; position: absolute; inset: 0; transform: translateX(-100%); background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent); animation: shimmer 2.2s ease-in-out infinite; }

        /* ── CONTENT REVEAL ── */
        .content-wrapper { opacity: 0; transition: opacity 0.8s ease-in; }
        .content-wrapper.loaded { opacity: 1; }

        /* ── BACKGROUND ── */
        :global(body.blur-active .background-video)  { filter: blur(15px) brightness(0.7); }
        :global(body.blur-active .video-overlay)     { background: rgba(0,0,0,0.7); }
        .background-video { position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; transition: filter 0.5s ease; }
        .video-overlay    { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: -1; pointer-events: none; transition: background 0.5s ease; }

        /* ── HERO ── */
        .hero-section { position: relative; height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; }
        .hero-content { position: relative; z-index: 2; text-align: center; mix-blend-mode: difference; }
        .hero-title   { font-size: clamp(70px,12vw,160px); font-weight: 700; line-height: 1; letter-spacing: -3px; text-transform: uppercase; color: #fff; }

        /* ── GALLERY SECTION ── */
        /* ZOOMED: reduced padding sides + max-width tightened from 1600→1400 */
        #gallery-section { min-height: 100vh; padding: 120px 32px; position: relative; z-index: 1; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-header h2 { font-size: clamp(52px,7vw,80px); font-weight: 700; margin-bottom: 25px; letter-spacing: -2px; text-transform: uppercase; color: #fff; }
        .section-header p  { font-size: clamp(18px,2.2vw,26px); opacity: 0.75; max-width: 800px; margin: 0 auto; line-height: 1.7; color: #fff; }

        /* ── GALLERY GRID ── */
        /* ZOOMED: max-width 1400px (was 1600px), gap 14px (was 20px) → cards appear larger */
        .gallery-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; max-width: 1400px; margin: 0 auto; }

        /* ── GALLERY ITEM ── */
        .gallery-item {
          position: relative; border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          background: #111; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .gallery-item.vertical   { grid-column: span 1; }
        .gallery-item.horizontal { grid-column: span 2; }
        .gallery-image-wrapper { position: relative; width: 100%; height: 100%; overflow: hidden; }

        .gallery-item:hover { transform: translateY(-12px); box-shadow: 0 25px 50px rgba(0,0,0,0.6); }

        .gallery-item:not(.logo-card-item) img,
        .gallery-item.center:not(.logo-card-item) .center-inner img {
          width: 100%; height: 100%; display: block;
          object-fit: cover; object-position: center;
          transform: scale(1.06);
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .gallery-item:not(.logo-card-item):hover img,
        .gallery-item.center:not(.logo-card-item):hover .center-inner img {
          transform: scale(1.13);
        }

        /* ── OVERLAY ── */
        .gallery-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.18) 70%, transparent);
          padding: 35px 30px; opacity: 0; transform: translateY(25px);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .gallery-overlay h3 { font-size: 26px; font-weight: 700; margin-bottom: 10px; letter-spacing: -0.5px; color: #fff; }
        .gallery-overlay p  { font-size: 15px; opacity: 0.85; line-height: 1.6; color: #fff; }

        /* ── CENTER CARD ── */
        .gallery-item.center {
          grid-column: 1/-1;
          display: flex; justify-content: center; align-items: center;
          background: transparent; box-shadow: none; border-radius: 0; overflow: visible;
        }
        /* ZOOMED: center inner width 58% (was 50%) → larger center cards */
        .gallery-item.center .center-inner {
          position: relative; width: 58%; border-radius: 16px;
          overflow: hidden;
          background: #111; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .gallery-item.center:hover .center-inner { transform: translateY(-12px); box-shadow: 0 25px 50px rgba(0,0,0,0.6); }
        .gallery-item.center:hover { transform: none; box-shadow: none; }

        @media (min-width: 769px) {
          .gallery-item:hover .gallery-overlay { opacity: 1; transform: translateY(0); }
          .gallery-item.center:hover .center-inner .gallery-overlay { opacity: 1; transform: translateY(0); }
        }

        /* ── LOGO ROW WRAPPER ── */
        .logo-row {
          grid-column: 1/-1;
          display: flex; align-items: center;
          width: calc(100% + 64px);
          margin-left: -32px;
          padding: 11px 0;
          box-sizing: border-box;
          margin-top:39px;
        }

        @media (max-width: 1200px) {
          .gallery-grid { grid-template-columns: repeat(3,1fr); gap: 14px; }
          .gallery-item.horizontal { grid-column: span 1; }
          .gallery-item.center .center-inner { width: 60%; }
          .sk-grid { grid-template-columns: repeat(3,1fr); gap: 14px; }
          .sk-card.horizontal { grid-column: span 1; aspect-ratio: 9/10; }
          .sk-center-card { width: 60%; }
        }

        /* 1024px */
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

        /* ────────────────────────────────────────────────
           768px  MOBILE
        ──────────────────────────────────────────────── */
        @media (max-width: 768px) {
          #gallery-section { padding: 80px 14px; }
          .section-header  { margin-bottom: 44px; }
          .section-header h2 { font-size: 32px; letter-spacing: -1px; margin-bottom: 12px; }
          .section-header p  { font-size: 14px; }

          /* 2-column base grid */
          .gallery-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          /* ── HORIZONTAL: 2 cols wide ── */
          .gallery-item.horizontal {
            grid-column: span 2;
            aspect-ratio: 4 / 3;
            border-radius: 12px;
          }

          /* ── VERTICAL: 1 col ── */
          .gallery-item.vertical {
            grid-column: span 1;
            aspect-ratio: 3 / 4;
            border-radius: 12px;
          }

          /* Force images to fill every card */
          .gallery-item .gallery-image-wrapper { height: 100%; }
          .gallery-item:not(.logo-card-item) img { object-fit: cover; object-position: center; }

          /* ── CENTER: full width on mobile ── */
          .gallery-item.center {
            grid-column: span 2;
            display: block;
            background: #111;
            border-radius: 12px;
            overflow: hidden;
            aspect-ratio: 4 / 3;
            box-shadow: 0 6px 18px rgba(0,0,0,0.4);
          }
          .gallery-item.center:hover { transform: none; box-shadow: 0 6px 18px rgba(0,0,0,0.4); }
          .gallery-item.center .center-inner {
            position: relative !important;
            inset: unset !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: transparent !important;
            transform: none !important;
            aspect-ratio: unset !important;
            overflow: hidden;
          }
          .gallery-item.center:hover .center-inner {
            transform: none !important;
            box-shadow: none !important;
          }
          .gallery-item.center .center-inner img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
          }

          /* no lift on tap */
          .gallery-item:hover { transform: none; box-shadow: 0 6px 18px rgba(0,0,0,0.4); }

          /* ── LOGO ROW on mobile ── */
          .logo-row {
            grid-column: span 2;
            width: calc(100% + 28px);
            margin-left: -14px;
            padding: 32px 0;
          }

          /* ── Overlay: IntersectionObserver-driven ── */
          .gallery-overlay {
            opacity: 0;
            transform: translateY(20px);
            transition: none;
            padding: 16px 14px;
          }
          :global(.gallery-item.in-center) .gallery-overlay {
            animation: fadeInUpMobile 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
          }
          :global(.gallery-item.center.in-center) .gallery-overlay {
            animation: fadeInUpMobile 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
          }

          .gallery-overlay h3 { font-size: 14px; font-weight: 700; margin-bottom: 4px; letter-spacing: 0; }
          .gallery-overlay p  { font-size: 11px; opacity: 0.82; line-height: 1.5; }

          .hero-title { font-size: clamp(52px, 13vw, 90px); }

          /* skeleton mobile */
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

        /* ── 480px — single column ── */
        @media (max-width: 480px) {
          #gallery-section { padding: 60px 10px; }

          .gallery-grid { grid-template-columns: 1fr; gap: 8px; }
          .gallery-item.horizontal,
          .gallery-item.vertical,
          .gallery-item.center { grid-column: span 1; border-radius: 10px; }
          .gallery-item.vertical   { aspect-ratio: 3/4; }
          .gallery-item.horizontal { aspect-ratio: 16/9; }
          .gallery-item.center     { aspect-ratio: 16/9; }

          .logo-row {
            grid-column: span 1;
            width: calc(100% + 20px);
            margin-left: -10px;
            padding: 24px 0;
          }

          .gallery-overlay h3 { font-size: 12px; }
          .gallery-overlay p  { font-size: 10px; }

          /* skeleton 480 */
          .sk-gallery-section { padding: 60px 10px; }
          .sk-grid { grid-template-columns: 1fr; gap: 8px; }
          .sk-card.horizontal,
          .sk-card.vertical   { grid-column: 1; aspect-ratio: 4/3; }
          .sk-card.vertical   { aspect-ratio: 3/4; }
          .sk-center-row { grid-column: 1; }
          .sk-center-card { width: 100%; aspect-ratio: 4/3; }
        }

        /* ── COPYRIGHT ── */
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
              {images.map((img, i) =>
                img.type === 'center' ? (
                  <div key={i} className="sk-center-row">
                    <div className="sk-block sk-center-card" style={{ animationDelay: `${(i % 5) * 0.12}s` }} />
                  </div>
                ) : (
                  <div key={i} className={`sk-block sk-card ${img.type}`} style={{ animationDelay: `${(i % 5) * 0.12}s` }} />
                )
              )}
            </div>
          </div>
          <div className="sk-footer"><div className="sk-block sk-footer-line" /></div>
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

                /* ── LOGO DIVIDER ROW ── */
                if (image.isLogo) {
                  return (
                    <div key={index} className="logo-row">
                      <LogoCard
                        brandSrc={image.src}
                        xIconSrc={image['x-icon']}
                        tag={image.tag}
                        isMobile={isMobile}
                      />
                    </div>
                  )
                }

                /* ── CENTER IMAGE ── */
                if (image.type === 'center') {
                  return (
                    <div key={index} className="gallery-item center">
                      <div className="center-inner">
                        <Image
                          src={image.src}
                          alt={image.title}
                          width={image.width}
                          height={image.height}
                          priority
                          quality={100}
                          unoptimized
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        <div className="gallery-overlay">
                          <h3>{image.title}</h3>
                          <p>{image.desc}</p>
                        </div>
                      </div>
                    </div>
                  )
                }

                /* ── HORIZONTAL / VERTICAL ── */
                return (
                  <div key={index} className={`gallery-item ${image.type}`}>
                    <div className="gallery-image-wrapper">
                      <Image
                        src={image.src}
                        alt={image.title}
                        width={image.width}
                        height={image.height}
                        priority
                        quality={100}
                        unoptimized
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div className="gallery-overlay">
                      <h3>{image.title}</h3>
                      <p>{image.desc}</p>
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