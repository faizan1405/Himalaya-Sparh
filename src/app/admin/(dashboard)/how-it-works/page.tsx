'use client';

import { useEffect, useState } from 'react';
import { AdminListPanel } from '@/components/admin/AdminListPanel';
import { ListOrdered } from 'lucide-react';

interface Step {
  _id: string;
  step: number;
  heading: string;
  description: string;
  icon: string;
}

export default function HowItWorksPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [form, setForm] = useState({ step: 1, heading: '', description: '', icon: '' });

  useEffect(() => {
    fetch('/api/content/how-it-works').then(r => r.json()).then(setSteps).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content/how-it-works', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) {
        const newStep = await res.json();
        setSteps([...steps, newStep]);
        setForm({ step: steps.length + 2, heading: '', description: '', icon: '' });
      }
    } catch {}
  };

  const updateField = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <AdminListPanel
      title="How It Works"
      description="Manage steps for the How It Works page."
      icon={<ListOrdered className="w-6 h-6" />}
      headers={['Step', 'Heading', 'Description']}
      emptyMessage="No steps yet."
      form={
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Step Number *</label>
            <input type="number" placeholder="1" value={form.step || ''} onChange={e => updateField('step', parseInt(e.target.value))} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Icon (emoji)</label>
            <input placeholder="💧" value={form.icon} onChange={e => updateField('icon', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Heading *</label>
            <input placeholder="Step heading" value={form.heading} onChange={e => updateField('heading', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Description</label>
            <textarea placeholder="Step description..." value={form.description} onChange={e => updateField('description', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 resize-none text-navy transition-all" rows={3} />
          </div>
          <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-aurora to-aqua text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-aurora/20 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:col-span-2">
            <ListOrdered className="w-4 h-4" />
            Add Step
          </button>
        </form>
      }
    >
      {steps.map((s) => (
        <tr key={s._id} className="border-t border-silver/10 hover:bg-ice/20 transition-colors">
          <td className="px-6 py-3.5 text-navy font-medium">{s.step}</td>
          <td className="px-6 py-3.5 text-navy">{s.heading}</td>
          <td className="px-6 py-3.5 text-navy/70">{s.description}</td>
        </tr>
      ))}
    </AdminListPanel>
  );
}
