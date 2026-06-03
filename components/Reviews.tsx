
import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '../constants';

export const Reviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide]);

  return (
    <section className="py-24 bg-sky-50/50 dark:bg-slate-900/30 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex -space-x-4 mb-8">
            {REVIEWS.slice(0, 5).map(review => (
              <img key={review.id} src={review.avatar} className="w-14 h-14 rounded-full border-4 border-white dark:border-slate-900 object-cover shadow-lg" alt={review.name} />
            ))}
          </div>
          <h2 className="text-4xl md:text-8xl font-black mb-6 tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Was unsere <span className="gradient-brand">Creator</span> sagen
          </h2>
          <div className="flex items-center gap-1 text-yellow-500">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            <span className="text-slate-600 dark:text-slate-400 ml-2 font-bold text-sm">4.9/5 von über 4.500 Nutzern</span>
          </div>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white dark:bg-slate-800 border border-black/5 dark:border-white/10 text-slate-400 hover:text-orange-600 hover:border-orange-500/50 transition-all active:scale-90 hidden sm:block shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white dark:bg-slate-800 border border-black/5 dark:border-white/10 text-slate-400 hover:text-orange-600 hover:border-orange-500/50 transition-all active:scale-90 hidden sm:block shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slides */}
          <div className="relative h-[450px] md:h-[380px]">
            {REVIEWS.map((review, idx) => (
              <div 
                key={review.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  idx === activeIndex 
                    ? 'opacity-100 translate-x-0 scale-100' 
                    : idx < activeIndex 
                      ? 'opacity-0 -translate-x-full scale-90' 
                      : 'opacity-0 translate-x-full scale-90'
                }`}
              >
                <div className="h-full p-10 md:p-14 rounded-[3rem] bg-white dark:bg-slate-900 border border-black/5 dark:border-white/5 flex flex-col justify-between shadow-2xl shadow-blue-900/5 dark:shadow-black/40 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 dark:opacity-10 group-hover:opacity-10 transition-opacity text-orange-600 dark:text-orange-400">
                    <Quote className="w-40 h-40" />
                  </div>
                  
                  <div>
                    <div className="flex gap-1 text-yellow-500 mb-8">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="text-xl md:text-2xl italic text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-6 pt-10 border-t border-slate-100 dark:border-white/10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-orange-500 blur-xl opacity-10 group-hover:opacity-30 transition-opacity rounded-full"></div>
                      <img src={review.avatar} className="relative w-16 h-16 rounded-full object-cover border-4 border-slate-50 dark:border-slate-800 shadow-sm" alt={review.name} />
                    </div>
                    <div>
                      <p className="text-base font-black text-slate-900 dark:text-white leading-none mb-1">{review.name}</p>
                      <p className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider">{review.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-4 mt-16">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-3 rounded-full transition-all duration-500 ${
                  idx === activeIndex 
                    ? 'w-14 bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.4)]' 
                    : 'w-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
