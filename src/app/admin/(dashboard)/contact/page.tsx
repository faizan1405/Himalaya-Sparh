'use client';

import { useEffect, useState } from 'react';

export default function ContactAdminPage() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/content?type=contactEnquiries').then(r => r.json()).then(setData).catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Contact Enquiries</h1>
        <p className="text-navy/60">Manage contact form submissions.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ice/50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e._id} className="border-t border-silver/10">
                <td className="px-4 py-3 text-navy">{e.name}</td>
                <td className="px-4 py-3 text-navy/70">{e.subject}</td>
                <td className="px-4 py-3 text-navy/70">{e.enquiryType}</td>
                <td className="px-4 py-3 text-navy/70">{e.email}<br /><span className="text-xs">{e.phone}</span></td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">{e.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <p className="p-8 text-center text-navy/50">No enquiries yet.</p>}
      </div>
    </div>
  );
}
