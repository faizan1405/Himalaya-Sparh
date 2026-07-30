import { Suspense } from 'react';
import HeroClient from './HeroClient';
import { FeaturesSection } from '@/components/public/FeaturesSection';

function HeroSkeleton() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-mountain-gradient">
      <div className="text-center">
        <div className="w-64 h-8 bg-silver/20 rounded animate-pulse mx-auto mb-4" />
        <div className="w-96 h-12 bg-silver/20 rounded animate-pulse mx-auto mb-6" />
        <div className="w-80 h-6 bg-silver/20 rounded animate-pulse mx-auto" />
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
      <FeaturesSection />
    </main>
  );
}
