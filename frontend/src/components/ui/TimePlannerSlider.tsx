"use client";

import { useState } from "react";
import { Clock, Calendar, Zap } from "lucide-react";

export default function TimePlannerSlider() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);

  const calculateWeeks = (hrs: number) => {
    return Math.max(1, Math.round(40 / hrs));
  };

  const weeks = calculateWeeks(hoursPerWeek);

  return (
    <div className="glass-panel p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
        <div>
          <span className="status-badge badge-amber">Time-Based Intelligence</span>
          <h3 className="text-base font-bold text-slate-100 mt-1">Weekly Learning Pace Planner</h3>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-brand-textMuted font-medium">Weekly Target Hours:</span>
          <span className="text-sm font-extrabold text-cyan-400">{hoursPerWeek} Hours / Week</span>
        </div>

        <input
          type="range"
          min="2"
          max="30"
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(Number(e.target.value))}
          className="w-full h-2 bg-brand-elevated rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        <div className="grid grid-cols-2 gap-3 text-xs pt-2">
          <div className="glass-card p-3">
            <span className="text-[10px] text-brand-textDim block">Projected Completion</span>
            <span className="text-sm font-bold text-slate-100 mt-0.5 block flex items-center space-x-1">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" />
              <span>{weeks} Weeks</span>
            </span>
          </div>

          <div className="glass-card p-3">
            <span className="text-[10px] text-brand-textDim block">Pace Category</span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5 block flex items-center space-x-1">
              <Zap className="h-3.5 w-3.5" />
              <span>{hoursPerWeek >= 15 ? "Fast Track" : hoursPerWeek >= 8 ? "Balanced" : "Steady"}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
