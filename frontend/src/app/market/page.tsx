"use client";

import MarketTrendsCard from "../../components/ui/MarketTrendsCard";
import TimePlannerSlider from "../../components/ui/TimePlannerSlider";
import GamificationBadgeBar from "../../components/ui/GamificationBadgeBar";
import { TrendingUp, Users, Target, CheckCircle2, Award, Sparkles } from "lucide-react";

export default function MarketIntelligencePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-brand-surface via-brand-surface to-indigo-950/30 border border-brand-border">
        <div>
          <span className="status-badge badge-emerald">Career Intelligence</span>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Market Trends & Peer Percentile Benchmark</h1>
          <p className="text-xs text-brand-textMuted mt-1">
            Real-time hiring momentum, salary benchmarks, and anonymized peer cohort ranking.
          </p>
        </div>

        <GamificationBadgeBar />
      </div>

      {/* Grid Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MarketTrendsCard />
        </div>

        <div>
          <TimePlannerSlider />
        </div>
      </div>

      {/* Peer Benchmark Box */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-brand-border">
          <div>
            <span className="status-badge badge-cyan">Peer Percentile Ranking</span>
            <h3 className="text-lg font-bold text-slate-100 mt-1">Cohort Benchmark Comparison</h3>
            <p className="text-xs text-brand-textDim">Compared against 1,240 verification engineering candidates (0-2 years experience)</p>
          </div>

          <span className="text-2xl font-black text-cyan-400">Top 12%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="glass-card p-4 space-y-1">
            <span className="text-[10px] text-brand-textDim uppercase font-bold block">SystemVerilog OOP</span>
            <span className="text-xl font-extrabold text-indigo-400">78.0% Mastery</span>
            <span className="text-emerald-400 font-semibold block">+26% above cohort avg (52%)</span>
          </div>

          <div className="glass-card p-4 space-y-1">
            <span className="text-[10px] text-brand-textDim uppercase font-bold block">UVM Architecture</span>
            <span className="text-xl font-extrabold text-cyan-400">62.0% Mastery</span>
            <span className="text-emerald-400 font-semibold block">+14% above cohort avg (48%)</span>
          </div>

          <div className="glass-card p-4 space-y-1">
            <span className="text-[10px] text-brand-textDim uppercase font-bold block">SVA Assertions</span>
            <span className="text-xl font-extrabold text-amber-400">45.0% Mastery</span>
            <span className="text-amber-400 font-semibold block">Cohort avg (42%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
