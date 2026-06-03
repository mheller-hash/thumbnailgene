
import React, { useState, useRef } from 'react';

export const ComparisonSlider: React.FC = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  // Ein Gesicht mit starkem Ausdruck für den Effekt
  const personImage = "https://images.unsplash.com/photo-1541535881962-3bb380b08458?auto=format&fit=crop&q=80&w=1200";

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden cursor-ew-resize shadow-2xl border-4 border-white dark:border-slate-800 select-none group"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* After Image (Optimized) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-color-dodge z-10 pointer-events-none"></div>
        <img 
          src={personImage} 
          className="w-full h-full object-cover grayscale-0 saturate-[1.8] contrast-[1.25] brightness-[1.1] transition-all duration-300"
          alt="After KI Optimization"
        />
        
        {/* Rim Lighting Simulation */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(59,130,246,0.5)] z-10 pointer-events-none"></div>

        {/* Simulating the Banner from your Upload */}
        <div className="absolute bottom-6 left-6 right-6 z-20">
           <div className="bg-black px-4 py-2 border-2 border-cyan-400 inline-block shadow-[0_0_30px_rgba(34,211,238,0.4)] transform -rotate-1">
              <span className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter italic">Die Wahrheit kommt raus</span>
           </div>
        </div>

        {/* YouTube Overlays */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-red-600 z-20 shadow-[0_-4px_10px_rgba(220,38,38,0.5)]"></div>
        <div className="absolute bottom-4 right-4 bg-black/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-white z-20">10:42</div>
        
        <div className="absolute top-6 right-6 px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase rounded-full shadow-lg z-20 animate-pulse">
          KI-Optimiert
        </div>
      </div>

      {/* Before Image (Raw) */}
      <div 
        className="absolute inset-0 z-30" 
        style={{ width: `${position}%`, overflow: 'hidden' }}
      >
        <img 
          src={personImage} 
          className="w-full h-full object-cover grayscale saturate-[0.1] brightness-[0.7] blur-[1px]"
          style={{ width: `${100 / (position / 100)}%` }}
          alt="Before Optimization"
        />
        <div className="absolute top-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase rounded-full border border-white/20">
          Original-Foto
        </div>
      </div>

      {/* Slider Divider */}
      <div 
        className="absolute inset-y-0 w-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-40"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center group-hover:scale-125 transition-transform border-4 border-cyan-400">
           <div className="flex gap-1">
              <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
              <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
           </div>
        </div>
      </div>
    </div>
  );
};
