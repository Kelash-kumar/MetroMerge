'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'vendor';
  avatar?: string;
  vendorId?: string; // For vendor users
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: 'admin' | 'vendor') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, User> = {
  'admin@metromerge.com': {
    id: '1',
    name: 'Super Admin',
    email: 'admin@metromerge.com',
    role: 'admin',
    avatar: '/placeholder-user.jpg'
  },
  'vendor@metromerge.com': {
    id: '2',
    name: 'Metro Express',
    email: 'vendor@metromerge.com',
    role: 'vendor',
    avatar: '/placeholder-user.jpg',
    vendorId: 'vendor-1'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session (only on client side)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('metromerge_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('metromerge_user');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers[email];
    if (user && password === 'password') {
      setUser(user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('metromerge_user', JSON.stringify(user));
      }
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('metromerge_user');
    }
  };

  const switchRole = (role: 'admin' | 'vendor') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('metromerge_user', JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, switchRole }}>
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
