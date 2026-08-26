"use client";

import PathComparator from "../../components/PathComparator";
import JobDescriptionMapper from "../../components/ui/JobDescriptionMapper";
import WhatIfSimulatorCard from "../../components/ui/WhatIfSimulatorCard";
import TrajectoryChart from "../../components/ui/TrajectoryChart";

export default function SimulatorPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="status-badge badge-cyan">Future Intelligence & Simulation</span>
        <h1 className="text-2xl font-black text-slate-100 mt-1">Autonomous Career & Trajectory Simulator</h1>
        <p className="text-xs text-brand-textMuted mt-1">
          Evaluate candidate learning trajectories, run counterfactual "What-If" queries, and parse Job Descriptions with Dual-Agent Critic verification.
        </p>
      </div>

      <JobDescriptionMapper />

      <WhatIfSimulatorCard />

      <PathComparator />
    </div>
  );
}
