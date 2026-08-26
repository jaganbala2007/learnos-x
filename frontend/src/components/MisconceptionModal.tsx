"use client";

import { AlertTriangle, ArrowRight, RefreshCw, X } from "lucide-react";

export default function MisconceptionModal({
  isOpen,
  onClose,
  details,
  adaptationSummary
}: {
  isOpen: boolean;
  onClose: () => void;
  details?: any;
  adaptationSummary?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-panel max-w-lg w-full p-6 relative border-amber-500/40 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <span className="badge badge-amber">Cognitive Diagnosis</span>
            <h3 className="text-lg font-bold text-slate-100 mt-0.5">Misconception Identified</h3>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-4 space-y-3">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Diagnosed Root Cause</span>
            <p className="text-sm font-bold text-amber-400 mt-0.5">
              {details?.title || "Procedural vs Event Scheduling Confusion"}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Diagnostic Explanation</span>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {details?.diagnosis || "Learner selected Option 0 (immediate procedural update). Nonblocking assignments schedule updates during the NBA region of the current time step."}
            </p>
          </div>

          <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded text-xs text-amber-200">
            <strong className="block mb-1">Counter-Example:</strong>
            {details?.counter_example || "Nonblocking assignments (<=) update in the NBA region of the current time slot, NOT immediately."}
          </div>
        </div>

        {/* Closed-Loop Adaptation Banner */}
        <div className="mt-4 p-4 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-start space-x-3">
          <RefreshCw className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5 animate-spin-slow" />
          <div>
            <span className="text-xs font-bold text-cyan-400 block">Closed-Loop Roadmap Adapted!</span>
            <p className="text-xs text-slate-300 mt-1">
              {adaptationSummary || "Roadmap automatically modified: Inserted SystemVerilog Interface Remediation Lab before advancing to UVM."}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all"
          >
            <span>Proceed to Remediation Task</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
