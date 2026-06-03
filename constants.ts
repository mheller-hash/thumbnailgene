
export const APP_NAME = "ThumbCraft AI";

export const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1920";

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  cta: string;
  popular: boolean;
  credits: number;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "0",
    features: [
      "30 Guthaben / Monat",
      "3× Bilder erstellen",
      "Mit kleinem Wasserzeichen",
      "Einfache Bildqualität",
      "Ideal zum Ausprobieren"
    ],
    cta: "Kostenlos starten",
    popular: false,
    credits: 30
  },
  {
    name: "Creator Pro",
    price: "19",
    features: [
      "300 Guthaben / Monat",
      "Alle Werkzeuge freigeschaltet",
      "Ohne Wasserzeichen",
      "Hohe Bildqualität (HD)",
      "Gewerblich nutzbar"
    ],
    cta: "Jetzt durchstarten",
    popular: true,
    credits: 300
  },
  {
    name: "Production",
    price: "49",
    features: [
      "1.000 Guthaben / Monat",
      "Bevorzugte Erstellung",
      "Beste Foto-Qualität (4K)",
      "Profi Kanal-Check",
      "Für Teams & Agenturen"
    ],
    cta: "Studio Power holen",
    popular: false,
    credits: 1000
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Julian Weber",
    text: "Früher habe ich 4 Stunden in Photoshop gesessen, heute macht die KI das in 4 Minuten. Meine Klickrate ist seitdem deutlich gestiegen.",
    role: "Technik-Kanal @JulianTech",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    name: "Sarah Hoffmann",
    text: "Die Vorhersage, wie gut ein Bild ankommt, ist super hilfreich. Wir laden nur noch hoch, was die KI auch gut bewertet.",
    role: "Vloggerin",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    name: "Marc Richter",
    text: "Die Gaming-Stile passen perfekt zu meinen Videos. Endlich sehen meine Vorschaubilder so professionell aus wie bei den Großen.",
    role: "Streamer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  }
];
