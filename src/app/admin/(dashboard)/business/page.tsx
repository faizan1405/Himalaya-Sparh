'use client';

import { useEffect, useState } from 'react';

export default function PartnershipAdminPage() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/content/partnership').then(r => r.json()).then(setData).catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Partnership Enquiries</h1>
        <p className="text-navy/60">Manage business partnership requests.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ice/50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p._id} className="border-t border-silver/10">
                <td className="px-4 py-3 text-navy">{p.fullName}</td>
                <td className="px-4 py-3 text-navy/70">{p.companyName}</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs">{p.partnershipType}</span></td>
                <td className="px-4 py-3 text-navy/70">{p.email}<br /><span className="text-xs">{p.phone}</span></td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <p className="p-8 text-center text-navy/50">No partnership enquiries yet.</p>}
      </div>
    </div>
  );
}
