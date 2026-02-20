import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Button from '../ui/Button'
import { useMouseParallax } from '../../hooks/useScrollAnimation'

export default function Hero() {
  const { ref: parallaxRef, position } = useMouseParallax(0.015)

  return (
    <section
      ref={parallaxRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-teal-500"
    >
      {/* Background pattern - scattered frame shapes */}
      <div className="absolute inset-0 opacity-[0.07]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="framePattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect x="10" y="10" width="40" height="40" rx="3" stroke="white" strokeWidth="2" fill="none" />
              <rect x="70" y="60" width="30" height="30" rx="2" stroke="white" strokeWidth="1.5" fill="none" />
              <rect x="60" y="10" width="8" height="8" rx="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#framePattern)" />
        </svg>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-800/60 via-teal-600/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left - Text content */}
          <div className="max-w-xl">
           

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="font-display text-hero text-white mb-6"
            >
              Your memories,
              <br />
              <span className="relative">
                beautifully
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C60 2 240 2 298 8" stroke="#E0F2F1" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              framed.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            >
              Upload your favorite photos, pick the perfect frame, and we'll deliver
              a museum-quality piece straight to your door.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/create">
                <Button variant="white" size="lg">
                  Frame Your Photo
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="ghost-white" size="lg">
                  <Play size={16} className="ml-0.5" />
                  See How It Works
                </Button>
              </Link>
            </motion.div>

            {/* Social proof ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-4 mt-12"
            >
              <div className="flex -space-x-2">
                {['photo-1494790108377-be9c29b29330', 'photo-1507003211169-0a1dd7228f2d', 'photo-1438761681033-6461ffad8d80', 'photo-1472099645785-5658abf4ff4e'].map((id, i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/${id}?w=64&q=80`}
                    alt=""
                    className="w-9 h-9 rounded-full border-2 border-teal-500 object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-300">
                  {'★★★★★'.split('').map((s, i) => <span key={i} className="text-sm">{s}</span>)}
                </div>
                <p className="text-white/50 text-xs">Loved by 2,000+ customers</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Floating frame collage */}
          <div className="relative hidden lg:block h-[600px]">
            {/* Main large frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
              style={{
                transform: `translate(${position.x * 0.5}px, ${position.y * 0.5}px) rotate(-2deg)`,
              }}
              className="absolute top-8 left-8 w-72 h-80 bg-white p-3 rounded-sm frame-shadow"
            >
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
                alt="Couple photo in frame"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Medium frame - overlapping */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
              style={{
                transform: `translate(${position.x * 0.8}px, ${position.y * 0.8}px) rotate(3deg)`,
              }}
              className="absolute top-32 right-4 w-56 h-56 bg-[#C4A882] p-3 rounded-sm frame-shadow z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80"
                alt="Mountain landscape in oak frame"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Small frame - accent */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{
                transform: `translate(${position.x * 1.2}px, ${position.y * 1.2}px) rotate(-1deg)`,
              }}
              className="absolute bottom-12 left-16 w-40 h-48 bg-ink-900 p-2.5 rounded-sm frame-shadow z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80"
                alt="Portrait photo in black frame"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Tiny accent frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              style={{
                transform: `translate(${position.x * 1.5}px, ${position.y * 1.5}px)`,
              }}
              className="absolute bottom-32 right-16 w-24 h-24 bg-teal-500 p-2 rounded-sm frame-shadow z-30"
            >
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=80"
                alt="Nature photo in teal frame"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 right-24 w-8 h-8 border-2 border-white/20 rounded-sm"
            />
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-4 right-0 w-5 h-5 bg-teal-300/30 rounded-sm"
            />
          </div>
        </div>
      </div>

     
    </section>
  )
}
