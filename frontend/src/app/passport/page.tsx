"use client";

import { useEffect, useState } from "react";
import { Award, CheckCircle2, ShieldCheck, Share2, ExternalLink, Lock, Cpu, QrCode } from "lucide-react";
import { fetchApi } from "../../lib/api";
import { useDomain } from "../../lib/DomainContext";

export default function PassportPage() {
  const { activeDomain } = useDomain();

  const credentials = [
    {
      id: "cred_01",
      skill_name: activeDomain.keySkills[0]?.name || "Digital Logic & FSM",
      mastery_percentage: 91.0,
      confidence: 0.94,
      status: "VERIFIED CREDENTIAL",
      hash: "0x8f7a...3e2b",
      issued: "August 2026",
      evidence: ["Multi-modal Diagnostic Quiz (91%)", "Vivado FPGA ALU Synthesis Artifact", "Socratic Code Verification"]
    },
    {
      id: "cred_02",
      skill_name: activeDomain.keySkills[1]?.name || "Verilog RTL Design",
      mastery_percentage: 78.0,
      confidence: 0.88,
      status: "VERIFIED CREDENTIAL",
      hash: "0x4b19...9c4a",
      issued: "August 2026",
      evidence: ["RTL FSM State Machine Lab", "Synthesis Constraint Verification"]
    },
    {
      id: "cred_03",
      skill_name: activeDomain.keySkills[2]?.name || "SystemVerilog OOP",
      mastery_percentage: 64.0,
      confidence: 0.79,
      status: "VERIFIED CREDENTIAL",
      hash: "0x2d8e...1f6c",
      issued: "August 2026",
      evidence: ["Virtual Interface Testbench Project", "Class Inheritance Practice"]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-surface via-brand-surface to-amber-950/30 border border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
            LEARNOS X DIGITAL IDENTITY
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100 mt-1">Verified Skill Identity Passport</h1>
          <p className="text-xs text-brand-textMuted mt-1 max-w-xl">
            Cryptographically verifiable proof-of-competency identity for {activeDomain.name}. Grounded in multi-modal diagnostic assessments, project artifacts, and code execution.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 rounded-xl bg-brand-elevated border border-brand-border text-xs font-mono font-semibold text-slate-200 hover:text-white flex items-center space-x-2">
            <Share2 className="h-4 w-4 text-cyan-400" />
            <span>Share Passport URL</span>
          </button>
        </div>
      </div>

      {/* CREDENTIAL CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {credentials.map((cred) => (
          <div
            key={cred.id}
            className="glass-panel p-6 border-amber-500/20 space-y-5 relative overflow-hidden bg-gradient-to-b from-brand-surface to-brand-surface/90 hover:border-amber-500/40 transition-all shadow-panel"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  {cred.status}
                </span>
              </div>
              <span className="text-[10px] font-mono text-brand-textDim">{cred.issued}</span>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-lg font-bold text-slate-100">{cred.skill_name}</h3>
              <span className="text-[11px] font-mono text-cyan-400">ID: {cred.hash}</span>
            </div>

            {/* Score Box */}
            <div className="bg-brand-elevated/80 border border-brand-border p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-brand-textDim uppercase text-[10px]">Verified Mastery</span>
                <span className="font-bold text-emerald-400">{cred.mastery_percentage}%</span>
              </div>
              <div className="w-full bg-brand-surface h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${cred.mastery_percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Evidence Items */}
            <div className="space-y-2 pt-1 border-t border-brand-border/60">
              <span className="text-[10px] font-mono font-bold text-brand-textDim uppercase block">
                Proof of Evidence Chain
              </span>
              <div className="space-y-1.5 text-xs text-brand-textMuted">
                {cred.evidence.map((ev, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
