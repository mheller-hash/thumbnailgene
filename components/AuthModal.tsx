
import React, { useState } from 'react';
import { X, Mail, Lock, AlertCircle, LogIn, UserPlus, Loader2, CheckCircle2, ChevronRight, Info, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

type GoogleLoginStep = 'initial' | 'connecting' | 'select_account' | 'permissions' | 'finalizing' | 'success';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Google Login Simulation States
  const [googleStep, setGoogleStep] = useState<GoogleLoginStep>('initial');
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState<any>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }

    onLogin(email);
  };

  const handleGoogleSimulation = () => {
    setGoogleStep('connecting');
    setTimeout(() => {
      setGoogleStep('select_account');
    }, 1000);
  };

  const handleAccountSelect = (account: any) => {
    setSelectedGoogleAccount(account);
    setGoogleStep('permissions');
  };

  const grantPermissions = () => {
    setGoogleStep('finalizing');
    setTimeout(() => {
      setGoogleStep('success');
      setTimeout(() => {
        onLogin(selectedGoogleAccount.email);
        setGoogleStep('initial');
      }, 1200);
    }, 1500);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {googleStep === 'initial' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-600/10 text-orange-600 mb-6 border border-orange-600/20">
                {isLogin ? <LogIn className="w-8 h-8" /> : <UserPlus className="w-8 h-8" />}
              </div>
              <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white tracking-tight">
                {isLogin ? 'Willkommen zurück' : 'Konto erstellen'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Melde dich bei **ClickLabs AI** an.
              </p>
            </div>

            {/* Google Login Button */}
            <button 
              onClick={handleGoogleSimulation}
              className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl font-bold mb-6 hover:bg-slate-50 dark:hover:bg-white/10 transition-all active:scale-[0.98] shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Weiter mit Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/5 dark:border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                <span className="px-3 bg-white dark:bg-slate-900 text-slate-400">E-Mail & Passwort</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className={`absolute left-4 top-4 w-5 h-5 ${error && !validateEmail(email) ? 'text-red-500' : 'text-slate-400'}`} />
                <input 
                  type="text" 
                  placeholder="E-Mail Adresse" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  className={`w-full bg-slate-50 dark:bg-slate-800/50 border rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none transition-all ${
                    error && !validateEmail(email) ? 'border-red-500 ring-2 ring-red-500/20' : 'border-black/5 dark:border-white/10 focus:ring-2 focus:ring-orange-500'
                  }`}
                />
              </div>

              <div className="relative">
                <Lock className={`absolute left-4 top-4 w-5 h-5 ${error && password.length < 6 ? 'text-red-500' : 'text-slate-400'}`} />
                <input 
                  type="password" 
                  placeholder="Passwort" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className={`w-full bg-slate-50 dark:bg-slate-800/50 border rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none transition-all ${
                    error && password.length < 6 ? 'border-red-500 ring-2 ring-red-500/20' : 'border-black/5 dark:border-white/10 focus:ring-2 focus:ring-orange-500'
                  }`}
                />
              </div>
              
              {error && (
                <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold animate-in fade-in slide-in-from-top-1 duration-200 mb-4">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </div>
              )}
              
              <button 
                type="submit"
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-600/20 active:scale-95"
              >
                {isLogin ? 'Anmelden' : 'Registrieren'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-bold text-slate-400 hover:text-orange-600 transition-colors"
              >
                {isLogin ? 'Noch kein Konto? Hier registrieren' : 'Bereits Mitglied? Hier anmelden'}
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-[450px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Simulation Header */}
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-black/5 dark:border-white/5">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-xs font-bold text-slate-500">Über Google anmelden</span>
            </div>

            {googleStep === 'connecting' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="font-bold">Verbindung zu Google wird hergestellt...</p>
              </div>
            )}

            {googleStep === 'select_account' && (
              <div className="flex-1 animate-in zoom-in-95">
                <h3 className="text-xl font-black mb-6">Konto wählen</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Jan-Erik Müller', email: 'jan.mueller@gmail.com', avatar: 'https://i.pravatar.cc/100?u=jan' },
                    { name: 'Sarah Creative', email: 'sarah.studio@web.de', avatar: 'https://i.pravatar.cc/100?u=sarah' }
                  ].map((acc, i) => (
                    <button 
                      key={i}
                      onClick={() => handleAccountSelect(acc)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl border border-black/5 transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <img src={acc.avatar} className="w-10 h-10 rounded-full" alt="Avatar" />
                        <div className="text-left">
                          <p className="text-sm font-black text-slate-900 dark:text-white">{acc.name}</p>
                          <p className="text-[10px] font-bold text-slate-500">{acc.email}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {googleStep === 'permissions' && (
              <div className="flex-1 animate-in slide-in-from-right-8 duration-300">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-black">Berechtigungen</h3>
                  <p className="text-sm text-slate-500 mt-2">ClickLabs AI möchte auf dein Profil zugreifen</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-black/5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="text-left">
                       <p className="text-sm font-bold">Profilinformationen</p>
                       <p className="text-[11px] text-slate-500">Name, Profilbild und Spracheinstellungen einsehen</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-black/5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="text-left">
                       <p className="text-sm font-bold">E-Mail Adresse</p>
                       <p className="text-[11px] text-slate-500">Deine primäre Google E-Mail Adresse lesen</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setGoogleStep('select_account')} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-sm">Abbrechen</button>
                  <button onClick={grantPermissions} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm">Bestätigen</button>
                </div>
              </div>
            )}

            {(googleStep === 'finalizing' || googleStep === 'success') && (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                 <div className="relative">
                    {googleStep === 'success' && <div className="absolute inset-0 bg-emerald-500/20 blur-2xl animate-pulse"></div>}
                    <div className={`relative w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 ${googleStep === 'success' ? 'bg-emerald-500 scale-110' : 'bg-slate-100 dark:bg-slate-800'}`}>
                      {googleStep === 'finalizing' ? <Loader2 className="w-10 h-10 text-blue-500 animate-spin" /> : <CheckCircle2 className="w-12 h-12 text-white" />}
                    </div>
                 </div>
                 <div>
                   <h3 className="text-2xl font-black">{googleStep === 'success' ? 'Erfolgreich!' : 'Fast fertig...'}</h3>
                   <p className="text-slate-500 text-sm">{googleStep === 'success' ? 'Du wirst jetzt angemeldet.' : 'Konto wird eingerichtet'}</p>
                 </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
            Deine Daten sind sicher. Wir nutzen Google OAuth 2.0 für eine verschlüsselte Authentifizierung. Mit dem Login stimmst du unseren <span className="underline">AGB</span> zu.
          </p>
        </div>
      </div>
    </div>
  );
};
