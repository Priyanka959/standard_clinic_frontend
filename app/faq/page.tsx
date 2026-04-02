'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import PageHeroBanner from '@/components/common/PageHeroBanner'

const allFAQs = [
  // ACNE
  { id: 1, category: 'Acne', question: 'What causes adult acne?', answer: 'Adult acne is primarily caused by hormonal fluctuations, stress, diet, and sometimes underlying medical conditions like PCOS. Unlike teenage acne, adult acne tends to appear around the chin, jawline, and cheeks.' },
  { id: 2, category: 'Acne', question: 'How long does acne treatment take?', answer: 'Most patients see significant improvement within 6–8 weeks of starting treatment. Full clearance can take 3–6 months depending on severity. Consistency with the prescribed regimen is key.' },
  { id: 3, category: 'Acne', question: 'Can diet affect acne?', answer: 'Yes. High-glycaemic foods, dairy, and processed foods can worsen acne in susceptible individuals. We recommend a diet rich in antioxidants, omega-3 fatty acids, and low-glycaemic foods.' },
  { id: 4, category: 'Acne', question: 'Are acne scars treatable?', answer: 'Absolutely. We offer laser resurfacing, microneedling, chemical peels, and dermal fillers to significantly improve the appearance of acne scars.' },

  // HAIR
  { id: 5, category: 'Hair', question: 'What are the causes of hair fall?', answer: 'Hair fall can result from nutritional deficiencies (iron, vitamin D, zinc), thyroid disorders, PCOS, stress (telogen effluvium), and genetic androgenetic alopecia.' },
  { id: 6, category: 'Hair', question: 'Is PRP treatment effective for hair loss?', answer: 'PRP (Platelet-Rich Plasma) therapy is highly effective for androgenetic alopecia and alopecia areata. Most patients see noticeable thickening after 3–4 sessions, with results lasting 12–18 months.' },
  { id: 7, category: 'Hair', question: 'How many PRP sessions will I need?', answer: 'A typical course involves 3–4 sessions spaced 4–6 weeks apart, followed by maintenance sessions every 6 months. Individual requirements vary based on the degree of hair loss.' },
  { id: 8, category: 'Hair', question: 'What is the difference between PRP and hair transplant?', answer: 'PRP is a non-surgical treatment that stimulates existing hair follicles. A hair transplant surgically moves follicles from a donor area. PRP is ideal for early-stage loss; transplant for advanced baldness.' },

  // LASER
  { id: 9, category: 'Laser', question: 'Does laser therapy hurt?', answer: 'Most patients describe laser treatments as a mild snapping sensation, like a rubber band. Topical numbing cream is applied 30–45 minutes before the procedure to maximise comfort.' },
  { id: 10, category: 'Laser', question: 'How many laser sessions do I need?', answer: 'The number of sessions depends on the condition being treated. Laser hair removal typically requires 6–8 sessions. Skin resurfacing and pigmentation treatments usually need 3–5 sessions.' },
  { id: 11, category: 'Laser', question: 'What is the recovery time after laser treatment?', answer: 'Recovery varies by laser type. Non-ablative lasers have minimal downtime (1–2 days of mild redness). Ablative resurfacing may require 5–7 days of recovery.' },
  { id: 12, category: 'Laser', question: 'Can laser treatments be done on Indian skin?', answer: 'Yes. We use lasers specifically calibrated for Fitzpatrick skin types IV–VI, which are common in Indian patients. Our dermatologists are experienced with all skin tones.' },

  // SKIN
  { id: 13, category: 'Skin', question: 'What is the best sunscreen for Indian skin?', answer: 'We recommend a broad-spectrum SPF 50+ with PA+++ rating. Look for formulations with niacinamide or zinc oxide. Gel-based sunscreens suit oily skin; cream-based suit dry skin.' },
  { id: 14, category: 'Skin', question: 'How can I reduce dark spots?', answer: 'Dark spots respond well to a combination of topical agents (vitamin C, niacinamide, kojic acid), chemical peels, and laser treatments. Sun protection is essential throughout treatment.' },
  { id: 15, category: 'Skin', question: 'What is the difference between a chemical peel and microneedling?', answer: 'Chemical peels use acids to exfoliate and resurface skin. Microneedling uses tiny needles to stimulate collagen production. Both treat acne scars and pigmentation but work differently.' },
  { id: 16, category: 'Skin', question: 'How often should I get a professional skin treatment?', answer: 'Maintenance treatments every 4–6 weeks are ideal for most skin conditions. Your dermatologist will create a schedule based on your skin type and treatment goals.' },

  // ANTI-AGING
  { id: 17, category: 'Anti-Aging', question: 'What age should I start anti-aging treatments?', answer: 'Preventive treatments can begin in the late 20s. Most patients benefit from starting in their 30s. There is no upper age limit — results are visible at any age.' },
  { id: 18, category: 'Anti-Aging', question: 'How long do Botox results last?', answer: 'Botox results typically last 3–4 months. With regular treatment, the muscles become conditioned and results may last longer over time.' },
  { id: 19, category: 'Anti-Aging', question: 'Are dermal fillers safe?', answer: 'Yes. FDA-approved hyaluronic acid fillers are safe, reversible (using hyaluronidase if needed), and provide natural-looking results. All procedures are performed by certified doctors.' },
  { id: 20, category: 'Anti-Aging', question: 'Will I look unnatural after anti-aging treatment?', answer: 'Our philosophy is enhancement, not transformation. We use conservative volumes and precise placement techniques to ensure results look refreshed and completely natural.' },
]

