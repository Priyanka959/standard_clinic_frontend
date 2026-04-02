"use client"
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useScrollAnimation, scrollVariants } from '@/hooks/useScrollAnimation'

export default function AboutSection() {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2)
  const containerRef = useRef(null)
  
  // Parallax effect for the image
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section ref={sectionRef} className="py-24 bg-[#F7F7F7] overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Overlapping Images */}
          <motion.div 
            className="w-full lg:w-5/12 relative h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Background Brown Frame */}
            <div className="absolute top-8 left-8 right-8 bottom-8 border-2 border-brown z-0"></div>
            
            {/* Main Parallax Image */}
            <motion.div 
              style={{ y: imageY }}
              className="absolute inset-0 z-10 p-4"
            >
              <div className="relative w-full h-full bg-light-gray shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200" 
                  alt="Doctor treating patient"
                  fill
                  className="object-cover grayscale-[20%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
            
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            className="w-full lg:w-7/12"
            variants={scrollVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-brown text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Welcome to our clinic!
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-charcoal leading-tight mb-8">
              Extensive Procedures<br className="hidden lg:block"/> to Our Patients.
            </h2>
            <div className="space-y-6 text-gray text-sm leading-relaxed mb-10">
              <p>
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. 
                Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus 
                viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
              </p>
              <p>
                In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam 
                dictum felis eu pede mollis pretium.
              </p>
            </div>
            
            <Link 
              href="/about"
              className="inline-flex items-center gap-4 border border-charcoal/20 px-8 py-3.5 text-xs font-semibold tracking-wider text-charcoal hover:bg-brown hover:text-white hover:border-brown transition-all duration-300 group"
            >
              MORE ABOUT US 
              <span className="w-6 h-6 rounded-full bg-brown text-white flex items-center justify-center text-xs group-hover:bg-white group-hover:text-brown transition-colors">
                <ChevronRight size={14} />
              </span>
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}