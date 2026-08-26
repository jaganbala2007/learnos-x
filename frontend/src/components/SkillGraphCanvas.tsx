"use client";

import { useState } from "react";
import { GitMerge, Info, CheckCircle2, AlertCircle, Circle } from "lucide-react";

export default function SkillGraphCanvas({ graphData }: { graphData?: any }) {
  const data = graphData || {
    nodes: [
      { id: "digital_logic", label: "Digital Logic", category: "Fundamentals", mastery: 88, status: "Mastered", x: 60, y: 140 },
      { id: "verilog_syntax", label: "Verilog Syntax", category: "RTL Design", mastery: 52, status: "Developing", x: 220, y: 140 },
      { id: "sysverilog_syntax", label: "SystemVerilog OOP", category: "Verification", mastery: 21, status: "Weak", x: 380, y: 140 },
      { id: "sysverilog_interfaces", label: "SystemVerilog Interfaces", category: "Verification", mastery: 24, status: "Weak", x: 540, y: 100 },
      { id: "uvm_basics", label: "UVM Architecture", category: "UVM", mastery: 5, status: "Missing", x: 700, y: 140 }
    ],
    edges: [
      { source: "digital_logic", target: "verilog_syntax" },
      { source: "verilog_syntax", target: "sysverilog_syntax" },
      { source: "sysverilog_syntax", target: "sysverilog_interfaces" },
      { source: "sysverilog_interfaces", target: "uvm_basics" }
    ]
  };

  const [selectedNode, setSelectedNode] = useState<any>(data.nodes[3]); // Default SystemVerilog Interfaces

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Mastered": return "#10b981"; // Emerald
      case "Developing": return "#3b82f6"; // Blue
      case "Weak": return "#f59e0b"; // Amber
      default: return "#f43f5e"; // Rose
    }
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="badge badge-cyan">Universal Skill Graph</span>
          <h3 className="text-lg font-bold text-slate-100 mt-1">Interactive Competency & Prerequisite Map</h3>
        </div>
        <GitMerge className="h-5 w-5 text-purple-400" />
      </div>

      <div className="relative w-full h-[260px] bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
        <svg className="w-full h-full">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
            </marker>
          </defs>

          {/* Render Edge Connections */}
          {data.edges.map((edge: any, idx: number) => {
            const src = data.nodes.find((n: any) => n.id === edge.source);
            const tgt = data.nodes.find((n: any) => n.id === edge.target);
            if (!src || !tgt) return null;

            return (
              <line
                key={idx}
                x1={src.x || 60 + idx * 140}
                y1={src.y || 140}
                x2={tgt.x || 200 + idx * 140}
                y2={tgt.y || 140}
                stroke="#334155"
                strokeWidth="2"
                strokeDasharray={edge.type === "related_to" ? "4 4" : "0"}
                markerEnd="url(#arrow)"
              />
            );
          })}

          {/* Render Interactive Nodes */}
          {data.nodes.map((node: any, idx: number) => {
            const cx = node.x || 60 + idx * 140;
            const cy = node.y || 140;
            const color = getStatusColor(node.status);
            const isSelected = selectedNode?.id === node.id;

            return (
              <g
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer transition-all duration-200"
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? "22" : "18"}
                  fill="#0f172a"
                  stroke={color}
                  strokeWidth={isSelected ? "3" : "2"}
                  className="filter drop-shadow-md"
                />
                <circle cx={cx} cy={cy} r="6" fill={color} />
                <text
                  x={cx}
                  y={cy + 35}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="11"
                  fontWeight="600"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Details Panel */}
      {selectedNode && (
        <div className="mt-4 p-4 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-100 text-sm">{selectedNode.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold`} style={{ color: getStatusColor(selectedNode.status), backgroundColor: `${getStatusColor(selectedNode.status)}20` }}>
                {selectedNode.status} ({selectedNode.mastery}%)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Category: <strong className="text-slate-300">{selectedNode.category}</strong> | Prerequisite for downstream verification testbenches.
            </p>
          </div>
          <button className="text-xs text-cyan-400 font-semibold hover:underline flex items-center space-x-1">
            <span>Explore Node</span>
            <Info className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
