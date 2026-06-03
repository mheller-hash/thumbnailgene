
import React, { useState, useCallback } from 'react';
import { 
  Sparkles, X, Loader2, 
  BarChart3, Target, Wand2, 
  Zap, CheckCircle2, Play 
} from 'lucide-react';

interface Example {
  title: string;
  style: string;
  url: string;
  description: string;
  stats: string;
  duration: string;
  psychology: string[];
}

const EXAMPLE_THUMBS: Example[] = [
  {
    title: "30 Tage Offline - Das Experiment",
    style: "Beast",
    url: "https://images.unsplash.com/photo-1541535881962-3bb380b08458?auto=format&fit=crop&q=80&w=1200",
    description: "Maximale CTR durch dramatische Mimik, leuchtende Farben und einen visuellen Fortschrittsbalken.",
    stats: "12.4% CTR",
    duration: "15:20",
    psychology: ["Dramatischer Kontrast", "Emotionaler Trigger", "Storytelling-Elemente"]
  },
  {
    title: "Der ultimative Gaming-PC 2025",
    style: "Gaming",
    url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
    description: "Cyberpunk-Ästhetik mit RGB-Effekten und Tiefenschärfe für Technik-Begeisterte.",
    stats: "8.1% CTR",
    duration: "22:15",
    psychology: ["High-End Lighting", "Zentrierter Fokus", "Subjektives Branding"]
  },
  {
    title: "50.000 kcal Pizza Challenge",
    style: "Beast",
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1200",
    description: "Erhöhte Sättigung und dynamische Action-Shots für Food-Content.",
    stats: "10.5% CTR",
    duration: "11:45",
    psychology: ["Action-Shots", "Appetit-Anregung", "Dynamische Unschärfe"]
  },
  {
    title: "Finanz-Check: Endlich Frei?",
    style: "Clean",
    url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200",
    description: "Seriöses Branding kombiniert mit auffälligen Daten-Visualisierungen.",
    stats: "9.2% CTR",
    duration: "08:30",
    psychology: ["Authority Bias", "Klarheit & Struktur", "Farbpsychologie (Blau)"]
  },
  {
    title: "Minimalismus: Weniger ist Mehr",
    style: "Minimal",
    url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200",
    description: "Fokus on a single, strong motive. Perfect for Lifestyle- and Product-Vlogs.",
    stats: "5.7% CTR",
    duration: "06:12",
    psychology: ["Negative Space", "Soft textures", "Elegant Typography"]
  },
  {
    title: "Daily Vlog: Mein neues Leben",
    style: "Clean",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    description: "Authentic colors and a natural composition for strong viewer engagement.",
    stats: "6.8% CTR",
    duration: "14:02",
    psychology: ["Authenticity", "Soft Focus", "Warm lighting"]
  }
];

const ExampleCard = React.memo(({ 
  item, 
  onPreview, 
  onNavigate 
}: { 
  item: Example; 
  onPreview: (item: Example) => void; 
  onNavigate: () => void;
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div 
      onClick={() => onPreview(item)}
      className="group relative flex flex-col bg-white dark:bg-slate-900/40 rounded-[3rem] border border-black/5 dark:border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl"
    >
      <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-800/50">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin opacity-20" />
          </div>
        )}
        
        <img 
          src={item.url} 
          alt={item.title} 
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 saturate-[1.4] contrast-[1.1] group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute inset-0 bg-blue-600/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 z-20">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
            <Play className="w-8 h-8 fill-current ml-1" />
          </div>
          <span className="text-white text-xs font-black uppercase tracking-widest">Details ansehen</span>
        </div>

        <div className="absolute top-4 left-4 z-10">
           <div className="px-4 py-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-black rounded-full border border-white/20 flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              {item.stats}
           </div>
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight mb-4 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-8">
           <span className="text-[9px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-xl border border-blue-500/10">
            {item.style}-Optimiert
          </span>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onNavigate();
          }}
          className="w-full py-4 bg-slate-50 dark:bg-white/5 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-600 dark:text-slate-300 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 border border-black/5 dark:border-white/5"
        >
          <Wand2 className="w-4 h-4" />
          In diesem Stil erstellen
        </button>
      </div>
    </div>
  );
});

// Define ExamplesProps interface to fix "Cannot find name 'ExamplesProps'" error.
interface ExamplesProps {
  onNavigateToStudio: () => void;
}

export const Examples: React.FC<ExamplesProps> = ({ onNavigateToStudio }) => {
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  const openPreview = useCallback((example: Example) => {
    setSelectedExample(example);
    setModalImageLoaded(false);
    document.body.style.overflow = 'hidden';
  }, []);

  const closePreview = useCallback(() => {
    setSelectedExample(null);
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black mb-6 uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 fill-current" /> 
            Creator Showcase
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white">
            Erfolgs-<span className="gradient-text">Garanten.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            KI-optimierte Thumbnails mit nachgewiesener Performance Steigerung.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {EXAMPLE_THUMBS.map((item, idx) => (
            <ExampleCard 
              key={idx} 
              item={item} 
              onPreview={openPreview} 
              onNavigate={onNavigateToStudio} 
            />
          ))}
        </div>
      </div>

      {selectedExample && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300" onClick={closePreview}></div>
          <div className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-[3.5rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col lg:flex-row">
            <button onClick={closePreview} className="absolute top-8 right-8 z-20 p-3 bg-black/50 hover:bg-red-500 text-white rounded-full transition-all active:scale-90"><X className="w-6 h-6" /></button>
            <div className="lg:w-2/3 relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[300px]">
              {!modalImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                </div>
              )}
              <img 
                src={selectedExample.url} 
                className={`w-full h-full object-cover saturate-[1.6] contrast-[1.2] transition-opacity duration-700 ${modalImageLoaded ? 'opacity-100' : 'opacity-0'}`} 
                onLoad={() => setModalImageLoaded(true)} 
                alt={selectedExample.title} 
              />
              <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(59,130,246,0.3)]"></div>
              <div className="absolute bottom-8 left-8 flex gap-3">
                 <div className="px-5 py-2.5 bg-emerald-500 text-white rounded-2xl shadow-2xl flex items-center gap-2 font-black text-sm"><Target className="w-4 h-4" />{selectedExample.stats}</div>
                 <div className="px-5 py-2.5 bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center gap-2 font-black text-sm"><Zap className="w-4 h-4 fill-current" />KI-Rendered</div>
              </div>
            </div>
            <div className="lg:w-1/3 p-10 lg:p-14 flex flex-col bg-slate-50 dark:bg-slate-900/80">
              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{selectedExample.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">{selectedExample.description}</p>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Psychologische Analyse</h4>
                  <div className="grid gap-3">
                    {selectedExample.psychology.map((trait, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-black/5 dark:border-white/5 group hover:border-blue-500/30 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => { onNavigateToStudio(); closePreview(); }} className="mt-12 w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition-all active:scale-[0.98] shadow-xl">Studio betreten</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
