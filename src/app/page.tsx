'use client';

import { Suspense } from 'react';
import HeroClient from './(public)/HeroClient';
import { FeaturesSection } from '@/components/public/FeaturesSection';
import { TestimonialsSection } from '@/components/public/TestimonialsSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function HeroSkeleton() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-navy">
      <div className="text-center">
        <div className="w-64 h-8 bg-white/10 rounded animate-pulse mx-auto mb-4" />
        <div className="w-96 h-12 bg-white/10 rounded animate-pulse mx-auto mb-6" />
        <div className="w-80 h-6 bg-white/10 rounded animate-pulse mx-auto" />
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: '10K+', label: 'Happy Families' },
    { value: '99.9%', label: 'Purity Rate' },
    { value: '100%', label: 'Natural Process' },
    { value: '0', label: 'Electricity Needed' },
  ];

  return (
    <section id="content" className="relative z-10 -mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl shadow-blue-500/5 border border-silver/10 p-8 lg:p-10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl lg:text-4xl font-heading font-bold bg-gradient-to-r from-aurora to-navy bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-navy/50 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-aurora/5 to-aqua/5 rounded-3xl blur-3xl" />

          <div className="relative bg-gradient-to-br from-navy to-midnight rounded-3xl p-12 lg:p-16 border border-white/10">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-4">
              Ready to Transform Your Water?
            </h2>
            <p className="text-lg text-silver/70 max-w-2xl mx-auto mb-8">
              Join thousands of families who have already switched to pure Himalayan water.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/buy"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-aurora to-aqua text-white font-semibold rounded-full hover:shadow-lg hover:shadow-aurora/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Order Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroClient />
      </Suspense>
      <StatsBar />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
