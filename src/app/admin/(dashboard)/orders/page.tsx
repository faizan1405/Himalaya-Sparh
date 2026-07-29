'use client';

import { useEffect, useState } from 'react';

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

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-navy mb-2">Orders</h1>
        <p className="text-navy/60">Manage and track customer orders.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-silver/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ice/50">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id} className="border-t border-silver/10">
                <td className="px-4 py-3 text-navy font-medium">{o.orderId}</td>
                <td className="px-4 py-3 text-navy/70">{o.customer.name}</td>
                <td className="px-4 py-3 text-navy/70">₹{o.total}</td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">{o.status}</span></td>
                <td className="px-4 py-3"><span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">{o.paymentStatus}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="p-8 text-center text-navy/50">No orders yet.</p>}
      </div>
    </div>
  );
}
