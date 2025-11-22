'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { MagneticButton } from '../page'

export default function IntroSequence({ onFinish }: { onFinish: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        setTimeout(() => onFinish(), 400) // petite pause avant disparition
      },
    })

    tl.timeScale(2)

    // halo initial
    tl.fromTo(
      '.intro-halo',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1.2, duration: 1.2 }
    )

    // ligne centrale
    tl.fromTo(
      '.intro-line',
      { width: 0, opacity: 0 },
      { width: '220px', opacity: 1, duration: 0.8 },
      '-=0.4'
    )

    // deux noms split
    tl.fromTo(
      '.intro-left',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7 },
      '-=0.25'
    )
    tl.fromTo(
      '.intro-right',
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7 },
      '-=0.55'
    )

    // fusion subtle glow
    tl.to('.intro-line', {
      width: '260px',
      boxShadow: '0 0 40px rgba(217,197,165,0.9)',
      duration: 0.7,
    })

    // flash + disappear
    tl.to(
      '.intro-container',
      {
        opacity: 0,
        duration: 0.8,
      },
      '+=0.3'
    )
  }, [onFinish])

  return (
    <motion.div
      ref={containerRef}
      className="intro-container fixed inset-0 z-[9999] flex items-center justify-center bg-[#050304]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {/* Halo */}
      <div className="intro-halo absolute inset-0 -z-10 opacity-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 40%, rgba(74,14,20,0.85), transparent 70%),
              radial-gradient(circle at 50% 70%, rgba(217,197,165,0.25), transparent 80%)
            `,
            filter: 'blur(120px)',
          }}
        />
      </div>

      {/* Ligne + noms */}
      <div className="flex flex-col items-center gap-4 text-[#F2ECE7]">
        <div className="intro-line h-[1.5px] w-[220px] bg-gradient-to-r from-[#4A0E14] via-[#D9C5A5] to-[#4A0E14] opacity-0" />

        <div className="flex items-center gap-6 text-xl tracking-widest">
          <span className="intro-right opacity-0">BRANDIVITY</span>
          <span className="intro-left opacity-0">SOCIALUX</span>
        </div>
      </div>

      {/* CTA collé en bas */}
      <div className="fixed bottom-4 left-1/2 z-[999] w-[92%] max-w-3xl -translate-x-1/2">
        <div
          dir="rtl"
          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/80 px-4 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[0.78rem] text-[#E2DBD5] leading-relaxed">
            جلسة تدقيق مجانية توضّح لك صورة التسويق والمبيعات بالكامل.
          </p>

          <MagneticButton
            href="https://calendly.com/fares-azem/qualification-meeting"
            target="_blank"
            rel="noreferrer"
          >
            احجز الآن
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  )
}
