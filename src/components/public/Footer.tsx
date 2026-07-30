'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Mail, Phone, MapPin, Shield, FileText, Truck, RotateCcw } from 'lucide-react';

const footerLinks = {
  'Company': [
    { label: 'About Us', href: '/about/introduction' },
    { label: 'Why We Need This', href: '/about/introduction#why-we-need' },
    { label: 'Leadership', href: '/about/leadership' },
    { label: 'Contact Us', href: '/contact' },
  ],
  'Device': [
    { label: 'The Science', href: '/device/science' },
    { label: 'Components', href: '/device/components' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Lab Reports', href: '/testimonials/lab-reports' },
  ],
  'Purchase': [
    { label: 'Buy Now', href: '/buy' },
    { label: 'Founder Delivery', href: '/founder-delivery' },
  ],
  'Opportunities': [
    { label: 'Distributor', href: '/business/distributor' },
    { label: 'Partnership', href: '/business/partnership' },
  ],
  'Legal': [
    { label: 'Privacy Policy', href: '/legal/privacy-policy' },
    { label: 'Terms & Conditions', href: '/legal/terms-conditions' },
    { label: 'Shipping Policy', href: '/legal/shipping-policy' },
    { label: 'Refund Policy', href: '/legal/refund-policy' },
    { label: 'Disclaimer', href: '/legal/disclaimer' },
  ],
};

const legalPolicies = [
  { icon: Shield, label: 'Privacy Policy', href: '/legal/privacy-policy' },
  { icon: FileText, label: 'Terms & Conditions', href: '/legal/terms-conditions' },
  { icon: Truck, label: 'Shipping Policy', href: '/legal/shipping-policy' },
  { icon: RotateCcw, label: 'Refund Policy', href: '/legal/refund-policy' },
  { icon: FileText, label: 'Disclaimer', href: '/legal/disclaimer' },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white relative">
      {/* Top divider */}
      <div className="divider-gradient" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-aurora to-aqua rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg font-heading">HS</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">Himalya Sparsh</span>
            </Link>
            <p className="text-silver text-sm leading-relaxed mb-6 max-w-sm">
              By the Himalaya, from the Himalayas. Experience pure Himalayan water with our scientifically designed device.
            </p>
            <div className="space-y-2.5">
              <a href="mailto:info@himalyaspersh.com" className="flex items-center gap-2.5 text-silver text-sm hover:text-aqua transition-colors">
                <Mail className="w-4 h-4 text-aqua" />
                info@himalyaspersh.com
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2.5 text-silver text-sm hover:text-aqua transition-colors">
                <Phone className="w-4 h-4 text-aqua" />
                +91 98765 43210
              </a>
              <div className="flex items-center gap-2.5 text-silver text-sm">
                <MapPin className="w-4 h-4 text-aqua" />
                India
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-heading font-semibold text-sm mb-4 text-white tracking-wide">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-silver text-sm hover:text-aqua transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Policies Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {legalPolicies.map((policy) => (
              <Link
                key={policy.label}
                href={policy.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-silver/70 text-xs hover:text-aqua transition-colors rounded-lg hover:bg-white/5"
              >
                <policy.icon className="w-3.5 h-3.5" />
                <span>{policy.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-navy/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-silver text-sm">
            &copy; {new Date().getFullYear()} Himalya Sparsh. All rights reserved.
          </p>
          <p className="text-silver/50 text-xs">
            Crafted with care in the Himalayas
          </p>
        </div>
      </div>
    </footer>
  );
}
