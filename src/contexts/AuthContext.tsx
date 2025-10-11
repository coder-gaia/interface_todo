import { createContext, useContext, useState, type ReactNode } from 'react';

type User = { id: string; username: string; role?: string | null };

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  logout: () => void;
  registerUser: (email: string, password: string, username: string) => Promise<void>;
  registerOwner: (email: string, password: string, username: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  async function login(email: string, password: string, isAdmin = false) {
    const loginRoute = isAdmin ? '/users/login' : '/auth/login';

    const res = await fetch(`http://localhost:3333${loginRoute}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();
    const token = data.token;

    const decodedPayload = JSON.parse(atob(token.split('.')[1]));
    const userData: User = {
      id: decodedPayload.userId,
      username: decodedPayload.username,
      role: decodedPayload.role ?? null
    };

    setToken(token);
    setUser(userData);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  async function registerUser(email: string, password: string, username: string) {
    const res = await fetch('http://localhost:3333/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username })
    });

    if (!res.ok) throw new Error('Failed to register user');
    await login(email, password, false);
  }

  async function registerOwner(email: string, password: string, username: string) {
    const res = await fetch('http://localhost:3333/users/register-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username })
    });

    if (!res.ok) throw new Error('Failed to register owner/admin');
    await login(email, password, true);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, registerUser, registerOwner }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
