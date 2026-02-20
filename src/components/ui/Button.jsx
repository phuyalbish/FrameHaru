import { cn } from '../../lib/utils'
import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30',
  secondary:
    'bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-700',
  outline:
    'border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white',
  'outline-teal':
    'border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white',
  ghost:
    'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
  'ghost-white':
    'text-white/90 hover:bg-white/10 hover:text-white',
  white:
    'bg-white text-ink-900 hover:bg-warm-100 shadow-lg',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
  icon: 'p-3',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  rounded = 'full',
  as: Component = 'button',
  animate = true,
  ...props
}) {
  const Wrapper = animate ? motion.div : 'div'
  const roundedClass = {
    full: 'rounded-full',
    lg: 'rounded-2xl',
    md: 'rounded-xl',
    none: 'rounded-none',
  }[rounded]

  const inner = (
    <Component
      className={cn(
        'inline-flex items-center justify-center gap-2 font-display font-semibold tracking-wide transition-all duration-300 ease-out-expo cursor-pointer select-none',
        roundedClass,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )

  if (!animate) return inner

  return (
    <Wrapper
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      {inner}
    </Wrapper>
  )
}
