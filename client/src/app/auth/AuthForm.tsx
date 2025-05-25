"use client";

import { useState } from 'react';
import { useAuth } from './useAuth';

export default function AuthForm({ mode = 'signin' }) {
  const { handleSignup, handleSignin, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'signup') {
      await handleSignup({ email, password, role });
    } else {
      await handleSignin({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="ایمیل" required />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="رمز عبور" type="password" required />
      {mode === 'signup' && (
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="USER">کاربر</option>
          <option value="SELLER">فروشنده</option>
          <option value="ADMIN">ادمین</option>
        </select>
      )}
      <button type="submit" disabled={loading}>{mode === 'signup' ? 'ثبت نام' : 'ورود'}</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}
