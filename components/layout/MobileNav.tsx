"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, BarChart3, LogOut } from 'lucide-react';
import { SidebarNav } from './SidebarNav';
import { usePathname } from 'next/navigation';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 text-[var(--color-foreground)] hover:bg-[var(--color-card-border)] rounded-md transition-colors"
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar Panel */}
          <div className="relative flex w-72 max-w-[80%] flex-col bg-[var(--color-card)] shadow-2xl h-full transform transition-transform duration-300 ease-in-out">
            <div className="flex h-16 items-center px-6 justify-between border-b border-[var(--color-card-border)]">
              <div className="flex items-center gap-2 font-bold text-xl text-[var(--color-foreground)] tracking-tight">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-solar-orange)] text-white">
                  <BarChart3 className="h-5 w-5" />
                </div>
                Menu
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 -mr-2 text-gray-400 hover:text-gray-100 hover:bg-[var(--color-card-border)] transition-colors"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <SidebarNav />
            </div>
            
            <div className="border-t border-[var(--color-card-border)] p-4">
              <a href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all">
                <LogOut className="h-4 w-4" />
                Sair
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
