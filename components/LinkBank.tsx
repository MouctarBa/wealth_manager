'use client';

import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { supabase } from '../lib/supabaseClient';

export default function LinkBank({ userId }: { userId: string }) {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  // 1) fetch a link token
  useEffect(() => {
    axios
      .post('/api/create_link_token', { userId })
      .then((r) => setLinkToken(r.data.linkToken))
      .catch(console.error);
  }, [userId]);

  // 2) initialize Plaid Link
  const { open, ready } = usePlaidLink({
    token: linkToken ?? '',
    onSuccess: async (public_token) => {
      // 3) exchange for access_token
      await axios.post('/api/exchange_public_token', { public_token, userId });
      // now you can call your /api/fetch_transactions, etc.
      alert('Bank linked!');
    },
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      Link Bank Account
    </button>
  );
}
