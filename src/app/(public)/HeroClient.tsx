'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Section, CTAButton } from '@/components/public/Sections';

interface HeroData {
  heading: string;
  subheading: string;
  tagline: string;
  description: string;
  buttonText1: string;
  buttonLink1: string;
  buttonText2: string;
  buttonLink2: string;
  bgImage: string;
  deviceImage: string;
}

export default function HeroClient() {
  const [data, setData] = useState<HeroData | null>(null);

  useEffect(() => {
    fetch('/api/content/hero')
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ice via-white to-white" />
      <div
        className="absolute inset-0 opacity-[0.15] bg-cover bg-center"
        style={{ backgroundImage: data?.bgImage ? `url(${data.bgImage})` : undefined }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/80" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-aqua/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-blue-500 font-medium text-sm tracking-widest uppercase mb-4">
            {data?.tagline || 'Nature\'s Finest, Scientifically Preserved'}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-navy mb-6 leading-tight text-balance"
        >
          {data?.heading || 'Pure Water, Himalayan Soul'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-navy/60 max-w-2xl mx-auto mb-4"
        >
          {data?.subheading || 'By the Himalaya, from the Himalayas'}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base text-navy/50 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {data?.description || 'Experience the purity of Himalayan water with our revolutionary water device. Scientifically designed, naturally inspired.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <CTAButton href={data?.buttonLink1 || '/device/science'}>
            {data?.buttonText1 || 'Explore the Device'}
          </CTAButton>
          <CTAButton href={data?.buttonLink2 || '/buy'} variant="secondary">
            {data?.buttonText2 || 'Buy Now'}
          </CTAButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link href="#content" className="flex flex-col items-center gap-2 text-navy/40 hover:text-navy/60 transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
