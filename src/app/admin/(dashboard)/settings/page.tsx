'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminContentEditor } from '@/components/admin/AdminContentEditor';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/content?type=settings').then(r => r.json()).then(d => { setData(d); }).catch(() => {});
  }, []);

  const handleSave = async (updated: any) => {
    setSaving(true);
    try {
      const res = await fetch('/api/content?type=settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
      if (res.ok) { setData(updated); setMessage('Saved successfully!'); setTimeout(() => setMessage(''), 3000); }
    } catch { setMessage('Failed to save'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Site Settings"
        description="Manage global site settings, contact information, and social links."
        icon={<Settings className="w-6 h-6" />}
        successMessage={message || undefined}
      />
      <AdminContentEditor data={data} contentType="settings" onSave={handleSave} saving={saving} />
    </div>
  );
}
