'use client';
import { supabase } from '../supabaseClient';

export default function Login() {
  async function handleLogin() {
    const email = prompt('Email?');
    if (!email) return;
    await supabase.auth.signInWithOtp({ email });
    alert('Check your email for the magic link!');
  }
  return (
    <main className="flex h-screen items-center justify-center">
      <button onClick={handleLogin} className="btn btn-primary">
        Log In
      </button>
    </main>
  );
}