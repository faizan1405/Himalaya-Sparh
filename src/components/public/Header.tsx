'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, MessageCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    children: [
      { label: 'Introduction', href: '/about/introduction' },
      { label: 'Why We Need This', href: '/about/introduction' },
      { label: 'Leadership', href: '/about/leadership' },
    ],
  },
  {
    label: 'Device',
    children: [
      { label: 'Science', href: '/device/science' },
      { label: 'Components', href: '/device/components' },
    ],
  },
  { label: 'How It Works', href: '/how-it-works' },
  {
    label: 'Testimonials',
    children: [
      { label: 'Lab Test Reports', href: '/testimonials/lab-reports' },
      { label: 'User Reviews', href: '/testimonials/user-reviews' },
    ],
  },
  {
    label: 'Buy',
    children: [
      { label: 'Buy Now', href: '/buy' },
      { label: 'Founder Delivery', href: '/founder-delivery' },
    ],
  },
  {
    label: 'Business',
    children: [
      { label: 'Distributor', href: '/business/distributor' },
      { label: 'Partnership', href: '/business/partnership' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMobileNav = useCallback(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    document.body.style.overflow = '';
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-aurora to-aqua rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-heading">HS</span>
              </div>
              <span className="font-heading font-bold text-xl text-navy">Himalya Sparsh</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Info Strip */}
      <div className={`bg-navy text-white text-xs transition-all duration-500 ${scrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <a href="tel:+919876543210" className="text-silver hover:text-aqua transition-colors hidden md:flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <span>+91 98765 43210</span>
          </a>
          <div className="flex items-center gap-4 ml-auto">
            <a href="mailto:info@himalyaspersh.com" className="text-silver hover:text-aqua transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">info@himalyaspersh.com</span>
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-silver hover:text-aqua transition-colors flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-500 ${
          scrolled ? 'frosted-glass shadow-lg border-b border-border/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-aurora to-aqua rounded-xl flex items-center justify-center shadow-lg shadow-aurora/20 group-hover:shadow-aurora/40 transition-shadow">
                <span className="text-white font-bold text-lg font-heading">HS</span>
              </div>
              <div className="hidden sm:block">
                <span className={`font-heading font-bold text-lg transition-colors ${scrolled ? 'text-navy' : 'text-navy'}`}>
                  Himalya Sparsh
                </span>
                <span className="block text-[10px] text-navy/40 font-medium tracking-wider uppercase -mt-0.5">Pure Water</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-lg relative ${
                        pathname === item.href
                          ? 'text-aurora'
                          : 'text-navy/70 hover:text-navy'
                      }`}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <motion.div
                          layoutId="nav-active-indicator"
                          className="absolute -bottom-0.5 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-aurora to-aqua rounded-full"
                        />
                      )}
                    </Link>
                  ) : (
                    <button
                      className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                        activeDropdown === item.label ? 'text-aurora' : 'text-navy/70 hover:text-navy'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                      {activeDropdown === item.label && (
                        <motion.div
                          layoutId="nav-active-indicator"
                          className="absolute -bottom-0.5 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-aurora to-aqua rounded-full"
                        />
                      )}
                    </button>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-2xl shadow-xl shadow-navy/10 border border-border/60 py-2 z-50"
                      >
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-border/60 rotate-45" />
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm transition-colors rounded-lg mx-1 ${
                              pathname === child.href
                                ? 'text-aurora bg-aurora/5 font-medium'
                                : 'text-navy/70 hover:text-aurora hover:bg-ice'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link href="/buy" className="ml-4 btn-primary text-sm !py-2.5 !px-6">
                Buy Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 text-navy rounded-xl hover:bg-ice/50 transition-colors focus-ring"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-navy/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-6 h-16 lg:h-20">
                <Link href="/" onClick={handleMobileNav} className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-gradient-to-br from-aurora to-aqua rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg font-heading">HS</span>
                  </div>
                  <span className="font-heading font-bold text-xl text-white">Himalya Sparsh</span>
                </Link>
                <button
                  onClick={handleMobileNav}
                  className="p-2.5 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <nav className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={handleMobileNav}
                          className={`block px-4 py-3.5 text-lg font-medium rounded-2xl transition-colors ${
                            pathname === item.href
                              ? 'text-white bg-white/10'
                              : 'text-white/80 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                            className="w-full flex items-center justify-between px-4 py-3.5 text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-2xl transition-colors"
                          >
                            {item.label}
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {item.children && activeDropdown === item.label && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden ml-4 mt-1 space-y-0.5"
                              >
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={handleMobileNav}
                                    className={`block px-4 py-3 text-base rounded-xl transition-colors ${
                                      pathname === child.href
                                        ? 'text-aurora bg-white/5 font-medium'
                                        : 'text-white/60 hover:text-white'
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 space-y-4"
                >
                  <Link
                    href="/buy"
                    onClick={handleMobileNav}
                    className="block text-center btn-primary w-full !py-4 text-base"
                  >
                    Buy Now
                  </Link>
                  <div className="flex items-center justify-center gap-6 text-white/60 text-sm">
                    <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-aqua transition-colors">
                      <Phone className="w-4 h-4" />
                      <span>+91 98765 43210</span>
                    </a>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-aqua transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Mobile Footer */}
              <div className="px-6 py-6 border-t border-white/10">
                <p className="text-white/30 text-xs text-center">
                  &copy; 2025 Himalya Sparsh. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
