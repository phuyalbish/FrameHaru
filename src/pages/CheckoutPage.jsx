import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, CreditCard, Truck, MapPin, Check,
  Shield, ChevronDown, Smartphone, Building2, Package
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useDeliveryZones } from '../hooks/useFrames'
import { formatPrice } from '../lib/utils'
import Button from '../components/ui/Button'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCart()
  const { data: deliveryZones } = useDeliveryZones()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Kathmandu',
    zone: 'Kathmandu Valley',
    notes: '',
    paymentMethod: 'khalti',
  })
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [errors, setErrors] = useState({})

  const selectedZone = deliveryZones?.find((z) => z.zone === form.zone)
  const deliveryFee = selectedZone?.fee || 0
  const grandTotal = totalPrice + deliveryFee

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    if (!form.address.trim()) errs.address = 'Address is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePlaceOrder = () => {
    if (!validate()) return
    setOrderPlaced(true)
    clearCart()
  }

  // Empty cart redirect
  if (items.length === 0 && !orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-32 pb-20 min-h-screen bg-warm-50 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={32} className="text-teal-400" />
          </div>
          <h2 className="font-display text-2xl text-ink-900 mb-2">Your cart is empty</h2>
          <p className="text-ink-500 mb-6">Add some framed photos to get started.</p>
          <Link to="/create">
            <Button variant="primary">Start Creating</Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  // Order success
  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pt-32 pb-20 min-h-screen bg-warm-50 flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto px-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, delay: 0.2 }}
            className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check size={40} className="text-white" />
          </motion.div>
          <h2 className="font-display text-display text-ink-900 mb-4">Order Placed!</h2>
          <p className="text-ink-500 text-lg mb-2">
            Thank you for your order. Your beautifully framed memories are on their way.
          </p>
          <p className="text-ink-400 text-sm mb-8">
            You'll receive a confirmation via SMS at {form.phone}. Expected delivery: {selectedZone?.days || '3-5 business days'}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="outline" size="md">Back to Home</Button>
            </Link>
            <Link to="/create">
              <Button variant="primary" size="md">Frame Another Photo</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 min-h-screen bg-warm-50"
    >
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-ink-500 hover:text-ink-900 font-display text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="font-display text-heading text-ink-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - Form (3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Delivery Info */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-teal-500" />
                </div>
                <h2 className="font-display text-lg font-semibold">Delivery Details</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-display text-ink-600 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-warm-50 focus:bg-white focus:outline-none transition-all font-body ${errors.name ? 'border-red-400' : 'border-transparent focus:border-teal-500'}`}
                    placeholder="Ram Sharma"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-display text-ink-600 mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-warm-50 focus:bg-white focus:outline-none transition-all font-body ${errors.phone ? 'border-red-400' : 'border-transparent focus:border-teal-500'}`}
                    placeholder="+977 98XX-XXXXXX"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-display text-ink-600 mb-1.5">Email (optional)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-warm-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all font-body"
                    placeholder="you@email.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-display text-ink-600 mb-1.5">Delivery Address *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-warm-50 focus:bg-white focus:outline-none transition-all font-body ${errors.address ? 'border-red-400' : 'border-transparent focus:border-teal-500'}`}
                    placeholder="Street, Tole, Ward No."
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-display text-ink-600 mb-1.5">Delivery Zone</label>
                  <div className="relative">
                    <select
                      value={form.zone}
                      onChange={(e) => updateField('zone', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-warm-50 focus:bg-white focus:border-teal-500 focus:outline-none appearance-none transition-all font-body"
                    >
                      {deliveryZones?.map((z) => (
                        <option key={z.zone} value={z.zone}>
                          {z.zone} {z.fee === 0 ? '(Free)' : `(${formatPrice(z.fee)})`}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-display text-ink-600 mb-1.5">Delivery Notes</label>
                  <input
                    type="text"
                    value={form.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-warm-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all font-body"
                    placeholder="Landmark, instructions..."
                  />
                </div>
              </div>

              {selectedZone && (
                <div className="mt-4 flex items-center gap-2 text-sm text-teal-600 bg-teal-50 px-4 py-2.5 rounded-xl">
                  <Truck size={16} />
                  <span>Estimated delivery: {selectedZone.days}</span>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                  <CreditCard size={20} className="text-teal-500" />
                </div>
                <h2 className="font-display text-lg font-semibold">Payment Method</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'khalti', label: 'Khalti', icon: Smartphone },
                  { id: 'esewa', label: 'eSewa', icon: Smartphone },
                  { id: 'bank', label: 'Bank Transfer', icon: Building2 },
                  { id: 'cod', label: 'Cash on Delivery', icon: Package },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => updateField('paymentMethod', method.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${
                      form.paymentMethod === method.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-ink-100 hover:border-ink-200'
                    }`}
                  >
                    <method.icon size={24} className={form.paymentMethod === method.id ? 'text-teal-500' : 'text-ink-400'} />
                    <span className="font-display text-xs font-semibold">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Order summary (2 cols) */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.cartId} className="flex gap-3">
                    <div
                      className="w-16 h-16 rounded-lg flex-shrink-0 bg-cover bg-center"
                      style={{
                        backgroundImage: item.photoPreview ? `url(${item.photoPreview})` : 'none',
                        backgroundColor: item.photoPreview ? 'transparent' : '#E0F2F1',
                        border: `3px solid ${item.frameColor || '#1A1A1A'}`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-sm truncate">{item.frameName}</p>
                      <p className="text-ink-400 text-xs">{item.sizeName}</p>
                      {item.matName !== 'No Mat' && (
                        <p className="text-ink-400 text-xs">{item.matName}</p>
                      )}
                    </div>
                    <p className="font-display text-sm font-semibold">
                      {formatPrice(item.price + (item.matPrice || 0))}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-ink-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">Subtotal ({items.length} frame{items.length > 1 ? 's' : ''})</span>
                  <span className="font-display">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">Delivery</span>
                  <span className="font-display">{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-ink-100">
                  <span className="font-display font-semibold text-lg">Total</span>
                  <span className="font-display font-semibold text-xl text-teal-600">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Place order button */}
              <div className="mt-6">
                <Button
                  onClick={handlePlaceOrder}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Place Order - {formatPrice(grandTotal)}
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-400">
                <Shield size={14} className="text-teal-400" />
                <span>Secure checkout · 100% satisfaction guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
