'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, Sparkles } from 'lucide-react';
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function HeroClient() {
  const [data, setData] = useState<HeroData | null>(null);

  useEffect(() => {
    fetch('/api/content/hero')
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-midnight to-navy" />
      <div className="absolute inset-0 opacity-20 bg-[url('/images/mountain-pattern.svg')] bg-repeat bg-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />

      {/* Decorative orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-aurora/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-aqua/8 rounded-full blur-[150px]" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-glow/5 rounded-full blur-[100px]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>
            {/* Tagline badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-aurora" />
              <span className="text-glow/90 text-sm font-medium tracking-wide">
                {data?.tagline || "Nature's Finest, Scientifically Preserved"}
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white mb-6 leading-[0.95] tracking-tight"
            >
              {data?.heading || 'Pure Water,'}
              <br />
              <span className="bg-gradient-to-r from-aurora via-aqua to-glow bg-clip-text text-transparent">
                Himalayan Soul
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-xl sm:text-2xl text-silver mb-4 font-light"
            >
              {data?.subheading || 'By the Himalaya, from the Himalayas'}
            </motion.p>

            {/* Description */}
            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-base sm:text-lg text-silver/60 max-w-lg mb-10 leading-relaxed"
            >
              {data?.description || 'Experience the purity of Himalayan water with our revolutionary water device. Scientifically designed, naturally inspired.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <CTAButton href={data?.buttonLink1 || '/device/science'} variant="primary">
                {data?.buttonText1 || 'Explore the Device'}
              </CTAButton>
              <CTAButton href={data?.buttonLink2 || '/buy'} variant="secondary">
                Buy Now
              </CTAButton>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-12 flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-navy bg-gradient-to-br from-aurora/30 to-aqua/30 flex items-center justify-center text-white text-xs font-semibold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-medium text-sm">10,000+ Happy Families</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-silver/70 text-xs ml-1">4.9/5</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Device showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Glow ring */}
            <div className="absolute w-[400px] h-[400px] rounded-full border border-aurora/20 animate-pulse" />
            <div className="absolute w-[320px] h-[320px] rounded-full border border-aqua/15" />

            {/* Device image container */}
            <div className="relative w-[350px] h-[450px]">
              {/* Frosted glass card behind */}
              <div className="absolute inset-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl shadow-aurora/5" />

              {/* Device image */}
              {data?.deviceImage ? (
                <img
                  src={data.deviceImage}
                  alt="Himalya Sparsh Water Device"
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl drop-shadow-aurora/20"
                />
              ) : (
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="w-48 h-64 rounded-2xl bg-gradient-to-b from-aurora/20 to-aqua/10 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-aurora to-aqua flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.97 0-9-3.582-9-8 0-4.418 4.03-11 9-11s9 6.582 9 11c0 4.418-4.03 8-9 8z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5c-1.5 2.5-3 4.5-3 6.5a3 3 0 006 0c0-2-1.5-4-3-6.5z" />
                        </svg>
                      </div>
                      <p className="text-glow/60 text-sm font-medium">Himalya Sparsh</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2 -right-2 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="text-aurora text-xs font-semibold uppercase tracking-wider">100%</p>
                <p className="text-white text-sm font-medium">Pure Himalayan</p>
              </motion.div>

              {/* Floating badge bottom */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-2 -left-2 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="text-aqua text-xs font-semibold uppercase tracking-wider">Zero</p>
                <p className="text-white text-sm font-medium">Electricity</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <Link href="#content" className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors">
          <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
