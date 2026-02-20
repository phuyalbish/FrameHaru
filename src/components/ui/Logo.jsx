import { cn } from '../../lib/utils'

export default function Logo({ className, color = 'currentColor', showText = true, size = 'md' }) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
  }

  const s = sizes[size] || sizes.md

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Icon matching the Figma logo */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Frame outline */}
        <rect x="8" y="18" width="32" height="32" rx="2" stroke={color} strokeWidth="3.5" fill="none" />
        {/* Corner accent */}
        <rect x="8" y="18" width="8" height="8" rx="1" fill={color} />
        {/* Scattered squares - photo tiles */}
        <rect x="44" y="10" width="7" height="7" rx="1.5" fill={color} />
        <rect x="53" y="10" width="7" height="7" rx="1.5" fill={color} />
        <rect x="53" y="19" width="7" height="7" rx="1.5" fill={color} />
      </svg>
      {showText && (
        <span className={cn('font-display font-semibold tracking-tight', s.text)} style={{ color }}>
          Frameharu
        </span>
      )}
    </div>
  )
}
