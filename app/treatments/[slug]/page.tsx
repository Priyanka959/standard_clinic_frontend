import { notFound } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import PageHeroBanner from '@/components/common/PageHeroBanner'
import CTASection from '@/components/sections/CTASection'
import FAQSection from '@/components/sections/FAQSection'
import servicesData from '@/data/services.json'

// Make it strongly typed or mock the params logic correctly.
// In Next 13+ App directory
interface Props {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: Props) {
  const service = servicesData.find(s => s.slug === params.slug)
  if (!service) return { title: 'Treatment Not Found' }
  
  return {
    title: `${service.title} | Premium Derma Clinic`,
    description: service.description
  }
}

export function generateStaticParams() {
  return servicesData.map(service => ({
    slug: service.slug
  }))
}

export default function TreatmentDetail({ params }: Props) {
  const service = servicesData.find(s => s.slug === params.slug)
  
  if (!service) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col border-b-0">
        <PageHeroBanner
          title={service.title}
          subtitle="Advanced treatment tailored to naturally restore and enhance your skin."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Treatments', href: '/services' },
            { label: service.title }
          ]}
        />

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl text-charcoal mb-6">About the Procedure</h2>
                <p className="text-gray leading-relaxed mb-6">
                  {service.description}
                </p>
                <p className="text-gray leading-relaxed mb-8">
                  Our {service.title.toLowerCase()} service uses state-of-the-art technology to ensure minimal downtime and maximal results. We begin with a comprehensive clinical assessment to tailor the exact parameters to your unique skin type and concern.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="text-brown mr-3">✦</span>
                    <span className="text-charcoal font-medium">Suitable for all skin types</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brown mr-3">✦</span>
                    <span className="text-charcoal font-medium">Minimal to no downtime</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brown mr-3">✦</span>
                    <span className="text-charcoal font-medium">Long-lasting clinical results</span>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}