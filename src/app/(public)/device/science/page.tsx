'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Droplets, Shield, Globe, Layers, Wrench, AlertTriangle } from 'lucide-react';
import { SectionHeading, Card } from '@/components/public/Sections';
import { ParallaxHero } from '@/components/public/ParallaxHero';
import { BackgroundSection } from '@/components/public/BackgroundSection';

interface DeviceScience {
  heading: string;
  description: string;
  features: { icon: string; title: string; description: string }[];
  disclaimer: string;
  posterImage: string;
}

const iconMap: Record<string, React.ReactNode> = {
  '🔬': <FlaskConical className="w-7 h-7 text-aurora" />,
  '💧': <Droplets className="w-7 h-7 text-aurora" />,
  '🛡️': <Shield className="w-7 h-7 text-aurora" />,
  '🧪': <Layers className="w-7 h-7 text-aurora" />,
  '🌍': <Globe className="w-7 h-7 text-aurora" />,
  '🔧': <Wrench className="w-7 h-7 text-aurora" />,
};

const fallbackFeatures = [
  { icon: '🔬', title: 'Scientific Design', description: 'Engineered with precision for optimal water interaction and molecular structuring.' },
  { icon: '💧', title: 'Water Interaction', description: 'Optimized contact time and natural flow dynamics inspired by Himalayan spring channels.' },
  { icon: '🛡️', title: 'Material Quality', description: 'Premium food-grade titanium and silver matrix components meeting safety standards.' },
  { icon: '🧪', title: 'Functional Layers', description: 'Multiple bio-mineral layers for comprehensive natural purification and ionization.' },
  { icon: '🌍', title: 'Universal Usage', description: 'Works seamlessly with municipal tap, RO purifiers, and borewell water sources.' },
  { icon: '🔧', title: 'Easy Maintenance', description: 'Designed for hassle-free long-lasting performance with zero filter replacements.' },
];

function SkeletonCard() {
  return (
    <div className="glass-medium rounded-2xl p-8 border border-white/[0.08]">
      <div className="w-14 h-14 bg-white/[0.04] rounded-xl mb-6 animate-pulse" />
      <div className="w-32 h-5 bg-white/[0.04] rounded mb-3 animate-pulse" />
      <div className="w-full h-4 bg-white/[0.04] rounded mb-2 animate-pulse" />
      <div className="w-3/4 h-4 bg-white/[0.04] rounded animate-pulse" />
    </div>
  );
}

export default function DeviceSciencePage() {
  const [data, setData] = useState<DeviceScience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content?type=deviceScience')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const features = (data?.features?.length ?? 0) > 0 ? data!.features : fallbackFeatures;

  return (
    <main>
      {/* Hero section */}
      <ParallaxHero
        imageSrc="/images/bgs/device-science.png"
        imageAlt="Structured Water Laboratory Laser Science"
        badge={
          <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/[0.12] text-aurora text-sm font-medium rounded-full backdrop-blur-md">
            The Science
          </span>
        }
        title={data?.heading || 'The Science Behind Our Device'}
        subtitle="Precision Bio-Energetic Engineering & Himalayan Mineral Physics"
        description={
          data?.description ||
          'Our device combines advanced mineral flow mechanics with natural Himalayan energy matrices to deliver pure, structured, high-vibrational water.'
        }
      />

      {/* Features Grid */}
      <BackgroundSection
        imageSrc="/images/bgs/water-caustics.png"
        imageAlt="Molecular Water Structure Refraction"
        overlay="gradient"
        opacity={0.3}
        blur="sm"
        className="section-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Scientific Principles"
            title="Engineered for Pure Perfection"
            subtitle="Explore the core technological pillars that set Himalya Sparsh apart from conventional filters."
            lightTitle
          />

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                >
                  <Card glow className="h-full glass-medium hover:border-aurora/30">
                    <div className="w-14 h-14 bg-gradient-to-br from-aurora/15 to-aqua/15 rounded-xl flex items-center justify-center mb-6 group-hover:from-aurora/30 group-hover:to-aqua/30 transition-all duration-500">
                      {iconMap[feature.icon] || <FlaskConical className="w-7 h-7 text-aurora" />}
                    </div>
                    <h3 className="font-display font-semibold text-white text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-silver/70 text-sm leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          {data?.disclaimer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 max-w-4xl mx-auto p-6 glass-strong rounded-2xl border border-white/[0.1] text-center"
            >
              <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4" />
                Scientific & Legal Notice
              </div>
              <p className="text-silver/60 text-xs leading-relaxed">{data.disclaimer}</p>
            </motion.div>
          )}
        </div>
      </BackgroundSection>
    </main>
  );
}
