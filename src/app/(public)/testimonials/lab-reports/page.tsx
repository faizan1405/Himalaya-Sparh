'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Download, Beaker, Shield, CheckCircle, Award } from 'lucide-react';
import { Section, SectionHeading } from '@/components/public/Sections';

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

  useEffect(() => {
    fetch('/api/content/lab-reports')
      .then((r) => r.json())
      .then((data) => { setReports(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(reports.map((r) => r.category)))];
  const filtered = filter === 'All' ? reports : reports.filter((r) => r.category === filter);

  return (
    <main className="pt-24">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ice to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Lab Test Reports"
            title="Verified & Certified"
            subtitle="All reports from accredited laboratories ensuring complete transparency."
          />

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-navy/70 hover:bg-ice border border-silver/30'
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
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                      {categoryIcons[report.category] || <FileText className="w-5 h-5" />}
                    </span>
                    <span className="text-sm text-navy/50">{report.category}</span>
                  </div>

                  <h3 className="font-heading font-bold text-navy text-lg mb-1">{report.testType}</h3>
                  <p className="text-navy/50 text-sm mb-3">{report.laboratory}</p>
                  <p className="text-navy/60 text-sm mb-4">{report.summary}</p>

                  <div className="flex items-center gap-2 text-xs text-navy/40 mb-4">
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-2">
                    {report.fileUrl && (
                      <a
                        href={report.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View
                      </a>
                    )}
                    <span className="text-xs text-navy/40 mt-1">{report.verificationInfo}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-navy/50 py-12">
              Lab reports will be displayed once added via admin panel.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
