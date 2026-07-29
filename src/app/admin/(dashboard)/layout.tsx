'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Settings,
  Users,
  Package,
  FileText,
  MessageSquare,
  ShoppingCart,
  Truck,
  MapPin,
  Handshake,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
  { label: 'Hero Content', href: '/admin/dashboard/hero', icon: FileText },
  { label: 'About Us', href: '/admin/dashboard/about', icon: Users },
  { label: 'Leadership', href: '/admin/dashboard/leadership', icon: Users },
  { label: 'Device Science', href: '/admin/dashboard/device-science', icon: Package },
  { label: 'Components', href: '/admin/dashboard/device-components', icon: Package },
  { label: 'How It Works', href: '/admin/dashboard/how-it-works', icon: FileText },
  { label: 'Lab Reports', href: '/admin/dashboard/lab-reports', icon: FileText },
  { label: 'Testimonials', href: '/admin/dashboard/testimonials', icon: MessageSquare },
  { label: 'Products', href: '/admin/dashboard/buy', icon: ShoppingCart },
  { label: 'Orders', href: '/admin/dashboard/orders', icon: ShoppingCart },
  { label: 'Founder Delivery', href: '/admin/dashboard/founder-delivery', icon: Truck },
  { label: 'Distributors', href: '/admin/dashboard/distributor', icon: MapPin },
  { label: 'Partnerships', href: '/admin/dashboard/business', icon: Handshake },
  { label: 'Contact Enquiries', href: '/admin/dashboard/contact', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const role = (session.user as any).role;

  return (
    <div className="min-h-screen bg-ice/30">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-navy text-white overflow-y-auto z-40 hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-aqua rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">HS</span>
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm">Himalya Sparsh</h2>
              <p className="text-silver text-xs">Admin Panel</p>
            </div>
          </div>

          <div className="mb-4 px-3">
            <span className="text-xs text-silver uppercase tracking-wider">{role?.replace('_', ' ') || 'Admin'}</span>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-silver hover:text-white hover:bg-white/10 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm">
              {(session.user as any)?.name?.[0] || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium">{(session.user as any)?.name}</p>
              <p className="text-xs text-silver">{(session.user as any)?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-sm text-silver hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden bg-navy text-white p-4 flex items-center justify-between sticky top-0 z-30">
          <span className="font-heading font-bold">Himalya Sparsh Admin</span>
          <button onClick={() => signOut()} className="text-sm text-silver">Sign Out</button>
        </div>
        {children}
      </div>
    </div>
  );
}