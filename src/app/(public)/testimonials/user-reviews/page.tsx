'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Quote } from 'lucide-react';
import { Section, SectionHeading, Card, CTAButton } from '@/components/public/Sections';
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
  isVerified: boolean;
}

const inputCls = "w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/40 text-white placeholder:text-silver/30 transition-colors";
const labelCls = "block text-sm font-medium text-silver mb-2";

export default function UserTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setSubmitError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/forms/testimonial-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.get('customerName'),
          city: formData.get('city'),
          state: formData.get('state'),
          rating: formData.get('rating'),
          reviewText: formData.get('reviewText'),
          purchaseType: formData.get('purchaseType'),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitError(data.error || 'Failed to submit. Please try again.');
      }
    } catch {
      setSubmitError('Failed to submit. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-64 h-10 bg-white/[0.04] rounded animate-pulse mx-auto mb-4" />
            <div className="w-full max-w-2xl h-6 bg-white/[0.04] rounded animate-pulse mx-auto mb-12" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-full h-72 bg-white/[0.03] rounded-2xl animate-pulse border border-white/[0.06]" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] text-aurora text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            Testimonials
          </span>
          <h1 className="heading-xl font-display font-bold text-white mb-6 leading-tight tracking-tight text-balance">
            What Our Customers Say
          </h1>
          <p className="text-body-md text-silver/70 max-w-2xl mx-auto leading-relaxed">
            Real stories from real customers who trust Himalya Sparsh for pure Himalayan water.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <Section id="testimonials" dark>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="text-center text-red-400 py-8 bg-red-500/10 rounded-2xl border border-red-500/20">{error}</div>
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
                    : 'bg-white/[0.03] text-silver/70 border border-white/[0.08] hover:border-aurora/20'
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
                  <Card glow className="h-full flex flex-col">
                    {t.reviewType === 'video' ? (
                      <div className="aspect-video bg-white/[0.03] rounded-xl mb-4 flex items-center justify-center overflow-hidden relative group border border-white/[0.06]">
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
                            className={`w-4 h-4 ${idx < t.rating ? 'text-gold fill-gold' : 'text-white/10'}`}
                          />
                        ))}
                      </div>
                    )}

                    <div className="relative flex-1">
                      <Quote className="w-8 h-8 text-aurora/10 absolute -top-1 -left-1" />
                      <p className="text-silver/70 text-sm leading-relaxed mb-4 relative z-10">
                        &ldquo;{t.reviewText || 'Amazing product! Highly recommend.'}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <div>
                        <p className="font-display font-semibold text-white">{t.customerName}</p>
                        <p className="text-silver/50 text-xs">{t.city}, {t.state}</p>
                      </div>
                      {t.isVerified && (
                        <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full font-medium border border-green-500/20">Verified</span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : !error && (
            <div className="text-center text-silver/40 py-16 bg-white/[0.02] rounded-2xl border border-white/[0.06]">
              <Quote className="w-12 h-12 text-silver/20 mx-auto mb-4" />
              <p>Customer testimonials will be displayed once added via admin panel.</p>
            </div>
          )}

          {/* Share your experience CTA */}
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
              Share Your Experience
              <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
