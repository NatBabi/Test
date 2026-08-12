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
    <header className="bg-surface flex justify-between items-center w-full px-container-padding h-16 border-b border-outline-variant z-30 sticky top-0">
      <div className="flex items-center gap-4">
        <button onClick={onMobileMenuToggle} className="md:hidden text-on-surface">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-title-sm font-title-sm font-bold text-on-surface">ITAPS</h1>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container text-on-secondary-container border border-secondary/20">
            {roleLabels[currentRole] || currentRole}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input
            className="pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none w-64 transition-all"
            placeholder="Search assets, students..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center ml-2">
            <span className="material-symbols-outlined text-[18px] text-on-primary-container">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
