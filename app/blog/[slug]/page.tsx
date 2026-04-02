// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import PageHeroBanner from '@/components/common/PageHeroBanner'
import { blogPosts } from '@/data/blog'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Derma Clinic Blog`,
    description: post.excerpt,
    openGraph: { images: [post.coverImage] },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const related = blogPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 2)
  const currentIndex = blogPosts.findIndex(p => p.slug === post.slug)
  const prevPost = blogPosts[currentIndex - 1] ?? null
  const nextPost = blogPosts[currentIndex + 1] ?? null

  return (
    <>
      <PageHeroBanner
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: post.category }]}
      />

      <article className="py-20 px-6 lg:px-16 max-w-3xl mx-auto">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 text-xs text-[#999] mb-8"
          style={{ fontFamily: 'var(--font-body)' }}>
          <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
          <span className="flex items-center gap-1.5"><User size={12} />{post.author}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
          <span
            className="px-3 py-1 text-white text-[10px] uppercase tracking-wider"
            style={{ background: '#8B7355', fontFamily: 'var(--font-body)' }}
          >
            {post.category}
          </span>
        </div>

        {/* Cover image */}
        <div className="relative aspect-[16/9] mb-10 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article body — render markdown-style sections */}
        <div
          className="prose prose-sm max-w-none"
          style={{ fontFamily: 'var(--font-body)', color: '#444', lineHeight: 1.9 }}
        >
          {/* Render post.content as HTML or markdown */}
          {/* In production, use next-mdx-remote or react-markdown */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Author box */}
        <div className="mt-14 p-6 border border-[#EDE0D0] flex items-center gap-6">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative">
            <Image src={post.authorAvatar || '/images/avatars/doctor.jpg'} alt={post.author} fill className="object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8B7355] mb-1" style={{ fontFamily: 'var(--font-body)' }}>Written by</p>
            <p className="font-medium text-[#2C2C2C]" style={{ fontFamily: 'var(--font-body)' }}>{post.author}</p>
            <p className="text-xs text-[#666] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
              Senior Dermatologist, Derma Clinic Bengaluru
            </p>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-10 grid grid-cols-2 gap-6">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`}
              className="group p-5 border border-[#EDE0D0] hover:border-[#C9A882] transition-colors duration-300">
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#999] mb-2"
                style={{ fontFamily: 'var(--font-body)' }}>
                <ArrowLeft size={10} /> Previous
              </span>
              <p className="text-sm text-[#2C2C2C] group-hover:text-[#8B7355] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-display)' }}>
                {prevPost.title}
              </p>
            </Link>
          ) : <div />}

          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`}
              className="group p-5 border border-[#EDE0D0] hover:border-[#C9A882] transition-colors duration-300 text-right">
              <span className="flex items-center justify-end gap-1 text-[10px] uppercase tracking-widest text-[#999] mb-2"
                style={{ fontFamily: 'var(--font-body)' }}>
                Next <ArrowRight size={10} />
              </span>
              <p className="text-sm text-[#2C2C2C] group-hover:text-[#8B7355] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-display)' }}>
                {nextPost.title}
              </p>
            </Link>
          ) : <div />}
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 px-6 lg:px-16" style={{ background: '#F5EDE3' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-10"
              style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#2C2C2C', fontWeight: 400 }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`}
                  className="group bg-white border border-[#EDE0D0] hover:border-[#C9A882] hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.coverImage} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-widest text-[#8B7355] mb-2" style={{ fontFamily: 'var(--font-body)' }}>{p.category}</p>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#2C2C2C', fontWeight: 400 }}>{p.title}</h3>
                    <span className="text-xs text-[#8B7355] flex items-center gap-1 mt-3" style={{ fontFamily: 'var(--font-body)' }}>
                      READ ARTICLE <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}