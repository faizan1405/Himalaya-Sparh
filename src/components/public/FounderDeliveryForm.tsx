'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FounderDeliveryFormData {
  name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  pincode: string;
  preferredDate: string;
  units: string;
  message: string;
  consent: boolean;
}

export default function FounderDeliveryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/forms/founder-delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          state: formData.get('state'),
          city: formData.get('city'),
          pincode: formData.get('pincode'),
          preferredDate: formData.get('preferredDate'),
          units: parseInt(formData.get('units') as string),
          message: formData.get('message'),
          consent: formData.get('consent') === 'on',
        }),
      });

      if (res.ok) setSubmitted(true);
    } catch {
      alert('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-silver/20"
    >
      <h3 className="font-heading font-bold text-navy text-2xl mb-6">Request Founder Delivery</h3>

      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h4 className="font-heading font-bold text-navy text-xl mb-2">Request Submitted!</h4>
          <p className="text-navy/60 text-sm">We'll contact you within 24 hours to confirm your delivery.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="name" required placeholder="Full Name *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="phone" required placeholder="Phone Number *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <input name="email" type="email" required placeholder="Email Address *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="state" required placeholder="State *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="city" required placeholder="City *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="pincode" required placeholder="PIN Code *" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input name="preferredDate" type="date" required className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <input name="units" type="number" min="1" defaultValue="1" placeholder="Number of Units" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea name="message" rows={3} placeholder="Any additional message" className="w-full px-4 py-3 bg-ice/50 border border-silver/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          <label className="flex items-start gap-3">
            <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 text-blue-500 rounded" />
            <span className="text-sm text-navy/60">I agree to the terms and conditions for Founder Delivery service.</span>
          </label>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      )}
    </motion.div>
  );
}
