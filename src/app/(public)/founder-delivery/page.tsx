'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, Card } from '@/components/public/Sections';
import { Phone, Mail, MessageCircle, MapPin, CheckCircle, Truck, Clock, Shield } from 'lucide-react';
import FounderDeliveryForm from '@/components/public/FounderDeliveryForm';
import { ParallaxHero } from '@/components/public/ParallaxHero';
import { BackgroundSection } from '@/components/public/BackgroundSection';

const features = [
  { icon: Truck, title: 'Personal Oversight', desc: 'The founder personally oversees every interstate delivery and installation.' },
  { icon: Shield, title: 'Safe VIP Packaging', desc: 'Custom handcrafted oak and velvet packaging ensures your device arrives in flawless condition.' },
  { icon: Clock, title: 'Scheduled Delivery', desc: 'Choose a priority delivery date and time that fits your luxury lifestyle.' },
  { icon: CheckCircle, title: 'Full Founder Guarantee', desc: 'Direct access to founder support and white-glove onboarding.' },
];

const steps = [
  { num: '01', title: 'Request Delivery', desc: 'Fill out the VIP form with your location details and preferred delivery date.' },
  { num: '02', title: 'Personal Confirmation', desc: 'Our founder & concierge team will confirm schedule and travel arrangements.' },
  { num: '03', title: 'White-Glove Handover', desc: 'Receive your device with personal setup, live demo, and founder guarantee.' },
];

export default function FounderDeliveryPage() {
  const [settings, setSettings] = useState<any>(null);

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
      .catch(() => {});
  }, []);

  return (
    <main>
      {/* Hero */}
      <ParallaxHero
        imageSrc="/images/bgs/founder-delivery.png"
        imageAlt="VIP Luxury Delivery Handcrafted Presentation"
        badge={
          <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/[0.12] text-aurora text-sm font-medium rounded-full backdrop-blur-md">
            Special Delivery
          </span>
        }
        title="Founder Delivery Service"
        subtitle="Exclusive White-Glove Handover & Personal Installation"
        description="A specialized VIP service for customers across India. Experience the founder's personal oversight, custom unboxing, and dedicated onboarding."
      />

      {/* How it works */}
      <BackgroundSection
        imageSrc="/images/bgs/water-caustics.png"
        imageAlt="Founder Delivery Purity"
        overlay="deep"
        opacity={0.25}
        blur="sm"
        className="section-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="White-Glove Process"
            title="How Founder Delivery Works"
            subtitle="Three seamless steps to receiving your device directly from our founder."
            lightTitle
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Card glow className="glass-medium h-full text-center">
                  <span className="text-4xl font-bold font-display text-aurora mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-white text-xl mb-3">{step.title}</h3>
                  <p className="text-silver/70 text-sm leading-relaxed">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card glow className="glass-medium h-full">
                  <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center mb-4">
                    <feat.icon className="w-6 h-6 text-aurora" />
                  </div>
                  <h4 className="font-display font-semibold text-white text-base mb-2">{feat.title}</h4>
                  <p className="text-silver/70 text-xs leading-relaxed">{feat.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </BackgroundSection>

      {/* Form & Contact */}
      <BackgroundSection
        imageSrc="/images/bgs/founder-delivery.png"
        imageAlt="VIP Presentation Desk"
        overlay="gradient"
        opacity={0.3}
        blur="md"
        className="section-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <SectionHeading
                label="Request Form"
                title="Book Founder Delivery"
                subtitle="Fill out the form below to request personal delivery by our founder to your location."
                centered={false}
                lightTitle
              />
              <FounderDeliveryForm />
            </div>

            <div className="space-y-6">
              <SectionHeading
                label="Direct Assistance"
                title="Need Immediate Help?"
                subtitle="Contact our founder concierge team directly for urgent requests."
                centered={false}
                lightTitle
              />

              <div className="glass-medium rounded-2xl p-8 border border-white/[0.08] space-y-6">
                {settings?.contactPhone && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-aurora" />
                    </div>
                    <div>
                      <p className="text-silver/50 text-xs uppercase tracking-wider">Phone</p>
                      <a href={`tel:${settings.contactPhone}`} className="text-white font-medium hover:text-aurora transition-colors">
                        {settings.contactPhone}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.contactEmail && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-aurora" />
                    </div>
                    <div>
                      <p className="text-silver/50 text-xs uppercase tracking-wider">Email</p>
                      <a href={`mailto:${settings.contactEmail}`} className="text-white font-medium hover:text-aurora transition-colors">
                        {settings.contactEmail}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.whatsappNumber && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-silver/50 text-xs uppercase tracking-wider">WhatsApp Concierge</p>
                      <a
                        href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-medium hover:text-green-400 transition-colors"
                      >
                        {settings.whatsappNumber}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.address && (
                  <div className="flex items-center gap-4 pt-2 border-t border-white/[0.06]">
                    <div className="w-12 h-12 bg-aurora/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-aurora" />
                    </div>
                    <div>
                      <p className="text-silver/50 text-xs uppercase tracking-wider">Headquarters</p>
                      <p className="text-silver/80 text-sm leading-relaxed">{settings.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </BackgroundSection>
    </main>
  );
}
