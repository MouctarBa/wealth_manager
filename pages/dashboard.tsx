// pages/dashboard.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaPlus } from 'react-icons/fa'
import { supabase } from '../lib/supabaseClient'
import Layout from '../components/Layout'

export default function Dashboard() {
  const router = useRouter()

  // ─── Hooks ────────────────────────────────────────────────────────────────
  const [user, setUser] = useState<any>(null)
  const [netView, setNetView] = useState<'assets' | 'liabilities'>('assets')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/')
      } else {
        setUser(data.session.user)
      }
    })
  }, [router])

  if (!user) return null

  // ─── Data for each view ───────────────────────────────────────────────────
  const assetsData = [
    { label: 'Cash', amount: '$72,882' },
    { label: 'Investments', amount: '$52,000' },
    { label: 'Real estate', amount: '$14,500' },
    { label: 'Other', amount: '$8,800' },
  ]
  const liabilitiesData = [
    { label: 'Credit Card', amount: '$3,200' },
    { label: 'Mortgage', amount: '$120,000' },
    { label: 'Auto Loan', amount: '$15,000' },
    { label: 'Student Loan', amount: '$22,500' },
  ]
  const isAssets = netView === 'assets'

  return (
    <Layout active="Dashboard">
      {/* Greeting */}
      <header className="mb-8">
        <h2 className="text-3xl font-semibold">
          Hello, {user.email.split('@')[0]}
        </h2>
      </header>

      {/* Net Worth Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm uppercase text-gray-500">Net Worth</p>
            <p className="text-3xl font-bold">$80,626</p>
          </div>
          <button
            type="button"
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            aria-label={isAssets ? 'Add asset' : 'Add liability'}
            onClick={() =>
              router.push(isAssets ? '/assets' : '/liabilities')
            }
          >
            <FaPlus />
          </button>
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
              <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                [Chart]
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Holdings</p>
              <p className="text-2xl font-bold">Top Movers</p>
              <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                [List]
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
      </div>
    </Layout>
  )
}
