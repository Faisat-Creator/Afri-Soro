/**
 * Gamification Engine
 * XP, levels, streaks, badges.
 */

import { XP_REWARDS } from "@/types";

export function xpForAnswer(correct: boolean, responseTimeMs: number): number {
  if (!correct) return 0;
  let xp = XP_REWARDS.correct;
  if (responseTimeMs < 10_000) xp += XP_REWARDS.fast_correct;
  return xp;
}

// Level thresholds — each level requires progressively more XP
export function xpForLevel(level: number): number {
  return level * level * 50; // level 1=50, 2=200, 3=450 ...
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  return level;
}

export function xpToNextLevel(xp: number): number {
  const current = levelFromXp(xp);
  return xpForLevel(current + 1) - xp;
}

export const LEVEL_TITLES: Record<number, string> = {
  1:  "Market Assistant",
  2:  "Market Trader",
  3:  "Shop Owner",
  4:  "Business Owner",
  5:  "Merchant",
  6:  "Regional Trader",
  7:  "Master Merchant",
  8:  "Market Elder",
  9:  "Soroban Expert",
  10: "AfriSoro Champion",
};

export function getLevelTitle(level: number): string {
  return LEVEL_TITLES[Math.min(level, 10)] ?? "AfriSoro Champion";
}
