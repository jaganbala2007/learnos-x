"use client";

import { TrendingUp, Building2, DollarSign, Award } from "lucide-react";

export default function MarketTrendsCard() {
  const trends = [
    { skill: "SystemVerilog & UVM", growth: "+34%", avgSalary: "$175,000", topEmployers: ["NVIDIA", "Apple", "AMD"] },
    { skill: "Formal Verification (SVA)", growth: "+42%", avgSalary: "$190,000", topEmployers: ["Qualcomm", "Intel", "Amazon"] },
    { skill: "C++/SystemC Modeling", growth: "+21%", avgSalary: "$165,000", topEmployers: ["Google TPU", "Meta", "Tesla"] }
  ];

  return (
    <div className="glass-panel p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-brand-border">
        <div>
          <span className="status-badge badge-emerald">Real-Time Market Signals</span>
          <h3 className="text-base font-bold text-slate-100 mt-1">Industry & Job Market Skill Demand</h3>
        </div>
      </div>

      <div className="space-y-3">
        {trends.map((t, idx) => (
          <div key={idx} className="glass-card p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-100 text-sm block">{t.skill}</span>
              <div className="flex items-center space-x-3 text-brand-textDim mt-1">
                <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                  <TrendingUp className="h-3 w-3" />
                  <span>{t.growth} Growth</span>
                </span>
                <span>Avg: <strong className="text-slate-200">{t.avgSalary}</strong></span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {t.topEmployers.map((emp, i) => (
                <span key={i} className="bg-brand-elevated border border-brand-border px-2 py-0.5 rounded text-[10px] text-brand-textMuted font-mono">
                  {emp}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
