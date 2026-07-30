'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, Card, CTAButton } from '@/components/public/Sections';
import { MapPin, TrendingUp, Award, Handshake, Check } from 'lucide-react';

const inputCls = "w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/40 text-white placeholder:text-silver/30 transition-colors";
const labelCls = "block text-sm font-medium text-silver mb-2";

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
    <main>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] text-aurora text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            Business Opportunity
          </span>
          <h1 className="heading-xl font-display font-bold text-white mb-6 leading-tight tracking-tight text-balance">
            Become a Distributor
          </h1>
          <p className="text-body-md text-silver/70 max-w-2xl mx-auto leading-relaxed">
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
                <p className="text-2xl lg:text-3xl font-display font-bold bg-gradient-to-r from-aurora to-aqua bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-silver/60 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Form */}
      <Section dark>
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Benefits & Network */}
            <div>
              <SectionHeading label="Why Partner" title="Why Partner With Us?" lightTitle centered={false} />

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }
                    }
                    className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-sm rounded-xl p-4 border border-white/[0.08]"
                  >
                    <div className="w-6 h-6 bg-aurora/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-aurora" />
                    </div>
                    <span className="text-silver/80 text-sm">{b}</span>
                  </motion.div>
                ))}
              </div>

              {/* Distributor Network */}
              {fetchError ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
                  <p className="text-red-400 text-sm">Failed to load distributor data. Please try again later.</p>
                </div>
              ) : (
                <Card glow>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-aurora/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-aurora" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white">Distributor Network</h3>
                      <p className="text-silver/50 text-sm">Growing across {distributors.length} locations in India</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {distributors.slice(0, 10).map((d) => (
                      <span key={d._id} className="px-3 py-1.5 bg-white/[0.04] text-silver/70 text-xs font-medium rounded-full border border-white/[0.08]">
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
                  className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-10 border border-white/[0.08] text-center"
                >
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="heading-sm font-display font-bold text-white mb-2">Application Submitted!</h3>
                  <p className="text-silver/60">We&apos;ll review your application and get back to you within 48 hours.</p>
                </motion.div>
              ) : showForm ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/[0.08]">
                  <h3 className="heading-sm font-display font-bold text-white mb-8">Distributor Application</h3>
                  {submitError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      {submitError}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <input name="applicantName" required placeholder="Full name" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Business Name *</label>
                        <input name="businessName" required placeholder="Business name" className={inputCls} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Phone Number *</label>
                        <input name="phone" required placeholder="Phone number" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Email *</label>
                        <input name="email" type="email" required placeholder="Email" className={inputCls} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>State *</label>
                        <input name="state" required placeholder="State" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>City *</label>
                        <input name="city" required placeholder="City" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Existing Business Details</label>
                      <input name="existingBusiness" placeholder="Existing business details" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Business Experience</label>
                      <input name="experience" placeholder="Years of experience" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Available Investment</label>
                      <input name="investment" placeholder="Investment capacity" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Preferred Territory</label>
                      <input name="preferredTerritory" placeholder="Preferred territory" className={inputCls} />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" name="hasWarehouse" className="w-4 h-4 accent-aurora rounded border-white/10 bg-white/[0.03]" />
                      <span className="text-sm text-silver/60">I have an office/warehouse available</span>
                    </label>
                    <div>
                      <label className={labelCls}>Message</label>
                      <textarea name="message" rows={3} placeholder="Tell us about your interest" className={`${inputCls} resize-none`} />
                    </div>
                    <CTAButton type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Application'}</CTAButton>
                  </form>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-10 border border-white/[0.08] text-center">
                  <h3 className="heading-sm font-display font-bold text-white mb-4">Ready to Grow?</h3>
                  <p className="text-silver/60 mb-8 max-w-md mx-auto">Join our distributor network and become part of the Himalya Sparsh success story across India.</p>
                  <CTAButton onClick={() => setShowForm(true)}>Apply Now</CTAButton>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
