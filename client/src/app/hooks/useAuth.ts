import { useState } from 'react';
import { signup, signin } from './auth.service';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (input) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signup(input);
      localStorage.setItem('token', result.accessToken);
      setUser(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async (input) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signin(input);
      localStorage.setItem('token', result.accessToken);
      setUser(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, error, handleSignup, handleSignin, logout };
}

// این فایل دیگر نیاز نیست و باید حذف شود. لطفاً از نسخه ماژولار در src/app/auth/useAuth.ts استفاده کنید.
