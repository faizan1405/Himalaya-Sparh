'use client';

import { useEffect, useState } from 'react';

export default function DistributorAdminPage() {
  const [data, setData] = useState<any>({ info: [], applications: [] });
  useEffect(() => {
    fetch('/api/content/distributor').then(r => r.json()).then(setData).catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Distributor Network</h1>
        <p className="text-navy/60">Manage distributor locations and applications.</p>
      </div>

      <h2 className="text-xl font-heading font-bold text-navy mb-4">Active Locations</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-ice/50"><tr><th className="px-4 py-3 text-left">Name</th><th className="px-4 py-3 text-left">City</th><th className="px-4 py-3 text-left">State</th><th className="px-4 py-3 text-left">Contact</th></tr></thead>
          <tbody>{data.info?.map((d: any) => (<tr key={d._id} className="border-t border-silver/10"><td className="px-4 py-3 text-navy">{d.name}</td><td className="px-4 py-3 text-navy/70">{d.city}</td><td className="px-4 py-3 text-navy/70">{d.state}</td><td className="px-4 py-3 text-navy/70">{d.contact}</td></tr>))}</tbody>
        </table>
      </div>

      <h2 className="text-xl font-heading font-bold text-navy mb-4">Applications</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ice/50"><tr><th className="px-4 py-3 text-left">Applicant</th><th className="px-4 py-3 text-left">Business</th><th className="px-4 py-3 text-left">Location</th><th className="px-4 py-3 text-left">Status</th></tr></thead>
          <tbody>{data.applications?.map((a: any) => (<tr key={a._id} className="border-t border-silver/10"><td className="px-4 py-3 text-navy">{a.applicantName}</td><td className="px-4 py-3 text-navy/70">{a.businessName}</td><td className="px-4 py-3 text-navy/70">{a.city}, {a.state}</td><td className="px-4 py-3"><span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">{a.status}</span></td></tr>))}</tbody>
        </table>
        {(!data.applications || data.applications.length === 0) && <p className="p-8 text-center text-navy/50">No applications yet.</p>}
      </div>
    </div>
  );
}
