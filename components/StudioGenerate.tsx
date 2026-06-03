
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Wand2, Sparkles, Loader2, Download, Coins, Heart, 
  Zap, Target, Eye, HelpCircle, Type as TypeIcon,
  Search, Info, History, Trash2, ArrowRight, ArrowLeft,
  ExternalLink, Check, MessageSquare, Users, BrainCircuit,
  Image as ImageIcon, MapPin, Star, User as UserIcon, Maximize2, X,
  Youtube, Palette, Layout, Type
} from 'lucide-react';
import { generateThumbnail, analyzeChannelStyle } from '../services/geminiService';
import { User, Design } from '../types';
import { Tooltip } from './Tooltip';

interface StudioGenerateProps {
  useCredits: (amount: number) => boolean;
  user: User | null;
  onGoToPricing?: () => void;
  onSaveDesign?: (design: Design) => void;
  onSavePrompt?: (promptText: string, style: string) => void;
  prefilledTopic?: string;
}

interface GeneratedResult {
  id: string;
  url: string;
  prompt: string;
  optimizedPrompt: string;
  isSaved?: boolean;
  sources?: {title: string, url: string}[];
}

interface WizardStep {
  id: number;
  question: string;
  sub: string;
  key: keyof typeof initialFormData;
  icon: any;
  placeholder: string;
  tooltip: string;
}

const initialFormData = {
  topic: '',
  mainSubject: '',
  mood: '',
  overlayText: '',
  location: '',
  notes: ''
};

const ResultItem = React.memo(({ 
  res, 
  onSave, 
  onDownload,
  onZoom
}: { 
  res: GeneratedResult; 
  onSave: (res: GeneratedResult) => void; 
  onDownload: (url: string) => void;
  onZoom: (url: string) => void;
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group relative animate-in slide-in-from-bottom-4 duration-500 w-full">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg border border-black/5 dark:border-white/5 overflow-hidden transition-all hover:shadow-xl">
        
        <div className="mb-6 relative">
          <div 
            onClick={() => onZoom(res.url)}
            className="aspect-video rounded-2xl overflow-hidden shadow-md border-2 border-white dark:border-slate-800 relative group/img bg-slate-100 dark:bg-slate-800 cursor-zoom-in"
          >
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 animate-pulse">
                <Loader2 className="w-8 h-8 text-orange-600/20 animate-spin" />
              </div>
            )}
            <img 
              src={res.url} 
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover saturate-[1.1] contrast-[1.05] transition-all duration-700 group-hover/img:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
              alt="Thumbnail Result" 
              loading="lazy"
            />
            
            <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
               <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-xl border border-white/10 flex items-center gap-2 shadow-lg">
                 <Eye className="w-3.5 h-3.5 text-orange-500" /> High-CTR
               </div>
               <div className="px-3 py-1.5 bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg flex items-center gap-2">
                 <Zap className="w-3.5 h-3.5 fill-current" /> KI-Optimiert
               </div>
            </div>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
               <button 
                onClick={(e) => { e.stopPropagation(); onSave(res); }}
                disabled={res.isSaved}
                className={`p-4 rounded-2xl shadow-xl transition-all hover:scale-110 active:scale-90 ${res.isSaved ? 'bg-rose-500 text-white' : 'bg-white text-rose-500 hover:bg-rose-50'}`}
               >
                 <Heart className={`w-6 h-6 ${res.isSaved ? 'fill-current' : ''}`} />
               </button>
               <button 
                onClick={(e) => { e.stopPropagation(); onDownload(res.url); }}
                className="p-4 bg-white text-slate-900 rounded-2xl shadow-xl transition-all hover:scale-110 active:scale-90"
               >
                 <Download className="w-6 h-6" />
               </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-orange-600" /> KI-Design-Strategie
              </h4>
           </div>
           <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-black/5 relative overflow-hidden group/text">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-600/50" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{res.optimizedPrompt}"
              </p>
           </div>
        </div>
      </div>
    </div>
  );
});

