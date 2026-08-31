"use client";

import React, { useEffect, useRef, useState } from "react";
import { Award, CheckCircle2, Target, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { useDomain } from "../../lib/DomainContext";
import { animateCounter } from "../../lib/motion/animePresets";

export default function CareerReadinessRing() {
  const { activeDomain, selectedRole } = useDomain();
  const readiness = activeDomain.readinessScore;

  const [counterVal, setCounterVal] = useState<number>(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Rollup counter animation 0 -> readiness %
    animateCounter(counterRef.current || "", 0, readiness, 900, (v) => {
      setCounterVal(v);
    });
  }, [readiness]);

  // 3 Layered Rings Dashboard Specs
  const marketAlignment = Math.min(98, readiness + 12);
  const technicalMastery = Math.min(95, readiness + 6);
  const verifiedCapability = readiness;

  const strokeOuter = 440 - (440 * marketAlignment) / 100;
  const strokeMiddle = 370 - (370 * technicalMastery) / 100;
  const strokeInner = 300 - (300 * verifiedCapability) / 100;

  const breakdownMetrics = [
    { label: "Market Alignment", percentage: marketAlignment, color: "text-purple-400", bg: "bg-purple-500/20" },
    { label: "Technical Skills", percentage: technicalMastery, color: "text-indigo-400", bg: "bg-indigo-500/20" },
    { label: "Practical Projects", percentage: Math.max(0, readiness - 4), color: "text-cyan-400", bg: "bg-cyan-500/20" },
    { label: "Verified Evidence", percentage: verifiedCapability, color: "text-emerald-400", bg: "bg-emerald-500/20" },
    { label: "Interview Readiness", percentage: Math.max(0, readiness - 5), color: "text-rose-400", bg: "bg-rose-500/20" },
    { label: "English Fluency", percentage: 88, color: "text-amber-400", bg: "bg-amber-500/20" },
  ];

  return (
    <div className="glass-panel p-6 border-indigo-500/20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Layered 3-Ring Interactive Gauge */}
        <div className="flex items-center space-x-6">
          <div className="relative w-44 h-44 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
              {/* Outer Ring: Market Alignment */}
              <circle cx="90" cy="90" r="75" className="stroke-brand-elevated" strokeWidth="8" fill="transparent" />
              <circle
                cx="90"
                cy="90"
                r="75"
                className="stroke-purple-500 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray="471"
                strokeDashoffset={strokeOuter}
                strokeLinecap="round"
                fill="transparent"
              />

              {/* Middle Ring: Technical Mastery */}
              <circle cx="90" cy="90" r="60" className="stroke-brand-elevated" strokeWidth="8" fill="transparent" />
              <circle
                cx="90"
                cy="90"
                r="60"
                className="stroke-cyan-400 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray="377"
                strokeDashoffset={strokeMiddle}
                strokeLinecap="round"
                fill="transparent"
              />

              {/* Inner Ring: Verified Capability */}
              <circle cx="90" cy="90" r="45" className="stroke-brand-elevated" strokeWidth="8" fill="transparent" />
              <circle
                cx="90"
                cy="90"
                r="45"
                className="stroke-emerald-400 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={strokeInner}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Center Animated Counter */}
            <div className="absolute text-center">
              <span ref={counterRef} className="font-mono text-3xl font-extrabold text-slate-100 tracking-tight block">
                {counterVal}%
              </span>
              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                Readiness
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                Active Role Target
              </span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1">
                <TrendingUp className="h-3 w-3" />
                <span>{activeDomain.marketDemandTrend}</span>
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 tracking-tight">{selectedRole}</h2>
            <p className="text-xs text-brand-textMuted max-w-sm">
              Vector Digital Twin synthesis of target job qualifications, topological skill mastery, and verified project evidence.
            </p>
            
            <div className="pt-2 flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5 text-purple-300">
                <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                <span>Market: {marketAlignment}%</span>
              </div>
              <div className="flex items-center space-x-1.5 text-cyan-300">
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                <span>Technical: {technicalMastery}%</span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span>Verified: {verifiedCapability}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 6-Metric Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
          {breakdownMetrics.map((item, idx) => (
            <div
              key={idx}
              className="bg-brand-surface/70 border border-brand-border p-3 rounded-xl hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-medium text-brand-textMuted mb-1">
                <span>{item.label}</span>
                <span className={`font-mono font-bold ${item.color}`}>{item.percentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-brand-elevated rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.bg} ${item.color.replace('text-', 'bg-')} transition-all duration-700`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
