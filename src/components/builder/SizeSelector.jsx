import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useSizes, useMatOptions } from '../../hooks/useFrames'
import { formatPrice, cn } from '../../lib/utils'

export default function SizeSelector({ selectedSize, onSelectSize, selectedMat, onSelectMat }) {
  const { data: sizes } = useSizes()
  const { data: matOptions } = useMatOptions()

  return (
    <div className="space-y-8">
      {/* Size selection */}
      <div>
        <h3 className="font-display font-semibold text-ink-900 mb-4">Select Size</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sizes?.map((size) => {
            const isActive = selectedSize?.id === size.id
            return (
              <motion.button
                key={size.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectSize(size)}
                className={cn(
                  'relative p-4 rounded-2xl text-left transition-all duration-300 border-2',
                  isActive
                    ? 'border-teal-500 bg-teal-50 shadow-md'
                    : 'border-ink-100 bg-white hover:border-ink-200 shadow-sm'
                )}
              >
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2.5 right-2.5 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center"
                  >
                    <Check size={12} className="text-white" />
                  </motion.div>
                )}
                <p className="font-display text-lg font-semibold text-ink-900">{size.label}</p>
                <p className="text-xs text-ink-400 mt-0.5">{size.cm}</p>
                <p className="font-display text-teal-600 font-semibold mt-2">
                  {formatPrice(size.price)}
                </p>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Mat selection */}
      <div>
        <h3 className="font-display font-semibold text-ink-900 mb-4">Mat Option</h3>
        <div className="flex gap-3">
          {matOptions?.map((mat) => {
            const isActive = selectedMat?.id === mat.id
            return (
              <motion.button
                key={mat.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectMat(mat)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-2',
                  isActive
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-ink-100 bg-white hover:border-ink-200'
                )}
              >
                {mat.color && (
                  <div
                    className="w-6 h-6 rounded-full border border-ink-200"
                    style={{ backgroundColor: mat.color }}
                  />
                )}
                <div className="text-left">
                  <p className="font-display text-sm font-semibold text-ink-900">{mat.label}</p>
                  {mat.price > 0 && (
                    <p className="text-xs text-ink-400">+{formatPrice(mat.price)}</p>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
