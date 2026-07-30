'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Flame } from 'lucide-react';
import { Section, SectionHeading, Card } from '@/components/public/Sections';
import { CTAButton } from '@/components/public/Sections';

const fallbackSteps = [
  { step: 1, heading: 'Fill the Device', description: 'Pour water into the device through the conveniently designed inlet.' },
  { step: 2, heading: 'Water Passes Through', description: 'Water flows through multiple scientifically designed layers.' },
  { step: 3, heading: 'Natural Purification', description: 'Himalayan minerals interact with water molecules for natural purification.' },
  { step: 4, heading: 'Pure Water Ready', description: 'Collect perfectly purified, mineral-rich, Himalayan-grade water.' },
];

const usageModes = [
  { icon: '💧', title: 'Direct Use', desc: 'Works with any water source — tap, borewell, or tanker. Zero setup required.' },
  { icon: '🔌', title: 'RO Purifier', desc: 'Seamlessly integrates with your existing RO system for enhanced purity.' },
  { icon: '🏢', title: 'Water Dispenser', desc: 'Compatible with all standard water dispensers and coolers in offices and homes.' },
];

export default function HowItWorksPage() {
  const [steps, setSteps] = useState(fallbackSteps);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content?type=howItWorks')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSteps(data);
        setLoading(false);
      })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <main className="pt-24">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="w-48 h-8 bg-silver/20 rounded animate-pulse mx-auto mb-4" />
              <div className="w-full max-w-2xl h-6 bg-silver/20 rounded animate-pulse mx-auto mb-12" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full h-24 bg-silver/10 rounded-2xl animate-pulse" />
                ))}
              </div>
            </div>
          </section>
      </main>
    );
  }

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-glow text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            How It Works
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Pure Water, Simple Process
          </h1>
          <p className="text-lg text-silver/70 max-w-2xl mx-auto leading-relaxed">
            Experience how our device transforms ordinary water into Himalayan purity in four simple steps.
          </p>
        </div>
      </section>

      {/* Process steps - alternating layout */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-navy to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - sticky device showcase */}
            <div className="hidden lg:block sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative aspect-square max-w-md mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-aurora/20 to-aqua/10 rounded-full blur-3xl" />
                <div className="relative w-full h-full bg-gradient-to-br from-aurora/10 to-aqua/5 rounded-3xl border border-white/10 backdrop-blur-sm flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-center"
                  >
                    <div className="w-36 h-36 mx-auto bg-gradient-to-br from-aurora to-aqua rounded-2xl shadow-2xl shadow-aurora/20 flex items-center justify-center mb-4">
                      <Droplets className="w-20 h-20 text-white" />
                    </div>
                    <p className="text-glow/80 font-medium">Himalya Sparsh</p>
                    <p className="text-silver/50 text-sm">Pure Himalayan Water Device</p>
                  </motion.div>
                </div>

                {/* Water flow animation */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-24 bg-aurora/20 rounded-full blur-lg"
                  animate={{ height: [60, 120, 60], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </motion.div>
            </div>

            {/* Right - Steps */}
            <div className="space-y-6">
              {error && (
                <div className="text-center text-red-500 py-4">{error}</div>
              )}

              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <Card className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-aurora to-aqua" />
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-gradient-to-br from-aurora to-aqua rounded-xl flex items-center justify-center text-white font-heading font-bold text-lg flex-shrink-0 shadow-lg shadow-aurora/20">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-navy text-xl mb-2">{step.heading}</h3>
                        <p className="text-navy/60 leading-relaxed text-sm">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage modes */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-ice/40 relative">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            label="Versatile"
            title="Three Usage Modes"
            subtitle="The device works seamlessly with different water setups in your home or office."
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {usageModes.map((mode, i) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group"
              >
                <Card className="text-center h-full">
                  <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform duration-500">{mode.icon}</span>
                  <h3 className="font-heading font-bold text-navy text-xl mb-3">{mode.title}</h3>
                  <p className="text-navy/60 leading-relaxed text-sm mb-6">{mode.desc}</p>
                  <CTAButton href="/buy" variant="secondary">Get Yours</CTAButton>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}