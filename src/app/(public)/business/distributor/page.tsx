'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, Card, CTAButton } from '@/components/public/Sections';
import { MapPin, TrendingUp, Award, Handshake, Check } from 'lucide-react';
import { ParallaxHero } from '@/components/public/ParallaxHero';
import { BackgroundSection } from '@/components/public/BackgroundSection';

const inputCls =
  'w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/40 text-white placeholder:text-silver/30 transition-colors';
const labelCls = 'block text-sm font-medium text-silver mb-2';

interface DistributorInfo {
  _id: string;
  state: string;
  city: string;
  name: string;
  contact: string;
  isActive: boolean;
}

const benefits = [
  'Attractive profit margins & high ROI',
  'Marketing, branding & collateral support',
  'Comprehensive technical & product training',
  'Exclusive territory rights & protection',
  'End-to-end supply chain & inventory management',
  'National ad campaigns & digital lead sharing',
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
        setDistributors(Array.isArray(data) ? data : data?.info || []);
        setLoading(false);
      })
      .catch((err) => {
        setFetchError(err.message);
        setLoading(false);
      });
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
          firmName: formData.get('firmName'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          city: formData.get('city'),
          state: formData.get('state'),
          experienceYears: Number(formData.get('experienceYears') || 0),
          proposedTerritory: formData.get('proposedTerritory'),
          investmentCapacity: formData.get('investmentCapacity'),
          notes: formData.get('notes'),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setShowForm(false);
      } else {
        setSubmitError(data.error || 'Failed to submit application.');
      }
    } catch {
      setSubmitError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <ParallaxHero
        imageSrc="/images/bgs/business-distributor.png"
        imageAlt="Modern Commercial Distribution & Logistics Hub"
        badge={
          <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/[0.12] text-aurora text-sm font-medium rounded-full backdrop-blur-md">
            Distribution Network
          </span>
        }
        title="Become an Authorized Distributor"
        subtitle="Exclusive Territories • High Margin • Fast Growing Market"
        description="Join the nationwide network bringing natural Himalayan structured water devices to millions of households and commercial buyers."
      />

      {/* Value proposition & benefits */}
      <BackgroundSection
        id="benefits"
        imageSrc="/images/bgs/water-caustics.png"
        imageAlt="Distribution Purity Matrix"
        overlay="gradient"
        opacity={0.25}
        blur="sm"
        className="section-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why Partner With Us"
            title="Distributor Growth Advantages"
            subtitle="We empower our distributors with protected territories, high margins, and active marketing support."
            lightTitle
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {[
              { icon: TrendingUp, title: 'High Profit Margin', desc: 'Industry leading margins and recurring revenue from replacement cartridges and accessories.' },
              { icon: Award, title: 'Exclusive Territory', desc: 'Guaranteed sole distribution rights within your assigned city or region.' },
              { icon: Handshake, title: 'Dedicated Support', desc: 'Full marketing collateral, local event sponsorship, and lead routing from our website.' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Card glow className="glass-medium h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-aurora/15 to-aqua/15 rounded-xl flex items-center justify-center mb-6 group-hover:from-aurora/30 group-hover:to-aqua/30 transition-all duration-500">
                    <card.icon className="w-7 h-7 text-aurora" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{card.title}</h3>
                  <p className="text-silver/70 text-sm leading-relaxed">{card.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="glass-strong rounded-3xl p-8 lg:p-12 border border-white/[0.12] max-w-4xl mx-auto mb-16">
            <h3 className="heading-sm font-display font-bold text-white text-center mb-8">
              Key Partnership Benefits
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-aurora/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-aurora" />
                  </div>
                  <span className="text-silver/80 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <CTAButton onClick={() => setShowForm(!showForm)} variant="primary">
              {showForm ? 'Close Form' : 'Apply for Distribution Rights'}
            </CTAButton>
          </div>
        </div>
      </BackgroundSection>

      {/* Existing Distributors List */}
      <BackgroundSection
        id="distributors"
        imageSrc="/images/bgs/business-distributor.png"
        imageAlt="Distribution Center Logistics"
        overlay="deep"
        opacity={0.3}
        blur="md"
        className="section-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Current Network"
            title="Authorized Distribution Centers"
            subtitle="Find your nearest authorized Himalya Sparsh distributor across India."
            lightTitle
          />

          {fetchError && <div className="text-center text-red-400 py-4">{fetchError}</div>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {distributors.length > 0
              ? distributors.map((dist, i) => (
                  <motion.div
                    key={dist._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card glow className="glass-medium h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-aurora/10 rounded-xl flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-aurora" />
                        </div>
                        <div>
                          <span className="text-aurora font-semibold text-xs uppercase tracking-wider block">
                            {dist.state}
                          </span>
                          <h4 className="font-display font-bold text-white text-base">{dist.city}</h4>
                        </div>
                      </div>
                      <h3 className="font-display font-semibold text-white text-lg mb-2">{dist.name}</h3>
                      <p className="text-silver/70 text-sm font-mono">{dist.contact}</p>
                    </Card>
                  </motion.div>
                ))
              : !loading && (
                  <div className="col-span-full text-center py-12 text-silver/50">
                    Network expansion underway. Contact us directly to claim your territory.
                  </div>
                )}
          </div>
        </div>
      </BackgroundSection>

      {/* Application Form */}
      {showForm && (
        <BackgroundSection
          imageSrc="/images/bgs/business-distributor.png"
          imageAlt="Distribution Center Logistics Application"
          overlay="deep"
          opacity={0.35}
          blur="md"
          className="section-lg"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-strong rounded-3xl p-8 lg:p-12 border border-white/[0.12] shadow-2xl">
              <SectionHeading
                label="Application"
                title="Distributor Application Form"
                subtitle="Submit your details to apply for an exclusive dealership or distribution territory."
                lightTitle
              />

              {submitError && <p className="text-red-400 text-sm mb-6 text-center">{submitError}</p>}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Applicant Name</label>
                    <input name="applicantName" required placeholder="Full Name" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Firm / Business Name</label>
                    <input name="firmName" required placeholder="Firm Name" className={inputCls} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input name="phone" required placeholder="+91 98765 43210" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input name="email" type="email" required placeholder="name@firm.com" className={inputCls} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>City</label>
                    <input name="city" required placeholder="City" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>State</label>
                    <input name="state" required placeholder="State" className={inputCls} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Proposed Territory</label>
                    <input name="proposedTerritory" required placeholder="City / District / Zone" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Investment Capacity</label>
                    <select name="investmentCapacity" required className={inputCls}>
                      <option value="₹5 Lakhs - ₹10 Lakhs" className="bg-navy">₹5 Lakhs - ₹10 Lakhs</option>
                      <option value="₹10 Lakhs - ₹25 Lakhs" className="bg-navy">₹10 Lakhs - ₹25 Lakhs</option>
                      <option value="₹25 Lakhs+" className="bg-navy">₹25 Lakhs+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Business Experience &amp; Infrastructure</label>
                  <textarea name="notes" rows={4} placeholder="Tell us about your existing business setup and distribution experience..." className={inputCls} />
                </div>

                <div className="text-center pt-4">
                  <CTAButton type="submit" disabled={loading} variant="primary">
                    {loading ? 'Submitting Application...' : 'Submit Application'}
                  </CTAButton>
                </div>
              </form>
            </div>
          </div>
        </BackgroundSection>
      )}

      {submitted && (
        <section className="py-12 bg-navy text-center">
          <div className="max-w-md mx-auto p-6 glass-strong rounded-2xl border border-green-500/30 text-green-400 flex items-center justify-center gap-3">
            <Check className="w-6 h-6" />
            Thank you! Your distributor application has been submitted successfully.
          </div>
        </section>
      )}
    </main>
  );
}
