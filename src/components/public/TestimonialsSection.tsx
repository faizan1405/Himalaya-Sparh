'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronRight, Play } from 'lucide-react';
import { SectionHeading, Card } from '@/components/public/Sections';
import { BackgroundSection } from '@/components/public/BackgroundSection';
import Link from 'next/link';

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
  isFeatured: boolean;
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content?type=testimonial')
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Testimonial[]) => {
        const featured = data.filter((t) => t.isFeatured);
        setTestimonials(featured.length > 0 ? featured.slice(0, 3) : data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <BackgroundSection
      id="testimonials"
      imageSrc="/images/bgs/user-reviews.png"
      imageAlt="Satisfied Customer Lifestyle Atmosphere"
      overlay="gradient"
      opacity={0.3}
      blur="md"
      className="section-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="Trusted by Thousands of Families"
          subtitle="Real stories from real customers who trust Himalya Sparsh for pure Himalayan water."
          lightTitle
        />

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-72 bg-white/[0.03] rounded-2xl animate-pulse border border-white/[0.06]"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
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
                >
                  <Card glow className="h-full flex flex-col relative overflow-hidden glass-medium">
                    <div className="absolute top-4 right-4">
                      <Quote className="w-8 h-8 text-aurora/[0.12]" />
                    </div>

                    {t.reviewType === 'video' && t.thumbnail ? (
                      <div className="aspect-video bg-white/[0.03] rounded-xl mb-5 flex items-center justify-center overflow-hidden relative border border-white/[0.06]">
                        <img src={t.thumbnail} alt={t.customerName} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-navy/40 hover:bg-navy/55 transition-colors flex items-center justify-center cursor-pointer">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-4 h-4 ${idx < t.rating ? 'text-gold fill-gold' : 'text-white/10'}`}
                          />
                        ))}
                      </div>
                    )}

                    <div className="relative flex-1">
                      <p className="text-silver/80 text-sm leading-relaxed mb-5 line-clamp-3">
                        &ldquo;{t.reviewText || 'Amazing product! Highly recommend.'}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                      <div>
                        <p className="font-display font-semibold text-white text-sm">{t.customerName}</p>
                        <p className="text-silver/50 text-xs">
                          {t.city}
                          {t.state ? `, ${t.state}` : ''}
                        </p>
                      </div>
                      {t.isFeatured && (
                        <span className="text-[11px] bg-aurora/10 text-aurora px-2.5 py-0.5 rounded-full font-semibold">
                          Featured
                        </span>
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
              className="text-center mt-14"
            >
              <Link
                href="/testimonials/user-reviews"
                className="inline-flex items-center gap-2 text-aurora font-semibold hover:gap-3 transition-all duration-300 group"
              >
                View All Reviews
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-silver/50">Customer testimonials coming soon.</p>
          </div>
        )}
      </div>
    </BackgroundSection>
  );
}
