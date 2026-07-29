'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Play } from 'lucide-react';
import { Section, SectionHeading } from '@/components/public/Sections';

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

  useEffect(() => {
    fetch('/api/content/testimonials')
      .then((r) => r.json())
      .then(setTestimonials)
      .catch(() => setTestimonials([]));
  }, []);

  const filtered = filter === 'all' ? testimonials : testimonials.filter((t) => t.reviewType === filter);

  return (
    <main className="pt-24">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ice to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What Our Customers Say" subtitle="Real stories from real customers who trust Himalya Sparsh" />

          {/* Filters */}
          <div className="flex gap-3 justify-center mb-12">
            {['all', 'video', 'written'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === type ? 'bg-blue-500 text-white' : 'bg-white text-navy/70 border border-silver/30'
                }`}
              >
                {type === 'all' ? 'All Reviews' : type === 'video' ? 'Video Reviews' : 'Written Reviews'}
              </button>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20 hover:shadow-xl transition-shadow"
              >
                {t.reviewType === 'video' ? (
                  <div className="aspect-video bg-ice/50 rounded-xl mb-4 flex items-center justify-center cursor-pointer hover:bg-ice transition-colors">
                    {t.thumbnail ? (
                      <img src={t.thumbnail} alt={t.customerName} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <Play className="w-12 h-12 text-blue-500" />
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                )}

                <p className="text-navy/70 text-sm leading-relaxed mb-4 italic">
                  "{t.reviewText || 'Amazing product! Highly recommend.'}"
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-semibold text-navy">{t.customerName}</p>
                    <p className="text-navy/50 text-xs">{t.city}, {t.state}</p>
                  </div>
                  {t.isVerified && (
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">Verified</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-navy/50 py-12">
              Customer testimonials will be displayed once added via admin panel.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
