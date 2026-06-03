
import React from 'react';
import { Wand2, ChevronRight, Coins, Target, Sparkles, TrendingUp, Zap, Youtube, Lock, Star, ArrowUpRight } from 'lucide-react';
import { User } from '../types';

interface StudioSelectionProps {
  user: User | null;
  onSelectMode: (mode: string) => void;
  onGoToPricing?: () => void;
}

export const StudioSelection: React.FC<StudioSelectionProps> = ({ user, onSelectMode, onGoToPricing }) => {
  const currentPlan = user?.plan || 'Starter';
  const userCredits = user?.credits || 0;

  const checkPlanPermission = (planRequired: string) => {
    if (planRequired === 'Starter') return true;
    if (planRequired === 'Creator Pro') return currentPlan === 'Creator Pro' || currentPlan === 'Production';
    return currentPlan === 'Production';
  };

  const suiteModes = [
    {
      id: 'generate',
      title: 'Thumbnail Creator',
      description: 'Erstelle klickstarke Designs in Sekunden.',
      icon: <Wand2 className="w-8 h-8" />,
      color: 'bg-orange-600',
      cost: 10,
      planRequired: 'Starter'
    },
    {
      id: 'clone',
      title: 'Bild Remake',
      description: 'Verändere oder kopiere Bild-Styles.',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'bg-blue-600',
      cost: 30,
      planRequired: 'Starter'
    },
    {
      id: 'analyze',
      title: 'CTR Check',
      description: 'Prüfe dein Design auf Klick-Potenzial.',
      icon: <Target className="w-8 h-8" />,
      color: 'bg-emerald-600',
      cost: 50,
      planRequired: 'Creator Pro'
    },
    {
      id: 'channel',
      title: 'Kanal Audit',
      description: 'KI-Check deines gesamten Brandings.',
      icon: <Youtube className="w-8 h-8" />,
      color: 'bg-red-600',
      cost: 100,
      planRequired: 'Production'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-4 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative">
        <div className="relative z-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
             <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg rotate-3">
                <Sparkles className="w-5 h-5" />
             </div>
             <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
               Hallo, <span className="text-orange-600">{user?.name}</span>!
             </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mb-4">Schön, dass du wieder da bist. Welches Projekt gehen wir heute an?</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest border border-black/5 shadow-sm">
              {user?.plan} Plan
            </div>
            <div className="px-3 py-1.5 bg-emerald-600/10 rounded-lg text-[10px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-500/10 shadow-sm flex items-center gap-2">
              <Coins className="w-3.5 h-3.5" /> {user?.credits} Credits
            </div>
          </div>
        </div>

        <div className="lg:text-right relative z-10 flex justify-center md:block">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600/10 rounded-xl border border-orange-500/20 text-orange-600 shadow-inner">
            <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Kreativ-Modus Aktiv</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suiteModes.map((mode) => {
          const hasPlanPermission = checkPlanPermission(mode.planRequired);
          const hasCredits = userCredits >= mode.cost;
          const isLocked = !hasPlanPermission || !hasCredits;

          return (
            <button
              key={mode.id}
              onClick={() => {
                if (!hasPlanPermission || !hasCredits) onGoToPricing?.();
                else onSelectMode(mode.id);
              }}
              className={`group relative p-6 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-[2.5rem] text-left transition-all active:scale-95 overflow-hidden shadow-md ${
                isLocked ? 'opacity-80' : 'hover:scale-[1.01] hover:shadow-xl'
              }`}
            >
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${mode.color} text-white flex items-center justify-center shadow-md transition-transform duration-500 group-hover:rotate-6`}>
                  {mode.icon}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                   <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500 border border-black/5">
                     {mode.cost} Credits
                   </div>
                   {!hasPlanPermission && (
                     <div className="px-2 py-0.5 bg-slate-900 text-white rounded-md text-[8px] font-bold flex items-center gap-1 uppercase tracking-wider">
                       <Lock className="w-2.5 h-2.5" /> {mode.planRequired}
                     </div>
                   )}
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-black mb-1.5 text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
                  {mode.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed mb-6">
                  {mode.description}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-orange-600 transition-all">
                  {hasCredits ? 'Starten' : 'Upgrade'} <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