export const StudioGenerate: React.FC<StudioGenerateProps> = ({ 
  useCredits, 
  user, 
  onGoToPricing, 
  onSaveDesign,
  onSavePrompt,
  prefilledTopic = ''
}) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({...initialFormData, topic: prefilledTopic});
  const [selectedStyle, setSelectedStyle] = useState('MrBeast Style');
  const [useMarketResearch, setUseMarketResearch] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [analyzedChannelStyle, setAnalyzedChannelStyle] = useState<any>(null);
  const [isAnalyzingChannel, setIsAnalyzingChannel] = useState(false);
  const [styleSource, setStyleSource] = useState<'preset' | 'channel'>('preset');
  
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [results, setResults] = useState<GeneratedResult[]>([]);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Fix: Line 153 incomplete 'set' call in useEffect
  useEffect(() => {
    if (prefilledTopic) {
      setFormData(prev => ({ ...prev, topic: prefilledTopic }));
    }
  }, [prefilledTopic]);

  const WIZARD_STEPS: WizardStep[] = [
    {
      id: 0,
      question: "1. Design-Stil festlegen",
      sub: "Wie soll dein Thumbnail aussehen?",
      key: "topic",
      icon: Palette,
      placeholder: "",
      tooltip: "Der Stil bestimmt die visuelle DNA deines Thumbnails."
    },
    {
      id: 1,
      question: "2. Inhalt beschreiben",
      sub: "Was passiert in deinem Video?",
      key: "topic",
      icon: MessageSquare,
      placeholder: "z.B. 24h im Wald überleben",
      tooltip: "Beschreibe dein Video und das Hauptmotiv."
    },
    {
      id: 2,
      question: "3. Text hinzufügen",
      sub: "Welche Botschaft soll auf das Bild?",
      key: "overlayText",
      icon: TypeIcon,
      placeholder: "z.B. UNGLAUBLICH",
      tooltip: "Maximal 3 Worte für beste Lesbarkeit."
    }
  ];

  const handleAnalyzeChannel = async () => {
    if (!channelName.trim()) return;
    setIsAnalyzingChannel(true);
    try {
      const style = await analyzeChannelStyle(channelName);
      setAnalyzedChannelStyle(style);
      // Automatically move to next step if analysis is successful
      setStep(prev => prev + 1);
    } catch (e) {
      alert("Kanal-Analyse fehlgeschlagen. Bitte prüfe den Namen.");
    } finally {
      setIsAnalyzingChannel(false);
    }
  };

  const handleGenerate = async () => {
    if (!useCredits(10)) {
      onGoToPricing?.();
      return;
    }

    setLoading(true);
    setProgress(10);
    setStatusText(analyzedChannelStyle ? `Adapte Stil von ${channelName}...` : "Analysiere Thema...");

    try {
      const styleToUse = styleSource === 'channel' ? `Clone: ${channelName}` : selectedStyle;
      const res = await generateThumbnail(
        formData.topic,
        styleToUse,
        "16:9",
        useMarketResearch,
        formData.overlayText,
        analyzedChannelStyle
      );

      const newResult: GeneratedResult = {
        id: Math.random().toString(36).substr(2, 9),
        url: res.url,
        prompt: formData.topic,
        optimizedPrompt: res.optimizedPrompt,
        sources: res.sources
      };

      setResults([newResult, ...results]);
      if (onSavePrompt) onSavePrompt(formData.topic, selectedStyle);
    } catch (e) {
      alert("Fehler bei der Generierung.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const currentStepData = WIZARD_STEPS[step];

  const renderStepContent = () => {
    if (step === 0) {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-600">
              <Youtube className="w-5 h-5" />
              <h4 className="text-sm font-black uppercase tracking-tight">Option A: Kanal-Stil klonen</h4>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Gib einen Kanalnamen ein, um dessen Farben und Ästhetik zu übernehmen.
            </p>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-red-500 transition-colors" />
              </div>
              <input 
                type="text"
                value={channelName}
                onChange={(e) => {
                  setChannelName(e.target.value);
                  if (styleSource !== 'channel') setStyleSource('channel');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyzeChannel()}
                placeholder="z.B. MrBeast oder Gronkh"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-black/5 dark:border-white/5 rounded-xl pl-10 pr-28 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-red-600/10 transition-all shadow-inner"
              />
              <button 
                onClick={handleAnalyzeChannel}
                disabled={isAnalyzingChannel || !channelName.trim()}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-black text-[9px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {isAnalyzingChannel ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Analysieren'}
              </button>
            </div>

            {analyzedChannelStyle && (
              <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-between animate-in zoom-in-95">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Stil aktiv</p>
                    <h5 className="text-xs font-black text-slate-900 dark:text-white leading-none">{channelName}</h5>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setAnalyzedChannelStyle(null);
                    setChannelName('');
                    setStyleSource('preset');
                  }}
                  className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-emerald-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-black/5 dark:border-white/5"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white dark:bg-slate-900 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Oder Option B</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-orange-600">
              <Sparkles className="w-5 h-5" />
              <h4 className="text-sm font-black uppercase tracking-tight">Vorgefertigte Stile</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {['MrBeast Style', 'Clean Minimalist', 'Epic Gaming', 'Professional Tech', 'Vibrant Vlog'].map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setSelectedStyle(style);
                    setStyleSource('preset');
                    setAnalyzedChannelStyle(null);
                    setChannelName('');
                  }}
                  className={`p-2.5 rounded-xl border transition-all text-center space-y-1 ${selectedStyle === style && styleSource === 'preset' ? 'border-orange-600 bg-orange-600/5 shadow-md' : 'border-black/5 dark:border-white/5 hover:border-orange-600/30'}`}
                >
                  <div className={`w-7 h-7 mx-auto rounded-lg flex items-center justify-center ${selectedStyle === style && styleSource === 'preset' ? 'bg-orange-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-tight leading-tight">{style}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600">
              <MessageSquare className="w-4 h-4" />
              <h4 className="text-xs font-black uppercase tracking-widest">Worum geht es im Video?</h4>
            </div>
            <textarea 
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="Beschreibe kurz dein Video-Thema..."
              className="w-full h-20 bg-slate-50 dark:bg-slate-800/50 border border-black/5 dark:border-white/5 rounded-xl p-4 text-sm font-bold outline-none focus:ring-4 focus:ring-orange-600/10 transition-all shadow-inner"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Target className="w-3.5 h-3.5" />
                <label className="text-[9px] font-black uppercase tracking-widest">Hauptmotiv</label>
              </div>
              <input 
                type="text"
                value={formData.mainSubject}
                onChange={(e) => setFormData({ ...formData, mainSubject: e.target.value })}
                placeholder="z.B. Ein schockierter Mann"
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-black/5 rounded-xl font-bold text-xs outline-none focus:ring-4 focus:ring-orange-600/10 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Palette className="w-3.5 h-3.5" />
                <label className="text-[9px] font-black uppercase tracking-widest">Stimmung</label>
              </div>
              <select 
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-black/5 rounded-xl font-bold text-xs outline-none focus:ring-4 focus:ring-orange-600/10 transition-all shadow-inner appearance-none"
              >
                <option value="">Wähle Stimmung...</option>
                <option value="Epic">Episch & Gewaltig</option>
                <option value="Dramatic">Dramatisch & Spannend</option>
                <option value="Clean">Sauber & Modern</option>
                <option value="Vibrant">Farbenfroh & Knallig</option>
                <option value="Dark">Düster & Geheimnisvoll</option>
                <option value="Neon">Neon & Cyberpunk</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-orange-600">
               <TypeIcon className="w-4 h-4" />
               <h4 className="text-xs font-black uppercase tracking-widest">Text auf dem Thumbnail</h4>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium italic">Tipp: Maximal 2-3 Worte für maximale Klicks.</p>
            <input 
              type="text"
              value={formData.overlayText}
              onChange={(e) => setFormData({ ...formData, overlayText: e.target.value })}
              placeholder="z.B. UNGLAUBLICH oder 100 TAGE"
              className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-black/5 dark:border-white/5 rounded-xl text-sm font-bold outline-none focus:ring-4 focus:ring-orange-600/10 transition-all shadow-inner"
            />
          </div>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-black/10 flex flex-col items-center justify-center text-center">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Vorschau-Simulation</p>
             <div className="relative aspect-video w-48 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
                <span className="text-xl font-black text-white drop-shadow-lg uppercase tracking-tighter transform -rotate-3">
                  {formData.overlayText || 'DEIN TEXT'}
                </span>
             </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
           <button onClick={() => setZoomedImage(null)} className="absolute top-8 right-8 text-white hover:text-orange-500 transition-colors">
             <X className="w-10 h-10" />
           </button>
           <img src={zoomedImage} className="max-w-full max-h-full rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500" alt="Zoomed" />
        </div>
      )}

      {results.length > 0 && !loading && (
        <div className="mb-20 space-y-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <History className="w-8 h-8 text-orange-600" /> Letzte Ergebnisse
          </h2>
          <div className="grid gap-12">
            {results.map(res => (
              <ResultItem 
                key={res.id} 
                res={res} 
                onZoom={setZoomedImage}
                onDownload={(url) => {
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'thumbnail.png';
                  link.click();
                }}
                onSave={(res) => {
                  if (onSaveDesign) {
                    onSaveDesign({
                      id: res.id,
                      imageUrl: res.url,
                      prompt: res.prompt,
                      createdAt: new Date().toISOString(),
                      style: styleSource === 'channel' ? `Clone: ${channelName}` : selectedStyle,
                      aspectRatio: '16:9'
                    });
                    setResults(results.map(r => r.id === res.id ? { ...r, isSaved: true } : r));
                  }
                }}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <button 
              onClick={() => { setResults([]); setStep(0); }}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Verlauf leeren
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-black/5 dark:border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/5 blur-[80px] rounded-full -mr-24 -mt-24" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 relative z-10">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg animate-float">
                <Wand2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight">{currentStepData.question}</h3>
                <p className="text-[10px] font-bold text-slate-400">{currentStepData.sub}</p>
              </div>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-orange-600/10 rounded-xl text-orange-600 border border-orange-500/10 text-[10px] font-black uppercase tracking-widest shadow-inner">
              <Coins className="w-4 h-4" /> 10 Credits
           </div>
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-8 animate-in fade-in">
             <div className="relative">
                <div className="absolute inset-0 bg-orange-600/20 blur-[60px] animate-pulse rounded-full" />
                <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center relative z-10">
                  <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
                </div>
             </div>
             <div className="text-center space-y-2">
                <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">{statusText}</h4>
                <p className="text-slate-400 font-bold text-base">Gleich fertig!</p>
             </div>
             <div className="w-full max-w-md h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-orange-600 to-red-500 transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
             </div>
          </div>
        ) : (
          <div className="space-y-8">
             <div className="relative">
                {renderStepContent()}
                
                {/* Pro Tip Section */}
                <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 delay-300">
                   <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shrink-0 shadow-md">
                      <Info className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-0.5">Pro-Tipp</p>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step === 0 ? "Kanal-Cloning funktioniert am besten bei Kanälen mit konsistentem Design." : 
                         step === 1 ? "Sei spezifisch! Beschreibe dein Video und das Hauptmotiv." :
                         "Weniger ist mehr! Kurze, fette Wörter sind am besten lesbar."}
                      </p>
                   </div>
                </div>
             </div>

             <div className="flex items-center justify-between pt-8 border-t border-black/5 dark:border-white/5">
                <button 
                  onClick={() => setStep(prev => Math.max(0, prev - 1))}
                  disabled={step === 0}
                  className="px-6 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-0 shadow-sm"
                >
                   <ArrowLeft className="w-4 h-4" /> Zurück
                </button>
                
                {step < WIZARD_STEPS.length - 1 ? (
                  <button 
                    onClick={() => setStep(prev => prev + 1)}
                    disabled={step === 0 ? (styleSource === 'channel' && !analyzedChannelStyle) : !formData[currentStepData.key]}
                    className="px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50"
                  >
                     Weiter <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    onClick={handleGenerate}
                    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-600/20"
                  >
                     Thumbnail Schmieden <Zap className="w-5 h-5 fill-current" />
                  </button>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
