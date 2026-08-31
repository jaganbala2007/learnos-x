"use client";

import React from "react";
import { CheckCircle2, Clock, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { useDomain } from "../../lib/DomainContext";

export default function AdaptiveRoadmapTimeline() {
  const { activeDomain } = useDomain();

  const roadmapItems = [
    {
      title: "SystemVerilog Interface & Clocking Blocks",
      category: "Verification Architecture",
      duration: "2.5 hrs",
      status: "Completed",
      impact: "+8% Mastery",
      color: "border-emerald-600/40 text-emerald-800 dark:text-emerald-400 bg-emerald-500/10"
    },
    {
      title: "UVM Component Hierarchy & Driver Configuration",
      category: "Testbench Infrastructure",
      duration: "3.5 hrs",
      status: "Current Focus",
      impact: "+14% Mastery",
      color: "border-amber-600/40 text-amber-800 dark:text-amber-400 bg-amber-500/10"
    },
    {
      title: "Constrained Random Verification & Functional Coverage",
      category: "Coverage Diagnostics",
      duration: "4.0 hrs",
      status: "Prerequisite Ready",
      impact: "+12% Mastery",
      color: "border-teal-600/40 text-teal-800 dark:text-teal-400 bg-teal-500/10"
    }
  ];

  return (
    <div className="editorial-block space-y-4">
      <div className="flex items-center justify-between border-b border-brand-border pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-teal-800 dark:text-teal-400 tracking-wider uppercase">
            ADAPTIVE LEARNING ROADMAP
          </span>
          <h3 className="font-serif-title font-bold text-lg text-brand-textMain mt-0.5">
            Targeted Skill Modules for {activeDomain.name}
          </h3>
        </div>
        <span className="text-xs font-mono text-brand-textDim">3 Active Modules</span>
      </div>

      {/* Open Timeline List with Line Separators */}
      <div className="space-y-4 pt-1">
        {roadmapItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-brand-surface border border-brand-border hover:border-amber-500/40 transition-all gap-4"
          >
            <div className="flex items-start space-x-3.5">
              <div className="w-7 h-7 rounded-full bg-brand-elevated border border-brand-border flex items-center justify-center font-mono font-bold text-xs text-amber-800 dark:text-amber-400 flex-shrink-0 mt-0.5">
                0{idx + 1}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${item.color}`}>
                    {item.status}
                  </span>
                  <span className="text-[11px] font-mono text-brand-textDim">{item.category}</span>
                </div>
                <h4 className="font-bold text-sm text-brand-textMain">{item.title}</h4>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono pl-10 sm:pl-0">
              <div className="text-right">
                <span className="text-[10px] text-brand-textDim block">ESTIMATED TIME</span>
                <span className="font-bold text-brand-textMain">{item.duration}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-brand-textDim block">IMPACT</span>
                <span className="font-bold text-emerald-800 dark:text-emerald-400">{item.impact}</span>
              </div>
              <a
                href="/tutor"
                className="btn-secondary text-[11px] py-1.5 px-3 flex items-center space-x-1"
              >
                <span>Study</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
