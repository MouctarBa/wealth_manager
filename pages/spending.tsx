// pages/spending.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import Layout from '../components/Layout'
import Card from '../components/Card'

export default function Spending() {
  const router = useRouter()

  // ─── Hooks ────────────────────────────────────────────────────────────────
  const [user, setUser] = useState<any>(null)
  const tabs = ['Overview', 'Breakdown', 'Recurring', 'Transactions']
  const [activeTab, setActiveTab] = useState<string>('Overview')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/')
      } else {
        setUser(data.session.user)
      }
    })
  }, [router])

  // ─── Early return until we know who’s signed in ────────────────────────────
  if (!user) return null

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <Layout>
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6">
        <h2 className="text-3xl font-semibold mb-4 lg:mb-0">Spending</h2>
        <div className="flex space-x-4">
          {tabs.map(tab => (
            <button
              key={tab}
              type="button"
              className={`text-sm uppercase tracking-wide py-1 px-2 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white rounded-full'
                  : 'text-gray-600 hover:bg-gray-100 rounded-full'
              }`}
              onClick={() => setActiveTab(tab)}
              aria-label={tab}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'Overview' && (
        <>
          <Card className="mb-6">
            <p className="text-sm uppercase text-gray-500 mb-2">Spend This Month</p>
            <div className="text-2xl font-bold mb-4">
              $2,132 <span className="text-gray-400 text-sm">(May)</span>
            </div>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              [Chart Placeholder]
            </div>
            <div className="mt-4 flex justify-end text-gray-600">
              <label htmlFor="compare" className="sr-only">Compare month</label>
              <select id="compare" aria-label="Compare month" className="border rounded-md p-1">
                <option>April</option>
                <option>March</option>
                <option>February</option>
              </select>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <p className="text-sm uppercase text-gray-500 mb-2">Latest Transactions</p>
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                [Transactions Placeholder]
              </div>
              <button className="mt-4 w-full border rounded-full py-2 text-gray-600 hover:bg-gray-50">
                See All
              </button>
            </Card>
            <Card>
              <p className="text-sm uppercase text-gray-500 mb-2">Upcoming Transactions</p>
              <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                [Upcoming Placeholder]
              </div>
              <button className="mt-4 w-full border rounded-full py-2 text-gray-600 hover:bg-gray-50">
                See All
              </button>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <p className="text-sm uppercase text-gray-500 mb-2">Income This Month</p>
              <p className="text-xl font-bold mb-4">$4,000</p>
              <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                [Chart Placeholder]
              </div>
            </Card>
            <Card>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm uppercase text-gray-500">Category Breakdown</p>
                <button aria-label="View categories" className="text-gray-400 hover:text-gray-600">
                  ›
                </button>
              </div>
              <p className="text-2xl font-bold mb-4">$2,999</p>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                [Pie Chart Placeholder]
              </div>
              <ul className="mt-4 space-y-2 text-gray-700">
                {[
                  'Auto & transport',
                  'Household',
                  'Drinks & dining',
                  'Travel & vacation',
                  'Childcare & education',
                ].map(item => (
                  <li key={item} className="flex justify-between">
                    <span>{item}</span><span>$250</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full border rounded-full py-2 text-gray-600 hover:bg-gray-50">
                See All
              </button>
            </Card>
          </div>

          <Card>
            <p className="text-sm uppercase text-gray-500 mb-2">For You</p>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              [Carousel Placeholder]
            </div>
          </Card>
        </>
      )}

      {/* Breakdown Tab */}
      {activeTab === 'Breakdown' && (
        <Card>
          <p className="text-sm uppercase text-gray-500 mb-2">Spending Breakdown</p>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            [Breakdown Placeholder]
          </div>
        </Card>
      )}

      {/* Recurring Tab */}
      {activeTab === 'Recurring' && (
        <Card>
          <p className="text-sm uppercase text-gray-500 mb-2">Recurring Payments</p>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            [Recurring Placeholder]
          </div>
        </Card>
      )}

      {/* Transactions Tab */}
      {activeTab === 'Transactions' && (
        <Card>
          <p className="text-sm uppercase text-gray-500 mb-2">All Transactions</p>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            [All Transactions Placeholder]
          </div>
        </Card>
      )}

      {/* Stub Pages */}
      <Card className="mt-8">
        <p className="text-sm uppercase text-gray-500 mb-2">Page Placeholders</p>
        <ul className="list-disc list-inside text-gray-700">
          {['Portfolio', 'Invest', 'Advice', 'Estate Planning', 'Equity', 'Tax'].map(page => (
            <li key={page}>{page} page under development</li>
          ))}
        </ul>
      </Card>
    </Layout>
  )
}
