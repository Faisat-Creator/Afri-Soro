// ─── Soroban Engine Types ────────────────────────────────────────────────────

export interface Bead {
  active: boolean;
}

export interface Rod {
  heavenBead: Bead;  // worth 5 when active
  earthBeads: Bead[]; // 4 beads, each worth 1
  placeValue: number; // 1, 10, 100, 1000, etc.
}

export interface SorobanState {
  rods: Rod[];
  value: number;
}

// ─── Scenario & Question Types ────────────────────────────────────────────────

export type Operation = "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
export type Category =
  | "MARKET"
  | "AGRICULTURE"
  | "TRANSPORT"
  | "HOUSEHOLD"
  | "SMALL_BUSINESS"
  | "FASHION"
  | "LIVESTOCK"
  | "CONSTRUCTION"
  | "SAVINGS"
  | "COMMUNITY";

export interface ScenarioConfig {
  id: string;
  category: Category;
  country: string;
  currency: string;
  symbol: string;
  difficulty: number;
  operation: Operation;
  template: string;
  variables: Record<string, unknown>;
}

export interface GeneratedQuestion {
  id: string;
  scenarioId: string;
  prompt: string;
  correctAnswer: number;
  difficulty: number;
  operation: Operation;
  params: Record<string, unknown>;
  category: Category;
  symbol: string;
}

// ─── Gamification Types ───────────────────────────────────────────────────────

export interface XPEvent {
  type: "correct" | "fast_correct" | "daily_streak" | "perfect_challenge";
  xp: number;
}

export const XP_REWARDS: Record<XPEvent["type"], number> = {
  correct: 10,
  fast_correct: 5,       // bonus on top of correct
  daily_streak: 25,
  perfect_challenge: 50,
};

export interface StudentStats {
  level: number;
  xp: number;
  streak: number;
  xpToNextLevel: number;
  badges: string[];
}

// ─── Adaptive Engine Types ────────────────────────────────────────────────────

export interface PerformanceWindow {
  attempts: number;
  correct: number;
  accuracy: number; // 0–1
  avgResponseTime: number; // ms
}

export type DifficultyAdjustment = "increase" | "maintain" | "decrease";

// ─── Country / Locale ─────────────────────────────────────────────────────────

export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  flag: string;
}

export const COUNTRIES: CountryConfig[] = [
  { code: "NG", name: "Nigeria",      currency: "NGN", symbol: "₦",   flag: "🇳🇬" },
  { code: "GH", name: "Ghana",        currency: "GHS", symbol: "₵",   flag: "🇬🇭" },
  { code: "KE", name: "Kenya",        currency: "KES", symbol: "KSh", flag: "🇰🇪" },
  { code: "ZA", name: "South Africa", currency: "ZAR", symbol: "R",   flag: "🇿🇦" },
  { code: "ET", name: "Ethiopia",     currency: "ETB", symbol: "Br",  flag: "🇪🇹" },
  { code: "TZ", name: "Tanzania",     currency: "TZS", symbol: "TSh", flag: "🇹🇿" },
];
