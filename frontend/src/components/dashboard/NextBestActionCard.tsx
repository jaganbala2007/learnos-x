"use client";

import React from "react";
import { Sparkles, ArrowRight, Clock, Target, CheckCircle2, Award } from "lucide-react";
import { useDomain } from "../../lib/DomainContext";

export default function NextBestActionCard() {
  const { activeDomain } = useDomain();

  return (
    <div className="editorial-block border-l-4 border-l-[#D99A2B] space-y-4">
      <div className="flex items-center justify-between border-b border-brand-border pb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-amber-700 dark:text-amber-400" />
          <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
            TODAY'S HIGHEST-IMPACT ACTION
          </span>
        </div>
        <span className="text-xs font-mono text-brand-textDim">Autonomous AI Decision Engine</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="font-serif-title font-bold text-xl text-brand-textMain">
            Master UVM Architecture & Testbench Scoreboards
          </h3>
          <p className="text-xs text-brand-textMuted max-w-2xl leading-relaxed">
            SystemVerilog verification is currently specified in 84% of active RTL Verification engineering postings. Completing this module resolves your highest-impact skill gap.
          </p>

          {/* 4 Clean Metric Blocks */}
          <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-brand-textDim uppercase block">EXPECTED MASTERY</span>
              <span className="font-bold text-emerald-800 dark:text-emerald-400 text-sm">+14% Index</span>
            </div>

            <div>
              <span className="text-[10px] text-brand-textDim uppercase block">TARGET ROLES</span>
              <span className="font-bold text-amber-800 dark:text-amber-400 text-sm">37 Active</span>
            </div>

            <div>
              <span className="text-[10px] text-brand-textDim uppercase block">ESTIMATED TIME</span>
              <span className="font-bold text-teal-800 dark:text-teal-400 text-sm">3.5 Hours</span>
            </div>

            <div>
              <span className="text-[10px] text-brand-textDim uppercase block">PREREQUISITES</span>
              <span className="font-bold text-emerald-800 dark:text-emerald-400 text-sm flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Satisfied</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <a
            href="/tutor"
            className="btn-primary text-xs flex items-center space-x-2"
          >
            <span>Launch Recommended Mission</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
