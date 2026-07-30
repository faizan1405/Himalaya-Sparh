'use client';

import { useEffect, useState } from 'react';
import { AdminListPanel } from '@/components/admin/AdminListPanel';
import { Wrench } from 'lucide-react';

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

  const updateField = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <AdminListPanel
      title="Device Components"
      description="Manage the natural materials and components used in the device."
      icon={<Wrench className="w-6 h-6" />}
      headers={['Name', 'Purpose', 'Order']}
      emptyMessage="No components yet."
      form={
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Component Name *</label>
            <input placeholder="e.g. Himalayan Crystal" value={form.name} onChange={e => updateField('name', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Purpose *</label>
            <input placeholder="Brief purpose" value={form.purpose} onChange={e => updateField('purpose', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Description</label>
            <textarea placeholder="Detailed description..." value={form.description} onChange={e => updateField('description', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 resize-none text-navy transition-all" rows={2} />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Characteristics</label>
            <input placeholder="Key characteristics" value={form.characteristics} onChange={e => updateField('characteristics', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Origin / Source</label>
            <input placeholder="Origin location" value={form.origin} onChange={e => updateField('origin', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Image URL</label>
            <input placeholder="https://..." value={form.image} onChange={e => updateField('image', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Display Order</label>
            <input type="number" placeholder="0" value={form.order || ''} onChange={e => updateField('order', parseInt(e.target.value))} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-aurora to-aqua text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-aurora/20 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:col-span-2">
            <Wrench className="w-4 h-4" />
            Add Component
          </button>
        </form>
      }
    >
      {components.map((c) => (
        <tr key={c._id} className="border-t border-silver/10 hover:bg-ice/20 transition-colors">
          <td className="px-6 py-3.5 text-navy font-medium">{c.name}</td>
          <td className="px-6 py-3.5 text-navy/70">{c.purpose}</td>
          <td className="px-6 py-3.5 text-navy/70">{c.order}</td>
        </tr>
      ))}
    </AdminListPanel>
  );
}
