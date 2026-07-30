'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';

export default function PartnershipAdminPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/content/partnership').then(r => r.json()).then(setData).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-aurora/10">
          <Handshake className="w-6 h-6 text-aurora" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-navy mb-1">Partnership Enquiries</h1>
          <p className="text-navy/60 text-sm">Manage business partnership requests.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-silver/10 shadow-sm overflow-hidden"
      >
        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ice/30 border-b border-silver/10">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((p) => (
                  <tr key={p._id} className="border-t border-silver/10 hover:bg-ice/20 transition-colors">
                    <td className="px-6 py-3.5 text-navy font-medium">{p.fullName}</td>
                    <td className="px-6 py-3.5 text-navy/70">{p.companyName}</td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600">{p.partnershipType}</span>
                    </td>
                    <td className="px-6 py-3.5 text-navy/70">
                      {p.email}
                      <br />
                      <span className="text-xs text-navy/50">{p.phone}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${p.status === 'approved' ? 'bg-green-50 text-green-600' : p.status === 'rejected' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Handshake className="w-12 h-12 text-navy/10 mx-auto mb-3" />
            <p className="text-navy/50">No partnership enquiries yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
