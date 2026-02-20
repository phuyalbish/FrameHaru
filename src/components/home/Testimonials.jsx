import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import { useTestimonials } from '../../hooks/useFrames'

export default function Testimonials() {
  const { data: testimonials } = useTestimonials()
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (!scrollRef.current) return
    const amount = dir === 'left' ? -380 : 380
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="relative py-28 md:py-36 bg-teal-500 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        {/* Header with scroll controls */}
        <AnimatedSection className="flex items-end justify-between mb-12">
          <div>
            <p className="font-display text-teal-100 uppercase tracking-[0.2em] text-sm mb-4">
              From Our Community
            </p>
            <h2 className="font-display text-display text-white">
              Walls that tell
              <br />
              stories
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </AnimatedSection>

        {/* Scrollable testimonial cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-hidden pb-4 -mx-5 px-5 md:-mx-8 md:px-8 snap-x snap-mandatory"
        >
          {testimonials?.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex-shrink-0 w-[340px] snap-center"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl group h-full">
                {/* Customer's framed photo */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={t.image}
                    alt={`${t.name}'s framed photo`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-4 border-2 border-white/50 rounded-sm pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-display text-ink-700">{t.frame} · {t.size}</span>
                  </div>
                </div>

                {/* Review content */}
                <div className="p-6">
                  <Quote size={24} className="text-teal-200 mb-3" />
                  <p className="text-ink-600 text-sm leading-relaxed mb-4">
                    {t.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-display font-semibold text-ink-900 text-sm">{t.name}</p>
                      <p className="text-ink-400 text-xs">{t.location}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={12} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
