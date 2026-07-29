'use client';

import { motion } from 'framer-motion';

const problems = [
  { icon: '⚠️', problem: 'Water quality concerns', solution: 'Pure Himalayan-filtered water' },
  { icon: '♻️', problem: 'Excessive plastic dependency', solution: 'Sustainable, reusable design' },
  { icon: '⚗️', problem: 'Loss of natural minerals', solution: 'Preserves essential minerals' },
  { icon: '🌐', problem: 'Uncertain water sources', solution: 'Consistent purity guaranteed' },
];

export function WhyWeNeedSection() {
  return (
    <section className="py-16 lg:py-24 bg-ice/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('/images/mountain-pattern.svg')] bg-repeat"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-4">
            The Problem
          </span>
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-navy mb-4">
            Why We Need This
          </h2>
          <p className="text-lg text-navy/60 max-w-2xl mx-auto">
            Modern lifestyles bring water challenges that our device solves naturally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-heading font-semibold text-navy mb-2">Problem</h3>
              <p className="text-navy/60 text-sm mb-4">{item.problem}</p>
              <div className="border-t border-silver/20 pt-4">
                <h3 className="font-heading font-semibold text-green-600 mb-2">Our Solution</h3>
                <p className="text-navy/60 text-sm">{item.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
