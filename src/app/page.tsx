'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Home as HomeIcon,
  Building2,
  Map,
  Key,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Users,
  ShieldCheck,
  Eye,
  Heart,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Star,
  BedDouble,
  Bath,
  Maximize,
  Menu,
  ChevronRight,
  Facebook,
  Instagram,
  Youtube,
  ArrowUp,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

/* ------------------------------------------------------------------ */
/*  CONSTANTS                                                          */
/* ------------------------------------------------------------------ */

const PHONE_NUMBERS = [
  { name: 'Azam Mushtaq', number: '0321-4307908', raw: '+923214307908' },
]

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/share/1GJaEqUXNq/',
    color: '#1877F2',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/muhammad.azam.92798072?utm_source=qr&igsh=MXVqOGUwczNud2l3Mw==',
    color: '#E4405F',
  },
  {
    name: 'TikTok',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.98a8.22 8.22 0 004.76 1.52V7.05a4.83 4.83 0 01-1-.36z" />
      </svg>
    ),
    url: 'https://www.tiktok.com/@user12554205627676?_r=1&_t=ZS-96LaMmrMFVt',
    color: '#010101',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://www.youtube.com/@MNAJMI1978',
    color: '#FF0000',
  },
]

const OFFICE_HOURS = 'Monday to Saturday: 9:00 AM – 7:00 PM'

/* ------------------------------------------------------------------ */
/*  ANIMATION HELPER                                                   */
/* ------------------------------------------------------------------ */

