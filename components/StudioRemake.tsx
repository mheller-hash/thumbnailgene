
import React, { useState, useEffect } from 'react';
import { Copy, Upload, Sparkles, Loader2, Download, Trash2, ArrowRight, Coins, Lightbulb, AlertCircle, Image as ImageIcon, Lock, Wand2, RefreshCcw, Heart, Info, HelpCircle } from 'lucide-react';
import { remakeThumbnail, cloneStyle } from '../services/geminiService';
import { User, Design } from '../types';
import { Tooltip } from './Tooltip';

interface StudioRemakeProps {
  useCredits: (amount: number) => boolean;
  user: User | null;
  isCloneMode?: boolean;
  prefilledImage?: string | null;
  onSaveDesign?: (design: Design) => void;
}

export const StudioRemake: React.FC<StudioRemakeProps> = ({ useCredits, user, isCloneMode = false, prefilledImage, onSaveDesign }) => {
  const [sourceImage, setSourceImage] = useState<string | null>(prefilledImage || null);
  const [adjustment, setAdjustment] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const isStarter = user?.plan === 'Starter';
  const toolCost = isCloneMode ? 30 : 20;
  const isLowCredits = user && user.credits < toolCost;

  useEffect(() => {
    if (prefilledImage) {
      setSourceImage(prefilledImage);
    }
  }, [prefilledImage]);

  useEffect(() => {
    let interval: any;
    if (loading) {
      setProgress(0);
      const steps = [
        { threshold: 25, text: isCloneMode ? "Stil-Fingerabdruck wird erstellt..." : "Bildinhalte werden analysiert..." },
        { threshold: 50, text: isCloneMode ? "Ästhetik wird auf Motiv übertragen..." : "Änderungen werden komponiert..." },
        { threshold: 80, text: "KI-Rendering läuft..." },
        { threshold: 95, text: "Finalisierung..." }
      ];

      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + (Math.random() * 4);
          const currentStep = steps.find(s => next <= s.threshold) || steps[steps.length - 1];
          setStatusText(currentStep.text);
          return next >= 98 ? 98 : next;
        });
      }, 600);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading, isCloneMode]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    setResult(null);
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Bitte lade nur Bilddateien (JPG, PNG) hoch.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setSourceImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!sourceImage || isLowCredits) {
      if (!sourceImage) setError("Bitte lade zuerst ein Referenzbild hoch.");
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);
    setProgress(5);
    setIsSaved(false);

    try {
      let res;
      if (isCloneMode) {
        res = await cloneStyle(sourceImage, adjustment || "A stunning YouTube thumbnail motif");
      } else {
        res = await remakeThumbnail(sourceImage, adjustment || "Professional enhancement of the scene");
      }
      
      useCredits(toolCost);
      setResult(res);
      setProgress(100);
      setStatusText("Fertig!");
    } catch (err: any) {
      console.error("Studio Process Error:", err);
      setError(err.message || "Die Generierung ist fehlgeschlagen. Bitte versuche es mit einem anderen Bild oder Prompt.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (onSaveDesign && result) {
      onSaveDesign({
        id: Math.random().toString(36).substr(2, 9),
        imageUrl: result,
        prompt: adjustment || (isCloneMode ? "Stil-Transfer" : "Bild-Remake"),
        createdAt: new Date().toISOString(),
        style: isCloneMode ? 'Style Clone' : 'Remake',
        aspectRatio: '16:9'
      });
      setIsSaved(true);
    }
  };

  const resetTool = () => {
    setResult(null);
    setError(null);
    setProgress(0);
    setAdjustment('');
    setIsSaved(false);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Input Controls */}
        <div className="space-y-6">
          <div className={`p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-lg relative overflow-hidden`}>
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${isCloneMode ? 'bg-teal-600' : 'bg-indigo-600'} text-white`}>
                  {isCloneMode ? <Sparkles className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                    {isCloneMode ? 'Stil klonen' : 'Bild Remake'}
                  </h2>
                </div>
              </div>
              <div className="text-[9px] font-black px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 border border-black/5">
                {toolCost} Credits
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <div className={`relative h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center group overflow-hidden transition-all ${
                  sourceImage ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-black/5 dark:border-white/5 hover:border-emerald-500/20'
                }`}>
                  {sourceImage ? (
                    <>
                      <img src={sourceImage} className="w-full h-full object-cover" alt="Upload" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button onClick={() => { setSourceImage(null); setAdjustment(''); }} className="p-3 bg-red-500 text-white rounded-xl shadow-xl hover:scale-110 transition-all">
                           <Trash2 className="w-5 h-5" />
                         </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-300 mb-2" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Bild hochladen</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <textarea 
                  value={adjustment}
                  onChange={(e) => setAdjustment(e.target.value)}
                  placeholder={isCloneMode ? "Was soll entstehen? (z.B. Ein Gamer...)" : "Was soll geändert werden?"}
                  className="w-full h-24 bg-slate-50 dark:bg-slate-800/50 border border-black/5 rounded-2xl p-4 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all resize-none font-bold text-sm shadow-inner"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-[10px] font-bold flex items-center gap-2">
                   <AlertCircle className="w-4 h-4 shrink-0" />
                   {error}
                </div>
              )}

              <button 
                onClick={handleProcess}
                disabled={loading || !sourceImage || isLowCredits}
                className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-40 ${
                  isCloneMode ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'
                } text-white`}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>{isCloneMode ? 'Stil klonen' : 'Remake starten'}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Result View */}
        <div className="flex flex-col">
          {result ? (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-xl border-4 border-white dark:border-slate-800 group/result">
                <img src={result} className="w-full h-full object-cover" alt="Ergebnis" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/result:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button 
                    onClick={handleSave}
                    disabled={isSaved}
                    className={`p-4 rounded-2xl transition-all ${isSaved ? 'bg-rose-500 text-white' : 'bg-white text-rose-500 hover:scale-110'}`}
                  >
                    <Heart className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = result;
                      a.download = 'thumbcraft-remake.png';
                      a.click();
                    }}
                    className="p-4 bg-white text-slate-900 rounded-2xl hover:scale-110 transition-all shadow-xl"
                  >
                    <Download className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 px-4 py-2 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-full shadow-lg flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 fill-current" /> KI-Meisterwerk
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={resetTool}
                  className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCcw className="w-5 h-5" /> Neu starten
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-100/50 dark:bg-slate-900/20 rounded-[2.5rem] border-2 border-dashed border-black/5 min-h-[300px]">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-md flex items-center justify-center mb-6">
                <ImageIcon className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-white">Warte auf Input</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs font-medium leading-relaxed">
                Lade ein Bild hoch und beschreibe deine Vision.
              </p>
            </div>
          )}

          <div className="mt-8 p-6 bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl border border-amber-500/10 flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Profi-Tipp</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
                {isCloneMode 
                  ? "Wähle Referenzbilder mit starker Beleuchtung für die besten Ergebnisse."
                  : "Sei spezifisch! Beschreibe deine Änderungen im Detail."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};