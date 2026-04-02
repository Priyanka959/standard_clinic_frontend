// app/blog/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import PageHeroBanner from '@/components/common/PageHeroBanner'
import { blogPosts } from '@/data/blog'   // ← import from data file below

export const metadata = {
  title: 'Skin Care Blog | Derma Clinic Bengaluru',
  description: 'Expert tips, treatment guides, and dermatology insights from our team.',
}

export default function BlogPage() {
  return (
    <>
      <PageHeroBanner
        title="From the Journal"
        subtitle="Expert tips, treatment guides, and dermatology insights."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="py-20 px-6 lg:px-16">
        {/* Header row */}
        <div className="max-w-7xl mx-auto flex items-end justify-between mb-14">
          <div>
            <p className="text-[#8B7355] uppercase tracking-[0.25em] text-xs mb-3"
              style={{ fontFamily: 'var(--font-body)' }}>
              LATEST INSIGHTS
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2C2C2C', fontWeight: 400 }}>
              From the Journal
            </h1>
            <p className="text-sm text-[#666] mt-3 max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
              Explore our latest articles on dermatology, skincare routines, and the advanced treatments we offer.
            </p>
          </div>
        </div>

        {/* Blog grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-sm overflow-hidden border border-[#EDE0D0] hover:border-[#C9A882] hover:shadow-lg transition-all duration-300"
              style={{ background: '#FAF6F1' }}
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
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
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-4 text-[11px] text-[#999] mb-4"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={11} /> {post.author}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="mb-3 group-hover:text-[#8B7355] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#2C2C2C', fontWeight: 400, lineHeight: 1.3 }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-[#666] leading-relaxed flex-1 mb-6"
                  style={{ fontFamily: 'var(--font-body)' }}>
                  {post.excerpt}
                </p>

                {/* Read link */}
                <span
                  className="text-xs uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-body)', color: '#8B7355' }}
                >
                  READ ARTICLE <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}