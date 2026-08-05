'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionHeading, Card } from '@/components/public/Sections';
import { ParallaxHero } from '@/components/public/ParallaxHero';
import { BackgroundSection } from '@/components/public/BackgroundSection';

interface Leader {
  _id: string;
  name: string;
  designation: string;
  biography: string;
  photo: string;
  linkedin?: string;
}

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content?type=leadership')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setLeaders(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main>
        <section className="py-20 bg-navy min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-64 h-10 bg-white/[0.04] rounded animate-pulse mx-auto mb-4" />
            <div className="w-full max-w-2xl h-6 bg-white/[0.04] rounded animate-pulse mx-auto mb-12" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-72 bg-white/[0.03] rounded-2xl animate-pulse border border-white/[0.06]"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  const founder = leaders[0];
  const team = leaders.slice(1);

  return (
    <main>
      {/* Hero */}
      <ParallaxHero
        imageSrc="/images/bgs/about-leadership.png"
        imageAlt="Modern Architectural Corporate Executive Boardroom"
        badge={
          <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/[0.12] text-aurora text-sm font-medium rounded-full backdrop-blur-md">
            Leadership
          </span>
        }
        title="The Minds Behind Himalya Sparsh"
        subtitle="Visionary leaders driven by a passion for purity, wellness, and innovation"
        description="Our team combines deep scientific expertise, environmental commitment, and corporate excellence to bring pure Himalayan water technology to homes worldwide."
      />

      {error && <div className="text-center text-red-400 py-8">{error}</div>}

      {/* Founder section */}
      {founder && (
        <BackgroundSection
          imageSrc="/images/bgs/about-leadership.png"
          imageAlt="Founder Leadership Workspace"
          overlay="deep"
          opacity={0.3}
          blur="md"
          className="section-lg"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-strong rounded-3xl border border-white/[0.12] overflow-hidden shadow-2xl"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-square lg:aspect-auto bg-white/[0.02]">
                  {founder.photo ? (
                    <img src={founder.photo} alt={founder.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-aurora/15 to-aqua/15 min-h-[320px]">
                      <div className="w-32 h-32 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-5xl text-white font-display">
                        {founder.name[0]}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent lg:bg-gradient-to-r" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-aurora text-sm font-semibold uppercase tracking-wider mb-3">
                    Founder & Visionary
                  </span>
                  <h2 className="heading-lg font-display font-bold text-white mb-4">
                    {founder.name}
                  </h2>
                  <p className="text-silver/80 leading-relaxed text-base mb-6 font-normal">
                    {founder.biography}
                  </p>
                  {founder.linkedin && (
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-aurora hover:text-aqua transition-colors font-semibold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </BackgroundSection>
      )}

      {/* Team grid */}
      {team.length > 0 && (
        <BackgroundSection
          imageSrc="/images/bgs/water-caustics.png"
          imageAlt="Team Water Purity Focus"
          overlay="gradient"
          opacity={0.2}
          blur="sm"
          className="section-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Our Team"
              title="Leadership Team"
              subtitle="The dedicated professionals driving our mission forward."
              lightTitle
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {team.map((leader, i) => (
                <motion.div
                  key={leader._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <Card glow className="glass-medium">
                    <div className="aspect-square bg-gradient-to-br from-white/[0.04] to-white/[0.02] rounded-xl mb-5 flex items-center justify-center overflow-hidden border border-white/[0.06]">
                      {leader.photo ? (
                        <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-white/[0.08] flex items-center justify-center text-3xl text-white font-display">
                          {leader.name[0]}
                        </div>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-1">{leader.name}</h3>
                    <p className="text-aurora text-sm font-medium mb-3">{leader.designation}</p>
                    <p className="text-silver/70 text-sm leading-relaxed mb-4">{leader.biography}</p>
                    {leader.linkedin && (
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-aurora hover:text-aqua transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        LinkedIn
                      </a>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </BackgroundSection>
      )}

      {leaders.length === 0 && !error && (
        <div className="text-center text-silver/50 py-16">
          Leadership content will be displayed once added via admin panel.
        </div>
      )}
    </main>
  );
}
