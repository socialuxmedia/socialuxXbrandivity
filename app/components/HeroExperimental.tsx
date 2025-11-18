'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Suspense, useEffect } from 'react'
import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'

export default function HeroExperimental() {

  useEffect(() => {
    const lenis = new Lenis({ smooth: true })
    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Liquid distortion du headline
    gsap.to('.warp-text', {
      duration: 5,
      repeat: -1,
      yoyo: true,
      filter: 'url(#distort)',
      ease: 'power1.inOut',
    })
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0B0B0B] text-[#F2ECE7]">
      {/* BACKGROUND PARALLAX */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 7] }}>
          <color attach="background" args={['#0B0B0B']} />

          {/* DONUT 3D FLOTTE */}
          <Suspense fallback={null}>
            <Float floatIntensity={2} rotationIntensity={1}>
              <mesh>
                <torusGeometry args={[2, 0.6, 32, 100]} />
                <MeshDistortMaterial
                  color={'#4A0E14'}
                  distort={0.25}
                  speed={2}
                />
              </mesh>
            </Float>
          </Suspense>

          {/* PARTICULES */}
          <Sparkles
            count={80}
            size={4}
            color={'#D9C5A5'}
            speed={0.4}
            opacity={0.6}
          />

          {/* CONTROLS */}
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {/* LIQUID DISTORTION FILTER */}
      <svg className="absolute pointer-events-none">
        <filter id="distort">
          <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" />
        </filter>
      </svg>

      {/* HERO CONTENT */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="warp-text relative z-20 bg-clip-text text-center text-[3rem] font-extralight text-[#F2ECE7] md:text-[5rem]"
          style={{
            filter: 'url(#distort)',
          }}
        >
          Brandivity ✕ Socialux
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="pointer-events-auto z-20 mt-6 max-w-xl text-center text-lg text-[#C8C8C8]"
        >
          Où la stratégie rencontre l’expérience sensorielle.
        </motion.p>

        {/* CTA MAGNETIC + WARP */}
        <MagneticCTA />
      </div>

      {/* CURSOR LIGHT FOLLOW */}
      <div
        id="cursor-light"
        className="pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A0E14]/40 blur-3xl"
      ></div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('mousemove', (e) => {
              const light = document.getElementById('cursor-light');
              light.style.left = e.clientX + 'px';
              light.style.top = e.clientY + 'px';
            })
          `,
        }}
      />
    </div>
  )
}

// ----------------------
// Magnetic CTA Component
// ----------------------
function MagneticCTA() {
  return (
    <motion.button
      whileHover={{
        scale: 1.15,
        boxShadow:
          '0 0 60px rgba(217,197,165,0.9), 0 20px 60px rgba(0,0,0,0.8)',
      }}
      whileTap={{ scale: 0.95 }}
      className="pointer-events-auto relative z-20 mt-8 rounded-full bg-[#4A0E14] px-10 py-4 text-lg font-semibold text-[#F2ECE7] shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
    >
      Explorer
    </motion.button>
  )
}
