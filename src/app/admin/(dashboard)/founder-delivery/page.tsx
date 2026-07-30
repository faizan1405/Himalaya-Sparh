'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

interface FounderRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  units: number;
  status: string;
}

export default function FounderDeliveryAdminPage() {
  const [data, setData] = useState<FounderRequest[]>([]);

  useEffect(() => {
    fetch('/api/content?type=founderDeliveryRequests').then(r => r.json()).then(setData).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-aurora/10">
          <Truck className="w-6 h-6 text-aurora" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-navy mb-1">Founder Delivery</h1>
          <p className="text-navy/60 text-sm">Manage founder delivery requests.</p>
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
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Units</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((r) => (
                  <tr key={r._id} className="border-t border-silver/10 hover:bg-ice/20 transition-colors">
                    <td className="px-6 py-3.5 text-navy font-medium">{r.name}</td>
                    <td className="px-6 py-3.5 text-navy/70">
                      {r.phone}
                      <br />
                      <span className="text-xs text-navy/50">{r.email}</span>
                    </td>
                    <td className="px-6 py-3.5 text-navy/70">{r.city}, {r.state}</td>
                    <td className="px-6 py-3.5 text-navy/70">{r.units}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${r.status === 'new' ? 'bg-aurora/10 text-aurora' : r.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Truck className="w-12 h-12 text-navy/10 mx-auto mb-3" />
            <p className="text-navy/50">No founder delivery requests yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
