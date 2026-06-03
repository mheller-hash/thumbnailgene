
// Types for the application views
export type MainView = 'home' | 'studio' | 'pricing' | 'reviews' | 'examples';
export type StudioView = 'dashboard' | 'generate' | 'clone' | 'analyze' | 'channel' | 'favorites';

export type Tab = 'selection' | 'generate' | 'remake' | 'channel' | 'analyze' | 'pricing' | 'favorites';

export interface SavedPrompt {
  id: string;
  text: string;
  style: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  isLoggedIn: boolean;
  plan?: 'Starter' | 'Creator Pro' | 'Production';
  savedDesigns?: Design[];
  savedPrompts?: SavedPrompt[];
}

export interface Design {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: string;
  style?: string;
  aspectRatio?: string;
}

export interface AnalysisResult {
  styleFeedback: string;
  ctrOptimization: string;
  suggestions: string[];
}

export enum ThumbnailStyle {
  CLEAN = 'Clean',
  BEAST = 'Beast',
  MINIMAL = 'Minimal',
  GAMING = 'Gaming',
  TECH = 'Tech/Product',
  VLOG = 'Vlog/Lifestyle',
  REACTION = 'Reaction',
  FITNESS = 'Fitness/Action',
  BUSINESS = 'Business/Edu'
}