import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import { useFaqs } from '../../hooks/useFrames'

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-ink-100 last:border-none">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-display text-lg font-semibold text-ink-900 pr-8 group-hover:text-teal-600 transition-colors">
          {question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-teal-500 text-white rotate-0' : 'bg-ink-100 text-ink-500'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden"
          >
            <p className="text-ink-500 leading-relaxed pb-6 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const { data: faqs } = useFaqs()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-28 md:py-36 bg-warm-50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - sticky header */}
          <AnimatedSection className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-display text-teal-500 uppercase tracking-[0.2em] text-sm mb-4">
              FAQs
            </p>
            <h2 className="font-display text-display text-ink-900 mb-6">
              Got questions?
              <br />
              <span className="text-teal-500">We've got answers</span>
            </h2>
            <p className="text-ink-500 text-lg leading-relaxed max-w-md">
              Everything you need to know about ordering your custom frames from FrameHaru.
            </p>
            <div className="mt-8 p-6 bg-teal-50 rounded-2xl">
              <p className="font-display font-semibold text-teal-800 mb-1">Still need help?</p>
              <p className="text-teal-600 text-sm">
                Chat with us at{' '}
                <a href="mailto:hello@frameharu.com" className="underline underline-offset-2">
                  hello@frameharu.com
                </a>
              </p>
            </div>
          </AnimatedSection>

          {/* Right - FAQ list */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              {faqs?.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
