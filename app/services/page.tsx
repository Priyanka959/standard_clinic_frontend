import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import PageHeroBanner from '@/components/common/PageHeroBanner'
import ServicesGrid from '@/components/sections/ServicesGrid'
import CTASection from '@/components/sections/CTASection'

export const metadata = {
  title: 'Our Services & Treatments | Premium Derma Clinic',
  description: 'Explore our wide range of aesthetic and clinical dermatological services including laser physics, clinical solutions, and anti-aging.',
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col border-b-0">
        <PageHeroBanner
          title="Clinical & Aesthetic Treatments"
          subtitle="We blend medical expertise with advanced technology to deliver exceptional results tailored specifically to your skin concerns."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services' }
          ]}
        />
        <div className="pt-12">
          <ServicesGrid />
        </div>
        <CTASection />
      </main>
      <Footer />
    </>
  )
}