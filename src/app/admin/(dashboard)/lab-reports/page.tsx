'use client';

import { useEffect, useState } from 'react';

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
      if (res.ok) { const newReport = await res.json(); setReports([...reports, newReport]); setForm({ laboratory: '', testType: '', date: '', summary: '', category: 'Water Quality', fileUrl: '', verificationInfo: '' }); }
    } catch {}
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Lab Reports</h1>
        <p className="text-navy/60">Manage laboratory test reports.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 p-6 mb-8">
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Laboratory Name" value={form.laboratory} onChange={e => setForm({...form, laboratory: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="Test Type" value={form.testType} onChange={e => setForm({...form, testType: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg">
            <option>Water Quality</option><option>Material Safety</option><option>Performance Testing</option><option>Certification</option>
          </select>
          <textarea placeholder="Summary" value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg sm:col-span-2" rows={2} />
          <input placeholder="File URL (PDF)" value={form.fileUrl} onChange={e => setForm({...form, fileUrl: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="Verification Info" value={form.verificationInfo} onChange={e => setForm({...form, verificationInfo: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <button type="submit" className="btn-primary sm:col-span-2">Add Report</button>
        </form>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ice/50"><tr><th className="px-4 py-3 text-left">Test</th><th className="px-4 py-3 text-left">Lab</th><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-left">Category</th></tr></thead>
          <tbody>{reports.map((r) => (<tr key={r._id} className="border-t border-silver/10"><td className="px-4 py-3 text-navy">{r.testType}</td><td className="px-4 py-3 text-navy/70">{r.laboratory}</td><td className="px-4 py-3 text-navy/70">{r.date}</td><td className="px-4 py-3 text-navy/70">{r.category}</td></tr>))}</tbody>
        </table>
        {reports.length === 0 && <p className="p-6 text-center text-navy/50">No lab reports yet.</p>}
      </div>
    </div>
  );
}
