import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, setAuthToken, getAuthToken, User } from '../services/api';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          console.error('Failed to get current user:', error);
          setAuthToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user: userData } = response.data;
      
      setAuthToken(token);
      setUser(userData);
      toast.success('Logged in successfully!');
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await authAPI.register({ username, email, password });
      // Handle both direct and nested data
      const token = response.token || response.data?.token;
      const userData = response.user || response.data?.user;
      if (token && userData) {
        setAuthToken(token);
        setUser(userData);
        toast.success('Account created successfully!');
      } else if (response.error || response.data?.error) {
        throw new Error(response.error || response.data?.error);
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      const message = error.response?.data?.error || error.message || 'Registration failed. Please try again.';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    toast.success('Logged out successfully!');
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 