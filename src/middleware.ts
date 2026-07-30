import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that don't require any role (login, API auth endpoints)
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

// Role hierarchy: higher number = more access
const ROLE_RANK: Record<string, number> = {
  super_admin: 100,
  content_manager: 80,
  order_manager: 60,
  enquiry_manager: 40,
};

function hasRole(userRole: string | undefined, requiredRole: string): boolean {
  if (!userRole) return false;
  return (ROLE_RANK[userRole] || 0) >= (ROLE_RANK[requiredRole] || 0);
}

function redirectToLogin(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL('/admin/login', request.url));
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const pathname = request.nextUrl.pathname;

  // Admin routes
  if (pathname.startsWith('/admin')) {
    // Allow login page for unauthenticated users
    if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
      if (token) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // All other admin routes require authentication
    if (!token) {
      return redirectToLogin(request);
    }

    // Role-based access control for specific dashboard sections
    if (pathname.startsWith('/admin/orders') || pathname.startsWith('/admin/founder-delivery')) {
      if (!hasRole(token.role, 'order_manager')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }

    if (pathname.startsWith('/admin/contact') || pathname.startsWith('/admin/distributor') || pathname.startsWith('/admin/business')) {
      if (!hasRole(token.role, 'enquiry_manager')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }

    // Content pages require content_manager or above
    if (
      pathname.startsWith('/admin/hero') ||
      pathname.startsWith('/admin/about') ||
      pathname.startsWith('/admin/leadership') ||
      pathname.startsWith('/admin/how-it-works') ||
      pathname.startsWith('/admin/lab-reports') ||
      pathname.startsWith('/admin/testimonials') ||
      pathname.startsWith('/admin/buy') ||
      pathname.startsWith('/admin/device')
    ) {
      if (!hasRole(token.role, 'content_manager')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }

    // Settings require super_admin
    if (pathname.startsWith('/admin/settings')) {
      if (!hasRole(token.role, 'super_admin')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
