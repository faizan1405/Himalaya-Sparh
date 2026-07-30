'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { AdminListPanel } from '@/components/admin/AdminListPanel';

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
  slug: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: '', description: '', price: 0, originalPrice: 0, images: [], features: [], components: [], stock: 0, sku: '', isActive: true, slug: '' });

  useEffect(() => {
    fetch('/api/content/buy').then(r => r.json()).then(setProducts).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/content/buy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { const p = await res.json(); setProducts([...products, p]); setForm({ name: '', description: '', price: 0, originalPrice: 0, images: [], features: [], components: [], stock: 0, sku: '', isActive: true, slug: '' }); }
    } catch {}
  };

  const updateField = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <AdminListPanel
      title="Products"
      description="Manage products, pricing, and stock."
      icon={<ShoppingCart className="w-6 h-6" />}
      headers={['Name', 'Price', 'Stock', 'Active']}
      emptyMessage="No products yet."
      form={
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Product Name *</label>
            <input placeholder="Product Name" value={form.name} onChange={e => updateField('name', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Slug *</label>
            <input placeholder="product-slug" value={form.slug} onChange={e => updateField('slug', e.target.value)} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Price (₹)</label>
            <input type="number" placeholder="Price" value={form.price || ''} onChange={e => updateField('price', parseFloat(e.target.value))} required className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Original Price (₹)</label>
            <input type="number" placeholder="Original Price" value={form.originalPrice || ''} onChange={e => updateField('originalPrice', parseFloat(e.target.value))} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Stock</label>
            <input type="number" placeholder="Stock" value={form.stock || ''} onChange={e => updateField('stock', parseInt(e.target.value))} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div>
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">SKU</label>
            <input placeholder="SKU" value={form.sku} onChange={e => updateField('sku', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 text-navy transition-all" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-navy/70 mb-1.5 font-medium">Description</label>
            <textarea placeholder="Product description" value={form.description} onChange={e => updateField('description', e.target.value)} className="w-full px-4 py-2.5 bg-ice/50 border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 resize-none text-navy transition-all" rows={2} />
          </div>
          <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-aurora to-aqua text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-aurora/20 hover:-translate-y-0.5 transition-all duration-300 text-sm sm:col-span-2">
            <ShoppingCart className="w-4 h-4" />
            Add Product
          </button>
        </form>
      }
    >
      {products.map((p) => (
        <tr key={p._id} className="border-t border-silver/10 hover:bg-ice/20 transition-colors">
          <td className="px-6 py-3.5 text-navy font-medium">{p.name}</td>
          <td className="px-6 py-3.5 text-navy/70">₹{p.price}</td>
          <td className="px-6 py-3.5 text-navy/70">{p.stock}</td>
          <td className="px-6 py-3.5">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
              {p.isActive ? 'Active' : 'Inactive'}
            </span>
          </td>
        </tr>
      ))}
    </AdminListPanel>
  );
}
