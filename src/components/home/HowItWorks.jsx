import { Upload, Palette, Truck } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '../ui/AnimatedSection'

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Upload Your Photo',
    description: 'Pick your favorite memory from your phone or computer. We accept JPG, PNG, and HEIC files.',
    color: 'bg-teal-500',
    accent: 'text-teal-500',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Choose Your Frame',
    description: 'Select from 8 handcrafted frame styles and 6 sizes. See your photo inside the frame in real-time.',
    color: 'bg-ink-900',
    accent: 'text-ink-900',
  },
  {
    icon: Truck,
    number: '03',
    title: 'Delivered to You',
    description: 'We print, frame, and deliver to your doorstep in 2-3 days. Free delivery in Kathmandu Valley.',
    color: 'bg-teal-700',
    accent: 'text-teal-700',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-28 md:py-36 bg-warm-50 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-warm-100 rounded-full blur-3xl opacity-70" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header - left aligned, editorial style */}
        <AnimatedSection className="mb-20">
          <p className="font-display text-teal-500 uppercase tracking-[0.2em] text-sm mb-4">How It Works</p>
          <h2 className="font-display text-display text-ink-900 max-w-2xl">
            Three simple steps to
            <br />
            <span className="text-teal-500">wall-worthy art</span>
          </h2>
        </AnimatedSection>

        {/* Steps - asymmetric layout with connecting line */}
        <StaggerContainer className="relative">
          {/* Connecting line (desktop) */}
          {/* <div className="hidden md:block absolute top-24 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-teal-200 via-ink-200 to-teal-200" /> */}

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <StaggerItem key={i}>
                <div className={`relative group ${i === 1 ? 'md:mt-12' : ''}`}>
                  {/* Step number circle */}
                  <div className="relative z-10 mb-6 flex items-center gap-4">
                    <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <step.icon size={28} className="text-white" />
                    </div>
                    <span className="font-display text-5xl font-bold text-ink-200 group-hover:text-teal-200 transition-colors duration-500">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pl-0">
                    <h3 className="font-display text-xl font-semibold text-ink-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-ink-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover accent bar */}
                  <div className={`absolute bottom-0 left-0 w-0 h-[3px] ${step.color} rounded-full group-hover:w-full transition-all duration-700 ease-out-expo`} />
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
