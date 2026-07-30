'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Section, SectionHeading, Card, CTAButton } from '@/components/public/Sections';

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
      .then((data) => { setLeaders(data || []); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-64 h-10 bg-white/[0.04] rounded animate-pulse mx-auto mb-4" />
            <div className="w-full max-w-2xl h-6 bg-white/[0.04] rounded animate-pulse mx-auto mb-12" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full h-72 bg-white/[0.03] rounded-2xl animate-pulse border border-white/[0.06]" style={{ animationDelay: `${i * 0.1}s` }} />
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
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 left-1/3 w-[350px] h-[350px] bg-aurora/10 rounded-full blur-[120px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] text-aurora text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            Leadership
          </span>
          <h1 className="heading-xl font-display font-bold text-white mb-6 leading-tight tracking-tight text-balance">
            The Minds Behind Himalya Sparsh
          </h1>
          <p className="text-body-md text-silver/70 max-w-2xl mx-auto leading-relaxed">
            Visionary leaders driven by a passion for purity, wellness, and innovation.
          </p>
        </div>
      </section>

      {error && (
        <div className="text-center text-red-400 py-8">{error}</div>
      )}

      {/* Founder section */}
      {founder && (
        <Section dark>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white/[0.03] rounded-3xl border border-white/[0.08] overflow-hidden"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-square lg:aspect-auto bg-white/[0.02]">
                  {founder.photo ? (
                    <img src={founder.photo} alt={founder.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-aurora/10 to-aqua/10">
                      <div className="w-32 h-32 rounded-full bg-white/[0.06] flex items-center justify-center text-5xl text-silver/40">
                        {founder.name[0]}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent lg:bg-gradient-to-r" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-aurora text-sm font-medium uppercase tracking-wider mb-3">
                    Founder & Visionary
                  </span>
                  <h2 className="heading-lg font-display font-bold text-white mb-4">
                    {founder.name}
                  </h2>
                  <p className="text-silver/70 leading-relaxed text-base mb-6">
                    {founder.biography}
                  </p>
                  {founder.linkedin && (
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-aurora hover:text-aqua transition-colors font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      )}

      {/* Team grid */}
      {team.length > 0 && (
        <Section dark>
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
                  <Card glow>
                    <div className="aspect-square bg-gradient-to-br from-white/[0.04] to-white/[0.02] rounded-xl mb-5 flex items-center justify-center overflow-hidden border border-white/[0.06]">
                      {leader.photo ? (
                        <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-white/[0.06] flex items-center justify-center text-3xl text-silver/40">
                          {leader.name[0]}
                        </div>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-1">{leader.name}</h3>
                    <p className="text-aurora text-sm font-medium mb-3">{leader.designation}</p>
                    <p className="text-silver/60 text-sm leading-relaxed mb-4">{leader.biography}</p>
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
        </Section>
      )}

      {leaders.length === 0 && !error && (
        <div className="text-center text-silver/40 py-12">
          Leadership content will be displayed once added via admin panel.
        </div>
      )}
    </main>
  );
}
