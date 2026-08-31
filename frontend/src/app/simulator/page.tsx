"use client";

import PathComparator from "../../components/PathComparator";
import JobDescriptionMapper from "../../components/ui/JobDescriptionMapper";
import WhatIfSimulatorCard from "../../components/ui/WhatIfSimulatorCard";
import TrajectoryChart from "../../components/ui/TrajectoryChart";
import { Compass, Sparkles } from "lucide-react";
import { useDomain } from "../../lib/DomainContext";

export default function SimulatorPage() {
  const { activeDomain } = useDomain();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-surface via-brand-surface to-cyan-950/30 border border-brand-border">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
          Counterfactual Intelligence
        </span>
        <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
          Trajectory & What-If Career Simulator
        </h1>
        <p className="text-xs text-brand-textMuted mt-1 max-w-xl">
          Model time budgets, skip non-critical prerequisites, compare pathing strategies, and simulate career readiness curves for {activeDomain.name}.
        </p>
      </div>

      <WhatIfSimulatorCard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TrajectoryChart />
        <PathComparator />
      </div>

      <JobDescriptionMapper />
    </div>
  );
}
