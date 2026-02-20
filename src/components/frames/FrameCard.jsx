import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function FrameCard({ frame, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
    >
      <Link
        to={`/create?frame=${frame.id}`}
        className="group block"
      >
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-4">
          {/* Photo with frame border overlay */}
          <img
            src={frame.image}
            alt={frame.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
          />

          {/* Frame border overlay */}
          <div
            className="absolute inset-4 md:inset-6 transition-all duration-500 group-hover:inset-5 md:group-hover:inset-7 rounded-sm"
            style={{
              border: `${Math.max(3, frame.borderWidth / 3)}px solid ${frame.color === 'transparent' ? 'rgba(255,255,255,0.5)' : frame.color}`,
            }}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

          {/* CTA on hover */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <ArrowRight size={18} />
            </div>
          </div>

          {/* Popular badge */}
          {frame.popular && (
            <div className="absolute top-4 left-4">
              <span className="bg-teal-500 text-white text-xs font-display font-semibold px-3 py-1 rounded-full">
                Popular
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-900 group-hover:text-teal-600 transition-colors">
            {frame.name}
          </h3>
          <p className="text-ink-400 text-sm mt-0.5">{frame.material}</p>
          <p className="text-ink-500 text-sm mt-1.5 line-clamp-2">{frame.description}</p>
        </div>
      </Link>
    </motion.div>
  )
}
