import { Suspense } from 'react';

export default function AboutIntroductionPage() {
  return (
    <main className="pt-24">
      <section className="relative py-20 bg-gradient-to-b from-ice to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
              About Us
            </span>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-navy mb-6">
              Our Story
            </h1>
            <p className="text-xl text-navy/60 text-balance">
              Born from the Himalayas, powered by science
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-heading font-bold text-navy mb-4">Vision</h2>
            <p className="text-navy/70 leading-relaxed mb-8">
              To make pure Himalayan water accessible to every household in India and beyond.
            </p>

            <h2 className="text-2xl font-heading font-bold text-navy mb-4">Mission</h2>
            <p className="text-navy/70 leading-relaxed mb-8">
              To innovate and deliver scientifically advanced water solutions that preserve nature's purity while ensuring health and wellness for all.
            </p>

            <h2 className="text-2xl font-heading font-bold text-navy mb-4">Purpose</h2>
            <p className="text-navy/70 leading-relaxed mb-8">
              Empowering lives through clean, natural, and scientifically enhanced water solutions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
