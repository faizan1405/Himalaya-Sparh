'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Truck, CheckCircle, Clock } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <main className="pt-24">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ice to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
              Legal
            </span>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-navy mb-4">
              Shipping Policy
            </h1>
            <p className="text-navy/60 max-w-2xl mx-auto">
              Last updated: July 2025. Learn about our shipping options, delivery timelines, and coverage areas.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              { icon: Truck, title: 'Delivery Areas', text: 'We ship across India. Founder Delivery is available for customers in other states with personalized service. Standard delivery is available for most locations within 7-10 business days. Remote locations may take additional time.' },
              { icon: Clock, title: 'Processing Time', text: 'Orders are typically processed within 1-2 business days. During peak periods, processing may take up to 3 business days. You will receive a confirmation email with tracking information once your order ships.' },
              { icon: CheckCircle, title: 'Shipping Charges', text: 'Shipping charges are calculated at checkout based on your location and order value. Free shipping is available on orders above a certain threshold. Founder Delivery charges are calculated individually based on the destination.' },
            ].map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-aurora" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-navy text-xl mb-2">{section.title}</h2>
                    <p className="text-navy/70 leading-relaxed">{section.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <Link href="/contact" className="btn-primary">Contact for Shipping Queries</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
