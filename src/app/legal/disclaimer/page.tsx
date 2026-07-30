'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerPage() {
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
              Disclaimer
            </h1>
            <p className="text-navy/60 max-w-2xl mx-auto">
              Last updated: July 2025. Please read this disclaimer carefully before using our website.
            </p>
          </motion.div>

          <div className="card p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-navy text-xl mb-3">General Disclaimer</h2>
                <p className="text-navy/70 leading-relaxed">
                  The information on this website is provided on an &ldquo;as is&rdquo; basis. To the fullest extent permitted by law, Himalya Sparsh excludes all representations, warranties, and conditions relating to our website and the use of this information. We do not warrant that the website will be constantly available or available at all.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { title: 'Medical Disclaimer', text: 'The products sold by Himalya Sparsh are designed to enhance the quality of water for consumption. They are not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. If you have any medical conditions or concerns about your water quality, please consult a qualified healthcare professional or water quality expert.' },
              { title: 'Product Information', text: 'While we strive to provide accurate product information, specifications, and images, we cannot guarantee that all information displayed on our website is completely accurate, reliable, or current. Product availability and pricing are subject to change without notice.' },
              { title: 'External Links', text: 'Our website may contain links to third-party websites or services that are not owned or controlled by Himalya Sparsh. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.' },
              { title: 'Limitation of Use', text: 'By using this website, you agree to indemnify and hold harmless Himalya Sparsh, its directors, employees, and agents from any and all claims, damages, losses, liabilities, costs, and expenses arising from your use of the website or violation of these terms.' },
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
                <p className="text-navy/70 leading-relaxed">{section.text}</p>
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
