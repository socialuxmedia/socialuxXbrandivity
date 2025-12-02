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

  const [submitting, setSubmitting] = useState(false)

  const [isBookingOpen, setIsBookingOpen] = useState(false)

  // ref pour le container scrollable
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const calendlyUrl = 'https://calendly.com/brandivity/qualification-meeting'

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      fullName: formData.get('fullName') as string,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || null,
      company: (formData.get('company') as string) || null,
      socialOrWebsite: (formData.get('socialOrWebsite') as string) || null,
      employeesCount: (formData.get('employeesCount') as string) || null,
      hasInternalMarketingTeam:
        (formData.get('hasInternalMarketingTeam') as string) || null,
      annualMarketingBudget:
        (formData.get('annualMarketingBudget') as string) || null,
      needs: formData.getAll('needs') as string[],
    }

    try {
      const res = await fetch('/api/odoo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        console.error('Odoo API error:', data)
        setSubmitting(false)
        window.alert('حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.')
        return
      }

      setSubmitting(false)

      // message de succès
      window.alert('تم إرسال البيانات بنجاح. سيتم تحويلك الآن إلى صفحة الحجز.')

      // redirection dans le même onglet (ne sera pas bloquée)
      setIsBookingOpen(false)
      window.location.href = calendlyUrl
    } catch (err) {
      console.error('Network error while sending data to Odoo:', err)
      setSubmitting(false)
      window.alert(
        'تعذّر الاتصال بالخادم. تأكد من الاتصال بالإنترنت ثم حاول مرة أخرى.'
      )
    }
  }

  // auto-scroll vertical + passage à l'étape suivante
  useEffect(() => {
    let frameId: number
    let delayId: number | null = null
    let timeoutId: number | null = null

    // temps d'affichage au début AVANT de commencer à scroller
    const viewDelay = 2000 // 2 secondes

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
      {showIntro && (
        <IntroSequence
          onFinish={() => setShowIntro(false)}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      )}

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
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setIsBookingOpen(true)
                          }}
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
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setIsBookingOpen(true)
            }}
          >
            احجز الآن
          </MagneticButton>
        </div>
      </div>
      {/* MODAL DE رِزيرﭬيشن */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div
            dir="rtl"
            className="relative w-[96%] max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border border-white/10 bg-[#050304] px-5 py-6 sm:px-8 sm:py-8 shadow-[0_28px_120px_rgba(0,0,0,0.95)]"
          >
            {/* bouton close */}
            <button
              type="button"
              onClick={() => setIsBookingOpen(false)}
              className="absolute left-4 top-4 text-xs text-[#B8AEA5] hover:text-[#F2ECE7]"
            >
              إغلاق
            </button>

            {/* HEADER */}
            <div className="mb-4 flex flex-col gap-2 pr-6 shrink-0">
              <p className="text-[0.8rem] uppercase tracking-[0.28em] text-[#B8AEA5]">
                Socialux ✕ Brandivity
              </p>
              <h2 className="text-lg sm:text-xl font-semibold text-[#F2ECE7]">
                قبل الحجز، نحتاج بعض المعلومات الأساسية
              </h2>
              <p className="text-[0.8rem] text-[#D4CFCA]">
                تعبئة هذا النموذج تساعدنا نجهّز الجلسة بناءً على وضعكم الحالي
                بدل ما نضيع أول 15 دقيقة في الأسئلة العامة.
              </p>
            </div>

            {/* CONTENU SCROLLABLE */}
            <form
              onSubmit={handleBookingSubmit}
              className="mt-2 flex-1 overflow-y-auto pr-1 space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* الاسم */}
                <div>
                  <label className="mb-1 block text-[0.78rem] text-[#CFC6BD]">
                    الاسم <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="fullName"
                    required
                    className="w-full rounded-2xl border border-white/12 bg-black/60 px-3 py-2.5 text-sm text-[#F2ECE7] outline-none focus:border-[#D9C5A5] focus:ring-1 focus:ring-[#D9C5A5]/70"
                    placeholder=""
                  />
                </div>

                {/* رقم الهاتف */}
                <div>
                  <label className="mb-1 block text-[0.78rem] text-[#CFC6BD]">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full rounded-2xl border border-white/12 bg-black/60 px-3 py-2.5 text-sm text-[#F2ECE7] outline-none focus:border-[#D9C5A5] focus:ring-1 focus:ring-[#D9C5A5]/70"
                    placeholder=""
                  />
                </div>

                {/* البريد الإلكتروني (اختياري) */}
                <div>
                  <label className="mb-1 block text-[0.78rem] text-[#CFC6BD]">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full rounded-2xl border border-white/12 bg-black/60 px-3 py-2.5 text-sm text-[#F2ECE7] outline-none focus:border-[#D9C5A5] focus:ring-1 focus:ring-[#D9C5A5]/70"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                {/* اسم الشركة (اختياري) */}
                <div>
                  <label className="mb-1 block text-[0.78rem] text-[#CFC6BD]">
                    اسم الشركة (اختياري)
                  </label>
                  <input
                    name="company"
                    className="w-full rounded-2xl border border-white/12 bg-black/60 px-3 py-2.5 text-sm text-[#F2ECE7] outline-none focus:border-[#D9C5A5] focus:ring-1 focus:ring-[#D9C5A5]/70"
                    placeholder="مطعم، عيادة، متجر إلكتروني..."
                  />
                </div>

                {/* صفحة السوشال / الموقع (اختياري) */}
                <div className="md:col-span-2">
                  <label className="mb-1 block text-[0.78rem] text-[#CFC6BD]">
                    صفحتك على مواقع التواصل / موقعك الإلكتروني (اختياري)
                  </label>
                  <input
                    name="socialOrWebsite"
                    className="w-full rounded-2xl border border-white/12 bg-black/60 px-3 py-2.5 text-sm text-[#F2ECE7] outline-none focus:border-[#D9C5A5] focus:ring-1 focus:ring-[#D9C5A5]/70"
                    placeholder="رابط إنستغرام / فيسبوك / موقع"
                  />
                </div>

                {/* عدد الموظفين */}
                <div>
                  <label className="mb-1 block text-[0.78rem] text-[#CFC6BD]">
                    عدد الموظفين <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="employeesCount"
                    className="w-full rounded-2xl border border-white/12 bg-black/60 px-3 py-2.5 text-sm text-[#F2ECE7] outline-none focus:border-[#D9C5A5] focus:ring-1 focus:ring-[#D9C5A5]/70"
                    placeholder="اختر تقريباً عدد الموظفين"
                  />
                  {/* <select
                    name="employeesCount"
                    required
                    className="w-full rounded-2xl border border-white/12 bg-black/60 px-3 py-2.5 text-sm text-[#F2ECE7] outline-none focus:border-[#D9C5A5] focus:ring-1 focus:ring-[#D9C5A5]/70"
                  >
                    <option value="">اختر تقريباً عدد الموظفين</option>
                    <option value="1-5">من 1 إلى 5</option>
                    <option value="6-20">من 6 إلى 20</option>
                    <option value="21-50">من 21 إلى 50</option>
                    <option value="51-200">من 51 إلى 200</option>
                    <option value="200+">أكثر من 200</option>
                  </select> */}
                </div>

                {/* فريق تسويق داخلي */}
                <div>
                  <label className="mb-2 block text-[0.78rem] text-[#CFC6BD]">
                    عندكم فريق تسويق داخلي؟{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-3 text-[0.82rem] text-[#E2DBD5]">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasInternalMarketingTeam"
                        value="yes"
                        required
                        className="h-4 w-4 accent-[#4A0E14]"
                      />
                      <span>نعم</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasInternalMarketingTeam"
                        value="no"
                        className="h-4 w-4 accent-[#4A0E14]"
                      />
                      <span>لا</span>
                    </label>
                  </div>
                </div>

                {/* ميزانية التسويق السنوية */}
                <div>
                  <label className="mb-1 block text-[0.78rem] text-[#CFC6BD]">
                    ميزانية التسويق السنوية (تقريبياً){' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="annualMarketingBudget"
                    className="w-full rounded-2xl border border-white/12 bg-black/60 px-3 py-2.5 text-sm text-[#F2ECE7] outline-none focus:border-[#D9C5A5] focus:ring-1 focus:ring-[#D9C5A5]/70"
                    placeholder="اختر نطاقاً تقريبياً"
                  />
                  {/* <select
                    name="annualMarketingBudget"
                    required
                    className="w-full rounded-2xl border border-white/12 bg-black/60 px-3 py-2.5 text-sm text-[#F2ECE7] outline-none focus:border-[#D9C5A5] focus:ring-1 focus:ring-[#D9C5A5]/70"
                  >
                    <option value="">اختر نطاقاً تقريبياً</option>
                    <option value="<10k">أقل من 10,000$</option>
                    <option value="10k-50k">بين 10,000$ و 50,000$</option>
                    <option value="50k-150k">بين 50,000$ و 150,000$</option>
                    <option value="150k+">أكثر من 150,000$</option>
                  </select> */}
                </div>

                {/* حاجاتك */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[0.78rem] text-[#CFC6BD]">
                    حاجاتك (يمكن اختيار أكثر من خيار){' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 gap-2 text-[0.82rem] text-[#E2DBD5] sm:grid-cols-2">
                    {[
                      'إنشاء فكرة',
                      'كتابة وإعداد محتوى',
                      'تصوير',
                      'تحرير',
                      'تسويق أوفلاين',
                      'تسويق أونلاين',
                      'حملات موسمية',
                      'حملات سنوية ثابتة',
                    ].map((label, idx) => (
                      <label
                        key={label}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-2"
                      >
                        <input
                          type="checkbox"
                          name="needs"
                          value={label}
                          // required sur UN seul checkbox pour forcer au moins un choix
                          className="h-4 w-4 accent-[#4A0E14]"
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* FOOTER BOUTONS + DISCLAIMER */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="rounded-full border border-white/18 px-5 py-2.5 text-[0.8rem] text-[#D4CFCA] hover:border-[#F2ECE7]/70 hover:text-[#F2ECE7]"
                >
                  رجوع
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-[#4A0E14] px-6 py-2.5 text-[0.8rem] font-semibold text-[#F2ECE7] shadow-[0_16px_60px_rgba(0,0,0,0.9)] hover:-translate-y-[1px] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? 'جاري إرسال البيانات...'
                    : 'متابعة إلى صفحة الحجز في Calendly'}
                </button>
              </div>

              <p className="mt-2 text-[0.7rem] text-[#9E948C]">
                هذه البيانات لا تُستخدم لأي إعلانات عشوائية. الهدف الوحيد هو
                تجهيز جلسة تدقيق حقيقية مبنية على وضع نشاطكم الحالي.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
