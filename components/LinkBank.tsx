// components/LinkBank.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { supabase } from '../lib/supabaseClient';

export default function LinkBank({ userId }: { userId: string }) {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  // ─── fetch link token ─────────────────────────────────────────────────────────
  useEffect(() => {
    axios
      .post('/api/create_link_token', { userId })
      .then((r) => setLinkToken(r.data.linkToken))
      .catch(console.error);
  }, [userId]);

  const { open, ready } = usePlaidLink({
    token: linkToken ?? '',
    onSuccess: async (public_token) => {
      await axios.post('/api/exchange_public_token', { public_token, userId });
      // you can now fetch transactions…
    },
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready || !linkToken}
      className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      title="Link a bank account via Plaid"
    >
      Link Bank Account
    </button>
  );
}
