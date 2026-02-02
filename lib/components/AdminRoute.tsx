"use client";
import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, token } = useAuth();
  const router = useRouter();
  const [cookieHasToken, setCookieHasToken] = useState(false);
  const [localHasToken, setLocalHasToken] = useState(false);
  const [cookieHasUser, setCookieHasUser] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const hasCookie = document.cookie.split(';').some(c => c.trim().startsWith('authToken='));
      setCookieHasToken(hasCookie);
      const hasUserCookie = document.cookie.split(';').some(c => c.trim().startsWith('user='));
      setCookieHasUser(hasUserCookie);
    }
    if (typeof window !== 'undefined') {
      setLocalHasToken(!!window.localStorage.getItem('authToken'));
    }
  }, []);

  const hasAnyToken = !!(token || cookieHasToken || localHasToken);
  const hasAnyAuth = !!(isAuthenticated || hasAnyToken || cookieHasUser || user);

  useEffect(() => {
    // If we have some auth signal (token or user cookie), wait for user role to load
    // Only redirect when we know user exists and is not admin, or no auth at all
    const isAdmin = user?.role === 'admin';
    const shouldRedirect = !isLoading && (!hasAnyAuth || (user && !isAdmin));
    if (shouldRedirect) {
      router.replace('/auth/login');
    }
  }, [hasAnyAuth, isLoading, user, router]);

  const isAdmin = user?.role === 'admin';
  if (isLoading || !hasAnyAuth || (user && !isAdmin)) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  return <>{children}</>;
}
