'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, Card, CTAButton } from '@/components/public/Sections';
import { Briefcase, Building2, Store, Landmark, Hotel, FlaskConical, Cpu, CheckCircle } from 'lucide-react';

const inputCls = "w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/40 text-white placeholder:text-silver/30 transition-colors";
const labelCls = "block text-sm font-medium text-silver mb-2";

const partnershipTypes = [
  { icon: Building2, title: 'Strategic Partnership', desc: 'Long-term strategic alliances for mutual growth and market expansion across geographies.' },
  { icon: Store, title: 'Retail Partnership', desc: 'Retail display and sales partnerships across locations with dedicated support.' },
  { icon: Landmark, title: 'Institutional Partnership', desc: 'Partnerships with institutions, hospitals, and organizations for bulk supply.' },
  { icon: Briefcase, title: 'Corporate Partnership', desc: 'Corporate wellness programs and bulk supply partnerships for enterprises.' },
  { icon: Hotel, title: 'Hospitality Partnership', desc: 'Hotels, resorts, and hospitality industry partnerships for premium water solutions.' },
  { icon: FlaskConical, title: 'Wellness Partnership', desc: 'Wellness centers, gyms, and health-focused businesses seeking purity.' },
  { icon: Cpu, title: 'Technology Partnership', desc: 'Technology integration and innovation partnerships for smart water solutions.' },
];

export default function PartnershipPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
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
            Partnerships
          </span>
          <h1 className="heading-xl font-display font-bold text-white mb-6 leading-tight tracking-tight text-balance">
            Business Partnership
          </h1>
          <p className="text-body-md text-silver/70 max-w-2xl mx-auto leading-relaxed">
            Explore various partnership opportunities and collaborate with us to grow together.
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <Section dark>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Partnership Opportunities"
            title="Partnership Opportunities"
            subtitle="Multiple ways to collaborate with Himalya Sparsh and build a shared future."
            lightTitle
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {partnershipTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card glow className="group h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-xl flex items-center justify-center text-aurora mb-4 group-hover:scale-110 transition-transform duration-500">
                    <type.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{type.title}</h3>
                  <p className="text-silver/60 text-sm leading-relaxed">{type.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Form Section */}
          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-10 border border-white/[0.08] text-center"
              >
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="heading-sm font-display font-bold text-white mb-2">Enquiry Submitted!</h3>
                <p className="text-silver/60">We&apos;ll review your proposal and get back to you soon.</p>
              </motion.div>
            ) : showForm ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/[0.08]">
                <h3 className="heading-sm font-display font-bold text-white mb-8">Partnership Enquiry</h3>
                {submitError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {submitError}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input name="fullName" required placeholder="Your full name" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Company Name *</label>
                      <input name="companyName" required placeholder="Company name" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Designation *</label>
                      <input name="designation" required placeholder="Your designation" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone *</label>
                      <input name="phone" required placeholder="Phone number" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Email *</label>
                      <input name="email" type="email" required placeholder="your@email.com" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Website</label>
                      <input name="website" placeholder="Company website" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>City *</label>
                      <input name="city" required placeholder="City" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>State *</label>
                      <input name="state" required placeholder="State" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Partnership Type *</label>
                    <select name="partnershipType" required className={`${inputCls} appearance-none`}>
                      <option value="" className="bg-navy">Select Partnership Type</option>
                      {partnershipTypes.map((t) => (
                        <option key={t.title} value={t.title} className="bg-navy">{t.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Message</label>
                    <textarea name="message" rows={4} placeholder="Describe your partnership proposal" className={`${inputCls} resize-none`} />
                  </div>
                  <CTAButton type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Enquiry'}</CTAButton>
                </form>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-10 border border-white/[0.08] text-center">
                <h3 className="heading-sm font-display font-bold text-white mb-4">Let&apos;s Collaborate</h3>
                <p className="text-silver/60 mb-8 max-w-lg mx-auto">We&apos;re always open to new partnership opportunities. Submit your proposal and let&apos;s build something great together.</p>
                <CTAButton onClick={() => setShowForm(true)}>Submit Partnership Enquiry</CTAButton>
              </motion.div>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}
