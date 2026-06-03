
import React, { useState, useCallback } from 'react';
import { Heart, Trash2, Download, Wand2, Clock, Image as ImageIcon, ExternalLink, Loader2 } from 'lucide-react';
import { Design } from '../types';

interface StudioFavoritesProps {
  designs: Design[];
  onRemove: (id: string) => void;
  onModify: (design: Design) => void;
}

// Memoisiertes Favoriten-Item
const FavoriteItem = React.memo(({ 
  design, 
  onRemove, 
  onModify 
}: { 
  design: Design; 
  onRemove: (id: string) => void; 
  onModify: (design: Design) => void;
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = design.imageUrl;
    link.download = `favorite_${design.id}.png`;
    link.click();
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-black/5 dark:border-white/5 overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500">
      <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
            <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
          </div>
        )}
        <img 
          src={design.imageUrl} 
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} 
          alt={design.prompt} 
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-6">
          <div className="flex gap-2">
            <button 
              onClick={handleDownload}
              className="p-3 bg-white text-slate-900 rounded-xl hover:scale-110 transition-transform shadow-lg"
              title="Herunterladen"
            >
              <Download className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onModify(design)}
              className="p-3 bg-orange-600 text-white rounded-xl hover:scale-110 transition-transform shadow-lg"
              title="Weiter bearbeiten"
            >
              <Wand2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onRemove(design.id)}
              className="p-3 bg-rose-500 text-white rounded-xl hover:scale-110 transition-transform shadow-lg"
              title="Löschen"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest mt-2 flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> Details anzeigen
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {new Date(design.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 line-clamp-2 leading-relaxed h-10">
          {design.prompt}
        </p>
        <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 flex gap-2">
           <span className="px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded-md text-[9px] font-black text-slate-400 uppercase tracking-widest">
             {design.style || 'Custom'}
           </span>
           <span className="px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded-md text-[9px] font-black text-slate-400 uppercase tracking-widest">
             {design.aspectRatio || '16:9'}
           </span>
        </div>
      </div>
    </div>
  );
});

export const StudioFavorites: React.FC<StudioFavoritesProps> = ({ designs, onRemove, onModify }) => {
  if (designs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mb-8 text-slate-300">
          <Heart className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-black mb-4">Noch keine Favoriten</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm font-medium leading-relaxed">
          Speichere deine besten Ergebnisse im Studio, um sie hier später wiederzufinden und weiter zu bearbeiten.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            Meine Favoriten
          </h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Deine persönliche Design-Bibliothek</p>
        </div>
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest">
          {designs.length} Designs gesichert
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {designs.map((design) => (
          <FavoriteItem 
            key={design.id} 
            design={design} 
            onRemove={onRemove} 
            onModify={onModify} 
          />
        ))}
      </div>
    </div>
  );
};
