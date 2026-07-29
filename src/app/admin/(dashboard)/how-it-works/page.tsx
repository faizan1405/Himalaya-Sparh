'use client';

import { useEffect, useState } from 'react';

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
      if (res.ok) { const newStep = await res.json(); setSteps([...steps, newStep]); setForm({ step: steps.length + 2, heading: '', description: '', icon: '' }); }
    } catch {}
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">How It Works</h1>
        <p className="text-navy/60">Manage steps for the How It Works page.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 p-6 mb-8">
        <h2 className="font-heading font-bold text-navy text-xl mb-4">Add Step</h2>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <input type="number" placeholder="Step Number" value={form.step} onChange={e => setForm({...form, step: parseInt(e.target.value)})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="Icon (emoji)" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="Heading" value={form.heading} onChange={e => setForm({...form, heading: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg sm:col-span-2" rows={3} />
          <button type="submit" className="btn-primary sm:col-span-2">Add Step</button>
        </form>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ice/50"><tr><th className="px-4 py-3 text-left">Step</th><th className="px-4 py-3 text-left">Heading</th><th className="px-4 py-3 text-left">Description</th></tr></thead>
          <tbody>{steps.map((s) => (<tr key={s._id} className="border-t border-silver/10"><td className="px-4 py-3 text-navy">{s.step}</td><td className="px-4 py-3 text-navy">{s.heading}</td><td className="px-4 py-3 text-navy/70">{s.description}</td></tr>))}</tbody>
        </table>
        {steps.length === 0 && <p className="p-6 text-center text-navy/50">No steps yet.</p>}
      </div>
    </div>
  );
}
