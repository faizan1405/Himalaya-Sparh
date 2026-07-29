'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

interface Component {
  _id: string;
  name: string;
  purpose: string;
  description: string;
  characteristics: string;
  origin?: string;
  image: string;
}

export default function ComponentsPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [selected, setSelected] = useState<Component | null>(null);

  useEffect(() => {
    fetch('/api/content/device-components')
      .then((r) => r.json())
      .then(setComponents)
      .catch(() => setComponents([]));
  }, []);

  return (
    <main className="pt-24">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-navy mb-6">
              Components
            </h1>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto">
              Each component carefully selected and engineered for optimal performance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.length > 0 ? (
              components.map((comp, i) => (
                <motion.button
                  key={comp._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(comp)}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20 hover:shadow-xl transition-all text-left group"
                >
                  <div className="aspect-video bg-ice/50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    {comp.image ? (
                      <img src={comp.image} alt={comp.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-3xl text-navy/30">⚙️</div>
                    )}
                  </div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-heading font-bold text-navy text-lg group-hover:text-blue-500 transition-colors">{comp.name}</h3>
                    <ChevronRight className="w-5 h-5 text-navy/30 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <p className="text-navy/60 text-sm mt-2">{comp.purpose}</p>
                </motion.button>
              ))
            ) : (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20">
                  <div className="aspect-video bg-ice/50 rounded-xl mb-4 flex items-center justify-center text-3xl">⚙️</div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">Component Placeholder</h3>
                  <p className="text-navy/60 text-sm">Component details will be added via admin panel.</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="relative p-8">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-ice rounded-full flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-navy" />
                </button>

                <h2 className="text-2xl font-heading font-bold text-navy mb-2">{selected.name}</h2>
                <p className="text-blue-500 mb-6">{selected.purpose}</p>

                {selected.description && (
                  <div className="mb-6">
                    <h3 className="font-heading font-semibold text-navy mb-2">Description</h3>
                    <p className="text-navy/70 leading-relaxed">{selected.description}</p>
                  </div>
                )}

                {selected.characteristics && (
                  <div className="mb-6">
                    <h3 className="font-heading font-semibold text-navy mb-2">Key Characteristics</h3>
                    <p className="text-navy/70 leading-relaxed">{selected.characteristics}</p>
                  </div>
                )}

                {selected.origin && (
                  <div>
                    <h3 className="font-heading font-semibold text-navy mb-2">Source / Origin</h3>
                    <p className="text-navy/70">{selected.origin}</p>
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
