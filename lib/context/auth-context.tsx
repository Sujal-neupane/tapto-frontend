'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { getStoredUser, getAuthToken, logout as logoutApi } from '../api/auth';
import { setCookie, deleteCookie } from 'cookies-next';

interface User {
  _id?: string;
  id?: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  shoppingPreference?: string;
  phoneNumber?: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const normalizeUser = useCallback((inputUser: User | null) => {
    if (inputUser && !inputUser._id && inputUser.id) {
      return { ...inputUser, _id: inputUser.id };
    }
    return inputUser;
  }, []);

  // Initialize auth state from localStorage/cookies (client-side only)
  useEffect(() => {
    const storedUser = getStoredUser();
    const storedToken = getAuthToken();

    if (storedUser) setUserState(normalizeUser(storedUser));
    if (storedToken) setTokenState(storedToken);
    
    setIsLoading(false);
  }, [normalizeUser]);

  // Enhanced setUser that also updates cookies
  const setUser = useCallback((newUser: User | null) => {
    const normalizedUser = normalizeUser(newUser);
    setUserState(normalizedUser);
    if (normalizedUser) {
      setCookie('user', JSON.stringify(normalizedUser), {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax',
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(normalizedUser));
      }
    } else {
      deleteCookie('user');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    }
  }, [normalizeUser]);

  // Enhanced setToken that also updates cookies
  const setToken = useCallback((newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      setCookie('authToken', newToken, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax',
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', newToken);
      }
    } else {
      deleteCookie('authToken');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  const handleLogout = useCallback(() => {
    logoutApi();
    setUserState(null);
    setTokenState(null);
  }, []);

  const refreshUser = useCallback(() => {
    const storedUser = getStoredUser();
    const storedToken = getAuthToken();
    if (storedUser) setUserState(storedUser);
    if (storedToken) setTokenState(storedToken);
  }, []);

  const isAuthenticated = !!token || !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        isAdmin,
        setUser,
        setToken,
        logout: handleLogout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
