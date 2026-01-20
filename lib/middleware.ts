import { NextRequest, NextResponse } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings'];

// Public routes that should redirect to dashboard if logged in
const publicRoutes = ['/login', '/register', '/landingpage'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authToken = request.cookies.get('authToken')?.value;
    
    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    // Check if route is public auth route
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    
    // Redirect to login if accessing protected route without token
    if (isProtectedRoute && !authToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Redirect to dashboard if accessing public auth routes with token
    if (isPublicRoute && authToken && pathname !== '/landingpage') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
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
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};
