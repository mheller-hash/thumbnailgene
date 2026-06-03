
import React, { useState, useEffect, useRef } from 'react';
import { User, Design, SavedPrompt, MainView, StudioView } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { Reviews } from './components/Reviews';
import { AuthModal } from './components/AuthModal';
import { Examples } from './components/Examples';
import { StudioSelection } from './components/StudioSelection';
import { StudioGenerate } from './components/StudioGenerate';
import { StudioChannelAnalyze } from './components/StudioChannelAnalyze';
import { StudioAnalyze } from './components/StudioAnalyze';
import { StudioRemake } from './components/StudioRemake';
import { StudioFavorites } from './components/StudioFavorites';
import { HowItWorks } from './components/HowItWorks';
import { ThumbnailShowcase } from './components/ThumbnailShowcase';
import { ComparisonTable } from './components/ComparisonTable';
import { Sidebar } from './components/Sidebar';
import { StudioTour } from './components/StudioTour';
import { Footer } from './components/Footer';
import { 
  CheckCircle, ArrowLeft, Zap, Sparkles, Target, Star, 
  PlayCircle, TrendingUp, MousePointer2, Coins, Youtube, 
  BarChart3, Image as ImageIcon, Wand2, Search, BrainCircuit, LayoutGrid
} from 'lucide-react';
import { PricingPlan } from './constants';

const FloatingDecorations = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
    <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-orange-600/20 blur-[160px] rounded-full animate-pulse-slow" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-blue-600/15 blur-[160px] rounded-full animate-pulse-slow" />
    
    <div className="absolute top-[20%] left-[2%] animate-float-slow opacity-60 hidden 2xl:block">
      <div className="p-5 glass-float rounded-[2rem] border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.2)]">
        <Sparkles className="w-12 h-12 text-orange-500" />
      </div>
    </div>
    
    <div className="absolute top-[60%] left-[3%] animate-float-reverse opacity-50 hidden 2xl:block">
      <div className="p-6 glass-float rounded-full border-emerald-500/20 shadow-2xl">
        <TrendingUp className="w-10 h-10 text-emerald-500" />
      </div>
    </div>

    <div className="absolute top-[35%] right-[2%] animate-float-delayed opacity-60 hidden 2xl:block">
      <div className="p-6 glass-float rounded-3xl border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
        <Target className="w-12 h-12 text-blue-400" />
      </div>
    </div>

    <div className="absolute top-[75%] right-[3%] animate-float-slow opacity-50 hidden 2xl:block">
      <div className="px-6 py-4 glass-float rounded-2xl border-orange-500/40 flex items-center gap-3 shadow-xl">
        <Zap className="w-6 h-6 text-orange-500 fill-current animate-pulse" />
        <span className="text-xs font-black uppercase text-white tracking-widest">Viral Optimized</span>
      </div>
    </div>

    {[...Array(12)].map((_, i) => (
      <div 
        key={i}
        className={`absolute rounded-full bg-orange-500/20 animate-float-complex`}
        style={{
          width: Math.random() * 10 + 5 + 'px',
          height: Math.random() * 10 + 5 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 8 + 's',
          animationDuration: Math.random() * 15 + 10 + 's'
        }}
      />
    ))}
  </div>
);

