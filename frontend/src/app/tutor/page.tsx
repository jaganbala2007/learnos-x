"use client";

import { useState } from "react";
import SocraticTutorChat from "../../components/SocraticTutorChat";
import { BookOpen, Sparkles, CheckCircle2, Award, Terminal } from "lucide-react";
import { useDomain } from "../../lib/DomainContext";

export default function TutorPage() {
  const { activeDomain } = useDomain();

  return (
    <div className="space-y-6 animate-in fade-in duration-300 telemetry-grid">
      {/* Editorial Header */}
      <div className="editorial-block border-l-4 border-l-[#3F7C78] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-teal-800 dark:text-teal-400 tracking-wider uppercase">
            3-COLUMN SOCRATIC AI LEARNING WORKSPACE
          </span>
          <h1 className="font-serif-title text-2xl md:text-3xl font-bold text-brand-textMain mt-0.5">
            Autonomous Socratic Tutor & Diagnostic Lab
          </h1>
          <p className="text-xs text-brand-textMuted mt-1 max-w-xl leading-relaxed">
            Master engineering concepts through guided questioning, instant diagnostic checks, and contextual documentation for <strong className="font-semibold text-brand-textMain">{activeDomain.name}</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
          <CheckCircle2 className="h-4 w-4" />
          <span>Active Learning Session</span>
        </div>
      </div>

      {/* 3-Column AI Learning Workspace Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Learning Context & Prerequisite Tree (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="editorial-block space-y-3">
            <span className="text-[10px] font-mono font-bold text-brand-textDim uppercase block border-b border-brand-border pb-2">
              LEARNING MODULE CONTEXT
            </span>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-800 dark:text-amber-400 font-bold block uppercase">
                TARGET TOPIC
              </span>
              <h4 className="font-serif-title font-bold text-base text-brand-textMain">
                SystemVerilog Interface & Clocking Blocks
              </h4>
            </div>

            <div className="pt-2 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-brand-textDim">Estimated Mastery</span>
                <span className="font-bold text-amber-800 dark:text-amber-400">+14% Index</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-textDim">Target Roles</span>
                <span className="font-bold text-teal-800 dark:text-teal-400">37 Postings</span>
              </div>
            </div>

            <div className="pt-3 border-t border-brand-border space-y-2">
              <span className="text-[10px] font-mono font-bold text-brand-textDim uppercase block">
                PREREQUISITES SATISFIED
              </span>
              <div className="space-y-1 text-xs">
                {["Digital Logic Fundamentals", "Verilog Syntax & Registers", "Clocked Sequential Logic"].map((pre, i) => (
                  <div key={i} className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400 font-mono text-[11px]">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{pre}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Socratic AI Chat Workspace (6 cols) */}
        <div className="lg:col-span-6 editorial-block h-[620px] flex flex-col p-4">
          <SocraticTutorChat />
        </div>

        {/* Right Column: Knowledge Panel & Reference Docs (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="editorial-block space-y-3">
            <span className="text-[10px] font-mono font-bold text-brand-textDim uppercase block border-b border-brand-border pb-2">
              ENGINEERING TELEMETRY & REFERENCE
            </span>

            <div className="p-3 rounded-lg bg-brand-surface border border-brand-border space-y-1.5">
              <span className="font-bold text-xs text-brand-textMain flex items-center space-x-1.5">
                <Terminal className="h-3.5 w-3.5 text-amber-800 dark:text-amber-400" />
                <span>SystemVerilog Interface</span>
              </span>
              <p className="text-[11px] text-brand-textMuted leading-relaxed">
                Interfaces bundle directional signals and clocking blocks into reusable verification ports, eliminating netlist wiring errors.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-brand-surface border border-brand-border space-y-1.5">
              <span className="font-bold text-xs text-brand-textMain flex items-center space-x-1.5">
                <Sparkles className="h-3.5 w-3.5 text-teal-800 dark:text-teal-400" />
                <span>Socratic Prompt Tip</span>
              </span>
              <p className="text-[11px] text-brand-textMuted leading-relaxed">
                Ask the AI Tutor to construct a minimal SystemVerilog clocking block code sample to observe signal sampling in the preponed region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
