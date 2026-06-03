
import React, { useState, useEffect } from 'react';
import { LineChart, Upload, Loader2, Target, CheckCircle, AlertTriangle, Coins, RefreshCcw, Info, Lightbulb } from 'lucide-react';
import { analyzeThumbnailImage } from '../services/geminiService';
import { User } from '../types';
import { Tooltip } from './Tooltip';

interface StudioAnalyzeProps {
  useCredits: (amount: number) => boolean;
  user: User | null;
}

export const StudioAnalyze: React.FC<StudioAnalyzeProps> = ({ useCredits, user }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [analysis, setAnalysis] = useState<{score: number, feedback: string, suggestions: string[]} | null>(null);

  const cost = 50;
  const isLowCredits = user && user.credits < cost;

  useEffect(() => {
    let interval: any;
    if (loading) {
      setProgress(0);
      const steps = [
        { threshold: 30, text: "Visuelle Analyse..." },
        { threshold: 60, text: "Farbkontraste prüfen..." },
        { threshold: 85, text: "CTR-Modell berechnen..." },
        { threshold: 95, text: "Feedback generieren..." }
      ];

      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.random() * 15;
          const currentStep = steps.find(s => next <= s.threshold) || steps[steps.length - 1];
          setStatusText(currentStep.text);
          return next >= 98 ? 98 : next;
        });
      }, 300);
    } else {
      setProgress(0);
      setStatusText('');
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image || isLowCredits) return;
    
    setLoading(true);
    try {
      const res = await analyzeThumbnailImage(image);
      useCredits(cost);
      setAnalysis(res);
      setProgress(100);
    } catch (err) {
      alert("Analyse fehlgeschlagen.");
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  const handleReset = () => {
    setImage(null);
    setAnalysis(null);
    setProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Input Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-md">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white leading-none tracking-tight">CTR Check</h2>
                </div>
              </div>
              <div className="text-[9px] font-black px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 border border-black/5">
                {cost} Credits
              </div>
            </div>

            <div className={`relative aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden group transition-all shadow-inner ${
              image ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-black/5 dark:border-white/5 hover:border-emerald-500/20'
            }`}>
              {image ? (
                <>
                  <img src={image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={handleReset} className="p-4 bg-red-500 text-white rounded-xl shadow-xl hover:scale-110 transition-all">
                      <RefreshCcw className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-slate-300 mb-2" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Bild hochladen</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={loading || !image || isLowCredits}
              className={`w-full mt-6 py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50 ${
                isLowCredits 
                  ? 'bg-slate-300 dark:bg-slate-700 text-slate-500' 
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 text-white'
              }`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Analyse starten</span>}
            </button>
          </div>

          <div className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-2xl flex items-start gap-4">
             <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
               <Lightbulb className="w-4 h-4" />
             </div>
             <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">Pro-Tipp</p>
               <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Thumbnails mit Gesichtern erzielen im Durchschnitt einen 40% höheren CTR Score.</p>
             </div>
          </div>
        </div>

        {/* Results / Instructions */}
        <div className="lg:col-span-2 flex flex-col">
          {analysis ? (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-[40px] rounded-full" />
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <Tooltip text="Ein Score über 7.0 deutet auf ein starkes Design hin.">
                    <div>
                      <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">KI CTR Score</h3>
                      <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{analysis.score}<span className="text-xl text-slate-400 font-bold ml-1">/10</span></p>
                    </div>
                  </Tooltip>
                  <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${analysis.score > 7 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>
                    {analysis.score > 7 ? 'Top' : 'Audit'}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <Info className="w-3 h-3" /> Feedback
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-bold leading-relaxed">{analysis.feedback}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400">Optimierung</h4>
                    {analysis.suggestions.map((s, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-black/5 group hover:border-emerald-500/20 transition-all">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleReset}
                  className="w-full mt-8 py-4 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] text-slate-500 flex items-center justify-center gap-2 transition-all active:scale-95 border border-black/5 dark:border-white/10"
                >
                  <RefreshCcw className="w-3.5 h-3.5" /> Neues Audit
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[2rem] border border-black/5 dark:border-white/5 h-full flex flex-col">
              <h3 className="text-lg font-black mb-6 text-slate-900 dark:text-white">Analyse-Check</h3>
              <div className="space-y-4 flex-1">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center font-black text-orange-600 shadow-sm shrink-0 text-[10px]">1</div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-bold">Lade deinen Entwurf hoch.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center font-black text-orange-600 shadow-sm shrink-0 text-[10px]">2</div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-bold">Wir simulieren das Sehverhalten.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center font-black text-orange-600 shadow-sm shrink-0 text-[10px]">3</div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-bold">Du erhältst konkrete Tipps.</p>
                </div>
              </div>
              <div className="mt-8 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-black/5 flex items-center gap-3">
                 <Target className="w-6 h-6 text-emerald-500 opacity-20" />
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Optimiert für YouTube 2025</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
