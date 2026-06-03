
import React from 'react';
import { Check, Star, ShoppingCart, Sparkles } from 'lucide-react';
import { PRICING_PLANS, PricingPlan } from '../constants';

interface PricingProps {
  onPurchase: (plan: PricingPlan) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onPurchase }) => {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-tight">Skaliere deinen <span className="gradient-brand">Erfolg.</span></h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium text-lg md:text-xl">Wähle den passenden Plan für deine Wachstumsphase.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {PRICING_PLANS.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative p-10 rounded-[3rem] border transition-all duration-500 flex flex-col ${
                plan.popular 
                  ? 'bg-blue-600/5 border-blue-500 shadow-[0_40px_80px_-15px_rgba(59,130,246,0.3)] dark:bg-blue-600/10 scale-105 z-10 ring-4 ring-blue-500/10' 
                  : 'bg-white/50 dark:bg-white/5 border-black/5 dark:border-white/10 hover:-translate-y-2 opacity-90 hover:opacity-100 hover:scale-[1.01]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-2.5 rounded-full flex items-center gap-2 shadow-[0_10px_20px_rgba(59,130,246,0.4)] whitespace-nowrap animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  Bestseller
                </div>
              )}
              
              <div className="mb-10">
                <h3 className={`text-xl font-black mb-4 tracking-tight ${plan.popular ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black text-slate-900 dark:text-white">€{plan.price}</span>
                  <span className="text-slate-500 font-bold">/monatl.</span>
                </div>
                <div className={`mt-5 text-[10px] font-black uppercase px-4 py-2 rounded-xl w-fit border transition-transform hover:scale-105 ${
                  plan.popular 
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/10'
                }`}>
                   {plan.credits} Credits inklusive
                </div>
              </div>

              <div className="space-y-6 mb-12 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-medium text-sm transition-transform hover:translate-x-1">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      plan.popular ? 'bg-blue-500 text-white' : 'bg-blue-500/10 text-blue-600'
                    }`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onPurchase(plan)}
                className={`group relative w-full py-5 rounded-2xl font-black transition-all active:scale-95 flex items-center justify-center gap-3 text-lg overflow-hidden ${
                plan.popular 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.4)] hover:scale-[1.03]' 
                  : 'bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-900 dark:text-white hover:scale-[1.03]'
              }`}>
                <span className="relative z-10 flex items-center gap-3"><ShoppingCart className="w-5 h-5" /> {plan.cta}</span>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
