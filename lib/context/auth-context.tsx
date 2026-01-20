'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getStoredUser, getAuthToken } from '../api/auth';

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  shoppingPreference?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state from localStorage (client-side only)
    const storedUser = getStoredUser();
    const storedToken = getAuthToken();

    if (storedUser) setUser(storedUser);
    if (storedToken) setToken(storedToken);
    
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        setUser,
        setToken,
        logout: handleLogout,
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
