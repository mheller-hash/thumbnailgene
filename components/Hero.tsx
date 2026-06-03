
import React, { useState } from 'react';
import { Zap, ArrowRight, Target, Sparkles, TrendingUp, Star, PlayCircle, Youtube, Instagram, Twitter, MessageSquare } from 'lucide-react';

interface HeroProps {
  onStartCreating: (prefill?: string) => void;
  onViewPricing: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCreating, onViewPricing }) => {
  const [topic, setTopic] = useState('');

  const brands = [
    { name: 'YouTube', icon: Youtube, color: 'text-red-600' },
    { name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
    { name: 'Twitch', icon: Zap, color: 'text-purple-600' },
    { name: 'TikTok', icon: PlayCircle, color: 'text-cyan-400' },
  ];

  return (
    <div className="relative pt-20 pb-10 md:pt-32 md:pb-20 px-4 md:px-6 overflow-hidden">
      {/* Decorative Side Elements - Desktop Only */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none">
        {/* Left Side Elements */}
        <div className="absolute left-[2%] top-1/2 -translate-y-1/2 space-y-12 animate-float">
          <div className="bg-white/10 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 p-5 rounded-3xl shadow-2xl rotate-[-6deg] max-w-[200px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <Target className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">CTR Prognose</span>
            </div>
            <div className="text-3xl font-black text-emerald-500">12.4%</div>
            <p className="text-[9px] font-bold text-slate-500 mt-2 uppercase tracking-wider">Top 1% der Nische</p>
          </div>
        </div>

        {/* Right Side Elements */}
        <div className="absolute right-[2%] top-1/2 -translate-y-1/2 space-y-12 animate-float-delayed">
          <div className="bg-white/10 dark:bg-slate-800/40 backdrop-blur-xl border border-white/20 p-6 rounded-[2.5rem] shadow-2xl rotate-[8deg] max-w-[220px]">
            <div className="aspect-video bg-slate-700 rounded-2xl mb-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <PlayCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />)}
              </div>
              <span className="text-[9px] font-black text-orange-500 uppercase">Viral Ready</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 md:mb-8 border border-orange-500/20 mx-auto backdrop-blur-sm">
          <Zap className="w-3 h-3 fill-current animate-pulse" /> KI-Design Revolution 2025
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white leading-[1.1] md:leading-tight drop-shadow-sm">
          Designs, die <br className="hidden sm:block" />
          <span className="gradient-brand">Klicks</span> magisch anziehen.
        </h1>

        <p className="text-lg md:text-2xl font-bold text-orange-600 dark:text-orange-500 mb-6 animate-in fade-in slide-in-from-top-4 duration-1000">
          Dein Erfolg beginnt mit dem ersten Eindruck.
        </p>
        
        <p className="text-base md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-semibold px-4 md:px-0">
          Wir kombinieren echte Marktdaten mit modernster KI, um Thumbnails zu erschaffen, die deine Zuschauer nicht ignorieren können.
        </p>

        {/* New: Quick Start Input */}
        <div className="max-w-2xl mx-auto mb-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex flex-col sm:flex-row gap-2 bg-white dark:bg-slate-900 p-2 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-2xl">
             <div className="flex-1 flex items-center px-6">
                <MessageSquare className="w-5 h-5 text-slate-400 mr-4" />
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Was ist dein Video-Thema?" 
                  className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white font-bold placeholder:text-slate-400"
                />
             </div>
             <button 
              onClick={() => onStartCreating(topic)}
              className="px-8 py-4 bg-orange-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-orange-700 shadow-xl active:scale-95"
             >
               Jetzt Schmieden <Zap className="w-4 h-4 fill-current" />
             </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-60">
          <button 
            onClick={onViewPricing}
            className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-orange-600 transition-colors flex items-center gap-2"
          >
            Preise ansehen <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Brand Trust Bar */}
      <div className="mt-24 md:mt-32 overflow-hidden relative">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex items-center gap-3 mx-12 md:mx-20 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
              <brand.icon className={`w-6 h-6 md:w-8 md:h-8 ${brand.color}`} />
              <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{brand.name}</span>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 dark:from-[#1e293b] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 dark:from-[#1e293b] to-transparent z-10" />
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce opacity-40 hidden md:block">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
