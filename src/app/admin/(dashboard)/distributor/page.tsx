'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface DistributorInfo {
  _id: string;
  name: string;
  city: string;
  state: string;
  contact: string;
}

interface Application {
  _id: string;
  applicantName: string;
  businessName: string;
  city: string;
  state: string;
  status: string;
}

export default function DistributorAdminPage() {
  const [data, setData] = useState<{ info: DistributorInfo[]; applications: Application[] }>({ info: [], applications: [] });

  useEffect(() => {
    fetch('/api/content/distributor').then(r => r.json()).then(setData).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-aurora/10">
          <MapPin className="w-6 h-6 text-aurora" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-navy mb-1">Distributor Network</h1>
          <p className="text-navy/60 text-sm">Manage distributor locations and applications.</p>
        </div>
      </motion.div>

      {/* Active Locations */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-silver/10 shadow-sm overflow-hidden"
      >
        <div className="px-6 lg:px-8 py-5 border-b border-silver/10 bg-gradient-to-r from-aurora/5 to-aqua/5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-gradient-to-b from-aurora to-aqua rounded-full" />
            <h3 className="font-heading font-semibold text-navy text-lg">Active Locations</h3>
          </div>
        </div>
        {data.info?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ice/30 border-b border-silver/10">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">State</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Contact</th>
                </tr>
              </thead>
              <tbody>
                {data.info.map((d) => (
                  <tr key={d._id} className="border-t border-silver/10 hover:bg-ice/20 transition-colors">
                    <td className="px-6 py-3.5 text-navy font-medium">{d.name}</td>
                    <td className="px-6 py-3.5 text-navy/70">{d.city}</td>
                    <td className="px-6 py-3.5 text-navy/70">{d.state}</td>
                    <td className="px-6 py-3.5 text-navy/70">{d.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-8 text-center text-navy/50">No active locations yet.</p>
        )}
      </motion.div>

      {/* Applications */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-silver/10 shadow-sm overflow-hidden"
      >
        <div className="px-6 lg:px-8 py-5 border-b border-silver/10 bg-gradient-to-r from-aurora/5 to-aqua/5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-gradient-to-b from-aurora to-aqua rounded-full" />
            <h3 className="font-heading font-semibold text-navy text-lg">Applications</h3>
          </div>
        </div>
        {data.applications?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ice/30 border-b border-silver/10">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Business</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.applications.map((a) => (
                  <tr key={a._id} className="border-t border-silver/10 hover:bg-ice/20 transition-colors">
                    <td className="px-6 py-3.5 text-navy font-medium">{a.applicantName}</td>
                    <td className="px-6 py-3.5 text-navy/70">{a.businessName}</td>
                    <td className="px-6 py-3.5 text-navy/70">{a.city}, {a.state}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${a.status === 'approved' ? 'bg-green-50 text-green-600' : a.status === 'rejected' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600'}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-8 text-center text-navy/50">No applications yet.</p>
        )}
      </motion.div>
    </div>
  );
}
