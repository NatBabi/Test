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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AppContext.Provider value={{ currentRole, setCurrentRole }}>
      <div className="flex min-h-screen relative overflow-hidden bg-background">
        {/* Background Mesh Gradient */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"></div>
          <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] rounded-full bg-secondary/10 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-primary-light/50 blur-[120px]"></div>
        </div>

        {/* Side Navigation */}
        <SideNavBar 
          currentRole={currentRole} 
          onRoleChange={setCurrentRole} 
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main content area */}
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? 'md:ml-[88px]' : 'md:ml-[280px]'}`}>
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
