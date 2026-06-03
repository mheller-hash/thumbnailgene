
import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, Wand2, Loader2, PlayCircle, Eye } from 'lucide-react';

const PROMPTS = [
  { 
    text: "Schockierter Gesichtsausdruck, blauer Glow, Text: GEHEIMNIS GELÜFTET...", 
    img: "https://images.unsplash.com/photo-1541535881962-3bb380b08458?auto=format&fit=crop&q=80&w=800",
    banner: "Geheimnis gelüftet",
    color: "border-cyan-400"
  },
  { 
    text: "Gaming-Setup, extreme Neon-Beleuchtung, Action-Pfeile...", 
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    banner: "Der krasseste PC",
    color: "border-red-500"
  },
  { 
    text: "Explosives Food-Design, Burger mit fliegenden Zutaten...", 
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    banner: "50.000 kcal Test",
    color: "border-yellow-400"
  }
];

export const PromptSimulator: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const currentPrompt = PROMPTS[index].text;
    const typeSpeed = isDeleting ? 30 : 60;
    
    if (!isDeleting && displayText === currentPrompt) {
      setTimeout(() => {
        setIsGenerating(true);
        setTimeout(() => {
          setIsGenerating(false);
          setIsDeleting(true);
        }, 3000);
      }, 1000);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % PROMPTS.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(prev => 
        isDeleting ? prev.slice(0, -1) : currentPrompt.slice(0, prev.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-950 rounded-[4rem] p-12 md:p-20 overflow-hidden relative border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-full text-xs font-black uppercase tracking-widest">
                <Terminal className="w-3.5 h-3.5" /> Prompt-Engine v2.0
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Vom Prompt zum <br /><span className="text-blue-500">Klickwunder.</span>
              </h3>
              
              <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-inner">
                <div className="flex items-center gap-3 mb-6 text-slate-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest ml-2">Console</span>
                </div>
                <div className="min-h-[100px] font-mono text-xl md:text-2xl text-slate-100 flex items-start">
                  <span className="text-blue-500 mr-3 shrink-0">&gt;</span>
                  <span className="leading-relaxed">{displayText}</span>
                  <span className="w-2.5 h-8 bg-blue-500 ml-1 animate-pulse"></span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-3">
                   <Eye className="w-5 h-5 text-blue-500" />
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">CTR Prognose</span>
                      <span className="text-lg font-black text-white">94%</span>
                   </div>
                </div>
                <p className="text-sm font-bold text-slate-400">KI-Modelle optimiert für <br /> maximale Relevanz.</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                {isGenerating && (
                  <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center text-white gap-4 animate-in fade-in duration-300">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    <span className="text-xs font-black uppercase tracking-widest">KI rendert Design...</span>
                  </div>
                )}
                
                {/* Simulated Thumbnail Content */}
                <div className="absolute inset-0">
                  <img 
                    src={PROMPTS[index].img} 
                    className={`w-full h-full object-cover transition-all duration-1000 saturate-[1.6] contrast-[1.2] ${isGenerating ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`} 
                    alt="AI Simulation" 
                  />
                  
                  {/* Aggressive Overlays */}
                  {!isGenerating && (
                    <div className="absolute inset-0 animate-in fade-in zoom-in-110 duration-700">
                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                       
                       {/* Banner */}
                       <div className="absolute bottom-8 left-8 right-8">
                          <div className={`bg-black px-4 py-2 border-2 ${PROMPTS[index].color} inline-block shadow-2xl transform -rotate-1`}>
                             <span className="text-white text-xl md:text-3xl font-black uppercase tracking-tighter italic">{PROMPTS[index].banner}</span>
                          </div>
                       </div>

                       {/* Progress Bar Overlay */}
                       <div className="absolute bottom-0 left-0 w-3/4 h-1.5 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
                       <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-[10px] font-black text-white">14:55</div>
                    </div>
                  )}
                </div>

                <div className="absolute top-6 left-6 px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase rounded-xl shadow-xl flex items-center gap-2 z-10">
                  <Wand2 className="w-3.5 h-3.5" /> Generiert in 2.1s
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
