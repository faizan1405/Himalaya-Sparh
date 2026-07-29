'use client';

import { useEffect, useState } from 'react';

export default function FounderDeliveryAdminPage() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/content?type=founderDeliveryRequests').then(r => r.json()).then(setData).catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Founder Delivery</h1>
        <p className="text-navy/60">Manage founder delivery requests.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ice/50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Units</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r: any) => (
              <tr key={r._id} className="border-t border-silver/10">
                <td className="px-4 py-3 text-navy">{r.name}</td>
                <td className="px-4 py-3 text-navy/70">{r.phone}<br /><span className="text-xs">{r.email}</span></td>
                <td className="px-4 py-3 text-navy/70">{r.city}, {r.state}</td>
                <td className="px-4 py-3 text-navy/70">{r.units}</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <p className="p-8 text-center text-navy/50">No founder delivery requests yet.</p>}
      </div>
    </div>
  );
}
