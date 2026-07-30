'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Recycle, FlaskConical, Globe, HeartPulse, DollarSign, Check, Droplets } from 'lucide-react';
import { Section, SectionHeading, Card, CTAButton } from '@/components/public/Sections';

const problems = [
  {
    icon: AlertTriangle,
    label: 'Amber',
    problem: 'Water Quality Concerns',
    problemDesc: 'Increasing pollution and contamination in water sources raises serious health concerns for millions.',
    solution: 'Himalya Sparsh device ensures Himalayan-grade purity through scientifically proven natural methods.',
  },
  {
    icon: Recycle,
    label: 'Green',
    problem: 'Excessive Plastic Dependency',
    problemDesc: 'Billions of plastic water bottles end up in landfills and oceans each year, causing irreversible damage.',
    solution: 'Our reusable device eliminates single-use plastic bottles from your daily routine forever.',
  },
  {
    icon: FlaskConical,
    label: 'Purple',
    problem: 'Loss of Natural Minerals',
    problemDesc: 'Most purification methods strip away essential minerals needed for good health and wellness.',
    solution: 'Our device preserves beneficial minerals while removing harmful contaminants naturally.',
  },
  {
    icon: Globe,
    label: 'Aurora',
    problem: 'Uncertain Water Sources',
    problemDesc: 'Municipal water quality varies and is rarely consistent across regions and seasons.',
    solution: 'Get consistent, reliable purity regardless of your water source — tap, RO, or borewell.',
  },
  {
    icon: HeartPulse,
    label: 'Red',
    problem: 'Health-Related Concerns',
    problemDesc: 'Water-borne diseases and chemical contaminants pose serious, long-term health risks.',
    solution: 'Advanced natural filtration and mineral infusion promote better health and wellness daily.',
  },
  {
    icon: DollarSign,
    label: 'Emerald',
    problem: 'Cost of Bottled Water',
    problemDesc: 'Purchasing bottled water daily is expensive and environmentally wasteful over time.',
    solution: 'One-time investment for unlimited pure water — save money while saving the planet.',
  },
];

const labelColors: Record<string, { bg: string; text: string; border: string }> = {
  Amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  Green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  Purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  Aurora: { bg: 'bg-aurora/10', text: 'text-aurora', border: 'border-aurora/20' },
  Red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  Emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
};

function WhyWeNeedSection() {
  return (
    <Section id="why-we-need" dark>
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="The Problem We Solve"
          title="Why We Need This"
          subtitle="Modern lifestyles bring water challenges that our device solves naturally and effectively."
          lightTitle
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((item, i) => {
            const colors = labelColors[item.label] || labelColors.Aurora;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card glow className="overflow-hidden h-full">
                  <div className="divide-y divide-white/[0.06]">
                    {/* Problem */}
                    <div className="p-5">
                      <div className="w-10 h-10 bg-white/[0.04] rounded-xl flex items-center justify-center mb-4">
                        <item.icon className="w-5 h-5 text-silver/70" />
                      </div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${colors.bg} ${colors.text} mb-3 border ${colors.border}`}>
                        Problem
                      </span>
                      <h3 className="font-display font-bold text-white text-lg mb-2">{item.problem}</h3>
                      <p className="text-silver/60 text-sm leading-relaxed">{item.problemDesc}</p>
                    </div>
                    {/* Solution */}
                    <div className="p-5 bg-aurora/[0.02]">
                      <div className="w-10 h-10 bg-aurora/10 rounded-xl flex items-center justify-center mb-4">
                        <Check className="w-5 h-5 text-aurora" />
                      </div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-aurora/10 text-aurora mb-3 border border-aurora/20">
                        Solution
                      </span>
                      <h3 className="font-display font-bold text-aurora text-lg mb-2">Our Solution</h3>
                      <p className="text-silver/60 text-sm leading-relaxed">{item.solution}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
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
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] text-aurora text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            About Us
          </span>
          <h1 className="heading-xl font-display font-bold text-white mb-6 leading-tight tracking-tight text-balance">
            Our Story
          </h1>
          <p className="text-body-lg text-silver/70 font-light">
            Born from the Himalayas, powered by science
          </p>
        </div>
      </section>

      {/* Core values */}
      <Section dark>
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Our Foundation"
            title="Core Values"
            subtitle="The principles that guide every decision we make and every drop we purify."
            lightTitle
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'Vision',
                text: 'To make pure Himalayan water accessible to every household in India and beyond.',
                icon: '👁',
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
              >
                <Card glow className="h-full text-center">
                  <div className="text-5xl mb-6 leading-none">{item.icon}</div>
                  <h2 className="heading-md font-display font-bold text-white mb-4">{item.title}</h2>
                  <p className="text-silver/60 leading-relaxed">{item.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why We Need This */}
      <WhyWeNeedSection />

      {/* Full-width statement */}
      <Section dark>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-md font-display text-silver/70 leading-relaxed"
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
      </Section>
    </main>
  );
}
