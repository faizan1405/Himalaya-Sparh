'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxHeroProps {
  imageSrc: string;
  imageAlt: string;
  title: React.ReactNode;
  subtitle?: string;
  badge?: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  overlayGradient?: string;
  blur?: boolean;
  minHeight?: string;
  parallaxSpeed?: number;
}

export function ParallaxHero({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  badge,
  description,
  children,
  overlayGradient = 'from-navy/90 via-navy/75 to-navy',
  blur = false,
  minHeight = 'min-h-[85vh]',
  parallaxSpeed = 0.3,
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${parallaxSpeed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={containerRef}
      className={`relative ${minHeight} flex items-center justify-center overflow-hidden bg-navy pt-24 pb-16 lg:pt-32 lg:pb-24`}
    >
      {/* Background Image with Parallax & GPU acceleration */}
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0 z-0 pointer-events-none origin-center"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center ${blur ? 'blur-[3px]' : ''}`}
          quality={90}
        />
      </motion.div>

      {/* Layered Overlays for High Legibility & Premium Atmosphere */}
      {/* 1. Base Gradient Overlay */}
      <div className={`absolute inset-0 z-[1] bg-gradient-to-b ${overlayGradient} pointer-events-none`} />

      {/* 2. Vignette Radial Overlay */}
      <div
        className="absolute inset-0 z-[2] opacity-80 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(8, 15, 26, 0.85) 100%)',
        }}
      />

      {/* 3. Subtle Brand Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-[3] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="max-w-4xl"
        >
          {badge && <div className="mb-6 inline-block">{badge}</div>}

          <h1 className="heading-xl font-display font-bold text-white tracking-tight drop-shadow-lg text-balance mb-6">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl sm:text-2xl text-silver/90 font-light tracking-tight mb-4 drop-shadow">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="text-body-md text-silver/80 max-w-2xl leading-relaxed mb-8 font-normal">
              {description}
            </p>
          )}

          {children}
        </motion.div>
      </div>
    </section>
  );
}