function FadeInWhenVisible({
  children,
  className,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const dirMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Properties', href: '#properties' },
  { label: 'Buy', href: '#services' },
  { label: 'Sell', href: '#services' },
  { label: 'Rent', href: '#services' },
  { label: 'Investment Deals', href: '#categories' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const PROPERTIES = [
  {
    title: '5 Marla House for Sale',
    price: 'PKR 85 Lakhs',
    location: 'DHA Phase 5, Lahore',
    type: 'House',
    area: '5 Marla',
    beds: 3,
    baths: 2,
    image: '/images/flyer-1.jpeg',
    description:
      'A beautifully designed 5 Marla house located in the prestigious DHA Phase 5, Lahore. This property features 3 spacious bedrooms, 2 modern bathrooms, a well-equipped kitchen, and a comfortable living area. Ideal for families looking for a secure and well-maintained neighborhood with all amenities nearby.',
  },
  {
    title: '10 Marla Residential Plot',
    price: 'PKR 1.2 Crore',
    location: 'Bahria Town, Lahore',
    type: 'Plot',
    area: '10 Marla',
    beds: 0,
    baths: 0,
    image: '/images/flyer-2.jpeg',
    description:
      'A prime 10 Marla residential plot situated in the highly sought-after Bahria Town, Lahore. This plot offers an excellent opportunity for investment or building your dream home in a gated community with world-class amenities including parks, schools, hospitals, and commercial areas.',
  },
  {
    title: 'Commercial Shop for Rent',
    price: 'PKR 1.5 Lakhs/month',
    location: 'Gulberg III, Lahore',
    type: 'Commercial',
    area: '200 Sq Ft',
    beds: 0,
    baths: 0,
    image: '/images/banner-services.jpeg',
    description:
      'A well-located commercial shop available for rent in the bustling area of Gulberg III, Lahore. With 200 square feet of space, this shop is perfect for retail businesses, offices, or service providers. High foot traffic and excellent visibility make this an ideal business location.',
  },
  {
    title: 'Investment Deal in Lahore',
    price: 'PKR 95 Lakhs',
    location: 'DHA Phase 9 Prism',
    type: 'Investment',
    area: '5 Marla File',
    beds: 0,
    baths: 0,
    image: '/images/banner-bilingual.jpeg',
    description:
      'An excellent investment opportunity in DHA Phase 9 Prism, one of Lahores fastest-growing and most promising housing societies. This 5 Marla file is available at a competitive price with high expected returns as development progresses. Secure your future investment today.',
  },
  {
    title: 'Plot File Available',
    price: 'PKR 45 Lakhs',
    location: 'Park View City, Lahore',
    type: 'File',
    area: '5 Marla File',
    beds: 0,
    baths: 0,
    image: '/images/banner-ornate.jpeg',
    description:
      'An affordable 5 Marla plot file available in Park View City, Lahore. This is a great entry-level investment opportunity in a developing society with excellent future potential. Park View City offers modern infrastructure, gated security, and a family-friendly environment.',
  },
  {
    title: 'Rental Property Available',
    price: 'PKR 80 Thousands/month',
    location: 'Johar Town, Lahore',
    type: 'Rental',
    area: '7 Marla',
    beds: 4,
    baths: 3,
    image: '/images/banner-partnership-services.jpeg',
    description:
      'A spacious 7 Marla rental property in Johar Town, Lahore featuring 4 bedrooms and 3 bathrooms. This well-maintained house is perfect for families, offering a comfortable living space in a well-connected neighborhood with easy access to schools, markets, and public transport.',
  },
]

const CATEGORIES = [
  { name: 'Houses for Sale', icon: HomeIcon, image: '/images/flyer-1.jpeg' },
  { name: 'Commercial Properties', icon: Building2, image: '/images/flyer-2.jpeg' },
  { name: 'Plots & Files', icon: Map, image: '/images/banner-services.jpeg' },
  { name: 'Rental Properties', icon: Key, image: '/images/banner-bilingual.jpeg' },
  { name: 'Investment Deals', icon: TrendingUp, image: '/images/banner-ornate.jpeg' },
]

const SERVICES = [
  {
    title: 'Buy Property',
    icon: ShoppingBag,
    description:
      'Find your dream property with our expert guidance. We offer verified listings across Lahore and Pakistan, ensuring you make the best investment.',
    cta: 'Explore Properties',
    ctaColor: 'bg-gold hover:bg-gold-dark text-navy',
  },
  {
    title: 'Sell Property',
    icon: DollarSign,
    description:
      'Get the best value for your property with our professional marketing and vast buyer network. We ensure transparent and profitable deals.',
    cta: 'List Your Property',
    ctaColor: 'bg-soft-blue hover:bg-soft-blue-dark text-white',
  },
  {
    title: 'Rent Property',
    icon: Key,
    description:
      'Discover perfect rental properties that match your needs and budget. From houses to commercial spaces, we have it all covered.',
    cta: 'Find Rentals',
    ctaColor: 'bg-navy hover:bg-navy-light text-white',
  },
]

const WHY_CHOOSE_US = [
  { icon: Users, title: 'Professional & Experienced Team', desc: 'Our team of seasoned real estate professionals brings years of market expertise to guide your property decisions.' },
  { icon: ShieldCheck, title: 'Verified Property Listings', desc: 'Every property we list is thoroughly verified, ensuring authenticity and protecting you from fraud.' },
  { icon: Eye, title: 'Transparent Dealings', desc: 'We believe in complete transparency. No hidden fees, no surprises — just honest and clear transactions.' },
  { icon: TrendingUp, title: 'Best Investment Opportunities', desc: 'Access exclusive investment deals with high return potential, curated by our market analysis experts.' },
  { icon: Heart, title: 'Customer Satisfaction Priority', desc: 'Your satisfaction is our top priority. We go above and beyond to ensure every client is delighted with our service.' },
  { icon: FileText, title: 'Documentation Assistance', desc: 'From property papers to legal documentation, we assist you at every step for a hassle-free experience.' },
]

const TESTIMONIALS = [
  { name: 'Ahmed Raza', role: 'Property Investor', text: 'Trust Mark helped me find the perfect investment property in DHA. Their transparency and professionalism are unmatched in the market.', rating: 5 },
  { name: 'Sara Malik', role: 'Home Buyer', text: 'I was nervous about buying my first home, but the team at Trust Mark made the entire process smooth and stress-free. Highly recommended!', rating: 5 },
  { name: 'Usman Khan', role: 'Business Owner', text: 'Found a great commercial space through Trust Mark. Their knowledge of the Lahore market is exceptional and they truly value their clients.', rating: 4 },
]

/* ------------------------------------------------------------------ */
/*  SHARED UI COMPONENTS (outside Home — stable identity)              */
/* ------------------------------------------------------------------ */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {children}
      </h2>
      <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
    </div>
  )
}

function ContactInfoBlock({ textColor = 'navy', subColor = 'muted', size = 'sm' }: { textColor?: string; subColor?: string; size?: 'sm' | 'base' }) {
  const textCls = textColor === 'white' ? 'text-white' : 'text-navy'
  const subCls = subColor === 'white/60' ? 'text-white/60' : subColor === 'white/70' ? 'text-white/70' : 'text-muted-foreground'
  const sz = size === 'base' ? 'text-base' : 'text-sm'
  const iconBg = textColor === 'white' ? 'bg-white/10' : 'bg-navy/5'
  const iconClr = textColor === 'white' ? 'text-gold' : 'text-navy'

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
          <Phone className={`w-4 h-4 ${iconClr}`} />
        </div>
        <div>
          <p className={`${subCls} text-xs mb-0.5`}>Phone</p>
          {PHONE_NUMBERS.map((p) => (
            <p key={p.number} className={`${textCls} font-semibold ${sz}`}>{p.name}: {p.number}</p>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
          <Mail className={`w-4 h-4 ${iconClr}`} />
        </div>
        <div>
          <p className={`${subCls} text-xs mb-0.5`}>Email</p>
          <p className={`${textCls} font-semibold ${sz}`}>trustmarkrea@gmail.com</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
          <MapPin className={`w-4 h-4 ${iconClr}`} />
        </div>
        <div>
          <p className={`${subCls} text-xs mb-0.5`}>Office Address</p>
          <p className={`${textCls} font-semibold ${sz}`}>DHA Phase 9 Prism Main Ashiana Quaid Lahore Cantt. Lahore</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
          <Clock className={`w-4 h-4 ${iconClr}`} />
        </div>
        <div>
          <p className={`${subCls} text-xs mb-0.5`}>Office Hours</p>
          <p className={`${textCls} font-semibold ${sz}`}>{OFFICE_HOURS}</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  SECTION COMPONENTS (outside Home — stable identity = no remount)   */
/* ------------------------------------------------------------------ */

function HeaderSection({
  scrolled,
  activeSection,
  scrollTo,
  onCallOpen,
  mobileOpen,
  setMobileOpen,
}: {
  scrolled: boolean
  activeSection: string
  scrollTo: (href: string) => void
  onCallOpen: () => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-2 md:gap-3 shrink-0">
            <img src="/images/logo.jpeg" alt="Trust Mark Logo" className="w-9 h-9 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-gold" />
            <div className="hidden sm:block">
              <p className={`text-sm md:text-base font-bold leading-tight transition-colors ${scrolled ? 'text-navy' : 'text-white'}`} style={{ fontFamily: 'var(--font-playfair)' }}>TRUST MARK</p>
              <p className={`text-[10px] md:text-xs leading-tight transition-colors ${scrolled ? 'text-navy/70' : 'text-white/80'}`}>Real Estate Advisor</p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button key={link.label} onClick={() => scrollTo(link.href)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeSection === link.href.replace('#', '') ? 'text-gold' : scrolled ? 'text-navy hover:text-gold' : 'text-white/90 hover:text-gold'}`}>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a href="https://wa.me/923214307908" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full px-4 py-2 text-sm font-medium transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href="tel:+923214307908" className="inline-flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-navy rounded-full px-4 py-2 text-sm font-semibold transition-colors">
              <Phone className="w-4 h-4" /> 0321-4307908
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href="https://wa.me/923214307908" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full transition-colors text-[#25D366]">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="tel:+923214307908" className={`p-2 rounded-full transition-colors ${scrolled ? 'text-gold' : 'text-gold'}`}>
              <Phone className="w-5 h-5" />
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className={`p-2 rounded-md transition-colors ${scrolled ? 'text-navy' : 'text-white'}`} aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <img src="/images/logo.jpeg" alt="Trust Mark" className="w-8 h-8 rounded-full ring-1 ring-gold" />
                    <span className="text-navy font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>Trust Mark</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-4">
                  {NAV_LINKS.map((link) => (
                    <button key={link.label} onClick={() => scrollTo(link.href)} className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all hover:bg-gold/10 ${activeSection === link.href.replace('#', '') ? 'text-gold bg-gold/5' : 'text-navy'}`}>
                      {link.label}
                    </button>
                  ))}
                  <div className="mt-4 flex flex-col gap-2 px-4">
                    <a href="https://wa.me/923214307908" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full w-full py-2 text-sm font-medium transition-colors">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                    <a href="tel:+923214307908" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy rounded-full w-full py-2 text-sm font-semibold transition-colors">
                      <Phone className="w-4 h-4" /> 0321-4307908
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

function HeroSection({ scrollTo }: { scrollTo: (href: string) => void }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img src="/images/banner-premium.jpeg" alt="Trust Mark Premium Banner" className="w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 overlay-dark" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            TRUST MARK <span className="text-gradient-gold">REAL ESTATE</span> ADVISOR
          </h1>
          <p className="text-base md:text-xl text-white/80 mb-2">Buy | Sell | Rent Properties Across Pakistan</p>
          <p className="text-gold font-semibold text-sm md:text-lg mb-8 md:mb-10 tracking-wider">Honesty &bull; Trust &bull; Transparency</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <Button onClick={() => scrollTo('#properties')} className="bg-gold hover:bg-gold-dark text-navy font-semibold rounded-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base shadow-gold">
              <ShoppingBag className="w-4 h-4 mr-1 sm:mr-2" /> Buy Property
            </Button>
            <Button onClick={() => scrollTo('#services')} className="bg-soft-blue hover:bg-soft-blue-dark text-white font-semibold rounded-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base">
              <DollarSign className="w-4 h-4 mr-1 sm:mr-2" /> Sell Property
            </Button>
            <Button onClick={() => scrollTo('#services')} className="bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base border border-white/30">
              <Key className="w-4 h-4 mr-1 sm:mr-2" /> Rent Property
            </Button>
          </div>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <div className="flex flex-col items-center">
          <ChevronRight className="w-5 h-5 text-gold rotate-90" />
          <ChevronRight className="w-5 h-5 text-gold/50 rotate-90 -mt-2" />
        </div>
      </motion.div>
    </section>
  )
}

function FeaturedPropertiesSection({ onSelectProperty }: { onSelectProperty: (p: typeof PROPERTIES[0]) => void }) {
  return (
    <section id="properties" className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible><SectionTitle>Featured Properties</SectionTitle></FadeInWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROPERTIES.map((p, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.1}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="relative h-44 sm:h-52 md:h-56 overflow-hidden cursor-pointer" onClick={() => onSelectProperty(p)}>
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-3 left-3"><Badge className="bg-gold text-navy font-semibold text-xs px-3 py-1">{p.type}</Badge></div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-navy mb-1 cursor-pointer hover:text-gold transition-colors" style={{ fontFamily: 'var(--font-playfair)' }} onClick={() => onSelectProperty(p)}>{p.title}</h3>
                  <p className="text-gold font-bold text-base mb-2">{p.price}</p>
                  <div className="flex items-center text-muted-foreground text-sm mb-3"><MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />{p.location}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" />{p.area}</span>
                    {p.beds > 0 && <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{p.beds} Beds</span>}
                    {p.baths > 0 && <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{p.baths} Baths</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 text-navy border-navy hover:bg-navy hover:text-white rounded-lg text-sm" onClick={() => onSelectProperty(p)}>View Details</Button>
                    <a href={`https://wa.me/923214307908?text=I%20am%20interested%20in%20${encodeURIComponent(p.title)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1da851] text-white rounded-lg text-sm px-3 py-2 transition-colors"><MessageCircle className="w-4 h-4" /></a>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}

function PropertyCategoriesSection({ scrollTo }: { scrollTo: (href: string) => void }) {
  return (
    <section id="categories" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible><SectionTitle>Property Categories</SectionTitle></FadeInWhenVisible>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.1}>
              <div className="group relative h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden cursor-pointer" onClick={() => scrollTo('#properties')}>
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3 sm:p-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <cat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-gold" />
                  </div>
                  <h3 className="text-xs sm:text-base md:text-lg font-bold text-center mb-1 sm:mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>{cat.name}</h3>
                  <span className="bg-gold hover:bg-gold-dark text-navy rounded-full text-xs font-semibold px-4 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1">
                    View Properties <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection({ scrollTo }: { scrollTo: (href: string) => void }) {
  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Our Services</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </div>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((svc, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.15}>
              <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svc.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>{svc.title}</h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">{svc.description}</p>
                <Button className={`${svc.ctaColor} rounded-full px-6 font-semibold shadow-lg`} onClick={() => scrollTo('#contact')}>
                  {svc.cta} <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutUsSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible><SectionTitle>About Us</SectionTitle></FadeInWhenVisible>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <FadeInWhenVisible direction="left">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group w-full">
              <img src="/images/ceo-azam-mushtaq.jpeg" alt="Azam Mushtaq - Founder & CEO" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/90 to-transparent p-5">
                <p className="text-white font-bold text-lg md:text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>Azam Mushtaq</p>
                <p className="text-gold text-sm md:text-base">Founder &amp; CEO</p>
              </div>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="right">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Who We Are</h3>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">Trust Mark Real Estate Advisor is a professional real estate consultancy dedicated to helping clients make smart and secure property decisions. We specialize in providing the best opportunities in the Pakistan property market for homes, plots, commercial spaces, and investment projects.</p>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">Our company believes in building long-term relationships through:</p>
              <ul className="space-y-2 mb-6">
                {['Honesty', 'Trust', 'Transparency', 'Professional Commitment'].map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm md:text-base"><div className="w-2 h-2 bg-gold rounded-full shrink-0" /><span className="text-navy font-medium">{v}</span></li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">We guide our clients at every step, from property selection to final transaction completion, ensuring a smooth and reliable experience.</p>
            </div>
          </FadeInWhenVisible>
        </div>
        <FadeInWhenVisible className="mt-12 md:mt-16">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img src="/images/partnership-announce.jpeg" alt="Partnership Announcement" className="w-full h-36 sm:h-48 md:h-64 object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-navy/40 flex items-center justify-center">
              <p className="text-white text-xl md:text-3xl font-bold text-center px-4" style={{ fontFamily: 'var(--font-playfair)' }}>Building Partnerships, Creating Value</p>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}

function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible><SectionTitle>Why Choose Us?</SectionTitle></FadeInWhenVisible>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {WHY_CHOOSE_US.map((item, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.1}>
              <div className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-gold/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-14 h-14 rounded-xl bg-navy/5 border border-navy/10 flex items-center justify-center mb-4 group-hover:bg-gold/10 group-hover:border-gold/20 transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible><SectionTitle>What Our Clients Say</SectionTitle></FadeInWhenVisible>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.15}>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 relative">
                <div className="absolute -top-3 left-6 text-5xl text-gold/20 font-serif leading-none">&ldquo;</div>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={`w-4 h-4 ${s < t.rating ? 'text-gold fill-gold' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center"><span className="text-white font-bold text-sm">{t.name.charAt(0)}</span></div>
                  <div><p className="text-navy font-semibold text-sm">{t.name}</p><p className="text-muted-foreground text-xs">{t.role}</p></div>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-navy relative overflow-hidden">
      <div className="absolute -top-1/2 -right-[10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-soft-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeInWhenVisible>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block bg-gold/20 text-gold text-xs font-semibold px-4 py-1.5 rounded-full mb-4">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Ready to Find Your Next Property?</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </div>
        </FadeInWhenVisible>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <FadeInWhenVisible direction="left">
            <div>
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8">Connect with <strong className="text-white">TRUST MARK REAL ESTATE ADVISOR</strong> for buying, selling, renting, and investment opportunities. Our team is ready to assist you with honest, transparent, and professional real estate guidance.</p>
              <div className="flex flex-wrap gap-6 mb-8">
                {PHONE_NUMBERS.map((p) => (
                  <a key={p.number} href={`tel:${p.raw}`} className="flex items-center gap-2 text-gold-light hover:text-gold transition-colors">
                    <Phone className="w-4 h-4" />
                    <span className="font-semibold text-base">{p.number}</span>
                  </a>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
                <a href="https://wa.me/923214307908" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full px-6 py-3 font-semibold text-sm md:text-base transition-colors shadow-lg">
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                </a>
                <a href="tel:+923214307908" className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy rounded-full px-6 py-3 font-semibold text-sm md:text-base transition-colors shadow-lg">
                  <Phone className="w-5 h-5" /> 0321-4307908
                </a>
              </div>
              {/* Social Media Big Blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl px-2 py-2.5 sm:px-5 sm:py-4 md:rounded-2xl text-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl" style={{ background: s.color }}>
                    <s.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                    <span className="font-semibold text-[10px] sm:text-xs md:text-sm">{s.name}</span>
                    <small className="text-[8px] sm:text-[9px] md:text-xs opacity-80 hidden sm:block">{s.name === 'Facebook' ? 'Azam Mushtaq Najmi' : s.name === 'Instagram' ? '@muhammad.azam' : s.name === 'TikTok' ? '@user12554205627676' : '@MNAJMI1978'}</small>
                  </a>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible direction="right">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="/images/contact-cta.jpeg" alt="Contact TRUST MARK REAL ESTATE ADVISOR" className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover" loading="lazy" />
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}

function FooterSection({ scrollTo }: { scrollTo: (href: string) => void }) {
  return (
    <footer className="bg-navy-light text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* LEFT: Brand + Contact Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/images/logo.jpeg" alt="Trust Mark Logo" className="w-10 h-10 rounded-full ring-2 ring-gold" />
              <div>
                <p className="font-bold text-base" style={{ fontFamily: 'var(--font-playfair)' }}>TRUST MARK</p>
                <p className="text-white/60 text-xs">Real Estate Advisor</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-2">Your trusted partner for buying, selling, renting, and investing in properties across Pakistan.</p>
            <p className="text-gold text-sm font-medium tracking-wider mb-8">Honesty &bull; Trust &bull; Transparency</p>

            <ContactInfoBlock textColor="white" subColor="white/60" size="base" />

            <div className="mt-8">
              <h4 className="font-bold text-base mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>Quick Links</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {NAV_LINKS.map((link) => (
                  <button key={link.label} onClick={() => scrollTo(link.href)} className="text-white/60 hover:text-gold text-sm transition-colors">{link.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Social Media Icons + Image */}
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="font-bold text-base mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Follow Us on Social Media</h4>
              <div className="flex items-center gap-3 flex-wrap">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full pl-1.5 pr-3 py-1.5 text-white/80 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                    title={s.name}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                      style={{ backgroundColor: s.color }}
                    >
                      <s.icon className="w-4 h-4" />
                    </span>
                    <span className="font-medium text-xs">{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/contact-cta.jpeg" alt="Trust Mark Real Estate Advisor Office" className="w-full h-[140px] sm:h-[180px] md:h-[250px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm text-center md:text-left">&copy; 2026 Trust Mark Real Estate Advisor. All Rights Reserved.</p>
          <p className="text-white/40 text-xs">Developed by Mohammad Kashif Latif</p>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<typeof PROPERTIES[0] | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 600)
      const sections = NAV_LINKS.map((l) => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) { setActiveSection(sections[i]); break }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleCallOpen = useCallback(() => setCallOpen(true), [])

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <HeaderSection
        scrolled={scrolled}
        activeSection={activeSection}
        scrollTo={scrollTo}
        onCallOpen={handleCallOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main className="flex-1">
        <HeroSection scrollTo={scrollTo} />
        <FeaturedPropertiesSection onSelectProperty={setSelectedProperty} />
        <PropertyCategoriesSection scrollTo={scrollTo} />
        <ServicesSection scrollTo={scrollTo} />
        <AboutUsSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <FooterSection scrollTo={scrollTo} />

      {/* Scroll-to-top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-20 right-5 z-40 w-11 h-11 rounded-full bg-navy hover:bg-navy-light text-white shadow-lg flex items-center justify-center transition-colors" aria-label="Scroll to top">
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button - Right Bottom */}
      <a href="https://wa.me/923214307908" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white shadow-lg flex items-center justify-center transition-all hover:scale-110 group" aria-label="Chat on WhatsApp">
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-3 bg-white text-navy text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">Chat on WhatsApp</span>
      </a>

      {/* =================== POPUPS =================== */}

      {/* Call Popup */}
      <AnimatePresence>
        {callOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setCallOpen(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="bg-gold p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy/20 flex items-center justify-center"><Phone className="w-6 h-6 text-navy" /></div>
                  <div><p className="text-navy font-bold text-lg">Call Us</p><p className="text-navy/70 text-xs">Direct phone contact</p></div>
                </div>
                <button onClick={() => setCallOpen(false)} className="w-8 h-8 rounded-full bg-navy/10 hover:bg-navy/20 flex items-center justify-center transition-colors"><X className="w-4 h-4 text-navy" /></button>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-sm mb-5">Call us directly for property consultation, investment guidance, or any real estate inquiries. We are available during office hours.</p>
                <div className="space-y-3">
                  {PHONE_NUMBERS.map((p) => (
                    <div key={p.number} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center"><Phone className="w-5 h-5 text-gold" /></div>
                        <div><p className="text-navy font-semibold text-sm">{p.name}</p><p className="text-gold font-bold text-base">{p.number}</p></div>
                      </div>
                      <a href={`tel:${p.raw}`} className="bg-gold hover:bg-gold-dark text-navy rounded-full px-4 py-2 text-xs font-semibold transition-colors flex items-center gap-1">
                        Call <Phone className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-navy/5 rounded-xl p-4 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-navy shrink-0" />
                  <div><p className="text-navy font-semibold text-sm">Office Hours</p><p className="text-muted-foreground text-xs">{OFFICE_HOURS}</p></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Property Detail Popup */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedProperty(null)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedProperty(null)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 shadow hover:bg-gray-100 flex items-center justify-center transition-colors"><X className="w-4 h-4 text-navy" /></button>
              <div className="relative h-44 sm:h-56 md:h-72">
                <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4"><Badge className="bg-gold text-navy font-semibold text-sm px-4 py-1.5">{selectedProperty.type}</Badge></div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>{selectedProperty.title}</h3>
                <p className="text-gold font-bold text-xl mb-3">{selectedProperty.price}</p>
                <div className="flex items-center text-muted-foreground text-sm mb-4"><MapPin className="w-4 h-4 mr-1.5 shrink-0" />{selectedProperty.location}</div>
                <div className="flex items-center gap-5 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4" />{selectedProperty.area}</span>
                  {selectedProperty.beds > 0 && <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" />{selectedProperty.beds} Beds</span>}
                  {selectedProperty.baths > 0 && <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" />{selectedProperty.baths} Baths</span>}
                </div>
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <h4 className="text-navy font-bold text-base mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>Property Description</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{selectedProperty.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`https://wa.me/923214307908?text=I%20am%20interested%20in%20${selectedProperty ? encodeURIComponent(selectedProperty.title) : ''}`} target="_blank" rel="noopener noreferrer" onClick={() => setSelectedProperty(null)} className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-semibold py-3 transition-colors"><MessageCircle className="w-4 h-4" />WhatsApp Inquiry</a>
                  <a href="tel:+923214307908" onClick={() => setSelectedProperty(null)} className="flex-1 inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy rounded-full font-semibold py-3 transition-colors"><Phone className="w-4 h-4" />0321-4307908</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
