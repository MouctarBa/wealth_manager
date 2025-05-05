import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const rows = req.body.rows as any[];
  const { error } = await supabase.from('transactions').insert(rows);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ status: 'ok' });
}
