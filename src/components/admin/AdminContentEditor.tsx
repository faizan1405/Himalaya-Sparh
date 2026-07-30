'use client';

import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

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
          <h3 className="font-medium text-navy/80 capitalize text-sm uppercase tracking-wider">{key}</h3>
          <div className="bg-ice/50 rounded-2xl p-5 border border-silver/10 space-y-3">
            {Object.entries(value || {}).map(([subKey, subValue]) => (
              <div key={subKey}>
                <label className="block text-sm text-navy/70 mb-1.5 capitalize">{subKey}</label>
                <input
                  type="text"
                  value={subValue as string || ''}
                  onChange={(e) => handleNestedChange(key, subKey, e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/30 text-navy transition-all"
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
          <h3 className="font-medium text-navy/80 capitalize text-sm uppercase tracking-wider">{key}</h3>
          <textarea
            value={Array.isArray(value) ? value.join('\n') : (value || '')}
            onChange={(e) => handleChange(key, e.target.value.split('\n').filter(Boolean))}
            rows={4}
            className="w-full px-4 py-2.5 bg-white border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/30 resize-none text-navy transition-all"
            placeholder="One item per line"
          />
        </div>
      );
    }

    if (key === 'keywords') {
      return (
        <div key={key} className="space-y-3">
          <h3 className="font-medium text-navy/80 capitalize text-sm uppercase tracking-wider">{key}</h3>
          <input
            type="text"
            value={Array.isArray(value) ? value.join(', ') : (value || '')}
            onChange={(e) => handleChange(key, e.target.value.split(',').map(k => k.trim()).filter(Boolean))}
            className="w-full px-4 py-2.5 bg-white border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/30 text-navy transition-all"
            placeholder="Comma-separated keywords"
          />
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <label key={key} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleChange(key, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-silver/30 peer-checked:bg-aurora rounded-full transition-colors peer-focus:ring-2 peer-focus:ring-aurora/30" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-4 transition-transform" />
          </div>
          <span className="text-sm text-navy/70 capitalize">{key}</span>
        </label>
      );
    }

    if (typeof value === 'number') {
      return (
        <div key={key}>
          <label className="block text-sm text-navy/70 mb-1.5 capitalize">{key}</label>
          <input
            type="number"
            value={value || 0}
            onChange={(e) => handleChange(key, parseFloat(e.target.value))}
            className="w-full px-4 py-2.5 bg-white border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/30 text-navy transition-all"
          />
        </div>
      );
    }

    if (key.includes('date') || key.includes('Date')) {
      return (
        <div key={key}>
          <label className="block text-sm text-navy/70 mb-1.5 capitalize">{key}</label>
          <input
            type="date"
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/30 text-navy transition-all"
          />
        </div>
      );
    }

    if (typeof value === 'string' && value.length > 200) {
      return (
        <div key={key}>
          <label className="block text-sm text-navy/70 mb-1.5 capitalize">{key}</label>
          <textarea
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            rows={5}
            className="w-full px-4 py-2.5 bg-white border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/30 resize-none text-navy transition-all"
          />
        </div>
      );
    }

    return (
      <div key={key}>
        <label className="block text-sm text-navy/70 mb-1.5 capitalize">{key}</label>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-silver/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-aurora/40 focus:border-aurora/30 text-navy transition-all"
        />
      </div>
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-silver/10 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="px-6 lg:px-8 py-5 border-b border-silver/10 bg-gradient-to-r from-aurora/5 to-aqua/5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-gradient-to-b from-aurora to-aqua rounded-full" />
          <h3 className="font-heading font-semibold text-navy text-lg capitalize">{contentType} Content</h3>
        </div>
        <p className="text-navy/50 text-sm mt-1 ml-3.5">Edit and manage this section&apos;s content</p>
      </div>

      {/* Form fields */}
      <div className="p-6 lg:p-8 space-y-5">
        {data && Object.entries(data).map(([key, value]: [string, any]) => (
          <div key={key} className={key !== 'features' && key !== 'components' && key !== 'images' && key !== 'keywords' && key !== 'socialLinks' && key !== 'seo' && key !== 'customer' && typeof value !== 'boolean' ? 'border-b border-silver/10 pb-5 last:border-0' : ''}>
            {renderField(key, value)}
          </div>
        ))}
        {!data && <p className="text-navy/50">No data available.</p>}
      </div>

      {/* Save bar */}
      <div className="px-6 lg:px-8 py-5 border-t border-silver/10 bg-ice/20 flex items-center justify-between">
        <span className="text-xs text-navy/40">Changes are saved immediately to the database</span>
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-aurora to-aqua text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-aurora/20 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 text-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
