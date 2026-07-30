'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Droplets, Shield, Globe, Zap, Leaf, AlertTriangle, Layers, Wrench } from 'lucide-react';
import { Section, SectionHeading, Card } from '@/components/public/Sections';

interface DeviceScience {
  heading: string;
  description: string;
  features: { icon: string; title: string; description: string }[];
  disclaimer: string;
  posterImage: string;
}

const iconMap: Record<string, React.ReactNode> = {
  '🔬': <FlaskConical className="w-7 h-7" />,
  '💧': <Droplets className="w-7 h-7" />,
  '🛡️': <Shield className="w-7 h-7" />,
  '🧪': <Layers className="w-7 h-7" />,
  '🌍': <Globe className="w-7 h-7" />,
  '🔧': <Wrench className="w-7 h-7" />,
};

const fallbackFeatures = [
  { icon: '🔬', title: 'Scientific Design', description: 'Engineered with precision for optimal water interaction' },
  { icon: '💧', title: 'Water Interaction', description: 'Optimised contact time and flow dynamics' },
  { icon: '🛡️', title: 'Material Quality', description: 'Premium components meeting safety standards' },
  { icon: '🧪', title: 'Functional Layers', description: 'Multiple layers for comprehensive purification' },
  { icon: '🌍', title: 'Universal Usage', description: 'Works with various water sources' },
  { icon: '🔧', title: 'Easy Maintenance', description: 'Designed for long-lasting performance' },
];

function SkeletonCard() {
  return (
    <div className="bg-white/[0.03] rounded-2xl p-8 border border-white/[0.08]">
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
      .then((data) => { setData(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  const features = (data?.features?.length ?? 0) > 0 ? data!.features : fallbackFeatures;

  return (
    <main>
      {/* Hero section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] text-aurora text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            The Science
          </span>
          <h1 className="heading-xl font-display font-bold text-white mb-6 leading-tight tracking-tight text-balance">
            {data?.heading || 'The Science Behind Our Device'}
          </h1>
          <p className="text-body-md text-silver/70 max-w-2xl mx-auto leading-relaxed">
            {data?.description || 'Our device combines advanced filtration technology with natural Himalayan minerals to deliver pure, healthy water.'}
          </p>
        </div>
      </section>

      {/* Device showcase */}
      <Section dark>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto aspect-square max-w-lg"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-aurora/20 to-aqua/10 rounded-full blur-3xl" />
            <div className="absolute inset-8 bg-gradient-to-br from-aurora/10 to-aqua/5 rounded-full blur-2xl" />

            {/* Card */}
            <div className="relative w-full h-full bg-white/[0.03] rounded-3xl border border-white/[0.08] backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-aurora to-aqua rounded-2xl flex items-center justify-center shadow-2xl shadow-aurora/20">
                  <FlaskConical className="w-16 h-16 text-white" />
                </div>
                <p className="font-display font-semibold text-white text-lg">Himalya Sparsh Device</p>
                <p className="text-silver/60 text-sm mt-1">Scientifically engineered purity</p>
              </div>
            </div>

            {/* Floating stats */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-2 -right-2 bg-white/[0.03] rounded-xl shadow-lg shadow-aurora/10 px-4 py-3 border border-white/[0.08]"
            >
              <p className="text-aurora font-bold text-lg">99.9%</p>
              <p className="text-silver/60 text-xs">Purity</p>
            </motion.div>
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-2 -left-2 bg-white/[0.03] rounded-xl shadow-lg shadow-aurora/10 px-4 py-3 border border-white/[0.08]"
            >
              <p className="text-green-400 font-bold text-lg">Zero</p>
              <p className="text-silver/60 text-xs">Electricity</p>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Features grid */}
      <Section id="features" dark>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="How It Works"
            title="Engineering Meets Nature"
            subtitle="Every component is designed to harness the natural purification power of Himalayan minerals."
            lightTitle
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <Card glow>
                  <div className="w-14 h-14 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-xl flex items-center justify-center mb-6 text-aurora">
                    {iconMap[feature.icon] || <FlaskConical className="w-7 h-7" />}
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2">{feature.title}</h3>
                  <p className="text-silver/60 text-sm leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Disclaimer */}
      <Section dark>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 flex items-start gap-4"
          >
            <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white mb-2">Disclaimer</h3>
              <p className="text-silver/70 text-sm leading-relaxed">
                {data?.disclaimer || 'All scientific claims are based on laboratory testing. Please refer to lab reports for detailed information. Only verified, approved content should be published.'}
              </p>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
