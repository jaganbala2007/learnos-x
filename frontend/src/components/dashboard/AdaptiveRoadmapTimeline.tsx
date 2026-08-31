"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, ShieldCheck, ChevronRight, Award, Lock, BookOpen } from "lucide-react";
import Link from "next/link";
import { useDomain } from "../../lib/DomainContext";

export default function AdaptiveRoadmapTimeline() {
  const { activeDomain } = useDomain();
  const [activePhase, setActivePhase] = useState<number>(1);

  const phases = [
    {
      phase: 1,
      title: "Phase 01: Foundations",
      subtitle: "Prerequisite mastery & core theory",
      status: "completed",
      modules: [
        { name: activeDomain.keySkills[0]?.name || "Digital Logic & FSM", status: "Mastered", mastery: 91, time: "4.0 hrs", evidence: "Verified Quiz (100%)" },
        { name: activeDomain.keySkills[1]?.name || "Verilog & RTL Coding", status: "Mastered", mastery: 78, time: "6.5 hrs", evidence: "FSM Lab Verified" }
      ]
    },
    {
      phase: 2,
      title: "Phase 02: Core Competencies",
      subtitle: "Industry-standard methodologies & syntax",
      status: "in-progress",
      modules: [
        { name: activeDomain.keySkills[2]?.name || "SystemVerilog OOP", status: "Developing", mastery: 64, time: "8.0 hrs", evidence: "Testbench Lab 2" },
        { name: activeDomain.keySkills[3]?.name || "SV Interfaces & Modports", status: "Developing", mastery: 58, time: "5.0 hrs", evidence: "Interface Spec" }
      ]
    },
    {
      phase: 3,
      title: "Phase 03: Advanced Architecture",
      subtitle: "UVM, assertions & STA flows",
      status: "next-up",
      modules: [
        { name: activeDomain.keySkills[4]?.name || "UVM Architecture", status: "Target", mastery: 47, time: "10.0 hrs", evidence: "High Priority Gap" },
        { name: activeDomain.keySkills[5]?.name || "FPGA Prototyping", status: "Target", mastery: 72, time: "6.0 hrs", evidence: "Vivado Synthesis" }
      ]
    },
    {
      phase: 4,
      title: "Phase 04: Proof-of-Work Projects",
      subtitle: "End-to-end verification & synthesis labs",
      status: "locked",
      modules: [
        { name: "AXI4-Stream UVM Verification Suite", status: "Locked", mastery: 0, time: "14.0 hrs", evidence: "GitHub Repo Ready" },
        { name: "APBTimer RTL & Testbench Verification", status: "Locked", mastery: 0, time: "10.0 hrs", evidence: "Coverage Target 95%" }
      ]
    },
    {
      phase: 5,
      title: "Phase 05: Verification & Interview Prep",
      subtitle: "Mock screening & diagnostic evaluations",
      status: "locked",
      modules: [
        { name: "STA & Setup/Hold Timing Lab", status: "Locked", mastery: 0, time: "4.0 hrs", evidence: "Interview Simulation" },
        { name: "SystemVerilog Rapid-Fire Technical Screening", status: "Locked", mastery: 0, time: "2.0 hrs", evidence: "Final Pass" }
      ]
    }
  ];

  return (
    <div className="glass-panel p-6 border-brand-border space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
            <span>Adaptive Roadmap Timeline</span>
            <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              Topologically Compressed
            </span>
          </h3>
          <p className="text-xs text-brand-textDim">
            Dynamically re-ordered timeline enforcing strict DAG prerequisites and skipping verified redundant skills.
          </p>
        </div>

        {/* Phase Selector Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {phases.map((p) => (
            <button
              key={p.phase}
              onClick={() => setActivePhase(p.phase)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex-shrink-0 ${
                activePhase === p.phase
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan"
                  : "bg-brand-elevated/60 text-brand-textDim hover:text-slate-200 border border-brand-border"
              }`}
            >
              P0{p.phase}
            </button>
          ))}
        </div>
      </div>

      {/* Active Phase Cards */}
      {phases.filter(p => p.phase === activePhase).map(p => (
        <div key={p.phase} className="space-y-4">
          <div className="flex items-center justify-between bg-brand-surface/60 border border-brand-border px-4 py-2.5 rounded-xl">
            <div>
              <h4 className="text-sm font-bold text-slate-100">{p.title}</h4>
              <p className="text-xs text-brand-textDim">{p.subtitle}</p>
            </div>
            <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
              p.status === "completed" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
              p.status === "in-progress" ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" :
              "bg-brand-elevated text-brand-textDim border-brand-border"
            }`}>
              {p.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {p.modules.map((m, idx) => (
              <div
                key={idx}
                className="bg-brand-elevated/70 border border-brand-border p-4 rounded-xl space-y-3 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
                      Module 0{idx + 1}
                    </span>
                    <h5 className="text-xs font-bold text-slate-100">{m.name}</h5>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    m.mastery > 70 ? "bg-emerald-500/20 text-emerald-400" :
                    m.mastery > 30 ? "bg-cyan-500/20 text-cyan-300" :
                    "bg-amber-500/20 text-amber-300"
                  }`}>
                    {m.mastery}% Mastery
                  </span>
                </div>

                <div className="w-full h-1.5 bg-brand-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-500"
                    style={{ width: `${m.mastery}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-brand-textDim pt-1 font-mono">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-brand-textDim" />
                    <span>Est: {m.time}</span>
                  </span>
                  <span className="text-slate-300 font-sans truncate max-w-[140px]">
                    {m.evidence}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
