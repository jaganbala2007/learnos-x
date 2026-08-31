"use client";

import MarketTrendsCard from "../../components/ui/MarketTrendsCard";
import TimePlannerSlider from "../../components/ui/TimePlannerSlider";
import GamificationBadgeBar from "../../components/ui/GamificationBadgeBar";
import { TrendingUp, Users, Target, CheckCircle2, Award, Sparkles, DollarSign, Building } from "lucide-react";
import { useDomain } from "../../lib/DomainContext";

export default function MarketIntelligencePage() {
  const { activeDomain } = useDomain();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-brand-surface via-brand-surface to-cyan-950/30 border border-brand-border">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
            LABOR MARKET INTELLIGENCE
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            {activeDomain.name} Market Demand
          </h1>
          <p className="text-xs text-brand-textMuted mt-1 max-w-xl">
            Real-time skill demand signals, active hiring momentum, target salary distributions, and peer cohort percentile rankings.
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

      {/* Peer Percentile Ranking Box */}
      <div className="glass-panel p-6 space-y-4 border-brand-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
              Cohort Benchmark
            </span>
            <h3 className="text-lg font-bold text-slate-100 mt-1">Peer Percentile Cohort Comparison</h3>
            <p className="text-xs text-brand-textDim">Compared against 1,240 active candidates in {activeDomain.name}</p>
          </div>

          <span className="text-3xl font-extrabold font-mono text-cyan-400">Top 12%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="glass-card p-4 space-y-1">
            <span className="text-[10px] font-mono text-brand-textDim uppercase font-bold block">{activeDomain.keySkills[0]?.name}</span>
            <span className="text-xl font-extrabold font-mono text-emerald-400">{activeDomain.keySkills[0]?.mastery}% Mastery</span>
            <span className="text-emerald-400 font-semibold block text-[11px]">+26% above cohort avg (65%)</span>
          </div>

          <div className="glass-card p-4 space-y-1">
            <span className="text-[10px] font-mono text-brand-textDim uppercase font-bold block">{activeDomain.keySkills[1]?.name}</span>
            <span className="text-xl font-extrabold font-mono text-cyan-400">{activeDomain.keySkills[1]?.mastery}% Mastery</span>
            <span className="text-cyan-300 font-semibold block text-[11px]">+14% above cohort avg (58%)</span>
          </div>

          <div className="glass-card p-4 space-y-1">
            <span className="text-[10px] font-mono text-brand-textDim uppercase font-bold block">{activeDomain.keySkills[2]?.name}</span>
            <span className="text-xl font-extrabold font-mono text-indigo-300">{activeDomain.keySkills[2]?.mastery}% Mastery</span>
            <span className="text-indigo-300 font-semibold block text-[11px]">Equal to cohort avg (64%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
