'use client'
import IntroSequence from './components/IntroSequence'
import React, { useEffect, useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  Variants,
  useMotionValue,
  useSpring,
} from 'framer-motion'

/* ----------------- SPOTLIGHT BURGUNDY (peu animé) ----------------- */

const Spotlight = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        borderRadius: '6%',
      }}
    >
      <div
        className="absolute -inset-40"
        style={{
          borderRadius: '6%',
          background: `
            radial-gradient(circle at 45% 30%, rgba(74,14,20,0.96), transparent 62%),
            radial-gradient(circle at 15% 85%, rgba(255,255,255,0.9), transparent 70%),
            radial-gradient(circle at 90% 20%, rgba(242,236,231,0.16), transparent 72%)
          `,
          filter: 'blur(120px)',
          opacity: 0.95,
        }}
      />
    </div>
  )
}

/* ----------------- CONTENU (TES TEXTES) ----------------- */

const steps = [
  {
    id: 'hero',
    label: 'الرؤية',
    eyebrow: 'Socialux ✕ Brandivity',
    title: (
      <>
        منافسوك لا يملكون منتجاً أفضل منك،
        <br />
        <span className="bg-gradient-to-l from-[#F2ECE7] via-[#D9C5A5] to-[#4A0E14] bg-clip-text text-transparent">
          بل يملكون منظومة تسويق أوضح وأقوى.
        </span>
      </>
    ),
    body: (
      <>
        Socialux سوشالاكس هي وكالة التسويق التي تدير حضورك اليومي. Brandivity
        برانديفيتي هي الشريك الاستراتيجي الذي يحدّد الاتجاه والأولويات. معاً،
        نحوّل علامتك التجارية، محتواك وحملاتك إلى منظومة واحدة مترابطة هدفها
        الأساسي: المبيعات والنمو، لا مجرد التفاعل والأرقام السطحية.
      </>
    ),
    bullets: null as string[] | null,
    tag: 'جلسة تدقيق مجانية في البداية',
  },
  {
    id: 'duo',
    label: 'منظومة واحدة',
    eyebrow: 'منفّذ يومي + شريك استراتيجي',
    title: (
      <>
        توقّف عن جمع مزوّدي خدمات وتسويق بشكل عشوائي،
        <br />
        <span className="text-[#F2ECE7]/90">
          وابدأ ببناء منظومة تسويقية واحدة متكاملة.
        </span>
      </>
    ),
    body: (
      <>
        Socialux سوشالاكس تدير التسويق اليومي: المحتوى، وسائل التواصل الاجتماعي،
        الحملات والإعلانات المدفوعة. Brandivity برانديفيتي تبني الاستراتيجية،
        التحليل والأولويات. فريق واحد يعمل على مؤشرات واضحة: الإيرادات، صفقات
        المبيعات وخط الأنابيب، وليس فقط المشاهدات ونسب الوصول.
      </>
    ),
    bullets: [
      'وضوح استراتيجي حول الجمهور، العرض، والموقع في السوق.',
      'تنفيذ يومي منظّم من فريق واحد يفهم نشاطك التجاري.',
      'ربط مباشر بين التسويق والمبيعات والأرقام الحقيقية.',
    ],
    tag: 'من مزوّدين متناثرين إلى نظام واحد',
  },
  {
    id: 'socialux',
    label: 'Socialux',
    eyebrow: 'وكالة تسويق · Socialux سوشالاكس',
    title: (
      <>
        Socialux سوشالاكس : تسويق
        <span className="text-[#D9C5A5]"> يحرّك علامتك التجارية.</span>
      </>
    ),
    body: (
      <>
        Socialux سوشالاكس تخطّط، تنتج وتدير حضور علامتك التجارية اليومي عبر
        المنصات: من وسائل التواصل الاجتماعي إلى الحملات المدفوعة. الصورة واللغة
        والإيقاع التسويقي يخرجون من فريق واحد، بطريقة متسقة ومستمرة.
      </>
    ),
    bullets: [
      'جداول تحريرية، محتوى، وتصميمات تخرج من فريق واحد.',
      'حملات إطلاق وبناء هوية رقمية متناسقة.',
      'هدف واضح: حضور ثابت ورسالة مفهومة ومسار أقصر للعميل المثالي.',
    ],
    tag: 'تنفيذ يومي متماسك',
  },
  {
    id: 'brandivity',
    label: 'Brandivity',
    eyebrow: 'شريك استراتيجي · Brandivity برانديفيتي',
    title: (
      <>
        Brandivity برانديفيتي : تحويل التسويق إلى
        <span className="text-[#D9C5A5]"> محرّك نمو حقيقي.</span>
      </>
    ),
    body: (
      <>
        Brandivity برانديفيتي تحلّل العرض، والمنتج، وقمع المبيعات، والحملات
        الحالية، ثم تبني استراتيجية تربط كل ذلك بأهداف الإيرادات والنمو.
        النتيجة: قرارات مبنية على بيانات واضحة بدلاً من الانطباعات اللحظية.
      </>
    ),
    bullets: [
      'تشخيص عميق لوضع التسويق والمبيعات الحالي.',
      'تحديد ما يجب إيقافه، إصلاحه أو توسيعه.',
      'استراتيجية قابلة للتنفيذ مرتبطة بأهداف نمو واضحة.',
    ],
    tag: 'من نشاط تسويقي إلى محرّك نمو',
  },
  {
    id: 'cost',
    label: 'التكلفة الخفية',
    eyebrow: 'تكلفة غياب النظام',
    title: 'تكلفة "ممارسة التسويق" بدون نظام واضح.',
    body: (
      <>
        هذه التكلفة لا تظهر كبند واحد في التقارير، لكنها تتوزع في كل مكان: عملاء
        محتملون غير مناسبين، رسائل غير دقيقة، حملات لا تبني على بعضها، وسنوات
        تمر على شكل تجارب متفرّقة بدلاً من خطة يتم تنفيذها خطوة بخطوة.
      </>
    ),
    bullets: [
      'المنافسة على السعر لأن القيمة لا تُقدَّم بشكل واضح.',
      'محتوى وإعلانات وموقع إلكتروني برسائل وصور متباعدة.',
      'وصول عملاء غير مناسبين أو غير جاهزين للشراء.',
      'ضعف الربط بين التسويق والمبيعات وغياب رؤية مشتركة للأرقام.',
      'إحساس دائم بأنكم "جرّبتم الكثير" بدلاً من تنفيذ خطة واحدة متماسكة.',
    ],
    tag: 'جلسة تدقيق لتوضيح الصورة',
  },
]

