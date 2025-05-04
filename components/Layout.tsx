// components/Layout.tsx
import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface Props {
  children: ReactNode
  active?: string
}

export default function Layout({ children, active = '' }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-50 overflow-auto">
      <Sidebar />

      <div className="flex-1 flex flex-col ">
        {/* Render your header controls here */}
        <Header title={active} />

        <main className="flex-1 w-full mx-auto px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
