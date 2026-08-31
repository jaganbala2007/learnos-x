"use client";

import React, { useState } from "react";
import { Target, Cpu, FileText, ShieldCheck, Terminal, Award, ArrowRight } from "lucide-react";
import { useDomain } from "../../lib/DomainContext";

export default function CareerConstellation() {
  const { activeDomain, selectedRole } = useDomain();
  const [activeNode, setActiveNode] = useState<string>("goal");

  const nodes = [
    { id: "goal", label: "Career Goal", detail: selectedRole, icon: Target, color: "border-purple-500 text-purple-300 bg-purple-500/20" },
    { id: "skills", label: "Required Skills", detail: `${activeDomain.keySkills.length} Key Competencies`, icon: Cpu, color: "border-indigo-500 text-indigo-300 bg-indigo-500/20" },
    { id: "projects", label: "Projects", detail: "Proof-of-Work Artifacts", icon: FileText, color: "border-cyan-500 text-cyan-300 bg-cyan-500/20" },
    { id: "evidence", label: "Evidence", detail: "Signed Verification", icon: ShieldCheck, color: "border-emerald-500 text-emerald-300 bg-emerald-500/20" },
    { id: "interview", label: "AI Interview", detail: "English & Technical Screening", icon: Terminal, color: "border-rose-500 text-rose-300 bg-rose-500/20" },
    { id: "readiness", label: "Job Readiness", detail: `${activeDomain.readinessScore}% Verified Index`, icon: Award, color: "border-amber-500 text-amber-300 bg-amber-500/20" },
  ];

  return (
    <div className="glass-panel p-6 border-brand-border space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
            SPATIAL CAREER PIPELINE
          </span>
          <h3 className="text-base font-bold text-slate-100 mt-1">Career Constellation Pipeline</h3>
        </div>
        <span className="text-xs font-mono text-brand-textDim">Domain: {activeDomain.name}</span>
      </div>

      {/* Spatial Flow Line */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2">
        {nodes.map((n, idx) => {
          const Icon = n.icon;
          const isSelected = activeNode === n.id;

          return (
            <div
              key={n.id}
              onClick={() => setActiveNode(n.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 relative ${
                isSelected
                  ? `${n.color} shadow-lg scale-102 font-bold`
                  : "bg-brand-surface/70 border-brand-border text-brand-textMuted hover:border-cyan-500/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`h-4 w-4 ${isSelected ? "text-slate-100" : "text-brand-textDim"}`} />
                <span className="text-[9px] font-mono opacity-60">0{idx + 1}</span>
              </div>

              <div>
                <span className="text-xs font-bold block text-slate-100">{n.label}</span>
                <span className="text-[10px] text-brand-textDim truncate block mt-0.5">{n.detail}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
