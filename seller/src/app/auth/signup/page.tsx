"use client";

import AuthForm from '../AuthForm';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">ثبت نام</h1>
      <AuthForm mode="signup" />
    </main>
  );
}
