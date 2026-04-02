"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeroBannerProps {
  title: string
  subtitle?: string
  breadcrumbs?: Breadcrumb[]
}

export default function PageHeroBanner({ title, subtitle, breadcrumbs }: PageHeroBannerProps) {
  return (
    <section className="relative pt-[160px] pb-24 md:pt-[180px] md:pb-28 bg-charcoal overflow-hidden w-full flex items-center justify-center min-h-[300px]">
      
      {/* Background abstract element (z-0 so it doesn't cover text) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-brown">
          <polygon fill="currentColor" points="100,0 0,0 0,100" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 text-sm text-white/50 mb-6 font-medium tracking-wider uppercase"
          >
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center">
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors duration-300">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && (
                  <span className="mx-2 text-white/30">/</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl mb-6 text-[#FFFFFF]" // Title always #FFFFFF
        >
          {title}
        </motion.h1>

        {/* Gold accent line animating in underneath *title* */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="w-24 h-1 bg-brown mb-8 origin-center"
        />

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-white/90"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
