// app/services/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import PageHeroBanner from '@/components/common/PageHeroBanner'
import { ServiceFAQAccordion } from '@/components/sections/ServiceFAQAccordion'
import type { Metadata } from 'next'

// ── Static data (move to data/services.ts for production) ──────────────────
const servicesData: Record<string, {
  slug: string
  category: string
  title: string
  tagline: string
  heroImage: string
  overview: string
  benefits: string[]
  procedure: { step: string; detail: string }[]
  stats: { label: string; value: string }[]
  faqs: { question: string; answer: string }[]
  relatedSlugs: string[]
}> = {
  'cosmetic': {
    slug: 'cosmetic',
    category: 'YOUR APPEARANCE',
    title: 'Cosmetic Dermatology',
    tagline: 'Enhance your natural beauty with precision and artistry.',
    heroImage: '/images/services/cosmetic-hero.jpg',
    overview: `Cosmetic dermatology focuses on improving the appearance of skin, hair, and nails.
      Our expert dermatologists use the latest evidence-based techniques to deliver results that
      look completely natural. Whether you want to address fine lines, uneven skin tone, acne scars,
      or simply want a refreshed, youthful glow — we design a treatment plan exclusively for you.`,
    benefits: [
      'Personalised treatment plans for every skin type',
      'Non-invasive and minimally invasive options available',
      'Visible results with minimal downtime',
      'Expert doctors with 15+ years of experience',
      'FDA-approved treatments and technologies',
      'Comprehensive follow-up and aftercare',
    ],
    procedure: [
      { step: 'Consultation', detail: 'We assess your skin type, concerns, and goals during a 30-minute in-depth consultation.' },
      { step: 'Custom Plan', detail: 'A personalised treatment protocol is designed, including timeline and expected outcomes.' },
      { step: 'Treatment', detail: 'Procedure is carried out by a certified dermatologist in our state-of-the-art facility.' },
      { step: 'Recovery', detail: 'Aftercare instructions are provided. Most patients resume normal activities the same day.' },
      { step: 'Follow-up', detail: 'Progress reviews are scheduled to track results and adjust the plan if needed.' },
    ],
    stats: [
      { label: 'Patients Treated', value: '2,000+' },
      { label: 'Success Rate', value: '98%' },
      { label: 'Avg. Sessions', value: '3–5' },
      { label: 'Recovery Time', value: '24–48 hrs' },
    ],
    faqs: [
      { question: 'Are cosmetic treatments painful?', answer: 'Most cosmetic procedures involve minimal discomfort. Topical anaesthetics are applied beforehand to ensure a comfortable experience.' },
      { question: 'How long do results last?', answer: 'Results vary by treatment. Many patients enjoy results for 6–18 months, with maintenance sessions extending longevity.' },
      { question: 'Is there any downtime?', answer: 'Most non-invasive cosmetic treatments require zero downtime. Some procedures may cause mild redness for 24–48 hours.' },
    ],
    relatedSlugs: ['anti-aging', 'medical'],
  },

  'moles-and-skin': {
    slug: 'moles-and-skin',
    category: 'SKIN PROBLEMS',
    title: 'Moles and Skin',
    tagline: 'Safe, precise diagnosis and removal of skin irregularities.',
    heroImage: '/images/services/moles-hero.jpg',
    overview: `Moles, skin tags, warts, and cysts are extremely common but can sometimes signal
      deeper health concerns. Our dermatologists perform thorough dermoscopic evaluation of every
      lesion before recommending treatment. Removal is performed with precision techniques that
      minimise scarring and ensure complete clearance.`,
    benefits: [
      'Dermoscopic evaluation for every lesion',
      'Histopathology available for suspicious moles',
      'Minimal-scar removal techniques',
      'Same-day minor procedure appointments',
      'Comprehensive skin cancer screening',
      'Expert mole mapping for at-risk patients',
    ],
    procedure: [
      { step: 'Skin Evaluation', detail: 'Full-body mole mapping and dermoscopy to identify any suspicious lesions.' },
      { step: 'Biopsy (if needed)', detail: 'For atypical moles, a biopsy sample is sent for histopathology analysis.' },
      { step: 'Removal', detail: 'Surgical excision, shave removal, or laser ablation depending on lesion type and location.' },
      { step: 'Wound Care', detail: 'Detailed aftercare instructions provided to optimise healing and minimise scarring.' },
      { step: 'Results', detail: 'Histopathology results reviewed and discussed. Follow-up plan created if required.' },
    ],
    stats: [
      { label: 'Procedures Done', value: '5,000+' },
      { label: 'Scar-Free Rate', value: '96%' },
      { label: 'Procedure Time', value: '15–30 min' },
      { label: 'Recovery', value: '3–7 days' },
    ],
    faqs: [
      { question: 'Should I be worried about my mole?', answer: 'Watch for the ABCDE signs: Asymmetry, Border irregularity, Colour variation, Diameter >6mm, and Evolution. Book a check-up if any apply.' },
      { question: 'Will mole removal leave a scar?', answer: 'Our techniques are designed to minimise scarring. Most patients see only a faint, flat scar that fades within months.' },
      { question: 'Is the procedure done under anaesthesia?', answer: 'Local anaesthesia is applied to the area, so you feel no pain during the procedure.' },
    ],
    relatedSlugs: ['medical', 'cosmetic'],
  },

  'medical': {
    slug: 'medical',
    category: 'SKIN, HAIR AND NAIL',
    title: 'Medical Dermatology',
    tagline: 'Comprehensive care for all medical skin, hair, and nail conditions.',
    heroImage: '/images/services/medical-hero.jpg',
    overview: `Medical dermatology encompasses the diagnosis and treatment of conditions affecting
      the skin, scalp, hair, and nails. From chronic conditions like psoriasis and eczema to
      infections and autoimmune disorders — our team delivers evidence-based care with compassion.
      We treat patients of all ages with the latest clinical protocols.`,
    benefits: [
      'Treatment for 50+ dermatological conditions',
      'Paediatric and adult dermatology',
      'Chronic disease management plans',
      'Patch testing for contact allergies',
      'Scalp biopsy and trichoscopy for hair disorders',
      'Nail biopsy for fungal and structural conditions',
    ],
    procedure: [
      { step: 'History & Examination', detail: 'Detailed medical history and full skin examination to identify the condition.' },
      { step: 'Investigations', detail: 'Blood tests, patch tests, biopsies, or cultures as required for accurate diagnosis.' },
      { step: 'Diagnosis', detail: 'Clear diagnosis communicated with explanation of the condition and its triggers.' },
      { step: 'Treatment', detail: 'Prescription medications, topical therapies, phototherapy, or procedural interventions.' },
      { step: 'Long-term Management', detail: 'Lifestyle modifications and maintenance plans to prevent flares and recurrence.' },
    ],
    stats: [
      { label: 'Conditions Treated', value: '50+' },
      { label: 'Patient Satisfaction', value: '97%' },
      { label: 'Years Experience', value: '15+' },
      { label: 'Age Groups', value: 'All Ages' },
    ],
    faqs: [
      { question: 'What conditions does medical dermatology treat?', answer: 'Acne, eczema, psoriasis, rosacea, vitiligo, alopecia, fungal infections, urticaria, and many more skin, hair and nail disorders.' },
      { question: 'Do I need a referral to see a dermatologist?', answer: 'No referral is required. You can book a direct consultation with our dermatologists at any time.' },
      { question: 'Are medical dermatology treatments covered by insurance?', answer: 'Most medical dermatology treatments are covered under standard health insurance. We can provide documentation for claims.' },
    ],
    relatedSlugs: ['moles-and-skin', 'anti-aging'],
  },

  'anti-aging': {
    slug: 'anti-aging',
    category: 'WRINKLES AND LINES',
    title: 'Anti Aging',
    tagline: 'Turn back the clock with science-backed rejuvenation treatments.',
    heroImage: '/images/services/anti-aging-hero.jpg',
    overview: `Ageing is natural, but looking tired or older than you feel doesn't have to be.
      Our anti-aging treatments use the latest injectables, energy-based devices, and regenerative
      therapies to restore facial harmony, smooth wrinkles, and rejuvenate skin texture — all while
      maintaining a completely natural appearance. Your results will look refreshed, not done.`,
    benefits: [
      'Natural-looking results — not frozen or overdone',
      'Botox, fillers, threads, and laser options',
      'Combination treatment protocols for best results',
      'Experienced injectors with artistic precision',
      'Pain management protocols for comfort',
      'Gradual, maintainable results over time',
    ],
    procedure: [
      { step: 'Facial Analysis', detail: 'Digital facial mapping to identify areas of concern, volume loss, and dynamic lines.' },
      { step: 'Treatment Design', detail: 'A bespoke plan is created using the optimal combination of anti-aging modalities.' },
      { step: 'Procedure', detail: 'Injections and energy treatments performed with precision. Session lasts 30–60 minutes.' },
      { step: 'Observation', detail: 'Short post-procedure observation period. Ice and aftercare instructions provided.' },
      { step: 'Review', detail: 'Two-week review to assess results and perform any minor touch-ups if needed.' },
    ],
    stats: [
      { label: 'Procedures Done', value: '3,500+' },
      { label: 'Patient Return Rate', value: '92%' },
      { label: 'Results Duration', value: '6–18 mo' },
      { label: 'Session Time', value: '30–60 min' },
    ],
    faqs: [
      { question: 'What is the difference between Botox and fillers?', answer: 'Botox relaxes muscles to smooth dynamic wrinkles (forehead, crow\'s feet). Fillers restore lost volume and fill static lines (nasolabial folds, lips).' },
      { question: 'How long do anti-aging treatments last?', answer: 'Botox typically lasts 3–4 months. Fillers can last 9–18 months depending on the product and area treated.' },
      { question: 'At what age should I start anti-aging treatments?', answer: 'Preventive treatments can begin in the late 20s. Most patients start in their 30s. There is no upper age limit — it\'s about your goals.' },
    ],
    relatedSlugs: ['cosmetic', 'medical'],
  },
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const svc = servicesData[params.slug]
  if (!svc) return {}
  return {
    title: `${svc.title} | Derma Clinic Bengaluru`,
    description: svc.tagline,
  }
}

