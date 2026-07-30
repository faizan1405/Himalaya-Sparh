'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Recycle, FlaskConical, Globe, HeartPulse, DollarSign, Check, Droplets } from 'lucide-react';
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

function WhyWeNeedSection() {
  return (
    <Section id="why-we-need" className="bg-gradient-to-b from-white to-ice/40 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          label="The Problem We Solve"
          title="Why We Need This"
          subtitle="Modern lifestyles bring water challenges that our device solves naturally and effectively."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="overflow-hidden h-full">
                <div className="grid grid-cols-2 divide-y divide-silver/10">
                  {/* Problem */}
                  <div className="p-5 relative">
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
                  <div className="p-5 bg-aurora/[0.02]">
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

        <div className="mt-12 text-center">
          <CTAButton href="/buy" variant="secondary" arrow>
            Get Your Device
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}

export default function AboutIntroductionPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 lg:py-36 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-glow text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            About Us
          </span>
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Our Story
          </h1>
          <p className="text-xl text-silver/70 font-light">
            Born from the Himalayas, powered by science
          </p>
        </div>
      </section>

      {/* Core values */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-navy to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Vision',
                text: 'To make pure Himalayan water accessible to every household in India and beyond.',
                icon: '👁️',
              },
              {
                title: 'Mission',
                text: 'To innovate and deliver scientifically advanced water solutions that preserve nature\'s purity while ensuring health and wellness for all.',
                icon: '🚀',
              },
              {
                title: 'Purpose',
                text: 'Empowering lives through clean, natural, and scientifically enhanced water solutions.',
                icon: '💙',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-silver/10 hover:border-aurora/20 hover:shadow-xl hover:shadow-aurora/5 hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-aurora/0 to-aqua/0 group-hover:from-aurora/5 group-hover:to-aqua/5 rounded-2xl transition-all duration-500" />
                  <div className="relative">
                    <span className="text-4xl mb-6 block">{item.icon}</span>
                    <h2 className="text-2xl font-heading font-bold text-navy mb-4">{item.title}</h2>
                    <p className="text-navy/70 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Need This */}
      <WhyWeNeedSection />

      {/* Full-width statement */}
      <section className="py-20 bg-ice/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-aurora/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-aqua/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-heading text-navy/80 leading-relaxed italic"
          >
            &ldquo;By the Himalaya, from the Himalayas. Every drop of water tells the story of pristine peaks, ancient rivers, and our commitment to delivering that purity to your doorstep.&rdquo;
          </motion.blockquote>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 w-16 h-0.5 bg-gradient-to-r from-aurora to-aqua mx-auto rounded-full"
          />
        </div>
      </section>
    </main>
  );
}
