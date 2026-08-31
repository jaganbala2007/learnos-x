"use client";

import WhatIfSimulatorCard from "../../components/ui/WhatIfSimulatorCard";
import { TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useDomain } from "../../lib/DomainContext";

export default function SimulatorPage() {
  const { activeDomain } = useDomain();

  return (
    <div className="space-y-6 animate-in fade-in duration-300 telemetry-grid">
      {/* Editorial Header */}
      <div className="editorial-block border-l-4 border-l-[#D99A2B] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-400 tracking-wider uppercase">
            PREDICTIVE CAREER TRAJECTORY SIMULATOR
          </span>
          <h1 className="font-serif-title text-2xl md:text-3xl font-bold text-brand-textMain mt-0.5">
            What-If Career Trajectory Engine
          </h1>
          <p className="text-xs text-brand-textMuted mt-1 max-w-xl leading-relaxed">
            Simulate how daily study commitment, skill acquisition speed, and project proof impact your career readiness index for **{activeDomain.name}**.
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

      {/* Trajectory Simulator Component */}
      <WhatIfSimulatorCard />
    </div>
  );
}
