
import React from 'react';
import { LayoutGrid, Wand2, Sparkles, Target, Youtube, Coins, Zap, ShieldCheck, Settings, LogOut, Heart } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  activeView: string;
  onSelect: (view: any) => void;
  user: User | null;
  onUpgrade: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onSelect, user, onUpgrade }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Übersicht', icon: LayoutGrid, desc: 'Zentral' },
    { id: 'generate', label: 'Generator', icon: Wand2, desc: 'KI-Design' },
    { id: 'clone', label: 'Stil', icon: Sparkles, desc: 'Klonen' },
    { id: 'analyze', label: 'Analyse', icon: Target, desc: 'CTR-Check' },
    { id: 'channel', label: 'Audit', icon: Youtube, desc: 'Strategie' },
    { id: 'favorites', label: 'Favoriten', icon: Heart, desc: 'Saved' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-24 bottom-0 w-72 glass border-r border-black/5 dark:border-white/5 hidden lg:flex flex-col z-30 animate-in slide-in-from-left-4 duration-500 overflow-hidden">
        {/* User Status Card */}
        <div className="p-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-black/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-slate-900 dark:text-white truncate">{user?.name}</p>
              <div className="flex items-center gap-1 text-[9px] font-bold text-orange-600 uppercase">
                <ShieldCheck className="w-3 h-3" /> {user?.plan}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto no-scrollbar">
          <p className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 mt-2">Menü</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                id={`tour-sidebar-${item.id}`}
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative ${
                  isActive 
                    ? (item.id === 'favorites' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20 active-glow-rose' : 'bg-orange-600 text-white shadow-lg shadow-orange-600/20 active-glow') 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {isActive && <div className="absolute left-0 w-1 h-6 bg-white rounded-full translate-x-1" />}
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : 'group-hover:scale-110 transition-transform'}`} />
                <div className="text-left">
                  <p className="text-sm font-black leading-none mb-1">{item.label}</p>
                  <p className={`text-[10px] font-bold ${isActive ? 'text-white/60' : 'text-slate-500'}`}>{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-6 space-y-4 border-t border-black/5 dark:border-white/5">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 rounded-3xl p-5 border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-600/10 blur-2xl rounded-full" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-orange-500 mb-2">
                <Coins className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase tracking-widest">Guthaben</span>
              </div>
              <p className="text-xl font-black text-white mb-3">{user?.credits || 0} <span className="text-[10px] text-slate-400 font-bold">CREDITS</span></p>
              <button 
                onClick={onUpgrade}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Zap className="w-3 h-3 fill-current" /> Upgraden
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Bar - Optimiert */}
      <nav className="fixed bottom-0 left-0 right-0 glass-blur border-t border-black/5 dark:border-white/5 lg:hidden z-50 px-1 py-3 pb-8 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                id={`tour-mobile-${item.id}`}
                onClick={() => onSelect(item.id)}
                className={`flex flex-col items-center gap-1 px-1 transition-all flex-1 ${
                  isActive ? (item.id === 'favorites' ? 'text-rose-600 scale-105' : 'text-orange-600 scale-105') : 'text-slate-400'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-colors ${isActive ? (item.id === 'favorites' ? 'bg-rose-500/10' : 'bg-orange-500/10') : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[7px] font-black uppercase tracking-tighter truncate w-full text-center">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      
      <style>{`
        .glass-blur {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
        }
        .dark .glass-blur {
          background: rgba(15, 23, 42, 0.85);
        }
        .active-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(249, 115, 22, 0.2), transparent 70%);
          pointer-events: none;
        }
        .active-glow-rose::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(225, 29, 72, 0.2), transparent 70%);
          pointer-events: none;
        }
      `}</style>
    </>
  );
};
