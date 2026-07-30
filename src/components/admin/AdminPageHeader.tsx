'use client';

import { motion } from 'framer-motion';

interface AdminPageHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  successMessage?: string;
}

export function AdminPageHeader({ title, description, icon, successMessage }: AdminPageHeaderProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-aurora/10">
          <span className="text-aurora">{icon}</span>
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-navy mb-1">{title}</h1>
          <p className="text-navy/60 text-sm">{description}</p>
        </div>
      </motion.div>

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-50/80 border border-green-200/60 text-green-700 rounded-xl text-sm"
        >
          {successMessage}
        </motion.div>
      )}
    </div>
  );
}
