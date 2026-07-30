'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, CTAButton } from '@/components/public/Sections';
import { Phone, Mail, MessageCircle, MapPin, Send, Clock } from 'lucide-react';

const enquiryTypes = [
  'Product Enquiry', 'Purchase Support', 'Founder Delivery',
  'Distributor Opportunity', 'Business Partnership', 'Media Enquiry', 'General Enquiry',
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

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-glow text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            Contact Us
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Get In Touch
          </h1>
          <p className="text-lg text-silver/70 max-w-2xl mx-auto leading-relaxed">
            We&apos;d love to hear from you. Reach out and let&apos;s start a conversation about Himalayan purity.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-navy to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-silver/10 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl mb-2">Message Sent!</h3>
                  <p className="text-navy/60">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-sm border border-silver/10"
                >
                  <h2 className="font-heading font-bold text-navy text-2xl mb-8">Send Us a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy placeholder:text-navy/30"
                          placeholder="Subject"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">Enquiry Type *</label>
                        <select
                          name="enquiryType"
                          required
                          className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy"
                        >
                          <option value="">Select type</option>
                          {enquiryTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 resize-none text-navy placeholder:text-navy/30"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <div>
                      <label className="flex items-start gap-3">
                        <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 text-aurora rounded border-silver/30" />
                        <span className="text-sm text-navy/60">
                          I agree to be contacted regarding my enquiry. I accept the privacy policy.
                        </span>
                      </label>
                    </div>

                    {submitError && (
                      <div className="p-4 bg-red-50/80 border border-red-200 rounded-xl text-red-500 text-sm">
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-aurora to-aqua text-white font-semibold rounded-full hover:shadow-lg hover:shadow-aurora/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </motion.div>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-silver/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-aurora" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy mb-1">Email</h3>
                    <p className="text-navy/60 text-sm">info@himalyaspersh.com</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-silver/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-aurora" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy mb-1">Phone</h3>
                    <p className="text-navy/60 text-sm">+91 98765 43210</p>
                    <p className="text-navy/40 text-xs mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Mon - Sat: 10 AM - 6 PM
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-silver/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy mb-1">WhatsApp</h3>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener" className="text-aurora text-sm hover:text-aqua transition-colors">
                      Chat with us
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-navy to-midnight rounded-2xl p-6 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-aurora/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-aqua" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">Office Address</h3>
                      <p className="text-silver text-sm leading-relaxed">
                        Himalya Sparsh<br />
                        India<br />
                        <span className="text-silver/50">(Address to be updated)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
