'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, CTAButton } from '@/components/public/Sections';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/content/distributor')
      .then((r) => r.json())
      .then((data) => setDistributors(data?.info || []))
      .catch(() => {});
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

      if (res.ok) { setSubmitted(true); setShowForm(false); }
    } catch {
      alert('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ice to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
            Business Opportunity
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-navy mb-6">
            Become a Distributor
          </h1>
          <p className="text-lg text-navy/60 max-w-2xl mx-auto">
            Join our growing network of distributors across India. Expand your business with a trusted Himalayan water brand.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Locations', value: '20-22', icon: MapPin },
              { label: 'Growth Rate', value: 'Fast', icon: TrendingUp },
              { label: 'Partner Support', value: 'Full', icon: Award },
              { label: 'Territories', value: 'All India', icon: Handshake },
            ].map((stat, i) => (
              <div key={i}>
                <stat.icon className="w-8 h-8 text-aqua mx-auto mb-2" />
                <p className="text-2xl lg:text-3xl font-heading font-bold">{stat.value}</p>
                <p className="text-silver text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Benefits & Map */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-navy mb-8">Why Partner With Us?</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 bg-ice/40 rounded-xl p-4"
                  >
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-navy/80 text-sm">{b}</span>
                  </motion.div>
                ))}
              </div>

              {/* Distributor Map Placeholder */}
              <div className="bg-ice/30 rounded-2xl p-8 text-center">
                <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-navy mb-2">Distributor Network</h3>
                <p className="text-navy/60 text-sm mb-4">Growing across {distributors.length} locations in India</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {distributors.slice(0, 10).map((d) => (
                    <span key={d._id} className="px-3 py-1 bg-white rounded-full text-xs text-navy/70 shadow-sm">
                      {d.city}, {d.state}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl mb-2">Application Submitted!</h3>
                  <p className="text-navy/60">We'll review your application and get back to you within 48 hours.</p>
                </div>
              ) : showForm ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl p-8 shadow-xl border border-silver/20">
                  <h3 className="font-heading font-bold text-navy text-2xl mb-6">Distributor Application</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input name="applicantName" required placeholder="Full Name *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                      <input name="businessName" required placeholder="Business Name *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input name="phone" required placeholder="Phone Number *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                      <input name="email" type="email" required placeholder="Email *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input name="state" required placeholder="State *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                      <input name="city" required placeholder="City *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                    </div>
                    <input name="existingBusiness" placeholder="Existing Business Details" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                    <input name="experience" placeholder="Business Experience" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                    <input name="investment" placeholder="Available Investment" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                    <input name="preferredTerritory" placeholder="Preferred Territory" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                    <label className="flex items-center gap-3">
                      <input type="checkbox" name="hasWarehouse" className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-navy/70">I have an office/warehouse available</span>
                    </label>
                    <textarea name="message" rows={3} placeholder="Message" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl resize-none" />
                    <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Submitting...' : 'Submit Application'}</button>
                  </form>
                </motion.div>
              ) : (
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-silver/20 text-center">
                  <h3 className="font-heading font-bold text-navy text-2xl mb-4">Ready to Grow?</h3>
                  <p className="text-navy/60 mb-8">Join our distributor network and become part of the Himalya Sparsh success story.</p>
                  <button onClick={() => setShowForm(true)} className="btn-primary">Apply Now</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
