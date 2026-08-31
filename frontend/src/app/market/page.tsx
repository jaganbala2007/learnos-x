"use client";

import { BarChart3, TrendingUp, DollarSign, Briefcase, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useDomain } from "../../lib/DomainContext";

export default function MarketPage() {
  const { activeDomain } = useDomain();

  return (
    <div className="space-y-6 animate-in fade-in duration-300 telemetry-grid">
      {/* Editorial Header */}
      <div className="editorial-block border-l-4 border-l-[#D99A2B] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-400 tracking-wider uppercase">
            REAL-TIME LABOR MARKET INTELLIGENCE
          </span>
          <h1 className="font-serif-title text-2xl md:text-3xl font-bold text-brand-textMain mt-0.5">
            Labor Market & Hiring Intelligence
          </h1>
          <p className="text-xs text-brand-textMuted mt-1 max-w-xl leading-relaxed">
            Live demand trends, salary distributions, and hiring velocity metrics for **{activeDomain.name}**.
          </p>
        </div>

        <Link href="/" className="btn-secondary text-xs flex items-center space-x-1.5">
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>

      {/* Market Metrics Strip */}
      <div className="editorial-block grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
        <div className="space-y-1">
          <span className="text-[10px] text-brand-textDim uppercase block">ACTIVE JOB OPENINGS</span>
          <span className="font-serif-title font-bold text-2xl text-amber-800 dark:text-amber-400">1,420 Roles</span>
          <span className="text-[10px] text-emerald-800 dark:text-emerald-400 block">+12.4% MoM Growth</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-brand-textDim uppercase block">MEDIAN SALARY RANGE</span>
          <span className="font-serif-title font-bold text-2xl text-teal-800 dark:text-teal-400">$135,000 - $175,000</span>
          <span className="text-[10px] text-brand-textDim block">US National Average</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-brand-textDim uppercase block">TOP DEMAND SKILL</span>
          <span className="font-serif-title font-bold text-2xl text-emerald-800 dark:text-emerald-400">SystemVerilog UVM</span>
          <span className="text-[10px] text-amber-800 dark:text-amber-400 block">Required in 84% Postings</span>
        </div>
      </div>
    </div>
  );
}
