'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminContentEditor } from '@/components/admin/AdminContentEditor';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Home } from 'lucide-react';

export default function HeroPage() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/content/hero').then(r => r.json()).then(d => setData(d)).catch(() => {});
  }, []);

  const handleSave = async (updated: any) => {
    setSaving(true);
    try {
      const res = await fetch('/api/content/hero', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
      if (res.ok) { setData(updated); setMessage('Saved successfully!'); setTimeout(() => setMessage(''), 3000); }
    } catch { setMessage('Failed to save'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Hero Section"
        description="Manage homepage hero headline, tagline, and CTA buttons."
        icon={<Home className="w-6 h-6" />}
        successMessage={message || undefined}
      />
      <AdminContentEditor data={data} contentType="hero" onSave={handleSave} saving={saving} />
    </div>
  );
}
