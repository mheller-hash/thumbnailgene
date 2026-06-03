import React, { useState } from 'react';
import { 
  MessageSquareText, Cpu, Download, ArrowRight, 
  Copy, Wand2, Sparkles, 
  ImageIcon, LineChart, Target, 
  Youtube, Search, Zap,
  MousePointer2, Star, StarHalf
} from 'lucide-react';

type ToolType = 'generator' | 'remake' | 'analyze' | 'audit';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  shadow: string;
}

const guides: Record<ToolType, { name: string; icon: any; steps: Step[] }> = {
  generator: {
    name: "Generator",
    icon: Wand2,
    steps: [
      {
        icon: <MessageSquareText className="w-7 h-7" />,
        title: "Vision beschreiben",
        description: "Gib dein Thema ein oder nutze unsere Prompt-Helper für Stile wie 'Gaming' oder 'Beast'.",
        color: "bg-orange-500",
        shadow: "shadow-orange-500/20"
      },
      {
        icon: <Cpu className="w-7 h-7" />,
        title: "KI Magie",
        description: "Gemini 2.5 Flash generiert in Sekunden ein hochauflösendes, klickstarkes Thumbnail.",
        color: "bg-orange-600",
        shadow: "shadow-orange-600/20"
      },
      {
        icon: <Download className="w-7 h-7" />,
        title: "4K Download",
        description: "Speichere dein Design in höchster Qualität direkt für deinen YouTube-Upload.",
        color: "bg-orange-700",
        shadow: "shadow-orange-700/20"
      }
    ]
  },
  remake: {
    name: "Remake",
    icon: Copy,
    steps: [
      {
        icon: <Copy className="w-7 h-7" />,
        title: "Vorlage wählen",
        description: "Lade ein bestehendes Thumbnail hoch, dessen Layout oder Stil dir gefällt.",
        color: "bg-indigo-500",
        shadow: "shadow-indigo-500/20"
      },
      {
        icon: <Wand2 className="w-7 h-7" />,
        title: "Anpassung",
        description: "Beschreibe die Änderungen, während die visuelle Struktur erhalten bleibt.",
        color: "bg-indigo-600",
        shadow: "shadow-indigo-600/20"
      },
      {
        icon: <Sparkles className="w-7 h-7" />,
        title: "Stil-Fusion",
        description: "Die KI fusioniert dein neues Motiv perfekt mit der Ästhetik der Vorlage.",
        color: "bg-indigo-700",
        shadow: "shadow-indigo-700/20"
      }
    ]
  },
  analyze: {
    name: "Analyse",
    icon: LineChart,
    steps: [
      {
        icon: <ImageIcon className="w-7 h-7" />,
        title: "Entwurf hochladen",
        description: "Lade dein Design hoch, bevor du es auf YouTube veröffentlichst.",
        color: "bg-emerald-500",
        shadow: "shadow-emerald-500/20"
      },
      {
        icon: <LineChart className="w-7 h-7" />,
        title: "KI-Scoring",
        description: "Unsere KI bewertet die Klickwahrscheinlichkeit basierend auf Millionen Datenpunkten.",
        color: "bg-emerald-600",
        shadow: "shadow-emerald-600/20"
      },
      {
        icon: <Target className="w-7 h-7" />,
        title: "Optimierung",
        description: "Erhalte konkrete Tipps zu Kontrast und Mimik für maximale Performance.",
        color: "bg-emerald-700",
        shadow: "shadow-emerald-700/20"
      }
    ]
  },
  audit: {
    name: "Kanal-Audit",
    icon: Youtube,
    steps: [
      {
        icon: <Youtube className="w-7 h-7" />,
        title: "URL angeben",
        description: "Gib deinen Kanal-Handle an. Wir scannen deine letzten Video-Uploads.",
        color: "bg-red-600",
        shadow: "shadow-red-600/20"
      },
      {
        icon: <Search className="w-7 h-7" />,
        title: "Deep Scan",
        description: "Die KI identifiziert Muster und Schwächen deiner visuellen Identität.",
        color: "bg-red-700",
        shadow: "shadow-red-700/20"
      },
      {
        icon: <Zap className="w-7 h-7" />,
        title: "Erfolgsplan",
        description: "Du erhältst einen Aktionsplan zur Steigerung deiner kanalweiten CTR.",
        color: "bg-red-800",
        shadow: "shadow-red-800/20"
      }
    ]
  }
};

