'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import BackgroundVideo from '../../components/BackgroundVideo'

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    const MIN_LOADING_TIME = 1500

    const timer = setTimeout(() => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime)
      setTimeout(() => setIsLoaded(true), remainingTime)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({ duration: 1200, once: true, offset: 80, easing: 'ease-out-cubic' })
    }
  }, [isLoaded])

  return (
    <>
      <style jsx>{`
        /* ================================================
           CUSTOM CURSOR
           ================================================ */
        .logo, a img, img[role="button"], img.clickable, .contact-email, .sound-toggle,.sound-btn, .icon-muted ,.icon-unmuted ,#copyOption, .copyright-link, .back-link, .instagram-text, .instagramSVG , .icon-text, .gmail-cta, .tooltip-icon, .tooltip-container {
          cursor: url('data:image/svg+xml;utf8,<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" transform="translate(7 6)"><path d="m4.5557 8.5742c-.098-.375-.196-.847-.406-1.552-.167-.557-.342-.859-.47-1.233-.155-.455-.303-.721-.496-1.181-.139-.329-.364-1.048-.457-1.44-.119-.509.033-.924.244-1.206.253-.339.962-.49 1.357-.351.371.13.744.512.916.788.288.46.357.632.717 1.542.393.992.564 1.918.611 2.231l.085.452c-.001-.04-.043-1.122-.044-1.162-.035-1.029-.06-1.823-.038-2.939.002-.126.064-.587.084-.715.078-.5.305-.8.673-.979.412-.201.926-.215 1.401-.017.423.173.626.55.687 1.022.014.109.094.987.093 1.107-.013 1.025.006 1.641.015 2.174.004.231.003 1.625.017 1.469.061-.656.094-3.189.344-3.942.144-.433.405-.746.794-.929.431-.203 1.113-.07 1.404.243.285.305.446.692.482 1.153.032.405-.019.897-.02 1.245 0 .867-.021 1.324-.037 2.121-.001.038-.015.298.023.182.094-.28.188-.542.266-.745.049-.125.241-.614.359-.859.114-.234.211-.369.415-.688.2-.313.415-.448.668-.561.54-.235 1.109.112 1.301.591.086.215.009.713-.028 1.105-.061.647-.254 1.306-.352 1.648-.128.447-.274 1.235-.34 1.601-.072.394-.234 1.382-.359 1.82-.086.301-.371.978-.652 1.384 0 0-1.074 1.25-1.192 1.812-.117.563-.078.567-.101.965-.024.399.121.923.121.923s-.802.104-1.234.034c-.391-.062-.875-.841-1-1.078-.172-.328-.539-.265-.682-.023-.225.383-.709 1.07-1.051 1.113-.668.084-2.054.03-3.139.02 0 0 .185-1.011-.227-1.358-.305-.26-.83-.784-1.144-1.06l-.832-.921c-.284-.36-.629-1.093-1.243-1.985-.348-.504-1.027-1.085-1.284-1.579-.223-.425-.331-.954-.19-1.325.225-.594.675-.897 1.362-.832.519.05.848.206 1.238.537.225.19.573.534.75.748.163.195.203.276.377.509.23.307.302.459.214.121" fill="%23fff"/><g stroke="%23000" stroke-linecap="round" stroke-width=".75"><path d="m4.5557 8.5742c-.098-.375-.196-.847-.406-1.552-.167-.557-.342-.859-.47-1.233-.155-.455-.303-.721-.496-1.181-.139-.329-.364-1.048-.457-1.44-.119-.509.033-.924.244-1.206.253-.339.962-.49 1.357-.351.371.13.744.512.916.788.288.46.357.632.717 1.542.393.992.564 1.918.611 2.231l.085.452c-.001-.04-.043-1.122-.044-1.162-.035-1.029-.06-1.823-.038-2.939.002-.126.064-.587.084-.715.078-.5.305-.8.673-.979.412-.201.926-.215 1.401-.017.423.173.626.55.687 1.022.014.109.094.987.093 1.107-.013 1.025.006 1.641.015 2.174.004.231.003 1.625.017 1.469.061-.656.094-3.189.344-3.942.144-.433.405-.746.794-.929.431-.203 1.113-.07 1.404.243.285.305.446.692.482 1.153.032.405-.019.897-.02 1.245 0 .867-.021 1.324-.037 2.121-.001.038-.015.298.023.182.094-.28.188-.542.266-.745.049-.125.241-.614.359-.859.114-.234.211-.369.415-.688.2-.313.415-.448.668-.561.54-.235 1.109.112 1.301.591.086.215.009.713-.028 1.105-.061.647-.254 1.306-.352 1.648-.128.447-.274 1.235-.34 1.601-.072.394-.234 1.382-.359 1.82-.086.301-.371.978-.652 1.384 0 0-1.074 1.25-1.192 1.812-.117.563-.078.567-.101.965-.024.399.121.923.121.923s-.802.104-1.234.034c-.391-.062-.875-.841-1-1.078-.172-.328-.539-.265-.682-.023-.225.383-.709 1.07-1.051 1.113-.668.084-2.054.03-3.139.02 0 0 .185-1.011-.227-1.358-.305-.26-.83-.784-1.144-1.06l-.832-.921c-.284-.36-.629-1.093-1.243-1.985-.348-.504-1.027-1.085-1.284-1.579-.223-.425-.331-.954-.19-1.325.225-.594.675-.897 1.362-.832.519.05.848.206 1.238.537.225.19.573.534.75.748.163.195.203.276.377.509.23.307.302.459.214.121" stroke-linejoin="round"/><path d="m11.566 12.734v-3.459"/><path d="m9.551 12.746-.016-3.473"/><path d="m7.555 9.305.021 3.426"/></g></g></svg>') 16 8, pointer !important;
        }

        .logo:active, a img:active, img[role="button"]:active, img.clickable:active, .contact-email:active , .sound-toggle:active , .icon-muted:active , .icon-unmuted:active, #copyOption:active, .copyright-link:active , .back-link:active, .instagram-text:active, .gmail-cta:active, .tooltip-icon:active {
          cursor: url('data:image/svg+xml;utf8,<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" transform="translate(8 9)"><path d="m3.44281398 1.68449726c-.74326136.27630142-1.05584685.8131257-1.07636853 1.38003696-.01344897.37336893.06665513.72649286.23114214 1.18694303-.02596219-.07267623.09676488.29282004.12116236.37362273.05052942.16918921-.4865367-.05865774-.81377307.00741883-.36363321.07113868-.84783757.38332307-1.10006887.79754775-.29643467.48542737-.3109609 1.04368567-.08235979 2.04824266.12491868.54736183.36572145 1.00836814.71076689 1.44594879.15329951.1944118.5713628.64726015.60307236.6875974l.84854343.94062339c.15080214.1358526.25794954.2361946.57590427.5380259.3147558.2987762.4647038.4380078.60308951.555976.05846214.0492474.10784267.1797116.12740685.3736249.01609788.1595565.01049553.3375341-.0090192.5090254-.00674888.0593077-.01325791.1020883-.01698742.1224696-.04189161.228932.13269563.4403386.36541902.4424835.21585671.0019894.38528595.0046546.82216479.0123538.09483476.0016698.09483476.0016698.18993053.0033129 1.16876447.0200186 1.75308289.0147904 2.17807912-.0385723.45429894-.0572869.92650915-.6110188 1.32698393-1.2957591.34289141.6108338.81859723 1.2057867 1.2995685 1.2820532.1510118.0244148.3353555.0322555.548787.0275887.1606725-.0035131.3307029-.0140241.5021961-.0293376.1276907-.0114022.2293359-.0228648.29003-.0307451.2258836-.0293282.373669-.251611.3133108-.4712481-.0130351-.0474332-.0339838-.1345011-.0551094-.2441635-.0245945-.1276687-.0423383-.2523857-.0503381-.365988-.0050217-.0713101-.0059948-.1359317-.0027687-.1918983.0059157-.0980798.0077938-.1530073.0108033-.281125.0010795-.0448938.0010795-.0448938.0024606-.0845172.0054208-.1364475.0233824-.2649146.0815132-.544638.0250088-.1201275.1473169-.352189.3398902-.639435.0571394-.0852302.1195783-.1742239.1864664-.26609712.1272143-.17473362.2641361-.35131772.4011075-.52030772.082051-.10123129.145482-.17695689.1808122-.21807676.2967593-.42378347.612817-1.11823437.7291396-1.52536348.1117407-.39153936.202351-1.12501196.254373-1.81690429.029923-.39968605.0410555-.72381216.0410555-1.23011613.0000742-.09758414.0000742-.09758414.0002975-.17670236.0003569-.11115478.0003569-.11115478.000115-.20711835-.0008934-.15683883-.0055282-.31323355-.0207085-.69507578-.0313109-.81293139-.4771727-1.33911388-1.1344906-1.44058831-.559108-.08631314-1.0586051.08188477-1.2779293.31625977-.0755526.08073733.0036753-.2781823-.2159489-.62316278-.1644465-.25841586-.593184-.58905957-.9209287-.65355552-.335487-.06535532-.73539548-.05811715-1.1017193.00667481-.32093157.05742909-.68608434.33741751-.87176225.64688068-.12411885.20686477.03884667-.00592296-.09368743-.23401341-.18231052-.31422641-.60754287-.59486422-1.01411454-.67799709-.34643562-.07139428-.74182572-.04452925-1.09945614.0633873-.43336319.1291117-1.01795827.61460976-.94899189 1.15552627-.34375-.54091651-1.25026717-.691379-1.97906097-.42111797z" fill="%23000"/><path d="m7.31951013 1.62138197c.20710357.04234751.44724204.20083012.51632974.31990811.08404358.1446387.15562749.36413806.21048667.6366124.02933373.14569467.12179446 1.2125285.29383112 1.32370243.41279229.04533731.41279229.04533731.52658055-.12364345.03545705-.07383858.03545705-.07383858.04226523-.1029106.01416796-.06009544.02463332-.12677987.0351322-.21754028l.00854738-.07915386.00047673-.00942804.00327525-.03167185c.01085148-.11424313.04184125-.4312127.05388392-.53034902.03788792-.31189663.08766449-.52757784.13944093-.6138719.0713024-.11883734.31942298-.28274442.43149612-.30279961.2804398-.04960082.58940103-.05519288.82623993-.00905543.1084394.02134018.3709471.22378689.432331.32024744.1291079.20279957.2524316.84889766.3225486 1.4970065-.0102194.04624251-.0102194.04624251.1640069.28984194.5843296-.06677889.5843296-.06677889.5703629-.17490247.0159511-.03856429.0284824-.08294031.045969-.15118961.0423876-.16089067.0697594-.25204451.111066-.35549917.0288558-.07227096.0592914-.13391873.0904889-.18278042.1209187-.19031132.4335712-.319392.7077174-.27707028.2943447.04543991.4816904.26653537.4994912.72869815.0148821.37434892.0193146.5239164.0201469.6700184l-.0004247.37954865c0 .48831141-.0104951.79388164-.0389535 1.17400348-.0480918.63962116-.1348512 1.34192123-.227649 1.66708484-.0946325.33121345-.3766371.95084197-.6003915 1.27298482-.0161892.01580846-.0841508.09694273-.1710333.20413492-.1445842.17838247-.2892181.36491271-.4247891.5511244-.0723398.09936149-.1402862.19620479-.2030964.2898938-.2440054.36396314-.400553.66098894-.4512157.90434304-.0659304.3172546-.0893838.4850003-.0966379.6675968-.0017072.0490782-.0017072.0490782-.002845.096677-.0028064.119476-.004437.1671639-.0097087.2545848-.0052654.091322-.0038193.187354.00332.2887353.0103318.1467182.1058713.3478531.1058713.3478531s-.2321503-.0119819-.3742084-.0088758c-.1718098.0037567-.3147843-.0023244-.4138162-.0183342-.1440353-.0228411-.53014068-.5057331-.7278511-.8821737-.30227042-.5764228-1.03604858-.5484427-1.33684295-.0394061-.26854779.4591613-.65918083.9172326-.7740684.9317199-.37404082.0469647-.94643778.0520862-2.07160079.0328144-.09480875-.0016381-.46003446-.0128683-.64600494-.0157445-.18597048-.0028763.05008807-.1790283.02786486-.399297-.03726222-.36933-.15125405-.6704984-.38877094-.8705429-.12241569-.1043631-.26774964-.2393104-.56509654-.5215613-.33323493-.3163366-.44236499-.4185353-.57290215-.533275l-.80130455-.89071892c-.03955779-.05174211-.45812831-.5051399-.5872217-.6688539-.28069963-.35597842-.47062947-.71959073-.56844755-1.14820437-.18921973-.83150113-.1793328-1.21146622-.00855589-1.49112273.13743587-.2257023.43815377-.4195862.60596039-.45241793.17165981-.03465512.55153059-.01648617.62179422.02229321.09902279.05401056.13357243.07300285.16379074.09097645.03572494.02124891.05965747.03799198.08182912.05708809.03426437.02951139.07235014.07170412.12420211.14044502.03611591.04821025.07806642.1053997.1423779.19304882.06054643.0816627.09183576.12069421.13369221.1590035.28038907.25662728.68391532.03238058.65052057-.32606956-.00567036-.06086415-.02203766-.12694598-.05458621-.23708502-.04356824-.15021272.00433013-.05284275-.26002629-.56642281-.08720664-.16942124-.13955864-.28835362-.17428227-.4046158l-.03412852-.10219113c-.03838756-.11059767-.09558223-.26854489-.12612861-.35199347l-.02009957-.05467087.002.008-.05974804-.17751191c-.09232236-.28807194-.13413567-.51358087-.12645475-.72681781.01040781-.28751553.16037753-.54506871.58790983-.70400047.40142488-.1488616 1.07786076.00117106 1.20581167.27856864.04319814.09369738.08927466.21199471.13900415.35457792l.03930997.11680217c.05539717.16759437.13470873.41493582.13860471.42816881.02724222.08344874.0471839.13860719.06943813.18441246.00217869.06301886.00217869.06301886.35429398.23177937.41699479-.29154152.41699479-.29154152.38019201-.37525838.00571063-.08773482.00758408-.17356287.00965287-.37317647.00242546-.23402898.00423842-.33154773.00994479-.45966208.01316411-.29554918.0437926-.51142116.09291227-.63864415.09160418-.23801371.25279279-.40993649.4432431-.46667832.24458613-.07380253.51465245-.09215236.73323569-.04710649zm1.21356228 4.27672201c-.20710459.00095412-.37422255.16961903-.37326843.37672361l.016 3.473c.00095412.20710459.16961903.37422251.37672361.37326841.20710459-.0009541.37422255-.16961901.37326843-.37672359l-.016-3.473c-.00095412-.20710459-.16961903-.37422255-.37672361-.37326843zm2.03332759.00229602c-.2071068 0-.375.16789322-.375.375v3.459c0 .20710678.1678932.375.375.375s.375-.16789322.375-.375v-3.459c0-.20710678-.1678932-.375-.375-.375zm-4.01399856.02930704c-.20710289.00126946-.37396385.17018863-.3726944.37729152l.021 3.426c.00126946.20710289.17018863.37396384.37729152.37269444.20710289-.0012695.37396385-.17018867.3726944-.37729156l-.021-3.426c-.00126946-.20710289-.17018863-.37396385-.37729152-.3726944z" fill="%23fff"/></g></svg>') 16 8, grabbing !important;
        }

        /* ================================================
           SKELETON — WRAPPER & SHIMMER ENGINE
           ================================================ */

        .skeleton-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          transition: opacity 0.7s ease-out, visibility 0.7s;
          opacity: 1;
          visibility: visible;
        }
        .skeleton-wrapper.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .sk {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }
        .sk::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-130%);
          background: linear-gradient(
            105deg,
            transparent 25%,
            rgba(255,255,255,0.045) 45%,
            rgba(255,255,255,0.085) 50%,
            rgba(255,255,255,0.045) 55%,
            transparent 75%
          );
          animation: shimmer 2.4s ease-in-out infinite;
        }

        .sk-d1::after  { animation-delay: 0.00s; }
        .sk-d2::after  { animation-delay: 0.12s; }
        .sk-d3::after  { animation-delay: 0.24s; }
        .sk-d4::after  { animation-delay: 0.36s; }
        .sk-d5::after  { animation-delay: 0.48s; }
        .sk-d6::after  { animation-delay: 0.60s; }
        .sk-d7::after  { animation-delay: 0.72s; }
        .sk-d8::after  { animation-delay: 0.84s; }
        .sk-d9::after  { animation-delay: 0.96s; }
        .sk-d10::after { animation-delay: 1.08s; }
        .sk-d11::after { animation-delay: 1.20s; }
        .sk-d12::after { animation-delay: 1.32s; }
        .sk-d13::after { animation-delay: 1.44s; }
        .sk-d14::after { animation-delay: 1.56s; }
        .sk-d15::after { animation-delay: 1.68s; }
        .sk-d16::after { animation-delay: 1.80s; }
        .sk-d17::after { animation-delay: 1.92s; }

        @keyframes shimmer {
          0%   { transform: translateX(-130%); }
          55%  { transform: translateX(130%); }
          100% { transform: translateX(130%); }
        }

        /* Tones */
        .sk-t1 { background: #161616; }
        .sk-t2 { background: #1a1a1a; }
        .sk-t3 { background: #1e1e1e; }

        /* ── Hero skeleton ── */
        .sk-hero {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 22px;
          padding: 140px 40px 80px;
        }
        .sk-hero-title {
          height: clamp(70px, 12vw, 140px);
          width: clamp(280px, 44%, 580px);
          border-radius: 18px;
        }
        .sk-hero-subtitle {
          height: clamp(22px, 3.5vw, 38px);
          width: clamp(180px, 28%, 360px);
          border-radius: 10px;
        }

        /* ── Main shell ── */
        .sk-main {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 40px 100px;
        }

        /* ── Card shell ── */
        .sk-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 50px 40px;
        }

        /* ── Gmail CTA skeleton ── */
        .sk-gmail-row {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 18px 22px;
        }
        .sk-gmail-icon { width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0; }
        .sk-gmail-text { display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .sk-gmail-label-line { height: 10px; width: 70px; border-radius: 4px; }
        .sk-gmail-addr-line  { height: 16px; width: 160px; border-radius: 5px; }
        .sk-gmail-arrow      { width: 18px; height: 18px; border-radius: 4px; flex-shrink: 0; }

        /* ── Static divider — no shimmer ── */
        .sk-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          margin: 50px 0;
          overflow: visible;
        }
        .sk-divider::after { display: none; }

        /* ── Follow Us + social icons ── */
        .sk-follow-label { height: 13px; width: 90px; border-radius: 4px; margin: 0 auto 24px; display: block; }
        .sk-social-row   { display: flex; gap: 20px; align-items: center; justify-content: center; margin-top: 8px; }
        .sk-social-icon  { width: 55px; height: 55px; border-radius: 15px; }

        /* ── Footer ── */
        .sk-footer {
          display: flex;
          justify-content: center;
          padding: 80px 40px 60px;
        }
        .sk-copyright { height: 14px; width: 280px; border-radius: 5px; }

        /* ================================================
           REAL CONTENT
           ================================================ */

        .content-wrapper {
          opacity: 0;
          transition: opacity 0.8s ease-in;
        }
        .content-wrapper.loaded { opacity: 1; }

        /* ── Page shell ── */
        .contact-page {
          position: relative;
          min-height: 100vh;
          width: 100%;
          color: #fff;
          overflow-x: hidden;
        }

        .video-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.5) 0%,
            rgba(0,0,0,0.7) 50%,
            rgba(0,0,0,0.8) 100%
          );
          z-index: 0;
          pointer-events: none;
          backdrop-filter: blur(2px);
        }

        /* ── Hero ── */
        .hero-section {
          position: relative;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 140px 40px 80px;
          z-index: 1;
        }
        .hero-title {
          font-size: clamp(60px, 12vw, 140px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -3px;
          margin-bottom: 20px;
          mix-blend-mode: difference;
          animation: fadeInUp 1s ease-out;
        }
        .hero-subtitle {
          font-size: clamp(18px, 3vw, 32px);
          font-weight: 300;
          letter-spacing: 1px;
          opacity: 0.8;
          mix-blend-mode: difference;
          animation: fadeInUp 1s ease-out 0.2s backwards;
        }

        /* ── Main content ── */
        .main-content {
          position: relative;
          z-index: 1;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 40px 100px;
        }

        /* ── Contact card ── */
        .contact-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 50px 40px;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        .contact-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,255,136,0.5), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .contact-card:hover::before { transform: translateX(100%); }
        .contact-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(0,255,136,0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0,255,136,0.1);
        }

        /* ── Divider ── */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          margin: 50px 0;
        }

        /* ── Region label ── */
        .region-label {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: rgba(0,255,136,0.7);
          margin-bottom: 16px;
          display: block;
          font-weight: 600;
          text-align: center;
        }

        /* ── Gmail CTA ── */
        .gmail-cta {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 18px 22px;
          text-decoration: none;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          margin-top: 8px;
        }
        .gmail-cta:hover {
          background: rgba(234,67,53,0.12);
          border-color: rgba(234,67,53,0.4);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(234,67,53,0.15);
        }
        .gmail-icon { flex-shrink: 0; width: 36px; height: 36px; }
        .gmail-text-wrap { display: flex; flex-direction: column; gap: 2px; }
        .gmail-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.4);
          font-weight: 600;
        }
        .gmail-address { font-size: 15px; font-weight: 600; color: #fff; letter-spacing: -0.3px; }
        .gmail-arrow { margin-left: auto; opacity: 0.35; transition: all 0.3s ease; flex-shrink: 0; }
        .gmail-cta:hover .gmail-arrow { opacity: 1; transform: translate(4px,-4px); color: rgba(234,67,53,0.9); }

        /* ── Social tooltips ── */
        .social-row { display: flex; gap: 20px; align-items: center; justify-content: center; margin-top: 32px; }

        .tooltip-container {
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 17px;
          border-radius: 10px;
        }
        .tooltip {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s;
          border-radius: 15px;
          box-shadow: inset 5px 5px 5px rgba(0,0,0,0.2),
            inset -5px -5px 15px rgba(255,255,255,0.1),
            5px 5px 15px rgba(0,0,0,0.3),
            -5px -5px 15px rgba(255,255,255,0.1);
          z-index: 100;
          white-space: nowrap;
        }
        .profile {
          background: #2a2b2f;
          border-radius: 10px 15px;
          padding: 10px;
          border: 1px solid #52382f;
        }
        .tooltip-container:hover .tooltip { top: -150px; opacity: 1; visibility: visible; pointer-events: auto; }

        .tooltip-icon { text-decoration: none; color: #fff; display: block; position: relative; }
        .layer { width: 55px; height: 55px; transition: transform 0.3s; }
        .tooltip-icon:hover .layer { transform: rotate(-35deg) skew(20deg); }
        .layer span {
          position: absolute;
          top: 0; left: 0;
          height: 100%; width: 100%;
          border: 1px solid #fff;
          border-radius: 15px;
          transition: all 0.3s;
        }

        .instagram-theme .layer span,
        .instagram-theme .icon-text { color: #e6683c; border-color: #e6683c; }
        .tooltip-icon:hover .layer span { box-shadow: -1px 1px 3px currentColor; }
        .instagram-theme .tooltip-icon:hover .layer span { box-shadow: -1px 1px 3px #e6683c; }

        .x-theme .layer span,
        .x-theme .icon-text { color: #fff; border-color: #fff; }
        .x-theme .tooltip-icon:hover .layer span { box-shadow: -1px 1px 3px rgba(255,255,255,0.7); }
        .x-theme .profile { border-color: #333; }

        .icon-text {
          position: absolute;
          left: 50%;
          bottom: -5px;
          opacity: 0;
          font-weight: 500;
          font-size: 13px;
          transform: translateX(-50%);
          transition: bottom 0.3s ease, opacity 0.3s ease;
          white-space: nowrap;
        }
        .tooltip-icon:hover .icon-text { bottom: -35px; opacity: 1; }

        .tooltip-icon:hover .layer span:nth-child(1) { opacity: 0.2; }
        .tooltip-icon:hover .layer span:nth-child(2) { opacity: 0.4; transform: translate(5px,-5px); }
        .tooltip-icon:hover .layer span:nth-child(3) { opacity: 0.6; transform: translate(10px,-10px); }
        .tooltip-icon:hover .layer span:nth-child(4) { opacity: 0.8; transform: translate(15px,-15px); }
        .tooltip-icon:hover .layer span:nth-child(5) { opacity: 1;   transform: translate(20px,-20px); }

        .instagramSVG {
          font-size: 25px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 15px;
          width: 100%; height: 100%;
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }
        .xSVG {
          font-size: 25px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 15px;
          width: 100%; height: 100%;
          background: #000;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .user { display: flex; gap: 10px; }
        .img-avatar {
          width: 50px; height: 50px;
          font-size: 14px; font-weight: 700;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
        }
        .img-avatar.instagram-avatar { border: 1px solid #e6683c; background: linear-gradient(45deg,#f09433,#bc1888); color: #fff; }
        .img-avatar.x-avatar          { border: 1px solid #555; background: #000; color: #fff; }
        .name-tooltip { font-size: 17px; font-weight: 700; }
        .instagram-theme .name-tooltip { color: #e6683c; }
        .x-theme .name-tooltip         { color: #fff; }
        .details { display: flex; flex-direction: column; gap: 0; color: #fff; }
        .username { font-size: 13px; color: rgba(255,255,255,0.6); }
        .about { color: #ccc; padding-top: 5px; font-size: 13px; }

        /* ── Footer ── */
        .copyright-container {
          width: 100%;
          padding: 80px 40px 60px;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .copyright { font-size: 14px; color: rgba(255,255,255,0.5); font-weight: 400; letter-spacing: 1px; margin: 0; }
        .copyright-link,
        .copyright-link:visited,
        .copyright-link:active {
          color: #fff; font-weight: 700; text-decoration: none;
          position: relative; display: inline-block; margin: 0 4px;
          transition: all 0.3s ease;
        }
        .copyright-link::after {
          content: '';
          position: absolute;
          width: 0; height: 1px;
          bottom: -2px; left: 0;
          background-color: #fff;
          transition: width 0.3s ease;
        }
        .copyright-link:hover::after { width: 100%; }
        .copyright-link:hover { opacity: 0.8; transform: translateY(-1px); }

        /* Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ================================================
           RESPONSIVE
           ================================================ */
        @media (max-width: 768px) {
          .sk-hero,
          .hero-section { padding: 120px 25px 60px; min-height: 50vh; }
          .sk-main,
          .main-content { padding: 0 25px 80px; }
          .sk-card,
          .contact-card { padding: 35px 25px; }
          .sk-footer,
          .copyright-container { padding: 60px 25px 40px; }
          .hero-title  { font-size: 60px; letter-spacing: -2px; }
          .hero-subtitle { font-size: 18px; }
          .copyright { font-size: 12px; }
        }
        @media (max-width: 480px) {
          .sk-gmail-addr-line { width: 130px; }
          .hero-title { font-size: 48px; }
          .contact-card { padding: 30px 20px; }
        }
      `}</style>

      <div className="contact-page">
        <BackgroundVideo />
        <div className="video-overlay" />

        {/* ============================================================
            SKELETON LOADER
            ============================================================ */}
        <div className={`skeleton-wrapper ${isLoaded ? 'hidden' : ''}`}>

          {/* Hero */}
          <section className="sk-hero">
            <div className="sk sk-t1 sk-hero-title sk-d1" />
            <div className="sk sk-t2 sk-hero-subtitle sk-d2" />
          </section>

          {/* Card */}
          <div className="sk-main">
            <div className="sk-card">

              {/* Gmail CTA */}
              <div className="sk-gmail-row">
                <div className="sk sk-t3 sk-gmail-icon sk-d3" />
                <div className="sk-gmail-text">
                  <div className="sk sk-t1 sk-gmail-label-line sk-d4" />
                  <div className="sk sk-t2 sk-gmail-addr-line sk-d5" />
                </div>
                <div className="sk sk-t1 sk-gmail-arrow sk-d6" />
              </div>

              {/* Divider */}
              <div className="sk-divider" />

              {/* Follow Us label */}
              <div className="sk sk-t1 sk-follow-label sk-d7" />

              {/* Social icons */}
              <div className="sk-social-row">
                <div className="sk sk-t2 sk-social-icon sk-d8" />
                <div className="sk sk-t2 sk-social-icon sk-d9" />
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="sk-footer">
            <div className="sk sk-t1 sk-copyright sk-d17" />
          </div>

        </div>
        {/* ── End Skeleton ── */}

        {/* ============================================================
            REAL CONTENT
            ============================================================ */}
        <div className={`content-wrapper ${isLoaded ? 'loaded' : ''}`}>

          {/* Hero */}
          <section className="hero-section">
            <h1 className="hero-title" data-aos="fade-up">Get in Touch</h1>
            <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
              Let's create something extraordinary together
            </p>
          </section>

          {/* Gmail + Social Card */}
          <div className="main-content">
            <div className="contact-card" data-aos="fade-up" data-aos-delay="300">

              {/* Gmail CTA Button */}
              <a
                href="https://mail.google.com/mail/?view=cm&to=business@5feet4.co"
                target="_blank"
                rel="noopener noreferrer"
                className="gmail-cta"
              >
                <svg className="gmail-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M6 12l18 11L42 12v-2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2z" />
                  <path fill="#34A853" d="M42 12L24 23 6 12v24a2 2 0 0 0 2 2h32a2 2 0 0 0 2-2z" />
                  <path fill="#4A90D9" d="M42 12l-18 11" />
                  <path fill="#FBBC05" d="M6 12l18 11" />
                  <path fill="#EA4335" d="M42 12V10a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2l18 11z" />
                </svg>
                <div className="gmail-text-wrap">
                  <span className="gmail-label">Write to us</span>
                  <span className="gmail-address">business@5feet4.co</span>
                </div>
                <svg className="gmail-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              <div className="divider" />

              {/* Social Media */}
              <span className="region-label">Follow Us</span>
              <div className="social-row">

                {/* Instagram */}
                <div className="tooltip-container instagram-theme">
                  <div className="tooltip">
                    <div className="profile">
                      <div className="user">
                        <div className="img-avatar instagram-avatar">5'4®</div>
                        <div className="details">
                          <div className="name-tooltip">5feet4</div>
                          <div className="username">@5feet.4</div>
                        </div>
                      </div>
                      <div className="about">Follow us on Instagram</div>
                    </div>
                  </div>
                  <a
                    className="tooltip-icon"
                    href="https://www.instagram.com/5feet.4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="layer">
                      <span /><span /><span /><span />
                      <span className="instagramSVG">
                        <svg fill="white" viewBox="0 0 448 512" height="1.5em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                        </svg>
                      </span>
                    </div>
                    <div className="icon-text">Instagram</div>
                  </a>
                </div>

                {/* X (Twitter) */}
                <div className="tooltip-container x-theme">
                  <div className="tooltip">
                    <div className="profile">
                      <div className="user">
                        <div className="img-avatar x-avatar">5'4®</div>
                        <div className="details">
                          <div className="name-tooltip">5feet4</div>
                          <div className="username">@5feet4official</div>
                        </div>
                      </div>
                      <div className="about">Follow us on X</div>
                    </div>
                  </div>
                  <a
                    className="tooltip-icon"
                    href="https://x.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="layer">
                      <span /><span /><span /><span />
                      <span className="xSVG">
                        <svg fill="white" viewBox="0 0 300 300" height="1.4em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
                        </svg>
                      </span>
                    </div>
                    <div className="icon-text">X (Twitter)</div>
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="copyright-container">
            <p className="copyright" data-aos="fade-up">
              © 2025 <Link href="/" className="copyright-link">5FEET4</Link>. ALL RIGHTS RESERVED.
            </p>
          </div>

        </div>
        {/* ── End Real Content ── */}

      </div>
    </>
  )
}