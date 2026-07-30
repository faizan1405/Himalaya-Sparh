'use client';

import { useEffect, useState } from 'react';
import { AdminListPanel } from '@/components/admin/AdminListPanel';
import { FlaskConical } from 'lucide-react';

interface Report {
  _id: string;
  laboratory: string;
  testType: string;
  date: string;
  summary: string;
  category: string;
  fileUrl: string;
  verificationInfo: string;
}

export default function LabReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [form, setForm] = useState({ laboratory: '', testType: '', date: '', summary: '', category: 'Water Quality', fileUrl: '', verificationInfo: '' });

  useEffect(() => {
    fetch('/api/content/lab-reports').then(r => r.json()).then(setReports).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content/lab-reports', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) {
        const newReport = await res.json();
        setReports([...reports, newReport]);
        setForm({ laboratory: '', testType: '', date: '', summary: '', category: 'Water Quality', fileUrl: '', verificationInfo: '' });
      }
    } catch {}
  };

  const updateField = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <AdminListPanel
      title="Lab Reports"
      description="Manage laboratory test reports and certifications."
      icon={<FlaskConical className="w-6 h-6" />}
      headers={['Test', 'Lab', 'Date', 'Category']}
      emptyMessage="No lab reports yet."
      form={
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Laboratory Name *</label>
            <input placeholder="Lab name" value={form.laboratory} onChange={e => updateField('laboratory', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Test Type *</label>
            <input placeholder="e.g. Water Quality" value={form.testType} onChange={e => updateField('testType', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Date *</label>
            <input type="date" value={form.date} onChange={e => updateField('date', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Category</label>
            <select value={form.category} onChange={e => updateField('category', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all">
              <option>Water Quality</option>
              <option>Material Safety</option>
              <option>Performance Testing</option>
              <option>Certification</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Summary</label>
            <textarea placeholder="Report summary..." value={form.summary} onChange={e => updateField('summary', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 resize-none text-navy transition-all" rows={2} />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">File URL (PDF) *</label>
            <input placeholder="https://..." value={form.fileUrl} onChange={e => updateField('fileUrl', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Verification Info</label>
            <input placeholder="Verification details" value={form.verificationInfo} onChange={e => updateField('verificationInfo', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-aurora to-aqua text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-aurora/20 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:col-span-2">
            <FlaskConical className="w-4 h-4" />
            Add Report
          </button>
        </form>
      }
    >
      {reports.map((r) => (
        <tr key={r._id} className="border-t border-silver/10 hover:bg-ice/20 transition-colors">
          <td className="px-6 py-3.5 text-navy">{r.testType}</td>
          <td className="px-6 py-3.5 text-navy/70">{r.laboratory}</td>
          <td className="px-6 py-3.5 text-navy/70">{r.date}</td>
          <td className="px-6 py-3.5 text-navy/70">{r.category}</td>
        </tr>
      ))}
    </AdminListPanel>
  );
}
