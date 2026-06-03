
import React from 'react';
import { LayoutGrid, Youtube, ChevronRight } from 'lucide-react';

interface HomeCategoriesProps {
  onSelectCategory: (category: 'suite' | 'channel') => void;
}

export const HomeCategories: React.FC<HomeCategoriesProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400 mb-4">Plattform Fokus</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Wähle deinen <span className="gradient-text">Arbeitsbereich</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Thumbnail Suite Card */}
          <button
            onClick={() => onSelectCategory('suite')}
            className="group relative flex flex-col p-12 bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl border-2 border-teal-500/20 dark:border-teal-500/10 rounded-[4rem] text-left transition-all hover:-translate-y-4 hover:border-teal-500/50 hover:shadow-[0_40px_80px_-15px_rgba(45,212,191,0.2)] active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 blur-[100px] rounded-full group-hover:bg-teal-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[2rem] bg-teal-600/10 flex items-center justify-center mb-10 text-teal-600 shadow-inner">
                <LayoutGrid className="w-12 h-12" />
              </div>
              <h4 className="text-4xl font-black mb-4 text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">Thumbnail-Suite</h4>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                Erstelle, überarbeite, klone und analysiere deine Thumbnails in einer einheitlichen, KI-gestützten Umgebung.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                {['Generator', 'Stil-Klon', 'CTR-Analyse'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest border border-black/5 dark:border-white/5">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-3 font-black text-sm uppercase tracking-[0.2em] text-teal-600">
                Suite betreten <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </button>

          {/* Channel Analysis Card */}
          <button
            onClick={() => onSelectCategory('channel')}
            className="group relative flex flex-col p-12 bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl border-2 border-blue-500/20 dark:border-blue-500/10 rounded-[4rem] text-left transition-all hover:-translate-y-4 hover:border-blue-500/50 hover:shadow-[0_40px_80px_-15px_rgba(59,130,246,0.2)] active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[2rem] bg-blue-600/10 flex items-center justify-center mb-10 text-blue-600 shadow-inner">
                <Youtube className="w-12 h-12" />
              </div>
              <h4 className="text-4xl font-black mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Kanal-Analyse</h4>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                Analysiere die Performance und den visuellen Stil deines YouTube-Kanals mit unserem intelligenten KI-Auditor.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                {['Kanal-Audit', 'Visuelle Identität', 'Aktionsplan'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest border border-black/5 dark:border-white/5">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-3 font-black text-sm uppercase tracking-[0.2em] text-blue-600">
                Audit starten <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
