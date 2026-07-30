'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface Order {
  _id: string;
  orderId: string;
  customer: { name: string; email: string };
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/content?type=orders').then(r => r.json()).then(setOrders).catch(() => {});
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-50 text-green-600';
      case 'shipped': return 'bg-blue-50 text-blue-600';
      case 'processing': return 'bg-aurora/10 text-aurora';
      case 'pending': return 'bg-amber-50 text-amber-600';
      case 'cancelled': return 'bg-red-50 text-red-500';
      default: return 'bg-silver/20 text-navy/70';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'bg-green-50 text-green-600';
      case 'pending': return 'bg-amber-50 text-amber-600';
      case 'failed': return 'bg-red-50 text-red-500';
      default: return 'bg-silver/20 text-navy/70';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-aurora/10 to-aqua/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-aurora/10">
          <ShoppingBag className="w-6 h-6 text-aurora" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-navy mb-1">Orders</h1>
          <p className="text-navy/60 text-sm">Manage and track customer orders.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-silver/10 shadow-sm overflow-hidden"
      >
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ice/30 border-b border-silver/10">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-navy/70 uppercase tracking-wider">Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-t border-silver/10 hover:bg-ice/20 transition-colors">
                    <td className="px-6 py-3.5 text-navy font-medium font-mono text-xs">{o.orderId}</td>
                    <td className="px-6 py-3.5 text-navy/70">{o.customer?.name || 'N/A'}</td>
                    <td className="px-6 py-3.5 text-navy font-medium">₹{o.total}</td>
                    <td className="px-6 py-3.5 text-navy/70 text-xs">{o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN') : '-'}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(o.status)}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getPaymentColor(o.paymentStatus)}`}>
                        {o.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-navy/10 mx-auto mb-3" />
            <p className="text-navy/50">No orders yet. They will appear here when customers place orders.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
