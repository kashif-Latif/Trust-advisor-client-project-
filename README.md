# Trust Mark Real Estate Advisor

A modern, premium, and fully responsive front-end real estate website built for **Trust Mark Real Estate Advisor** — a professional real estate consultancy based in Lahore, Pakistan. The website showcases properties, services, and contact information with a polished, brand-consistent design and smooth animations.

---

## Overview

Trust Mark Real Estate Advisor is a client-facing website designed to present property listings, investment deals, and company information in an elegant and professional manner. It features a rich hero section, featured properties grid, property categories, services overview, about the founders, client testimonials, and a comprehensive contact section with direct WhatsApp and phone integration.

The website is **front-end only** — no backend, no database, and no form submissions. All contact actions redirect users to WhatsApp or initiate a phone call directly.

---

## Live Features

- **Hero Section** — Full-screen banner with animated text and call-to-action buttons
- **Featured Properties** — Property cards with images, pricing, location, and detail popups
- **Property Categories** — Visual category grid (Houses, Commercial, Plots, Rentals, Investments)
- **Services Section** — Buy, Sell, and Rent property service cards with CTAs
- **About Us** — Founder/CEO profiles with photos and company values
- **Why Choose Us** — Six key differentiators with icon cards
- **Testimonials** — Client reviews with star ratings
- **Contact Section** — Phone numbers, WhatsApp, email, office address, hours, and social media blocks
- **Floating WhatsApp Button** — Always-visible button (bottom-right) that opens WhatsApp chat with the CEO
- **Scroll-to-Top Button** — Appears on scroll for quick navigation back to top
- **Scroll Indicator** — Animated chevron arrows on the hero section
- **Mobile Navigation** — Slide-out sidebar menu for mobile devices
- **One-Time Animations** — Sections animate into view only once using `useInView` with `once: true`

---

## Tech Stack

| Technology       | Purpose                          |
|------------------|----------------------------------|
| Next.js 16       | React framework (App Router)     |
| TypeScript       | Type safety                      |
| Tailwind CSS 4   | Utility-first styling            |
| Framer Motion    | Animations & transitions         |
| Lucide React     | Icon library                     |
| shadcn/ui        | UI component primitives          |
| React 19         | UI library                       |

---

## Brand Identity

| Element         | Value                                      |
|-----------------|--------------------------------------------|
| Company Name    | Trust Mark Real Estate Advisor             |
| Primary Color   | Navy Blue `#0A1628`                       |
| Accent Color    | Gold `#D4AF37`                            |
| Secondary Color | Soft Blue `#4A90D9`                       |
| Heading Font    | Playfair Display (Google Fonts)            |
| Body Font       | Montserrat (Google Fonts)                  |
| Tagline         | Honesty - Trust - Transparency             |

---

## Project Structure

```
trust-mark-real-estate/
├── public/
│   └── images/
│       ├── banner-premium.jpeg        # Hero banner
│       ├── flyer-1.jpeg               # Property image 1
│       ├── flyer-2.jpeg               # Property image 2
│       ├── banner-services.jpeg        # Services/category image
│       ├── banner-bilingual.jpeg       # Category image
│       ├── banner-ornate.jpeg          # Category image
│       ├── banner-partnership-services.jpeg  # Category image
│       ├── ceo-azam-mushtaq.jpeg       # CEO photo - Azam Mushtaq
│       ├── ceo-imran-nusrat.jpeg       # CEO photo - M. Imran Nusrat
│       ├── contact-cta.jpeg            # Contact section image
│       ├── partnership-announce.jpeg   # Partnership banner
│       └── logo.jpeg                   # Company logo
├── src/
│   ├── app/
│   │   ├── globals.css                # Global styles & Tailwind config
│   │   ├── layout.tsx                 # Root layout with fonts & metadata
│   │   └── page.tsx                   # Main page (all sections)
│   └── components/
│       └── ui/
│           ├── badge.tsx              # Badge component
│           ├── button.tsx             # Button component
│           ├── sheet.tsx              # Sheet (sidebar) component
│           ├── toast.tsx              # Toast component
│           └── toaster.tsx            # Toaster provider
├── next.config.ts                     # Next.js configuration
├── tailwind.config.ts                 # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
├── postcss.config.mjs                 # PostCSS configuration
├── components.json                    # shadcn/ui configuration
└── package.json                       # Dependencies & scripts
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** or **bun** package manager

### Installation

```bash
# Clone or extract the project
cd trust-mark-real-estate

# Install dependencies
npm install
```

### Development

```bash
# Start the development server on port 3000
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start the production server
npm run start
```

---

## Contact Information

| Contact           | Details                          |
|-------------------|----------------------------------|
| Azam Mushtaq      | 0321-4307908 (Founder & CEO)    |
| M. Imran Nusrat   | 0321-8883635 (Founder & CEO)    |
| Email             | trustmarkrea@gmail.com           |
| WhatsApp          | [wa.me/923214307908](https://wa.me/923214307908) |
| Office Address    | DHA Phase 9 Prism Main Ashiana Quaid Lahore Cantt. Lahore |
| Office Hours      | Monday to Saturday: 9:00 AM - 7:00 PM |

---

## Social Media

| Platform   | URL                                                                    |
|------------|------------------------------------------------------------------------|
| Facebook   | [facebook.com/TrustMarkRealEstate](https://facebook.com/TrustMarkRealEstate) |
| Instagram  | [instagram.com/trustmarkrealestate](https://instagram.com/trustmarkrealestate) |
| TikTok     | [tiktok.com/@trustmarkrealestate](https://tiktok.com/@trustmarkrealestate) |
| YouTube    | [youtube.com/@TrustMarkRealEstateAdvisor](https://youtube.com/@TrustMarkRealEstateAdvisor) |

---

## Mobile Responsiveness

The website is fully responsive across all device sizes:

- **Mobile** (< 640px) — Single-column layouts, compact navigation with slide-out menu, touch-optimized tap targets
- **Tablet** (640px - 1024px) — Two-column grids, medium-sized images and cards
- **Desktop** (> 1024px) — Full navigation bar, three-column grids, expanded content sections
- Horizontal overflow is prevented with `overflow-x: hidden` on `html`, `body`, and the main wrapper
- Viewport is locked to device width with no pinch-zoom to ensure consistent mobile rendering

---

## Key Design Decisions

1. **Front-End Only** — No backend or database; all interactions use `tel:` and `wa.me` deep links for direct contact
2. **Components Outside Home()** — All section components are defined outside the `Home()` function to prevent re-mounting and animation re-triggering on state changes
3. **One-Time Animations** — `FadeInWhenVisible` uses Framer Motion's `useInView` with `once: true` so animations only play once when scrolled into view
4. **No Page Breaks** — Single-page layout with smooth scroll navigation between sections
5. **Direct Phone Links** — All "Call Now" buttons display the actual phone number and use `tel:` links for instant dialing
6. **WhatsApp Integration** — Property inquiries auto-generate a WhatsApp message with the property title pre-filled

---

## Deployment

The project can be deployed on any platform that supports Next.js:

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel
```

**Other Platforms:** Netlify, Railway, AWS Amplify, or any Node.js hosting provider.

---

## Developer

**Developed by Mohammad Kashif Latif**

---

## License

This project is proprietary and owned by Trust Mark Real Estate Advisor. All rights reserved.
