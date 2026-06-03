
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Wand2, Target, Youtube, Sparkles, Rocket } from 'lucide-react';

interface TourStep {
  targetId: string | 'center';
  title: string;
  description: string;
  icon: any;
  position: 'right' | 'top' | 'center';
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'center',
    title: 'Willkommen im Studio',
    description: 'Hier entstehen virale Thumbnails. Wir zeigen dir kurz die wichtigsten Werkzeuge für dein Kanal-Wachstum.',
    icon: Rocket,
    position: 'center'
  },
  {
    targetId: 'tour-sidebar-generate',
    title: 'KI Generator',
    description: 'Verwandle deine Vision in Sekunden in ein hocheffektives Design. Wähle aus Stilen wie "Beast" oder "Gaming".',
    icon: Wand2,
    position: 'right'
  },
  {
    targetId: 'tour-sidebar-clone',
    title: 'Stil-Transfer',
    description: 'Kopiere die Ästhetik erfolgreicher Thumbnails und wende sie auf deine eigenen Motive an.',
    icon: Sparkles,
    position: 'right'
  },
  {
    targetId: 'tour-sidebar-analyze',
    title: 'CTR-Analyse',
    description: 'Lass die KI dein Design prüfen. Erhalte einen Score und konkrete Tipps zur Klickraten-Optimierung.',
    icon: Target,
    position: 'right'
  },
  {
    targetId: 'tour-sidebar-channel',
    title: 'Kanal Deep-Audit',
    description: 'Die ultimative Analyse für deinen Kanal. Gemini scannt deine Videos und erstellt einen strategischen Plan.',
    icon: Youtube,
    position: 'right'
  }
];

interface StudioTourProps {
  onComplete: () => void;
}

/**
 * Fixed: Exported component for StudioTour with full implementation.
 */
export const StudioTour: React.FC<StudioTourProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const step = TOUR_STEPS[currentStep];
    if (step.targetId === 'center') {
      setCoords({ top: window.innerHeight / 2, left: window.innerWidth / 2 });
    } else {
      const element = document.getElementById(step.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setCoords({
          top: rect.top + rect.height / 2,
          left: rect.right + 20
        });
      }
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] pointer-events-auto" onClick={onComplete} />
      
      <div 
        className="absolute transition-all duration-500 ease-out pointer-events-auto"
        style={{
          top: coords.top,
          left: coords.left,
          transform: step.position === 'center' ? 'translate(-50%, -50%)' : 'translate(0, -50%)'
        }}
      >
        <div className="w-80 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-2xl p-8 relative animate-in zoom-in-95 duration-300">
          <button 
            onClick={onComplete}
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-600/10 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <Icon className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-white">{step.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
              {step.description}
            </p>

            <div className="flex items-center justify-between w-full pt-6 border-t border-black/5 dark:border-white/5">
              <div className="flex gap-1.5">
                {TOUR_STEPS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-6 bg-orange-600' : 'w-1.5 bg-slate-200 dark:bg-slate-800'}`} 
                  />
                ))}
              </div>
              
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-600/20"
              >
                {currentStep === TOUR_STEPS.length - 1 ? 'Starten' : 'Weiter'} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {step.position === 'right' && (
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-l border-b border-black/5 dark:border-white/10 rotate-45" />
          )}
        </div>
      </div>
    </div>
  );
};
