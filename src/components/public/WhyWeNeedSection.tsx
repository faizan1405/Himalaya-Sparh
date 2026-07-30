'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Recycle, FlaskConical, Globe, Check } from 'lucide-react';

const problems = [
  {
    icon: AlertTriangle,
    problem: 'Water quality concerns',
    solution: 'Pure Himalayan-filtered water at home',
    color: 'from-amber-500/10 to-orange-500/10',
    iconColor: 'text-amber-500',
  },
  {
    icon: Recycle,
    problem: 'Excessive plastic dependency',
    solution: 'Sustainable, reusable device design',
    color: 'from-green-500/10 to-emerald-500/10',
    iconColor: 'text-green-500',
  },
  {
    icon: FlaskConical,
    problem: 'Loss of natural minerals',
    solution: 'Preserves essential natural minerals',
    color: 'from-purple-500/10 to-pink-500/10',
    iconColor: 'text-purple-500',
  },
  {
    icon: Globe,
    problem: 'Uncertain water sources',
    solution: 'Consistent purity guaranteed always',
    color: 'from-aurora/10 to-aqua/10',
    iconColor: 'text-aurora',
  },
];

export function WhyWeNeedSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-ice/40 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-aurora/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-aqua/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-4"
          >
            The Problem We Solve
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-display text-3xl lg:text-5xl font-heading font-bold text-navy mb-4"
          >
            Why We Need This
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-navy/60 max-w-2xl mx-auto"
          >
            Modern lifestyles bring water challenges that our device solves naturally and sustainably.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-silver/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-5">
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="font-heading font-semibold text-navy/80 text-sm uppercase tracking-wide mb-2">
                  Problem
                </h3>
                <p className="text-navy/70 text-sm mb-5 leading-relaxed">
                  {item.problem}
                </p>
                <div className="border-t border-silver/20 pt-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <h3 className="font-heading font-semibold text-navy text-sm uppercase tracking-wide">
                      Solution
                    </h3>
                  </div>
                  <p className="text-navy font-medium text-sm leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}