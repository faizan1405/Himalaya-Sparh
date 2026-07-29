'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

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

  useEffect(() => {
    fetch('/api/content/leadership')
      .then((r) => r.json())
      .then((data) => setLeaders(data || []))
      .catch(() => setLeaders([]));
  }, []);

  return (
    <main className="pt-24">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ice/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
              Leadership
            </span>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-navy mb-6">
              The Minds Behind Himalya Sparsh
            </h1>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto">
              Visionary leaders driven by a passion for purity, wellness, and innovation.
            </p>
          </div>

          {/* Founder Section */}
          {leaders[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl border border-silver/20 overflow-hidden mb-12"
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto bg-ice/50 flex items-center justify-center">
                  {leaders[0].photo ? (
                    <img src={leaders[0].photo} alt={leaders[0].name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-navy/10 flex items-center justify-center text-4xl text-navy/40">
                      {leaders[0].name[0]}
                    </div>
                  )}
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <p className="text-blue-500 text-sm font-medium mb-2">Founder & Visionary</p>
                  <h2 className="text-3xl font-heading font-bold text-navy mb-3">{leaders[0].name}</h2>
                  <p className="text-navy/70 leading-relaxed mb-6">{leaders[0].biography}</p>
                  {leaders[0].linkedin && (
                    <a
                      href={leaders[0].linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Co-founders */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.slice(1).map((leader, i) => (
              <motion.div
                key={leader._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-silver/20 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square bg-ice/50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  {leader.photo ? (
                    <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-navy/10 flex items-center justify-center text-2xl text-navy/40">
                      {leader.name[0]}
                    </div>
                  )}
                </div>
                <h3 className="font-heading font-bold text-navy text-lg">{leader.name}</h3>
                <p className="text-blue-500 text-sm mb-2">{leader.designation}</p>
                <p className="text-navy/60 text-sm leading-relaxed mb-3">{leader.biography}</p>
                {leader.linkedin && (
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm"
                  >
                    <ExternalLink className="w-3 h-3" />
                    LinkedIn
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {leaders.length === 0 && (
            <div className="text-center text-navy/50 py-12">
              Leadership content will be displayed once added via admin panel.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