/* ----------------- ANIMS + CTA MAGNÉTIQUE ----------------- */

const panelVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.4, ease: 'easeIn' },
  }),
}

export function MagneticButton({
  children,
  ...rest
}: React.ComponentProps<typeof motion.a>) {
  const ref = useRef<HTMLAnchorElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.3 })

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.3)
    y.set(relY * 0.3)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-flex items-center justify-center rounded-full bg-[#4A0E14] px-10 py-3.5 text-sm font-semibold text-[#F2ECE7] tracking-wide shadow-[0_18px_60px_rgba(0,0,0,0.95)] transition-all duration-200 hover:-translate-y-[2px]"
      {...rest}
    >
      {children}
    </motion.a>
  )
}

/* ----------------- REEL VIDEO (badge hauteur fixe) ----------------- */

function ReelVideo() {
  return (
    <div className="relative h-full w-full max-w-[360px]">
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative flex h-full items-center justify-center rounded-[2.2rem] border border-[#4A0E14]/45 bg-[black]/85 p-3 backdrop-blur-2xl shadow-[0_32px_120px_rgba(74,14,20,0.96)]"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(circle_at_top,_rgba(242,236,231,0.38),transparent_60%)] opacity-90" />
        <div className="relative h-full w-full overflow-hidden rounded-3xl bg-[black]">
          <video
            src="/socialux-brandivity.mp4"
            autoPlay={true}
            controls
            className="relative z-[1] h-full w-full object-contain"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="pointer-events-none absolute right-4 top-4 rounded-full border border-[#D9C5A5]/60 bg-[#1B1412]/95 px-4 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-[#F4E8DD] shadow-[0_0_26px_rgba(0,0,0,0.9)]"
      >
        Socialux X Brandivity
      </motion.div>
    </div>
  )
}

/* ----------------- PAGE ----------------- */

export default function Page() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showIntro, setShowIntro] = useState(true)

  // ref pour le container scrollable
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // auto-scroll vertical + passage à l'étape suivante
  useEffect(() => {
    let frameId: number
    let delayId: number | null = null
    let timeoutId: number | null = null

    // temps d'affichage au début AVANT de commencer à scroller
    const viewDelay = 2000 // 2 secondes, tu peux mettre 2500 / 3000 si tu veux plus long

    delayId = window.setTimeout(() => {
      const el = scrollRef.current
      if (!el) return

      // repartir du haut à chaque étape
      el.scrollTop = 0

      const distance = el.scrollHeight - el.clientHeight

      // si rien à scroller (contenu court)
      if (distance <= 0) {
        timeoutId = window.setTimeout(() => {
          setDirection(1)
          setIndex((prev) => (prev + 1) % steps.length)
        }, 3500) // temps d'affichage quand pas de scroll
        return
      }

      const duration = 12000 // durée du scroll
      const endDelay = 1500 // pause EN BAS avant de passer à l'étape suivante
      let start: number | null = null

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)

        el.scrollTop = distance * progress

        if (progress < 1) {
          frameId = requestAnimationFrame(step)
        } else {
          timeoutId = window.setTimeout(() => {
            setDirection(1)
            setIndex((prev) => (prev + 1) % steps.length)
          }, endDelay)
        }
      }

      frameId = requestAnimationFrame(step)
    }, viewDelay)

    return () => {
      if (delayId) clearTimeout(delayId)
      if (timeoutId) clearTimeout(timeoutId)
      cancelAnimationFrame(frameId)
    }
  }, [index])

  const current = steps[index]

  const goTo = (i: number) => {
    if (i === index) return
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }

  return (
    <main className="relative min-h-screen bg-[#050304] text-[#F5F5F5] pb-32 md:pb-10">
      {showIntro && <IntroSequence onFinish={() => setShowIntro(false)} />}

      {/* background global */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[radial-gradient(circle_at_top,_#4A0E14_0,_#050304_55%,_rgba(74,14,20,0.96)_100%)] opacity-[0.96]" />
      <div className="pointer-events-none fixed inset-0 -z-20 opacity-[0.22] mix-blend-soft-light [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12 lg:flex-row-reverse lg:items-stretch">
        {/* colonne vidéo – même hauteur que la carte en desktop */}
        <div className="flex w-full justify-center lg:w-[38%] lg:pl-4 h-[520px]">
          <ReelVideo />
        </div>

        {/* colonne contenu + spotlight */}
        <div
          className=" h-[520px] relative w-full flex-1 rounded-[2.4rem] border border-white/10 bg-black/40 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-7"
          dir="rtl"
        >
          <Spotlight />

          <div className="relative z-10 flex h-full flex-col gap-6">
            {/* header mini brand */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.32em] text-[#B8AEA5]">
                <span className="h-[1px] w-7 bg-gradient-to-l from-[#D9C5A5] to-transparent" />
                Socialux ✕ Brandivity
              </div>
              <div className="hidden text-[0.7rem] text-[#8F8680] sm:block">
                استراتيجية · تسويق · نمو
              </div>
            </div>

            {/* panneau animé + auto-scroll interne */}
            <div className="relative h-[65vh] sm:h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-black/65">
              <div
                ref={scrollRef}
                className="h-full overflow-y-auto overflow-x-visible p-5 sm:p-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={current.id}
                    custom={direction}
                    variants={panelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[0.78rem] text-[#E1D6CB]">
                        {current.eyebrow}
                      </p>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#F2ECE7]/25 bg-black/60 px-3 py-1 text-[0.65rem] text-[#EDE3DA]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D9C5A5] shadow-[0_0_12px_rgba(217,197,165,1)]" />
                        {current.label}
                      </div>
                    </div>

                    <h1 className="text-xl font-medium leading-snug sm:text-2xl md:text-[1.8rem] md:leading-snug">
                      {current.title}
                    </h1>

                    <p className="text-sm text-[#D4CFCA] leading-relaxed md:text-[0.95rem] md:leading-relaxed">
                      {current.body}
                    </p>

                    {current.bullets && (
                      <ul className="mt-2 space-y-2 text-[0.86rem] text-[#E2DBD5] leading-relaxed">
                        {current.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[#D9C5A5]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {(current.id === 'hero' || current.id === 'cost') && (
                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <MagneticButton
                          href="https://calendly.com/brandivity/qualification-meeting"
                          target="_blank"
                          rel="noreferrer"
                        >
                          احجز جلسة التدقيق المجانية
                        </MagneticButton>
                        <p className="max-w-xs text-[0.76rem] text-[#C4BDB7] leading-relaxed">
                          عدد الجلسات الشهري محدود. تحصل على تشخيص صريح وخطّة
                          عملية يمكنك الاستمرار بها معنا أو بمفردك.
                        </p>
                      </div>
                    )}

                    <div className="pt-2 text-[0.75rem] text-[#B9B1AA]">
                      {current.tag}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* barre d'étapes */}
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-[0.72rem] text-[#A79F98]">
                <span className="h-[1px] w-6 bg-gradient-to-l from-[#D9C5A5] to-transparent" />
                <span>المسار</span>
                <span className="text-[#E6DCD1]">
                  {index + 1} / {steps.length}
                </span>
              </div>

              <div className="flex flex-1 justify-end gap-2 sm:gap-3">
                {steps.map((step, i) => {
                  const active = i === index
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => goTo(i)}
                      className="group flex flex-1 flex-col items-center gap-1"
                    >
                      <div
                        className={`relative flex h-7 w-full items-center justify-center rounded-full border transition-all ${
                          active
                            ? 'border-[#D9C5A5] bg-[#D9C5A5]/15'
                            : 'border-white/10 bg-black/40 group-hover:border-[#D9C5A5]/70'
                        }`}
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full transition-all ${
                            active
                              ? 'scale-110 bg-[#D9C5A5] shadow-[0_0_12px_rgba(217,197,165,1)]'
                              : 'bg-[#7B726C]'
                          }`}
                        />
                      </div>
                      <span
                        className={`text-[0.63rem] ${
                          active ? 'text-[#F2ECE7]' : 'text-[#8F8680]'
                        }`}
                      >
                        {step.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
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
            href="https://calendly.com/brandivity/qualification-meeting"
            target="_blank"
            rel="noreferrer"
          >
            احجز الآن
          </MagneticButton>
        </div>
      </div>
    </main>
  )
}
