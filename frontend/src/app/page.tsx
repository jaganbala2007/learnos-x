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
import { Sparkles, ArrowRight, Target, CheckCircle2, AlertCircle, Play, Cpu, Zap, Activity, Volume2 } from "lucide-react";
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
      {/* HERO COMMAND CENTER HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-brand-surface via-brand-surface to-indigo-950/40 border border-brand-border shadow-panel relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider flex items-center space-x-1">
              <Activity className="h-3 w-3 text-cyan-400 animate-pulse" />
              <span>LEARNOS X Autonomous Career OS</span>
            </span>
            <span className="text-xs font-mono text-brand-textDim">| {activeDomain.name}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight font-display">
            Good evening, Alex
          </h1>
          <p className="text-xs text-brand-textMuted max-w-xl">
            Targeting <strong className="text-cyan-300 font-semibold">{selectedRole}</strong>. You are 3 topological skill modules away from full job readiness.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <a
            href="/interview"
            className="px-3.5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 font-mono font-semibold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <Volume2 className="h-4 w-4 text-rose-400" />
            <span>English Fluency Lab</span>
          </a>

          <button
            onClick={triggerDiagnosticFailure}
            className="px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 font-mono font-semibold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <AlertCircle className="h-4 w-4" />
            <span>Diagnostic Misconception Test</span>
          </button>

          <a
            href="/tutor"
            className="btn-primary text-xs flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:brightness-110 shadow-glow-cyan"
          >
            <span>Launch Mission</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* LAYERED 3-RING READINESS GAUGE */}
      <CareerReadinessRing />

      {/* SPATIAL CAREER CONSTELLATION PIPELINE */}
      <CareerConstellation />

      {/* HIGHEST-IMPACT ACTION RECOMMENDATION */}
      <NextBestActionCard />

      {/* ADAPTIVE ROADMAP TIMELINE */}
      <AdaptiveRoadmapTimeline />

      {/* DIGITAL TWIN & JD MAPPER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DigitalTwinCard />
        <JobDescriptionMapper />
      </div>

      {/* SKILL GRAPH CANVAS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <span>Universal Topological Skill Graph</span>
            </h3>
            <p className="text-xs text-brand-textDim">
              Real-time Directed Acyclic Graph (DAG) visualizing dependencies, verified status, and prerequisite chains.
            </p>
          </div>
          <a
            href="/skill-graph"
            className="text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>Full Canvas Mode</span>
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
