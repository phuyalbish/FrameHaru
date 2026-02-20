import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, SlidersHorizontal } from 'lucide-react'
import { useFrames } from '../hooks/useFrames'
import FrameCard from '../components/frames/FrameCard'
import AnimatedSection from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'

const materials = ['All', 'Premium Wood', 'Solid Oak Wood', 'Walnut Wood', 'Gold-Finished Wood', 'Acrylic + Metal']

export default function ShopPage() {
  const { data: frames, isLoading } = useFrames()
  const [activeMaterial, setActiveMaterial] = useState('All')

  const filtered = activeMaterial === 'All'
    ? frames
    : frames?.filter((f) => f.material === activeMaterial)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-20 min-h-screen bg-warm-50"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Page header */}
        <AnimatedSection className="mb-12">
          <p className="font-display text-teal-500 uppercase tracking-[0.2em] text-sm mb-4">
            Our Collection
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-display text-ink-900">
              Frames crafted with
              <br />
              <span className="text-gradient">intention</span>
            </h1>
            <Link to="/create">
              <Button variant="primary" size="md">
                Upload & Frame
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        {/* Material filter */}
        <AnimatedSection delay={0.1} className="mb-12">
          <div className="flex items-center gap-2 overflow-x-auto scroll-hidden pb-2">
            <SlidersHorizontal size={16} className="text-ink-400 flex-shrink-0" />
            {materials.map((mat) => (
              <button
                key={mat}
                onClick={() => setActiveMaterial(mat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-display transition-all duration-300 ${
                  activeMaterial === mat
                    ? 'bg-ink-900 text-white'
                    : 'bg-white text-ink-600 hover:bg-ink-100'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Frame grid - asymmetric */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-ink-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filtered?.map((frame, i) => (
              <FrameCard key={frame.id} frame={frame} index={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {filtered?.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-ink-400 text-lg">No frames found for this material.</p>
            <button
              onClick={() => setActiveMaterial('All')}
              className="text-teal-500 font-display mt-2 hover:underline"
            >
              Show all frames
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
