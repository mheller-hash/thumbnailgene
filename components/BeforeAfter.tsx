
import React from 'react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

interface ComparisonCardProps {
  beforeUrl: string;
  afterUrl: string;
  title: string;
  category: string;
  ctrBoost: string;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ beforeUrl, afterUrl, title, category, ctrBoost }) => (
  <div className="group flex flex-col bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-black/5 dark:border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10">
    <div className="relative aspect-video flex">
      {/* Before Section */}
      <div className="relative w-1/2 overflow-hidden border-r border-white/20">
        <img src={beforeUrl} className="w-full h-full object-cover grayscale opacity-60" alt="Before" />
        <div className="absolute top-4 left-4 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[8px] font-black uppercase rounded-lg border border-white/10">
          Vorher
        </div>
      </div>
      
      {/* After Section */}
      <div className="relative w-1/2 overflow-hidden">
        <img src={afterUrl} className="w-full h-full object-cover saturate-[1.2] contrast-[1.1]" alt="After" />
        <div className="absolute top-4 right-4 px-2 py-1 bg-orange-600 text-white text-[8px] font-black uppercase rounded-lg shadow-lg">
          Nachher
        </div>
        {/* Subtle Shine Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>

      {/* CTR Badge Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-black/5 dark:border-white/10 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-700 delay-300">
        <Target className="w-3.5 h-3.5 text-emerald-500" />
        <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{ctrBoost} CTR</span>
      </div>
    </div>
    
    <div className="p-8">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">{category}</span>
      </div>
      <h4 className="text-lg font-black text-slate-900 dark:text-white mb-4 leading-tight">{title}</h4>
    </div>
  </div>
);

export const BeforeAfter: React.FC<{ onStartCreating?: () => void }> = ({ onStartCreating }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/30 dark:bg-slate-950/20">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-2">
             <Sparkles className="w-3.5 h-3.5" /> Echte Performance
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            So sieht <span className="gradient-text">Optimierung</span> wirklich aus
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Vorher langweilig – nachher klickstark und viral-ready.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ComparisonCard 
            beforeUrl="https://images.unsplash.com/photo-1541535881962-3bb380b08458?auto=format&fit=crop&q=80&w=600"
            afterUrl="https://i.postimg.cc/L8bTrBwF/IMG-7322.jpg"
            title="Vom einfachen Foto zum Storytelling-Hook"
            category="Beast Style"
            ctrBoost="+5.2%"
          />
          <ComparisonCard 
            beforeUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600"
            afterUrl="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&sat=1.5"
            title="Gaming-Setup mit High-Contrast Rendering"
            category="Gaming Suite"
            ctrBoost="+3.8%"
          />
          <ComparisonCard 
            beforeUrl="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600"
            afterUrl="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600&sat=1.8&con=1.2"
            title="Finanz-Content mit psychologischem Fokus"
            category="Clean Aesthetic"
            ctrBoost="+4.5%"
          />
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
           <button 
            onClick={onStartCreating}
            className="px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-600/20 flex items-center gap-3 transition-all active:scale-95 group"
          >
            Jetzt Thumbnail optimieren <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Kostenlos testen – Keine Kreditkarte nötig
          </p>
        </div>
      </div>
    </section>
  );
};
