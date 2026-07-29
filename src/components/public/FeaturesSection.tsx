'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Droplets, Globe, Leaf, Clock } from 'lucide-react';

const features = [
  { icon: Droplets, title: 'Pure Water', description: 'Advanced filtration ensuring Himalayan-grade purity' },
  { icon: Shield, title: 'Safe Materials', description: 'Premium components meeting international safety standards' },
  { icon: Globe, title: 'Universal Use', description: 'Works with RO, water dispensers, and direct sources' },
  { icon: Zap, title: 'Easy to Use', description: 'No electricity or complex setup required' },
  { icon: Leaf, title: 'Eco-Friendly', description: 'Sustainable design reducing plastic waste' },
  { icon: Clock, title: 'Low Maintenance', description: 'Designed for hassle-free daily use' },
];

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-navy mb-4">
            Device Highlights
          </h2>
          <p className="text-lg text-navy/60 max-w-2xl mx-auto">
            Every feature designed for purity, convenience, and wellness.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-ice/40 rounded-2xl p-8 border border-silver/10 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="font-heading font-semibold text-navy text-lg mb-2">{feature.title}</h3>
              <p className="text-navy/60 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
