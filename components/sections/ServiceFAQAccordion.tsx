'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ServiceFAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="flex flex-col divide-y divide-[#EDE0D0]">
      {faqs.map((faq, i) => (
        <div key={i} className="py-5 cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
          <div className="flex justify-between items-center gap-4">
            <h3 className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: open === i ? '#8B7355' : '#2C2C2C' }}>
              {faq.question}
            </h3>
            <div className="w-8 h-8 rounded-full border border-[#C9A882] flex items-center justify-center flex-shrink-0">
              <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={14} style={{ color: '#8B7355' }} />
              </motion.div>
            </div>
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="pt-4 text-sm text-[#555] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
