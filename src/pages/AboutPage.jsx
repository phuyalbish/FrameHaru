import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Heart, Leaf, Award } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'

const values = [
  {
    icon: Heart,
    title: 'Memory First',
    description: 'Every frame we make exists to honor a moment that matters. We treat your photos with the care they deserve.',
  },
  {
    icon: Leaf,
    title: 'Sustainably Crafted',
    description: 'Our wood is locally sourced from sustainable Nepali forests. Every frame supports local artisan communities.',
  },
  {
    icon: Award,
    title: 'Quality Obsessed',
    description: 'Museum-grade prints, hand-finished frames, and archival materials that keep your memories vivid for decades.',
  },
  {
    icon: MapPin,
    title: 'Made in Kathmandu',
    description: 'Designed, printed, and framed in our workshop in the heart of Kathmandu. Supporting local talent and traditions.',
  },
]

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pb-32 bg-ink-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1600&q=60"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-teal-400 uppercase tracking-[0.2em] text-sm mb-6"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-hero text-white max-w-4xl"
          >
            Turning moments
            <br />
            into <span className="text-teal-300">monuments</span>
          </motion.h1>
        </div>
      </section>

      {/* Brand story - editorial layout */}
      <section className="py-24 md:py-32 bg-warm-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection variant="slideRight">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80"
                  alt="FrameHaru workshop"
                  className="rounded-3xl shadow-xl w-full aspect-[4/5] object-cover"
                />
                {/* Overlapping accent frame */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-teal-500 rounded-2xl p-3 shadow-xl hidden md:block">
                  <img
                    src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=80"
                    alt="Framed nature photo"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="slideLeft">
              <p className="font-display text-teal-500 uppercase tracking-[0.2em] text-sm mb-4">
                Why FrameHaru
              </p>
              <h2 className="font-display text-display text-ink-900 mb-6">
                Because memories
                <br />
                deserve better than
                <br />
                a phone screen
              </h2>
              <div className="space-y-4 text-ink-500 text-lg leading-relaxed">
                <p>
                  We started FrameHaru because we noticed something - our most precious moments were trapped in phone galleries, rarely seen again. In Nepal, custom framing was expensive, time-consuming, and required visiting a shop.
                </p>
                <p>
                  We wanted to change that. Now you can turn any photo into a beautifully framed piece of wall art from the comfort of your couch. Each frame is handcrafted in our Kathmandu workshop using sustainably sourced materials and museum-grade printing.
                </p>
                <p>
                  "Haru" means "plural" in Nepali - because one frame is never enough. Once you see your memories on your wall, you'll want them everywhere.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/create">
                  <Button variant="primary" size="lg">
                    Start Framing
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-warm-100">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="font-display text-teal-500 uppercase tracking-[0.2em] text-sm mb-4">
              What We Stand For
            </p>
            <h2 className="font-display text-display text-ink-900">
              Our values
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <StaggerItem key={i}>
                <div className="bg-white rounded-3xl p-8 h-full shadow-sm hover:shadow-lg transition-shadow duration-500">
                  <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-5">
                    <value.icon size={22} className="text-teal-500" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-ink-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 md:py-32 bg-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="aboutDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aboutDots)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-display text-display text-white mb-6">
              Your walls are waiting
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Upload your first photo today and see the magic. Free delivery in Kathmandu Valley.
            </p>
            <Link to="/create">
              <Button variant="white" size="xl">
                Frame Your First Photo
                <ArrowRight size={20} />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
