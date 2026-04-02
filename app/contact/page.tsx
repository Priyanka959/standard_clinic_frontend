import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import PageHeroBanner from '@/components/common/PageHeroBanner'
import MapSection from '@/components/sections/MapSection'
import ContactFormSection from '@/components/sections/ContactFormSection'

export const metadata = {
  title: 'Contact Us | Premium Derma Clinic',
  description: 'Reach out to schedule a consultation or inquire about our dermatological treatments in Bengaluru.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col border-b-0">
        <PageHeroBanner
          title="Contact Us"
          subtitle="We are here to help. Reach out to schedule your consultation or if you have any questions about our treatments."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Contact Us' }
          ]}
        />
        <ContactFormSection />
        <MapSection />
      </main>
      <Footer />
    </>
  )
}