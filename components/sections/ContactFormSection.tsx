"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useScrollAnimation, scrollVariants } from '@/hooks/useScrollAnimation'

export default function ContactFormSection() {
  const { ref, isInView } = useScrollAnimation()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      // Reset status after 3s
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      details: ["+91 98765 43210", "+91 80 1234 5678"]
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      details: ["hello@dermaclinic.in", "appointments@dermaclinic.in"]
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      details: ["123 Healthcare Avenue,", "Indiranagar, Bengaluru 560038"]
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Hours",
      details: ["Mon - Sat: 10:00 AM - 7:00 PM", "Sunday: Closed"]
    }
  ]

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Information */}
          <motion.div 
            className="w-full lg:w-1/3"
            variants={scrollVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="mb-12">
              <p className="text-brown text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Get In Touch
              </p>
              <h2 className="font-display text-4xl text-charcoal mb-6">
                Contact Details
              </h2>
              <p className="text-gray leading-relaxed">
                Connect with our team to schedule an appointment or to ask any questions. We look forward to welcoming you to our clinic.
              </p>
            </div>

            <div className="space-y-8">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-cream rounded-full flex items-center justify-center text-brown mr-6">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal tracking-wide mb-2">
                      {info.title}
                    </h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray text-sm mb-1">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="w-full lg:w-2/3 bg-beige/30 p-8 md:p-12 rounded-sm"
            variants={scrollVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="font-display text-3xl text-charcoal mb-8">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold tracking-wider text-charcoal uppercase mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray/20 focus:border-brown focus:ring-1 focus:ring-brown outline-none transition-colors text-charcoal"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold tracking-wider text-charcoal uppercase mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray/20 focus:border-brown focus:ring-1 focus:ring-brown outline-none transition-colors text-charcoal"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold tracking-wider text-charcoal uppercase mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray/20 focus:border-brown focus:ring-1 focus:ring-brown outline-none transition-colors text-charcoal"
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-xs font-semibold tracking-wider text-charcoal uppercase mb-2">Service of Interest</label>
                  <select 
                    id="service" 
                    name="service" 
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray/20 focus:border-brown focus:ring-1 focus:ring-brown outline-none transition-colors text-charcoal appearance-none"
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="Consultation">General Consultation</option>
                    <option value="Acne Treatment">Acne Treatment</option>
                    <option value="Anti-Aging">Anti-Aging / Botox</option>
                    <option value="Laser Hair Removal">Laser Hair Removal</option>
                    <option value="Chemical Peels">Chemical Peels</option>
                    <option value="Hair Loss">Hair Loss Treatment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold tracking-wider text-charcoal uppercase mb-2">Your Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray/20 focus:border-brown focus:ring-1 focus:ring-brown outline-none transition-colors text-charcoal resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-charcoal text-white font-semibold tracking-[0.2em] text-sm hover:bg-brown transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>

              {submitStatus === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 font-semibold text-center mt-4 bg-green-50 py-3 px-4 rounded-sm border border-green-200"
                >
                  Thank you! Your message has been sent successfully.
                </motion.p>
              )}

              {submitStatus === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 font-semibold text-center mt-4 bg-red-50 py-3 px-4 rounded-sm border border-red-200"
                >
                  Failed to send message. Please ensure the backend is connected and try again.
                </motion.p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}