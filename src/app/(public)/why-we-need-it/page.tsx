'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Droplets, Scale, Mountain, Heart, Leaf, Sparkles, CheckCircle2,
  ArrowDown, ArrowRight, FlaskConical, Gem, CircleDot, Zap, Sun,
  Coffee, Activity, Users, Clock, Award, ShieldCheck, Phone
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────
   Data
   ───────────────────────────────────────────────────────── */

const features = [
  {
    icon: Droplets,
    title: 'Better Hydration',
    desc: 'Alkaline water supports improved hydration and helps your body stay refreshed throughout the day.',
  },
  {
    icon: Scale,
    title: 'Supports Healthy pH Balance',
    desc: 'Maintains an alkaline environment and supports the body’s natural balance.',
  },
  {
    icon: Mountain,
    title: 'Rich in Natural Minerals',
    desc: 'Water passes through carefully selected natural mineral media that enrich the water experience.',
  },
  {
    icon: Activity,
    title: 'Supports Kidney Wellness',
    desc: 'Proper hydration is essential for healthy kidney function and natural cleansing processes.',
  },
  {
    icon: Heart,
    title: 'Supports Heart Health',
    desc: 'Good hydration plays an important role in supporting overall cardiovascular wellness.',
  },
  {
    icon: Leaf,
    title: 'Supports Liver Function',
    desc: 'Healthy hydration assists the body’s natural metabolic and cleansing functions.',
  },
];

const journey = [
  'Ordinary Water Enters',
  'Water passes through Himalayan Stones',
  'Japanese Mineral Stones',
  'Korean Mineral Stones',
  'Silver Layer',
  'Jamun Wood',
  'Magnesium',
  'Zinc',
  'Magnetic Technology',
  'Mineral-Rich Alkaline Water',
];

const benefits = [
  'Better Hydration',
  'Fresh Taste',
  'Mineral Rich',
  'Daily Wellness Support',
  'Supports Healthy Lifestyle',
  'Easy Everyday Use',
];

const components = [
  { name: 'Himalayan Stones', icon: Mountain, desc: 'Sourced from the Himalayan foothills, these stones infuse water with trace minerals and a naturally smooth taste.' },
  { name: 'Japanese Stones', icon: Sparkles, desc: 'Premium Japanese mineral stones gently soften water and balance its character with time-tested purity.' },
  { name: 'Korean Stones', icon: Gem, desc: 'Korean mineral stones release beneficial micro-minerals that enrich the water’s profile and freshness.' },
  { name: 'Silver', icon: CircleDot, desc: 'A silver layer provides natural antibacterial support, helping keep the inner chamber fresh and clean.' },
  { name: 'Jamun Wood', icon: Leaf, desc: 'Jamun wood is revered in Ayurveda for its natural wellness properties, adding a subtle, refreshing note.' },
  { name: 'Magnesium', icon: Zap, desc: 'Magnesium supports muscle relaxation, healthy nerve function, and overall daily wellbeing.' },
  { name: 'Zinc', icon: Sun, desc: 'Zinc contributes to immune wellness and helps support the body’s natural defense systems.' },
  { name: 'Magnet', icon: Sparkles, desc: 'Magnetic technology softly structures the water, enhancing hydration feel and overall freshness.' },
];

const comparisons = [
  ['Basic drinking water', 'Mineral-rich alkaline water'],
  ['Standard taste', 'Fresh taste'],
  ['No mineral enhancement', 'Multiple natural media layers'],
  ['Ordinary hydration', 'Enhanced hydration experience'],
  ['Basic filtration', 'Multi-stage alkaline transformation'],
];

const lifestyles = [
  { title: 'Morning Hydration', icon: Sun, desc: 'Start your day with a refreshing glass of mineral-rich, alkaline water.' },
  { title: 'Workout Recovery', icon: Activity, desc: 'Replenish after exercise with water designed to support recovery.' },
  { title: 'Office Hydration', icon: Coffee, desc: 'Stay focused and refreshed at your desk throughout the workday.' },
  { title: 'Family Wellness', icon: Users, desc: 'A clean, wellness-focused water experience for the whole family.' },
];

