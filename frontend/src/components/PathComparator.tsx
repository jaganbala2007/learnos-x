"use client";

import { useState } from "react";
import { Compass, Check, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";

export default function PathComparator({ paths, onSelect }: { paths?: any[]; onSelect?: (id: string) => void }) {
  const [activePath, setActivePath] = useState("path_balanced_track");

  const defaultPaths = [
    {
      id: "path_fast_track",
      track_name: "Fast Track",
      description: "Accelerated path targeting core high-priority skill gaps directly.",
      estimated_weeks: 6,
      weekly_hours: 12,
      projected_career_readiness: 77,
      projected_retention: 70,
      workload_risk: 0.35,
      overall_score: 7.9,
      selection_reasoning: ["Fastest time to initial job readiness", "Higher workload risk (12 hrs/week)", "Reduced retention reinforcement"]
    },
    {
      id: "path_balanced_track",
      track_name: "Balanced Track (Recommended)",
      description: "Optimal equilibrium between prerequisite mastery, practical projects, retention, and weekly workload.",
      estimated_weeks: 10,
      weekly_hours: 8,
      projected_career_readiness: 87,
      projected_retention: 84,
      workload_risk: 0.10,
      overall_score: 9.2,
      selection_reasoning: ["Matches exact target workload (8 hours/week)", "Topological prerequisite ordering", "Integrates hands-on project evidence"]
    },
    {
      id: "path_deep_specialist",
      track_name: "Deep Specialist Track",
      description: "Thorough mastery track with extended architectural projects and full UVM testbench coverage.",
      estimated_weeks: 16,
      weekly_hours: 8,
      projected_career_readiness: 94,
      projected_retention: 91,
      workload_risk: 0.15,
      overall_score: 8.6,
      selection_reasoning: ["Achieves near-complete skill coverage (98%)", "Requires 16 weeks duration", "Deep theoretical & practical coverage"]
    }
  ];

  const list = paths || defaultPaths;

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="badge badge-cyan">Flagship Feature</span>
          <h3 className="text-xl font-bold text-slate-100 mt-1">Future Path Simulator</h3>
          <p className="text-xs text-slate-400 mt-0.5">Multi-Trajectory Scoring & Path Optimization Engine</p>
        </div>
        <Compass className="h-6 w-6 text-cyan-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {list.map((p) => {
          const isSelected = activePath === p.id;
          return (
            <div
              key={p.id}
              onClick={() => {
                setActivePath(p.id);
                if (onSelect) onSelect(p.id);
              }}
              className={`glass-card p-5 relative cursor-pointer flex flex-col justify-between transition-all ${
                isSelected ? "border-cyan-400 cyan-glow bg-cyan-950/20" : "border-slate-800"
              }`}
            >
              {isSelected && (
                <div className="absolute -top-3 right-4 bg-cyan-400 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                  <Sparkles className="h-3 w-3 fill-slate-950" />
                  <span>Selected</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-100 text-base">{p.track_name}</h4>
                  <span className="font-mono text-xs font-bold text-cyan-400">Score: {p.overall_score}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{p.description}</p>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Duration</span>
                    <strong className="text-slate-200">{p.estimated_weeks} Weeks</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Workload</span>
                    <strong className="text-slate-200">{p.weekly_hours} hrs/week</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Readiness</span>
                    <strong className="text-cyan-400">{p.projected_career_readiness}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Retention</span>
                    <strong className="text-emerald-400">{p.projected_retention}%</strong>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-300">Simulator Reasoning:</span>
                  {p.selection_reasoning.map((r: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-xs text-slate-400">
                      <Check className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`mt-6 w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors ${
                  isSelected ? "bg-cyan-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span>{isSelected ? "Active Path" : "Select Trajectory"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
