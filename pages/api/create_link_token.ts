// pages/api/create_link_token.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid';

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
    const { userId } = req.body;

    const response = await client.linkTokenCreate({
      user: { client_user_id: userId },
      client_name: 'Wealth Manager',
      products: [Products.Transactions], // use enum
      country_codes: [CountryCode.Us], // snake_case field
      language: 'en',
    });

    res.status(200).json({ linkToken: response.data.link_token });
  } catch (error: any) {
    console.error('LinkTokenCreate error:', error);
    res.status(500).json({ error: error.message });
  }
}
