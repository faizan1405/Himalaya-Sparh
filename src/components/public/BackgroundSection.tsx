'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface BackgroundSectionProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  overlay?: 'dark' | 'gradient' | 'deep' | 'glass' | 'light' | string;
  blur?: 'none' | 'sm' | 'md' | 'lg';
  opacity?: number;
  parallax?: boolean;
}

export function BackgroundSection({
  imageSrc,
  imageAlt,
  children,
  className = '',
  id,
  overlay = 'gradient',
  blur = 'sm',
  opacity = 0.35,
  parallax = true,
}: BackgroundSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const blurClasses = {
    none: '',
    sm: 'blur-[2px]',
    md: 'blur-[4px]',
    lg: 'blur-[8px]',
  };

  const overlayClasses = {
    dark: 'bg-navy/85',
    deep: 'bg-deep/90',
    gradient: 'bg-gradient-to-b from-navy/90 via-deep/85 to-midnight/90',
    glass: 'bg-navy/70 backdrop-blur-md',
    light: 'bg-navy/40 backdrop-blur-sm',
  };

  const activeOverlay = overlayClasses[overlay as keyof typeof overlayClasses] || overlay;

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background Image Layer */}
      <motion.div
        style={parallax ? { y } : undefined}
        className="absolute inset-0 z-0 pointer-events-none scale-105"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className={`object-cover object-center ${blurClasses[blur]}`}
          style={{ opacity }}
          quality={85}
        />
      </motion.div>

      {/* Overlay Layer for High Readability & Contrast */}
      <div className={`absolute inset-0 z-[1] pointer-events-none ${activeOverlay}`} />

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
