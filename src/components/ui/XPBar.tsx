"use client";

import { motion } from "framer-motion";
import { getLevelTitle, xpForLevel } from "@/lib/gamification";

interface Props {
  xp: number;
  level: number;
  xpToNext: number;
}

export default function XPBar({ xp, level, xpToNext }: Props) {
  const levelXp    = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const progress   = ((xp - levelXp) / (nextLevelXp - levelXp)) * 100;

  return (
    <div className="w-full max-w-sm">
      <div className="flex justify-between text-xs text-amber-700 mb-1">
        <span className="font-semibold">Lv {level} · {getLevelTitle(level)}</span>
        <span>{xpToNext} XP to next level</span>
      </div>
      <div className="h-3 bg-amber-100 rounded-full overflow-hidden border border-amber-300">
        <motion.div
          className="h-full bg-brand-orange rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
