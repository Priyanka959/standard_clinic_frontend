'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'

// ── Static preview data (first 3 posts shown on homepage) ─────────────────
// These slugs MUST match the slugs in data/blog.ts exactly
const previewPosts = [
  {
    slug: 'ultimate-guide-chemical-peels',       // ← links to /blog/ultimate-guide-chemical-peels
    category: 'SKIN CARE',
    date: 'MARCH 15, 2024',
    author: 'Dr. Sarah Admin',
    coverImage: '/images/blog/chemical-peel.jpg',
    title: 'The Ultimate Guide to Chemical Peels',
    
  },
  {
    slug: 'prp-vs-hair-transplant',              // ← links to /blog/prp-vs-hair-transplant
    category: 'HAIR LOSS',
    date: 'FEBRUARY 28, 2024',
    author: 'Dr. John Doe',
    coverImage: '/images/blog/hair-transplant.jpg',
    title: "PRP vs. Hair Transplant: What's Right For You?",
    
  },
  {
    slug: 'laser-hair-removal-myths',            // ← links to /blog/laser-hair-removal-myths
    category: 'LASER',
    date: 'FEBRUARY 10, 2024',
    author: 'Dr. Emily Smith',
    coverImage: '/images/blog/laser.jpg',
    title: 'Myths About Laser Hair Removal Debunked',
  
  },
]

// ── Animation variants ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function BlogSection() {
  return (
    <section className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* ── Header row ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-start justify-between mb-14 gap-6"
        >
          {/* Left: title + subtitle */}
          <div>
            <p
              className="uppercase tracking-[0.25em] text-xs mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#8B7355' }}
            >
              LATEST INSIGHTS
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#2C2C2C',
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              From the Journal
            </h2>
            <p
              className="text-sm text-[#666] mt-3 max-w-md leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Explore our latest articles on dermatology, skincare routines, and the
              advanced treatments we offer.
            </p>
          </div>

          {/* Right: VIEW ALL POSTS → */}
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest flex-shrink-0 mt-2
                       hover:gap-4 transition-all duration-300"
            style={{ fontFamily: 'var(--font-body)', color: '#8B7355' }}
          >
            VIEW ALL POSTS <ArrowRight size={13} />
          </Link>
        </motion.div>

        {/* ── Blog cards ────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8"
        >
          {previewPosts.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              {/*
               * THE FIX:
               * The ENTIRE card is a <Link href={`/blog/${post.slug}`}>
               * So clicking anywhere on the card — image, title, excerpt,
               * or "READ ARTICLE" — navigates to the article page.
               */}
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden border border-[#EDE0D0]
                           hover:border-[#C9A882] hover:shadow-lg transition-all duration-300
                           rounded-sm h-full"
                style={{ background: '#FAF6F1', textDecoration: 'none' }}
              >
                {/* Cover image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {/* Category badge */}
                  <span
                    className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] uppercase tracking-widest text-white"
                    style={{ background: '#8B7355', fontFamily: 'var(--font-body)' }}
                  >
                    {post.category}
                  </span>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAADklEQVQImWNgYGD4TwABBAEAHjAGAAAAABJRU5ErkJggg=="
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta: date + author */}
                  <div
                    className="flex items-center gap-4 text-[11px] text-[#999] mb-4"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={11} />
                      {post.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-3 group-hover:text-[#8B7355] transition-colors duration-300"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      color: '#2C2C2C',
                      fontWeight: 400,
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </h3>

                  

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-[#EDE0D0] mb-5" />

                  {/* READ ARTICLE — now inside the Link so it works */}
                  <span
                    className="flex items-center gap-1.5 text-xs uppercase tracking-widest
                               group-hover:gap-3 transition-all duration-300"
                    style={{ fontFamily: 'var(--font-body)', color: '#8B7355' }}
                  >
                    READ ARTICLE
                    <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile "View All" button (hidden on desktop, shown on mobile) */}
        <div className="sm:hidden text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-[#8B7355] text-[#8B7355]
                       px-8 py-3 text-xs uppercase tracking-widest
                       hover:bg-[#8B7355] hover:text-white transition-all duration-300"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            VIEW ALL POSTS <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  )
}
