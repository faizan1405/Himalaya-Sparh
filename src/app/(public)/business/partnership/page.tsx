'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, CTAButton } from '@/components/public/Sections';
import { Briefcase, Building2, Store, Landmark, Hotel, FlaskConical, Cpu } from 'lucide-react';

const partnershipTypes = [
  { icon: Building2, title: 'Strategic Partnership', desc: 'Long-term strategic alliances for mutual growth and market expansion.' },
  { icon: Store, title: 'Retail Partnership', desc: 'Retail display and sales partnerships across locations.' },
  { icon: Landmark, title: 'Institutional Partnership', desc: 'Partnerships with institutions, hospitals, and organizations.' },
  { icon: Briefcase, title: 'Corporate Partnership', desc: 'Corporate wellness programs and bulk supply partnerships.' },
  { icon: Hotel, title: 'Hospitality Partnership', desc: 'Hotels, resorts, and hospitality industry partnerships.' },
  { icon: FlaskConical, title: 'Wellness Partnership', desc: 'Wellness centers, gyms, and health-focused businesses.' },
  { icon: Cpu, title: 'Technology Partnership', desc: 'Technology integration and innovation partnerships.' },
];

export default function PartnershipPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/forms/partnership-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.get('fullName'),
          companyName: formData.get('companyName'),
          designation: formData.get('designation'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          website: formData.get('website'),
          city: formData.get('city'),
          state: formData.get('state'),
          partnershipType: formData.get('partnershipType'),
          message: formData.get('message'),
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
            Partnerships
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-navy mb-6">
            Business Partnership
          </h1>
          <p className="text-lg text-navy/60 max-w-2xl mx-auto">
            Explore various partnership opportunities and collaborate with us to grow together.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Partnership Opportunities" subtitle="Multiple ways to collaborate with Himalya Sparsh" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {partnershipTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-4">
                  <type.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-navy text-lg mb-2">{type.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{type.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="font-heading font-bold text-navy text-xl mb-2">Enquiry Submitted!</h3>
                <p className="text-navy/60">We'll review your proposal and get back to you soon.</p>
              </div>
            ) : showForm ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl p-8 shadow-xl border border-silver/20">
                <h3 className="font-heading font-bold text-navy text-2xl mb-6">Partnership Enquiry</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="fullName" required placeholder="Full Name *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                    <input name="companyName" required placeholder="Company Name *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="designation" required placeholder="Designation *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                    <input name="phone" required placeholder="Phone *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="email" type="email" required placeholder="Email *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                    <input name="website" placeholder="Website" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="city" required placeholder="City *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                    <input name="state" required placeholder="State *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl" />
                  </div>
                  <select name="partnershipType" required className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl">
                    <option value="">Select Partnership Type</option>
                    {partnershipTypes.map((t) => (
                      <option key={t.title} value={t.title}>{t.title}</option>
                    ))}
                  </select>
                  <textarea name="message" rows={4} placeholder="Describe your partnership proposal" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl resize-none" />
                  <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Submitting...' : 'Submit Enquiry'}</button>
                </form>
              </motion.div>
            ) : (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-silver/20 text-center">
                <h3 className="font-heading font-bold text-navy text-2xl mb-4">Let's Collaborate</h3>
                <p className="text-navy/60 mb-8">We're always open to new partnership opportunities. Submit your proposal today.</p>
                <button onClick={() => setShowForm(true)} className="btn-primary">Submit Partnership Enquiry</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
