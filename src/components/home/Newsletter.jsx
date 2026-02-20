import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      setEmail('')
    }
  }

  return (
    <section className="py-20 bg-warm-100">
      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
        <AnimatedSection>
          <h3 className="font-display text-heading text-ink-900 mb-4">
            Get framing inspiration
          </h3>
          <p className="text-ink-500 mb-8 max-w-lg mx-auto">
            Join our newsletter for design tips, new frame drops, and exclusive offers for the Kathmandu community.
          </p>

          <form onSubmit={handleSubmit} className="relative flex max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 bg-white rounded-full text-ink-900 placeholder:text-ink-300 border-2 border-transparent focus:border-teal-500 focus:outline-none transition-colors pr-14 shadow-sm font-body"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="absolute right-2 top-2 bottom-2 w-12 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center transition-colors"
            >
              {submitted ? <Check size={18} /> : <Send size={16} />}
            </motion.button>
          </form>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-teal-600 text-sm mt-4 font-display"
            >
              Welcome to the FrameHaru family!
            </motion.p>
          )}
        </AnimatedSection>
      </div>
    </section>
  )
}
