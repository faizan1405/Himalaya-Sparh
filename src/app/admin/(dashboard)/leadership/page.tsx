'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AdminListPanel } from '@/components/admin/AdminListPanel';
import { Users } from 'lucide-react';

interface Leader {
  _id: string;
  name: string;
  designation: string;
  biography: string;
  photo: string;
  linkedin?: string;
  order: number;
}

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [form, setForm] = useState({ name: '', designation: '', biography: '', photo: '', linkedin: '', order: 0 });

  useEffect(() => {
    fetch('/api/content/leadership').then(r => r.json()).then(setLeaders).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content/leadership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newLeader = await res.json();
        setLeaders([...leaders, newLeader]);
        setForm({ name: '', designation: '', biography: '', photo: '', linkedin: '', order: 0 });
      }
    } catch {}
  };

  const updateField = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <AdminListPanel
      title="Leadership"
      description="Manage leadership profiles."
      icon={<Users className="w-6 h-6" />}
      headers={['Name', 'Designation', 'Order']}
      emptyMessage="No leadership entries yet."
      form={
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Name *</label>
            <input placeholder="Full Name" value={form.name} onChange={e => updateField('name', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Designation *</label>
            <input placeholder="Designation" value={form.designation} onChange={e => updateField('designation', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Photo URL</label>
            <input placeholder="https://..." value={form.photo} onChange={e => updateField('photo', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">LinkedIn URL</label>
            <input placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={e => updateField('linkedin', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Display Order</label>
            <input type="number" placeholder="0" value={form.order || ''} onChange={e => updateField('order', parseInt(e.target.value))} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Biography</label>
            <textarea placeholder="Short bio..." value={form.biography} onChange={e => updateField('biography', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 resize-none text-navy transition-all" rows={3} />
          </div>
          <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-aurora to-aqua text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-aurora/20 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:col-span-2">
            <Users className="w-4 h-4" />
            Add Leader
          </button>
        </form>
      }
    >
      {leaders.map((leader) => (
        <tr key={leader._id} className="border-t border-silver/10 hover:bg-ice/20 transition-colors">
          <td className="px-6 py-3.5 text-navy font-medium">{leader.name}</td>
          <td className="px-6 py-3.5 text-navy/70">{leader.designation}</td>
          <td className="px-6 py-3.5 text-navy/70">{leader.order}</td>
        </tr>
      ))}
    </AdminListPanel>
  );
}
