import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useFrames } from '../../hooks/useFrames'
import { cn } from '../../lib/utils'

export default function FrameSelector({ selectedFrame, onSelect }) {
  const { data: frames, isLoading } = useFrames()

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto scroll-hidden py-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-28 h-36 bg-ink-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-ink-900">Choose Frame</h3>
        {selectedFrame && (
          <span className="text-sm text-teal-600 font-display">
            {selectedFrame.name} - {selectedFrame.material}
          </span>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto scroll-hidden py-2 -mx-2 px-2">
        {frames?.map((frame) => {
          const isActive = selectedFrame?.id === frame.id
          return (
            <motion.button
              key={frame.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(frame)}
              className={cn(
                'flex-shrink-0 w-28 rounded-2xl overflow-hidden transition-all duration-300 border-2',
                isActive
                  ? 'border-teal-500 shadow-lg shadow-teal-500/20'
                  : 'border-transparent hover:border-ink-200 shadow-sm'
              )}
            >
              {/* Frame color swatch */}
              <div
                className="relative h-20 flex items-center justify-center"
                style={{
                  backgroundColor: frame.color === 'transparent' ? '#E0F2F1' : frame.color,
                }}
              >
                {/* Inner frame preview */}
                <div
                  className="w-12 h-14 bg-white/30 rounded-sm"
                  style={{ border: `3px solid ${frame.color === 'transparent' ? '#ccc' : 'rgba(255,255,255,0.4)'}` }}
                />

                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center"
                  >
                    <Check size={12} className="text-white" />
                  </motion.div>
                )}
              </div>

              {/* Frame name */}
              <div className={cn(
                'py-2.5 px-2 text-center transition-colors',
                isActive ? 'bg-teal-50' : 'bg-white'
              )}>
                <p className="font-display text-xs font-semibold text-ink-900 truncate">
                  {frame.name}
                </p>
                <p className="text-[10px] text-ink-400 mt-0.5">{frame.material}</p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
