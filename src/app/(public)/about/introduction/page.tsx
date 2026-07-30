'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeading } from '@/components/public/Sections';

function SkeletonBlock() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="w-48 h-8 bg-silver/20 rounded animate-pulse mx-auto mb-4" />
      <div className="w-full h-6 bg-silver/20 rounded animate-pulse mb-3" />
      <div className="w-3/4 h-6 bg-silver/20 rounded animate-pulse mx-auto mb-12" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full h-24 bg-silver/10 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

const values = [
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
];

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
            {values.map((item, i) => (
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