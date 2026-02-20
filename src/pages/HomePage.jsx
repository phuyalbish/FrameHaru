import { motion } from 'framer-motion'
import Hero from '../components/home/Hero'
import MarqueeBand from '../components/home/MarqueeBand'
import HowItWorks from '../components/home/HowItWorks'
import FrameShowcase from '../components/home/FrameShowcase'
import WallPreview from '../components/home/WallPreview'
import Testimonials from '../components/home/Testimonials'
import TrustBadges from '../components/home/TrustBadges'
import FAQ from '../components/home/FAQ'
import Newsletter from '../components/home/Newsletter'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <MarqueeBand />
      <HowItWorks />
      <FrameShowcase />
      <WallPreview />
      <Testimonials />
      <TrustBadges />
      <FAQ />
      <Newsletter />
    </motion.div>
  )
}
