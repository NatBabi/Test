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
    <nav className="hidden md:flex flex-col bg-surface-container-low border-r border-outline-variant fixed left-0 top-0 h-full w-[280px] p-4 z-40">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
        </div>
        <div>
          <h1 className="text-headline-md font-headline-md font-bold text-primary leading-tight">ITAPS</h1>
          <p className="text-body-sm font-body-sm text-on-surface-variant">Tech Services Dept</p>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/intake"
        className="w-full bg-primary text-on-primary hover:bg-primary/90 transition-colors py-2.5 px-4 rounded-lg font-body-sm text-body-sm font-semibold mb-6 flex items-center justify-center gap-2 shadow-sm"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        New Asset Intake
      </Link>

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-bold scale-[0.99]'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-label-caps font-label-caps">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-outline-variant pt-4 flex flex-col gap-1">
        {footerItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg"
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="text-label-caps font-label-caps">{item.label}</span>
          </a>
        ))}

        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="w-full flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg"
          >
            <span className="material-symbols-outlined text-[20px]">person_search</span>
            <span className="text-label-caps font-label-caps">Role Switcher</span>
            <span className="material-symbols-outlined text-[16px] ml-auto">
              {showRoleSwitcher ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {showRoleSwitcher && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg p-2 z-50">
              <p className="text-label-caps font-label-caps text-on-surface-variant px-3 py-1 mb-1">Switch Role</p>
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    onRoleChange(role.id);
                    setShowRoleSwitcher(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                    currentRole === role.id
                      ? 'bg-secondary-container text-on-secondary-container font-semibold'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{role.icon}</span>
                  <span className="text-body-sm font-body-sm">{role.label}</span>
                  {currentRole === role.id && (
                    <span className="material-symbols-outlined text-[16px] ml-auto">check</span>
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
