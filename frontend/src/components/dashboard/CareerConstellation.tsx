"use client";

import React, { useState } from "react";
import { Target, Cpu, FileText, ShieldCheck, Terminal, Award, ChevronRight } from "lucide-react";
import { useDomain } from "../../lib/DomainContext";

export default function CareerConstellation() {
  const { activeDomain, selectedRole } = useDomain();
  const [activeStep, setActiveStep] = useState<number>(3);

  const careerSteps = [
    { title: "Digital Logic", state: "Completed", icon: Target, tag: "Foundation" },
    { title: "Verilog RTL", state: "Completed", icon: Cpu, tag: "Core Syntax" },
    { title: "RTL Design", state: "Completed", icon: FileText, tag: "Architecture" },
    { title: "SystemVerilog", state: "In Progress", icon: ShieldCheck, tag: "Current Focus" },
    { title: "UVM Framework", state: "Next Step", icon: Terminal, tag: "Target Gap" },
    { title: "Verification Lab", state: "Upcoming", icon: Award, tag: "Practical Proof" },
    { title: "Job Readiness", state: "Target Goal", icon: Award, tag: "Full Index" }
  ];

  return (
    <div className="editorial-block space-y-4">
      <div className="flex items-center justify-between border-b border-brand-border pb-3">
        <div>
          <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-400 tracking-wider uppercase">
            CAREER PIPELINE TRAJECTORY
          </span>
          <h3 className="font-serif-title font-bold text-lg text-brand-textMain mt-0.5">
            Topological Skill Progression Path
          </h3>
        </div>
        <span className="text-xs font-mono text-brand-textDim">{selectedRole}</span>
      </div>

      {/* Horizontal Sequential Career Pipeline Strip */}
      <div className="flex items-center space-x-2 overflow-x-auto py-2 pr-2">
        {careerSteps.map((step, idx) => {
          const isCompleted = idx < 3;
          const isCurrent = idx === 3;
          const isNext = idx === 4;

          return (
            <React.Fragment key={idx}>
              <div
                onClick={() => setActiveStep(idx)}
                className={`flex-1 min-w-[140px] p-3 rounded-lg border transition-all cursor-pointer space-y-1.5 ${
                  isCurrent
                    ? "bg-[#D99A2B]/10 border-[#D99A2B] text-brand-textMain shadow-sm"
                    : isCompleted
                    ? "bg-[#5F8A68]/10 border-[#5F8A68]/40 text-brand-textMain"
                    : isNext
                    ? "bg-[#C86B4A]/10 border-[#C86B4A]/40 text-brand-textMain"
                    : "bg-brand-surface border-brand-border text-brand-textMuted hover:border-brand-textDim"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold text-brand-textDim">0{idx + 1}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      isCompleted
                        ? "text-emerald-800 dark:text-emerald-400 bg-emerald-500/10"
                        : isCurrent
                        ? "text-amber-800 dark:text-amber-400 bg-amber-500/10"
                        : isNext
                        ? "text-rose-800 dark:text-rose-400 bg-rose-500/10"
                        : "text-brand-textDim bg-brand-elevated"
                    }`}
                  >
                    {step.state}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-brand-textMain truncate">{step.title}</h4>
                  <p className="text-[10px] text-brand-textDim truncate">{step.tag}</p>
                </div>
              </div>

              {idx < careerSteps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-brand-textDim flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
