// pages/index.tsx
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace('/dashboard');
      }
    });
  }, []);

  const handleEmailSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      // on success, immediately navigate to dashboard
      router.replace('/dashboard');
    }
  };

  const handleGoogle = () =>
    supabase.auth.signInWithOAuth({ provider: 'google' }).then(() => router.replace('/dashboard'));
  const handleApple = () =>
    supabase.auth.signInWithOAuth({ provider: 'apple' }).then(() => router.replace('/dashboard'));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-auto bg-gradient-to-br from-primary via-accent to-purple-800">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full border rounded-full py-2 mb-4 hover:bg-gray-100 flex justify-center"
            aria-label="Continue with Google"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={handleApple}
            className="w-full border rounded-full py-2 mb-4 hover:bg-gray-100 flex justify-center"
            aria-label="Continue with Apple ID"
          >
            Continue with Apple ID
          </button>

          <div className="text-center text-sm text-gray-500 uppercase mb-6">
            or sign in with email
          </div>

          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2 mb-4"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border rounded-md p-2 mb-4"
          />

          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
            <button
              type="button"
              onClick={handleEmailSignIn}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500"
              aria-label="Sign In"
            >
              Sign In
            </button>
          </div>

          {message && <p className="text-red-600 text-sm">{message}</p>}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right Panel */}
        <div className="bg-green-100 rounded-3xl p-8">
          <h3 className="text-xl font-semibold mb-4">
            Talk, track, and grow your money, all on Wealth Manager.
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>✔️ Access spending and budgeting tools</li>
            <li>✔️ Track your net worth, portfolio, equity, and credit score</li>
            <li>✔️ File your taxes for free</li>
            <li>✔️ Grow your savings with our high-yield cash account</li>
            <li>✔️ Invest with no advisory fees or minimums</li>
            <li>✔️ Get AI-powered financial guidance</li>
            <li>✔️ Create an estate plan in 20 minutes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
