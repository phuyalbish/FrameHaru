import { Link } from 'react-router-dom'
import { Instagram, Facebook, Mail, MapPin, Phone, ArrowUpRight, Heart } from 'lucide-react'
import Logo from '../ui/Logo'

export default function Footer() {
  return (
    <footer className="relative bg-ink-900 text-white overflow-hidden">
      {/* Curved top edge */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="#1A1A1A" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-8">
        {/* Top section - CTA band */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-16 border-b border-white/10">
          <div>
            <h3 className="font-display text-display text-white mb-2">
              Ready to frame
              <br />
              <span className="text-teal-300">your story?</span>
            </h3>
            <p className="text-white/50 max-w-md">
              Upload your photos, choose your frames, and we'll deliver beautiful memories to your doorstep.
            </p>
          </div>
          <Link
            to="/create"
            className="group flex items-center gap-3 bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-full font-display font-semibold text-lg transition-all duration-300"
          >
            Start Creating
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          <div>
            <Logo color="#00897B" size="md" />
            <p className="text-white/40 text-sm mt-4 leading-relaxed">
              Handcrafted frames made in Kathmandu. Transforming your digital memories into wall-worthy art.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white/80 uppercase text-xs tracking-widest mb-4">Navigate</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Shop Frames', to: '/shop' },
                { label: 'Create', to: '/create' },
                { label: 'About Us', to: '/about' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/50 hover:text-teal-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white/80 uppercase text-xs tracking-widest mb-4">Support</h4>
            <ul className="space-y-3">
              {['Shipping & Delivery', 'Returns & Refunds', 'FAQs', 'Contact Us'].map((label) => (
                <li key={label}>
                  <a href="#" className="text-white/50 hover:text-teal-300 transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white/80 uppercase text-xs tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/50 text-sm">
                <MapPin size={16} className="flex-shrink-0 mt-0.5 text-teal-400" />
                Kathmandu, Nepal
              </li>
              <li className="flex items-start gap-2 text-white/50 text-sm">
                <Mail size={16} className="flex-shrink-0 mt-0.5 text-teal-400" />
                hello@frameharu.com
              </li>
              <li className="flex items-start gap-2 text-white/50 text-sm">
                <Phone size={16} className="flex-shrink-0 mt-0.5 text-teal-400" />
                +977 9801-234567
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-teal-500/20 flex items-center justify-center text-white/50 hover:text-teal-300 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-teal-500/20 flex items-center justify-center text-white/50 hover:text-teal-300 transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} FrameHaru. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-teal-400" /> in Kathmandu
          </p>
        </div>
      </div>
    </footer>
  )
}
