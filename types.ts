

export type UserRole = 'alex' | 'amanda';

export interface SleepRecord {
  date: string;
  hours: number;
  tookMelatonin: boolean;
  usedGanchinho: boolean;
  quality: 'bad' | 'ok' | 'good';
}

export interface PrayerRequest {
  id: string;
  text: string;
  author: UserRole;
  answered: boolean;
  createdAt: string;
}

export interface PhotoPost {
  id: string;
  url: string;
  caption: string;
  likes: number;
  likedByPartner: boolean;
  createdAt: string;
}

export interface StudyStatus {
  lastWatchedLesson: string;
  completed: boolean;
  lastUpdated: string;
}

export interface WeatherData {
  temp: number;
  conditionCode: number; // WMO code
  isDay: boolean;
  locationName: string;
  uvIndex?: number; // Novo
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
  icon: string;
  redeemed: boolean;
}

export interface SongRecommendation {
  title: string;
  artist: string;
  reason: string;
}

// Tipos de Dados Compartilhados
export interface AmandaFitnessData {
  meals: { cafe: boolean, almoco: boolean, lanche: boolean, jantar: boolean };
  waterCount: number;
  workoutDone: boolean;
  workoutType: 'leg' | 'upper' | 'cardio' | 'yoga' | null;
  reportStatus: 'idle' | 'sent' | 'approved';
  score: number;
}


// Novos Tipos
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  date: string;
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  platform: string;
  watched: boolean;
  rating?: number;
}

export interface Coupon {
  id: string;
  title: string;
  description: string;
  emoji: string;
  quantity: number;
}

export enum AppTab {
  HOME = 'home',
  
  // Hubs (Menus)
  ROUTINE_MENU = 'routine_menu',
  LOVE_MENU = 'love_menu',
  LEISURE_MENU = 'leisure_menu',

  // Tools Existing
  SLEEP = 'sleep',
  DEVOTIONAL = 'devotional',
  GALLERY = 'gallery',
  FITNESS = 'fitness',
  DATES = 'dates',
  FANDOM = 'fandom',
  SUPPLEMENTS = 'supplements',
  PLAYLIST = 'playlist',
  LISTS = 'lists',
  INSIGHTS = 'insights',
  YOU_ARE_RIGHT = 'you_are_right',

  // New Tools
  CINEMA = 'cinema',
  LOVE_BANK = 'love_bank',
  CYCLE = 'cycle',
  MARKET = 'market',
  SOS = 'sos',
  CAPSULE = 'capsule',
  QUIZ = 'quiz',
  AI_COACH = 'ai_coach',
  MOTIVATION = 'motivation',
}