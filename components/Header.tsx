// components/Header.tsx
import { useRouter } from 'next/router'
import { FaPlus, FaQuestionCircle, FaCog } from 'react-icons/fa'

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter()

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      {/* Page title */}
      <h1 className="text-xl font-semibold">{title}</h1>

      {/* Right-side controls */}
      <div className="flex items-center space-x-4">
        {/* + Account button */}
        <button
          onClick={() => router.push('/account')}
          className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <FaPlus className="mr-2 text-sm" />
          <span className="text-sm font-medium">Account</span>
        </button>

        {/* Help icon */}
        <button
          onClick={() => router.push('/help')}
          aria-label="Help"
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <FaQuestionCircle className="text-lg" />
        </button>

        {/* Settings icon */}
        <button
          onClick={() => router.push('/settings')}
          aria-label="Settings"
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <FaCog className="text-lg" />
        </button>

        {/* User avatar */}
        <button
          onClick={() => router.push('/profile')}
          aria-label="Profile"
          className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
        >
          MB
        </button>
      </div>
    </header>
  )
}
