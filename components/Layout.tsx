// components/Layout.tsx
import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { FaBars } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  active?: string;
}

export default function Layout({ children, active = '' }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-auto">
      {/* Sidebar drawer: hidden on small, shown when sidebarOpen */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Header receives the toggle button as child */}
        <Header title={active}>
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <FaBars className="text-xl" />
          </button>
        </Header>

        <main className="flex-1 w-full mx-auto px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
