'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const galleryImages = [
  '/gallery7.jpg',
  '/gallery1.jpg',
  '/gallery2.jpg',
  '/gallery3.jpg',
  '/gallery4.jpg',
  '/gallery5.jpg',
  '/gallery6.jpg',
]

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Auto-play interval
  useEffect(() => {
    if (selectedImage) return

    const timer = setInterval(() => {
      handleNext()
    }, 1800)

    return () => clearInterval(timer)
  }, [selectedImage])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Helper to determine the position of each card
  const getCardProps = (index: number) => {
    const diff = (index - currentIndex + galleryImages.length) % galleryImages.length
    const offset = diff > galleryImages.length / 2 ? diff - galleryImages.length : diff

    // Center card
    if (offset === 0) {
      return {
        zIndex: 30,
        scale: 1,
        x: '0%',
        rotateY: 0,
        opacity: 1,
        clickable: true,
      }
    }
    // Cards on the right
    else if (offset > 0) {
      return {
        zIndex: 30 - offset,
        scale: Math.max(1 - offset * 0.15, 0.5),
        x: `${offset * 40}%`,
        rotateY: -offset * 10,
        opacity: Math.max(1 - offset * 0.5, 0), // Kept slight fade for far edges, but mostly visible
        clickable: offset === 1,
      }
    }
    // Cards on the left
    else {
      const absOffset = Math.abs(offset)
      return {
        zIndex: 30 - absOffset,
        scale: Math.max(1 - absOffset * 0.15, 0.5),
        x: `-${absOffset * 40}%`,
        rotateY: absOffset * 10,
        opacity: Math.max(1 - absOffset * 0.5, 0), // Kept slight fade for far edges, but mostly visible
        clickable: absOffset === 1,
      }
    }
  }

  return (
    <section className="py-24 px-4 bg-[#F2EDE7] overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center mb-16 px-4">
        <h2 className="text-4xl lg:text-5xl text-center text-[#2C2B26] font-display mb-4">Results Speak Volumes</h2>
        <p className="text-[#8B8378] text-center max-w-2xl font-body text-lg italic tracking-wide">
          Real transformations. Real confidence.
        </p>
      </div>

      <div 
        className="w-full max-w-5xl mx-auto h-[340px] sm:h-[450px] lg:h-[500px] relative flex items-center justify-center [perspective:1000px]"
      >
        {galleryImages.map((src, i) => {
          const props = getCardProps(i)
          
          return (
            <motion.div
              key={i}
              className="absolute w-[220px] sm:w-[300px] lg:w-[380px] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl cursor-pointer"
              initial={false}
              animate={{
                zIndex: props.zIndex,
                scale: props.scale,
                x: props.x,
                rotateY: props.rotateY,
                opacity: 1, // Full opacity to keep completely original coloring
              }}
              transition={{
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1] // Custom ease-out
              }}
              onClick={() => {
                if (props.x === '0%') setSelectedImage(src)
                else if (props.x.startsWith('-')) handlePrev()
                else handleNext()
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Image
                src={src}
                alt="Clinic Result"
                fill
                className="object-cover"
              />
            </motion.div>
          )
        })}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-1 sm:left-6 lg:left-24 z-40 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-[#2C2B26] shadow-lg backdrop-blur-sm transition-all duration-300"
          aria-label="Previous image"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-1 sm:right-6 lg:right-24 z-40 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-[#2C2B26] shadow-lg backdrop-blur-sm transition-all duration-300"
          aria-label="Next image"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Lightbox Dialog using framer-motion AnimatePresence setup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white text-3xl transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged result"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}