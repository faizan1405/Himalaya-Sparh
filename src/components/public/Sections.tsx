'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = '', id }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`py-16 lg:py-24 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.section>
  );
}

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ label, title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-12 ${centered ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {label && (
        <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl lg:text-5xl font-heading font-bold text-navy mb-4 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-navy/60 max-w-2xl mx-auto leading-relaxed text-balance">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm border border-silver/20 p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </div>
  );
}

export function CTAButton({ children, href = '#', variant = 'primary', className = '' }: { children: React.ReactNode; href?: string; variant?: 'primary' | 'secondary'; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:gap-3 ${className} ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-blue-500 to-navy text-white hover:shadow-lg hover:shadow-blue-500/30'
          : 'bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white'
      }`}
    >
      {children}
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}
