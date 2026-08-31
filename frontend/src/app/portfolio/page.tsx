"use client";

import { Briefcase, ExternalLink, GitBranch, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useDomain } from "../../lib/DomainContext";

export default function PortfolioPage() {
  const { activeDomain } = useDomain();

  const projects = [
    {
      title: "UVM AXI4-Lite Verification Environment",
      problem: "Verifying non-blocking AXI bus protocol interactions under randomized clock jitter.",
      architecture: "UVM Agent + Driver + Monitor + Scoreboard + Virtual Sequencer",
      tech: ["SystemVerilog", "UVM 1.2", "ModelSim", "Git"],
      verified: true
    },
    {
      title: "Pipelined RISC-V 32I Core Verification",
      problem: "Catching hazard detection & forwarding unit race conditions.",
      architecture: "Constrained Random Verification & Assertion-Based Verification (SVA)",
      tech: ["SystemVerilog", "Verilator", "Python", "Makefile"],
      verified: true
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 telemetry-grid">
      {/* Editorial Header */}
      <div className="editorial-block border-l-4 border-l-[#3F7C78] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-teal-800 dark:text-teal-400 tracking-wider uppercase">
            TECHNICAL PROOF OF WORK PORTFOLIO
          </span>
          <h1 className="font-serif-title text-2xl md:text-3xl font-bold text-brand-textMain mt-0.5">
            Engineering Proof Portfolio
          </h1>
          <p className="text-xs text-brand-textMuted mt-1 max-w-xl leading-relaxed">
            Verified technical projects, testbench repositories, and architectural evidence for **{activeDomain.name}**.
          </p>
        </div>

        <Link href="/" className="btn-secondary text-xs flex items-center space-x-1.5">
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((proj, i) => (
          <div key={i} className="editorial-block space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-400 uppercase">
                  PROJECT ARTIFACT 0{i + 1}
                </span>
                <h3 className="font-serif-title font-bold text-xl text-brand-textMain">{proj.title}</h3>
              </div>
              <span className="text-xs font-mono text-emerald-800 dark:text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="h-4 w-4" />
                <span>Verified Code Evidence</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-brand-textDim uppercase font-bold block">TECHNICAL PROBLEM</span>
                <p className="text-brand-textMuted leading-relaxed">{proj.problem}</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-brand-textDim uppercase font-bold block">SYSTEM ARCHITECTURE</span>
                <p className="text-brand-textMuted leading-relaxed">{proj.architecture}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-brand-border">
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {proj.tech.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-brand-elevated border border-brand-border text-brand-textMain">
                    {t}
                  </span>
                ))}
              </div>

              <a href="#" className="btn-secondary text-[11px] py-1 px-3 flex items-center space-x-1">
                <GitBranch className="h-3.5 w-3.5" />
                <span>Repository</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
