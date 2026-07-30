'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, Card, CTAButton } from '@/components/public/Sections';
import { Phone, Mail, MessageCircle, MapPin, CheckCircle, Truck, Clock, Shield } from 'lucide-react';
import FounderDeliveryForm from '@/components/public/FounderDeliveryForm';

const features = [
  { icon: Truck, title: 'Personal Oversight', desc: 'The founder personally oversees every interstate delivery.' },
  { icon: Shield, title: 'Safe Packaging', desc: 'Premium packaging ensures your device arrives in perfect condition.' },
  { icon: Clock, title: 'Scheduled Delivery', desc: 'Choose a delivery date that works best for you.' },
  { icon: CheckCircle, title: 'Full Tracking', desc: 'Real-time tracking so you always know where your order is.' },
];

const steps = [
  { num: '01', title: 'Request Delivery', desc: 'Fill out the form with your details and preferred delivery date.' },
  { num: '02', title: 'Confirmation', desc: 'Our team will confirm availability and schedule the delivery.' },
  { num: '03', title: 'Delivery', desc: 'Receive your device with full tracking and founder\'s personal guarantee.' },
];

export default function FounderDeliveryPage() {
  const [settings, setSettings] = useState<any>(null);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content?type=siteSettings')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const next = Array.isArray(data) ? data[0] : data;
        setSettings(next || null);
      })
      .catch((err) => { setSettingsError(err.message); });
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] text-aurora text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            Special Delivery
          </span>
          <h1 className="heading-xl font-display font-bold text-white mb-6 leading-tight tracking-tight text-balance">
            Founder Delivery
          </h1>
          <p className="text-body-md text-silver/70 max-w-2xl mx-auto leading-relaxed">
            A special premium delivery service for customers in other states. Experience the founder's personal touch with interstate delivery.
          </p>
        </div>
      </section>

      {/* How it works */}
      <Section id="how-it-works" dark>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="How It Works"
            title="Three Simple Steps"
            subtitle="Getting your device delivered anywhere in India has never been easier."
            lightTitle
          />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="relative"
              >
                <Card glow className="h-full text-center relative overflow-hidden">
                  <span className="text-6xl font-display font-bold bg-gradient-to-b from-aurora/10 to-transparent bg-clip-text text-transparent absolute top-4 right-6">
                    {step.num}
                  </span>
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-aurora to-aqua rounded-xl flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-4 shadow-lg shadow-aurora/20">
                      {step.num}
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-2">{step.title}</h3>
                    <p className="text-silver/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Features + Form */}
      <Section dark>
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-aqua/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - info */}
            <div>
              <SectionHeading label="Why Choose Us" title="Premium Delivery Experience" lightTitle centered={false} />

              <div className="space-y-4 mb-10">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 bg-white/[0.03] backdrop-blur-sm rounded-xl p-5 border border-white/[0.08]"
                  >
                    <div className="w-10 h-10 bg-aurora/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-aurora" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-silver/60 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact info */}
              <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/[0.08]">
                <h3 className="font-display font-bold text-white mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a href={`tel:${settings?.phone || '+919876543210'}`} className="flex items-center gap-3 text-silver/70 hover:text-aurora transition-colors text-sm">
                    <Phone className="w-4 h-4" /> {settings?.phone || '+91 98765 43210'}
                  </a>
                  <a href="mailto:info@himalyaspersh.com" className="flex items-center gap-3 text-silver/70 hover:text-aurora transition-colors text-sm">
                    <Mail className="w-4 h-4" /> info@himalyaspersh.com
                  </a>
                  <a href={`https://wa.me/${settings?.whatsapp || '919876543210'}`} className="flex items-center gap-3 text-silver/70 hover:text-green-400 transition-colors text-sm">
                    <MessageCircle className="w-4 h-4" /> WhatsApp us
                  </a>
                </div>
              </div>
            </div>

            {/* Right - form */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <FounderDeliveryForm />
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
