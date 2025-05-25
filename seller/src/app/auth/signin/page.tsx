"use client";

import AuthForm from '../AuthForm';

export default function SigninPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">ورود</h1>
      <AuthForm mode="signin" />
    </main>
  );
}
