"use client";

import { useEffect, useState } from "react";
import { FileText, ExternalLink, CheckCircle2, Award } from "lucide-react";
import { fetchApi } from "../../lib/api";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await fetchApi<any>("/evidence/portfolio");
        setPortfolio(data);
      } catch (e) {
        console.error(e);
      }
    }
    loadPortfolio();
  }, []);

  const p = portfolio || {
    title: "Autonomous RTL Verification & Systems Engineering Portfolio",
    about_text: "3rd-year ECE student with verified competency in SystemVerilog, UVM Architecture, and Verilog RTL verification.",
    demonstrated_skills: ["Digital Logic (88%)", "Verilog RTL (68%)", "SystemVerilog Interfaces (78%)", "C Memory Systems (78%)"],
    projects_showcase: [
      {
        name: "SystemVerilog Interface & Clocking Block Verification Lab",
        description: "Constructed dynamic virtual interface testbench driving transaction frames across DUT boundary.",
        skills_verified: ["sysverilog_interfaces", "verilog_rtl"],
        verification_status: "Verified 88%"
      },
      {
        name: "FPGA Verilog Finite State Machine ALU Controller",
        description: "Designed Mealy/Moore FSM driving 32-bit hardware execution unit.",
        skills_verified: ["fsm_design", "digital_logic"],
        verification_status: "Verified 91%"
      }
    ],
    verified_evidence_count: 5,
    career_readiness_score: 57.0
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="badge badge-rose">Portfolio Builder</span>
        <h1 className="text-2xl font-extrabold text-slate-100 mt-1">Proof-of-Skill Portfolio</h1>
        <p className="text-xs text-slate-400 mt-1">
          Automatically constructed portfolio showcase backed by multi-modal verified evidence.
        </p>
      </div>

      <div className="glass-panel p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-100">{p.title}</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{p.about_text}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Verified Readiness</span>
            <span className="text-3xl font-extrabold text-cyan-400">{p.career_readiness_score}%</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-200 mb-3">Demonstrated Competencies</h3>
          <div className="flex flex-wrap gap-2">
            {p.demonstrated_skills?.map((s: string, idx: number) => (
              <span key={idx} className="badge badge-cyan flex items-center space-x-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>{s}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold text-slate-200">Verified Project Artifacts</h3>
          {p.projects_showcase?.map((proj: any, idx: number) => (
            <div key={idx} className="glass-card p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-100 text-sm">{proj.name}</h4>
                <span className="badge badge-green">{proj.verification_status}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
              <div className="flex items-center space-x-2 pt-2">
                {proj.skills_verified?.map((sk: string) => (
                  <span key={sk} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