const ScrollingDecorations = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
      <div 
        className="absolute top-[160vh] right-[5%] hidden xl:block"
        style={{ transform: `translateY(${scrollY * -0.25}px) rotate(12deg)` }}
      >
        <div className="p-10 glass-float rounded-[3.5rem] border border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.3)] backdrop-blur-3xl scale-90">
           <div className="flex items-center gap-5 mb-6">
              <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                 <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="block text-xs font-black uppercase tracking-widest text-white/40">AI-Vorhersage</span>
                <span className="text-xl font-black text-white">9.4% CTR</span>
              </div>
           </div>
           <div className="h-32 w-56 bg-slate-900/80 rounded-3xl flex items-center justify-center border border-white/5">
              <BarChart3 className="w-16 h-16 text-orange-600/30" />
           </div>
        </div>
      </div>

      <div 
        className="absolute top-[300vh] left-[4%] hidden xl:block"
        style={{ transform: `translateY(${scrollY * -0.15}px) rotate(-8deg)` }}
      >
        <div className="p-6 glass-float rounded-3xl border border-white/10 shadow-2xl flex items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
           </div>
           <div>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">User Feedback</p>
             <p className="text-sm font-black text-white uppercase tracking-tight">"Viral in 2 Stunden!"</p>
           </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-[1200vh] opacity-[0.04] dark:opacity-[0.07] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #f97316 2px, transparent 2px)', backgroundSize: '80px 80px' }} />
    </div>
  );
};

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [currentView, setCurrentView] = React.useState<MainView>('home');
  const [studioView, setStudioView] = React.useState<StudioView>('dashboard');
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [purchaseSuccess, setPurchaseSuccess] = useState<{ planName: string, amount: number } | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [prefilledImageForRemake, setPrefilledImageForRemake] = useState<string | null>(null);
  const [prefilledTopic, setPrefilledTopic] = useState<string>('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setIsDarkMode(false);
    else setIsDarkMode(true);
    
    const savedUser = localStorage.getItem('thumbcraft_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (user) localStorage.setItem('thumbcraft_user', JSON.stringify(user));
  }, [user]);

  const handleLogin = (email: string) => {
    const newUser: User = { 
      id: '1', 
      email: email, 
      name: email.split('@')[0], 
      credits: 30, 
      isLoggedIn: true,
      plan: 'Starter',
      savedDesigns: [],
      savedPrompts: []
    };
    setUser(newUser);
    setIsAuthOpen(false);
    setCurrentView('studio');
    setStudioView(prefilledTopic ? 'generate' : 'dashboard');

    const hasSeenTour = localStorage.getItem('hasSeenStudioTour');
    if (!hasSeenTour) setTimeout(() => setShowTour(true), 1500);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('thumbcraft_user');
    setCurrentView('home');
    setStudioView('dashboard');
    setShowTour(false);
  };

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const useCredits = (amount: number): boolean => {
    if (!user || user.credits < amount) {
      setCurrentView('pricing');
      return false;
    }
    setUser({ ...user, credits: user.credits - amount });
    return true;
  };

  const handlePurchase = (plan: PricingPlan) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setUser({ ...user, credits: user.credits + plan.credits, plan: plan.name as any });
    setPurchaseSuccess({ planName: plan.name, amount: plan.credits });
    setTimeout(() => setPurchaseSuccess(null), 5000);
    setCurrentView('studio');
  };

  const handleSaveDesign = (design: Design) => {
    if (!user) return;
    const favorites = user.savedDesigns || [];
    if (favorites.some(f => f.id === design.id)) return;
    setUser({ ...user, savedDesigns: [...favorites, design] });
  };

  const handleSavePrompt = (promptText: string, style: string) => {
    if (!user || !promptText.trim()) return;
    const saved = user.savedPrompts || [];
    if (saved.some(p => p.text === promptText)) return;
    const newPrompt: SavedPrompt = {
      id: Math.random().toString(36).substr(2, 9),
      text: promptText,
      style: style,
      createdAt: new Date().toISOString()
    };
    setUser({ ...user, savedPrompts: [newPrompt, ...saved] });
  };

  const handleRemoveFavorite = (id: string) => {
    if (!user) return;
    setUser({ ...user, savedDesigns: (user.savedDesigns || []).filter(d => d.id !== id) });
  };

  const handleModifyFavorite = (design: Design) => {
    setPrefilledImageForRemake(design.imageUrl);
    setStudioView('clone');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: MainView, subView?: StudioView) => {
    if (view === currentView && !subView) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (view === 'studio' && !user) {
      setIsAuthOpen(true);
      return;
    }

    setIsNavigating(true);
    setTimeout(() => {
      setCurrentView(view);
      if (view === 'studio') {
        setStudioView(subView || 'dashboard');
        const hasSeenTour = localStorage.getItem('hasSeenStudioTour');
        if (user && !hasSeenTour) setTimeout(() => setShowTour(true), 1000);
      } else {
        setShowTour(false);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsNavigating(false);
    }, 200);
  };

  const handleBack = () => {
    if (currentView === 'studio' && studioView !== 'dashboard') {
      setStudioView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleNavigate('home');
    }
  };

  const handleStartCreating = (prefill?: string) => {
    if (prefill) setPrefilledTopic(prefill);
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    handleNavigate('studio');
    if (prefill) setStudioView('generate');
  };

  const handleSelectStudioTool = (tool: StudioView) => {
    setStudioView(tool);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen transition-all duration-500 selection:bg-orange-600 selection:text-white bg-slate-50 dark:bg-[#1e293b] dark:text-slate-100 relative overflow-x-hidden">
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.08),transparent_80%)] mix-blend-screen animate-pulse-slow" />
        
        {currentView === 'home' && (
          <div className="w-full h-full relative">
            <img 
              src="https://i.postimg.cc/R0Zm8Z08/IMG-7382.jpg" 
              className="w-full h-full object-cover scale-105 opacity-[0.95] dark:opacity-40 blur-[0.2px] animate-float-slow" 
              alt="Background" 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-slate-900/40 dark:from-transparent" />
          </div>
        )}
      </div>

      <FloatingDecorations />
      {currentView === 'home' && <ScrollingDecorations />}

      <main className={`relative z-20 transition-all duration-300 ${currentView === 'studio' ? 'lg:pl-72' : ''} ${isNavigating ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'}`}>
        <Navbar 
          user={user} 
          currentView={currentView}
          onNavigate={handleNavigate} 
          onLoginClick={() => setIsAuthOpen(true)} 
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />

        {currentView !== 'home' && (
          <div className="fixed top-28 right-4 lg:right-12 z-50 animate-in fade-in slide-in-from-right-4">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-white/40 dark:border-white/20 rounded-2xl shadow-xl hover:shadow-orange-500/20 hover:border-orange-500/40 group transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-orange-600 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-800 dark:text-white">Zurück</span>
            </button>
          </div>
        )}

        {currentView === 'home' && (
          <div className="animate-in fade-in duration-700 relative z-20">
            <Hero onStartCreating={handleStartCreating} onViewPricing={() => handleNavigate('pricing')} />
            <HowItWorks onExplore={() => handleNavigate('examples')} />
            <ThumbnailShowcase onStartCreating={() => handleStartCreating()} />
            <ComparisonTable />
            <Reviews />
            <Pricing onPurchase={handlePurchase} />
            <Footer />
          </div>
        )}
        
        {currentView === 'studio' && (
          <div className="pt-20 min-h-screen relative z-20">
            <Sidebar activeView={studioView} onSelect={setStudioView} user={user} onUpgrade={() => handleNavigate('pricing')} />
            <div className="p-4 lg:p-8 pb-24">
              <div key={studioView} className="animate-in fade-in slide-up duration-400">
                {studioView === 'dashboard' && <StudioSelection user={user} onSelectMode={(mode) => handleSelectStudioTool(mode as StudioView)} onGoToPricing={() => handleNavigate('pricing')} />}
                {studioView === 'generate' && <StudioGenerate useCredits={useCredits} user={user} onGoToPricing={() => handleNavigate('pricing')} onSaveDesign={handleSaveDesign} onSavePrompt={handleSavePrompt} prefilledTopic={prefilledTopic} />}
                {studioView === 'clone' && <StudioRemake useCredits={useCredits} user={user} isCloneMode={true} prefilledImage={prefilledImageForRemake} onSaveDesign={handleSaveDesign} />}
                {studioView === 'analyze' && <StudioAnalyze useCredits={useCredits} user={user} />}
                {studioView === 'channel' && <StudioChannelAnalyze useCredits={useCredits} user={user} />}
                {studioView === 'favorites' && <StudioFavorites designs={user?.savedDesigns || []} onRemove={handleRemoveFavorite} onModify={handleModifyFavorite} />}
              </div>
            </div>
          </div>
        )}

        {(currentView === 'pricing' || currentView === 'reviews' || currentView === 'examples') && (
          <div className="pt-24 min-h-screen animate-in fade-in duration-500 relative z-20">
            {currentView === 'pricing' && <Pricing onPurchase={handlePurchase} />}
            {currentView === 'reviews' && <Reviews />}
            {currentView === 'examples' && <Examples onNavigateToStudio={() => handleStartCreating()} />}
            <Footer />
          </div>
        )}
      </main>

      {showTour && currentView === 'studio' && <StudioTour onComplete={() => { setShowTour(false); localStorage.setItem('hasSeenStudioTour', 'true'); }} />}
      {isAuthOpen && <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />}
      {purchaseSuccess && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-orange-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8">
          <CheckCircle className="w-6 h-6" />
          <div>
            <p className="text-sm font-black uppercase tracking-widest">Kauf erfolgreich!</p>
            <p className="text-xs font-bold opacity-80">{purchaseSuccess.amount} Credits zum {purchaseSuccess.planName}-Plan hinzugefügt.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
