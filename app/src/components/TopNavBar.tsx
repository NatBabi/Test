'use client';

import { useState } from 'react';

interface TopNavBarProps {
  currentRole: string;
  onMobileMenuToggle: () => void;
}

const roleLabels: Record<string, string> = {
  director: 'IT Director',
  vice_director: 'Vice Director',
  store_manager: 'Store Manager',
  helpdesk: 'Helpdesk Tech',
  intern: 'IT Intern',
};

export default function TopNavBar({ currentRole, onMobileMenuToggle }: TopNavBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="glass flex justify-between items-center w-[calc(100%-2rem)] mx-auto mt-4 px-6 h-16 rounded-2xl z-30 sticky top-4 shadow-soft-sm transition-all duration-300">
      <div className="flex items-center gap-4">
        <button onClick={onMobileMenuToggle} className="md:hidden text-on-surface hover:text-primary transition-colors">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-title-sm font-title-sm font-bold text-on-surface tracking-tight md:hidden">ITAPS</h1>
          <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 shadow-sm">
            {roleLabels[currentRole] || currentRole}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px] group-focus-within:text-primary transition-colors">search</span>
          <input
            className="pl-10 pr-4 py-2 bg-white/80 border border-outline-variant/40 rounded-xl text-body-sm font-body-sm focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none w-64 md:w-80 transition-all duration-300 shadow-soft-sm focus:shadow-md placeholder:text-outline"
            placeholder="Search assets, students..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-on-surface-variant hover:bg-white hover:text-primary hover:shadow-soft-sm transition-all rounded-xl relative group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface animate-pulse-subtle"></span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-white hover:text-primary hover:shadow-soft-sm transition-all rounded-xl group">
            <span className="material-symbols-outlined group-hover:rotate-90 transition-transform duration-300">settings</span>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-light to-secondary/30 flex items-center justify-center ml-2 border border-white shadow-soft-sm cursor-pointer hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-[18px] text-primary">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
