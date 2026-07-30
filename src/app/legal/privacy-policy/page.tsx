'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const sections = [
  {
    icon: FileText,
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us when you fill out forms on our website, make a purchase, or contact us. This may include your name, email address, phone number, shipping address, and payment information. We also collect information about your interactions with our website, including pages visited and time spent on each page.',
  },
  {
    icon: Shield,
    title: 'How We Use Your Information',
    content: 'We use the information we collect to process your orders, respond to your inquiries, send you updates about your orders, and improve our products and services. We may also use your information to send you promotional communications, but you can opt out at any time. We do not sell or rent your personal information to third parties.',
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes SSL encryption for data transmission, secure server infrastructure, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    icon: Eye,
    title: 'Your Rights',
    content: 'You have the right to access, correct, or delete your personal information at any time. You can also request that we stop processing your data or object to direct marketing. To exercise any of these rights, please contact us at info@himalyaspersh.com. We will respond to your request within 30 days.',
  },
];

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-navy/60 max-w-2xl mx-auto">
              Last updated: July 2025. This policy describes how Himalya Sparsh collects, uses, and protects your personal information.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, i) => (
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
                    <h2 className="font-heading font-bold text-navy text-xl mb-3">{section.title}</h2>
                    <p className="text-navy/70 leading-relaxed">{section.content}</p>
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
            <div className="card-elevated p-8">
              <h3 className="font-heading font-bold text-navy text-xl mb-4">Questions About Privacy?</h3>
              <p className="text-navy/60 mb-6">
                If you have any questions about this privacy policy, please reach out to us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary">Contact Us</Link>
                <Link href="/" className="btn-secondary">Back to Home</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
