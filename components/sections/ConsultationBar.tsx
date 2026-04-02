"use client"
import { motion } from 'framer-motion'
import { CalendarIcon } from 'lucide-react'
import { scrollVariants, useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function ConsultationBar() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section ref={ref} className="bg-[#F4F4F4] py-12 border-b border-sand/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
          variants={scrollVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Text Left */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <p className="text-gray text-xs tracking-widest uppercase mb-1">Request For Your</p>
            <h2 className="font-display text-4xl lg:text-5xl text-charcoal">Consultation</h2>
          </div>

          {/* Form Right */}
          <form className="flex-grow w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="px-4 py-3 bg-white border border-gray/20 focus:border-brown focus:ring-1 focus:ring-brown outline-none transition-all w-full"
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="px-4 py-3 bg-white border border-gray/20 focus:border-brown focus:ring-1 focus:ring-brown outline-none transition-all w-full"
              required
            />
            <div className="relative w-full">
              <input 
                type="date" 
                className="px-4 py-3 bg-white border border-gray/20 focus:border-brown focus:ring-1 focus:ring-brown outline-none transition-all w-full text-gray appearance-none cursor-pointer"
                required
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray/50 pointer-events-none" size={18} />
            </div>
            <select
              defaultValue=""
              className="px-4 py-3 bg-white border border-gray/20 focus:border-brown focus:ring-1 focus:ring-brown outline-none transition-all w-full text-gray appearance-none"
              required
            >
              <option value="" disabled hidden>Type of Service</option>
              <option value="cosmetic">Cosmetic</option>
              <option value="medical">Medical</option>
              <option value="laser">Laser Therapy</option>
            </select>
            <button 
              type="submit" 
              className="bg-brown hover:bg-brown-dark text-white font-semibold text-xs tracking-widest px-6 py-3 transition-colors uppercase w-full"
            >
              Book Appointment
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}