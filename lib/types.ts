// User types
export interface User {
  userId: string;
  fId?: string;
  createdAt: Date;
  locale: string;
  location?: string;
}

// Guide types
export interface Guide {
  guideId: string;
  state: string;
  title: string;
  content: string;
  language: 'en' | 'es';
  whatToSay: string[];
  whatNotToSay: string[];
  keyRights: string[];
}

// Encounter Log types
export interface EncounterLog {
  logId: string;
  userId: string;
  timestamp: Date;
  location?: string;
  notes: string;
  shared: boolean;
  guideVersion?: string;
}

// App state types
export interface AppState {
  currentUser?: User;
  selectedState?: string;
  selectedLanguage: 'en' | 'es';
  currentGuide?: Guide;
  isRecording: boolean;
  isPremium: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Location types
export interface LocationData {
  state: string;
  city?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Subscription types
export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}
