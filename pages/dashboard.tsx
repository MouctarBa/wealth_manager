// pages/dashboard.tsx
import { useState, useEffect, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { FaPlus, FaFacebookF, FaPaypal, FaAmazon } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';
import MyLineChart from '../components/charts/LineChart';
import MyPieChart from '../components/charts/PieChart';
import MyBarChart from '../components/charts/BarChart';
import Sparkline from '../components/charts/SparkLine';
import LinkBank from '../components/LinkBank';
import Papa from 'papaparse';

export default function Dashboard() {
  const router = useRouter();

  // ─── Hooks ────────────────────────────────────────────────────────────────
  const [user, setUser] = useState<any>(null);
  const [netView, setNetView] = useState<'assets' | 'liabilities'>('assets');

  // dropdown & CSV state
  const [menuOpen, setMenuOpen] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/');
      } else {
        setUser(data.session.user);
      }
    });
  }, [router]);

  if (!user) return null;

  // ─── Data for each view ───────────────────────────────────────────────────
  const assetsData = [
    { label: 'Cash', amount: '$72,882' },
    { label: 'Investments', amount: '$52,000' },
    { label: 'Real estate', amount: '$14,500' },
    { label: 'Other', amount: '$8,800' },
  ];
  const liabilitiesData = [
    { label: 'Credit Card', amount: '$3,200' },
    { label: 'Mortgage', amount: '$120,000' },
    { label: 'Auto Loan', amount: '$15,000' },
    { label: 'Student Loan', amount: '$22,500' },
  ];
  const isAssets = netView === 'assets';

  // ── Chart data ─────────────────────────────────────────────────────────
  const netCashFlowData = [
    { name: 'Dec 2023', income: 4435, expenses: 2000 },
    { name: 'Jan 2024', income: 3800, expenses: 2200 },
    { name: 'Feb 2024', income: 4200, expenses: 1800 },
  ];
  const holdingsData = [
    {
      symbol: 'META',
      name: 'Meta',
      Icon: FaFacebookF,
      change: 2.7,
      spark: [{ value: 1 }, { value: 2 }, { value: 2.7 }],
    },
    {
      symbol: 'PYPL',
      name: 'PayPal',
      Icon: FaPaypal,
      change: -1.31,
      spark: [{ value: 1.2 }, { value: 1.1 }, { value: 0.89 }],
    },
    {
      symbol: 'AMZN',
      name: 'Amazon',
      Icon: FaAmazon,
      change: 1.11,
      spark: [{ value: 0.9 }, { value: 1 }, { value: 1.11 }],
    },
  ];

  // ─── handle one‑step CSV import ────────────────────────────────────────────
  const handleCsvFile = (file: File | null) => {
    if (!file) return;
    setImporting(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const txs = (results.data as any[]).map((row) => ({
          transaction_id: row['Transaction ID'] ?? `${row.Date}-${row.Amount}-${row.Description}`,
          date: row.Date,
          amount: parseFloat(row.Amount),
          name: row.Description,
          category: row.Category || 'Imported',
        }));
        await fetch('/api/import_csv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, transactions: txs }),
        });
        setImporting(false);
        setMenuOpen(false);
      },
    });
  };

  const stopPropagation = (e: MouseEvent) => e.stopPropagation();

  return (
    <Layout active="Dashboard">
      {/* Greeting */}
      <header className="mb-8">
        <h2 className="text-3xl font-semibold">Hello, {user.email.split('@')[0]}</h2>
      </header>

      {/* Net Worth Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 relative">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm uppercase text-gray-500">Net Worth</p>
            <p className="text-3xl font-bold">$80,626</p>
          </div>
          {/* + button with one‑step CSV & Plaid */}
          <div className="relative">
            <button
              type="button"
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              aria-label={isAssets ? 'Add asset' : 'Add liability'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <FaPlus />
            </button>
            {menuOpen && (
              <div
                onClick={stopPropagation}
                className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10"
              >
                <div className="px-4 py-2 text-xs text-gray-500">Add via</div>
                <div className="px-3 py-1">
                  <LinkBank userId={user.id} />
                </div>
                <div className="border-t my-2" />
                <label className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  <span className="flex-1 text-sm">{importing ? 'Importing…' : 'Import CSV'}</span>
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => handleCsvFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Toggle */}
        <div className="border-b border-gray-200 mb-4">
          <button
            onClick={() => setNetView('assets')}
            className={`mr-4 pb-2 ${
              isAssets
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            Assets
          </button>
          <button
            onClick={() => setNetView('liabilities')}
            className={`pb-2 ${
              !isAssets
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            Liabilities
          </button>
        </div>

        {/* Total label */}
        <p className="text-sm text-gray-500 mb-2">
          {isAssets ? 'Total assets' : 'Total liabilities'}
        </p>

        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded mb-4">
          <div
            className="h-2 rounded"
            style={{
              width: '100%',
              backgroundColor: isAssets ? '#68D391' : '#FC8181',
            }}
          />
        </div>

        {/* Line items */}
        {(isAssets ? assetsData : liabilitiesData).map(({ label, amount }) => (
          <div key={label} className="flex justify-between items-center py-2">
            <p className="text-gray-700">{label}</p>
            <p className="text-gray-700 font-medium">{amount}</p>
          </div>
        ))}
      </div>

      {/* Favorites Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm uppercase text-gray-500">Favorites</p>
            <button
              type="button"
              onClick={() => router.push('/favorites')}
              className="text-sm text-blue-600 hover:underline"
              aria-label="Edit favorites"
            >
              Edit
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Net Cash Flow</p>
              <p className="text-2xl font-bold">$2,435</p>
              <div className="h-24">
                <MyBarChart data={netCashFlowData} />
              </div>
              <button className="mt-2 text-sm text-blue-600 hover:underline">See More</button>
            </div>
            <div>
              <p className="text-sm text-gray-500">Holdings</p>
              <p className="text-2xl font-bold">Top Movers</p>
              <ul className="space-y-4 mt-4">
                {holdingsData.map((h) => (
                  <li key={h.symbol} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h.Icon className="text-xl" />
                      <div>
                        <p className="text-sm font-medium">{h.symbol}</p>
                        <p className="text-xs text-gray-500">{h.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sparkline data={h.spark} />
                      <span className={h.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {h.change > 0 ? '+' : ''}
                        {h.change}%
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Side Widgets */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm uppercase text-gray-500 mb-2">Spending</p>
          <p className="text-xl font-bold mb-4">$3,155</p>
          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            [Chart]
          </div>
          <button
            onClick={() => router.push('/spending')}
            className="mt-4 w-full border rounded-full py-2 text-gray-600 hover:bg-gray-50"
          >
            View Spending
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm uppercase text-gray-500">Investments Portfolio</p>
            <button
              type="button"
              aria-label="View investment details"
              className="text-gray-400"
              onClick={() => router.push('/portfolio')}
            >
              ›
            </button>
          </div>
          <p className="text-xl font-bold mb-2">
            $123,756 <span className="text-green-600 text-sm">+5.5%</span>
          </p>
          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            [Chart]
          </div>
        </div>
      </div>
    </Layout>
  );
}
