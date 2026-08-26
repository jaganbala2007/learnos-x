"use client";

import { useState } from "react";
import { Compass, Sparkles } from "lucide-react";

export default function TrajectoryChart() {
  const [activeTrack, setActiveTrack] = useState("balanced");

  // SVG coordinate data for 3 trajectory curves
  const weeks = [0, 2, 4, 6, 8, 10, 12, 14, 16];
  
  // Fast track points (0,42 -> 6,77)
  const fastPoints = "M 40,180 L 115,140 L 190,110 L 265,70 L 340,70 L 415,70 L 490,70 L 565,70 L 640,70";
  // Balanced track points (0,42 -> 10,87)
  const balancedPoints = "M 40,180 L 115,160 L 190,135 L 265,110 L 340,85 L 415,50 L 490,50 L 565,50 L 640,50";
  // Deep track points (0,42 -> 14,94)
  const deepPoints = "M 40,180 L 115,168 L 190,150 L 265,130 L 340,110 L 415,90 L 490,65 L 565,30 L 640,30";

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border">
        <div>
          <span className="status-badge badge-cyan">Future Intelligence</span>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-1">Career Readiness Trajectory Simulation</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Simulated progression curves across 3 optimal learning strategies</p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTrack("fast")}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded transition-all ${
              activeTrack === "fast" ? "bg-rose-500/20 text-rose-600 dark:text-rose-300 font-bold border border-rose-500/40" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-rose-500"></span>
            <span>Fast Track (6w)</span>
          </button>

          <button
            onClick={() => setActiveTrack("balanced")}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded transition-all ${
              activeTrack === "balanced" ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-bold border border-cyan-500/40" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
            <span>Balanced Track (10w)★</span>
          </button>

          <button
            onClick={() => setActiveTrack("deep")}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded transition-all ${
              activeTrack === "deep" ? "bg-purple-500/20 text-purple-600 dark:text-purple-300 font-bold border border-purple-500/40" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-purple-500"></span>
            <span>Deep Specialist (14w)</span>
          </button>
        </div>
      </div>

      {/* Trajectory Graph Container */}
      <div className="relative w-full h-56 bg-slate-900 dark:bg-slate-950 rounded-xl border border-brand-border p-4">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 680 220">
          {/* Grid lines */}
          <line x1="40" y1="30" x2="640" y2="30" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1="40" y1="80" x2="640" y2="80" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1="40" y1="130" x2="640" y2="130" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1="40" y1="180" x2="640" y2="180" stroke="rgba(255,255,255,0.15)" />

          {/* Y Axis Labels */}
          <text x="30" y="35" textAnchor="end" fill="#94a3b8" fontSize="10" fontWeight="bold">90%</text>
          <text x="30" y="85" textAnchor="end" fill="#94a3b8" fontSize="10" fontWeight="bold">75%</text>
          <text x="30" y="135" textAnchor="end" fill="#94a3b8" fontSize="10" fontWeight="bold">60%</text>
          <text x="30" y="185" textAnchor="end" fill="#94a3b8" fontSize="10" fontWeight="bold">42%</text>

          {/* X Axis Labels */}
          {weeks.map((w, idx) => (
            <text key={w} x={40 + idx * 75} y="205" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
              Wk {w}
            </text>
          ))}

          {/* Fast Track Line */}
          <path
            d={fastPoints}
            fill="none"
            stroke="#f43f5e"
            strokeWidth={activeTrack === "fast" ? "3.5" : "1.5"}
            opacity={activeTrack === "fast" ? 1 : 0.4}
            className="transition-all duration-300"
          />

          {/* Deep Specialist Line */}
          <path
            d={deepPoints}
            fill="none"
            stroke="#a855f7"
            strokeWidth={activeTrack === "deep" ? "3.5" : "1.5"}
            opacity={activeTrack === "deep" ? 1 : 0.4}
            className="transition-all duration-300"
          />

          {/* Balanced Track Line (Recommended) */}
          <path
            d={balancedPoints}
            fill="none"
            stroke="#06b6d4"
            strokeWidth={activeTrack === "balanced" ? "4" : "2"}
            opacity={activeTrack === "balanced" ? 1 : 0.5}
            className="transition-all duration-300"
          />

          {/* Highlight Target Marker */}
          <circle cx="415" cy="50" r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
          <text x="415" y="38" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">87% Target</text>
        </svg>
      </div>
    </div>
  );
}
