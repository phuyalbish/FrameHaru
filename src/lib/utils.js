/**
 * Merge class names conditionally
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Format Nepali Rupees
 */
export function formatPrice(amount) {
  return `Rs. ${amount.toLocaleString('en-NP')}`
}

/**
 * Generate a placeholder image URL with dimensions
 */
export function placeholderImage(w, h, text = '') {
  return `https://placehold.co/${w}x${h}/E0F2F1/00897B?text=${encodeURIComponent(text || `${w}×${h}`)}`
}

/**
 * Validate image resolution for a given print size
 */
export function validateImageResolution(file, sizeId) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const minPixels = {
        '8x8': 1200,
        '8x12': 1200,
        '12x12': 1800,
        '12x16': 1800,
        '16x20': 2400,
        '20x20': 3000,
      }
      const min = minPixels[sizeId] || 1200
      const ok = img.width >= min || img.height >= min
      resolve({ ok, width: img.width, height: img.height, minRequired: min })
      URL.revokeObjectURL(img.src)
    }
    img.src = URL.createObjectURL(file)
  })
}
