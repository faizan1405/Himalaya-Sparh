'use client';

import { motion } from 'framer-motion';
import { WhyWeNeedSection } from '@/components/public/WhyWeNeedSection';
import { Section, SectionHeading, CTAButton } from '@/components/public/Sections';

const problems = [
  {
    icon: '⚠️',
    problem: 'Water Quality Concerns',
    problemDesc: 'Increasing pollution and contamination in water sources raises serious health concerns.',
    solution: 'Himalya Sparsh device ensures Himalayan-grade purity through scientifically proven methods.',
  },
  {
    icon: '♻️',
    problem: 'Excessive Plastic Dependency',
    problemDesc: 'Billions of plastic water bottles end up in landfills and oceans each year.',
    solution: 'Our reusable device eliminates single-use plastic bottles from your daily routine.',
  },
  {
    icon: '⚗️',
    problem: 'Loss of Natural Minerals',
    problemDesc: 'Most purification methods strip away essential minerals needed for good health.',
    solution: 'Our device preserves beneficial minerals while removing harmful contaminants.',
  },
  {
    icon: '🌐',
    problem: 'Uncertain Water Sources',
    problemDesc: 'Municipal water quality varies and is rarely consistent across regions.',
    solution: 'Get consistent, reliable purity regardless of your water source.',
  },
  {
    icon: '🏥',
    problem: 'Health-Related Concerns',
    problemDesc: 'Water-borne diseases and chemical contaminants pose serious health risks.',
    solution: 'Advanced filtration and mineral infusion promote better health and wellness.',
  },
  {
    icon: '💰',
    problem: 'Cost of Bottled Water',
    problemDesc: 'Purchasing bottled water daily is expensive and environmentally wasteful.',
    solution: 'One-time investment for unlimited pure water — save money while saving the planet.',
  },
];

export default function WhyWeNeedPage() {
  return (
    <main className="pt-24">
      <section className="relative py-20 bg-gradient-to-b from-ice to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
            The Problem
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-navy mb-6">
            Why We Need This
          </h1>
          <p className="text-lg text-navy/60 max-w-2xl mx-auto">
            Modern lifestyles bring water challenges that our device solves naturally and effectively.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-ice/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-silver/30">
                  <div className="p-6 bg-red-50/30">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-heading font-bold text-navy text-lg mb-2">{item.problem}</h3>
                    <p className="text-navy/60 text-sm leading-relaxed">{item.problemDesc}</p>
                  </div>
                  <div className="p-6 bg-green-50/30">
                    <h3 className="font-heading font-bold text-green-700 text-lg mb-2">Our Solution</h3>
                    <p className="text-navy/60 text-sm leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading title="Experience the Difference" subtitle="Switch to Himalayan purity today" />
          <CTAButton href="/buy">Buy Now</CTAButton>
        </div>
      </section>
    </main>
  );
}
