// components/Sidebar.tsx
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHome, FaWallet, FaChartLine, FaMoneyBillWave, FaLightbulb, FaBalanceScale, FaChartBar, FaFileInvoiceDollar } from 'react-icons/fa'
import { supabase } from '../lib/supabaseClient'

const routes = [
  { name: 'Dashboard',     path: '/dashboard',       Icon: FaHome },
  { name: 'Spending',      path: '/spending',        Icon: FaWallet },
  { name: 'Portfolio',     path: '/portfolio',       Icon: FaChartLine },
  { name: 'Invest',        path: '/invest',          Icon: FaMoneyBillWave },
  { name: 'Advice',        path: '/advice',          Icon: FaLightbulb },
  { name: 'Estate Planning', path: '/estate-planning', Icon: FaBalanceScale },
  { name: 'Equity',        path: '/equity',          Icon: FaChartBar },
  { name: 'Tax',           path: '/tax',             Icon: FaFileInvoiceDollar },
]

export default function Sidebar() {
  const router = useRouter()
  const current = router.pathname

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/')
  }

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-6">
      <h1 className="text-2xl font-bold mb-8">Wealth Manager</h1>

      <nav className="space-y-3 text-gray-700">
        {routes.map(({ name, path, Icon }) => (
          <Link
            key={path}
            href={path}
            className={`flex items-center py-2 px-3 rounded-lg transition-colors ${
              current === path
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
            aria-current={current === path ? 'page' : undefined}
          >
            <Icon className="mr-3 text-lg" />
            <span className="text-sm font-medium">{name}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={handleSignOut}
        className="mt-8 flex items-center text-red-500 hover:text-red-600 transition-colors"
        aria-label="Sign out"
      >
        <FaHome className="mr-2 rotate-180" /> {/* reuse FaHome rotated as a “sign out” arrow */}
        Sign Out
      </button>
    </aside>
  )
}
