import dynamic from 'next/dynamic'
import Navbar from '@/components/common/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import ConsultationBar from '@/components/sections/ConsultationBar'

// ── BELOW THE FOLD: lazy load each section independently ──────────────────
function SectionSkeleton({ height, bg = '#f9f9f9' }: { height: number; bg?: string }) {
  return <div style={{ height, background: bg, width: '100%' }} aria-hidden="true" />
}

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: false, loading: () => <SectionSkeleton height={500} /> })
const StatsSection = dynamic(() => import('@/components/sections/StatsSection'), { ssr: false, loading: () => <SectionSkeleton height={160} bg="#F5EDE3" /> })
const GallerySection = dynamic(() => import('@/components/sections/GallerySection'), { ssr: false, loading: () => <SectionSkeleton height={700} /> })
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), { ssr: false, loading: () => <SectionSkeleton height={520} bg="#6B4F35" /> })
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), { ssr: false, loading: () => <SectionSkeleton height={600} /> })
const BlogSection = dynamic(() => import('@/components/sections/BlogSection'), { ssr: false, loading: () => <SectionSkeleton height={520} /> })
const CTASection = dynamic(() => import('@/components/sections/CTASection'), { ssr: false, loading: () => <SectionSkeleton height={420} bg="#2C2B26" /> })
const Footer = dynamic(() => import('@/components/common/Footer'), { ssr: false, loading: () => <SectionSkeleton height={300} bg="#2C2B26" /> })

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col pt-10 md:pt-0 border-b-0">
        <HeroSection />
        <ConsultationBar />
        <AboutSection />
        <StatsSection />
        <GallerySection />
        <TestimonialsSection />
        <FAQSection />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
