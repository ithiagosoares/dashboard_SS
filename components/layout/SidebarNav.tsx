"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SidebarNav() {
  const pathname = usePathname();

  const links = [
    {
      name: "Visão Geral",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Configurações",
      href: "/dashboard/settings",
      icon: Settings
    }
  ];

  return (
    <nav className="flex-1 space-y-1 p-4">
      {links.map((link) => {
        const isActive = pathname === link.href;
        
        return (
          <Link 
            key={link.href}
            href={link.href} 
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              isActive 
                ? "bg-gray-100 text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-100" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-100"
            )}
          >
            <link.icon className={cn("h-4 w-4", isActive ? "text-[var(--color-solar-orange)]" : "")} />
            {link.name}
          </Link>
        )
      })}
    </nav>
  );
}
