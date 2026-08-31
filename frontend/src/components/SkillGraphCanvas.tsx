"use client";

import { useState } from "react";
import { GitMerge, Info, CheckCircle2, AlertCircle, Circle, ZoomIn, ZoomOut, RefreshCw, Filter } from "lucide-react";
import SkillNodeDrawer from "./ui/SkillNodeDrawer";
import { useDomain } from "../lib/DomainContext";

export default function SkillGraphCanvas({ graphData }: { graphData?: any }) {
  const { activeDomain } = useDomain();

  const data = graphData || {
    nodes: [
      { id: "digital_logic", label: "Digital Logic & FSM", category: "Fundamentals", mastery: 91, status: "Mastered", x: 70, y: 140 },
      { id: "verilog_syntax", label: "Verilog RTL", category: "RTL Design", mastery: 78, status: "Mastered", x: 230, y: 140 },
      { id: "sysverilog_syntax", label: "SystemVerilog OOP", category: "Verification", mastery: 64, status: "Developing", x: 390, y: 140 },
      { id: "sysverilog_interfaces", label: "SV Interfaces & Modports", category: "Verification", mastery: 58, status: "Developing", x: 550, y: 90 },
      { id: "uvm_basics", label: "UVM Architecture", category: "UVM", mastery: 47, status: "Weak", x: 710, y: 140 },
      { id: "sta_timing", label: "Static Timing Analysis", category: "Silicon Flow", mastery: 41, status: "Weak", x: 870, y: 180 }
    ],
    edges: [
      { source: "digital_logic", target: "verilog_syntax" },
      { source: "verilog_syntax", target: "sysverilog_syntax" },
      { source: "sysverilog_syntax", target: "sysverilog_interfaces" },
      { source: "sysverilog_interfaces", target: "uvm_basics" },
      { source: "verilog_syntax", target: "sta_timing" }
    ]
  };

  const [selectedNode, setSelectedNode] = useState<any>(data.nodes[3]); // Default SystemVerilog Interfaces
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Mastered": return "#10b981"; // Emerald
      case "Developing": return "#06b6d4"; // Cyan
      case "Weak": return "#f59e0b"; // Amber
      default: return "#f43f5e"; // Rose
    }
  };

  const filteredNodes = data.nodes.filter((node: any) => {
    if (statusFilter === "All") return true;
    return node.status === statusFilter;
  });

  return (
    <div className="glass-panel p-6 border-brand-border space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-glow-primary">
            <GitMerge className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Topological Competency Canvas</h3>
            <span className="text-xs text-brand-textDim">Domain: {activeDomain.name}</span>
          </div>
        </div>

        {/* Graph Controls & Filters */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-brand-surface border border-brand-border p-1 rounded-xl">
            {["All", "Mastered", "Developing", "Weak"].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all ${
                  statusFilter === f
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "text-brand-textDim hover:text-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full h-[300px] bg-brand-surface/90 rounded-2xl border border-brand-border overflow-hidden flex items-center justify-center shadow-inner">
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
                x1={src.x}
                y1={src.y}
                x2={tgt.x}
                y2={tgt.y}
                stroke="#334155"
                strokeWidth="2"
                markerEnd="url(#arrow)"
                className="transition-all duration-300"
              />
            );
          })}

          {/* Render Nodes */}
          {filteredNodes.map((node: any) => {
            const color = getStatusColor(node.status);
            const isSelected = selectedNode?.id === node.id;

            return (
              <g
                key={node.id}
                onClick={() => {
                  setSelectedNode(node);
                  setDrawerOpen(true);
                }}
                className="cursor-pointer transition-all duration-200 hover:opacity-90"
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? "22" : "18"}
                  fill="#0d121a"
                  stroke={color}
                  strokeWidth={isSelected ? "3.5" : "2"}
                  className="filter drop-shadow-lg"
                />
                <circle cx={node.x} cy={node.y} r="6" fill={color} />
                <text
                  x={node.x}
                  y={node.y + 36}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Drawer Quick Bar */}
      {selectedNode && (
        <div className="p-4 rounded-xl bg-brand-elevated/80 border border-brand-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: getStatusColor(selectedNode.status) }}
            ></div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-100 text-sm">{selectedNode.label}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold" style={{ color: getStatusColor(selectedNode.status), backgroundColor: `${getStatusColor(selectedNode.status)}20` }}>
                  {selectedNode.status} ({selectedNode.mastery}%)
                </span>
              </div>
              <p className="text-xs text-brand-textDim mt-0.5">
                Category: <strong className="text-slate-300">{selectedNode.category}</strong>
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setDrawerOpen(true)}
            className="btn-primary text-xs py-2 px-4 flex items-center space-x-1.5"
          >
            <span>Open Intelligence Drawer</span>
            <Info className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Slide-out Intelligence Drawer */}
      <SkillNodeDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        nodeData={selectedNode}
        onStartLearning={() => {
          setDrawerOpen(false);
          window.location.href = "/tutor";
        }}
      />
    </div>
  );
}
