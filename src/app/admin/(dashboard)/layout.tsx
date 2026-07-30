'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  ChevronDown,
  Menu,
  X,
  BarChart3,
  Shield,
  Star,
  FlaskConical,
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
  { label: 'Hero Content', href: '/admin/dashboard/hero', icon: FileText },
  { label: 'About Us', href: '/admin/dashboard/about', icon: Users },
  { label: 'Leadership', href: '/admin/dashboard/leadership', icon: Users },
  { label: 'Device Science', href: '/admin/dashboard/device-science', icon: FlaskConical },
  { label: 'Components', href: '/admin/dashboard/device-components', icon: Package },
  { label: 'How It Works', href: '/admin/dashboard/how-it-works', icon: FileText },
  { label: 'Lab Reports', href: '/admin/dashboard/lab-reports', icon: Shield },
  { label: 'Testimonials', href: '/admin/dashboard/testimonials', icon: Star },
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
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy">
        <div className="relative">
          <div className="w-12 h-12 border-3 border-white/10 border-t-aurora rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!session) return null;

  const role = (session.user as any).role;

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice/40 via-white to-ice/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 w-72 h-screen bg-navy text-white overflow-y-auto z-50 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:block`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-aurora to-aqua rounded-xl flex items-center justify-center shadow-lg shadow-aurora/20">
                <span className="text-white font-bold text-sm">HS</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-sm text-white">Himalya Sparsh</h2>
                <p className="text-silver/70 text-xs">Admin Panel</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-silver hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Role Badge */}
        <div className="px-6 py-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-silver/80">
            <Shield className="w-3 h-3" />
            {role?.replace('_', ' ') || 'Admin'}
          </span>
        </div>

        {/* Navigation */}
        <nav className="px-4 pb-4 space-y-0.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-aurora/20 to-aqua/10 text-white border border-aurora/20'
                    : 'text-silver/70 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-aurora' : 'text-silver/50 group-hover:text-silver'}`} />
                <span className="flex-1">{item.label}</span>
                {isActive && <div className="w-1.5 h-1.5 bg-aurora rounded-full" />}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-navy/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 bg-gradient-to-br from-aurora/20 to-aqua/10 border border-white/10 rounded-full flex items-center justify-center text-sm text-aurora font-medium">
              {(session.user as any)?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{(session.user as any)?.name}</p>
              <p className="text-xs text-silver/60 truncate">{(session.user as any)?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-silver/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 border border-transparent hover:border-white/10"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden bg-navy/95 backdrop-blur-md text-white p-4 flex items-center justify-between sticky top-0 z-30 border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)} className="text-silver hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-heading font-bold text-sm">Himalya Sparsh Admin</span>
          <div className="w-5" />
        </div>

        {/* Content area */}
        <main className="p-6 lg:p-10 max-w-7xl">
          {children}
        </main>
      </div>
    </div>
  );
}