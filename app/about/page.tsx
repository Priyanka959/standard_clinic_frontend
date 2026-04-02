import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import PageHeroBanner from '@/components/common/PageHeroBanner'
import AboutSection from '@/components/sections/AboutSection'
import StatsSection from '@/components/sections/StatsSection'
import CTASection from '@/components/sections/CTASection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'

export const metadata = {
  title: 'About Us | Premium Derma Clinic',
  description: 'Learn about our state-of-the-art dermatology clinic, our expert team, and our commitment to your skin health.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col border-b-0">
        <PageHeroBanner
          title="About Our Clinic"
          subtitle="Dedicated to providing exceptional dermatological care with the most advanced technology and personalized treatment plans."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'About Us' }
          ]}
        />
        <AboutSection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}