"use client";

import { useState } from "react";
import { HelpCircle, AlertTriangle, ArrowRight, Sparkles, RefreshCw } from "lucide-react";
import { fetchApi } from "../../lib/api";

export default function WhatIfSimulatorCard() {
  const [activeQuery, setActiveQuery] = useState("skip_skill");
  const [simulation, setSimulation] = useState<any>({
    recalculated_readiness: 43.0,
    recalculated_weeks: 3.0,
    risk_assessment: "HIGH RISK: Skipping SystemVerilog Interfaces blocks 3 downstream UVM modules.",
    simulation_insight: "Skipping saves 1 week, but reduces maximum role readiness cap from 87% to 73%."
  });
  const [loading, setLoading] = useState(false);

  const runSimulation = async (type: string) => {
    setActiveQuery(type);
    setLoading(true);
    try {
      const res: any = await fetchApi("/flagship/simulator/what-if", {
        method: "POST",
        body: JSON.stringify({ query_type: type })
      });
      setSimulation(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 space-y-5 border-cyan-500/30">
      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
        <div>
          <span className="status-badge badge-cyan">Counterfactual Intelligence</span>
          <h3 className="text-base font-bold text-slate-100 mt-1">"What-If" Learning Trajectory Simulator</h3>
          <p className="text-xs text-brand-textDim">Simulate trade-offs when skipping skills, reducing hours, or changing career targets.</p>
        </div>
      </div>

      {/* Query Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold">
        <button
          onClick={() => runSimulation("skip_skill")}
          className={`p-3 rounded-xl border text-left transition-all ${
            activeQuery === "skip_skill"
              ? "bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold"
              : "bg-brand-elevated/60 border-brand-border text-brand-textDim hover:text-brand-textMain"
          }`}
        >
          <span className="block text-[10px] uppercase text-rose-400 font-extrabold mb-1">Scenario A</span>
          <span>"What if I skip SystemVerilog Interfaces?"</span>
        </button>

        <button
          onClick={() => runSimulation("change_hours")}
          className={`p-3 rounded-xl border text-left transition-all ${
            activeQuery === "change_hours"
              ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold"
              : "bg-brand-elevated/60 border-brand-border text-brand-textDim hover:text-brand-textMain"
          }`}
        >
          <span className="block text-[10px] uppercase text-cyan-400 font-extrabold mb-1">Scenario B</span>
          <span>"What if I study 5 hrs/week?"</span>
        </button>

        <button
          onClick={() => runSimulation("role_change")}
          className={`p-3 rounded-xl border text-left transition-all ${
            activeQuery === "role_change"
              ? "bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold"
              : "bg-brand-elevated/60 border-brand-border text-brand-textDim hover:text-brand-textMain"
          }`}
        >
          <span className="block text-[10px] uppercase text-purple-400 font-extrabold mb-1">Scenario C</span>
          <span>"What if I switch to FPGA Engineer?"</span>
        </button>
      </div>

      {/* Simulation Result Output */}
      {simulation && (
        <div className="glass-card p-4 space-y-3 border-brand-border/80 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-brand-textDim uppercase block">Recalculated Readiness</span>
              <span className="text-2xl font-black text-slate-100">{simulation.recalculated_readiness}%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-brand-textDim uppercase block">Completion Timeline</span>
              <span className="text-2xl font-black text-cyan-400">{simulation.recalculated_weeks} Weeks</span>
            </div>
          </div>

          <div className="pt-2 border-t border-brand-border/60">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Risk & Trade-off Assessment</span>
            </span>
            <p className="text-brand-textMuted mt-1 font-medium">{simulation.risk_assessment}</p>
            <p className="text-slate-200 mt-1 font-semibold">{simulation.simulation_insight}</p>
          </div>
        </div>
      )}
    </div>
  );
}
