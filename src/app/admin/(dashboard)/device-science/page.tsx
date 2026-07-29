'use client';

import { useState, useEffect } from 'react';
import { AdminContentEditor } from '@/components/admin/AdminContentEditor';

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
        setMessage('Saved!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Failed');
    } finally {
      setSaving(false);
    }
  };

  if (!data) {
    return (
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-navy mb-2">Device Science</h1>
          <p className="text-navy/60">Manage science content, features, and 3D model settings.</p>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-silver/20 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Device Science</h1>
        <p className="text-navy/60">Manage science content, features, and 3D model settings.</p>
      </div>
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
          {message}
        </div>
      )}
      <AdminContentEditor data={data} contentType="deviceScience" onSave={handleSave} saving={saving} />
    </div>
  );
}
