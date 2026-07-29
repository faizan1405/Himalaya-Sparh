'use client';

import { useEffect, useState } from 'react';

interface Component {
  _id: string;
  name: string;
  purpose: string;
  description: string;
  characteristics: string;
  origin?: string;
  image: string;
  order: number;
}

export default function ComponentsPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [form, setForm] = useState({ name: '', purpose: '', description: '', characteristics: '', origin: '', image: '', order: 0 });

  useEffect(() => {
    fetch('/api/content/device-components').then(r => r.json()).then(setComponents).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content/device-components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newComp = await res.json();
        setComponents([...components, newComp]);
        setForm({ name: '', purpose: '', description: '', characteristics: '', origin: '', image: '', order: 0 });
      }
    } catch {}
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Device Components</h1>
        <p className="text-navy/60">Manage components used in the device.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 p-6 mb-8">
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Component Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="Purpose" value={form.purpose} onChange={e => setForm({...form, purpose: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg sm:col-span-2" rows={2} />
          <input placeholder="Characteristics" value={form.characteristics} onChange={e => setForm({...form, characteristics: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="Origin / Source" value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input type="number" placeholder="Display Order" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <button type="submit" className="btn-primary sm:col-span-2">Add Component</button>
        </form>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ice/50"><tr><th className="px-4 py-3 text-left">Name</th><th className="px-4 py-3 text-left">Purpose</th><th className="px-4 py-3 text-left">Order</th></tr></thead>
          <tbody>{components.map((c) => (<tr key={c._id} className="border-t border-silver/10"><td className="px-4 py-3 text-navy">{c.name}</td><td className="px-4 py-3 text-navy/70">{c.purpose}</td><td className="px-4 py-3 text-navy/70">{c.order}</td></tr>))}</tbody>
        </table>
        {components.length === 0 && <p className="p-8 text-center text-navy/50">No components yet.</p>}
      </div>
    </div>
  );
}
