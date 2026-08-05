'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Beaker, Shield, CheckCircle, Award } from 'lucide-react';
import { Card } from '@/components/public/Sections';
import { ParallaxHero } from '@/components/public/ParallaxHero';
import { BackgroundSection } from '@/components/public/BackgroundSection';

interface LabReport {
  _id: string;
  laboratory: string;
  testType: string;
  date: string;
  summary: string;
  category: string;
  fileUrl: string;
  verificationInfo: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Water Quality': <Beaker className="w-5 h-5 text-aurora" />,
  'Material Safety': <Shield className="w-5 h-5 text-aurora" />,
  'Performance Testing': <CheckCircle className="w-5 h-5 text-aurora" />,
  'Certification': <Award className="w-5 h-5 text-aurora" />,
};

export default function LabReportsPage() {
  const [reports, setReports] = useState<LabReport[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/content?type=labReport')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setReports(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(reports.map((r) => r.category)))];
  const filtered = filter === 'All' ? reports : reports.filter((r) => r.category === filter);

  return (
    <main>
      {/* Hero */}
      <ParallaxHero
        imageSrc="/images/bgs/lab-reports.png"
        imageAlt="Precision Scientific Glass Laboratory Research"
        badge={
          <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/[0.12] text-aurora text-sm font-medium rounded-full backdrop-blur-md">
            Lab Test Reports
          </span>
        }
        title="Verified & Certified Purity"
        subtitle="Independent Quality Testing & ISO Certification Documents"
        description="Every claim we make is backed by rigorous independent laboratory testing. Browse certified test reports validating mineral composition, water safety, and purity levels."
      />

      {/* Reports section */}
      <BackgroundSection
        id="reports"
        imageSrc="/images/bgs/water-caustics.png"
        imageAlt="Certified Water Quality Matrix"
        overlay="gradient"
        opacity={0.25}
        blur="sm"
        className="section-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                    filter === cat
                      ? 'bg-gradient-to-r from-aurora to-aqua text-white shadow-lg shadow-aurora/20'
                      : 'bg-white/[0.04] text-silver/70 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {error && <div className="text-center text-red-400 py-8">{error}</div>}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.length > 0
              ? filtered.map((report, i) => (
                  <motion.div
                    key={report._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                  >
                    <Card glow className="glass-medium h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="w-10 h-10 bg-aurora/10 rounded-xl flex items-center justify-center">
                            {categoryIcons[report.category] || <FileText className="w-5 h-5 text-aurora" />}
                          </div>
                          <span className="text-xs bg-white/[0.06] text-silver/70 px-3 py-1 rounded-full border border-white/[0.08] font-mono">
                            {report.date}
                          </span>
                        </div>

                        <span className="text-aurora text-xs font-semibold uppercase tracking-wider block mb-1">
                          {report.testType}
                        </span>

                        <h3 className="font-display font-bold text-white text-lg mb-2">
                          {report.laboratory}
                        </h3>

                        <p className="text-silver/70 text-sm leading-relaxed mb-6">{report.summary}</p>
                      </div>

                      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                        <span className="text-silver/50 text-xs">{report.verificationInfo || 'Verified'}</span>
                        {report.fileUrl && (
                          <a
                            href={report.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-aurora hover:text-aqua transition-colors text-sm font-semibold"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View PDF
                          </a>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))
              : !loading && (
                  <div className="col-span-full text-center py-16 text-silver/50">
                    No lab reports available for this category yet.
                  </div>
                )}
          </div>
        </div>
      </BackgroundSection>
    </main>
  );
}
