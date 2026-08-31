"use client";

import React from "react";
import { Sparkles, ArrowRight, Clock, Target, ShieldCheck, Zap, Layers } from "lucide-react";
import Link from "next/link";
import { useDomain } from "../../lib/DomainContext";

export default function NextBestActionCard() {
  const { activeDomain } = useDomain();

  const topSkill = activeDomain.keySkills[4] || activeDomain.keySkills[0];

  return (
    <div className="glass-panel p-6 border-cyan-500/30 bg-gradient-to-br from-brand-surface via-brand-surface to-indigo-950/20 relative overflow-hidden">
      {/* Decorative top badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="h-7 w-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-glow-cyan">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            HIGHEST-IMPACT AI RECOMMENDATION TODAY
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          94.2% Dual-Agent Confidence
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
          <span>Master {topSkill.name}</span>
          <span className="text-xs text-brand-textDim font-normal font-mono">({topSkill.category})</span>
        </h3>
        
        <p className="text-xs text-brand-textMuted leading-relaxed max-w-2xl">
          Dual-Agent Path Critic identified that completing this module directly closes a high-priority competency gap required by 37 target job postings in your domain.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
          <div className="bg-brand-elevated/60 border border-brand-border p-2.5 rounded-xl">
            <span className="text-[10px] font-mono text-brand-textDim block">ESTIMATED TIME</span>
            <span className="text-xs font-bold text-cyan-300 flex items-center space-x-1 mt-0.5">
              <Clock className="h-3.5 w-3.5" />
              <span>3.5 Hours</span>
            </span>
          </div>

          <div className="bg-brand-elevated/60 border border-brand-border p-2.5 rounded-xl">
            <span className="text-[10px] font-mono text-brand-textDim block">SKILL IMPACT</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1 mt-0.5">
              <Zap className="h-3.5 w-3.5" />
              <span>+14% Mastery</span>
            </span>
          </div>

          <div className="bg-brand-elevated/60 border border-brand-border p-2.5 rounded-xl">
            <span className="text-[10px] font-mono text-brand-textDim block">JOB RELEVANCE</span>
            <span className="text-xs font-bold text-indigo-300 flex items-center space-x-1 mt-0.5">
              <Target className="h-3.5 w-3.5" />
              <span>37 Job Postings</span>
            </span>
          </div>

          <div className="bg-brand-elevated/60 border border-brand-border p-2.5 rounded-xl">
            <span className="text-[10px] font-mono text-brand-textDim block">PREREQUISITE STATUS</span>
            <span className="text-xs font-bold text-amber-300 flex items-center space-x-1 mt-0.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Satisfied</span>
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center space-x-4">
          <Link
            href="/tutor"
            className="btn-primary text-xs flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:brightness-110 shadow-glow-cyan"
          >
            <span>Start Mission with AI Tutor</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/skill-graph"
            className="px-4 py-2 rounded-full text-xs font-semibold text-brand-textMuted hover:text-slate-100 hover:bg-brand-elevated border border-brand-border transition-all"
          >
            Inspect Skill Graph Node
          </Link>
        </div>
      </div>
    </div>
  );
}
