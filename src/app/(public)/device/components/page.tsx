'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Settings } from 'lucide-react';
import { Card, Section } from '@/components/public/Sections';

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
      .then((data) => { setComponents(data || []); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-aurora/10 rounded-full blur-[120px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] text-aurora text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            Components
          </span>
          <h1 className="heading-xl font-display font-bold text-white mb-6 leading-tight tracking-tight text-balance">
            Precision in Every Layer
          </h1>
          <p className="text-body-md text-silver/70 max-w-2xl mx-auto leading-relaxed">
            Each component carefully selected and engineered for optimal performance and purity.
          </p>
        </div>
      </section>

      {/* Components grid */}
      <Section id="components" dark>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="text-center text-red-400 py-8">{error}</div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {components.length > 0 ? (
              components.map((comp, i) => (
                <motion.button
                  key={comp._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(comp)}
                  className="group text-left"
                >
                  <Card glow>
                    <div className="aspect-video bg-gradient-to-br from-white/[0.04] to-white/[0.02] rounded-xl mb-5 flex items-center justify-center overflow-hidden border border-white/[0.06]">
                      {comp.image ? (
                        <img src={comp.image} alt={comp.name} className="w-full h-full object-cover" />
                      ) : (
                        <Settings className="w-10 h-10 text-silver/20" />
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-bold text-white text-lg group-hover:text-aurora transition-colors">{comp.name}</h3>
                      <ArrowRight className="w-4 h-4 text-silver/30 group-hover:text-aurora transition-colors flex-shrink-0 mt-1" />
                    </div>
                    <p className="text-silver/60 text-sm mt-2 leading-relaxed">{comp.purpose}</p>
                  </Card>
                </motion.button>
              ))
            ) : !loading && (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white/[0.03] rounded-2xl p-6 border border-white/[0.08]">
                  <div className="aspect-video bg-white/[0.03] rounded-xl mb-4 flex items-center justify-center">
                    <Settings className="w-8 h-8 text-silver/20" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">Component Placeholder</h3>
                  <p className="text-silver/60 text-sm">Component details will be added via admin panel.</p>
                </div>
              ))
            )}
          </div>
        </div>
      </Section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy border border-white/[0.08] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
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
                  <div className="w-12 h-12 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Settings className="w-6 h-6 text-aurora" />
                  </div>
                  <div>
                    <h2 className="heading-md font-display font-bold text-white">{selected.name}</h2>
                    <p className="text-aurora font-medium text-sm mt-1">{selected.purpose}</p>
                  </div>
                </div>

                {selected.description && (
                  <div className="mb-6">
                    <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-2">Description</h3>
                    <p className="text-silver/70 leading-relaxed">{selected.description}</p>
                  </div>
                )}

                {selected.characteristics && (
                  <div className="mb-6">
                    <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-2">Key Characteristics</h3>
                    <p className="text-silver/70 leading-relaxed">{selected.characteristics}</p>
                  </div>
                )}

                {selected.origin && (
                  <div>
                    <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-2">Source / Origin</h3>
                    <p className="text-silver/70">{selected.origin}</p>
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