interface HowItWorksProps {
  onExplore?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onExplore }) => {
  const [activeTool, setActiveTool] = useState<ToolType>('generator');
  const currentGuide = guides[activeTool];

  return (
    <section className="pt-0 pb-12 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Social Proof Section */}
        <div className="flex flex-col items-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 object-cover shadow-lg" alt="User" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 object-cover shadow-lg" alt="User" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 object-cover shadow-lg" alt="User" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <StarHalf className="w-4 h-4 fill-current" />
                <span className="ml-1.5 text-sm font-black text-slate-900 dark:text-white">4.5/5</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 text-center">
            Genutzt von über <span className="text-orange-600 dark:text-orange-500">4.500 Creatoren</span> weltweit
          </p>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-orange-600 dark:text-orange-400 mb-12">Workflows</h2>
          
          <div className="flex justify-center mb-12">
            <div className="relative group scale-110 md:scale-125">
              {/* Intensiverer Glow-Effekt im Hintergrund */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-80 transition duration-700 animate-pulse-slow"></div>
              
              <div className="relative px-12 py-5 bg-white/90 dark:bg-slate-950/90 rounded-[2.5rem] leading-none flex items-center border-2 border-orange-500/30 dark:border-white/20 shadow-[0_20px_50px_rgba(249,115,22,0.3)] overflow-hidden">
                {/* Shimmer-Effekt über dem Button */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform" />
                
                <span className="relative z-10 text-2xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-3">
                  Wähle dein <span className="text-orange-600 dark:text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">Tool</span>
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-orange-600 fill-current animate-bounce" />
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center mb-16 px-4">
            <div className="relative w-full max-w-4xl group">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none md:hidden opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none md:hidden opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex p-2 bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-x-auto no-scrollbar snap-x snap-mandatory md:justify-center transition-all duration-500">
                <div className="flex items-center gap-2 min-w-max px-2">
                  {(Object.keys(guides) as ToolType[]).map((key) => {
                    const guide = guides[key];
                    const Icon = guide.icon;
                    const isActive = activeTool === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTool(key)}
                        className={`flex items-center gap-3 px-6 md:px-8 py-4 rounded-[1.8rem] text-sm font-black transition-all duration-500 whitespace-nowrap relative snap-center ${
                          isActive 
                            ? `${guide.steps[0].color} text-white shadow-2xl ${guide.steps[0].shadow} scale-100` 
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'animate-bounce' : ''}`} />
                        {guide.name}
                        {isActive && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] md:hidden animate-pulse">
                Wische zum Wechseln ← →
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-slate-200 dark:bg-slate-800 z-0">
             <div 
              className={`h-full transition-all duration-700 ease-in-out ${currentGuide.steps[0].color}`} 
              style={{ width: '100%' }} 
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {currentGuide.steps.map((step, idx) => (
              <div 
                key={`${activeTool}-${idx}`} 
                className="flex flex-col items-center text-center group animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`relative mb-6 w-20 h-20 rounded-[2rem] ${step.color} text-white flex items-center justify-center shadow-xl ${step.shadow} group-hover:scale-110 transition-all duration-500`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 flex items-center justify-center text-[10px] font-black text-slate-900 dark:text-white shadow-lg">
                    {idx + 1}
                  </div>
                </div>
                
                <h4 className="text-xl font-black mb-3 text-slate-900 dark:text-white">{step.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
                  {step.description}
                </p>
                
                {idx < currentGuide.steps.length - 1 && (
                  <div className="mt-6 md:hidden">
                    <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <button 
            onClick={() => onExplore ? onExplore() : window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all active:scale-95 group border border-transparent shadow-xl shadow-orange-600/20"
          >
            <MousePointer2 className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
            Tool jetzt testen
          </button>
        </div>
      </div>
    </section>
  );
};