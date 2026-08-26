"use client";

import { Target, CheckCircle2, ShieldAlert, Award } from "lucide-react";

export default function DigitalTwinCard({
  readiness = 42,
  coverage = 51,
  verifiedCount = 3,
  uncertainty = 0.20,
  targetRole = "RTL Verification Engineer"
}: {
  readiness?: number;
  coverage?: number;
  verifiedCount?: number;
  uncertainty?: number;
  targetRole?: string;
}) {
  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="badge badge-cyan">Learner Digital Twin</span>
          <h2 className="text-xl font-bold text-slate-100 mt-1">{targetRole}</h2>
        </div>
        <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Target className="h-5 w-5" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div className="glass-card p-4">
          <div className="text-xs text-slate-400 font-medium">Career Readiness</div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">{readiness}%</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `${readiness}%` }}></div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="text-xs text-slate-400 font-medium">Skill Coverage</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">{coverage}%</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-blue-400 h-full rounded-full transition-all duration-500" style={{ width: `${coverage}%` }}></div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="text-xs text-slate-400 font-medium">Verified Evidence</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1 flex items-center space-x-1">
            <span>{verifiedCount}</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Multi-modal Proof</div>
        </div>

        <div className="glass-card p-4">
          <div className="text-xs text-slate-400 font-medium">Uncertainty Index</div>
          <div className="text-2xl font-bold text-purple-400 mt-1">{(uncertainty * 100).toFixed(0)}%</div>
          <div className="text-[10px] text-slate-500 mt-1">Model Calibration</div>
        </div>
      </div>
    </div>
  );
}
