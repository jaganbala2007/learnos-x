"use client";

import SkillGraphCanvas from "../../components/SkillGraphCanvas";
import { Cpu, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useDomain } from "../../lib/DomainContext";

export default function SkillGraphPage() {
  const { activeDomain } = useDomain();

  return (
    <div className="space-y-6 animate-in fade-in duration-300 telemetry-grid">
      {/* Editorial Header */}
      <div className="editorial-block border-l-4 border-l-[#5F8A68] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
            DIRECTED ACYCLIC GRAPH (DAG) CANVAS
          </span>
          <h1 className="font-serif-title text-2xl md:text-3xl font-bold text-brand-textMain mt-0.5">
            Universal Topological Skill Graph
          </h1>
          <p className="text-xs text-brand-textMuted mt-1 max-w-xl leading-relaxed">
            Visualizing skill prerequisites, verified evidence status, and target job dependency paths for **{activeDomain.name}**.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="btn-secondary text-xs flex items-center space-x-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Full Skill Graph Canvas */}
      <div className="editorial-block p-4 space-y-3">
        <SkillGraphCanvas />
      </div>
    </div>
  );
}