const categories = ['All', 'Acne', 'Hair', 'Laser', 'Skin', 'Anti-Aging']

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery]       = useState('')
  const [openId, setOpenId]                 = useState<number | null>(1)

  const filtered = allFAQs.filter(faq => {
    const matchCat   = activeCategory === 'All' || faq.category === activeCategory
    const matchSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      <PageHeroBanner
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our treatments and procedures."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section className="py-20 px-6 lg:px-16 max-w-4xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
            style={{ fontFamily: 'var(--font-body)' }}>
            COMMON QUESTIONS
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2C2C2C', fontWeight: 400 }}>
            Frequently Asked Questions
          </h1>
          <div className="w-10 h-[2px] bg-[#C9A882] mx-auto mt-4" />
        </motion.div>

        {/* Search bar */}
        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-[#EDE0D0] focus:border-[#C9A882] focus:outline-none text-sm text-[#444] bg-white transition-colors duration-200"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 text-xs uppercase tracking-widest transition-all duration-300"
              style={{
                fontFamily: 'var(--font-body)',
                background:   activeCategory === cat ? '#8B7355' : 'transparent',
                color:        activeCategory === cat ? '#fff'     : '#666',
                border:       `1px solid ${activeCategory === cat ? '#8B7355' : '#D4B896'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ accordion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="divide-y divide-[#EDE0D0]"
          >
            {filtered.length === 0 ? (
              <p className="text-center text-[#999] py-16 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                No questions found. Try a different search term.
              </p>
            ) : (
              filtered.map(faq => (
                <div
                  key={faq.id}
                  className="py-5 cursor-pointer"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h3
                      className="text-sm font-medium leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: openId === faq.id ? '#8B7355' : '#2C2C2C',
                        transition: 'color 0.2s',
                      }}
                    >
                      {faq.question}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-[#C9A882] flex items-center justify-center flex-shrink-0">
                      <motion.div animate={{ rotate: openId === faq.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown size={14} style={{ color: '#8B7355' }} />
                      </motion.div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-sm text-[#555] leading-relaxed"
                          style={{ fontFamily: 'var(--font-body)' }}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Still have questions CTA */}
        <div className="mt-16 text-center p-10 border border-[#EDE0D0]">
          <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3" style={{ fontFamily: 'var(--font-body)' }}>
            STILL HAVE QUESTIONS?
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#2C2C2C', fontWeight: 400 }}
            className="mb-4">
            Talk to Our Experts
          </h2>
          <p className="text-sm text-[#666] mb-6" style={{ fontFamily: 'var(--font-body)' }}>
            Can&apos;t find your answer? Our dermatologists are happy to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-widest transition-all duration-300"
            style={{ background: '#8B7355', color: '#fff', fontFamily: 'var(--font-body)' }}
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allFAQs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
    </>
  )
}