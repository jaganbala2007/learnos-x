"use client";

import { TrendingUp, ArrowUpRight } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: string;
  context?: string;
  color?: "indigo" | "cyan" | "emerald" | "amber" | "purple";
  sparklineData?: number[];
}

export default function MetricCard({
  label,
  value,
  unit = "",
  trend,
  context,
  color = "indigo",
  sparklineData = [35, 42, 45, 51, 57]
}: MetricCardProps) {
  const colorMap = {
    indigo: { text: "text-indigo-400 dark:text-indigo-400", bg: "bg-indigo-500", border: "border-indigo-500/30" },
    cyan: { text: "text-cyan-500 dark:text-cyan-400", bg: "bg-cyan-500", border: "border-cyan-500/30" },
    emerald: { text: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500/30" },
    amber: { text: "text-amber-500 dark:text-amber-400", bg: "bg-amber-500", border: "border-amber-500/30" },
    purple: { text: "text-purple-500 dark:text-purple-400", bg: "bg-purple-500", border: "border-purple-500/30" },
  };

  const style = colorMap[color] || colorMap.indigo;

  return (
    <div className={`glass-card p-4 border ${style.border} flex flex-col justify-between shadow-sm`}>
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>{label}</span>
          {trend && (
            <span className="flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 space-x-0.5 bg-emerald-500/15 px-1.5 py-0.5 rounded">
              <TrendingUp className="h-3 w-3" />
              <span>{trend}</span>
            </span>
          )}
        </div>

        <div className="flex items-baseline space-x-1 mt-2">
          <span className={`text-3xl font-black tracking-tight ${style.text}`}>{value}</span>
          {unit && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{unit}</span>}
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-brand-border/60 flex items-center justify-between">
        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{context || "Model-derived signal"}</span>

        {/* Mini Sparkline Bar Chart SVG */}
        <div className="flex items-end space-x-1 h-4">
          {sparklineData.map((val, idx) => (
            <div
              key={idx}
              className={`w-1 rounded-t opacity-90 ${style.bg}`}
              style={{ height: `${(val / 100) * 16}px` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
