"use client"
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const AnimatedNumber = ({ value, duration = 2000 }: { value: number, duration?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hasStarted, setHasStarted] = useState(false)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true)
      let startTime: number | null = null
      
      const step = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4)
        setDisplayValue(Math.floor(easeProgress * value))
        
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  }, [isInView, hasStarted, value, duration])

  return <span ref={ref}>{displayValue}</span>
}

export default function StatsSection() {
  const stats = [
    { value: 15, label: "Years\nExperience" },
    { value: 5000, label: "Patients\nTreated" },
    { value: 98, label: "Success\nRate", suffix: "%" },
    { value: 20, label: "Awards\nWon" }
  ]

  return (
    <section className="bg-brown text-white py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              className="text-center px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className="font-display text-5xl lg:text-7xl mb-4 text-cream">
                <AnimatedNumber value={stat.value} />
                {stat.suffix || "+"}
              </div>
              <p className="text-sm tracking-wider uppercase whitespace-pre-line text-sand font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}