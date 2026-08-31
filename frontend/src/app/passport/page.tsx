"use client";

import { Award, ShieldCheck, CheckCircle2, ArrowLeft, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useDomain } from "../../lib/DomainContext";

export default function PassportPage() {
  const { activeDomain } = useDomain();

  return (
    <div className="space-y-6 animate-in fade-in duration-300 telemetry-grid">
      {/* Editorial Header */}
      <div className="editorial-block border-l-4 border-l-[#5F8A68] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
            VERIFIED SKILL IDENTITY CREDENTIAL
          </span>
          <h1 className="font-serif-title text-2xl md:text-3xl font-bold text-brand-textMain mt-0.5">
            Verified Skill Passport
          </h1>
          <p className="text-xs text-brand-textMuted mt-1 max-w-xl leading-relaxed">
            Cryptographically signed proof of skill mastery, project evidence, and diagnostic assessment scores for **Alex Vance**.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="btn-primary text-xs flex items-center space-x-1.5">
            <Download className="h-4 w-4" />
            <span>Export Verifiable Credential</span>
          </button>
        </div>
      </div>

      {/* Passport Credential Panel */}
      <div className="editorial-block space-y-6">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-mono font-bold text-lg text-amber-800 dark:text-amber-400">
              AV
            </div>
            <div>
              <h3 className="font-serif-title font-bold text-xl text-brand-textMain">Alex Vance</h3>
              <p className="text-xs font-mono text-brand-textDim">Passport ID: LX-8849-VERIFIED</p>
            </div>
          </div>
          <div className="text-right font-mono text-xs">
            <span className="text-emerald-800 dark:text-emerald-400 font-bold block flex items-center space-x-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified Credential</span>
            </span>
            <span className="text-brand-textDim text-[10px]">Updated Today</span>
          </div>
        </div>

        {/* 3 Main Qualification Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-brand-surface border border-brand-border space-y-1 font-mono text-xs">
            <span className="text-brand-textDim text-[10px] uppercase">PRIMARY SPECIALIZATION</span>
            <h4 className="font-serif-title font-bold text-base text-brand-textMain">{activeDomain.name}</h4>
            <span className="text-amber-800 dark:text-amber-400 font-bold block">{activeDomain.readinessScore}% Overall Index</span>
          </div>

          <div className="p-4 rounded-lg bg-brand-surface border border-brand-border space-y-1 font-mono text-xs">
            <span className="text-brand-textDim text-[10px] uppercase">VERIFIED MODULES</span>
            <h4 className="font-serif-title font-bold text-base text-brand-textMain">9 Competencies</h4>
            <span className="text-emerald-800 dark:text-emerald-400 font-bold block">100% Passed</span>
          </div>

          <div className="p-4 rounded-lg bg-brand-surface border border-brand-border space-y-1 font-mono text-xs">
            <span className="text-brand-textDim text-[10px] uppercase">PRACTICAL PROOF</span>
            <h4 className="font-serif-title font-bold text-base text-brand-textMain">2 Github Repositories</h4>
            <span className="text-teal-800 dark:text-teal-400 font-bold block">Testbench Evidence</span>
          </div>
        </div>
      </div>
    </div>
  );
}
