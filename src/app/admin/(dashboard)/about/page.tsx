'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminContentEditor } from '@/components/admin/AdminContentEditor';
import { FileText } from 'lucide-react';

export default function AboutPage() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/content/about').then(r => r.json()).then(d => setData(d)).catch(() => {});
  }, []);

  const handleSave = async (updated: any) => {
    setSaving(true);
    try {
      const res = await fetch('/api/content/about', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
      if (res.ok) { setData(updated); setMessage('Saved!'); setTimeout(() => setMessage(''), 3000); }
    } catch { setMessage('Failed'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-aurora" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-navy mb-1">About Us</h1>
          <p className="text-navy/60 text-sm">Manage introduction, vision, mission, and story content.</p>
        </div>
      </motion.div>

      {/* Status message */}
      {message && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200/60 text-green-700 rounded-xl text-sm">
          {message}
        </motion.div>
      )}

      {/* Editor */}
      <AdminContentEditor data={data} contentType="aboutIntro" onSave={handleSave} saving={saving} />
    </div>
  );
}
