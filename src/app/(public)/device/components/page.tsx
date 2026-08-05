'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Settings } from 'lucide-react';
import { Card } from '@/components/public/Sections';
import { ParallaxHero } from '@/components/public/ParallaxHero';
import { BackgroundSection } from '@/components/public/BackgroundSection';

interface ComponentItem {
  _id: string;
  name: string;
  purpose: string;
  description: string;
  characteristics: string;
  origin?: string;
  image: string;
}

export default function ComponentsPage() {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [selected, setSelected] = useState<ComponentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content?type=deviceComponent')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setComponents(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      {/* Hero */}
      <ParallaxHero
        imageSrc="/images/bgs/device-components.png"
        imageAlt="Natural Mineral Stones and Quartz Layer Components"
        badge={
          <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/[0.12] text-aurora text-sm font-medium rounded-full backdrop-blur-md">
            Components
          </span>
        }
        title="Precision in Every Layer"
        subtitle="Natural Mineral Matrices & Medical-Grade Components"
        description="Each component is meticulously sourced from natural Himalayan mineral reserves and engineered to transform standard water into structured mineral perfection."
      />

      {/* Components grid */}
      <BackgroundSection
        id="components"
        imageSrc="/images/bgs/water-caustics.png"
        imageAlt="Water Mineral Caustics Background"
        overlay="gradient"
        opacity={0.25}
        blur="sm"
        className="section-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && <div className="text-center text-red-400 py-8">{error}</div>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {components.length > 0
              ? components.map((comp, i) => (
                  <motion.button
                    key={comp._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelected(comp)}
                    className="group text-left"
                  >
                    <Card glow className="glass-medium h-full flex flex-col hover:border-aurora/30">
                      <div className="aspect-video bg-gradient-to-br from-white/[0.04] to-white/[0.02] rounded-xl mb-5 flex items-center justify-center overflow-hidden border border-white/[0.06]">
                        {comp.image ? (
                          <img src={comp.image} alt={comp.name} className="w-full h-full object-cover" />
                        ) : (
                          <Settings className="w-10 h-10 text-aurora/40" />
                        )}
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display font-bold text-white text-lg group-hover:text-aurora transition-colors">
                          {comp.name}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-silver/40 group-hover:text-aurora transition-colors flex-shrink-0 mt-1" />
                      </div>
                      <p className="text-silver/70 text-sm mt-2 leading-relaxed flex-1">{comp.purpose}</p>
                    </Card>
                  </motion.button>
                ))
              : !loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="glass-medium rounded-2xl p-6 border border-white/[0.08]">
                    <div className="aspect-video bg-white/[0.03] rounded-xl mb-4 flex items-center justify-center">
                      <Settings className="w-8 h-8 text-silver/30" />
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-2">Component Layer</h3>
                    <p className="text-silver/60 text-sm">Natural mineral layer details available via admin panel.</p>
                  </div>
                ))}
          </div>
        </div>
      </BackgroundSection>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/85 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy border border-white/[0.12] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative p-8 lg:p-10">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/[0.06] rounded-full flex items-center justify-center hover:bg-white/[0.1] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-silver" />
                </button>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-aurora/20 to-aqua/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Settings className="w-6 h-6 text-aurora" />
                  </div>
                  <div>
                    <h2 className="heading-md font-display font-bold text-white">{selected.name}</h2>
                    <p className="text-aurora font-medium text-sm mt-1">{selected.purpose}</p>
                  </div>
                </div>

                {selected.description && (
                  <div className="mb-6">
                    <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-2">
                      Description
                    </h3>
                    <p className="text-silver/80 leading-relaxed">{selected.description}</p>
                  </div>
                )}

                {selected.characteristics && (
                  <div className="mb-6">
                    <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-2">
                      Key Characteristics
                    </h3>
                    <p className="text-silver/80 leading-relaxed">{selected.characteristics}</p>
                  </div>
                )}

                {selected.origin && (
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-2">
                      Source / Origin
                    </h3>
                    <p className="text-silver/80">{selected.origin}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
