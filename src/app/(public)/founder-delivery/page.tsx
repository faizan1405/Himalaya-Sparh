'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, CTAButton } from '@/components/public/Sections';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import FounderDeliveryForm from '@/components/public/FounderDeliveryForm';

export default function FounderDeliveryPage() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content/settings')
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-ice to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
            Special Delivery
          </span>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-navy mb-6">
            Founder Delivery
          </h1>
          <p className="text-lg text-navy/60 max-w-2xl mx-auto">
            A special delivery service for customers in other states. Experience the founder's personal touch with interstate delivery.
          </p>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-heading font-bold text-navy mb-6">What is Founder Delivery?</h2>
              <div className="space-y-4 text-navy/70 leading-relaxed">
                <p>
                  Founder Delivery is our premium delivery service designed for customers located in other states. The founder personally oversees the delivery process to ensure every customer receives their device with the same care and attention.
                </p>
                <p>
                  This service ensures safe, trackable, and timely delivery regardless of your location in India.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy">Request Delivery</h3>
                    <p className="text-navy/60 text-sm">Fill out the form with your details and preferred delivery date.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy">Confirmation</h3>
                    <p className="text-navy/60 text-sm">Our team will confirm availability and schedule the delivery.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-heading font-semibold text-navy">Delivery</h3>
                    <p className="text-navy/60 text-sm">Receive your device with full tracking and founder's guarantee.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-ice/40 rounded-2xl">
                <h3 className="font-heading font-bold text-navy mb-3">Need Help?</h3>
                <div className="space-y-2">
                  <a href={`tel:${settings?.phone || '+919876543210'}`} className="flex items-center gap-2 text-navy/70 hover:text-blue-500 text-sm">
                    <Phone className="w-4 h-4" /> {settings?.phone || '+91 98765 43210'}
                  </a>
                  <a href={`https://wa.me/${settings?.whatsapp || '919876543210'}`} className="flex items-center gap-2 text-navy/70 hover:text-green-500 text-sm">
                    <MessageCircle className="w-4 h-4" /> WhatsApp us
                  </a>
                </div>
              </div>
            </div>

            <div>
              <FounderDeliveryForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
