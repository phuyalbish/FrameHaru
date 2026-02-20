export default function MarqueeBand({ items, className = '' }) {
  const defaultItems = [
    'Wedding Photos',
    'Travel Memories',
    'Family Portraits',
    'Pet Photos',
    'Graduation',
    'Baby Milestones',
    'Anniversary',
    'Festival Moments',
  ]
  const displayItems = items || defaultItems

  return (
    <div className={`py-5 bg-ink-900 overflow-hidden ${className}`}>
      <div className="animate-marquee flex whitespace-nowrap">
        {[...displayItems, ...displayItems].map((item, i) => (
          <span key={i} className="inline-flex items-center mx-6 md:mx-10">
            <span className="font-display text-white/70 text-sm md:text-base uppercase tracking-widest">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
