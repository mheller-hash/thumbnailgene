import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-900 dark:border-t-slate-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-900 dark:border-b-slate-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-900 dark:border-l-slate-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-900 dark:border-r-slate-800'
  };

  return (
    <div className="group relative inline-block w-full">
      {children}
      <div className={`absolute ${positionClasses[position]} hidden group-hover:block w-48 p-3 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white text-[10px] font-bold rounded-xl shadow-2xl z-[100] pointer-events-none animate-in fade-in zoom-in-95 duration-200 border border-white/10`}>
        <div className="relative z-10 text-center leading-relaxed">
          {text}
        </div>
        <div className={`absolute border-[6px] border-transparent ${arrowClasses[position]}`} />
      </div>
    </div>
  );
};