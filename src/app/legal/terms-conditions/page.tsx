'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';

export default function TermsConditionsPage() {
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
              Terms & Conditions
            </h1>
            <p className="text-navy/60 max-w-2xl mx-auto">
              Last updated: July 2025. Please read these terms carefully before using our website or services.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                title: 'Acceptance of Terms',
                content: 'By accessing or using the Himalya Sparsh website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use of the service constitutes acceptance of the updated terms.',
              },
              {
                title: 'Products & Services',
                content: 'All products listed on our website are subject to availability. We reserve the right to discontinue any product at any time. Product images are for illustrative purposes and may differ slightly from the actual product. We strive for accuracy in our product descriptions but do not warrant that all product descriptions, pricing, or other content is accurate, complete, or error-free.',
              },
              {
                title: 'Orders & Payment',
                content: 'All orders are subject to acceptance and availability. We reserve the right to refuse any order. Payment must be received in full before products are shipped. We accept various payment methods as displayed at checkout. Prices are subject to change without notice. All prices are in Indian Rupees (INR).',
              },
              {
                title: 'Intellectual Property',
                content: 'All content on this website, including text, graphics, logos, images, and software, is the property of Himalya Sparsh and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
              },
              {
                title: 'Limitation of Liability',
                content: 'Himalya Sparsh shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or services. Our total liability to you for any claim shall not exceed the amount paid by you for the product or service giving rise to the claim.',
              },
            ].map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-8"
              >
                <h2 className="font-heading font-bold text-navy text-xl mb-3">{section.title}</h2>
                <p className="text-navy/70 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <Link href="/" className="btn-secondary">Back to Home</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
