import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ShoppingBag, Check } from 'lucide-react'
import PhotoUploader from '../components/builder/PhotoUploader'
import FrameSelector from '../components/builder/FrameSelector'
import SizeSelector from '../components/builder/SizeSelector'
import FramePreviewCanvas from '../components/builder/FramePreviewCanvas'
import Button from '../components/ui/Button'
import { useCart } from '../context/CartContext'
import { useFrames } from '../hooks/useFrames'
import { formatPrice } from '../lib/utils'

const STEPS = [
  { id: 'photo', label: 'Upload Photo', number: '01' },
  { id: 'frame', label: 'Choose Frame', number: '02' },
  { id: 'size', label: 'Size & Mat', number: '03' },
]

export default function BuilderPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addItem, setCartOpen } = useCart()
  const { data: frames } = useFrames()

  const [step, setStep] = useState(0)
  const [photo, setPhoto] = useState(null)
  const [selectedFrame, setSelectedFrame] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedMat, setSelectedMat] = useState(null)
  const [added, setAdded] = useState(false)

  // Pre-select frame from URL param
  useEffect(() => {
    const frameId = searchParams.get('frame')
    if (frameId && frames) {
      const found = frames.find((f) => f.id === frameId)
      if (found) {
        setSelectedFrame(found)
        if (photo) setStep(2)
      }
    }
  }, [searchParams, frames, photo])

  const canProceed = () => {
    if (step === 0) return !!photo
    if (step === 1) return !!selectedFrame
    if (step === 2) return !!selectedSize
    return false
  }

  const handleNext = () => {
    if (step < 2 && canProceed()) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleAddToCart = () => {
    if (!photo || !selectedFrame || !selectedSize) return

    addItem({
      photoPreview: photo.preview,
      photoName: photo.name,
      frameId: selectedFrame.id,
      frameName: selectedFrame.name,
      frameColor: selectedFrame.color,
      sizeId: selectedSize.id,
      sizeName: selectedSize.label,
      matId: selectedMat?.id || 'none',
      matName: selectedMat?.label || 'No Mat',
      price: selectedSize.price,
      matPrice: selectedMat?.price || 0,
    })

    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      setCartOpen(true)
    }, 1200)
  }

  const totalPrice = (selectedSize?.price || 0) + (selectedMat?.price || 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 min-h-screen bg-warm-50"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-heading text-ink-900">Create Your Frame</h1>
          <p className="text-ink-500 mt-1">Upload a photo, choose your frame, and see it come to life.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                if (i < step || (i === 1 && photo) || (i === 2 && photo && selectedFrame)) {
                  setStep(i)
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-display transition-all duration-300 ${
                i === step
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                  : i < step
                    ? 'bg-teal-100 text-teal-700 cursor-pointer hover:bg-teal-200'
                    : 'bg-ink-100 text-ink-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-white/20">
                {i < step ? <Check size={12} /> : s.number}
              </span>
              <span className="hidden md:inline">{s.label}</span>
            </button>
          ))}

          {/* Progress bar */}
          <div className="flex-1 h-1 bg-ink-100 rounded-full ml-4 hidden md:block">
            <motion.div
              className="h-full bg-teal-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            />
          </div>
        </div>

        {/* Main content area - two column layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Preview */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-28 bg-warm-100 rounded-3xl p-4 min-h-[400px] flex items-center justify-center"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4C8BA' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              <FramePreviewCanvas
                photo={photo}
                frame={selectedFrame}
                size={selectedSize}
                mat={selectedMat}
              />
            </div>
          </div>

          {/* Right - Controls */}
          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-photo"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PhotoUploader onPhotoSelect={setPhoto} currentPhoto={photo} />
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-frame"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FrameSelector selectedFrame={selectedFrame} onSelect={setSelectedFrame} />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-size"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SizeSelector
                    selectedSize={selectedSize}
                    onSelectSize={setSelectedSize}
                    selectedMat={selectedMat}
                    onSelectMat={setSelectedMat}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={handleBack}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-display text-sm transition-all ${
                  step > 0
                    ? 'text-ink-600 hover:bg-ink-100'
                    : 'text-ink-300 cursor-not-allowed'
                }`}
                disabled={step === 0}
              >
                <ArrowLeft size={16} />
                Back
              </button>

              {step < 2 ? (
                <Button
                  onClick={handleNext}
                  variant="primary"
                  size="md"
                  className={!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Next Step
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <div className="flex items-center gap-4">
                  {selectedSize && (
                    <span className="font-display text-xl font-semibold text-ink-900">
                      {formatPrice(totalPrice)}
                    </span>
                  )}
                  <Button
                    onClick={handleAddToCart}
                    variant="primary"
                    size="lg"
                    className={!canProceed() || added ? 'pointer-events-none' : ''}
                  >
                    {added ? (
                      <>
                        <Check size={18} />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
