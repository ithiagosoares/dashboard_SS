import React from 'react';
import Link from 'next/link';
import { LogOut, BarChart3 } from 'lucide-react';
import { SidebarNav } from '@/components/layout/SidebarNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 flex-col border-r border-[var(--color-card-border)] bg-[var(--color-card)] lg:flex">
        <div className="flex h-16 items-center px-6 border-b border-[var(--color-card-border)]">
          <div className="flex items-center gap-2 font-bold text-xl text-[var(--color-foreground)] tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-upper-blue)] text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            UpperAnalytics
          </div>
        </div>
        
        <SidebarNav />
        
        <div className="border-t border-[var(--color-card-border)] p-4">
          <a href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all">
            <LogOut className="h-4 w-4" />
            Sair
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between border-b border-[var(--color-card-border)] bg-[var(--color-card)] px-4 lg:hidden">
          <div className="flex items-center gap-2 font-bold text-lg text-[var(--color-foreground)]">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-upper-blue)] text-white">
              <BarChart3 className="h-4 w-4" />
            </div>
            UpperAnalytics
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
