
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
  reason: string; // Por que a IA escolheu essa música
}

export enum AppTab {
  HOME = 'home',
  SLEEP = 'sleep',
  DEVOTIONAL = 'devotional',
  GALLERY = 'gallery',
  FITNESS = 'fitness',
  DATES = 'dates',
  FANDOM = 'fandom',
  SUPPLEMENTS = 'supplements',
  PLAYLIST = 'playlist',
}
