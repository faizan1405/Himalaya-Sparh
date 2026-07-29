'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Flame } from 'lucide-react';
import { Section, SectionHeading, CTAButton } from '@/components/public/Sections';
import { connectDB } from '@/lib/db/connection';
import HowItWorksStep from '@/lib/models/HowItWorksStep';

export default function HowItWorksPage() {
  const [steps, setSteps] = useState<{ step: number; heading: string; description: string; icon: string }[]>([]);

  useEffect(() => {
    fetch('/api/content/how-it-works')
      .then((r) => r.json())
      .then(setSteps)
      .catch(() => setSteps([]));
  }, []);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-ice to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
              How It Works
            </span>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-navy mb-6">
              Pure Water, Simple Process
            </h1>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto">
              Experience how our device transforms ordinary water into Himalayan purity.
            </p>
          </div>
        </div>
      </section>

      {/* Animated Process - Split View */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Device Animation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="sticky top-32">
                <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-aqua/20 rounded-3xl flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-center"
                  >
                    <div className="w-40 h-40 mx-auto bg-gradient-to-br from-blue-500 to-navy rounded-2xl shadow-2xl flex items-center justify-center mb-4">
                      <Droplets className="w-20 h-20 text-white" />
                    </div>
                    <p className="text-navy/60 text-sm font-medium">Water Device</p>
                  </motion.div>

                  {/* Water flow animation */}
                  <motion.div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-24 bg-blue-200/30 rounded-full blur-lg"
                    animate={{ height: [60, 100, 60] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - Steps */}
            <div className="space-y-8">
              {steps.length > 0 ? (
                steps.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-silver/20 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-navy rounded-xl flex items-center justify-center text-white font-heading font-bold text-xl flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-navy text-xl mb-2">{step.heading}</h3>
                        <p className="text-navy/70 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                [
                  { step: 1, heading: 'Fill the Device', description: 'Pour water into the device through the inlet.' },
                  { step: 2, heading: 'Water Passes Through', description: 'Water flows through the scientifically designed layers.' },
                  { step: 3, heading: 'Purification Process', description: 'Natural Himalayan minerals interact with the water.' },
                  { step: 4, heading: 'Pure Water Ready', description: 'Collect perfectly purified, mineral-rich water.' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-silver/20">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-navy rounded-xl flex items-center justify-center text-white font-heading font-bold text-xl flex-shrink-0">
                        {s.step}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-navy text-xl mb-2">{s.heading}</h3>
                        <p className="text-navy/70 leading-relaxed">{s.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Three Usage Modes */}
      <section className="py-16 lg:py-24 bg-ice/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Three Usage Modes" subtitle="The device works seamlessly in three different setups" />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🌍', title: 'Universal', desc: 'Direct use from any water source with zero setup required.' },
              { icon: '💧', title: 'RO Water Purifier', desc: 'Seamlessly integrates with your existing RO system for enhanced purity.' },
              { icon: '🏢', title: 'Water Dispenser', desc: 'Compatible with all standard water dispensers and coolers.' },
            ].map((mode, i) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-silver/20 hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{mode.icon}</div>
                <h3 className="font-heading font-bold text-navy text-xl mb-3">{mode.title}</h3>
                <p className="text-navy/70 leading-relaxed mb-6">{mode.desc}</p>
                <CTAButton href="/buy" variant="secondary">Buy Now</CTAButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
