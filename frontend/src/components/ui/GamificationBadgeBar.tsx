"use client";

import { Trophy, Flame, Zap, Award } from "lucide-react";

interface GamificationProps {
  xp?: number;
  level?: number;
  levelTitle?: string;
  streakDays?: number;
}

export default function GamificationBadgeBar({
  xp = 2450,
  level = 7,
  levelTitle = "Verification Specialist",
  streakDays = 12
}: GamificationProps) {
  return (
    <div className="flex items-center space-x-3 text-xs bg-brand-surface/90 border border-brand-border px-3 py-1.5 rounded-xl">
      {/* Level & XP */}
      <div className="flex items-center space-x-1.5">
        <div className="h-6 w-6 rounded-md bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-extrabold text-[10px]">
          L{level}
        </div>
        <div>
          <span className="font-bold text-slate-100 block leading-none">{levelTitle}</span>
          <span className="text-[9px] text-amber-400 font-mono">{xp} XP</span>
        </div>
      </div>

      <div className="h-4 w-[1px] bg-brand-border"></div>

      {/* Streak Counter */}
      <div className="flex items-center space-x-1 text-rose-400 font-semibold">
        <Flame className="h-3.5 w-3.5 fill-rose-400 animate-pulse" />
        <span>{streakDays} Day Streak</span>
      </div>
    </div>
  );
}