const highlights = [
  { icon: Droplets, text: 'Produces approximately 6000 litres of alkaline water' },
  { icon: FlaskConical, text: 'Around 9.5 pH alkaline water' },
  { icon: Mountain, text: 'Natural mineral technology' },
  { icon: ShieldCheck, text: 'Multi-layer purification' },
  { icon: Gem, text: 'Premium Himalayan-inspired design' },
  { icon: Clock, text: 'Easy daily operation' },
  { icon: Award, text: '12-month warranty' },
];

const steps = [
  { num: 1, title: 'Pour Water', desc: 'Fill the device with ordinary tap or RO water.' },
  { num: 2, title: 'Water Passes Through All Mineral Layers', desc: 'Water flows naturally through every media layer.' },
  { num: 3, title: 'Enjoy Fresh Alkaline Water', desc: 'Collect mineral-rich, fresh alkaline water.' },
];

/* ─────────────────────────────────────────────────────────
   Reusable Bits
   ───────────────────────────────────────────────────────── */

function GlowOrb({ className }: { className?: string }) {
  return <div className={`pointer-events-none absolute rounded-full blur-3xl ${className}`} aria-hidden />;
}

function Particle({ delay, x, size, duration }: { delay: number; x: string; size: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-aurora/40"
      style={{ left: x, width: size, height: size, bottom: '-10%' }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: '-110vh', opacity: [0, 0.6, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function GlassCard({
  children,
  className = '',
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-7 lg:p-8 ${
        hover ? 'transition-all duration-500 hover:border-aurora/30 hover:shadow-[0_20px_60px_-15px_rgba(77,168,255,0.35)]' : ''
      } ${className}`}
    >
      {hover && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aurora/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yMountains = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yParticles = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pt-36 pb-32 lg:pt-44 lg:pb-40"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-midnight to-navy" />
      <div className="absolute inset-0 bg-gradient-radial" />

      {/* Glow orbs */}
      <GlowOrb className="top-[-10%] left-[-10%] w-[520px] h-[520px] bg-aurora/15" />
      <GlowOrb className="bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-aqua/15" />
      <GlowOrb className="top-[30%] left-[40%] w-[300px] h-[300px] bg-aurora/8" />

      {/* Floating particles */}
      <motion.div style={{ y: yParticles }} className="absolute inset-0 pointer-events-none">
        {[
          { x: '10%', size: 4, d: 14, delay: 0 },
          { x: '22%', size: 6, d: 18, delay: 2 },
          { x: '38%', size: 3, d: 12, delay: 4 },
          { x: '55%', size: 5, d: 16, delay: 1 },
          { x: '70%', size: 4, d: 20, delay: 3 },
          { x: '85%', size: 7, d: 15, delay: 5 },
          { x: '95%', size: 3, d: 17, delay: 6 },
        ].map((p, i) => (
          <Particle key={i} x={p.x} size={p.size} duration={p.d} delay={p.delay} />
        ))}
      </motion.div>

      {/* Floating minerals */}
      <motion.div
        aria-hidden
        style={{ y: yMountains }}
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
      >
        <svg viewBox="0 0 1440 600" className="w-full h-full opacity-50" preserveAspectRatio="none">
          <defs>
            <linearGradient id="glacier" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(184,228,240,0.55)" />
              <stop offset="100%" stopColor="rgba(77,168,255,0.05)" />
            </linearGradient>
            <linearGradient id="glacier2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(94,214,194,0.05)" />
            </linearGradient>
          </defs>
          <path
            d="M0,520 L160,360 L280,440 L420,300 L560,400 L720,260 L880,380 L1020,300 L1180,420 L1320,320 L1440,420 L1440,600 L0,600 Z"
            fill="url(#glacier)"
          />
          <path
            d="M0,580 L120,480 L240,540 L380,460 L520,520 L660,440 L820,500 L960,460 L1100,520 L1260,460 L1440,520 L1440,600 L0,600 Z"
            fill="url(#glacier2)"
            opacity="0.7"
          />
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.05] border border-white/[0.08] text-aurora text-xs font-semibold tracking-[0.2em] uppercase rounded-full mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The Science of Pure Water
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="heading-xl font-display font-bold text-white text-balance leading-[1.05]"
        >
          Why We{' '}
          <span className="gradient-text">Need It</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-2xl mx-auto text-body text-silver/75 text-balance leading-relaxed"
        >
          Water is the foundation of life. But not all water provides the same experience.
          Modern lifestyles, processed food, stress, and environmental pollution can affect our
          daily wellness. Himalaya Sparsh transforms ordinary drinking water into mineral-rich
          alkaline water inspired by the purity of the Himalayas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/buy" className="btn-primary">
            <Droplets className="w-4 h-4" />
            Order Now
          </Link>
          <Link href="/how-it-works" className="btn-secondary">
            See How It Works
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 inline-flex flex-col items-center gap-2 text-silver/40 text-xs tracking-[0.2em] uppercase"
        >
          Scroll to explore
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Section 1 — Why Alkaline Water?
   ───────────────────────────────────────────────────────── */

function AlkalineFeaturesSection() {
  return (
    <section className="relative section-lg overflow-hidden">
      <div className="absolute inset-0 bg-section-dark" />
      <GlowOrb className="top-1/4 -left-32 w-[400px] h-[400px] bg-aurora/8" />
      <GlowOrb className="bottom-0 -right-32 w-[400px] h-[400px] bg-aqua/8" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-aurora/10 text-aurora text-xs font-semibold tracking-[0.2em] uppercase rounded-full mb-6">
            <span className="w-1 h-1 rounded-full bg-aurora" />
            Wellness Benefits
          </span>
          <h2 className="heading-lg font-display font-bold text-white">
            Why <span className="gradient-text">Alkaline Water</span>?
          </h2>
          <div className="mt-8 mx-auto w-12 h-0.5 bg-gradient-to-r from-aurora to-aqua rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <GlassCard>
                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aurora/20 to-aqua/10 border border-aurora/20 flex items-center justify-center mb-6"
                  >
                    <f.icon className="w-7 h-7 text-aurora" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-white text-xl mb-3">{f.title}</h3>
                  <p className="text-silver/65 leading-relaxed text-sm">{f.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Section 2 — Interactive Timeline
   ───────────────────────────────────────────────────────── */

function TimelineSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll('[data-step]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-step'));
            setActive(idx);
          }
        });
      },
      { threshold: 0.45 }
    );
    items.forEach((it) => observer.observe(it));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative section-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
      <GlowOrb className="top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-aurora/8" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-aqua/10 text-aqua text-xs font-semibold tracking-[0.2em] uppercase rounded-full mb-6">
            <span className="w-1 h-1 rounded-full bg-aqua" />
            The Transformation
          </span>
          <h2 className="heading-lg font-display font-bold text-white">
            What Makes <span className="gradient-text">Himalaya Sparsh</span> Different?
          </h2>
          <p className="mt-5 text-body-md text-silver/65 max-w-2xl mx-auto">
            Every drop passes through ten carefully orchestrated stages — each one adding a
            layer of mineral richness, freshness, and balance.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Center spine */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-1/2 bg-gradient-to-b from-transparent via-aurora/40 to-transparent" />

          {/* Active flowing particles */}
          <AnimatePresence>
            {active >= 0 && (
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-0 w-2 h-2"
                style={{ top: `${(active / (journey.length - 1)) * 100}%` }}
              >
                <motion.span
                  className="block w-2 h-2 rounded-full bg-aurora shadow-[0_0_20px_4px_rgba(77,168,255,0.6)]"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-10 lg:space-y-14">
            {journey.map((stage, i) => {
              const isLeft = i % 2 === 0;
              const isLast = i === journey.length - 1;
              return (
                <motion.div
                  key={stage}
                  data-step={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      animate={{
                        scale: active === i ? 1.25 : 1,
                        boxShadow: active === i
                          ? '0 0 30px 6px rgba(77,168,255,0.5)'
                          : '0 0 0 0 rgba(0,0,0,0)',
                      }}
                      className="w-4 h-4 rounded-full bg-gradient-to-br from-aurora to-aqua ring-4 ring-navy"
                    />
                  </div>

                  {/* Card */}
                  <div className={`pl-16 lg:pl-0 lg:w-1/2 ${isLeft ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                    <div
                      className={`glass-strong rounded-2xl px-6 py-5 inline-block ${
                        isLast ? '!bg-gradient-to-br !from-aurora/20 !to-aqua/20 !border-aurora/30' : ''
                      }`}
                    >
                      <div className={`flex items-center gap-3 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                        <span className="text-aurora font-mono text-xs">0{i + 1}</span>
                        <span className="h-px w-8 bg-aurora/30" />
                        <span className={`font-display font-semibold text-base ${isLast ? 'gradient-text' : 'text-white'}`}>
                          {stage}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Section 3 — Benefits You Can Feel
   ───────────────────────────────────────────────────────── */

function BenefitsSection() {
  return (
    <section className="relative section-lg overflow-hidden">
      <div className="absolute inset-0 bg-section-dark" />
      <GlowOrb className="top-0 right-0 w-[500px] h-[500px] bg-aqua/8" />
      <GlowOrb className="bottom-0 left-0 w-[500px] h-[500px] bg-aurora/8" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-aurora/10 text-aurora text-xs font-semibold tracking-[0.2em] uppercase rounded-full mb-6">
            <span className="w-1 h-1 rounded-full bg-aurora" />
            Feel The Difference
          </span>
          <h2 className="heading-lg font-display font-bold text-white">
            Benefits You Can <span className="gradient-text">Feel</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-aurora/20 to-aqua/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative glass-strong rounded-3xl px-7 py-9 h-full flex items-center gap-5 border border-white/[0.08] group-hover:border-aurora/40 transition-all duration-500">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aurora to-aqua flex items-center justify-center flex-shrink-0 shadow-lg shadow-aurora/30"
                >
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </motion.div>
                <span className="font-display font-semibold text-white text-lg">{b}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Section 4 — Understanding pH
   ───────────────────────────────────────────────────────── */

function PhScale() {
  return (
    <section className="relative section-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
      <GlowOrb className="top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-aurora/8" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-aqua/10 text-aqua text-xs font-semibold tracking-[0.2em] uppercase rounded-full mb-6">
            <span className="w-1 h-1 rounded-full bg-aqua" />
            Understanding pH
          </span>
          <h2 className="heading-lg font-display font-bold text-white">
            The <span className="gradient-text">Alkaline</span> Spectrum
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl p-10 lg:p-16 border border-white/[0.08]"
        >
          {/* The scale */}
          <div className="relative">
            <div className="h-4 rounded-full overflow-hidden bg-white/[0.06] border border-white/[0.06]">
              <div className="h-full w-full bg-gradient-to-r from-red-500 via-yellow-400 via-40% via-aurora to-frost" />
            </div>

            {/* Markers */}
            <div className="absolute -top-1 left-0 right-0 flex justify-between text-silver/60 text-xs font-mono">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
              <span>11</span>
              <span>12</span>
              <span>13</span>
              <span>14</span>
            </div>

            {/* 9.5 marker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="absolute"
              style={{ left: '67.8%', top: '20px' }}
            >
              <div className="relative -translate-x-1/2 flex flex-col items-center">
                <div className="w-px h-8 bg-aurora" />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-1 px-3 py-1.5 rounded-full bg-gradient-to-br from-aurora to-aqua text-white text-xs font-bold shadow-lg shadow-aurora/30"
                >
                  9.5 pH
                </motion.div>
              </div>
            </motion.div>

            {/* 7 marker */}
            <div className="absolute" style={{ left: '50%', top: '20px' }}>
              <div className="relative -translate-x-1/2 flex flex-col items-center">
                <div className="w-px h-6 bg-silver/40" />
                <span className="mt-1 text-silver/60 text-xs font-mono">Neutral</span>
              </div>
            </div>

            {/* 0 marker */}
            <div className="absolute -bottom-9 left-0 text-silver/60 text-xs font-medium">Acidic</div>
            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-silver/60 text-xs font-medium">Neutral</div>
            <div className="absolute -bottom-9 right-0 text-aurora text-xs font-medium">Alkaline</div>
          </div>

          <div className="mt-24 flex items-center justify-between text-xs font-mono text-silver/50 max-w-xs">
            <span>← Acidic</span>
            <span>Neutral →</span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center max-w-2xl mx-auto text-silver/75 text-body-md leading-relaxed"
          >
            Himalaya Sparsh produces alkaline water with approximately{' '}
            <span className="gradient-text font-bold">pH 9.5</span>, designed to provide a
            refreshing and mineral-rich drinking experience.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Section 5 — Eight Powerful Components
   ───────────────────────────────────────────────────────── */

function ComponentsGrid() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="relative section-lg overflow-hidden">
      <div className="absolute inset-0 bg-section-dark" />
      <GlowOrb className="top-1/3 -right-40 w-[500px] h-[500px] bg-aqua/10" />
      <GlowOrb className="bottom-0 -left-40 w-[500px] h-[500px] bg-aurora/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-aurora/10 text-aurora text-xs font-semibold tracking-[0.2em] uppercase rounded-full mb-6">
            <span className="w-1 h-1 rounded-full bg-aurora" />
            Eight Layers
          </span>
          <h2 className="heading-lg font-display font-bold text-white">
            Eight Powerful <span className="gradient-text">Components</span>
          </h2>
          <p className="mt-5 text-body-md text-silver/65 max-w-2xl mx-auto">
            Hover or tap each card to reveal how it contributes to the water experience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {components.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              onHoverStart={() => setActiveIdx(i)}
              onHoverEnd={() => setActiveIdx(null)}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              className="relative h-72 cursor-pointer"
            >
              <motion.div
                animate={{
                  rotateY: activeIdx === i ? 180 : 0,
                }}
                transition={{ duration: 0.7, ease: [0.4, 0.2, 0.2, 1] }}
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 glass-strong rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-white/[0.08] hover:border-aurora/30 transition-colors duration-500"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3 + i * 0.2, repeat: Infinity }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aurora/20 to-aqua/10 border border-aurora/20 flex items-center justify-center mb-5"
                  >
                    <c.icon className="w-7 h-7 text-aurora" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-white text-base leading-tight">
                    {c.name}
                  </h3>
                  <p className="mt-3 text-silver/40 text-xs tracking-wider uppercase">
                    Hover to reveal
                  </p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-3xl p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-aurora/30 to-aqua/20 border border-aurora/40 shadow-[0_20px_60px_-15px_rgba(77,168,255,0.5)]"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <c.icon className="w-9 h-9 text-white mb-4" />
                  <h3 className="font-display font-bold text-white text-base mb-3">{c.name}</h3>
                  <p className="text-white/85 text-xs leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Section 6 — Comparison
   ───────────────────────────────────────────────────────── */

function ComparisonSection() {
  return (
    <section className="relative section-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-midnight" />
      <GlowOrb className="top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-aurora/8" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-aqua/10 text-aqua text-xs font-semibold tracking-[0.2em] uppercase rounded-full mb-6">
            <span className="w-1 h-1 rounded-full bg-aqua" />
            Side-by-Side
          </span>
          <h2 className="heading-lg font-display font-bold text-white">
            Why Families Choose{' '}
            <span className="gradient-text">Himalaya Sparsh</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl overflow-hidden border border-white/[0.08]"
        >
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-white/[0.08]">
            <div className="px-6 lg:px-10 py-7 text-silver/70 font-display font-semibold text-lg">
              Regular Water
            </div>
            <div className="px-6 lg:px-10 py-7 bg-gradient-to-br from-aurora/10 to-aqua/10 text-white font-display font-semibold text-lg flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aurora to-aqua flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              Himalaya Sparsh
            </div>
          </div>

          {comparisons.map((row, i) => (
            <motion.div
              key={row[0]}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`grid grid-cols-2 ${i !== comparisons.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
            >
              <div className="px-6 lg:px-10 py-5 text-silver/55 text-sm lg:text-base">
                {row[0]}
              </div>
              <div className="px-6 lg:px-10 py-5 text-white text-sm lg:text-base font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-aurora flex-shrink-0" />
                {row[1]}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Section 7 — Everyday Living
   ───────────────────────────────────────────────────────── */

function LifestyleSection() {
  return (
    <section className="relative section-lg overflow-hidden">
      <div className="absolute inset-0 bg-section-dark" />
      <GlowOrb className="top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-aurora/8" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-aurora/10 text-aurora text-xs font-semibold tracking-[0.2em] uppercase rounded-full mb-6">
            <span className="w-1 h-1 rounded-full bg-aurora" />
            Daily Life
          </span>
          <h2 className="heading-lg font-display font-bold text-white">
            Designed for <span className="gradient-text">Everyday Living</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifestyles.map((l, i) => (
            <motion.div
              key={l.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-80 rounded-3xl overflow-hidden border border-white/[0.08] group">
                {/* Illustration bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-aurora/15 via-aqua/5 to-navy" />
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center opacity-30"
                >
                  <l.icon className="w-40 h-40 text-aurora" strokeWidth={1} />
                </motion.div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />

                {/* Content */}
                <div className="relative h-full p-7 flex flex-col justify-end">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aurora to-aqua flex items-center justify-center mb-4 shadow-lg shadow-aurora/30"
                  >
                    <l.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-white text-xl mb-2">{l.title}</h3>
                  <p className="text-silver/65 text-sm leading-relaxed">{l.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Section 8 — Easy to Use
   ───────────────────────────────────────────────────────── */

function HowToUseSection() {
  return (
    <section className="relative section-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight to-navy" />
      <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-aurora/8" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-aqua/10 text-aqua text-xs font-semibold tracking-[0.2em] uppercase rounded-full mb-6">
            <span className="w-1 h-1 rounded-full bg-aqua" />
            Three Steps
          </span>
          <h2 className="heading-lg font-display font-bold text-white">
            Easy to <span className="gradient-text">Use</span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-4">
          {steps.map((s, i) => (
            <div key={s.num} className="flex md:flex-row items-center flex-col gap-6 md:gap-4 flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="flex-1 w-full"
              >
                <GlassCard className="h-full text-center">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-aurora to-aqua flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg shadow-aurora/30 mb-5"
                  >
                    {s.num}
                  </motion.div>
                  <h3 className="font-display font-semibold text-white text-xl mb-3">{s.title}</h3>
                  <p className="text-silver/65 text-sm leading-relaxed">{s.desc}</p>
                </GlassCard>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.3 }}
                  className="md:self-center"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="md:rotate-0"
                  >
                    <div className="md:rotate-0 rotate-90">
                      <ArrowDown className="w-7 h-7 text-aurora" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Section 9 — Product Highlights
   ───────────────────────────────────────────────────────── */

function HighlightsSection() {
  return (
    <section className="relative section-lg overflow-hidden">
      <div className="absolute inset-0 bg-section-dark" />
      <GlowOrb className="top-1/4 -right-40 w-[500px] h-[500px] bg-aqua/10" />
      <GlowOrb className="bottom-1/4 -left-40 w-[500px] h-[500px] bg-aurora/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-aurora/10 text-aurora text-xs font-semibold tracking-[0.2em] uppercase rounded-full mb-6">
            <span className="w-1 h-1 rounded-full bg-aurora" />
            Product Highlights
          </span>
          <h2 className="heading-lg font-display font-bold text-white">
            Engineered for <span className="gradient-text">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((h, i) => {
            const isWide = i === 0;
            return (
              <motion.div
                key={h.text}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className={isWide ? 'sm:col-span-2 lg:col-span-2' : ''}
              >
                <GlassCard className={isWide ? '!bg-gradient-to-br !from-aurora/15 !to-aqua/10' : ''}>
                  <div className={`flex items-center gap-5 ${isWide ? 'lg:gap-7' : ''}`}>
                    <motion.div
                      animate={{ rotate: [0, 6, -6, 0] }}
                      transition={{ duration: 5, repeat: Infinity, delay: i * 0.2 }}
                      className={`flex-shrink-0 rounded-2xl bg-gradient-to-br from-aurora/20 to-aqua/10 border border-aurora/20 flex items-center justify-center ${
                        isWide ? 'w-16 h-16' : 'w-12 h-12'
                      }`}
                    >
                      <h.icon className={`text-aurora ${isWide ? 'w-8 h-8' : 'w-6 h-6'}`} />
                    </motion.div>
                    <p className={`font-display font-medium text-white ${isWide ? 'text-xl lg:text-2xl' : 'text-base'}`}>
                      {h.text}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Final CTA
   ───────────────────────────────────────────────────────── */

function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const yMountains = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden py-32 lg:py-44">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-navy to-navy" />
      <GlowOrb className="top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-aurora/15" />

      {/* Parallax mountains */}
      <motion.div
        style={{ y: yMountains }}
        className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none"
      >
        <svg viewBox="0 0 1440 600" className="w-full h-full opacity-70" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cta-m1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(184,228,240,0.4)" />
              <stop offset="100%" stopColor="rgba(77,168,255,0.05)" />
            </linearGradient>
            <linearGradient id="cta-m2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="100%" stopColor="rgba(94,214,194,0.05)" />
            </linearGradient>
            <linearGradient id="cta-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(94,214,194,0.0)" />
              <stop offset="100%" stopColor="rgba(94,214,194,0.15)" />
            </linearGradient>
          </defs>
          <path
            d="M0,420 L120,260 L260,340 L400,200 L540,300 L680,180 L840,280 L980,200 L1140,320 L1280,240 L1440,360 L1440,600 L0,600 Z"
            fill="url(#cta-m1)"
          />
          <path
            d="M0,500 L160,400 L320,460 L480,380 L640,440 L800,360 L960,420 L1120,380 L1280,440 L1440,400 L1440,600 L0,600 Z"
            fill="url(#cta-m2)"
          />
          <path
            d="M0,560 L200,540 L400,560 L600,540 L800,560 L1000,540 L1200,560 L1440,540 L1440,600 L0,600 Z"
            fill="url(#cta-water)"
          />
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.05] border border-white/[0.08] text-aqua text-xs font-semibold tracking-[0.2em] uppercase rounded-full mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Your Journey Starts Here
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="heading-xl font-display font-bold text-white text-balance"
        >
          Experience the <span className="gradient-text">Touch</span> of the Himalayas
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-2xl mx-auto text-body text-silver/75 text-balance leading-relaxed"
        >
          Transform your everyday drinking water into a refreshing mineral-rich alkaline
          water experience with Himalaya Sparsh.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/buy" className="btn-primary text-base !py-4 !px-9">
            <Droplets className="w-5 h-5" />
            Order Now
          </Link>
          <a
            href="https://wa.me/919876543210?text=Hi%20Himalaya%20Sparsh%2C%20I%27d%20like%20to%20learn%20more."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-base !py-4 !px-9"
          >
            <Phone className="w-5 h-5" />
            Talk to an Expert
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Disclaimer
   ───────────────────────────────────────────────────────── */

function HealthDisclaimer() {
  return (
    <section className="relative section-sm">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-silver/45 text-xs leading-relaxed border-t border-white/[0.05] pt-10"
        >
          <strong className="text-silver/70">Wellness note:</strong> The benefits described on this
          page are presented as general wellness support. They are not intended to diagnose,
          treat, cure, or prevent any disease. For specific medical conditions, please consult a
          qualified healthcare professional.
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────── */

export default function WhyWeNeedItPage() {
  return (
    <main>
      <Hero />
      <AlkalineFeaturesSection />
      <TimelineSection />
      <BenefitsSection />
      <PhScale />
      <ComponentsGrid />
      <ComparisonSection />
      <LifestyleSection />
      <HowToUseSection />
      <HighlightsSection />
      <FinalCTA />
      <HealthDisclaimer />
    </main>
  );
}
