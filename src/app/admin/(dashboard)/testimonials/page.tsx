'use client';

import { useEffect, useState } from 'react';
import { AdminListPanel } from '@/components/admin/AdminListPanel';
import { Star } from 'lucide-react';

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

  const updateField = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <AdminListPanel
      title="Testimonials"
      description="Manage customer testimonials and reviews."
      icon={<Star className="w-6 h-6" />}
      headers={['Name', 'Type', 'Rating', 'Verified']}
      emptyMessage="No testimonials yet."
      form={
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Customer Name *</label>
            <input placeholder="Customer name" value={form.customerName} onChange={e => updateField('customerName', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">City</label>
            <input placeholder="City" value={form.city} onChange={e => updateField('city', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">State</label>
            <input placeholder="State" value={form.state} onChange={e => updateField('state', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Review Type</label>
            <select value={form.reviewType} onChange={e => updateField('reviewType', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all">
              <option value="written">Written</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Rating (1-5)</label>
            <input type="number" min="1" max="5" placeholder="5" value={form.rating} onChange={e => updateField('rating', parseInt(e.target.value))} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Purchase Type</label>
            <input placeholder="e.g. Online, Retail" value={form.purchaseType} onChange={e => updateField('purchaseType', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Review Text</label>
            <textarea placeholder="Customer review..." value={form.reviewText} onChange={e => updateField('reviewText', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 resize-none text-navy transition-all" rows={3} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Video URL</label>
            <input placeholder="https://youtube.com/..." value={form.videoUrl} onChange={e => updateField('videoUrl', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-aurora to-aqua text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-aurora/20 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:col-span-2">
            <Star className="w-4 h-4" />
            Add Testimonial
          </button>
        </form>
      }
    >
      {data.map((t) => (
        <tr key={t._id} className="border-t border-silver/10 hover:bg-ice/20 transition-colors">
          <td className="px-6 py-3.5 text-navy font-medium">{t.customerName}</td>
          <td className="px-6 py-3.5 text-navy/70 capitalize">{t.reviewType}</td>
          <td className="px-6 py-3.5 text-navy/70">{t.rating}/5</td>
          <td className="px-6 py-3.5">
            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${t.isVerified ? 'bg-green-50 text-green-600' : 'bg-silver/20 text-navy/50'}`}>
              {t.isVerified ? 'Yes' : 'No'}
            </span>
          </td>
        </tr>
      ))}
    </AdminListPanel>
  );
}
