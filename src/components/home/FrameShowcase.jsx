import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import Button from '../ui/Button'
import { useFrames } from '../../hooks/useFrames'

export default function FrameShowcase() {
  const { data: frames } = useFrames()
  const featured = frames?.filter((f) => f.popular) || []

  return (
    <section className="relative py-28 md:py-36 bg-warm-100 overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        {/* Header - right aligned for visual interest */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="font-display text-teal-500 uppercase tracking-[0.2em] text-sm mb-4">
              Our Frames
            </p>
            <h2 className="font-display text-display text-ink-900">
              Crafted for your
              <br />
              walls & memories
            </h2>
          </div>
          <Link to="/shop">
            <Button variant="outline" size="md">
              View All Frames
              <ArrowRight size={16} />
            </Button>
          </Link>
        </AnimatedSection>

        {/* Asymmetric gallery grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {featured.length > 0 && (
            <>
              {/* Large feature frame */}
              <AnimatedSection
                variant="slideRight"
                className="col-span-12 md:col-span-7 group"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer">
                  <img
                    src={featured[0]?.image}
                    alt={featured[0]?.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  {/* Frame border overlay */}
                  <div
                    className="absolute inset-6 md:inset-10 border-[6px] rounded-sm transition-all duration-500 group-hover:inset-8 md:group-hover:inset-12"
                    style={{ borderColor: featured[0]?.color }}
                  />
                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 md:p-8">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-display mb-2">
                      {featured[0]?.material}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl text-white font-semibold">
                      {featured[0]?.name}
                    </h3>
                    <p className="text-white/70 text-sm mt-1">{featured[0]?.description}</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right column - two stacked frames */}
              <div className="col-span-12 md:col-span-5 grid gap-4 md:gap-6">
                {featured.slice(1, 3).map((frame, i) => (
                  <AnimatedSection
                    key={frame.id}
                    variant="slideLeft"
                    delay={i * 0.15}
                    className="group"
                  >
                    <div className="relative aspect-[3/2] rounded-3xl overflow-hidden cursor-pointer">
                      <img
                        src={frame.image}
                        alt={frame.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-4 md:inset-6 border-[4px] rounded-sm transition-all duration-500 group-hover:inset-5 md:group-hover:inset-7"
                        style={{ borderColor: frame.color }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                        <span className="inline-block bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-white text-xs font-display mb-1.5">
                          {frame.material}
                        </span>
                        <h3 className="font-display text-lg text-white font-semibold">
                          {frame.name}
                        </h3>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Frame color swatches teaser */}
        <AnimatedSection delay={0.3} className="mt-12 flex flex-wrap items-center gap-4 justify-center">
          <span className="text-ink-400 text-sm font-display">Available in:</span>
          {frames?.map((frame) => (
            <motion.div
              key={frame.id}
              whileHover={{ scale: 1.3, y: -4 }}
              className="w-8 h-8 rounded-full shadow-md cursor-pointer border-2 border-white"
              style={{ backgroundColor: frame.color === 'transparent' ? '#E0F2F1' : frame.color }}
              title={frame.name}
            />
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
