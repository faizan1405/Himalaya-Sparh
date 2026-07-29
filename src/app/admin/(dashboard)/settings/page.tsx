'use client';

import { useState, useEffect } from 'react';
import { AdminContentEditor } from '@/components/admin/AdminContentEditor';

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
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Site Settings</h1>
        <p className="text-navy/60">Manage global site settings, contact information, and social links.</p>
      </div>
      {message && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">{message}</div>}
      <AdminContentEditor data={data} contentType="settings" onSave={handleSave} saving={saving} />
    </div>
  );
}
