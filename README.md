# FrameHaru - Your Memories, Beautifully Framed

A React + Vite e-commerce platform for custom photo framing, built for Kathmandu, Nepal.

## Quick Start

```bash
# Extract the project
tar -xzf frameharu-project.tar.gz
cd frameharu

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

## Project Structure

```
frameharu/
├── public/
│   └── favicon.svg                    # Logo-based favicon
├── src/
│   ├── assets/
│   │   └── data/
│   │       └── products.json          # All dummy data (frames, sizes, testimonials, FAQs)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx             # Glass navbar + cart drawer + mobile menu
│   │   │   ├── Footer.jsx             # Editorial footer with wave divider
│   │   │   └── Layout.jsx             # Root layout wrapper
│   │   ├── home/
│   │   │   ├── Hero.jsx               # Full-bleed hero with floating frame collage
│   │   │   ├── HowItWorks.jsx         # 3-step animated flow
│   │   │   ├── FrameShowcase.jsx      # Asymmetric gallery with frame overlays
│   │   │   ├── WallPreview.jsx        # Interactive gallery wall layout selector
│   │   │   ├── Testimonials.jsx       # Horizontal-scrolling customer cards
│   │   │   ├── TrustBadges.jsx        # Delivery, rating, guarantee badges
│   │   │   ├── FAQ.jsx                # Accordion FAQs with sticky header
│   │   │   ├── Newsletter.jsx         # Email signup
│   │   │   └── MarqueeBand.jsx        # Infinite scrolling text band
│   │   ├── builder/
│   │   │   ├── PhotoUploader.jsx      # Drag-and-drop upload with preview
│   │   │   ├── FrameSelector.jsx      # Horizontal frame picker with swatches
│   │   │   ├── SizeSelector.jsx       # Size + mat option cards
│   │   │   └── FramePreviewCanvas.jsx # Real-time frame preview with parallax
│   │   ├── frames/
│   │   │   └── FrameCard.jsx          # Individual frame card for shop grid
│   │   └── ui/
│   │       ├── AnimatedSection.jsx    # Scroll-triggered reveal wrappers
│   │       ├── Button.jsx             # Multi-variant button component
│   │       └── Logo.jsx               # SVG logo matching Figma brand
│   ├── hooks/
│   │   ├── useFrames.js               # TanStack Query hooks for all data
│   │   └── useScrollAnimation.js      # IntersectionObserver + mouse parallax hooks
│   ├── context/
│   │   └── CartContext.jsx            # Cart state management (add/remove/update)
│   ├── pages/
│   │   ├── HomePage.jsx               # Landing page (all sections composed)
│   │   ├── ShopPage.jsx               # Frame catalog with material filter
│   │   ├── BuilderPage.jsx            # 3-step frame customizer (upload→frame→size)
│   │   ├── CheckoutPage.jsx           # One-step checkout with Nepal payment methods
│   │   └── AboutPage.jsx              # Brand story + values
│   ├── lib/
│   │   └── utils.js                   # formatPrice, cn, image validation
│   ├── styles/
│   │   └── index.css                  # Tailwind + custom classes (shadows, grain, glass)
│   ├── App.jsx                        # Router + AnimatePresence
│   └── main.jsx                       # React mount + providers
├── index.html                         # Root HTML with Cal Sans + DM Sans fonts
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Tech Stack

| Layer           | Technology                              |
| --------------- | --------------------------------------- |
| Framework       | React 18 + Vite 6                       |
| Styling         | Tailwind CSS 3.4                        |
| Data            | TanStack Query v5 (from JSON, swap to API) |
| Routing         | React Router v6                         |
| Animation       | Framer Motion 11                        |
| Icons           | Lucide React                            |
| File Upload     | react-dropzone                          |
| State           | React Context (cart)                    |

## Design System

- **Primary:** `#00897B` (teal-500)
- **Headings:** Cal Sans (SemiBold)
- **Body:** National Park (mapped to DM Sans CDN, replace with actual font files in production)
- **Warm neutrals:** `#FAFAF7`, `#F5F0EB`, `#EDE5DC`
- **Ink:** `#1A1A1A` through `#EDEDED`

## Key Pages & Flows

1. **Homepage** → Single-funnel conversion page: Hero → Marquee → How It Works → Frame Showcase → Wall Preview → Testimonials → Trust → FAQ → Newsletter
2. **Shop** → Filterable frame catalog with material tabs
3. **Create** → Upload photo → Pick frame → Choose size/mat → Add to cart (3-step builder)
4. **Checkout** → Delivery address + zone → Payment method (Khalti/eSewa/Bank/COD) → Place order
5. **About** → Brand story + values

## Swapping to Real API

Replace the simulated fetchers in `src/hooks/useFrames.js` with real API calls:

```js
const fetchFrames = async () => {
  const res = await fetch('/api/frames')
  return res.json()
}
```

TanStack Query handles caching, loading, and error states automatically.

## Production Notes

- Replace DM Sans with actual National Park font files
- Add real image CDN (Cloudinary, etc.)
- Integrate Khalti/eSewa payment SDKs
- Add image compression on upload (browser-image-compression)
- Set up backend API for orders + inventory
