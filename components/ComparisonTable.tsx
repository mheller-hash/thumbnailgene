
import React from 'react';
import { Check, X, Zap, Target, Clock, ShieldCheck, RefreshCw, Globe } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const comparisonData = [
    {
      feature: "Wartezeit",
      ai: "Sofort fertig",
      others: "Stunden bis Tage",
      icon: Clock
    },
    {
      feature: "Erfolgs-Check",
      ai: "KI sagt Klicks voraus",
      others: "Nur Raten möglich",
      icon: Target
    },
    {
      feature: "Änderungen",
      ai: "Gratis & Sofort",
      others: "Teuer & Langsam",
      icon: RefreshCw
    },
    {
      feature: "Verfügbarkeit",
      ai: "Immer bereit (24/7)",
      others: "Nur zu Bürozeiten",
      icon: Globe
    },
    {
      feature: "Bild-Stil",
      ai: "Stile einfach kopieren",
      others: "Mühsamer Nachbau",
      icon: Zap
    },
    {
      feature: "Preis pro Bild",
      ai: "Wenige Cent",
      others: "€25 - €150",
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      {/* Background Glows for the Section */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-orange-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-orange-600/10 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-6 md:mb-8 border border-orange-500/20 backdrop-blur-sm">
            <Zap className="w-3 md:w-3.5 h-3 md:h-3.5 fill-current" /> Markt-Vergleich 2025
          </div>
          <h3 className="text-3xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            Warum <span className="text-orange-600 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">wir</span> den Markt dominieren.
          </h3>
          <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto px-4">Vergleich unserer KI-Lösung mit herkömmlichen Agenturen und Freelancern.</p>
        </div>

        <div className="relative group">
          {/* Animated Glow Border */}
          <div className="absolute -inset-[1px] md:-inset-[2px] bg-gradient-to-r from-orange-600/30 via-orange-400/20 to-blue-600/30 rounded-[2rem] md:rounded-[3.5rem] blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-slate-950 backdrop-blur-3xl transition-all duration-500 hover:scale-[1.005]">
            
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Strategischer Vorteil</th>
                    <th className="p-10 relative w-[35%] bg-white/[0.05] text-center border-x border-white/5">
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-orange-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(249,115,22,0.4)] animate-pulse">Unsere Lösung</div>
                        <span className="text-xl font-black text-white tracking-tighter">ThumbCraft AI</span>
                      </div>
                    </th>
                    <th className="p-10 text-center text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 w-[30%]">Konkurrenz</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => {
                    const Icon = row.icon;
                    return (
                      <tr key={idx} className="border-b border-white/5 last:border-none hover:bg-white/[0.02] transition-all duration-300 group/row">
                        <td className="p-10">
                          <div className="flex items-center gap-6 transition-transform group-hover/row:translate-x-2">
                            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover/row:bg-orange-600 group-hover/row:text-white group-hover/row:border-orange-500/50 group-hover/row:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-500">
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="font-black text-lg text-slate-300 group-hover/row:text-white transition-colors tracking-tight">{row.feature}</span>
                          </div>
                        </td>
                        <td className="p-10 relative text-center bg-white/[0.03] border-x border-white/5">
                          <div className="absolute inset-y-0 inset-x-0 bg-orange-600/[0.02] transition-colors group-hover/row:bg-orange-600/[0.05]"></div>
                          <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-600/20 flex items-center justify-center border border-orange-500/30 group-hover/row:scale-110 group-hover/row:bg-orange-600 group-hover/row:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-500">
                              <Check className="w-6 h-6 text-orange-500 group-hover/row:text-white stroke-[4]" />
                            </div>
                            <span className="text-sm font-black text-orange-500 tracking-tight">{row.ai}</span>
                          </div>
                        </td>
                        <td className="p-10 text-center bg-black/20">
                          <div className="flex flex-col items-center gap-3 transition-opacity duration-300">
                            <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5">
                              <X className="w-6 h-6 text-slate-500 stroke-[4] opacity-60" />
                            </div>
                            <span className="text-sm font-bold text-slate-400 tracking-tight">{row.others}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden p-4">
              <div className="flex justify-between items-center mb-6 px-4 py-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-center">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">KI Power</p>
                  <p className="text-xs font-black text-orange-500">ThumbCraft</p>
                </div>
                <div className="h-8 w-px bg-white/10"></div>
                <div className="text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Konventionell</p>
                  <p className="text-xs font-black text-slate-400">Konkurrenz</p>
                </div>
              </div>

              <div className="space-y-4">
                {comparisonData.map((row, idx) => {
                  const Icon = row.icon;
                  return (
                    <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-[1.5rem] space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-orange-500 shadow-lg">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-black text-sm text-white uppercase tracking-wider">{row.feature}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-orange-600/10 border border-orange-500/20 rounded-xl text-center">
                          <div className="flex justify-center mb-1">
                            <Check className="w-4 h-4 text-orange-500 stroke-[4]" />
                          </div>
                          <p className="text-[10px] font-black text-orange-500 leading-tight">{row.ai}</p>
                        </div>
                        <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
                          <div className="flex justify-center mb-1">
                            <X className="w-4 h-4 text-slate-500 stroke-[4]" />
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 leading-tight">{row.others}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex flex-col items-center gap-6 px-4">
           <button className="group relative w-full sm:w-auto flex items-center justify-center gap-4 px-8 md:px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] overflow-hidden">
             <span className="relative z-10 flex items-center gap-2">
               <Zap className="w-4 h-4 fill-current text-orange-600" /> Starte jetzt dein erstes Audit
             </span>
             <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-orange-600/10 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform" />
           </button>
           <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex flex-wrap justify-center gap-2 md:gap-4">
             <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> DSGVO Konform</span>
             <span className="hidden sm:inline opacity-30">|</span> 
             <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Keine Wartezeit</span>
           </p>
        </div>
      </div>
    </section>
  );
};
