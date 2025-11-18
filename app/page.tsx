'use client'

import { Variants, motion } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom, ease: 'easeOut' },
  }),
}

const cardsParent: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// مكوّن الفيديو العمودي (Reel)
function ReelVideo() {
  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-black/60 p-3 backdrop-blur shadow-xl shadow-black/50">
      <div className="relative aspect-[9/16] w-[260px] md:w-[320px] overflow-hidden rounded-3xl bg-black">
        <video
          src="/socialux-brandivity.mp4"
          controls
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans font-light leading-relaxed">
      <div className="relative mx-auto flex max-w-6xl gap-6 px-4 md:px-8">
        {/* اليسار: فيديو ثابت على سطح المكتب */}
        <div className="sticky top-10 hidden h-fit shrink-0 pt-10 lg:block">
          <ReelVideo />
        </div>

        {/* اليمين: المحتوى القابل للتمرير (عربي فصحى / RTL) */}
        <div className="flex-1 pb-16 pt-10 space-y-16 md:space-y-20" dir="rtl">
          {/* القسم الافتتاحي (HERO) */}
          <section className="relative overflow-hidden rounded-2xl">
            {/* الخلفية المتوهّجة */}
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-[#9dff00] blur-3xl" />
              <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-fuchsia-500 blur-3xl" />
            </div>

            <div className="relative flex flex-col items-center justify-center text-right space-y-4">
              <motion.div
                initial="hidden"
                animate="visible"
                custom={0}
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-[0.2em] text-slate-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#9dff00]" />
                Socialux ✕ Brandivity
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="visible"
                custom={0.1}
                variants={fadeUp}
                className="text-center text-2xl font-medium leading-snug sm:text-4xl md:text-5xl md:leading-tight"
              >
                منافسوك لا يملكون منتجاً أفضل منك،
                <br />
                <span className="bg-gradient-to-r from-[#9dff00] via-lime-300 to-emerald-400 bg-clip-text text-transparent">
                  بل يملكون منظومة تسويق أوضح وأقوى.
                </span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                custom={0.25}
                variants={fadeUp}
                className="max-w-2xl text-center text-sm text-slate-300 leading-relaxed sm:text-base sm:leading-relaxed md:text-lg md:leading-loose"
              >
                Socialux سوشالاكس هي وكالة التسويق التي تدير حضورك اليومي.
                Brandivity برانديفيتي هي الشريك الاستراتيجي الذي يحدّد الاتجاه
                والأولويات. معاً، نحوّل علامتك التجارية، محتواك وحملاتك إلى
                منظومة واحدة مترابطة هدفها الأساسي: المبيعات والنمو، لا مجرد
                التفاعل والأرقام السطحية.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="visible"
                custom={0.4}
                variants={fadeUp}
                className="mt-2 flex flex-col items-center gap-4 sm:flex-row-reverse"
              >
                <a
                  href="#book"
                  className="inline-flex items-center justify-center rounded-full bg-[#9dff00] px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-lime-400/30 transition hover:-translate-y-0.5 hover:bg-lime-300"
                >
                  احجز جلسة مجانية
                </a>
                <p
                  className="text-xs text-slate-400 sm:text-sm leading-relaxed"
                  style={{ padding: '10px' }}
                >
                  تدقيق في العلامة التجارية والتسويق مع خطوات عملية واضحة – بدون
                  مبالغة أو وعود فارغة.
                </p>
              </motion.div>
            </div>
          </section>

          {/* فيديو للموبايل (غير ثابت) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex w-full justify-center lg:hidden"
          >
            <ReelVideo />
          </motion.div>

          {/* لماذا هذا الثنائي؟ */}
          <section className="border-t border-white/5 bg-slate-950/90 rounded-t-3xl">
            <div className="py-12 md:py-16 text-right">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={0}
                variants={fadeUp}
                className="ml-auto max-w-2xl space-y-4 md:space-y-6 leading-relaxed md:leading-loose"
              >
                <h2 className="text-2xl font-semibold md:text-3xl">
                  توقّف عن جمع مزوّدي خدمات وتسويق بشكل عشوائي،
                  <br />
                  <span className="text-slate-300">
                    وابدأ ببناء منظومة تسويقية واحدة متكاملة.
                  </span>
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed md:text-base md:leading-relaxed">
                  Socialux سوشالاكس تدير التسويق اليومي: المحتوى، وسائل التواصل
                  الاجتماعي، الحملات والإعلانات المدفوعة. Brandivity برانديفيتي
                  تبني الاستراتيجية، التحليل والأولويات. فريق واحد يعمل على
                  مؤشرات واضحة: الإيرادات، صفقات المبيعات وخط الأنابيب، وليس فقط
                  المشاهدات ونسب الوصول.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardsParent}
                className="mt-8 grid gap-5 md:grid-cols-3"
              >
                {[
                  {
                    title: 'وضوح استراتيجي',
                    desc: 'تحديد جمهورك المستهدف، عرضك الأساسي، وموقعك في السوق بصورة دقيقة بدل الرسائل العامة والضبابية.',
                  },
                  {
                    title: 'تنفيذ يومي منظّم',
                    desc: 'محتوى، منشورات وحملات متناسقة يديرها فريق واحد يفهم نشاطك التجاري وأهدافه.',
                  },
                  {
                    title: 'ربط التسويق بالمبيعات',
                    desc: 'قرارات التسويق مبنية على جودة العملاء المحتملين والصفقات والإيرادات، لا على مؤشرات سطحية فقط.',
                  },
                ].map((card) => (
                  <motion.div
                    key={card.title}
                    variants={cardItem}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-slate-50">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-slate-300">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Socialux سوشالاكس  */}
          <section className="border-t border-white/5 bg-slate-950">
            <div className="grid gap-10 py-12 md:grid-cols-2 md:py-16 text-right">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={0}
                variants={fadeUp}
                className="space-y-4 md:space-y-5 leading-relaxed md:leading-relaxed"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  وكالة تسويق · Socialux سوشالاكس
                </p>
                <h2 className="mt-1 text-2xl font-medium md:text-3xl">
                  Socialux سوشالاكس : تسويق
                  <span className="text-[#9dff00]">
                    {' '}
                    يحرّك علامتك التجارية.
                  </span>
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed md:text-base md:leading-relaxed">
                  Socialux سوشالاكس تخطّط، تنتج وتدير حضور علامتك التجارية
                  اليومي عبر المنصات: من وسائل التواصل الاجتماعي إلى الحملات
                  المدفوعة. الصورة واللغة والإيقاع التسويقي يخرجون من فريق واحد،
                  بطريقة متسقة ومستمرة.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed md:text-base md:leading-loose">
                  من الجداول التحريرية الشهرية، إلى حملات الإطلاق وبناء الهوية
                  الرقمية، الهدف هو أن تكون رسالتك واضحة، وحضورك ثابت، ومسارك
                  نحو العميل المثالي أقصر وأكثر وضوحاً – بدون أن تضطر لإدارة عدة
                  فرق ومنفذين منفصلين.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed"
              >
                <h3 className="text-base font-semibold text-slate-50">
                  ما الذي تتولّاه Socialux سوشالاكس عنك:
                </h3>
                <ul className="mt-3 space-y-2 text-slate-300 leading-relaxed">
                  <li>• استراتيجية وحضور متكامل على وسائل التواصل الاجتماعي</li>
                  <li>• إعداد المحتوى والإشراف على النشر والتفاعل</li>
                  <li>• تصميم المواد الإعلانية والحملات الإبداعية</li>
                  <li>• إعداد وتحسين الحملات المدفوعة على المنصات المناسبة</li>
                  <li>• تقارير شهرية تركّز على النتائج والأثر الفعلي</li>
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Brandivity برانديفيتي  */}
          <section className="border-t border-white/5 bg-slate-950/95">
            <div className="grid gap-10 py-12 md:grid-cols-2 md:py-16 text-right">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="order-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed md:order-1"
              >
                <h3 className="text-base font-semibold text-slate-50">
                  ما الذي ترسّخه Brandivity برانديفيتي في منظومتك:
                </h3>
                <ul className="mt-3 space-y-2 text-slate-300 leading-relaxed">
                  <li>• تشخيص عميق لوضع التسويق والمبيعات الحالي لديك</li>
                  <li>
                    • تحديد أولويات واضحة: ما ينبغي إيقافه، إصلاحه، أو توسيعه
                  </li>
                  <li>• استراتيجية متكاملة للمحتوى والحملات والقنوات</li>
                  <li>
                    • إطار قياس مرتبط بالمبيعات ونمو الأعمال، لا الظهور فقط
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={0}
                variants={fadeUp}
                className="order-1 md:order-2 space-y-4 md:space-y-5 leading-relaxed md:leading-loose"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  شريك استراتيجي · Brandivity برانديفيتي
                </p>
                <h2 className="mt-1 text-2xl font-medium md:text-3xl">
                  Brandivity برانديفيتي : تحويل التسويق إلى
                  <span className="text-[#9dff00]"> محرّك نمو حقيقي.</span>
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed md:text-base md:leading-relaxed">
                  Brandivity برانديفيتي تحلّل العرض، والمنتج، وقمع المبيعات،
                  والحملات الحالية، ثم تبني استراتيجية تربط كل ذلك بأهداف
                  الإيرادات والنمو. النتيجة: قرارات مبنية على بيانات واضحة بدلاً
                  من الانطباعات اللحظية.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed md:text-base md:leading-loose">
                  من التدقيق الأولي إلى خريطة الطريق التنفيذية، الهدف هو أن يعمل
                  جهد Socialux سوشالاكس اليومي في خدمة خطة استراتيجية متفق
                  عليها، لا وفق ردود فعل قصيرة المدى أو أسئلة مثل: "بماذا سننشر
                  هذا الأسبوع؟".
                </p>
              </motion.div>
            </div>
          </section>

          {/* تكلفة غياب النظام */}
          <section className="border-t border-white/5 bg-slate-950">
            <div className="py-12 md:py-16 text-right">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={0}
                variants={fadeUp}
                className="ml-auto max-w-2xl space-y-4 md:space-y-6 leading-relaxed md:leading-loose"
              >
                <h2 className="text-2xl font-semibold md:text-3xl">
                  تكلفة "ممارسة التسويق" بدون نظام واضح.
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed md:text-base md:leading-relaxed">
                  هذه التكلفة لا تظهر كبند واحد في التقارير، لكنها تتوزع في كل
                  مكان: عملاء محتملون غير مناسبين، رسائل غير دقيقة، حملات لا
                  تبني على بعضها، وسنوات تمر على شكل تجارب متفرّقة بدلاً من خطة
                  يتم تنفيذها خطوة بخطوة.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardsParent}
                className="mt-6 grid gap-4 md:grid-cols-2"
              >
                {[
                  'الاضطرار للمنافسة على السعر لأن القيمة لا تُقدَّم بشكل واضح.',
                  'المحتوى، الإعلانات والموقع الإلكتروني يعكسون رسائل وصوراً متباعدة.',
                  'وصول عملاء محتملين غير مناسبين أو غير جاهزين للشراء.',
                  'ضعف الربط بين التسويق والمبيعات وغياب رؤية مشتركة للأرقام.',
                  'انطباع سنوي بأنكم "جرّبتم أشياء كثيرة" بدلاً من تنفيذ خطة محددة.',
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={cardItem}
                    className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-4 text-sm text-slate-200 leading-relaxed"
                  >
                    <span className="mt-1 text-red-400">✕</span>
                    <p>{item}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                id="book"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={0.3}
                variants={fadeUp}
                className="mt-10 rounded-2xl border border-[#9dff00]/30 bg-[#9dff00]/5 p-6 space-y-3 leading-relaxed md:leading-relaxed"
              >
                <h3 className="text-lg font-semibold text-[#eaffb5]">
                  المشكلة ليست في عدد المنشورات، بل في غياب نظام استراتيجي
                  وتنفيذي واحد.
                </h3>
                <p className="text-sm text-slate-100 md:text-base md:leading-relaxed">
                  نبدأ بتدقيق مشترك في العلامة التجارية، منظومة التسويق وقمع
                  المبيعات. تغادر الجلسة ولديك خريطة واضحة لما ينبغي إيقافه، وما
                  ينبغي تحسينه، وأي خطوات قادرة فعلاً على تغيير منحنى النمو
                  لديك.
                </p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row-reverse sm:items-center sm:justify-between">
                  <a
                    href="https://calendly.com/fares-azem/qualification-meeting"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#9dff00] px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-md shadow-lime-300/40 transition hover:-translate-y-0.5 hover:bg-lime-200"
                    style={{ textAlign: 'center' }}
                  >
                    احجز جلسة التدقيق المجانية
                  </a>
                  <p className="text-xs text-slate-300 sm:text-sm leading-relaxed">
                    عدد الجلسات الشهري محدود. في أسوأ الأحوال، تحصل على تشخيص
                    صريح وخطّة عملية يمكنك الاستمرار بها معنا أو بمفردك.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* الفوتر */}
          <footer className="border-t border-white/10 bg-black/90">
            <div className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between text-right">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-slate-500">
                  Socialux ✕ Brandivity
                </p>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  وكالة تسويق وشريك استراتيجي يعملان كفريق واحد على نمو نشاطك
                  التجاري.
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 text-sm text-slate-400 md:items-end">
                <a
                  href="mailto:info@socialux.media"
                  className="hover:text-slate-100 hover:underline"
                >
                  info@socialux.media
                </a>
                <p className="text-xs text-slate-500">
                  {new Date().getFullYear()} Socialux &amp; Brandivity
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
