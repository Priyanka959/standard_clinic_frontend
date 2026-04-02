'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const HEX_RADIUS = 52          // px — adjust to match face image width
const COLS = 5
const ROWS = 6

function hexPoints(cx: number, cy: number, r: number): string {
  // Pointy-top hexagon: first vertex at top (angle = -90°)
  return Array.from({ length: 6 }, (_, i) => {
    const angleDeg = 60 * i - 90
    const angleRad = (Math.PI / 180) * angleDeg
    return `${(cx + r * Math.cos(angleRad)).toFixed(2)},${(cy + r * Math.sin(angleRad)).toFixed(2)}`
  }).join(' ')
}

function buildHexGrid(cols: number, rows: number, r: number) {
  const W = Math.sqrt(3) * r       // horizontal distance between centers (same row)
  const H = 2 * r                  // full height of one hex
  const vertStep = H * 0.75        // vertical distance between row centers

  const hexes: { cx: number; cy: number; index: number }[] = []
  let idx = 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * W + (row % 2 === 1 ? W / 2 : 0) + r
      const cy = row * vertStep + r
      hexes.push({ cx, cy, index: idx++ })
    }
  }
  return hexes
}

export function HexagonOverlay({ width, height }: { width: number; height: number }) {
  const hexes = buildHexGrid(COLS, ROWS, HEX_RADIUS)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    >
      <style>
        {`
          @keyframes hexPulse {
            0% { opacity: 0; fill-opacity: 0; }
            10% { opacity: 0.55; fill-opacity: 0; }
            20% { opacity: 0.15; fill-opacity: 0.04; }
            30% { opacity: 0.75; fill-opacity: 0; }
            40% { opacity: 0.2; fill-opacity: 0.06; }
            60% { opacity: 0.6; fill-opacity: 0; }
            80% { opacity: 0.1; fill-opacity: 0.03; }
            90% { opacity: 0.5; fill-opacity: 0; }
            100% { opacity: 0; fill-opacity: 0; }
          }
        `}
      </style>
      {hexes.map(({ cx, cy, index }) => (
        <polygon
          key={index}
          points={hexPoints(cx, cy, HEX_RADIUS - 1)} // -1 for thin gap
          fill="white"
          stroke="white"
          strokeWidth="1.8"
          style={{
            opacity: 0,
            animation: `hexPulse ${5 + (index % 7) * 0.6}s ease-in-out ${index * 0.07}s infinite`
          }}
        />
      ))}
    </svg>
  )
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#F5EDE3' }}
    >
      {/* Background subtle diagonal pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #8B7355 0px, #8B7355 1px, transparent 0px, transparent 50%)', backgroundSize: '20px 20px' }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-8 lg:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24 pointer-events-none">
        {/* LEFT: Text content — slides in from left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-6 pointer-events-auto"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ color: '#8B7355', letterSpacing: '0.25em', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}
          >
            ADVANCED CELL CARE
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', color: '#2C2C2C', fontWeight: 400, lineHeight: 1.1 }}
          >
            Get the Best Skin<br />Treatments
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#666', lineHeight: 1.7, maxWidth: '400px' }}
          >
            Expert dermatological care in Bengaluru. Personalized treatments for every skin type.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative z-20"
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border border-[#8B7355] bg-transparent text-[#8B7355] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#8B7355] hover:text-white transition-all cursor-pointer pointer-events-auto"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              VIEW SERVICES ›
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT: Image with hexagon overlay — slides in from right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-[380px] h-[480px] lg:w-[460px] lg:h-[560px]"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
            }}
          >
            <Image
              src="/hero-image-optimized.webp"
              alt="Woman with radiant skin"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* HEXAGON OVERLAY — masked strictly to the opaque pixels of the WEBP */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                WebkitMaskImage: 'url(/hero-image-optimized.webp)',
                WebkitMaskSize: 'cover',
                WebkitMaskPosition: 'center top',
                maskImage: 'url(/hero-image-optimized.webp)',
                maskSize: 'cover',
                maskPosition: 'center top'
              }}
            >
              <HexagonOverlay width={460} height={560} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
