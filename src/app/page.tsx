'use client';

import { Suspense } from 'react';
import HeroClient from './(public)/HeroClient';
import { FeaturesSection } from '@/components/public/FeaturesSection';
import { TestimonialsSection } from '@/components/public/TestimonialsSection';

function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy">
      <div className="text-center">
        <div className="w-64 h-8 bg-white/10 rounded animate-pulse mx-auto mb-4" />
        <div className="w-96 h-12 bg-white/10 rounded animate-pulse mx-auto mb-6" />
        <div className="w-80 h-6 bg-white/10 rounded animate-pulse mx-auto" />
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: '10K+', label: 'Happy Families' },
    { value: '99.9%', label: 'Purity Rate' },
    { value: '100%', label: 'Natural Process' },
    { value: '0', label: 'Electricity Needed' },
  ];

  return (
    <section className="relative z-10 -mt-20 mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-strong rounded-3xl p-8 lg:p-10 border border-white/[0.08]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="heading-sm bg-gradient-to-r from-aurora to-aqua bg-clip-text text-transparent font-bold">
                  {stat.value}
                </p>
                <p className="text-silver text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroClient />
      </Suspense>
      <StatsBar />
      <FeaturesSection />
      <TestimonialsSection />
    </main>
  );
}
