"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useScrollAnimation, scrollVariants } from '@/hooks/useScrollAnimation'
import faqData from '@/data/faq.json'

const AccordionItem = ({ faq, isOpen, onClick }: { faq: { id: number, question: string, answer: string }, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-gray/10 py-2">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
      >
        <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-brown' : 'text-charcoal group-hover:text-brown'}`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border ${isOpen ? 'border-brown text-brown' : 'border-gray/20 text-gray group-hover:border-brown group-hover:text-brown'}`}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray leading-relaxed pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const { ref, isInView } = useScrollAnimation()
  const [openId, setOpenId] = useState<number | null>(1)

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          className="text-center mb-16"
          variants={scrollVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-brown text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Common Questions
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          variants={scrollVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqData.slice(0, 6).map((faq) => (
            <AccordionItem 
              key={faq.id} 
              faq={faq} 
              isOpen={openId === faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
          
          <div className="mt-12 text-center">
            <a href="/faq" className="inline-flex px-8 py-4 border border-brown text-brown font-semibold tracking-wider text-sm hover:bg-brown hover:text-white transition-colors">
              VIEW ALL FAQS
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}