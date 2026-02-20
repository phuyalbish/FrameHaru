import { Truck, Shield, Star, Recycle } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'

const badges = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Anywhere in Kathmandu Valley',
    accent: 'bg-teal-50 text-teal-500',
  },
  {
    icon: Star,
    title: '4.9/5 Rating',
    description: '2,000+ happy customers',
    accent: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: Shield,
    title: '100% Guaranteed',
    description: 'Not happy? Full refund, no questions',
    accent: 'bg-blue-50 text-blue-500',
  },
  {
    icon: Recycle,
    title: 'Sustainably Made',
    description: 'Locally sourced materials',
    accent: 'bg-emerald-50 text-emerald-600',
  },
]

export default function TrustBadges() {
  return (
    <section className="py-20 md:py-28 bg-warm-50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, i) => (
            <StaggerItem key={i}>
              <div className="group text-center md:text-left p-6 rounded-3xl hover:bg-white hover:shadow-lg transition-all duration-500 cursor-default">
                <div className={`w-14 h-14 ${badge.accent} rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <badge.icon size={24} />
                </div>
                <h3 className="font-display font-semibold text-ink-900 mb-1">
                  {badge.title}
                </h3>
                <p className="text-ink-400 text-sm">
                  {badge.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
