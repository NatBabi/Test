'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/intake', label: 'Intake & Triage', icon: 'inventory_2' },
  { href: '/repairs', label: 'Repairs', icon: 'build' },
  { href: '/assignments', label: 'Assignment Engine', icon: 'assignment_ind' },
];

const footerItems = [
  { href: '#', label: 'Support', icon: 'help' },
];

const roles = [
  { id: 'director', label: 'IT Director', icon: 'shield_person' },
  { id: 'vice_director', label: 'Vice Director', icon: 'manage_accounts' },
  { id: 'store_manager', label: 'Store Manager', icon: 'store' },
  { id: 'helpdesk', label: 'Helpdesk Tech', icon: 'support_agent' },
  { id: 'intern', label: 'IT Intern', icon: 'school' },
];

interface SideNavBarProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export default function SideNavBar({ currentRole, onRoleChange }: SideNavBarProps) {
  const pathname = usePathname();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  return (
    <nav className="hidden md:flex flex-col glass border-r border-white/40 fixed left-0 top-0 h-full w-[280px] p-4 z-40 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 mb-6 px-2 group cursor-pointer text-center mt-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-md group-hover:shadow-glow transition-all duration-300">
          <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
        </div>
        <div>
          <h1 className="text-title font-title-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight tracking-tight mt-1">ITAPS</h1>
          <p className="text-[10px] font-label-caps text-on-surface-variant/70 tracking-widest uppercase mt-0.5">Tech Services Dept</p>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/intake"
        className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3.5 px-4 rounded-xl font-label-caps font-bold mb-6 flex items-center justify-center gap-2 shadow-glow hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
      >
        <span className="material-symbols-outlined text-[20px]">add_circle</span>
        New Asset Intake
      </Link>

      {/* Navigation */}
      <div className="nav-list flex-1 flex flex-col gap-2 transition-all duration-200 ease-in-out">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 relative ${
                isActive
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-on-surface-variant/80 hover:bg-white/40 hover:text-on-surface'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-primary' : ''}`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-label-caps font-label-caps tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 flex flex-col gap-1 border-t border-white/30">
        {footerItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 text-on-surface-variant/80 hover:bg-white/40 hover:text-on-surface transition-all rounded-lg group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">{item.icon}</span>
            <span className="text-label-caps font-label-caps">{item.label}</span>
          </a>
        ))}

        {/* Role Switcher */}
        <div className="relative mt-2">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="w-full flex items-center gap-3 px-4 py-2.5 bg-surface/50 border border-outline-variant/20 text-on-surface transition-all rounded-lg shadow-sm hover:shadow-soft-sm group hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">person_search</span>
            <span className="text-label-caps font-label-caps text-left flex-1">Role: <span className="text-primary ml-1">{roles.find(r => r.id === currentRole)?.label || 'Switcher'}</span></span>
            <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors">
              {showRoleSwitcher ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {showRoleSwitcher && (
            <div className="absolute bottom-[110%] left-0 right-0 mb-2 glass-dark border border-white/20 rounded-2xl shadow-xl p-2 z-50 animate-fade-in-up">
              <p className="text-[9px] font-label-caps text-white/40 px-3 py-1.5 mb-1 tracking-widest uppercase">Switch Context</p>
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    onRoleChange(role.id);
                    setShowRoleSwitcher(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-left group ${
                    currentRole === role.id
                      ? 'bg-primary/20 text-white font-bold'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[16px] transition-transform group-hover:scale-110 ${currentRole === role.id ? 'text-primary-light' : ''}`}>{role.icon}</span>
                  <span className="text-body-sm font-body-sm flex-1">{role.label}</span>
                  {currentRole === role.id && (
                    <span className="material-symbols-outlined text-[14px] text-primary-light">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
