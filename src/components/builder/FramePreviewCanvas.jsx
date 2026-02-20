import { motion } from 'framer-motion'
import { useMouseParallax } from '../../hooks/useScrollAnimation'
import { cn } from '../../lib/utils'

export default function FramePreviewCanvas({ photo, frame, size, mat }) {
  const { ref, position } = useMouseParallax(0.008)

  // Calculate frame dimensions based on size ratio
  const getAspectRatio = () => {
    if (!size) return 1
    const parts = size.id.split('x')
    return parseInt(parts[0]) / parseInt(parts[1])
  }

  const aspect = getAspectRatio()
  const isSquare = aspect === 1
  const isPortrait = aspect < 1
  const frameColor = frame?.color || '#1A1A1A'
  const matColor = mat?.color || null
  const borderWidth = frame?.borderWidth || 12
  const isTransparent = frameColor === 'transparent'

  return (
    <div
      ref={ref}
      className="flex items-center justify-center p-8 md:p-12"
    >
      {/* Wall background */}
      <div className="relative">
        {/* Frame shadow on wall */}
        <div
          className="absolute -inset-4 rounded-sm"
          style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 24px 64px rgba(0,0,0,0.06)',
            transform: `translate(${position.x * 0.3}px, ${position.y * 0.3}px)`,
          }}
        />

        {/* The frame itself */}
        <motion.div
          layout
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className={cn(
            'relative overflow-hidden',
            isTransparent ? 'bg-transparent' : ''
          )}
          style={{
            width: isSquare ? '280px' : isPortrait ? '240px' : '320px',
            aspectRatio: aspect || 1,
            border: isTransparent
              ? '2px solid rgba(0,0,0,0.1)'
              : `${borderWidth}px solid ${frameColor}`,
            borderRadius: isTransparent ? '2px' : '1px',
            transform: `translate(${position.x}px, ${position.y}px)`,
            boxShadow: isTransparent
              ? 'inset 0 0 0 1px rgba(0,0,0,0.05)'
              : `inset 0 2px 4px rgba(0,0,0,0.1), inset 0 -1px 2px rgba(255,255,255,0.1)`,
          }}
        >
          {/* Mat layer */}
          {matColor && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: matColor, padding: '12%' }}
            >
              {/* Photo inside mat */}
              {photo ? (
                <img
                  src={photo.preview}
                  alt="Your framed photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-ink-100 flex items-center justify-center">
                  <span className="text-ink-300 text-sm font-display">Your Photo</span>
                </div>
              )}
            </div>
          )}

          {/* Photo without mat */}
          {!matColor && (
            <>
              {photo ? (
                <img
                  src={photo.preview}
                  alt="Your framed photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-ink-100 flex items-center justify-center">
                  <span className="text-ink-300 text-sm font-display">Your Photo</span>
                </div>
              )}
            </>
          )}

          {/* Glass reflection effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)',
            }}
          />
        </motion.div>

        {/* Frame label */}
        {frame && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <span className="text-xs font-display text-ink-400">
              {frame.name} {size ? `· ${size.label}` : ''}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
