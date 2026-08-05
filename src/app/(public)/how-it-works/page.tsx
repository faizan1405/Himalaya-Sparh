'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Flame, Shield } from 'lucide-react';
import { SectionHeading, Card, CTAButton } from '@/components/public/Sections';
import { ParallaxHero } from '@/components/public/ParallaxHero';
import { BackgroundSection } from '@/components/public/BackgroundSection';

const fallbackSteps = [
  { step: 1, heading: 'Fill the Device', description: 'Pour water into the device through the conveniently designed inlet.' },
  { step: 2, heading: 'Water Passes Through', description: 'Water flows naturally through multiple scientifically designed bio-mineral layers.' },
  { step: 3, heading: 'Natural Purification', description: 'Himalayan minerals interact with water molecules for natural purification and micro-structuring.' },
  { step: 4, heading: 'Pure Water Ready', description: 'Collect perfectly purified, mineral-rich, Himalayan-grade structured water instantly.' },
];

const usageModes = [
  { icon: Droplets, title: 'Direct Use', desc: 'Works with any water source — tap, borewell, or tanker. Zero electricity or complex setup required.' },
  { icon: Flame, title: 'RO Purifier', desc: 'Seamlessly integrates with your existing RO system to restore essential minerals stripped by RO.' },
  { icon: Shield, title: 'Water Dispenser', desc: 'Compatible with all standard water dispensers and coolers in offices, clinics, and homes.' },
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
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main>
        <section className="py-20 bg-navy min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-48 h-8 bg-white/10 rounded animate-pulse mx-auto mb-4" />
            <div className="w-full max-w-2xl h-6 bg-white/10 rounded animate-pulse mx-auto mb-12" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full h-24 bg-white/[0.03] rounded-2xl animate-pulse border border-white/[0.06]" />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <ParallaxHero
        imageSrc="/images/bgs/how-it-works.png"
        imageAlt="Swirling Water Vortex Dynamics"
        badge={
          <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/[0.12] text-aurora text-sm font-medium rounded-full backdrop-blur-md">
            How It Works
          </span>
        }
        title="Pure Water, Simple Process"
        subtitle="Zero Electricity • Gravity Powered • Pure Himalayan Science"
        description="Experience how our device naturally transforms ordinary water into Himalayan purity in four seamless steps."
      />

      {/* Process steps */}
      <BackgroundSection
        id="process"
        imageSrc="/images/bgs/how-it-works.png"
        imageAlt="Water Physics Vortex Stream"
        overlay="deep"
        opacity={0.3}
        blur="sm"
        className="section-lg"
      >
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
                <div className="absolute inset-0 bg-gradient-to-br from-aurora/25 to-aqua/15 rounded-full blur-3xl" />
                <div className="relative w-full h-full glass-strong rounded-3xl border border-white/[0.12] flex items-center justify-center shadow-2xl">
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-center"
                  >
                    <div className="w-36 h-36 mx-auto bg-gradient-to-br from-aurora to-aqua rounded-2xl shadow-2xl shadow-aurora/30 flex items-center justify-center mb-4">
                      <Droplets className="w-20 h-20 text-white" />
                    </div>
                    <p className="text-white font-semibold text-lg">Himalya Sparsh</p>
                    <p className="text-silver/60 text-sm">Pure Himalayan Water Device</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right - Steps */}
            <div className="space-y-6">
              {error && <div className="text-center text-red-400 py-4">{error}</div>}

              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <Card glow className="glass-medium relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-aurora to-aqua" />
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-gradient-to-br from-aurora to-aqua rounded-xl flex items-center justify-center text-white font-display font-bold text-lg flex-shrink-0 shadow-lg shadow-aurora/20">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-white text-xl mb-2">{step.heading}</h3>
                        <p className="text-silver/70 leading-relaxed text-sm">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </BackgroundSection>

      {/* Usage modes */}
      <BackgroundSection
        id="modes"
        imageSrc="/images/bgs/water-caustics.png"
        imageAlt="Usage Modes Background"
        overlay="gradient"
        opacity={0.2}
        blur="sm"
        className="section-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Versatile"
            title="Three Usage Modes"
            subtitle="The device works seamlessly with different water setups in your home or office."
            lightTitle
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {usageModes.map((mode, i) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Card glow className="text-center h-full glass-medium">
                  <div className="w-16 h-16 bg-gradient-to-br from-aurora/15 to-aqua/15 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                    <mode.icon className="w-8 h-8 text-aurora" />
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-3">{mode.title}</h3>
                  <p className="text-silver/70 leading-relaxed text-sm mb-6">{mode.desc}</p>
                  <CTAButton href="/buy" variant="ghost" className="!text-sm">
                    Get Yours
                  </CTAButton>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </BackgroundSection>
    </main>
  );
}
