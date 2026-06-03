
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles, Terminal, Target, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface ShowcaseItem {
  url: string;
  prompt: string;
  stats: string;
  category: string;
}

export const ThumbnailShowcase: React.FC<{ onStartCreating: () => void }> = ({ onStartCreating }) => {
  const showcaseItems: ShowcaseItem[] = [
    {
      url: "https://i.postimg.cc/KjVMzJ2D/IMG-7324.jpg",
      prompt: "Schockierter Creator, hochexplosives Design, neon-cyan Rim-Lighting, Fokus auf Mimik, Text: DIE WAHRHEIT",
      stats: "CTR um 5.4% gestiegen",
      category: "Beast Style"
    },
    {
      url: "https://i.postimg.cc/hjZkX73b/IMG-7323.jpg",
      prompt: "Extremer Gesichtsausdruck, glühende Augen, Partikel-Effekte im Hintergrund, High-Contrast Gaming-Vibe",
      stats: "CTR um 4.1% gestiegen",
      category: "Gaming"
    },
    {
      url: "https://i.postimg.cc/vTpCzwyG/IMG-7326.jpg",
      prompt: "Dramatisches Storytelling, Fokus auf emotionalem Detail, Cinematic Bokeh, warme Lichttöne",
      stats: "CTR um 6.2% gestiegen",
      category: "Vlog"
    },
    {
      url: "https://i.postimg.cc/9XK3VZ9f/IMG-7327.jpg",
      prompt: "Minimalistisches Technik-Review, sauberer Hintergrund, Fokus auf Smartphone-Display, professionelle Studio-Beleuchtung",
      stats: "CTR um 3.9% gestiegen",
      category: "Tech"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedPrompt, setDisplayedPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typing Effect Logic
  useEffect(() => {
    let timeout: any;
    const fullPrompt = showcaseItems[currentIndex].prompt;

    if (isTyping) {
      if (displayedPrompt.length < fullPrompt.length) {
        timeout = setTimeout(() => {
          setDisplayedPrompt(fullPrompt.slice(0, displayedPrompt.length + 1));
        }, 40); // Geschwindigkeit des Tippens
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 3000); // Verweildauer nach dem Tippen
      }
    } else {
      // Transition to next slide
      timeout = setTimeout(() => {
        const nextIndex = (currentIndex + 1) % showcaseItems.length;
        setCurrentIndex(nextIndex);
        setDisplayedPrompt('');
        setIsTyping(true);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, displayedPrompt, isTyping, showcaseItems]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    setDisplayedPrompt('');
    setIsTyping(true);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? showcaseItems.length - 1 : prev - 1));
    setDisplayedPrompt('');
    setIsTyping(true);
  };

  const currentItem = showcaseItems[currentIndex];

  return (
    <section className="pt-12 pb-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">
             <Sparkles className="w-3.5 h-3.5" /> Live Showcase
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] md:leading-[1.05]">
            Beispiele von unseren <span className="gradient-brand">Creatoren</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            So sehen klickstarke Designs aus, die Creator täglich nutzen.
          </p>
        </div>

        {/* Slideshow Container */}
        <div className="relative max-w-6xl mx-auto group">
          
          {/* Navigation Arrows */}
          <button 
            onClick={goToPrev}
            className="absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-20 p-4 bg-white dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all text-slate-400 hover:text-orange-600 hidden md:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-20 p-4 bg-white dark:bg-slate-800 border border-black/5 dark:border-white/10 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all text-slate-400 hover:text-orange-600 hidden md:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch p-6 md:p-10 bg-white/50 dark:bg-slate-800/40 border border-black/5 dark:border-white/10 rounded-[4rem] transition-all shadow-2xl relative overflow-hidden backdrop-blur-md">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/5 blur-[100px] rounded-full -z-10" />

            {/* Left Side: Typing Prompt Box */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
                  <Terminal className="w-3.5 h-3.5" /> AI Engine Input
                </div>
                <div className="p-6 md:p-8 bg-white dark:bg-slate-950 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-inner relative min-h-[160px] flex items-center">
                  <div className="absolute top-4 right-4 opacity-5">
                    <Zap className="w-10 h-10 text-orange-500" />
                  </div>
                  <p className="text-sm md:text-base font-mono text-slate-700 dark:text-slate-200 leading-relaxed relative z-10">
                    <span className="text-orange-600 dark:text-orange-500 mr-2 font-black">&gt;</span>
                    "{displayedPrompt}"
                    <span className="inline-block w-2 h-5 bg-orange-500 ml-1 animate-pulse" />
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-5 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl w-fit">
                  <Target className="w-5 h-5 text-emerald-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest">Performance Boost</span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {currentItem.stats}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Kategorie: <span className="text-slate-900 dark:text-white">{currentItem.category}</span>
                </div>
              </div>
            </div>

            {/* Right Side: Image Result with Slide Animation */}
            <div className="w-full lg:w-[60%] relative aspect-video rounded-[3rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
              <div key={currentIndex} className="w-full h-full animate-in zoom-in-95 duration-700">
                <img 
                  src={currentItem.url} 
                  alt="ThumbCraft Result" 
                  className="w-full h-full object-cover saturate-[1.1] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8">
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles className="w-4 h-4 text-orange-500 fill-current" />
                    <span className="text-[10px] font-black uppercase tracking-widest">KI-Generiertes Resultat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {showcaseItems.map((_, i) => (
              <button 
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setDisplayedPrompt('');
                  setIsTyping(true);
                }}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  currentIndex === i 
                    ? 'w-12 bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.4)]' 
                    : 'w-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
