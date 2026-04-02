"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PhoneCall, Menu, X, MapPin } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  
  // Assume all pages except home (/) are "dark pages" with a dark hero background
  const isDarkPage = pathname !== '/'

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    
    // Check initial state
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ]

  const isDarkTheme = isDarkPage && !scrolled;
  const textColorClass = isDarkTheme ? 'text-white' : 'text-charcoal';
  const hoverColorClass = isDarkTheme ? 'hover:text-sand' : 'hover:text-brown';
  const mutedTextColorClass = isDarkTheme ? 'text-white/70' : 'text-gray';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent absolute'}`}>
      {/* Top Bar - Hidden on scroll down */}
      <div className={`w-full border-b border-sand/30 transition-all duration-300 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
        <div className={`container mx-auto px-4 h-full flex items-center justify-between text-xs ${textColorClass}`}>
          <div className="flex items-center gap-6">
            <span>Welcome to Our Theme!</span>
            <div className="flex items-center gap-3">
              <Link href="#" className={`${hoverColorClass} transition-colors`}>FB</Link>
              <Link href="#" className={`${hoverColorClass} transition-colors`}>TW</Link>
              <Link href="#" className={`${hoverColorClass} transition-colors`}>IG</Link>
              <Link href="#" className={`${hoverColorClass} transition-colors`}>LI</Link>
              <Link href="#" className={`${hoverColorClass} transition-colors`}><MapPin size={14} /></Link>
            </div>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <PhoneCall size={14} className={isDarkTheme ? 'text-white' : 'text-brown'} />
            <span>Call Us - (00) 123 456 7891</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brown text-white flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-500">
            <span className="-rotate-45 group-hover:-rotate-90 font-display font-bold transition-transform duration-500">dc</span>
          </div>
          <div className="flex flex-col">
            <span className={`font-display font-bold text-2xl leading-none transition-colors ${textColorClass}`}>Meni</span>
            <span className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${mutedTextColorClass}`}>Derma Clinic</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium relative group py-2 transition-colors ${textColorClass} ${hoverColorClass}`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isDarkTheme ? 'bg-white' : 'bg-brown'}`} />
            </Link>
          ))}
        </nav>

        {/* Right Button */}
        <div className="hidden lg:block h-full">
          <Link href="/contact" className={`h-full inline-flex items-center px-8 text-sm font-semibold tracking-wider transition-colors ${
            isDarkTheme 
              ? 'bg-white/10 hover:bg-white text-white hover:text-charcoal backdrop-blur-md border border-white/20' 
              : 'bg-brown hover:bg-brown-dark text-white'
          }`}>
            <span className="flex items-center gap-2">
              <Menu size={16} /> Appointment
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`lg:hidden ${textColorClass}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-[500px] border-b border-gray/10' : 'max-h-0'}`}>
        <nav className="flex flex-col p-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="py-3 border-b border-gray/10 text-sm font-medium text-charcoal hover:text-brown"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/contact"
            className="mt-4 py-3 bg-brown text-white text-center text-sm font-semibold tracking-wider"
            onClick={() => setMobileOpen(false)}
          >
            BOOK APPOINTMENT
          </Link>
        </nav>
      </div>
    </header>
  )
}