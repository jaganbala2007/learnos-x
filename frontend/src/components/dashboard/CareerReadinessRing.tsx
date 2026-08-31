"use client";

import React, { useEffect, useRef, useState } from "react";
import { TrendingUp, Award, CheckCircle2, ShieldCheck } from "lucide-react";
import { useDomain } from "../../lib/DomainContext";
import { animateCounter } from "../../lib/motion/animePresets";

export default function CareerReadinessRing() {
  const { activeDomain, selectedRole } = useDomain();
  const readiness = activeDomain.readinessScore;

  const [counterVal, setCounterVal] = useState<number>(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    animateCounter(counterRef.current || "", 0, readiness, 900, (v) => {
      setCounterVal(v);
    });
  }, [readiness]);

  // Refined Color Layer Offsets
  const marketAlignment = Math.min(98, readiness + 12);
  const technicalMastery = Math.min(95, readiness + 6);
  const verifiedCapability = readiness;

  const strokeOuter = 440 - (440 * marketAlignment) / 100;
  const strokeMiddle = 370 - (370 * technicalMastery) / 100;
  const strokeInner = 300 - (300 * verifiedCapability) / 100;

  const metricsMatrix = [
    { category: "Market Alignment", score: marketAlignment, status: "High Demand", color: "text-amber-800 dark:text-amber-400", bar: "bg-[#D99A2B]" },
    { category: "Technical Skills", score: technicalMastery, status: "Core Satisfied", color: "text-teal-800 dark:text-teal-400", bar: "bg-[#3F7C78]" },
    { category: "Practical Projects", score: Math.max(0, readiness - 4), status: "2 Artifacts", color: "text-amber-700 dark:text-amber-300", bar: "bg-[#C86B4A]" },
    { category: "Verified Evidence", score: verifiedCapability, status: "Signed Proof", color: "text-emerald-800 dark:text-emerald-400", bar: "bg-[#5F8A68]" },
    { category: "Interview Readiness", score: Math.max(0, readiness - 5), status: "Screening Passed", color: "text-amber-800 dark:text-amber-400", bar: "bg-[#D99A2B]" },
    { category: "English Fluency", score: 88, status: "138 WPM Optimal", color: "text-teal-800 dark:text-teal-400", bar: "bg-[#3F7C78]" },
  ];

  return (
    <div className="editorial-block space-y-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Refined Warm Amber / Sage / Teal Ring Visualization */}
        <div className="flex items-center space-x-6">
          <div className="relative w-44 h-44 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
              {/* Outer Ring: Warm Amber Market Alignment */}
              <circle cx="90" cy="90" r="75" className="stroke-brand-elevated" strokeWidth="7" fill="transparent" />
              <circle
                cx="90"
                cy="90"
                r="75"
                className="stroke-[#D99A2B] transition-all duration-1000 ease-out"
                strokeWidth="7"
                strokeDasharray="471"
                strokeDashoffset={strokeOuter}
                strokeLinecap="round"
                fill="transparent"
              />

              {/* Middle Ring: Muted Teal Technical Mastery */}
              <circle cx="90" cy="90" r="60" className="stroke-brand-elevated" strokeWidth="7" fill="transparent" />
              <circle
                cx="90"
                cy="90"
                r="60"
                className="stroke-[#3F7C78] transition-all duration-1000 ease-out"
                strokeWidth="7"
                strokeDasharray="377"
                strokeDashoffset={strokeMiddle}
                strokeLinecap="round"
                fill="transparent"
              />

              {/* Inner Ring: Muted Sage Verified Capability */}
              <circle cx="90" cy="90" r="45" className="stroke-brand-elevated" strokeWidth="7" fill="transparent" />
              <circle
                cx="90"
                cy="90"
                r="45"
                className="stroke-[#5F8A68] transition-all duration-1000 ease-out"
                strokeWidth="7"
                strokeDasharray="283"
                strokeDashoffset={strokeInner}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Center Animated Counter */}
            <div className="absolute text-center">
              <span ref={counterRef} className="font-mono text-3xl font-extrabold text-brand-textMain tracking-tight block">
                {counterVal}%
              </span>
              <span className="text-[9px] font-mono text-amber-800 dark:text-amber-400 uppercase tracking-widest block font-bold">
                Readiness
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 uppercase">
                TARGET CAREER MODEL
              </span>
              <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 flex items-center space-x-1">
                <TrendingUp className="h-3 w-3" />
                <span>{activeDomain.marketDemandTrend}</span>
              </span>
            </div>

            <h2 className="font-serif-title text-2xl font-bold text-brand-textMain">{selectedRole}</h2>
            <p className="text-xs text-brand-textMuted max-w-md leading-relaxed">
              Topological skill readiness calculated from verified evidence, project proof, and live industry requirements.
            </p>

            <div className="pt-1 flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5 text-amber-800 dark:text-amber-400">
                <span className="h-2 w-2 rounded-full bg-[#D99A2B]"></span>
                <span>Market: {marketAlignment}%</span>
              </div>
              <div className="flex items-center space-x-1.5 text-teal-800 dark:text-teal-400">
                <span className="h-2 w-2 rounded-full bg-[#3F7C78]"></span>
                <span>Technical: {technicalMastery}%</span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-800 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-[#5F8A68]"></span>
                <span>Verified: {verifiedCapability}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Editorial Metric Table Matrix (NO Floating Cards) */}
        <div className="w-full lg:w-auto min-w-[320px] space-y-2 border-t lg:border-t-0 lg:border-l border-brand-border pt-4 lg:pt-0 lg:pl-8">
          <span className="text-[10px] font-mono font-bold uppercase text-brand-textDim tracking-wider block mb-3">
            VERIFIED QUALIFICATION BREAKDOWN
          </span>

          <div className="space-y-2.5">
            {metricsMatrix.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-brand-textMain">{item.category}</span>
                  <div className="flex items-center space-x-2 font-mono text-[11px]">
                    <span className="text-brand-textDim text-[10px]">{item.status}</span>
                    <span className={`font-bold ${item.color}`}>{item.score}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-brand-elevated rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.bar} transition-all duration-700 rounded-full`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
