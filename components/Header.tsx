// components/Header.tsx
'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaQuestionCircle, FaCog, FaRegUser } from 'react-icons/fa';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { supabase } from '../lib/supabaseClient';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

export default function Header({ title, children }: HeaderProps) {
  const router = useRouter();

  // ─── get current userId ──────────────────────────────────────────────────────
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user.id ?? null);
    });
  }, []);

  // ─── Plaid link setup ─────────────────────────────────────────────────────────
  const [linkToken, setLinkToken] = useState<string | null>(null);
  useEffect(() => {
    if (!userId) return;
    axios
      .post('/api/create_link_token', { userId })
      .then((res) => setLinkToken(res.data.linkToken))
      .catch(console.error);
  }, [userId]);

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess: async (public_token) => {
      if (!userId) return;
      await axios.post('/api/exchange_public_token', { public_token, userId });
      // optionally refresh data or navigate
      router.replace(router.asPath);
    },
  });

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      {/* Left: optional hamburger + title */}
      <div className="flex items-center space-x-4">
        {children}
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      {/* Right-side controls */}
      <div className="flex items-center space-x-4">
        {/* Link Bank / Add Account button */}
        <button
          onClick={() => open()}
          disabled={!ready}
          className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
          title="Link a bank account"
        >
          <span className="text-sm font-medium">Add Account</span>
        </button>

        {/* Help icon */}
        <button
          onClick={() => router.push('/help')}
          aria-label="Help"
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          title="Help"
        >
          <FaQuestionCircle className="text-lg" />
        </button>

        {/* Settings icon */}
        <button
          onClick={() => router.push('/settings')}
          aria-label="Settings"
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          title="Settings"
        >
          <FaCog className="text-lg" />
        </button>

        {/* User profile */}
        <button
          onClick={() => router.push('/profile')}
          aria-label="Profile"
          className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
          title="Profile"
        >
          <FaRegUser />
        </button>
      </div>
    </header>
  );
}
