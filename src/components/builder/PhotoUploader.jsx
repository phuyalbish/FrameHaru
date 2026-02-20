import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, X, AlertCircle, Camera } from 'lucide-react'
import Button from '../ui/Button'

export default function PhotoUploader({ onPhotoSelect, currentPhoto }) {
  const [error, setError] = useState(null)

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setError(null)
      if (rejectedFiles.length > 0) {
        setError('Please upload a JPG, PNG, or HEIC file under 30MB.')
        return
      }
      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          onPhotoSelect({
            file,
            preview: reader.result,
            name: file.name,
          })
        }
        reader.readAsDataURL(file)
      }
    },
    [onPhotoSelect]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/heic': ['.heic'],
    },
    maxSize: 30 * 1024 * 1024,
    multiple: false,
  })

  if (currentPhoto) {
    return (
      <div className="space-y-4">
        <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg">
          <img
            src={currentPhoto.preview}
            alt="Your uploaded photo"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => onPhotoSelect(null)}
            className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
            <Image size={14} className="text-teal-500" />
            <span className="text-xs font-display text-ink-700 truncate max-w-[150px]">
              {currentPhoto.name}
            </span>
          </div>
        </div>
        <button
          onClick={() => onPhotoSelect(null)}
          className="block mx-auto text-sm text-ink-400 hover:text-teal-500 font-display transition-colors"
        >
          Choose a different photo
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-3xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-teal-500 bg-teal-50 scale-[1.02]'
            : 'border-ink-200 hover:border-teal-400 hover:bg-teal-50/50'
        }`}
      >
        <input {...getInputProps()} />

        <motion.div
          animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
          className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <Upload size={32} className="text-teal-500" />
        </motion.div>

        <h3 className="font-display text-xl font-semibold text-ink-900 mb-2">
          {isDragActive ? 'Drop your photo here' : 'Upload your memory'}
        </h3>
        <p className="text-ink-400 text-sm mb-6 max-w-xs mx-auto">
          Drag and drop your photo here, or click to browse. We accept JPG, PNG, and HEIC up to 30MB.
        </p>

        <Button variant="outline-teal" size="sm" as="div">
          <Camera size={16} />
          Choose Photo
        </Button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
