
import React from 'react';
import { Zap, Mail, Shield, Scale, Info, Youtube, Twitter, Instagram } from 'lucide-react';
import { APP_NAME } from '../constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pb-12 overflow-hidden border-t border-black/5 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="bg-orange-600 p-2 rounded-xl shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                ClickLabs <span className="text-orange-600">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Die führende KI-Plattform für professionelle YouTube-Vorschaubilder. Wir helfen Creatoren, ihre Klickrate durch Daten und künstliche Intelligenz zu maximieren.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-orange-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-orange-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-orange-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 mb-6">Rechtliches</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-white transition-colors group">
                  <Info className="w-4 h-4 text-slate-300 group-hover:text-orange-600" /> Impressum
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-white transition-colors group">
                  <Shield className="w-4 h-4 text-slate-300 group-hover:text-orange-600" /> Datenschutz
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-white transition-colors group">
                  <Scale className="w-4 h-4 text-slate-300 group-hover:text-orange-600" /> AGB & Nutzungsbedingungen
                </a>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 mb-6">Support</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4 text-slate-300" />
                hello@clicklabs.ai
              </li>
              <li className="pt-2">
                <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-orange-600/10 text-orange-600 border border-orange-600/20 rounded-lg hover:bg-orange-600 hover:text-white transition-all">
                  Hilfe-Center öffnen
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="p-6 bg-slate-900 dark:bg-slate-800 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/10 blur-2xl rounded-full" />
            <h4 className="text-white font-black mb-3 relative z-10">Bereit für mehr Klicks?</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed relative z-10">Melde dich an und erhalte wöchentlich Tipps für bessere Thumbnails.</p>
            <div className="flex gap-2 relative z-10">
              <input 
                type="email" 
                placeholder="Deine E-Mail" 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-600 transition-all"
              />
              <button className="p-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors">
                <Zap className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            © {currentYear} {APP_NAME}. Alle Rechte vorbehalten. Made for Creators.
          </p>
          <div className="flex items-center gap-6">
             <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Systeme online
             </span>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">v2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
