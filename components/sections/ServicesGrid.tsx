'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    slug: 'cosmetic',
    category: 'YOUR APPEARANCE',
    title: 'Cosmetic',
    description: 'Advanced cosmetic dermatology to enhance your natural beauty and restore confidence in your skin.',
    image: '/images/services/cosmetic.jpg',
  },
  {
    slug: 'moles-and-skin',
    category: 'SKIN PROBLEMS',
    title: 'Moles and Skin',
    description: 'Expert diagnosis and safe removal of moles, skin tags, and other dermatological concerns.',
    image: '/images/services/moles.jpg',
  },
  {
    slug: 'medical',
    category: 'SKIN, HAIR AND NAIL',
    title: 'Medical',
    description: 'Comprehensive medical dermatology covering skin, hair, and nail conditions of all types.',
    image: '/images/services/medical.jpg',
  },
  {
    slug: 'anti-aging',
    category: 'WRINKLES AND LINES',
    title: 'Anti Aging',
    description: 'Cutting-edge anti-aging treatments to reduce wrinkles, restore volume, and rejuvenate skin.',
    image: '/images/services/anti-aging.jpg',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function ServicesGrid() {
  return (
    <section className="py-24 px-6 lg:px-16 bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
          style={{ fontFamily: 'var(--font-body)' }}>
          HEALTHY SKIN AND NATURAL
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2C2C2C', fontWeight: 400 }}>
          Treatments &amp; Services
        </h2>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 max-w-7xl mx-auto"
      >
        {services.map((svc) => (
          <motion.div
            key={svc.slug}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col"
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[3/4] mb-6">
              <Image
                src={svc.image}
                alt={svc.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Category label */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#999] mb-2"
              style={{ fontFamily: 'var(--font-body)' }}>
              {svc.category}
            </p>

            {/* Title */}
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#2C2C2C', fontWeight: 400 }}
              className="mb-3">
              {svc.title}
            </h3>

            {/* Gold divider */}
            <div className="w-10 h-[2px] bg-[#C9A882] mb-4" />

            {/* Description */}
            <p className="text-sm text-[#666] leading-relaxed mb-6 flex-1"
              style={{ fontFamily: 'var(--font-body)' }}>
              {svc.description}
            </p>

            {/* CTA — links to /services/[slug] */}
            <Link
              href={`/services/${svc.slug}`}
              className="inline-flex items-center gap-2 border border-[#C9A882] text-[#8B7355] px-5 py-2.5 text-xs uppercase tracking-widest
                         hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] transition-all duration-300 w-fit group/btn"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              VIEW SERVICES
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center
                               group-hover/btn:bg-white group-hover/btn:border-white transition-all duration-300">
                <ArrowRight size={10} className="group-hover/btn:text-[#8B7355] transition-colors" />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}