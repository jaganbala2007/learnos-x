"use client";

import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface InsightCardProps {
  what: string;
  why: string;
  impact: string;
  confidence?: number;
  actionText?: string;
  onAction?: () => void;
}

export default function InsightCard({
  what,
  why,
  impact,
  confidence = 87,
  actionText = "Accept Recommendation",
  onAction
}: InsightCardProps) {
  return (
    <div className="glass-panel p-5 border-indigo-500/30 bg-gradient-to-r from-brand-surface via-brand-surface to-indigo-950/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="h-7 w-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Sparkles className="h-4 w-4 fill-indigo-400" />
          </div>
          <span className="status-badge badge-primary">AI Insight & Decision Engine</span>
        </div>
        <span className="text-[11px] font-mono font-semibold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          Confidence: {confidence}%
        </span>
      </div>

      <h4 className="text-sm font-bold text-slate-100">{what}</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-brand-border/60 text-xs">
        <div>
          <span className="text-[10px] font-bold text-brand-textDim uppercase tracking-wider block">Why this matters</span>
          <p className="text-brand-textMuted mt-1 leading-relaxed">{why}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold text-brand-textDim uppercase tracking-wider block">Expected Impact</span>
          <p className="text-emerald-400 font-semibold mt-1 flex items-center space-x-1">
            <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{impact}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onAction}
          className="btn-primary text-xs flex items-center space-x-1.5"
        >
          <span>{actionText}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
