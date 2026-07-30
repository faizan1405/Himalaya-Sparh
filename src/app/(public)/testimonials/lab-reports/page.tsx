'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Download, Beaker, Shield, CheckCircle, Award } from 'lucide-react';
import { Section, SectionHeading, Card } from '@/components/public/Sections';

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
  'Water Quality': <Beaker className="w-5 h-5" />,
  'Material Safety': <Shield className="w-5 h-5" />,
  'Performance Testing': <CheckCircle className="w-5 h-5" />,
  'Certification': <Award className="w-5 h-5" />,
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
      .then((data) => { setReports(data || []); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  const categories = ['All', ...Array.from(new Set(reports.map((r) => r.category)))];
  const filtered = filter === 'All' ? reports : reports.filter((r) => r.category === filter);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-aurora/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-aqua/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-glow text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            Lab Test Reports
          </span>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Verified &amp; Certified
          </h1>
          <p className="text-lg text-silver/70 max-w-2xl mx-auto leading-relaxed">
            All reports from accredited laboratories ensuring complete transparency and trust.
          </p>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-navy to-white relative">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            title="Quality Assurance"
            subtitle="Every report proves our commitment to purity, safety, and scientific excellence."
          />

          {error && (
            <div className="text-center text-red-500 py-8 bg-red-50/50 rounded-2xl border border-red-200/50">{error}</div>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-aurora to-aqua text-white shadow-lg shadow-aurora/20'
                    : 'bg-white text-navy/70 border border-silver/30 hover:border-aurora/20 hover:text-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Reports Grid */}
          {!loading && filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((report, i) => (
                <motion.div
                  key={report._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-xl flex items-center justify-center text-aurora">
                        {categoryIcons[report.category] || <FileText className="w-5 h-5" />}
                      </div>
                      <span className="text-xs font-medium text-aurora/80 uppercase tracking-wider">{report.category}</span>
                    </div>

                    <h3 className="font-heading font-bold text-navy text-lg mb-1">{report.testType}</h3>
                    <p className="text-navy/50 text-sm mb-2">{report.laboratory}</p>
                    <p className="text-navy/60 text-sm leading-relaxed mb-4 flex-1">{report.summary}</p>

                    <div className="flex items-center gap-2 text-xs text-navy/40 mb-4">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      <span>{new Date(report.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {report.fileUrl && (
                        <a
                          href={report.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-aurora/10 text-aurora text-sm font-medium rounded-xl hover:bg-aurora/20 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Report
                        </a>
                      )}
                      <span className="text-xs text-navy/40">{report.verificationInfo}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : !loading && (
            <div className="text-center text-navy/50 py-16 bg-white/50 rounded-2xl border border-silver/10">
              <FileText className="w-12 h-12 text-navy/20 mx-auto mb-4" />
              <p>Lab reports will be displayed once added via admin panel.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
