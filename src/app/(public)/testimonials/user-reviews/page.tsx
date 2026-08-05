'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Quote } from 'lucide-react';
import { Card, CTAButton } from '@/components/public/Sections';
import { ParallaxHero } from '@/components/public/ParallaxHero';
import { BackgroundSection } from '@/components/public/BackgroundSection';

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

const inputCls =
  'w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/40 text-white placeholder:text-silver/30 transition-colors';
const labelCls = 'block text-sm font-medium text-silver mb-2';

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
      .then((data) => {
        setTestimonials(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
          rating: Number(formData.get('rating') || 5),
          reviewText: formData.get('reviewText'),
          purchaseType: formData.get('purchaseType') || 'Standard',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setShowForm(false);
      } else {
        setSubmitError(data.error || 'Failed to submit review.');
      }
    } catch {
      setSubmitError('Failed to submit review. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <ParallaxHero
        imageSrc="/images/bgs/user-reviews.png"
        imageAlt="Serene Luxury Living Atmosphere"
        badge={
          <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/[0.12] text-aurora text-sm font-medium rounded-full backdrop-blur-md">
            Customer Reviews
          </span>
        }
        title="Real Stories, Pure Hydration"
        subtitle="Read and watch authentic experiences from thousands of happy households"
        description="Discover how Himalya Sparsh has enhanced daily health, hydration, and peace of mind for families across the nation."
      />

      {/* Reviews section */}
      <BackgroundSection
        id="reviews"
        imageSrc="/images/bgs/water-caustics.png"
        imageAlt="Customer Review Caustics Matrix"
        overlay="gradient"
        opacity={0.25}
        blur="sm"
        className="section-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 'video', label: 'Video Reviews' },
                { id: 'written', label: 'Written Stories' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                    filter === tab.id
                      ? 'bg-gradient-to-r from-aurora to-aqua text-white shadow-lg shadow-aurora/20'
                      : 'bg-white/[0.04] text-silver/70 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <CTAButton onClick={() => setShowForm(!showForm)} variant="secondary" className="!text-xs !py-2.5">
              {showForm ? 'Close Form' : 'Share Your Experience'}
            </CTAButton>
          </div>

          {/* Submission Feedback */}
          {submitted && (
            <div className="mb-12 p-6 glass-strong rounded-2xl border border-green-500/30 text-center text-green-400">
              Thank you for sharing your experience! Your review has been submitted for verification.
            </div>
          )}

          {/* Review Form Drawer */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16 glass-medium rounded-3xl p-8 lg:p-12 border border-white/[0.12]"
            >
              <h2 className="heading-sm font-display font-bold text-white mb-6">Write a Review</h2>
              {submitError && <p className="text-red-400 text-sm mb-4">{submitError}</p>}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <label className={labelCls}>Your Name</label>
                    <input name="customerName" required placeholder="Full Name" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>City</label>
                    <input name="city" required placeholder="City" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>State</label>
                    <input name="state" placeholder="State" className={inputCls} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Rating</label>
                    <select name="rating" defaultValue="5" className={inputCls}>
                      <option value="5" className="bg-navy">
                        5 Stars - Excellent
                      </option>
                      <option value="4" className="bg-navy">
                        4 Stars - Very Good
                      </option>
                      <option value="3" className="bg-navy">
                        3 Stars - Average
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Purchase Context</label>
                    <input name="purchaseType" placeholder="Home / Office / Gift" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Your Story &amp; Experience</label>
                  <textarea
                    name="reviewText"
                    rows={4}
                    required
                    placeholder="Tell us how Himalya Sparsh has improved your daily water experience..."
                    className={inputCls}
                  />
                </div>

                <CTAButton type="submit" disabled={formLoading} variant="primary">
                  {formLoading ? 'Submitting...' : 'Submit Review'}
                </CTAButton>
              </form>
            </motion.div>
          )}

          {error && <div className="text-center text-red-400 py-8">{error}</div>}

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {filtered.length > 0
              ? filtered.map((t, i) => (
                  <motion.div
                    key={t._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                  >
                    <Card glow className="glass-medium h-full flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-4 right-4">
                        <Quote className="w-8 h-8 text-aurora/[0.12]" />
                      </div>

                      <div>
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

                        <p className="text-silver/80 text-sm leading-relaxed mb-6">
                          &ldquo;{t.reviewText || 'Exceptional water purity and taste!'}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                        <div>
                          <p className="font-display font-semibold text-white text-sm">{t.customerName}</p>
                          <p className="text-silver/50 text-xs">
                            {t.city}
                            {t.state ? `, ${t.state}` : ''}
                          </p>
                        </div>
                        {t.isVerified && (
                          <span className="text-[11px] bg-green-500/10 text-green-400 px-2.5 py-0.5 rounded-full font-semibold border border-green-500/20">
                            Verified User
                          </span>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))
              : !loading && (
                  <div className="col-span-full text-center py-16 text-silver/50">
                    No customer reviews found for this filter.
                  </div>
                )}
          </div>
        </div>
      </BackgroundSection>
    </main>
  );
}
