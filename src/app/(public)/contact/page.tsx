'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, CTAButton } from '@/components/public/Sections';
import { Phone, Mail, MessageCircle, Send } from 'lucide-react';

const enquiryTypes = [
  'Product Enquiry', 'Purchase Support', 'Founder Delivery',
  'Distributor Opportunity', 'Business Partnership', 'Media Enquiry', 'General Enquiry',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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

      if (res.ok) {
        setSubmitted(true);
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      alert('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ice to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Get In Touch" subtitle="We'd love to hear from you. Reach out and let's connect." />

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl mb-2">Message Sent!</h3>
                  <p className="text-navy/60">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-silver/20">
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-navy mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Subject"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Enquiry Type *</label>
                      <select
                        name="enquiryType"
                        required
                        className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select type</option>
                        {enquiryTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-navy mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <div className="mb-6">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 text-blue-500 rounded" />
                      <span className="text-sm text-navy/60">
                        I agree to be contacted regarding my enquiry. I accept the privacy policy.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy mb-1">Email</h3>
                    <p className="text-navy/60 text-sm">info@himalyaspersh.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy mb-1">Phone</h3>
                    <p className="text-navy/60 text-sm">+91 98765 43210</p>
                    <p className="text-navy/40 text-xs mt-1">Mon - Sat: 10 AM - 6 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy mb-1">WhatsApp</h3>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener" className="text-green-600 text-sm hover:underline">
                      Chat with us
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-navy rounded-2xl p-6 text-white">
                <h3 className="font-heading font-semibold mb-2">Office Address</h3>
                <p className="text-silver text-sm leading-relaxed">
                  Himalya Sparsh<br />
                  India<br />
                  (Address to be updated)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
