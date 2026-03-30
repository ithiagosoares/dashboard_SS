import React from 'react';

export function SolarLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      {...props}
    >
      {/* 5 Sun Rays (Left, Top-Left, Top, Top-Right, Right) */}
      <line x1="50" y1="5" x2="50" y2="15" />
      <line x1="18.18" y1="18.18" x2="26.66" y2="26.66" />
      <line x1="81.82" y1="18.18" x2="73.34" y2="26.66" />
      <line x1="5" y1="50" x2="15" y2="50" />
      <line x1="95" y1="50" x2="85" y2="50" />

      {/* S-shaped loops */}
      {/* Top loop */}
      <path d="M 22 50 A 28 28 0 0 1 78 50 C 65 70, 35 30, 22 50" />
      
      {/* Bottom loop */}
      <path d="M 78 50 A 28 28 0 0 1 22 50 C 35 30, 65 70, 78 50" />
    </svg>
  );
}
