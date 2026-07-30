'use client';

import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = '', id }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`py-20 lg:py-28 ${className}`}
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
      className={`mb-14 ${centered ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {label && (
        <span className="inline-block px-4 py-1.5 bg-aurora/10 text-aurora text-sm font-medium rounded-full mb-4">
          {label}
        </span>
      )}
      <h2 className="text-4xl lg:text-5xl font-heading font-bold text-navy mb-4 text-balance">
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
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-silver/10 p-6 lg:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-aurora/5 hover:-translate-y-1 hover:border-aurora/20 ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </div>
  );
}

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function CTAButton({ children, href, variant = 'primary', className = '', arrow = false, onClick, type = 'button', disabled }: CTAButtonProps) {
  const baseClass = `inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 ${className} ${
    variant === 'primary'
      ? 'bg-gradient-to-r from-aurora to-aqua text-white hover:shadow-lg hover:shadow-aurora/30'
      : 'bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white'
  }`;

  const inner = (
    <>
      {children}
      {arrow && (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      )}
    </>
  );

  if (href && !onClick) {
    return (
      <a href={href} className={baseClass}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClass}>
      {inner}
    </button>
  );
}
