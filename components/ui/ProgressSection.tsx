import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressSectionProps {
  title: string;
  subtitle: string; // e.g., 'mensal', 'diária'
  currentValue: number;
  goalValue: number;
  colorVar?: string; // e.g., 'var(--solar-orange)', '#ffffff', '#ef4444'
  trackColor?: string; // e.g., 'black', 'rgba(255,255,255,0.1)'
  className?: string;
}

export function ProgressSection({
  title,
  subtitle,
  currentValue,
  goalValue,
  colorVar = "var(--solar-orange)",
  trackColor = "black",
  className
}: ProgressSectionProps) {
  const percentage = goalValue > 0 ? Math.min(Math.round((currentValue / goalValue) * 100), 100) : 0;
  const remaining = Math.max(goalValue - currentValue, 0);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  // SVG for circular progress
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("flex flex-col sm:flex-row items-center gap-6 p-4", className)}>
      {/* Circular Progress */}
      <div className="relative flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={trackColor}
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={colorVar}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 4px ${colorVar})` }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white">{percentage}%</span>
          <span className="text-[10px] text-gray-400 font-medium">{subtitle}</span>
        </div>
      </div>

      {/* Linear Progress and Details */}
      <div className="flex-1 w-full">
        <h4 className="text-sm font-semibold text-gray-200 mb-2">{title}</h4>
        
        {/* Progress track */}
        <div className="relative w-full h-3 rounded-full overflow-hidden mb-2" style={{ backgroundColor: trackColor }}>
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor]"
            style={{ width: `${percentage}%`, backgroundColor: colorVar, color: colorVar }}
          />
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-sm font-bold" style={{ color: colorVar }}>{formatCurrency(currentValue)}</span>
            {remaining > 0 ? (
              <span className="text-[10px] text-gray-500 font-medium">Faltam {formatCurrency(remaining)}</span>
            ) : (
              <span className="text-[10px] text-[var(--color-solar-green)] font-medium">Meta Atingida!</span>
            )}
          </div>
          <div className="text-[10px] text-gray-500 font-medium">
            Meta: {formatCurrency(goalValue)}
          </div>
        </div>
      </div>
    </div>
  );
}
