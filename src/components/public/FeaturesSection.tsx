'use client';

import { motion } from 'framer-motion';
import { Droplets, Shield, Globe, Zap, Leaf, Clock } from 'lucide-react';
import { Section, SectionHeading, Card } from '@/components/public/Sections';
import { BackgroundSection } from '@/components/public/BackgroundSection';

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
    <BackgroundSection
      id="features"
      imageSrc="/images/bgs/water-caustics.png"
      imageAlt="Pristine Water Mineral Caustics"
      overlay="gradient"
      opacity={0.25}
      blur="sm"
      className="section-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Device Highlights"
          title="Every Feature, Purposefully Designed"
          subtitle="Built for purity, convenience, and wellness — backed by science and inspired by nature."
          lightTitle
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <Card glow className="glass-medium hover:border-aurora/30">
                <div className="w-14 h-14 bg-gradient-to-br from-aurora/15 to-aqua/15 rounded-xl flex items-center justify-center mb-6 group-hover:from-aurora/30 group-hover:to-aqua/30 transition-all duration-500">
                  <feature.icon className="w-7 h-7 text-aurora" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-silver/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </BackgroundSection>
  );
}

