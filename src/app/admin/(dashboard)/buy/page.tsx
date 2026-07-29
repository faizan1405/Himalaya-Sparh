'use client';

import { useEffect, useState } from 'react';

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
      if (res.ok) { const p = await res.json(); setProducts([...products, p]); }
    } catch {}
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Products</h1>
        <p className="text-navy/60">Manage products, pricing, and stock.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 p-6 mb-8">
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="Slug" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value)})} required className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input type="number" placeholder="Original Price" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: parseFloat(e.target.value)})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: parseInt(e.target.value)})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <input placeholder="SKU" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg" />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="px-3 py-2 bg-ice/50 border border-silver/30 rounded-lg sm:col-span-2" rows={2} />
          <button type="submit" className="btn-primary sm:col-span-2">Add Product</button>
        </form>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ice/50"><tr><th className="px-4 py-3 text-left">Name</th><th className="px-4 py-3 text-left">Price</th><th className="px-4 py-3 text-left">Stock</th><th className="px-4 py-3 text-left">Active</th></tr></thead>
          <tbody>{products.map(p => (<tr key={p._id} className="border-t border-silver/10"><td className="px-4 py-3 text-navy">{p.name}</td><td className="px-4 py-3 text-navy/70">₹{p.price}</td><td className="px-4 py-3 text-navy/70">{p.stock}</td><td className="px-4 py-3 text-navy/70">{p.isActive ? 'Yes' : 'No'}</td></tr>))}</tbody>
        </table>
        {products.length === 0 && <p className="p-6 text-center text-navy/50">No products yet.</p>}
      </div>
    </div>
  );
}
