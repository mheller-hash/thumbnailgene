import React, { useState, useEffect } from 'react';
import { Youtube, Search, Loader2, Sparkles, CheckCircle, AlertTriangle, Coins, RefreshCcw, FileText, Database, ExternalLink, ShieldCheck, Zap, Lock } from 'lucide-react';
import { analyzeYoutubeChannel } from '../services/geminiService';
import { User } from '../types';

interface StudioChannelAnalyzeProps {
  useCredits: (amount: number) => boolean;
  user: User | null;
}

export const StudioChannelAnalyze: React.FC<StudioChannelAnalyzeProps> = ({ useCredits, user }) => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [result, setResult] = useState<any | null>(null);

  const cost = 100;
  const isLowCredits = user && user.credits < cost;

  useEffect(() => {
    let interval: any;
    if (loading) {
      setProgress(0);
      const steps = [
        { threshold: 15, text: "Google Grounding wird vorbereitet..." },
        { threshold: 40, text: "Echtzeit-Kanalscan läuft..." },
        { threshold: 65, text: "Wettbewerber-Benchmark..." },
        { threshold: 85, text: "Visual-Data-Processing..." },
        { threshold: 98, text: "Insights werden kuratiert..." }
      ];

      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.random() * 5;
          const currentStep = steps.find(s => next <= s.threshold) || steps[steps.length - 1];
          setStatusText(currentStep.text);
          return next >= 98 ? 98 : next;
        });
      }, 500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async () => {
    if (!url.trim() || isLowCredits) {
      if (!url.trim()) setUrlError("Bitte gib eine Kanal-URL an.");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const res = await analyzeYoutubeChannel(url);
      useCredits(cost);
      setResult(res);
      setProgress(100);
    } catch (err) {
      alert("Analyse fehlgeschlagen.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full pointer-events-none -mr-32 -mt-32" />
        
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg animate-float">
              <Youtube className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">Kanal Deep-Audit</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Powered by Google Search & Gemini 2.5</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 text-[10px] font-black px-4 py-2 rounded-xl border shadow-inner transition-all ${
            isLowCredits ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/10'
          }`}>
            <Coins className="w-4 h-4" /> {cost} Credits
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          <div className="space-y-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur opacity-10 group-focus-within:opacity-25 transition duration-1000"></div>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setUrlError(null); }}
                  placeholder="YouTube-Kanal Name oder Link..."
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-800/50 border border-black/5 dark:border-white/10 rounded-2xl text-base font-bold focus:ring-4 focus:ring-red-600/10 outline-none transition-all shadow-inner"
                />
              </div>
            </div>
            {urlError && <p className="text-red-500 text-[10px] font-bold px-6 animate-pulse">{urlError}</p>}
          </div>

          {loading && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                <span className="text-red-600 animate-pulse flex items-center gap-2">
                  <Database className="w-3 h-3" /> {statusText}
                </span>
                <span className="text-slate-400">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-black/5 dark:border-white/5">
                <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(220,38,38,0.3)]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <div className="flex gap-3">
             <button 
                onClick={handleAnalyze}
                disabled={loading || !url || isLowCredits}
                className={`flex-1 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-40 ${
                  isLowCredits 
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed' 
                    : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                }`}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLowCredits ? <Lock className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />)}
                {isLowCredits ? 'Nicht genügend Credits' : 'Audit jetzt starten'}
              </button>
              {result && (
                <button onClick={() => { setUrl(''); setResult(null); }} className="px-4 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400"><RefreshCcw className="w-5 h-5" /></button>
              )}
          </div>
        </div>
      </div>

      {result && (
        <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
               <h3 className="text-xl font-black mb-3">{result.channelName}</h3>
               <p className="text-sm opacity-80 leading-relaxed font-medium">{result.identitySummary}</p>
            </div>

            <div className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-[2rem] shadow-sm">
               <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">Live Research</h4>
               <div className="space-y-1.5">
                 {result.sources && result.sources.slice(0, 3).map((s: any, i: number) => (
                   <a key={i} href={s.url} target="_blank" className="block p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-black/5 hover:border-blue-500/50 transition-all truncate text-[9px] font-bold">
                     {s.title}
                   </a>
                 ))}
               </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-black/5 shadow-lg">
              <h4 className="text-emerald-500 font-black flex items-center gap-2 mb-4 uppercase text-[10px] tracking-widest">Stärken</h4>
              <ul className="space-y-2">
                {result.strengths.slice(0, 3).map((s: string, i: number) => (
                  <li key={i} className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full mt-1.5 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-black/5 shadow-lg">
              <h4 className="text-amber-500 font-black flex items-center gap-2 mb-4 uppercase text-[10px] tracking-widest">Schwächen</h4>
              <ul className="space-y-2">
                {result.weaknesses.slice(0, 3).map((w: string, i: number) => (
                  <li key={i} className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 shrink-0" /> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-black/5 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.02] rotate-12"><Sparkles className="w-48 h-48" /></div>
             <h4 className="text-xl font-black mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-600/20">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                Aktionsplan
             </h4>
             <div className="grid md:grid-cols-3 gap-6">
                {result.actionPlan.map((step: string, i: number) => (
                  <div key={i} className="relative p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-black/5 group hover:bg-white dark:hover:bg-slate-800 transition-all">
                    <span className="text-4xl font-black text-orange-600/10 absolute top-3 right-6 group-hover:text-orange-600/20 transition-colors">{i+1}</span>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-200 relative z-10 leading-snug">{step}</p>
                  </div>
                ))}
             </div>
             <div className="mt-8 flex justify-center">
                <button className="px-8 py-3.5 bg-orange-600 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                   <FileText className="w-4 h-4" /> PDF Strategie
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};