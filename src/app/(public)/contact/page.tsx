'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/public/Sections';
import { Phone, Mail, MessageCircle, MapPin, Send, Clock } from 'lucide-react';
import { ParallaxHero } from '@/components/public/ParallaxHero';
import { BackgroundSection } from '@/components/public/BackgroundSection';

const enquiryTypes = [
  'Product Enquiry',
  'Purchase Support',
  'Founder Delivery',
  'Distributor Opportunity',
  'Business Partnership',
  'Media Enquiry',
  'General Enquiry',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          enquiryType: formData.get('enquiryType'),
          message: formData.get('message'),
          consent: formData.get('consent') === 'on',
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
      setLoading(false);
    }
  };

  const inputCls =
    'w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/40 text-white placeholder:text-silver/30 transition-colors';
  const labelCls = 'block text-sm font-medium text-silver mb-2';

  return (
    <main>
      {/* Hero */}
      <ParallaxHero
        imageSrc="/images/bgs/contact.png"
        imageAlt="Welcoming Luxury Hospitality Lounge Workspace"
        badge={
          <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/[0.12] text-aurora text-sm font-medium rounded-full backdrop-blur-md">
            Get in Touch
          </span>
        }
        title="We'd Love to Hear From You"
        subtitle="Dedicated Concierge & Customer Care Team"
        description="Have a question about our Himalayan water devices, founder delivery, or business partnership? Send us a message and our team will get back to you promptly."
      />

      {/* Main Contact Section */}
      <BackgroundSection
        imageSrc="/images/bgs/water-caustics.png"
        imageAlt="Contact Water Caustics Matrix"
        overlay="gradient"
        opacity={0.25}
        blur="sm"
        className="section-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <Card glow className="glass-medium">
                <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-aurora" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-1">Phone &amp; WhatsApp</h3>
                <p className="text-silver/60 text-sm mb-3">Available Mon-Sat, 9am - 7pm IST</p>
                <a
                  href="tel:+919876543210"
                  className="text-aurora hover:text-aqua transition-colors font-medium text-sm block mb-1"
                >
                  +91 98765 43210
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-green-400 text-xs font-semibold hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
                </a>
              </Card>

              <Card glow className="glass-medium">
                <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-aurora" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-1">Email Us</h3>
                <p className="text-silver/60 text-sm mb-3">We reply within 24 hours</p>
                <a
                  href="mailto:contact@himalyaspersh.com"
                  className="text-aurora hover:text-aqua transition-colors font-medium text-sm block"
                >
                  contact@himalyaspersh.com
                </a>
              </Card>

              <Card glow className="glass-medium">
                <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-aurora" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-1">Headquarters</h3>
                <p className="text-silver/70 text-sm leading-relaxed">
                  Himalya Sparsh Innovation Center,
                  <br />
                  Dehradun, Uttarakhand, India
                </p>
              </Card>

              <Card glow className="glass-medium">
                <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-aurora" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-1">Working Hours</h3>
                <p className="text-silver/70 text-sm leading-relaxed">
                  Monday – Saturday: 9:00 AM – 7:00 PM IST
                  <br />
                  Sunday: Closed
                </p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-strong rounded-3xl p-8 lg:p-12 border border-white/[0.12] shadow-2xl">
                <h2 className="heading-md font-display font-bold text-white mb-2">Send Us a Message</h2>
                <p className="text-silver/70 text-sm mb-8">
                  Select your enquiry type and share your details below.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center bg-green-500/10 border border-green-500/20 rounded-2xl"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 font-bold text-2xl">
                      ✓
                    </div>
                    <h3 className="heading-sm font-display font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-silver/70 text-sm mb-6">
                      Thank you for contacting Himalya Sparsh. Our team will review your enquiry and get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-aurora hover:text-aqua text-sm font-semibold transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && <p className="text-red-400 text-sm text-center">{submitError}</p>}

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelCls}>Your Name</label>
                        <input name="name" required placeholder="John Doe" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Phone Number</label>
                        <input name="phone" required placeholder="+91 98765 43210" className={inputCls} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelCls}>Email Address</label>
                        <input name="email" type="email" required placeholder="john@example.com" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Enquiry Type</label>
                        <select name="enquiryType" required className={inputCls}>
                          {enquiryTypes.map((type) => (
                            <option key={type} value={type} className="bg-navy">
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Subject</label>
                      <input name="subject" required placeholder="How can we help you?" className={inputCls} />
                    </div>

                    <div>
                      <label className={labelCls}>Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        placeholder="Please describe your enquiry in detail..."
                        className={inputCls}
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="consent"
                        id="consent"
                        required
                        className="mt-1 rounded bg-white/[0.04] border-white/[0.1] text-aurora focus:ring-aurora/40"
                      />
                      <label htmlFor="consent" className="text-silver/60 text-xs leading-relaxed">
                        I agree to receive communications regarding my inquiry in accordance with the privacy policy.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full sm:w-auto text-center"
                    >
                      <Send className="w-4 h-4" />
                      {loading ? 'Sending Message...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </BackgroundSection>
    </main>
  );
}
