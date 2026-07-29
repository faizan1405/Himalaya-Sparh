'use client';

import { useState } from 'react';

interface Props {
  data: any;
  contentType: string;
  onSave: (data: any) => void;
  saving: boolean;
}

export function AdminContentEditor({ data, contentType, onSave, saving }: Props) {
  const [form, setForm] = useState(data || {});

  const handleChange = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleNestedChange = (parent: string, key: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [parent]: { ...(prev[parent] || {}), [key]: value },
    }));
  };

  const renderField = (key: string, value: any) => {
    if (key === 'updatedAt' || key === '_id' || key === 'createdAt') return null;

    if (key === 'socialLinks' || key === 'seo' || key === 'customer') {
      return (
        <div key={key} className="space-y-3">
          <h3 className="font-medium text-navy capitalize text-sm uppercase tracking-wider">{key}</h3>
          <div className="bg-ice/30 rounded-xl p-4 space-y-3">
            {Object.entries(value || {}).map(([subKey, subValue]) => (
              <div key={subKey}>
                <label className="block text-sm text-navy/70 mb-1 capitalize">{subKey}</label>
                <input
                  type="text"
                  value={subValue as string || ''}
                  onChange={(e) => handleNestedChange(key, subKey, e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-silver/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (key === 'features' || key === 'components' || key === 'images') {
      return (
        <div key={key} className="space-y-3">
          <h3 className="font-medium text-navy capitalize text-sm uppercase tracking-wider">{key}</h3>
          <textarea
            value={Array.isArray(value) ? value.join('\n') : (value || '')}
            onChange={(e) => handleChange(key, e.target.value.split('\n').filter(Boolean))}
            rows={4}
            className="w-full px-3 py-2 bg-white border border-silver/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="One item per line"
          />
        </div>
      );
    }

    if (key === 'keywords') {
      return (
        <div key={key} className="space-y-3">
          <h3 className="font-medium text-navy capitalize text-sm uppercase tracking-wider">{key}</h3>
          <input
            type="text"
            value={Array.isArray(value) ? value.join(', ') : (value || '')}
            onChange={(e) => handleChange(key, e.target.value.split(',').map(k => k.trim()).filter(Boolean))}
            className="w-full px-3 py-2 bg-white border border-silver/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Comma-separated keywords"
          />
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <label key={key} className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleChange(key, e.target.checked)}
            className="w-4 h-4 text-blue-500 rounded"
          />
          <span className="text-sm text-navy/70 capitalize">{key}</span>
        </label>
      );
    }

    if (typeof value === 'number') {
      return (
        <div key={key}>
          <label className="block text-sm text-navy/70 mb-1 capitalize">{key}</label>
          <input
            type="number"
            value={value || 0}
            onChange={(e) => handleChange(key, parseFloat(e.target.value))}
            className="w-full px-3 py-2 bg-white border border-silver/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    }

    if (key.includes('date') || key.includes('Date')) {
      return (
        <div key={key}>
          <label className="block text-sm text-navy/70 mb-1 capitalize">{key}</label>
          <input
            type="date"
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full px-3 py-2 bg-white border border-silver/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    }

    if (typeof value === 'string' && value.length > 200) {
      return (
        <div key={key}>
          <label className="block text-sm text-navy/70 mb-1 capitalize">{key}</label>
          <textarea
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            rows={5}
            className="w-full px-3 py-2 bg-white border border-silver/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      );
    }

    return (
      <div key={key}>
        <label className="block text-sm text-navy/70 mb-1 capitalize">{key}</label>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full px-3 py-2 bg-white border border-silver/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-silver/20 p-6">
      <div className="space-y-5">
        {data && Object.entries(data).map(([key, value]: [string, any]) => (
          <div key={key} className="border-b border-silver/10 pb-5 last:border-0">
            {renderField(key, value)}
          </div>
        ))}
        {!data && <p className="text-navy/50">No data available.</p>}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="btn-primary disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
