"use client";

import SocraticTutorChat from "../../components/SocraticTutorChat";
import { Bot, BookOpen, Code, CheckCircle2, AlertCircle, Sparkles, Terminal, FileText } from "lucide-react";
import { useDomain } from "../../lib/DomainContext";

export default function TutorPage() {
  const { activeDomain } = useDomain();

  const codeSnippet = `interface bus_if (input logic clk, reset_n);
  logic [31:0] addr;
  logic [31:0] data;
  logic        valid;
  logic        ready;

  clocking cb @(posedge clk);
    default input #1step output #2ns;
    output addr, data, valid;
    input  ready;
  endclocking

  modport master (clocking cb, input reset_n);
endinterface`;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-surface via-brand-surface to-emerald-950/30 border border-brand-border flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
            RAG Learning Workspace
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">Socratic AI Tutor & Diagnostic Lab</h1>
          <p className="text-xs text-brand-textMuted mt-1 max-w-xl">
            Interactive AI study partner for {activeDomain.name} providing targeted Socratic questions, code explanations, and diagnostic misconception analysis.
          </p>
        </div>

        <div className="hidden lg:flex items-center space-x-2 text-xs font-mono">
          <span className="text-brand-textDim">Active Skill:</span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
            {activeDomain.keySkills[3]?.name || "SystemVerilog Interfaces"}
          </span>
        </div>
      </div>

      {/* 3-COLUMN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: LEARNING CONTEXT & MISCONCEPTIONS (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-panel p-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Active Context</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="bg-brand-elevated/70 p-2.5 rounded-xl border border-brand-border">
                <span className="text-[10px] text-brand-textDim block font-mono">CURRENT TOPIC</span>
                <span className="font-bold text-slate-100">{activeDomain.keySkills[3]?.name}</span>
              </div>

              <div className="bg-brand-elevated/70 p-2.5 rounded-xl border border-brand-border">
                <span className="text-[10px] text-brand-textDim block font-mono">TARGET MASTERY</span>
                <span className="font-bold text-cyan-300">85% (Current: {activeDomain.keySkills[3]?.mastery}%)</span>
              </div>

              <div className="bg-brand-elevated/70 p-2.5 rounded-xl border border-brand-border">
                <span className="text-[10px] text-brand-textDim block font-mono">RETENTION INDEX</span>
                <span className="font-bold text-emerald-400">74% (Optimal)</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center space-x-1.5">
              <AlertCircle className="h-4 w-4 text-amber-400" />
              <span>Diagnosed Misconceptions</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-amber-200">
                <span className="font-bold block mb-0.5">Nonblocking Update Timing</span>
                <p className="text-[11px] text-amber-300/80 leading-tight">
                  Confused NBA region execution timing with Immediate Active region updates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: SOCRATIC CHAT WORKSPACE (6 cols) */}
        <div className="lg:col-span-6">
          <SocraticTutorChat />
        </div>

        {/* RIGHT COLUMN: KNOWLEDGE PANEL & CODE SNIPPETS (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-panel p-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase flex items-center space-x-1.5">
              <Code className="h-4 w-4 text-cyan-400" />
              <span>Reference Architecture</span>
            </h4>

            <div className="bg-slate-950 p-3 rounded-xl border border-brand-border overflow-x-auto">
              <pre className="font-mono text-[10px] text-cyan-300 leading-tight">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </div>

          <div className="glass-panel p-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase flex items-center space-x-1.5">
              <Terminal className="h-4 w-4 text-purple-400" />
              <span>Interview Practice Questions</span>
            </h4>

            <div className="space-y-2 text-xs text-brand-textMuted">
              <div className="bg-brand-elevated/70 p-2.5 rounded-xl border border-brand-border hover:border-cyan-500/30 transition-all cursor-pointer">
                <span className="font-bold text-slate-200 block mb-1">Q: What is the purpose of modports in SV interfaces?</span>
                <span className="text-[10px] font-mono text-cyan-400">Click to practice with AI</span>
              </div>

              <div className="bg-brand-elevated/70 p-2.5 rounded-xl border border-brand-border hover:border-cyan-500/30 transition-all cursor-pointer">
                <span className="font-bold text-slate-200 block mb-1">Q: How do clocking blocks eliminate race conditions?</span>
                <span className="text-[10px] font-mono text-cyan-400">Click to practice with AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
