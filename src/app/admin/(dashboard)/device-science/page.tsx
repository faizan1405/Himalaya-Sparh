'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminContentEditor } from '@/components/admin/AdminContentEditor';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { FlaskConical } from 'lucide-react';

export default function DeviceSciencePage() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/content?type=deviceScience')
      .then(r => r.ok ? r.json() : Promise.resolve(null))
      .then(d => setData(d))
      .catch(() => {});
  }, []);

  const handleSave = async (updated: any) => {
    setSaving(true);
    try {
      const res = await fetch('/api/content?type=deviceScience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setData(updated);
        setMessage('Saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (!data) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Device Science" description="Manage science content, features, and 3D model settings." icon={<FlaskConical className="w-6 h-6" />} />
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-silver/10 shadow-sm p-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-silver/20 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Device Science"
        description="Manage science content, features, and 3D model settings."
        icon={<FlaskConical className="w-6 h-6" />}
        successMessage={message || undefined}
      />
      <AdminContentEditor data={data} contentType="deviceScience" onSave={handleSave} saving={saving} />
    </div>
  );
}
