'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#2C2B26', minHeight: '420px' }}>
      {/* Background diagonal shapes — BEHIND CONTENT */}
      <div className="absolute inset-0 z-0">
        {/* Top-right triangle */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{
            background: '#353430',
            clipPath: 'polygon(40% 0%, 100% 0%, 100% 100%, 100% 100%)',
          }}
        />
        {/* Bottom-left triangle */}
        <div
          className="absolute bottom-0 left-0 w-1/2 h-full"
          style={{
            background: '#353430',
            clipPath: 'polygon(0% 60%, 60% 100%, 0% 100%)',
          }}
        />
      </div>

      {/* CONTENT — z-10 so it's always above shapes */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ color: '#C9A882', letterSpacing: '0.25em', fontSize: '13px', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '20px' }}
        >
          BEGIN YOUR SKIN JOURNEY
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            color: '#FFFFFF',
            fontWeight: 400,
            lineHeight: 1.15,
            maxWidth: '700px',
            marginBottom: '20px'
          }}
        >
          Ready to enhance your natural beauty?
        </motion.h2>

        {/* SUBTITLE — was invisible before, now fully visible */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.70)',  // ← KEY FIX
            maxWidth: '520px',
            marginBottom: '40px',
          }}
        >
          Book a consultation with our expert dermatologists and get a personalized 
          treatment plan designed exclusively for your skin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
            style={{ background: '#8B7355', color: '#fff', padding: '16px 32px', letterSpacing: '0.1em', fontSize: '13px', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}
          >
            BOOK CONSULTATION <ArrowRight size={14} />
          </Link>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 transition-all duration-300 hover:bg-white/10"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', color: '#fff', padding: '16px 32px', letterSpacing: '0.1em', fontSize: '13px', fontFamily: 'var(--font-body)' }}
          >
            <Phone size={14} /> +91 98765 43210
          </a>
        </motion.div>
      </div>
    </section>
  )
}
