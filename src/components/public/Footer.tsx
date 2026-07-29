'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about/introduction' },
    { label: 'Introduction', href: '/about/introduction' },
    { label: 'Leadership', href: '/about/leadership' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Device: [
    { label: 'Science', href: '/device/science' },
    { label: 'Components', href: '/device/components' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Lab Test Reports', href: '/testimonials/lab-reports' },
  ],
  Purchase: [
    { label: 'Buy Now', href: '/buy' },
    { label: 'Founder Delivery', href: '/founder-delivery' },
    { label: 'Shipping Policy', href: '/contact' },
    { label: 'Return Policy', href: '/contact' },
  ],
  Opportunities: [
    { label: 'Distributor', href: '/business/distributor' },
    { label: 'Business Partnership', href: '/business/partnership' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/contact' },
    { label: 'Terms and Conditions', href: '/contact' },
    { label: 'Shipping Policy', href: '/contact' },
    { label: 'Return and Refund Policy', href: '/contact' },
    { label: 'Disclaimer', href: '/contact' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-aqua rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-heading">HS</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">Himalya Sparsh</span>
            </Link>
            <p className="text-silver text-sm leading-relaxed mb-6 max-w-sm">
              By the Himalaya, from the Himalayas. Experience pure Himalayan water with our scientifically designed device.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-silver text-sm">
                <Mail className="w-4 h-4 text-aqua" />
                info@himalyaspersh.com
              </div>
              <div className="flex items-center gap-2 text-silver text-sm">
                <Phone className="w-4 h-4 text-aqua" />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-2 text-silver text-sm">
                <MapPin className="w-4 h-4 text-aqua" />
                India
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-heading font-semibold text-sm mb-4 text-white">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-silver text-sm hover:text-aqua transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-silver text-sm">
            &copy; {new Date().getFullYear()} Himalya Sparsh. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-aqua/30 transition-colors"
                aria-label={social}
              >
                <span className="text-xs">{social[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
