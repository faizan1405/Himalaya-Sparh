'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section, Card } from '@/components/public/Sections';
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

  const inputCls = "w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/40 text-white placeholder:text-silver/30 transition-colors";
  const labelCls = "block text-sm font-medium text-silver mb-2";

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] text-aurora text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            Contact Us
          </span>
          <h1 className="heading-xl font-display font-bold text-white mb-6 leading-tight tracking-tight text-balance">
            Get In Touch
          </h1>
          <p className="text-body-md text-silver/70 max-w-2xl mx-auto leading-relaxed">
            We&apos;d love to hear from you. Reach out and let&apos;s start a conversation about Himalayan purity.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <Section dark className="!pt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-10 lg:p-12 border border-white/[0.08] text-center"
                >
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-green-400" />
                  </div>
                  <h3 className="heading-sm font-display font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-silver/60">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/[0.08]"
                >
                  <h2 className="heading-sm font-display font-bold text-white mb-8">Send Us a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className={inputCls}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          className={inputCls}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className={inputCls}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelCls}>Subject</label>
                        <input
                          type="text"
                          name="subject"
                          className={inputCls}
                          placeholder="Subject"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Enquiry Type *</label>
                        <select
                          name="enquiryType"
                          required
                          className={`${inputCls} appearance-none`}
                        >
                          <option value="" className="bg-navy">Select type</option>
                          {enquiryTypes.map((t) => (
                            <option key={t} value={t} className="bg-navy">{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className={`${inputCls} resize-none`}
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 accent-aurora rounded border-white/10" />
                        <span className="text-sm text-silver/60">
                          I agree to be contacted regarding my enquiry. I accept the privacy policy.
                        </span>
                      </label>
                    </div>

                    {submitError && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-aurora to-aqua text-white font-semibold rounded-full hover:shadow-lg hover:shadow-aurora/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </motion.div>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card glow>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-aurora" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white mb-1">Email</h3>
                      <p className="text-silver/60 text-sm">info@himalyaspersh.com</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card glow>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-aurora" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white mb-1">Phone</h3>
                      <p className="text-silver/60 text-sm">+91 98765 43210</p>
                      <p className="text-silver/40 text-xs mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Mon - Sat: 10 AM - 6 PM
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card glow>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white mb-1">WhatsApp</h3>
                      <a href="https://wa.me/919876543210" target="_blank" rel="noopener" className="text-aurora text-sm hover:text-aqua transition-colors">
                        Chat with us
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-aurora/10 via-aqua/5 to-transparent rounded-2xl p-6 border border-white/[0.08] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-aurora/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/[0.06] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-aqua" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white mb-1">Office Address</h3>
                      <p className="text-silver/60 text-sm leading-relaxed">
                        Himalya Sparsh<br />
                        India<br />
                        <span className="text-silver/40">(Address to be updated)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
