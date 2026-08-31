"use client";

import { useState } from "react";
import { HelpCircle, AlertTriangle, ArrowRight, Sparkles, RefreshCw, Clock, Target, Calendar, TrendingUp } from "lucide-react";
import { fetchApi } from "../../lib/api";
import { useDomain } from "../../lib/DomainContext";

export default function WhatIfSimulatorCard() {
  const { activeDomain } = useDomain();
  
  const [dailyHours, setDailyHours] = useState<number>(3);
  const [intensityMode, setIntensityMode] = useState<"fast" | "balanced" | "deep">("balanced");
  const [skipSkill, setSkipSkill] = useState<boolean>(false);

  // Compute dynamic trajectory metrics
  const weeklyHours = dailyHours * 7;
  const baseWeeks = activeDomain.readinessScore < 50 ? 10 : 6.4;
  const intensityMultiplier = intensityMode === "fast" ? 0.8 : intensityMode === "deep" ? 1.3 : 1.0;
  const calculatedWeeks = Math.max(2, parseFloat(((baseWeeks * 20) / (weeklyHours * (skipSkill ? 1.15 : 1.0)) * intensityMultiplier).toFixed(1)));
  const calculatedReadiness = skipSkill ? Math.max(40, activeDomain.readinessScore - 12) : Math.min(96, activeDomain.readinessScore + 16);

  return (
    <div className="glass-panel p-6 space-y-6 border-cyan-500/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
            Counterfactual Scenario Engine
          </span>
          <h3 className="text-lg font-bold text-slate-100 mt-1">"What-If" Learning Trajectory Simulator</h3>
          <p className="text-xs text-brand-textDim">
            Adjust daily time budget, learning intensity, or skip skills to simulate career readiness trajectories.
          </p>
        </div>
      </div>

      {/* Interactive Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Slider 1: Daily Study Hours */}
        <div className="bg-brand-surface/70 border border-brand-border p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-200 uppercase">Daily Hours</span>
            <span className="text-sm font-mono font-extrabold text-cyan-400">{dailyHours} hrs / day</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={dailyHours}
            onChange={(e) => setDailyHours(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-brand-textDim">
            <span>1h (Casual)</span>
            <span>5h (Balanced)</span>
            <span>10h (Bootcamp)</span>
          </div>
        </div>

        {/* Control 2: Intensity Profile */}
        <div className="bg-brand-surface/70 border border-brand-border p-4 rounded-xl space-y-3">
          <span className="text-xs font-mono font-bold text-slate-200 uppercase block">Learning Intensity</span>
          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono font-semibold">
            <button
              onClick={() => setIntensityMode("fast")}
              className={`py-2 rounded-lg transition-all ${
                intensityMode === "fast"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold"
                  : "bg-brand-elevated text-brand-textDim hover:text-slate-200"
              }`}
            >
              Fast Track
            </button>
            <button
              onClick={() => setIntensityMode("balanced")}
              className={`py-2 rounded-lg transition-all ${
                intensityMode === "balanced"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "bg-brand-elevated text-brand-textDim hover:text-slate-200"
              }`}
            >
              Balanced
            </button>
            <button
              onClick={() => setIntensityMode("deep")}
              className={`py-2 rounded-lg transition-all ${
                intensityMode === "deep"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold"
                  : "bg-brand-elevated text-brand-textDim hover:text-slate-200"
              }`}
            >
              Deep Spec
            </button>
          </div>
        </div>

        {/* Control 3: Skill Prerequisite Compression */}
        <div className="bg-brand-surface/70 border border-brand-border p-4 rounded-xl space-y-3 flex flex-col justify-between">
          <span className="text-xs font-mono font-bold text-slate-200 uppercase block">Prerequisite Strategy</span>
          <button
            onClick={() => setSkipSkill(!skipSkill)}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-mono font-bold transition-all border flex items-center justify-between ${
              skipSkill
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
            }`}
          >
            <span>{skipSkill ? "Skip Non-Essential Prerequisites" : "Complete Full Topological Chain"}</span>
            <span className="text-[10px] font-bold">{skipSkill ? "-13 hrs" : "Full Proof"}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Simulated Output Panel */}
      <div className="glass-card p-5 border-cyan-500/30 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-brand-elevated/80 border border-brand-border p-3 rounded-xl">
            <span className="text-[10px] font-mono text-brand-textDim block">WEEKLY BUDGET</span>
            <span className="text-xl font-bold font-mono text-cyan-300">{weeklyHours} Hours</span>
          </div>

          <div className="bg-brand-elevated/80 border border-brand-border p-3 rounded-xl">
            <span className="text-[10px] font-mono text-brand-textDim block">RECALCULATED TIMELINE</span>
            <span className="text-xl font-bold font-mono text-indigo-300">{calculatedWeeks} Weeks</span>
          </div>

          <div className="bg-brand-elevated/80 border border-brand-border p-3 rounded-xl">
            <span className="text-[10px] font-mono text-brand-textDim block">PROJECTED READINESS</span>
            <span className="text-xl font-bold font-mono text-emerald-400">{calculatedReadiness}%</span>
          </div>

          <div className="bg-brand-elevated/80 border border-brand-border p-3 rounded-xl">
            <span className="text-[10px] font-mono text-brand-textDim block">OPPORTUNITY GAIN</span>
            <span className="text-xl font-bold font-mono text-purple-300">
              +{Math.round((21 / calculatedWeeks) * 10)}% Speed
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-brand-border/60 text-xs">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block flex items-center space-x-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Simulation Summary</span>
          </span>
          <p className="text-slate-200 mt-1 leading-relaxed">
            Studying <strong className="text-cyan-300">{dailyHours} hours/day</strong> ({weeklyHours} hrs/week) under a <strong className="text-indigo-300">{intensityMode}</strong> profile reaches <strong className="text-emerald-400">{calculatedReadiness}% readiness</strong> for <strong className="text-slate-100">{activeDomain.defaultRole}</strong> in approximately <strong className="text-cyan-300">{calculatedWeeks} weeks</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
