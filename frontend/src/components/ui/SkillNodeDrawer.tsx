"use client";

import { X, CheckCircle2, ArrowRight, BookOpen, GitCommit, ShieldAlert } from "lucide-react";

interface SkillNodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  nodeData: any;
  onStartLearning?: () => void;
}

export default function SkillNodeDrawer({
  isOpen,
  onClose,
  nodeData,
  onStartLearning
}: SkillNodeDrawerProps) {
  if (!isOpen || !nodeData) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Mastered": return "badge-emerald";
      case "Developing": return "badge-cyan";
      case "Weak": return "badge-amber";
      default: return "badge-rose";
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-brand-surface/95 backdrop-blur-2xl border-l border-brand-border p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-left">
      <div>
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-brand-border">
          <div>
            <span className={`status-badge ${getStatusBadge(nodeData.status)}`}>
              {nodeData.status} ({nodeData.mastery}%)
            </span>
            <h3 className="text-xl font-bold text-slate-100 mt-1">{nodeData.label}</h3>
            <span className="text-xs text-brand-textDim">Category: {nodeData.category}</span>
          </div>

          <button
            onClick={onClose}
            className="text-brand-textDim hover:text-brand-textMain p-1 rounded-lg hover:bg-brand-elevated"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Competency Breakdown */}
        <div className="space-y-4 mt-6">
          <div className="glass-card p-4 space-y-2">
            <span className="text-xs text-brand-textMuted block">Current Mastery Level</span>
            <div className="text-3xl font-extrabold text-indigo-400">{nodeData.mastery}%</div>
            <div className="w-full bg-brand-elevated h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${nodeData.mastery}%` }}
              ></div>
            </div>
          </div>

          {/* Upstream Prerequisites */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Upstream Prerequisites
            </span>
            <div className="space-y-1.5 text-xs text-brand-textMuted">
              <div className="flex items-center space-x-2 glass-card p-2.5">
                <GitCommit className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span>SystemVerilog OOP & Data Types</span>
                <span className="badge-emerald px-1.5 py-0.5 text-[9px] ml-auto">Mastered</span>
              </div>
              <div className="flex items-center space-x-2 glass-card p-2.5">
                <GitCommit className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span>Verilog RTL Nonblocking Assignments</span>
                <span className="badge-emerald px-1.5 py-0.5 text-[9px] ml-auto">Mastered</span>
              </div>
            </div>
          </div>

          {/* Evidence Chains */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Demonstrated Evidence
            </span>
            <div className="space-y-1 text-xs text-brand-textMuted">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Diagnostic Assessment Result (78%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Virtual Interface Driver Project Artifact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="pt-6 border-t border-brand-border">
        <button
          onClick={onStartLearning || onClose}
          className="w-full btn-primary py-3 text-xs flex items-center justify-center space-x-2"
        >
          <span>Start Focused Learning Session</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
