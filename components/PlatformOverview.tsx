
import React from 'react';
import { Sparkles, Wand2, Target, Zap, MousePointer2, TrendingUp, Search, Layers } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, colorClass }: { icon: any, title: string, description: string, colorClass: string }) => (
  <div className="group relative p-8 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
    <div className={`absolute top-0 right-0 w-32 h-32 ${colorClass} opacity-5 blur-[60px] rounded-full group-hover:opacity-10 transition-opacity`} />
    <div className={`w-14 h-14 rounded-2xl ${colorClass} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-7 h-7 ${colorClass.replace('bg-', 'text-').replace('/10', '')}`} />
    </div>
    <h4 className="text-xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">{title}</h4>
    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
      {description}
    </p>
  </div>
);

export const PlatformOverview: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Floating Section Decorations */}
      <div className="absolute top-[10%] left-[5%] animate-float opacity-20 pointer-events-none">
        <div className="p-4 glass-float rounded-2xl border-orange-500/20">
          <Layers className="w-8 h-8 text-orange-500" />
        </div>
      </div>
      <div className="absolute bottom-[10%] right-[5%] animate-float-delayed opacity-20 pointer-events-none">
        <div className="p-4 glass-float rounded-2xl border-blue-500/20">
          <TrendingUp className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-orange-500/20 mx-auto backdrop-blur-sm">
            Die AI-Suite
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Alles was du für <span className="gradient-brand">virale</span> Thumbnails brauchst.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={Wand2}
            title="Smart Generator"
            description="Erstelle Thumbnails, die genau auf deine Nische zugeschnitten sind."
            colorClass="bg-orange-600"
          />
          <FeatureCard 
            icon={Sparkles}
            title="Style Transfer"
            description="Kopiere die Ästhetik der größten Kanäle mit einem Klick."
            colorClass="bg-blue-600"
          />
          <FeatureCard 
            icon={Target}
            title="CTR Prediction"
            description="Unsere KI bewertet dein Design gegen Millionen Datenpunkte."
            colorClass="bg-emerald-600"
          />
          <FeatureCard 
            icon={Search}
            title="Market Research"
            description="Live-Analyse aktueller YouTube-Trends für deine Video-Idee."
            colorClass="bg-amber-600"
          />
        </div>

        <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] border border-white/5 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
             <div className="max-w-lg">
               <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Bereit, deine Klickrate zu verdoppeln?</h3>
               <p className="text-slate-400 font-medium">Starte noch heute kostenlos und entdecke die Power von ThumbCraft AI.</p>
             </div>
             <button className="px-10 py-5 bg-orange-600 text-white rounded-2xl font-black text-base uppercase tracking-widest shadow-xl shadow-orange-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
               Jetzt kostenlos testen <Zap className="w-5 h-5 fill-current" />
             </button>
           </div>
        </div>
      </div>
    </section>
  );
};
