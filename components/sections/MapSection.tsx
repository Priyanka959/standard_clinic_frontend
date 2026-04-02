"use client"
import { motion } from 'framer-motion'
import { useScrollAnimation, scrollVariants } from '@/hooks/useScrollAnimation'

export default function MapSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="bg-cream" ref={ref}>
      <motion.div 
        className="w-full h-[500px] relative grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        variants={scrollVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.464627051412!2d77.6254881987515!3d12.980424599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae169b1b7c1ab5%3A0xffa7dfd2eabef899!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Clinic Location"
        />
      </motion.div>
    </section>
  )
}