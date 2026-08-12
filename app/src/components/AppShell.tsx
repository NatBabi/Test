'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import SideNavBar from '@/components/SideNavBar';
import TopNavBar from '@/components/TopNavBar';

interface AppContextType {
  currentRole: string;
  setCurrentRole: (role: string) => void;
}

const AppContext = createContext<AppContextType>({
  currentRole: 'director',
  setCurrentRole: () => {},
});

export const useAppContext = () => useContext(AppContext);

export default function AppShell({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState('director');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AppContext.Provider value={{ currentRole, setCurrentRole }}>
      <div className="flex min-h-screen">
        {/* Side Navigation */}
        <SideNavBar currentRole={currentRole} onRoleChange={setCurrentRole} />

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-[280px]">
          <TopNavBar
            currentRole={currentRole}
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
          <main className="flex-1 p-4 md:p-container-padding max-w-[1440px] mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}
