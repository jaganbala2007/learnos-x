"use client";

import { useEffect, useState } from "react";
import { FileText, ExternalLink, CheckCircle2, Award, Github, Code, Cpu, ShieldCheck } from "lucide-react";
import { fetchApi } from "../../lib/api";
import { useDomain } from "../../lib/DomainContext";

export default function PortfolioPage() {
  const { activeDomain } = useDomain();

  const projects = [
    {
      id: "proj_01",
      name: "SystemVerilog Interface & Clocking Block Verification Suite",
      description: "Constructed dynamic virtual interface testbench driving transaction frames across DUT boundary with zero clock domain race conditions.",
      skills: ["SystemVerilog Interfaces", "Virtual Interfaces", "Clocking Blocks", "Modports"],
      githubUrl: "https://github.com/jaganbala2007/learnos-x",
      verificationStatus: "Verified 88% Mastery",
      coverage: "96.4% Line & Toggle Coverage",
      codeSnippet: `interface bus_if (input logic clk, reset_n);
  clocking cb @(posedge clk);
    default input #1step output #2ns;
    output addr, data, valid;
    input  ready;
  endclocking
endinterface`
    },
    {
      id: "proj_02",
      name: "FPGA Verilog Finite State Machine ALU Controller",
      description: "Designed 8-state Mealy/Moore FSM driving 32-bit hardware execution unit with timing closure verified on Xilinx Vivado.",
      skills: ["Verilog RTL", "Digital Logic", "FSM Design", "Vivado Synthesis"],
      githubUrl: "https://github.com/jaganbala2007/learnos-x",
      verificationStatus: "Verified 91% Mastery",
      coverage: "100% State Transition Coverage",
      codeSnippet: `typedef enum logic [2:0] { IDLE, FETCH, DECODE, EXEC, WRITE } state_t;
state_t state, next_state;`
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-surface via-brand-surface to-cyan-950/30 border border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
            PROOF-OF-WORK PLATFORM
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">Proof of Skill Technical Portfolio</h1>
          <p className="text-xs text-brand-textMuted mt-1 max-w-xl">
            Automatically generated portfolio showcasing verified project artifacts, UVM testbenches, assertions, coverage metrics, and GitHub repositories for {activeDomain.name}.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/jaganbala2007/learnos-x"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-brand-elevated border border-brand-border text-xs font-mono font-semibold text-slate-200 hover:text-white flex items-center space-x-2"
          >
            <Github className="h-4 w-4 text-cyan-400" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>

      {/* PROJECT CARDS SHOWCASE */}
      <div className="space-y-6">
        {projects.map((p) => (
          <div key={p.id} className="glass-panel p-6 border-brand-border space-y-4 hover:border-cyan-500/30 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">Verified Project Artifact</span>
                <h3 className="text-lg font-bold text-slate-100">{p.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {p.verificationStatus}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {p.coverage}
                </span>
              </div>
            </div>

            <p className="text-xs text-brand-textMuted leading-relaxed">{p.description}</p>

            {/* Code Snippet Box */}
            <div className="bg-slate-950 p-3 rounded-xl border border-brand-border overflow-x-auto">
              <pre className="font-mono text-[11px] text-cyan-300">
                <code>{p.codeSnippet}</code>
              </pre>
            </div>

            {/* Skills & Link */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {p.skills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-brand-elevated text-[10px] font-mono text-slate-200 border border-brand-border">
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
              >
                <span>Inspect Repository Code</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
