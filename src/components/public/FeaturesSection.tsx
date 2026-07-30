'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Droplets, Globe, Leaf, Clock } from 'lucide-react';

const features = [
  { icon: Droplets, title: 'Pure Water', description: 'Advanced filtration ensuring Himalayan-grade purity in every drop.' },
  { icon: Shield, title: 'Safe Materials', description: 'Premium components meeting international safety standards.' },
  { icon: Globe, title: 'Universal Use', description: 'Works with RO, water dispensers, and direct tap sources.' },
  { icon: Zap, title: 'Easy to Use', description: 'No electricity or complex setup required.' },
  { icon: Leaf, title: 'Eco-Friendly', description: 'Sustainable design reducing plastic waste and carbon footprint.' },
  { icon: Clock, title: 'Low Maintenance', description: 'Designed for hassle-free daily use with long-lasting components.' },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-ice/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-aurora/10 text-aurora text-sm font-medium rounded-full mb-4"
          >
            Device Highlights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-display text-3xl lg:text-5xl font-heading font-bold text-navy mb-4"
          >
            Every Feature, Purposefully Designed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-navy/60 max-w-2xl mx-auto"
          >
            Built for purity, convenience, and wellness — backed by science and inspired by nature.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-silver/10 hover:border-aurora/30 hover:shadow-xl hover:shadow-aurora/5 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-aurora/0 to-aqua/0 group-hover:from-aurora/5 group-hover:to-aqua/5 rounded-2xl transition-all duration-500" />

              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:from-aurora/20 group-hover:to-aqua/20 transition-all duration-500">
                  <feature.icon className="w-7 h-7 text-aurora" />
                </div>
                <h3 className="font-heading font-semibold text-navy text-lg mb-2 group-hover:text-aurora transition-colors">
                  {feature.title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}