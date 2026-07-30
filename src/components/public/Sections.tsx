'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

/* ─── Section ─────────────────────────────────────────── */
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function Section({ children, className = '', id, dark = false }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`section-lg relative ${dark ? 'bg-gradient-to-b from-midnight to-navy' : ''} ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      {/* Decorative corner gradient for dark sections */}
      {dark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-aurora/[0.04] rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-aqua/[0.03] rounded-full blur-3xl" />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
}

/* ─── SectionHeading ──────────────────────────────────── */
interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
  lightTitle?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  centered = true,
  dark = false,
  lightTitle = false
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      {label && (
        <motion.span
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-aurora/10 text-aurora text-xs font-semibold tracking-widest uppercase rounded-full mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {label && <span className="w-1 h-1 rounded-full bg-aurora" />}
          {label}
        </motion.span>
      )}
      <h2 className={`heading-lg font-display font-bold tracking-tight text-balance ${lightTitle ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-body-md text-balance ${lightTitle ? 'text-silver/70' : 'text-navy/60'}`}>
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      {centered && (
        <motion.div
          className="mt-8 mx-auto w-12 h-0.5 bg-gradient-to-r from-aurora to-aqua rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
      )}
    </motion.div>
  );
}

/* ─── Card ────────────────────────────────────────────── */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className = '', onClick, hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`
        relative rounded-2xl p-6 lg:p-8
        bg-white/[0.03] border border-white/[0.06]
        backdrop-blur-sm
        ${hover ? 'cursor-pointer group' : ''}
        ${glow ? 'hover:shadow-[0_0_40px_rgba(77,168,255,0.08)]' : 'hover:shadow-xl hover:shadow-black/20'}
        ${glow ? 'hover:border-aurora/[0.12]' : 'hover:border-white/[0.12]'}
        transition-all duration-500
        ${className}
      `}
    >
      {/* Top shimmer on hover */}
      {hover && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aurora/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      {children}
    </motion.div>
  );
}

/* ─── CTAButton ───────────────────────────────────────── */
interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function CTAButton({
  children,
  href,
  variant = 'primary',
  className = '',
  arrow = false,
  onClick,
  type = 'button',
  disabled
}: CTAButtonProps) {
  const variants = {
    primary: `
      relative overflow-hidden
      bg-gradient-to-r from-aurora to-aqua
      text-white font-semibold
      shadow-lg shadow-aurora/20 hover:shadow-xl hover:shadow-aurora/30
      hover:from-aurora-bright hover:to-aqua-bright
      border border-white/10
    `,
    secondary: `
      bg-white/[0.05] text-white
      border border-white/10 hover:border-white/20
      hover:bg-white/[0.08]
    `,
    ghost: `
      bg-transparent text-silver hover:text-white
      border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.04]
    `,
  };

  const baseClass = `
    inline-flex items-center justify-center gap-2.5
    px-8 py-3.5 rounded-full font-body text-[0.9rem] tracking-wide
    transition-all duration-400 hover:-translate-y-0.5
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
    ${variants[variant]}
    ${className}
  `;

  const inner = (
    <>
      {children}
      {arrow && (
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      )}
    </>
  );

  if (href && !onClick) {
    return (
      <Link href={href} className={baseClass}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClass}>
      {inner}
    </button>
  );
}
