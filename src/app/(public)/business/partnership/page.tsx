'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, Card, CTAButton } from '@/components/public/Sections';
import { Briefcase, Building2, Store, Landmark, Hotel, FlaskConical, Cpu, CheckCircle } from 'lucide-react';
import { ParallaxHero } from '@/components/public/ParallaxHero';
import { BackgroundSection } from '@/components/public/BackgroundSection';

const inputCls =
  'w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/40 text-white placeholder:text-silver/30 transition-colors';
const labelCls = 'block text-sm font-medium text-silver mb-2';

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
      <ParallaxHero
        imageSrc="/images/bgs/business-partnership.png"
        imageAlt="High-rise Executive Boardroom Skyline"
        badge={
          <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/[0.12] text-aurora text-sm font-medium rounded-full backdrop-blur-md">
            Business Opportunities
          </span>
        }
        title="Partner with Himalya Sparsh"
        subtitle="Expand Your Vision • Accelerate Growth • Deliver Pure Purity"
        description="Collaborate with a pioneer in natural Himalayan water technology. We welcome strategic, corporate, institutional, and retail partners nationwide."
      />

      {/* Types grid */}
      <BackgroundSection
        id="types"
        imageSrc="/images/bgs/water-caustics.png"
        imageAlt="Partnership Network Purity"
        overlay="gradient"
        opacity={0.25}
        blur="sm"
        className="section-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Collaboration Models"
            title="Partnership Opportunities"
            subtitle="Tailored alliance models designed to create lasting value for your business."
            lightTitle
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {partnershipTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <Card glow className="glass-medium h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-aurora/15 to-aqua/15 rounded-xl flex items-center justify-center mb-6 group-hover:from-aurora/30 group-hover:to-aqua/30 transition-all duration-500">
                    <type.icon className="w-7 h-7 text-aurora" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{type.title}</h3>
                  <p className="text-silver/70 text-sm leading-relaxed">{type.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <CTAButton onClick={() => setShowForm(!showForm)} variant="primary">
              {showForm ? 'Close Application Form' : 'Apply for Partnership'}
            </CTAButton>
          </div>
        </div>
      </BackgroundSection>

      {/* Form Drawer */}
      {showForm && (
        <BackgroundSection
          imageSrc="/images/bgs/business-partnership.png"
          imageAlt="Executive Partnership Agreement Desk"
          overlay="deep"
          opacity={0.35}
          blur="md"
          className="section-lg"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-strong rounded-3xl p-8 lg:p-12 border border-white/[0.12] shadow-2xl">
              <SectionHeading
                label="Application"
                title="Partnership Inquiry Form"
                subtitle="Fill out the details below and our corporate partnership manager will reach out within 24 hours."
                lightTitle
              />

              {submitError && <p className="text-red-400 text-sm mb-6 text-center">{submitError}</p>}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <input name="fullName" required placeholder="John Doe" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Company Name</label>
                    <input name="companyName" required placeholder="Acme Corp" className={inputCls} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Designation</label>
                    <input name="designation" required placeholder="Director / Manager" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Partnership Type</label>
                    <select name="partnershipType" required className={inputCls}>
                      <option value="Strategic Partnership" className="bg-navy">Strategic Partnership</option>
                      <option value="Retail Partnership" className="bg-navy">Retail Partnership</option>
                      <option value="Institutional Partnership" className="bg-navy">Institutional Partnership</option>
                      <option value="Corporate Partnership" className="bg-navy">Corporate Partnership</option>
                      <option value="Hospitality Partnership" className="bg-navy">Hospitality Partnership</option>
                      <option value="Wellness Partnership" className="bg-navy">Wellness Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Email</label>
                    <input name="email" type="email" required placeholder="john@company.com" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input name="phone" required placeholder="+91 98765 43210" className={inputCls} />
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

                <div>
                  <label className={labelCls}>Proposal / Message</label>
                  <textarea name="message" rows={4} required placeholder="Tell us about your business vision and proposed partnership..." className={inputCls} />
                </div>

                <div className="text-center pt-4">
                  <CTAButton type="submit" disabled={loading} variant="primary">
                    {loading ? 'Submitting Application...' : 'Submit Partnership Application'}
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
            <CheckCircle className="w-6 h-6" />
            Thank you! Your partnership inquiry has been received. Our team will contact you shortly.
          </div>
        </section>
      )}
    </main>
  );
}
