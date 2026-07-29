'use client';

import { useEffect, useState } from 'react';

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

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Leadership</h1>
        <p className="text-navy/60">Manage leadership profiles.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 p-6 mb-8">
        <h2 className="font-heading font-bold text-navy text-xl mb-4">Add Entry</h2>
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="Designation" value={form.designation} onChange={e => setForm({...form, designation: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="Photo URL" value={form.photo} onChange={e => setForm({...form, photo: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg sm:col-span-2" />
          <input placeholder="LinkedIn URL" value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input type="number" placeholder="Order" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value)})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <textarea placeholder="Biography" value={form.biography} onChange={e => setForm({...form, biography: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg sm:col-span-2" rows={3} />
          <button type="submit" className="btn-primary sm:col-span-2">Add Entry</button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ice/50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Designation</th>
              <th className="px-4 py-3 text-left">Order</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader) => (
              <tr key={leader._id} className="border-t border-silver/10">
                <td className="px-4 py-3 text-navy">{leader.name}</td>
                <td className="px-4 py-3 text-navy/70">{leader.designation}</td>
                <td className="px-4 py-3 text-navy/70">{leader.order}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {leaders.length === 0 && <p className="p-6 text-center text-navy/50">No leadership entries yet.</p>}
      </div>
    </div>
  );
}
