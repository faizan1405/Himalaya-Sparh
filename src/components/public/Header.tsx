'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, Phone, MessageCircle, Mail, Sparkles
} from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    children: [
      { label: 'Our Story', href: '/about/introduction' },
      { label: 'Why We Need This', href: '/about/introduction' },
      { label: 'Leadership', href: '/about/leadership' },
    ],
  },
  {
    label: 'Device',
    children: [
      { label: 'The Science', href: '/device/science' },
      { label: 'Components', href: '/device/components' },
    ],
  },
  { label: 'How It Works', href: '/how-it-works' },
  {
    label: 'Testimonials',
    children: [
      { label: 'Lab Reports', href: '/testimonials/lab-reports' },
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
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    document.body.style.overflow = '';
  }, [pathname]);

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-20" />
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'glass-strong shadow-2xl shadow-navy/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container-default px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora to-aqua flex items-center justify-center shadow-lg shadow-aurora/20 group-hover:shadow-aurora/40 transition-shadow duration-500">
                <span className="text-white font-bold text-lg font-body">HS</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-aurora to-aqua opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Himalya Sparsh
              </span>
              <span className="block text-[10px] text-silver/60 font-body font-medium tracking-[0.2em] uppercase -mt-0.5">
                Pure Himalayan Water
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
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
                    className={`relative px-4 py-2 text-[13px] font-body font-medium tracking-wide transition-colors duration-300 rounded-full ${
                      pathname === item.href
                        ? 'text-white'
                        : 'text-silver hover:text-white'
                    }`}
                  >
                    {pathname === item.href && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-white/[0.08] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    className={`relative px-4 py-2 text-[13px] font-body font-medium tracking-wide transition-colors duration-300 rounded-full flex items-center gap-1 ${
                      activeDropdown === item.label ? 'text-white' : 'text-silver hover:text-white'
                    }`}
                  >
                    {activeDropdown === item.label && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-white/[0.08] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 relative z-10 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                    >
                      <div className="glass-strong rounded-2xl p-2 min-w-[200px] shadow-2xl shadow-navy/50">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm rounded-xl transition-all duration-200 ${
                              pathname === child.href
                                ? 'text-aurora bg-aurora/[0.08] font-medium'
                                : 'text-silver hover:text-white hover:bg-white/[0.04]'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="ml-4 pl-4 border-l border-white/[0.06]">
              <Link href="/buy" className="btn-primary text-[13px] !py-2.5 !px-6">
                Get Yours
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 p-2.5 text-white rounded-xl hover:bg-white/[0.06] transition-colors focus-ring"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-navy/95 backdrop-blur-2xl" />

            <div className="relative flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-6 h-20">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-aurora to-aqua rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold font-body">HS</span>
                  </div>
                  <span className="font-display font-bold text-lg text-white">Himalya Sparsh</span>
                </Link>
                <button
                  onClick={() => { setMobileOpen(false); document.body.style.overflow = ''; }}
                  className="p-2 text-white/70 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <nav className="space-y-0.5">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 + 0.1 }}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={() => { setMobileOpen(false); document.body.style.overflow = ''; }}
                          className={`block px-5 py-3.5 text-lg font-display font-medium rounded-2xl transition-all duration-300 ${
                            pathname === item.href
                              ? 'text-white bg-white/[0.08]'
                              : 'text-silver hover:text-white hover:bg-white/[0.03]'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                            className="w-full flex items-center justify-between px-5 py-3.5 text-lg font-display font-medium text-silver hover:text-white hover:bg-white/[0.03] rounded-2xl transition-all duration-300"
                          >
                            {item.label}
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
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
                                    onClick={() => { setMobileOpen(false); document.body.style.overflow = ''; }}
                                    className={`block px-5 py-3 text-base font-body rounded-xl transition-colors ${
                                      pathname === child.href
                                        ? 'text-aurora bg-aurora/[0.06] font-medium'
                                        : 'text-silver/70 hover:text-white'
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
                  className="mt-10 space-y-5"
                >
                  <Link
                    href="/buy"
                    onClick={() => { setMobileOpen(false); document.body.style.overflow = ''; }}
                    className="block text-center btn-primary w-full !py-4 text-base"
                  >
                    Get Yours Now
                  </Link>
                  <div className="flex items-center justify-center gap-6 text-silver/50 text-sm">
                    <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-aqua transition-colors">
                      <Phone className="w-4 h-4" />
                      <span className="font-body">+91 98765 43210</span>
                    </a>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-aqua transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-body">WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
