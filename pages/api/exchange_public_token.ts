import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { supabase } from '../../lib/supabaseClient';

const client = new PlaidApi(
  new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV!],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID!,
        'PLAID-SECRET': process.env.PLAID_SECRET!,
      },
    },
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { public_token, userId } = req.body;
    const exchange = await client.itemPublicTokenExchange({ public_token });
    const accessToken = exchange.data.access_token;

    // store in Supabase
    await supabase.from('user_credentials').upsert({ user_id: userId, access_token: accessToken });

    res.status(200).json({ accessToken });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
