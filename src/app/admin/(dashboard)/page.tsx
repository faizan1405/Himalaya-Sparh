'use client';

import { useState, useEffect } from 'react';
import { AdminContentEditor } from '@/components/admin/AdminContentEditor';

export default function DashboardPage() {
  const [counts, setCounts] = useState({ orders: 0, enquiries: 0, products: 0, distributors: 0 });
  useEffect(() => {
    Promise.all([
      fetch('/api/content?type=orders').then(r => r.json()),
      fetch('/api/content?type=contactEnquiries').then(r => r.json()),
      fetch('/api/content?type=products').then(r => r.json()),
      fetch('/api/content/distributor').then(r => r.json()),
    ]).then(([orders, enquiries, products, dist]) => {
      setCounts({
        orders: Array.isArray(orders) ? orders.length : 0,
        enquiries: Array.isArray(enquiries) ? enquiries.length : 0,
        products: Array.isArray(products) ? products.length : 0,
        distributors: Array.isArray(dist?.info) ? dist.info.length : 0,
      });
    }).catch(() => {});
  }, []);

  const quickLinks = [
    { label: 'Site Settings', href: '/admin/dashboard/settings' },
    { label: 'Hero Content', href: '/admin/dashboard/hero' },
    { label: 'Manage Products', href: '/admin/dashboard/buy' },
    { label: 'Contact Enquiries', href: '/admin/dashboard/contact' },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Dashboard</h1>
        <p className="text-navy/60">Welcome to the Himalya Sparsh admin panel.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(counts).map(([label, value]) => (
          <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20">
            <p className="text-3xl font-heading font-bold text-navy mb-1">{value}</p>
            <p className="text-navy/60 text-sm capitalize">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-silver/20">
        <h2 className="font-heading font-bold text-navy text-xl mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href} className="flex items-center gap-3 p-4 bg-ice/40 rounded-xl hover:bg-ice transition-colors">
              <span className="text-navy font-medium text-sm">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
