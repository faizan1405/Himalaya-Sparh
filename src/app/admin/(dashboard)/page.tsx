'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, MessageSquare, Package, MapPin, TrendingUp, ArrowRight, Sparkles, Settings as SettingsIcon, FileText, Truck, Handshake, Users } from 'lucide-react';

export default function DashboardPage() {
  const [counts, setCounts] = useState({ orders: 0, enquiries: 0, products: 0, distributors: 0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      fetch('/api/content?type=orders').then(r => r.json()),
      fetch('/api/content?type=contactEnquiries').then(r => r.json()),
      fetch('/api/content?type=products').then(r => r.json()),
      fetch('/api/content/distributor').then(r => r.json()),
    ]).then(([orders, enquiries, products, dist]) => {
      setCounts({
        orders: Array.isArray(orders) ? orders.length : 0,
        enquiries: Array.isArray(enquiries) ? enquiries.length : 0,
        products: Array.isArray(products) ? products.length : 0,
        distributors: Array.isArray(dist?.info) ? dist.info.length : 0,
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Orders', value: counts.orders, icon: ShoppingCart, gradient: 'from-aurora to-blue-500' },
    { label: 'Enquiries', value: counts.enquiries, icon: MessageSquare, gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Products', value: counts.products, icon: Package, gradient: 'from-amber-500 to-orange-500' },
    { label: 'Distributors', value: counts.distributors, icon: MapPin, gradient: 'from-purple-500 to-violet-500' },
  ];

  const quickLinks = [
    { label: 'Site Settings', href: '/admin/dashboard/settings', icon: SettingsIcon, desc: 'Configure site-wide settings' },
    { label: 'Hero Content', href: '/admin/dashboard/hero', icon: FileText, desc: 'Edit homepage hero section' },
    { label: 'Manage Products', href: '/admin/dashboard/buy', icon: ShoppingCart, desc: 'Add or update products' },
    { label: 'Contact Enquiries', href: '/admin/dashboard/contact', icon: MessageSquare, desc: 'View customer messages' },
  ];

  const recentLinks = [
    { label: 'About Us', href: '/admin/dashboard/about', icon: Users },
    { label: 'Distributors', href: '/admin/dashboard/distributor', icon: MapPin },
    { label: 'Partnerships', href: '/admin/dashboard/business', icon: Handshake },
    { label: 'Founder Delivery', href: '/admin/dashboard/founder-delivery', icon: Truck },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-midnight to-navy p-8 lg:p-10"
      >
        <div className="absolute inset-0 opacity-10 bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-aurora/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-aqua/10 rounded-full blur-[80px]" />

        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/10 text-glow text-xs font-medium rounded-full mb-3">
              <Sparkles className="w-3 h-3" />
              Admin Dashboard
            </span>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-silver/70 max-w-md">
              Manage content, monitor performance, and grow Himalya Sparsh — all from one place.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-glow text-sm">All systems operational</span>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-silver/10 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-3xl lg:text-4xl font-heading font-bold text-navy mb-1">
              {loading ? '—' : stat.value}
            </p>
            <p className="text-navy/60 text-sm capitalize">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-silver/10 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-bold text-navy text-xl">Quick Actions</h2>
            <p className="text-navy/60 text-sm">Jump to commonly used sections</p>
          </div>
          <TrendingUp className="w-5 h-5 text-aurora" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {quickLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="group flex items-center gap-4 p-5 bg-ice/40 hover:bg-gradient-to-r hover:from-aurora/5 hover:to-aqua/5 rounded-2xl border border-silver/10 hover:border-aurora/20 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <link.icon className="w-5 h-5 text-aurora" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-navy group-hover:text-aurora transition-colors">{link.label}</p>
                <p className="text-navy/50 text-xs">{link.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-navy/30 group-hover:text-aurora group-hover:translate-x-1 transition-all" />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Other sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {recentLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.05 }}
            className="group flex items-center gap-3 p-5 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-br hover:from-aurora/5 hover:to-aqua/5 rounded-2xl border border-silver/10 hover:border-aurora/20 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-xl flex items-center justify-center">
              <link.icon className="w-5 h-5 text-aurora" />
            </div>
            <span className="font-medium text-navy group-hover:text-aurora transition-colors">{link.label}</span>
            <ArrowRight className="w-4 h-4 text-navy/30 ml-auto group-hover:text-aurora group-hover:translate-x-1 transition-all" />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
