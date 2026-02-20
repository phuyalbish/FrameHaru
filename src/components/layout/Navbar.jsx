import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, ArrowRight, Trash2 } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import { useCart } from '../../context/CartContext'
import { formatPrice, cn } from '../../lib/utils'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop Frames', to: '/shop' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { items, isOpen, toggleCart, setCartOpen, removeItem, totalItems, totalPrice } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setCartOpen(false)
  }, [location.pathname, setCartOpen])

  const isHome = location.pathname === '/'
  const showWhite = isHome && !scrolled
  const logoColor = showWhite ? '#FFFFFF' : '#00897B'

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo',
          scrolled
            ? 'glass shadow-sm py-3'
            : isHome
              ? 'bg-transparent py-5'
              : 'bg-warm-50 py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <Logo color={logoColor} size="md" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-display font-semibold tracking-wide transition-all duration-300',
                  location.pathname === link.to
                    ? showWhite
                      ? 'bg-white/20 text-white'
                      : 'bg-teal-50 text-teal-600'
                    : showWhite
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Create CTA */}
            <Link to="/create" className="hidden md:block">
              <Button variant={showWhite ? 'white' : 'primary'} size="sm">
                Frame Your Photo
                <ArrowRight size={16} />
              </Button>
            </Link>

            {/* Cart button */}
            <button
              onClick={toggleCart}
              className={cn(
                'relative p-3 rounded-full transition-all duration-300',
                showWhite ? 'text-white hover:bg-white/10' : 'text-ink-700 hover:bg-ink-100'
              )}
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-teal-500 text-white text-xs font-display font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'md:hidden p-3 rounded-full transition-all duration-300',
                showWhite ? 'text-white hover:bg-white/10' : 'text-ink-700 hover:bg-ink-100'
              )}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink-900/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-warm-50 shadow-2xl p-6 pt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      'px-4 py-3 rounded-xl font-display font-semibold text-lg transition-colors',
                      location.pathname === link.to
                        ? 'bg-teal-50 text-teal-600'
                        : 'text-ink-700 hover:bg-ink-100'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-ink-100">
                  <Link to="/create" onClick={() => setMobileOpen(false)}>
                    <Button variant="primary" size="lg" className="w-full">
                      Frame Your Photo
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink-900/50"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-warm-50 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cart header */}
              <div className="flex items-center justify-between p-6 border-b border-ink-100">
                <h2 className="font-display text-xl font-semibold">
                  Your Frames
                  {totalItems > 0 && (
                    <span className="text-teal-500 ml-2">({totalItems})</span>
                  )}
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 rounded-full hover:bg-ink-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                      <ShoppingBag size={32} className="text-teal-400" />
                    </div>
                    <p className="font-display text-lg text-ink-600 mb-2">No frames yet</p>
                    <p className="text-ink-400 text-sm mb-6">Upload a photo to get started</p>
                    <Link to="/create" onClick={() => setCartOpen(false)}>
                      <Button size="sm">Start Creating</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.cartId}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm"
                      >
                        {/* Photo preview in frame */}
                        <div
                          className="w-20 h-20 rounded-lg flex-shrink-0 bg-cover bg-center"
                          style={{
                            backgroundImage: item.photoPreview ? `url(${item.photoPreview})` : 'none',
                            backgroundColor: item.photoPreview ? 'transparent' : '#E0F2F1',
                            border: `3px solid ${item.frameColor || '#1A1A1A'}`,
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-sm truncate">{item.frameName}</p>
                          <p className="text-ink-400 text-xs mt-0.5">{item.sizeName} · {item.matName || 'No mat'}</p>
                          <p className="font-display text-teal-600 font-semibold text-sm mt-1">
                            {formatPrice(item.price + (item.matPrice || 0))}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.cartId)}
                          className="p-2 rounded-full hover:bg-red-50 text-ink-300 hover:text-red-500 transition-colors self-center"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart footer */}
              {items.length > 0 && (
                <div className="border-t border-ink-100 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">Subtotal</span>
                    <span className="font-display text-xl font-semibold">{formatPrice(totalPrice)}</span>
                  </div>
                  <p className="text-xs text-ink-400">Free delivery within Kathmandu Valley</p>
                  <Link to="/checkout" onClick={() => setCartOpen(false)} className="block">
                    <Button variant="primary" size="lg" className="w-full">
                      Checkout
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
