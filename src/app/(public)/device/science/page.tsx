'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DeviceScience {
  heading: string;
  description: string;
  features: { icon: string; title: string; description: string }[];
  disclaimer: string;
  posterImage: string;
}

export default function DeviceSciencePage() {
  const [data, setData] = useState<DeviceScience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content/device-science')
      .then((r) => r.json())
      .then((data) => { setData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="pt-24">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ice to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
              The Science
            </span>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-navy mb-6">
              {data?.heading || 'The Science Behind Our Device'}
            </h1>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto">
              {data?.description || 'Our device combines advanced filtration technology with natural Himalayan minerals to deliver pure, healthy water.'}
            </p>
          </div>

          {/* 3D Device Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-2xl aspect-square mb-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-aqua/30 rounded-full blur-3xl opacity-60" />
            <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl border border-silver/20 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-navy rounded-2xl animate-pulse" />
                <p className="text-navy/40 text-sm">3D Device Animation</p>
                <p className="text-navy/30 text-xs mt-1">Interactive model loading...</p>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {(data?.features || []).length > 0 ? (
              data!.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20 hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                    {feature.icon || '⚙️'}
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">{feature.title}</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))
            ) : (
              [
                { icon: '🔬', title: 'Scientific Design', description: 'Engineered with precision for optimal water interaction' },
                { icon: '💧', title: 'Water Interaction', description: 'Optimised contact time and flow dynamics' },
                { icon: '🛡️', title: 'Material Quality', description: 'Premium components meeting safety standards' },
                { icon: '🧪', title: 'Functional Layers', description: 'Multiple layers for comprehensive purification' },
                { icon: '🌍', title: 'Universal Usage', description: 'Works with various water sources' },
                { icon: '🔧', title: 'Easy Maintenance', description: 'Designed for long-lasting performance' },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">{f.title}</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))
            )}
          </div>

          {/* Disclaimer */}
          <div className="bg-ice/40 border border-blue-200/40 rounded-2xl p-6 lg:p-8">
            <h3 className="font-heading font-bold text-navy mb-3">Disclaimer</h3>
            <p className="text-navy/70 text-sm leading-relaxed">
              {data?.disclaimer || 'All scientific claims are based on laboratory testing. Please refer to lab reports for detailed information. Only verified, approved content should be published.'}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
