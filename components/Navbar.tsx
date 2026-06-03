
import React, { useState, useEffect } from 'react';
import { User as UserType } from '../types';
import { Zap, Menu, X, Sun, Moon, LogOut, Settings, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  user: UserType | null;
  currentView: string;
  onNavigate: (view: any, subView?: any) => void;
  onLoginClick: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, currentView, onNavigate, onLoginClick, onLogout, isDarkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown-container')) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isProfileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'studio', label: 'Studio' },
    { id: 'pricing', label: 'Preise' },
    { id: 'home', label: 'Home', primary: true },
    { id: 'reviews', label: 'Feedback' },
    { id: 'examples', label: 'Beispiele' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center ${scrolled ? 'pt-2 md:pt-4' : 'pt-3 md:pt-6'} ${currentView === 'studio' ? 'lg:pl-72' : ''}`}>
      <div className={`w-[96%] md:w-[95%] max-w-7xl px-3 md:px-8 py-2.5 md:py-5 flex justify-between items-center transition-all duration-500 rounded-[1.2rem] md:rounded-[3rem] border ${
        scrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-black/5 dark:border-white/10' 
          : 'bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border-transparent shadow-none'
      }`}>
        {/* Brand / Logo */}
        <div 
          className="flex items-center gap-2 md:gap-4 cursor-pointer group shrink-0" 
          onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}
        >
          <div className="bg-orange-600 p-2 md:p-4 rounded-xl md:rounded-[1.5rem] group-hover:scale-110 transition-all shadow-xl shadow-orange-600/30">
            <Zap className="w-4 h-4 md:w-7 md:h-7 text-white fill-white" />
          </div>
          <span className="text-base md:text-3xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center group-hover:text-orange-600 transition-colors whitespace-nowrap">
            ThumbCraft<span className="text-orange-600 ml-0.5">AI</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-[12px] font-black uppercase tracking-[0.15em] transition-all hover:scale-110 active:scale-95 ${
                item.primary 
                  ? `px-7 py-2.5 rounded-full ${currentView === item.id ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-orange-600 hover:text-white hover:shadow-lg'}`
                  : `${currentView === item.id ? 'text-orange-600 underline decoration-2 underline-offset-8' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 md:gap-5">
          <button 
            onClick={toggleTheme} 
            className="p-2 md:p-3.5 rounded-lg md:rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-orange-600 hover:bg-orange-500/5 transition-all active:scale-90"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 md:w-6 md:h-6" /> : <Moon className="w-4 h-4 md:w-6 md:h-6" />}
          </button>

          {user ? (
            <div className="flex items-center gap-2 md:gap-3 relative profile-dropdown-container">
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-gradient-to-tr from-orange-600 to-orange-400 flex items-center justify-center text-white font-black shadow-xl border border-white dark:border-slate-800 text-xs md:text-base hover:scale-110 transition-transform cursor-pointer relative group"
              >
                {user.name.charAt(0).toUpperCase()}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm" />
              </div>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-4 w-72 bg-white dark:bg-slate-900 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] p-5 animate-in slide-in-from-top-2 duration-300 z-[110]">
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-black/5 dark:border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-black text-slate-900 dark:text-white truncate">{user.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Zap className="w-3 h-3 text-orange-600 fill-current" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.credits} Credits</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between px-1">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gelikete Designs</h4>
                      <button 
                        onClick={() => { onNavigate('studio', 'favorites'); setIsProfileOpen(false); }}
                        className="text-[9px] font-black text-orange-600 uppercase tracking-widest hover:underline"
                      >
                        Alle sehen
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                      {user.savedDesigns && user.savedDesigns.length > 0 ? (
                        user.savedDesigns.slice(0, 6).map((design, i) => (
                          <div 
                            key={design.id} 
                            onClick={() => { onNavigate('studio', 'favorites'); setIsProfileOpen(false); }}
                            className="aspect-video rounded-lg overflow-hidden border border-black/5 dark:border-white/5 cursor-pointer hover:scale-105 transition-transform group relative"
                          >
                            <img src={design.imageUrl} className="w-full h-full object-cover" alt="Liked Thumbnail" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))
                      ) : (
                        <div className="col-span-3 py-4 text-center bg-slate-50 dark:bg-white/5 rounded-xl border border-dashed border-black/5">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Noch keine Likes</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => { onLogout(); setIsProfileOpen(false); }}
                    className="w-full py-3.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
                  >
                    <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Abmelden
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="group relative hidden sm:block px-5 md:px-8 py-2.5 md:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest hover:scale-[1.02] transition-all shadow-2xl active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Starten</span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 dark:via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform" />
            </button>
          )}

          <button 
            className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-orange-600 transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[96%] mt-3 lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-black/5 dark:border-white/10 p-5 rounded-[1.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] space-y-2 animate-in slide-in-from-top-2 duration-300 z-50">
          <div className="pb-3 mb-1 border-b border-black/5 dark:border-white/5">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-4">Navigation</p>
          </div>
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => { onNavigate(item.id); setIsMenuOpen(false); }} 
              className={`block w-full p-4 rounded-xl text-left font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-between group ${
                currentView === item.id 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              {item.label}
              {currentView === item.id && <Zap className="w-3 h-3 fill-current animate-pulse" />}
            </button>
          ))}
          {!user && (
            <button 
              onClick={() => { onLoginClick(); setIsMenuOpen(false); }}
              className="group relative block w-full p-4 rounded-xl bg-orange-600 text-white text-center font-black uppercase tracking-widest text-[10px] mt-4 shadow-xl overflow-hidden"
            >
              <span className="relative z-10">Jetzt Einloggen</span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer transition-transform" />
            </button>
          )}
          {user && (
            <button 
              onClick={() => { onLogout(); setIsMenuOpen(false); }} 
              className="block w-full p-4 rounded-xl bg-red-500/10 text-red-500 text-left font-black uppercase tracking-widest text-[10px] mt-2 flex items-center gap-3 active:bg-red-500/20"
            >
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
