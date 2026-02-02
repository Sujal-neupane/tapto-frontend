
"use client";
import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function UserRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, token, user } = useAuth();
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
    // Treat presence of token (context, cookie or localStorage) as authenticated
    if (!isLoading && !hasAnyAuth) {
      router.replace('/auth/login');
    }
  }, [hasAnyAuth, isLoading, router]);

  if (isLoading || !hasAnyAuth) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  return <>{children}</>;
}
