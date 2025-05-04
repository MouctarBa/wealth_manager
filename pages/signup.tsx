import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    // Single-argument signUp, with an options field
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    if (error) {
      setMessage(error.message);
    } else {
      // Inform the user to check their email
      setMessage('Confirmation email sent! Please check your inbox.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-auto">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>

        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2 mb-4"
        />

        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mt-1 block w-full border rounded-md p-2 mb-4"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-500"
        >
          Sign Up
        </button>

        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <a href="/" className="text-blue-600 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  )
}