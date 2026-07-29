'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/app/admin/(dashboard)/layout';
import { AdminContentEditor } from '@/components/admin/AdminContentEditor';

interface AdminPageProps {
  contentType: string;
  title: string;
  description: string;
}

export function AdminPage({ contentType, title, description }: AdminPageProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/content?type=${contentType}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [contentType]);

  const handleSave = async (updated: any) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/content?type=${contentType}`, {
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

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-navy mb-2">{title}</h1>
          <p className="text-navy/60">{description}</p>
        </div>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
            {message}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-12 bg-silver/20 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <AdminContentEditor data={data} contentType={contentType} onSave={handleSave} saving={saving} />
        )}
      </div>
    </AdminLayout>
  );
}
