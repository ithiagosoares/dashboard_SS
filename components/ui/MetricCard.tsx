import React from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  subtitle?: string; // e.g., "MÊS" or "DIA"
  value: number;
  isCurrency?: boolean;
  accentColorClass?: string;
  icon?: React.ReactNode;
  className?: string;
  isTotal?: boolean;
  children?: React.ReactNode; // For additional content like the breakdown "ML: R$ X | B2B: R$ Y"
}

export function MetricCard({
  title,
  subtitle,
  value,
  isCurrency = true,
  accentColorClass = "text-[var(--color-solar-orange)]",
  icon,
  className,
  isTotal = false,
  children
}: MetricCardProps) {
  const formattedValue = isCurrency 
    ? new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
    : value.toLocaleString('pt-BR');

  return (
    <div className={cn(
      "relative flex flex-col justify-between rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-5 shadow-sm transition-all", 
      isTotal ? "border-gray-500/30" : "", // Slightly lighter border for totals if needed
      className
    )}>
      <div className="flex items-start gap-4 mb-4">
        {icon && <div className={cn("mt-1", accentColorClass)}>{icon}</div>}
        <div className="flex flex-col">
          {subtitle && <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">{subtitle}</span>}
          <h3 className={cn("text-base font-semibold", isTotal ? "text-[var(--color-solar-orange)]" : "text-gray-300", accentColorClass.includes('green') ? "text-[var(--color-solar-green)]" : "")}>
            {title}
          </h3>
        </div>
      </div>
      
      <div className="flex items-end gap-2 mt-2">
        {isCurrency && <span className="text-gray-500 font-medium mb-1">R$</span>}
        <div className={cn("text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-foreground)]", isTotal ? "text-[var(--color-solar-orange)]" : "")}>
          {formattedValue}
        </div>
      </div>
      
      {children && (
        <div className="mt-4 pt-4 border-t border-[var(--color-card-border)] text-xs text-gray-500 flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}
