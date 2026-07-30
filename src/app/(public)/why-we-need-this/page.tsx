'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Recycle, FlaskConical, Globe, HeartPulse, DollarSign, Check } from 'lucide-react';
import { Section, SectionHeading, Card, CTAButton } from '@/components/public/Sections';

const problems = [
  {
    icon: AlertTriangle,
    iconColor: 'from-amber-500/10 to-orange-500/10',
    iconTextColor: 'text-amber-500',
    labelColor: 'bg-amber-500/10 text-amber-600',
    problem: 'Water Quality Concerns',
    problemDesc: 'Increasing pollution and contamination in water sources raises serious health concerns for millions.',
    solution: 'Himalya Sparsh device ensures Himalayan-grade purity through scientifically proven natural methods.',
  },
  {
    icon: Recycle,
    iconColor: 'from-green-500/10 to-emerald-500/10',
    iconTextColor: 'text-green-500',
    labelColor: 'bg-green-500/10 text-green-600',
    problem: 'Excessive Plastic Dependency',
    problemDesc: 'Billions of plastic water bottles end up in landfills and oceans each year, causing irreversible damage.',
    solution: 'Our reusable device eliminates single-use plastic bottles from your daily routine forever.',
  },
  {
    icon: FlaskConical,
    iconColor: 'from-purple-500/10 to-violet-500/10',
    iconTextColor: 'text-purple-500',
    labelColor: 'bg-purple-500/10 text-purple-600',
    problem: 'Loss of Natural Minerals',
    problemDesc: 'Most purification methods strip away essential minerals needed for good health and wellness.',
    solution: 'Our device preserves beneficial minerals while removing harmful contaminants naturally.',
  },
  {
    icon: Globe,
    iconColor: 'from-aurora/10 to-blue-500/10',
    iconTextColor: 'text-aurora',
    labelColor: 'bg-aurora/10 text-aurora',
    problem: 'Uncertain Water Sources',
    problemDesc: 'Municipal water quality varies and is rarely consistent across regions and seasons.',
    solution: 'Get consistent, reliable purity regardless of your water source — tap, RO, or borewell.',
  },
  {
    icon: HeartPulse,
    iconColor: 'from-red-500/10 to-rose-500/10',
    iconTextColor: 'text-red-500',
    labelColor: 'bg-red-500/10 text-red-600',
    problem: 'Health-Related Concerns',
    problemDesc: 'Water-borne diseases and chemical contaminants pose serious, long-term health risks.',
    solution: 'Advanced natural filtration and mineral infusion promote better health and wellness daily.',
  },
  {
    icon: DollarSign,
    iconColor: 'from-emerald-500/10 to-teal-500/10',
    iconTextColor: 'text-emerald-500',
    labelColor: 'bg-emerald-500/10 text-emerald-600',
    problem: 'Cost of Bottled Water',
    problemDesc: 'Purchasing bottled water daily is expensive and environmentally wasteful over time.',
    solution: 'One-time investment for unlimited pure water — save money while saving the planet.',
  },
];

export default function WhyWeNeedPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-glow text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            The Problem
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Why We Need This
          </h1>
          <p className="text-lg text-silver/70 max-w-2xl mx-auto leading-relaxed">
            Modern lifestyles bring water challenges that our device solves naturally and effectively.
          </p>
        </div>
      </section>

      {/* Problems & Solutions */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-navy to-white relative">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-6">
            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-silver/10">
                    {/* Problem */}
                    <div className="p-6 relative">
                      <div className={`w-10 h-10 bg-gradient-to-br ${item.iconColor} rounded-xl flex items-center justify-center mb-4`}>
                        <item.icon className={`w-5 h-5 ${item.iconTextColor}`} />
                      </div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${item.labelColor} mb-3`}>
                        Problem
                      </span>
                      <h3 className="font-heading font-bold text-navy text-lg mb-2">{item.problem}</h3>
                      <p className="text-navy/60 text-sm leading-relaxed">{item.problemDesc}</p>
                    </div>
                    {/* Solution */}
                    <div className="p-6 bg-aurora/[0.02]">
                      <div className="w-10 h-10 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-xl flex items-center justify-center mb-4">
                        <Check className="w-5 h-5 text-aurora" />
                      </div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-aurora/10 text-aurora mb-3">
                        Solution
                      </span>
                      <h3 className="font-heading font-bold text-aurora text-lg mb-2">Our Solution</h3>
                      <p className="text-navy/60 text-sm leading-relaxed">{item.solution}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-ice/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Experience the Difference"
            subtitle="Switch to Himalayan purity — natural, mineral-rich, and electricity-free."
          />
          <CTAButton href="/buy">Buy Now</CTAButton>
        </div>
      </section>
    </main>
  );
}
