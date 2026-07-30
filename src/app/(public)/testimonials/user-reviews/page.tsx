'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Quote } from 'lucide-react';
import { Section, SectionHeading, Card } from '@/components/public/Sections';

interface Testimonial {
  _id: string;
  customerName: string;
  city: string;
  state: string;
  rating: number;
  reviewType: 'video' | 'written';
  reviewText?: string;
  videoUrl?: string;
  thumbnail?: string;
  purchaseType: string;
  isVerified: boolean;
}

export default function UserTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content?type=testimonial')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => { setTestimonials(data || []); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? testimonials : testimonials.filter((t) => t.reviewType === filter);

  if (loading) {
    return (
      <main className="pt-24">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-64 h-10 bg-silver/20 rounded animate-pulse mx-auto mb-4" />
            <div className="w-full max-w-2xl h-6 bg-silver/20 rounded animate-pulse mx-auto mb-12" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-full h-72 bg-silver/10 rounded-2xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
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
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-glow text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            Testimonials
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            What Our Customers Say
          </h1>
          <p className="text-lg text-silver/70 max-w-2xl mx-auto leading-relaxed">
            Real stories from real customers who trust Himalya Sparsh for pure Himalayan water.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-navy to-white relative">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {error && (
            <div className="text-center text-red-500 py-8 bg-red-50/50 rounded-2xl border border-red-200/50">{error}</div>
          )}

          {/* Filters */}
          <div className="flex gap-3 justify-center mb-12">
            {[
              { key: 'all', label: 'All Reviews' },
              { key: 'video', label: 'Video Reviews' },
              { key: 'written', label: 'Written Reviews' },
            ].map((type) => (
              <button
                key={type.key}
                onClick={() => setFilter(type.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === type.key
                    ? 'bg-gradient-to-r from-aurora to-aqua text-white shadow-lg shadow-aurora/20'
                    : 'bg-white text-navy/70 border border-silver/30 hover:border-aurora/20'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Testimonials Grid */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t, i) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="h-full flex flex-col">
                    {t.reviewType === 'video' ? (
                      <div className="aspect-video bg-ice/50 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative group cursor-pointer">
                        {t.thumbnail ? (
                          <>
                            <img src={t.thumbnail} alt={t.customerName} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/50 transition-colors flex items-center justify-center">
                              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-white ml-1" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-14 h-14 bg-aurora/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-aurora ml-1" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-4 h-4 ${idx < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-navy/15'}`}
                          />
                        ))}
                      </div>
                    )}

                    <div className="relative flex-1">
                      <Quote className="w-8 h-8 text-aurora/10 absolute -top-1 -left-1" />
                      <p className="text-navy/70 text-sm leading-relaxed mb-4 relative z-10">
                        &ldquo;{t.reviewText || 'Amazing product! Highly recommend.'}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-silver/10">
                      <div>
                        <p className="font-heading font-semibold text-navy">{t.customerName}</p>
                        <p className="text-navy/50 text-xs">{t.city}, {t.state}</p>
                      </div>
                      {t.isVerified && (
                        <span className="text-xs bg-green-500/10 text-green-600 px-3 py-1 rounded-full font-medium">Verified</span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : !error && (
            <div className="text-center text-navy/50 py-16 bg-white/50 rounded-2xl border border-silver/10">
              <Quote className="w-12 h-12 text-navy/20 mx-auto mb-4" />
              <p>Customer testimonials will be displayed once added via admin panel.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
