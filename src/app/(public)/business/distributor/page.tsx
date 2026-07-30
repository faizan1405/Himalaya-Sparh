'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, Card, CTAButton } from '@/components/public/Sections';
import { MapPin, TrendingUp, Award, Handshake } from 'lucide-react';

interface DistributorInfo {
  _id: string;
  state: string;
  city: string;
  name: string;
  contact: string;
  isActive: boolean;
}

const benefits = [
  'Attractive margins and profit sharing',
  'Marketing and promotional support',
  'Training and product knowledge',
  'Dedicated territory protection',
  'Supply chain management support',
  'Brand building and advertising',
];

export default function DistributorPage() {
  const [distributors, setDistributors] = useState<DistributorInfo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content?type=distributor')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setDistributors(Array.isArray(data) ? data : (data?.info || []));
        setLoading(false);
      })
      .catch((err) => { setFetchError(err.message); setLoading(false); });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/forms/distributor-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName: formData.get('applicantName'),
          businessName: formData.get('businessName'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          state: formData.get('state'),
          city: formData.get('city'),
          existingBusiness: formData.get('existingBusiness'),
          experience: formData.get('experience'),
          investment: formData.get('investment'),
          preferredTerritory: formData.get('preferredTerritory'),
          hasWarehouse: formData.get('hasWarehouse') === 'on',
          message: formData.get('message'),
          consent: true,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setShowForm(false);
      } else {
        setSubmitError(data.error || 'Failed to submit. Please try again.');
      }
    } catch {
      setSubmitError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-glow text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            Business Opportunity
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Become a Distributor
          </h1>
          <p className="text-lg text-silver/70 max-w-2xl mx-auto leading-relaxed">
            Join our growing network of distributors across India. Expand your business with a trusted Himalayan water brand.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-b from-midnight to-navy relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Locations', value: '20-22', icon: MapPin },
              { label: 'Growth Rate', value: 'Fast', icon: TrendingUp },
              { label: 'Partner Support', value: 'Full', icon: Award },
              { label: 'Territories', value: 'All India', icon: Handshake },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-xl flex items-center justify-center text-aurora mx-auto mb-3">
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-2xl lg:text-3xl font-heading font-bold bg-gradient-to-r from-aurora to-aqua bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-silver/60 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Form */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-navy to-white relative">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Benefits & Network */}
            <div>
              <SectionHeading label="Why Partner" title="Why Partner With Us?" centered={false} />

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-silver/10"
                  >
                    <div className="w-6 h-6 bg-aurora/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-aurora" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-navy/80 text-sm">{b}</span>
                  </motion.div>
                ))}
              </div>

              {/* Distributor Network */}
              {fetchError ? (
                <div className="bg-red-50/50 border border-red-200/50 rounded-2xl p-8 text-center">
                  <p className="text-red-500 text-sm">Failed to load distributor data. Please try again later.</p>
                </div>
              ) : (
                <Card>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-aurora/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-aurora" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy">Distributor Network</h3>
                      <p className="text-navy/50 text-sm">Growing across {distributors.length} locations in India</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {distributors.slice(0, 10).map((d) => (
                      <span key={d._id} className="px-3 py-1.5 bg-ice/50 text-navy/70 text-xs font-medium rounded-full border border-silver/10">
                        {d.city}, {d.state}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Application Form */}
            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-silver/10 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl mb-2">Application Submitted!</h3>
                  <p className="text-navy/60">We&apos;ll review your application and get back to you within 48 hours.</p>
                </motion.div>
              ) : showForm ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-sm border border-silver/10">
                  <h3 className="font-heading font-bold text-navy text-2xl mb-8">Distributor Application</h3>
                  {submitError && (
                    <div className="mb-6 p-4 bg-red-50/80 border border-red-200/50 rounded-xl text-red-500 text-sm">
                      {submitError}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">Full Name *</label>
                        <input name="applicantName" required placeholder="Full name" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">Business Name *</label>
                        <input name="businessName" required placeholder="Business name" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">Phone Number *</label>
                        <input name="phone" required placeholder="Phone number" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">Email *</label>
                        <input name="email" type="email" required placeholder="Email" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">State *</label>
                        <input name="state" required placeholder="State" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">City *</label>
                        <input name="city" required placeholder="City" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Existing Business Details</label>
                      <input name="existingBusiness" placeholder="Existing business details" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Business Experience</label>
                      <input name="experience" placeholder="Years of experience" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Available Investment</label>
                      <input name="investment" placeholder="Investment capacity" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Preferred Territory</label>
                      <input name="preferredTerritory" placeholder="Preferred territory" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30" />
                    </div>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" name="hasWarehouse" className="w-4 h-4 text-aurora rounded border-silver/30" />
                      <span className="text-sm text-navy/70">I have an office/warehouse available</span>
                    </label>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Message</label>
                      <textarea name="message" rows={3} placeholder="Tell us about your interest" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 resize-none text-navy placeholder:text-navy/30" />
                    </div>
                    <CTAButton type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Application'}</CTAButton>
                  </form>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-sm border border-silver/10 text-center">
                  <h3 className="font-heading font-bold text-navy text-2xl mb-4">Ready to Grow?</h3>
                  <p className="text-navy/60 mb-8 max-w-md mx-auto">Join our distributor network and become part of the Himalya Sparsh success story across India.</p>
                  <CTAButton onClick={() => setShowForm(true)}>Apply Now</CTAButton>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
