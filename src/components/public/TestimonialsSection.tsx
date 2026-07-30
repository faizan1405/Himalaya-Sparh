'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronRight, Play } from 'lucide-react';
import { SectionHeading, Card } from '@/components/public/Sections';

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

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content?type=testimonial')
      .then((r) => r.ok ? r.json() : [])
      .then((data: Testimonial[]) => {
        // Prefer featured, then take the first 3
        const featured = data.filter((t) => t.isFeatured);
        setTestimonials(featured.length > 0 ? featured.slice(0, 3) : data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-ice/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-aurora/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aqua/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          label="Testimonials"
          title="Trusted by Thousands of Families"
          subtitle="Real stories from real customers who trust Himalya Sparsh for pure Himalayan water."
        />

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full h-72 bg-silver/10 rounded-2xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="group"
                >
                  <Card className="h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <Quote className="w-8 h-8 text-aurora/10" />
                    </div>

                    {t.reviewType === 'video' && t.thumbnail ? (
                      <div className="aspect-video bg-ice/50 rounded-xl mb-5 flex items-center justify-center overflow-hidden relative">
                        <img src={t.thumbnail} alt={t.customerName} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/45 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          </div>
                        </div>
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
                      <p className="text-navy/70 text-sm leading-relaxed mb-5 line-clamp-3">
                        &ldquo;{t.reviewText || 'Amazing product! Highly recommend.'}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-silver/10">
                      <div>
                        <p className="font-heading font-semibold text-navy text-sm">{t.customerName}</p>
                        <p className="text-navy/50 text-xs">{t.city}{t.state ? `, ${t.state}` : ''}</p>
                      </div>
                      {t.isVerified && (
                        <span className="text-[11px] bg-green-500/10 text-green-600 px-2.5 py-0.5 rounded-full font-medium">Verified</span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a
                href="/testimonials/user-reviews"
                className="inline-flex items-center gap-2 text-aurora font-semibold hover:gap-3 transition-all duration-300 group"
              >
                View All Reviews
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </>
        ) : (
          <p className="text-center text-navy/40 py-12">Customer testimonials coming soon.</p>
        )}
      </div>
    </section>
  );
}
