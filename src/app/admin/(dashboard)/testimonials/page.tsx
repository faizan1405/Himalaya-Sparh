'use client';

import { useEffect, useState } from 'react';

interface Testimonial {
  _id: string;
  customerName: string;
  rating: number;
  reviewType: string;
  reviewText?: string;
  videoUrl?: string;
  isVerified: boolean;
}

export default function TestimonialsPage() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [form, setForm] = useState({ customerName: '', city: '', state: '', rating: 5, reviewType: 'written', reviewText: '', videoUrl: '', purchaseType: '', isVerified: false, isFeatured: false });

  useEffect(() => {
    fetch('/api/content/testimonials').then(r => r.json()).then(setData).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { const newT = await res.json(); setData([...data, newT]); }
    } catch {}
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Testimonials</h1>
        <p className="text-navy/60">Manage customer testimonials and reviews.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 p-6 mb-8">
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Customer Name" value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="State" value={form.state} onChange={e => setForm({...form, state: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <select value={form.reviewType} onChange={e => setForm({...form, reviewType: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg">
            <option value="written">Written</option><option value="video">Video</option>
          </select>
          <input type="number" min="1" max="5" placeholder="Rating" value={form.rating} onChange={e => setForm({...form, rating: parseInt(e.target.value)})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="Purchase Type" value={form.purchaseType} onChange={e => setForm({...form, purchaseType: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <textarea placeholder="Review Text" value={form.reviewText} onChange={e => setForm({...form, reviewText: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg sm:col-span-2" rows={3} />
          <input placeholder="Video URL" value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <button type="submit" className="btn-primary sm:col-span-2">Add Testimonial</button>
        </form>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ice/50"><tr><th className="px-4 py-3 text-left">Name</th><th className="px-4 py-3 text-left">Type</th><th className="px-4 py-3 text-left">Rating</th><th className="px-4 py-3 text-left">Verified</th></tr></thead>
          <tbody>{data.map(t => (<tr key={t._id} className="border-t border-silver/10"><td className="px-4 py-3 text-navy">{t.customerName}</td><td className="px-4 py-3 text-navy/70">{t.reviewType}</td><td className="px-4 py-3 text-navy/70">{t.rating}/5</td><td className="px-4 py-3 text-navy/70">{t.isVerified ? 'Yes' : 'No'}</td></tr>))}</tbody>
        </table>
        {data.length === 0 && <p className="p-6 text-center text-navy/50">No testimonials yet.</p>}
      </div>
    </div>
  );
}
