import React from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { ProgressSection } from '@/components/ui/ProgressSection';
import { ShoppingBag, Briefcase, RefreshCw, Calendar, Clock, DollarSign, Target } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  // Mock data for display based on the image
  // Mês
  const mlMonth = 178067.81;
  const b2bMonth = 605123.79;
  const totalMonth = 783191.60;
  const metaMonth = 900000.00;

  // Dia
  const mlDay = 1114.77;
  const b2bDay = 2309.53;
  const totalDay = 3424.30;
  const metaDay = 40000.00;

  // Date and time formatting
  const today = new Date('2026-03-30T09:43:44-03:00');
  
  const formattedDate = new Intl.DateTimeFormat('pt-BR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(today);
  
  // Capitalize first letters
  const displayDate = formattedDate.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4">
          <div className="flex items-center gap-3">
            <div style={{ color: 'var(--solar-orange)' }}>
              <Image src="/Favicon.png" alt="Solar System Logo" width={40} height={40} className="object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--solar-orange)' }}>Solar System</h1>
              <p className="text-sm font-medium text-gray-400">Dashboard de Vendas</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--solar-orange)' }}>
              <Calendar className="h-4 w-4" />
              <span>{displayDate}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <Clock className="h-4 w-4" />
              <span>09:43:44</span>
            </div>
          </div>
        </header>

        {/* Vendas do Mês */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-sm" style={{ backgroundColor: 'var(--solar-orange)' }}></div>
            <h2 className="text-lg font-bold">Vendas do Mês</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Mercado Livre"
              subtitle="MÊS"
              value={mlMonth}
              icon={<ShoppingBag className="h-5 w-5" />}
              accentColorClass="text-[var(--ml-yellow)]"
            />
            <MetricCard
              title="B2B"
              subtitle="MÊS"
              value={b2bMonth}
              icon={<Briefcase className="h-5 w-5" />}
              accentColorClass="text-[var(--upper-blue)]"
            />
            <MetricCard
              title="Vendas Gerais"
              subtitle="TOTAL MÊS"
              value={totalMonth}
              icon={<DollarSign className="h-5 w-5" />}
              accentColorClass=""
              isTotal={true}
            >
              <div className="flex items-center gap-4 text-gray-400">
                <span className="flex items-center gap-1">
                  <ShoppingBag className="h-3 w-3" style={{ color: 'var(--ml-yellow)' }} /> ML: {formatCurrency(mlMonth)}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" style={{ color: 'var(--upper-blue)' }} /> B2B: {formatCurrency(b2bMonth)}
                </span>
              </div>
            </MetricCard>
            <MetricCard
              title="Mensal"
              subtitle="META"
              value={metaMonth}
              icon={<Target className="h-5 w-5" />}
              accentColorClass="text-[var(--solar-green)]"
            />
          </div>
        </section>

        {/* Vendas do Dia */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-sm" style={{ backgroundColor: 'var(--solar-orange)' }}></div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              Vendas do Dia 
              <span style={{ color: 'var(--solar-orange)' }}>⚡</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Mercado Livre"
              subtitle="DIA"
              value={mlDay}
              icon={<ShoppingBag className="h-5 w-5" />}
              accentColorClass="text-[var(--ml-yellow)]"
            />
            <MetricCard
              title="B2B"
              subtitle="DIA"
              value={b2bDay}
              icon={<Briefcase className="h-5 w-5" />}
              accentColorClass="text-[var(--upper-blue)]"
            />
            <MetricCard
              title="Vendas Hoje"
              subtitle="TOTAL DIA"
              value={totalDay}
              icon={<DollarSign className="h-5 w-5" />}
              accentColorClass=""
              isTotal={true}
            >
               <div className="flex items-center gap-4 text-gray-400">
                <span className="flex items-center gap-1">
                  <ShoppingBag className="h-3 w-3" style={{ color: 'var(--ml-yellow)' }} /> ML: {formatCurrency(mlDay)}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" style={{ color: 'var(--upper-blue)' }} /> B2B: {formatCurrency(b2bDay)}
                </span>
              </div>
            </MetricCard>
            <MetricCard
              title="Diária"
              subtitle="META"
              value={metaDay}
              icon={<Target className="h-5 w-5" />}
              accentColorClass="text-[var(--solar-green)]"
            />
          </div>
        </section>

        {/* Progresso Section */}
        <section className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl mt-6 p-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--card-border)]">
            <ProgressSection
              title="Progresso Mensal"
              subtitle="mensal"
              currentValue={totalMonth}
              goalValue={metaMonth}
              colorVar="#ffffff"
              trackColor="#000000"
            />
            <ProgressSection
              title="Progresso Diário"
              subtitle="diária"
              currentValue={totalDay}
              goalValue={metaDay}
              colorVar="#ef4444" // red-500
              trackColor="#000000"
            />
          </div>
        </section>

        {/* Footer / Actions */}
        <footer className="flex justify-between items-center py-6 mt-4">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Image src="/Favicon.png" alt="Solar System Logo" width={16} height={16} className="object-contain" />
              <span>Solar System © 2026</span>
            </div>
          </div>
          
          {/* Button: "não possui nada escrito e nem cor, apenas uma shadow" */}
          <button 
            className="flex items-center justify-center bg-transparent p-4 rounded-full transition-all hover:scale-105 active:scale-95"
            style={{ 
              boxShadow: '0 0 20px 0px rgba(255, 140, 0, 0.4)',
              color: 'var(--solar-orange)'
            }}
            aria-label="Atualizar Dashboard"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </footer>
      </div>
    </div>
  );
}
