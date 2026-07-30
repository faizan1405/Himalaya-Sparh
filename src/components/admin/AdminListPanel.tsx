'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AdminListPanelProps {
  title: string;
  description: string;
  icon: ReactNode;
  form: ReactNode;
  headers: string[];
  children?: ReactNode;
  emptyMessage: string;
}

export function AdminListPanel({ title, description, icon, form, headers, children, emptyMessage }: AdminListPanelProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-aurora/10">
          <span className="text-aurora">{icon}</span>
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-navy mb-1">{title}</h1>
          <p className="text-navy/60 text-sm">{description}</p>
        </div>
      </motion.div>

      {/* Form panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-silver/10 shadow-sm overflow-hidden"
      >
        <div className="px-6 lg:px-8 py-5 border-b border-silver/10 bg-gradient-to-r from-aurora/5 to-aqua/5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-gradient-to-b from-aurora to-aqua rounded-full" />
            <h3 className="font-heading font-semibold text-navy text-lg">Add New</h3>
          </div>
          <p className="text-navy/50 text-sm mt-1 ml-3.5">Fill out the form to add a new entry</p>
        </div>
        <div className="p-6 lg:p-8">
          {form}
        </div>
      </motion.div>

      {/* List panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-silver/10 shadow-sm overflow-hidden"
      >
        <div className="px-6 lg:px-8 py-5 border-b border-silver/10 bg-gradient-to-r from-aurora/5 to-aqua/5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-gradient-to-b from-aurora to-aqua rounded-full" />
            <h3 className="font-heading font-semibold text-navy text-lg">Existing Entries</h3>
          </div>
        </div>
        {children ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ice/30 border-b border-silver/10">
                <tr>
                  {headers.map((h) => (
                    <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-navy/50">{emptyMessage}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
