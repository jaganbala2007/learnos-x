"use client";

import { useEffect, useState } from "react";
import CareerReadinessRing from "../components/dashboard/CareerReadinessRing";
import CareerConstellation from "../components/dashboard/CareerConstellation";
import NextBestActionCard from "../components/dashboard/NextBestActionCard";
import AdaptiveRoadmapTimeline from "../components/dashboard/AdaptiveRoadmapTimeline";
import SkillGraphCanvas from "../components/SkillGraphCanvas";
import MisconceptionModal from "../components/MisconceptionModal";
import JobDescriptionMapper from "../components/ui/JobDescriptionMapper";
import DigitalTwinCard from "../components/DigitalTwinCard";
import { fetchApi } from "../lib/api";
import { Sparkles, ArrowRight, Target, CheckCircle2, AlertCircle, Cpu, Volume2 } from "lucide-react";
import { useDomain } from "../lib/DomainContext";

export default function DashboardPage() {
  const [twin, setTwin] = useState<any>(null);
  const [gaps, setGaps] = useState<any>(null);
  const [isMisconceptionOpen, setIsMisconceptionOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState<any>(null);

  const { activeDomain, selectedRole } = useDomain();

  useEffect(() => {
    async function loadData() {
      const t = await fetchApi<any>("/twin?user_id=1");
      const g = await fetchApi<any>("/gaps?user_id=1");
      setTwin(t);
      setGaps(g);
    }
    loadData();
  }, []);

  const triggerDiagnosticFailure = async () => {
    try {
      const res: any = await fetchApi("/assessment/answer", {
        method: "POST",
        body: JSON.stringify({
          user_id: 1,
          question_id: "q_sv_interface_01",
          selected_option_index: 0,
          response_time_seconds: 14
        })
      });

      setModalDetails({
        title: res.diagnosed_misconception || "Nonblocking Assignment Evaluation Error",
        diagnosis: res.explanation || "SystemVerilog nonblocking assignments (<=) update during the NBA region of the current time step, NOT immediately.",
        counter_example: "Nonblocking assignments (<=) schedule variable updates to evaluate in the NBA queue, avoiding race conditions in synchronous sequential logic."
      });
      setIsMisconceptionOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 telemetry-grid">
      {/* EDITORIAL HERO INTRODUCTION REPORT HEADER */}
      <div className="editorial-block border-l-4 border-l-[#D99A2B] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-400 tracking-wider uppercase">
              AUTONOMOUS CAREER INTELLIGENCE REPORT
            </span>
            <h1 className="font-serif-title text-2xl md:text-3xl font-bold text-brand-textMain">
              Career Dashboard Briefing
            </h1>
            <p className="text-xs font-mono text-brand-textMuted">
              {selectedRole} · <span className="text-amber-700 dark:text-amber-400 font-bold">{activeDomain.readinessScore}% Job Ready</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/interview"
              className="btn-secondary text-xs flex items-center space-x-1.5"
            >
              <Volume2 className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              <span>English Fluency Practice Mode</span>
            </a>

            <button
              onClick={triggerDiagnosticFailure}
              className="btn-secondary text-xs flex items-center space-x-1.5"
            >
              <AlertCircle className="h-4 w-4 text-rose-700 dark:text-rose-400" />
              <span>Diagnostic Test</span>
            </button>
          </div>
        </div>

        {/* Editorial Career Insight Summary Statement */}
        <div className="space-y-2 pt-1">
          <p className="font-serif-title italic text-base md:text-lg text-brand-textMain leading-relaxed">
            "You have a strong digital-logic foundation. Your highest-impact career unlock is advanced SystemVerilog verification and UVM testbench architecture."
          </p>
          <p className="text-xs text-brand-textMuted">
            Closing 3 remaining prerequisite skill modules will increase your verified job readiness index from 72% to 86%.
          </p>
        </div>
      </div>

      {/* CAREER READINESS RING VISUALIZATION */}
      <CareerReadinessRing />

      {/* CAREER PIPELINE TRAJECTORY */}
      <CareerConstellation />

      {/* TODAY'S HIGHEST-IMPACT ACTION */}
      <NextBestActionCard />

      {/* ADAPTIVE ROADMAP TIMELINE */}
      <AdaptiveRoadmapTimeline />

      {/* DIGITAL TWIN & JD MAPPER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DigitalTwinCard />
        <JobDescriptionMapper />
      </div>

      {/* SKILL GRAPH CANVAS */}
      <div className="editorial-block space-y-4">
        <div className="flex items-center justify-between border-b border-brand-border pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-400 tracking-wider uppercase">
              TOPOLOGICAL SKILL DAG GRAPH
            </span>
            <h3 className="font-serif-title font-bold text-lg text-brand-textMain mt-0.5">
              Interactive Skill Dependency Canvas
            </h3>
          </div>
          <a
            href="/skill-graph"
            className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 hover:underline flex items-center space-x-1"
          >
            <span>Full Screen Canvas</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <SkillGraphCanvas />
      </div>

      {/* Misconception Diagnostic Modal */}
      <MisconceptionModal
        isOpen={isMisconceptionOpen}
        onClose={() => setIsMisconceptionOpen(false)}
        details={modalDetails}
      />
    </div>
  );
}
