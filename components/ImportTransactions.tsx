// components/ImportTransactions.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Papa from 'papaparse';
import LinkBank from './LinkBank';
import { supabase } from '../lib/supabaseClient';

export default function ImportTransactions() {
  const router = useRouter();

  // ─── get current userId ──────────────────────────────────────────────────────
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user.id ?? null);
    });
  }, []);

  const [tab, setTab] = useState<'link' | 'csv'>('link');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    if (!file || !userId) return;
    setLoading(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const txs = (results.data as any[]).map((row) => ({
          transaction_id: row['Transaction ID'] || `${row.Date}-${row.Amount}-${row.Description}`,
          date: row['Date'],
          amount: parseFloat(row['Amount']),
          name: row['Description'],
          category: row['Category'] || 'Imported',
        }));
        await fetch('/api/import_csv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, transactions: txs }),
        });
        setLoading(false);
        router.replace(router.asPath);
      },
    });
  };

  return (
    <div className="bg-white rounded-md shadow p-6">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setTab('link')}
          className={tab === 'link' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}
        >
          Link Bank
        </button>
        <button
          onClick={() => setTab('csv')}
          className={tab === 'csv' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}
        >
          Import CSV
        </button>
      </div>

      {tab === 'link' && userId && <LinkBank userId={userId} />}

      {tab === 'csv' && (
        <div className="flex flex-col space-y-4">
          <label className="block">
            <span className="sr-only">Upload CSV file</span>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
              title="Choose a CSV file to import"
            />
          </label>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md disabled:opacity-50"
            title="Upload and import transactions from CSV"
          >
            {loading ? 'Importing…' : 'Upload & Import'}
          </button>
        </div>
      )}
    </div>
  );
}
