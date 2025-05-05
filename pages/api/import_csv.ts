// pages/api/import_csv.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

type Tx = {
  transaction_id: string;
  date: string;
  amount: number;
  name: string;
  category?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { userId, transactions }: { userId: string; transactions: Tx[] } = req.body;

  // upsert into Supabase
  const toUpsert = transactions.map((t) => ({
    ...t,
    user_id: userId,
  }));
  const { error } = await supabase
    .from('transactions')
    .upsert(toUpsert, { onConflict: 'transaction_id' });

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ count: toUpsert.length });
}
