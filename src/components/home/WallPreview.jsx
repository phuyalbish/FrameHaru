import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, LayoutGrid } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import Button from '../ui/Button'
import { useWallLayouts, useGalleryImages } from '../../hooks/useFrames'

export default function WallPreview() {
  const { data: layouts } = useWallLayouts()
  const { data: images } = useGalleryImages()
  const [activeLayout, setActiveLayout] = useState(0)

  const currentLayout = layouts?.[activeLayout]
  const layoutImages = images?.slice(0, currentLayout?.count || 4)

  return (
    <section className="relative py-28 md:py-36 bg-warm-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left - Wall mockup */}
          <AnimatedSection variant="scaleIn" className="order-2 lg:order-1">
            <div className="relative bg-warm-200 rounded-3xl p-8 md:p-12 aspect-[4/3] overflow-hidden">
              {/* Wall texture */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4C8BA' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              {/* Frames on wall */}
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  {currentLayout?.positions.map((pos, i) => (
                    <motion.div
                      key={`${activeLayout}-${i}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="absolute bg-white p-1.5 md:p-2 frame-shadow rounded-sm"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        width: `${pos.w}%`,
                        height: `${pos.h}%`,
                      }}
                    >
                      {layoutImages?.[i] && (
                        <img
                          src={layoutImages[i].src}
                          alt={layoutImages[i].alt}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Sofa silhouette at bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-warm-300/40 rounded-t-full" />
            </div>
          </AnimatedSection>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <AnimatedSection>
              <p className="font-display text-teal-500 uppercase tracking-[0.2em] text-sm mb-4">
                Gallery Walls
              </p>
              <h2 className="font-display text-display text-ink-900 mb-6">
                Design your
                <br />
                <span className="text-teal-500">
                perfect wall</span>
              </h2>
              <p className="text-ink-500 text-lg leading-relaxed mb-10 max-w-lg">
                Choose from curated layout templates and see how your photos look together before ordering. Mix sizes and frames for a gallery that's uniquely yours.
              </p>
            </AnimatedSection>

            {/* Layout selector */}
            <AnimatedSection delay={0.2}>
              <p className="font-display text-sm text-ink-400 uppercase tracking-wider mb-4">Choose a layout</p>
              <div className="flex flex-wrap gap-3 mb-10">
                {layouts?.map((layout, i) => (
                  <button
                    key={layout.id}
                    onClick={() => setActiveLayout(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-display transition-all duration-300 ${
                      activeLayout === i
                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                        : 'bg-white text-ink-600 hover:bg-teal-50 shadow-sm'
                    }`}
                  >
                    <LayoutGrid size={14} />
                    {layout.name}
                    <span className="text-xs opacity-60">{layout.count} frames</span>
                  </button>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <Link to="/create">
                <Button variant="primary" size="lg">
                  Create Your Gallery Wall
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
