"use client";

import SkillGraphCanvas from "../../components/SkillGraphCanvas";
import { GitMerge, Layers, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import { useDomain } from "../../lib/DomainContext";

export default function SkillGraphPage() {
  const { activeDomain } = useDomain();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-brand-surface via-brand-surface to-purple-950/30 border border-brand-border">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
            Universal Topological Graph
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">
            {activeDomain.name} Intelligence Canvas
          </h1>
          <p className="text-xs text-brand-textMuted mt-1 max-w-xl">
            Strict NetworkX-powered Directed Acyclic Graph (DAG) enforcing prerequisite ordering across 100+ skills and 300+ dependency edges.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-brand-elevated/70 border border-brand-border px-3 py-2 rounded-xl text-xs font-mono">
            <span className="text-brand-textDim block text-[9px]">TOTAL NODES</span>
            <span className="font-bold text-purple-300">14 Skills</span>
          </div>
          <div className="bg-brand-elevated/70 border border-brand-border px-3 py-2 rounded-xl text-xs font-mono">
            <span className="text-brand-textDim block text-[9px]">EDGES</span>
            <span className="font-bold text-cyan-300">28 Constraints</span>
          </div>
        </div>
      </div>

      {/* Main Graph Component */}
      <SkillGraphCanvas />
    </div>
  );
}
