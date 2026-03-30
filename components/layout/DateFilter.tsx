"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

const options = [
  { label: 'Hoje', value: 'today' },
  { label: 'Últimos 7 dias', value: '7d' },
  { label: 'Este Mês', value: 'month' },
  { label: 'Personalizado', value: 'custom' },
];

export function DateFilter() {
  const [selected, setSelected] = useState('month');

  return (
    <div className="flex items-center gap-2 bg-[var(--color-card)] p-1 rounded-lg border border-[var(--color-card-border)] shadow-sm">
      <div className="hidden sm:flex items-center pl-3 pr-2 text-gray-500">
        <Calendar className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth relative w-full">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelected(option.value)}
            className={cn(
              "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
              selected === option.value
                ? "bg-gray-100 text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-100"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-200"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