// ── JSON-LD Schema ──────────────────────────────────────────────────────────
function ServiceSchema({ svc }: { svc: typeof servicesData[string] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: svc.title,
    description: svc.overview.slice(0, 200),
    procedureType: 'https://health-lifesci.schema.org/PhysicianProcedure',
    status: 'https://health-lifesci.schema.org/ActiveActionStatus',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// ── PAGE COMPONENT ──────────────────────────────────────────────────────────
export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const svc = servicesData[params.slug]
  if (!svc) notFound()

  const related = svc.relatedSlugs
    .map(s => servicesData[s])
    .filter(Boolean)

  return (
    <>
      <ServiceSchema svc={svc} />

      {/* Hero Banner */}
      <PageHeroBanner
        title={svc.title}
        subtitle={svc.tagline}
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: svc.title }]}
      />

      {/* ── OVERVIEW ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={svc.heroImage}
              alt={svc.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Text */}
          <div>
            <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
              style={{ fontFamily: 'var(--font-body)' }}>
              {svc.category}
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#2C2C2C', fontWeight: 400 }}
              className="mb-4">
              {svc.title}
            </h2>
            <div className="w-10 h-[2px] bg-[#C9A882] mb-6" />
            <p className="text-[#555] leading-relaxed text-sm mb-8"
              style={{ fontFamily: 'var(--font-body)', whiteSpace: 'pre-line' }}>
              {svc.overview}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-widest transition-all duration-300 hover:opacity-90"
              style={{ background: '#8B7355', color: '#fff', fontFamily: 'var(--font-body)' }}
            >
              Book Consultation <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <section className="py-14 px-6" style={{ background: '#F5EDE3' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {svc.stats.map((stat, i) => (
            <div key={i}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#8B7355', fontWeight: 400 }}>
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-widest mt-1 text-[#666]"
                style={{ fontFamily: 'var(--font-body)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
            style={{ fontFamily: 'var(--font-body)' }}>
            WHY CHOOSE US
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#2C2C2C', fontWeight: 400 }}>
            Benefits of {svc.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {svc.benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-4 p-6 border border-[#EDE0D0] hover:border-[#C9A882] transition-colors duration-300">
              <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#8B7355' }} />
              <p className="text-sm text-[#444] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCEDURE STEPS ──────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-16" style={{ background: '#F9F6F2' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
              style={{ fontFamily: 'var(--font-body)' }}>
              WHAT TO EXPECT
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#2C2C2C', fontWeight: 400 }}>
              The Treatment Journey
            </h2>
          </div>
          <div className="flex flex-col gap-0">
            {svc.procedure.map((step, i) => (
              <div key={i} className="flex gap-8 group">
                {/* Step number + vertical line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-white text-sm font-medium transition-colors duration-300 group-hover:bg-[#6B5A42]"
                    style={{ background: '#8B7355', fontFamily: 'var(--font-body)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < svc.procedure.length - 1 && (
                    <div className="w-[1px] flex-1 my-2" style={{ background: '#D4B896' }} />
                  )}
                </div>
                {/* Content */}
                <div className="pb-10 flex-1">
                  <h3 className="font-semibold text-[#2C2C2C] mb-2"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}>
                    {step.step}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}>
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-16 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
            style={{ fontFamily: 'var(--font-body)' }}>
            COMMON QUESTIONS
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#2C2C2C', fontWeight: 400 }}>
            Frequently Asked
          </h2>
        </div>
        <ServiceFAQAccordion faqs={svc.faqs} />
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-20 px-6 lg:px-16" style={{ background: '#F5EDE3' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center mb-12"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#2C2C2C', fontWeight: 400 }}>
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map(rel => (
                <Link key={rel.slug} href={`/services/${rel.slug}`}
                  className="group flex items-center gap-6 p-6 bg-white border border-[#EDE0D0] hover:border-[#8B7355] hover:shadow-md transition-all duration-300">
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                    <Image src={rel.heroImage} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#8B7355] mb-1" style={{ fontFamily: 'var(--font-body)' }}>{rel.category}</p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#2C2C2C', fontWeight: 400 }}>{rel.title}</h3>
                    <span className="text-xs text-[#8B7355] flex items-center gap-1 mt-2" style={{ fontFamily: 'var(--font-body)' }}>
                      View Service <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOOK CTA ─────────────────────────────────────────────── */}
      <section className="py-16 px-6 text-center" style={{ background: '#8B7355' }}>
        <h2 className="text-white mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 400 }}>
          Ready to Start Your Treatment?
        </h2>
        <p className="text-white/75 mb-8 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
          Book a consultation today and get a personalised plan.
        </p>
        <Link href="/contact"
          className="inline-flex items-center gap-2 bg-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#F5EDE3] transition-colors duration-300"
          style={{ color: '#8B7355', fontFamily: 'var(--font-body)' }}>
          Book Consultation <ArrowRight size={13} />
        </Link>
      </section>
    </>
  )
}
