"use client";

import { useEffect, useState } from "react";
import { Award, CheckCircle2, ShieldCheck } from "lucide-react";
import { fetchApi } from "../../lib/api";

export default function PassportPage() {
  const [passportData, setPassportData] = useState<any[]>([]);

  useEffect(() => {
    async function loadPassport() {
      try {
        const data: any = await fetchApi("/evidence/passport");
        setPassportData(data || []);
      } catch (e) {
        console.error(e);
      }
    }
    loadPassport();
  }, []);

  const defaultPassports = [
    {
      skill_name: "SystemVerilog Interfaces",
      mastery_percentage: 78.0,
      verified_confidence: 0.85,
      status: "Verified",
      evidence_summary: ["✓ Quiz Diagnostic: 87%", "✓ Hands-On Project: 88%", "✓ Interview Assessment: 76%"]
    },
    {
      skill_name: "Digital Logic & FSM",
      mastery_percentage: 88.0,
      verified_confidence: 0.91,
      status: "Verified",
      evidence_summary: ["✓ Quiz Diagnostic: 91%", "✓ FPGA ALU Project: 92%"]
    },
    {
      skill_name: "Verilog RTL Design",
      mastery_percentage: 68.0,
      verified_confidence: 0.72,
      status: "Developing",
      evidence_summary: ["✓ Quiz Diagnostic: 75%", "✓ Practice Labs: 68%"]
    }
  ];

  const list = passportData.length > 0 ? passportData : defaultPassports;

  return (
    <div className="space-y-6">
      <div>
        <span className="badge badge-amber">Evidence Engine</span>
        <h1 className="text-2xl font-extrabold text-slate-100 mt-1">Verified Digital Skill Passport</h1>
        <p className="text-xs text-slate-400 mt-1">
          Multi-evidence verified skill confidence derived from quizzes, coding projects, practical tasks, and interview simulations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.map((item: any, idx: number) => (
          <div key={idx} className="glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-base">{item.skill_name}</h3>
              </div>
              <span className={`badge ${item.status === 'Verified' ? 'badge-green' : 'badge-amber'}`}>
                {item.status}
              </span>
            </div>

            <div className="glass-card p-4">
              <div className="text-xs text-slate-400">Verified Skill Confidence</div>
              <div className="text-3xl font-extrabold text-cyan-400 mt-1">{item.mastery_percentage}%</div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${item.mastery_percentage}%` }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Verified Evidence Chains:</span>
              {item.evidence_summary?.map((ev: string, eIdx: number) => (
                <div key={eIdx} className="text-xs text-slate-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
