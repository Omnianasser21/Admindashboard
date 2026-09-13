import { createContext, useContext, useState, useCallback } from 'react';
import { auth } from '@/services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => auth.getCurrentUser());

  const login = useCallback(async (email, password) => {
    const u = await auth.login(email, password);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const u = await auth.register(name, email, password);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    auth.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
