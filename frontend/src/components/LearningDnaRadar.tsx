"use client";

import { Activity, Clock, Zap } from "lucide-react";

export default function LearningDnaRadar({ dna }: { dna?: any }) {
  const d = dna || {
    learning_velocity: 81,
    retention_score: 74,
    practical_learning: 92,
    conceptual_learning: 67,
    problem_solving: 86,
    preferred_format: "Project > Practice > Video > Text",
    optimal_session_minutes: 30
  };

  const metrics = [
    { label: "Learning Velocity", value: d.learning_velocity, color: "bg-cyan-400" },
    { label: "Retention Rate", value: d.retention_score, color: "bg-blue-400" },
    { label: "Practical Learning", value: d.practical_learning, color: "bg-emerald-400" },
    { label: "Conceptual Learning", value: d.conceptual_learning, color: "bg-amber-400" },
    { label: "Problem Solving", value: d.problem_solving, color: "bg-purple-400" }
  ];

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="badge badge-amber">Adaptive Model</span>
          <h3 className="text-lg font-bold text-slate-100 mt-1">Adaptive Learning DNA</h3>
        </div>
        <Activity className="h-5 w-5 text-amber-400" />
      </div>

      <div className="space-y-3.5 mt-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
              <span>{m.label}</span>
              <span className="font-mono text-slate-400">{m.value}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className={`${m.color} h-full rounded-full transition-all duration-500`} style={{ width: `${m.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-400">
          <Clock className="h-4 w-4 text-cyan-400" />
          <span>Session: <strong className="text-slate-200">{d.optimal_session_minutes} min</strong></span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <Zap className="h-4 w-4 text-emerald-400" />
          <span>Preferred: <strong className="text-slate-200">Projects</strong></span>
        </div>
      </div>
    </div>
  );
}
