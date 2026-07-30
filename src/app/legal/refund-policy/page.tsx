'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';

export default function RefundPolicyPage() {
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
              Refund & Returns
            </h1>
            <p className="text-navy/60 max-w-2xl mx-auto">
              Last updated: July 2025. Our return and refund policy ensures a hassle-free experience for our customers.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              { icon: CheckCircle, title: 'Return Window', text: 'You can return any product within 7 days of delivery if you receive a damaged, defective, or incorrect item. Products must be returned in their original packaging and unused condition. To initiate a return, contact our support team at info@himalyaspersh.com.' },
              { icon: RotateCcw, title: 'Refund Process', text: 'Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within 5-7 business days to your original payment method. The timing of when the refund appears in your account depends on your bank or payment provider.' },
              { icon: XCircle, title: 'Non-Returnable Items', text: 'The following items cannot be returned: products that have been used, opened, or tampered with; products damaged due to misuse or improper handling; products without original packaging or proof of purchase. Hygiene products that have been opened are also non-returnable.' },
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
            <Link href="/contact" className="btn-primary">Contact Support</Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
