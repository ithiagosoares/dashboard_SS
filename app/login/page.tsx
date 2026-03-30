import React from 'react';
import { BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-solar-orange)] text-white shadow-lg">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)] tracking-tight">Login Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Entre para acessar seu dashboard de vendas.</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
            <input type="email" placeholder="usuario@exemplo.com" className="w-full rounded-lg border border-[var(--color-card-border)] bg-transparent px-3 py-2 text-sm text-[var(--color-foreground)] focus:border-[var(--color-upper-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-upper-blue)] transition-colors" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
            <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-[var(--color-card-border)] bg-transparent px-3 py-2 text-sm text-[var(--color-foreground)] focus:border-[var(--color-upper-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--color-upper-blue)] transition-colors" />
          </div>
          
          <Link href="/dashboard" className="mt-6 flex w-full items-center justify-center rounded-lg bg-[var(--color-upper-blue)] px-4 py-2 font-medium text-white transition-all hover:bg-[var(--color-upper-blue-dark)] hover:shadow-md">
            Entrar
          </Link>
        </form>
      </div>
    </div>
  );
}
