import { NextRequest, NextResponse } from 'next/server';

// Admin routes - require admin role
const adminRoutes = ['/admin'];

// Protected user routes - require authentication
const protectedUserRoutes = ['/user', '/profile', '/settings', '/orders', '/cart'];

// Auth routes - should redirect to dashboard if already logged in
const authRoutes = ['/auth/login', '/auth/register', '/auth/forgotpassword', '/login', '/register'];

// Completely public routes (no auth checks, no redirects)
const publicRoutes = ['/', '/landingpage', '/products', '/auth/landingpage', '/dashboard'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth data from cookies
  const authToken = request.cookies.get('authToken')?.value;
  const userCookie = request.cookies.get('user')?.value;

  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (e) {
      // Invalid user cookie - treat as unauthenticated
    }
  }

  const isAuthenticated = !!authToken && !!user;
  const isAdmin = user?.role === 'admin';

  // Check route types
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isProtectedUserRoute = protectedUserRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'));
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'));

  // PUBLIC ROUTES - allow access without any checks
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // AUTH ROUTES (login/register) - redirect to dashboard if already authenticated
  if (isAuthRoute) {
    if (isAuthenticated) {
      if (isAdmin) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Not authenticated - allow access to auth pages
    return NextResponse.next();
  }

  // ADMIN ROUTES - require admin role
  if (isAdminRoute) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!isAdmin) {
      // User is authenticated but not admin - redirect to user dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // PROTECTED USER ROUTES - require authentication
  if (isProtectedUserRoute) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Default - allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
