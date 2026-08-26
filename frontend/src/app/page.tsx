"use client";

import { useEffect, useState } from "react";
import MetricCard from "../components/ui/MetricCard";
import InsightCard from "../components/ui/InsightCard";
import TrajectoryChart from "../components/ui/TrajectoryChart";
import SkillGraphCanvas from "../components/SkillGraphCanvas";
import MisconceptionModal from "../components/MisconceptionModal";
import { fetchApi } from "../lib/api";
import { Sparkles, ArrowRight, Target, CheckCircle2, AlertCircle, Play } from "lucide-react";

export default function DashboardPage() {
  const [twin, setTwin] = useState<any>(null);
  const [gaps, setGaps] = useState<any>(null);
  const [isMisconceptionOpen, setIsMisconceptionOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState<any>(null);

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
        title: res.diagnosed_misconception,
        diagnosis: res.explanation,
        counter_example: "Nonblocking assignments (<=) update during the NBA region of the current time step, NOT immediately."
      });
      setIsMisconceptionOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {/* HERO COMMAND CENTER HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-brand-surface via-brand-surface to-indigo-950/30 border border-brand-border shadow-panel">
        <div>
          <span className="status-badge badge-primary">Career Command Center</span>
          <h1 className="text-2xl font-black text-slate-100 mt-1">
            Good morning, Alex
          </h1>
          <p className="text-xs text-brand-textMuted mt-1">
            Target: <strong className="text-cyan-400 font-semibold">RTL Verification Engineer at NVIDIA</strong> | You're <strong className="text-indigo-300">3 critical skills away</strong> from job readiness.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={triggerDiagnosticFailure}
            className="px-4 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 font-semibold text-xs flex items-center space-x-2 transition-all"
          >
            <AlertCircle className="h-4 w-4" />
            <span>Test Misconception Diagnosis</span>
          </button>

          <a
            href="/simulator"
            className="btn-primary text-xs flex items-center space-x-1.5"
          >
            <span>Continue Journey</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* ROW 1: 5 POLISHED METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          label="Career Readiness"
          value={twin?.career_readiness_score || 57}
          unit="%"
          trend="+8% this week"
          context="Target: 85%+"
          color="cyan"
          sparklineData={[35, 42, 45, 51, 57]}
        />
        <MetricCard
          label="Skill Coverage"
          value={twin?.skill_coverage_score || 51}
          unit="%"
          trend="+5%"
          context="8 of 14 competencies"
          color="indigo"
          sparklineData={[30, 38, 42, 48, 51]}
        />
        <MetricCard
          label="Learning Velocity"
          value={twin?.dna?.learning_velocity || 81}
          unit="%"
          trend="Optimal"
          context="High efficiency"
          color="emerald"
          sparklineData={[60, 72, 75, 78, 81]}
        />
        <MetricCard
          label="Retention Rate"
          value={twin?.dna?.retention_score || 74}
          unit="%"
          trend="+3%"
          context="Spaced repetition"
          color="amber"
          sparklineData={[65, 68, 70, 72, 74]}
        />
        <MetricCard
          label="Evidence Verified"
          value={twin?.verified_skills_count || 5}
          unit="Chain"
          trend="Verified"
          context="Multi-modal proof"
          color="purple"
          sparklineData={[1, 2, 3, 4, 5]}
        />
      </div>

      {/* ROW 2: NEXT BEST ACTION & AI INSIGHT */}
      <InsightCard
        what="NEXT BEST ACTION: Master SystemVerilog Interfaces"
        why="Your current verification skill coverage is 24%. SystemVerilog Interfaces is a critical prerequisite unlocking 3 downstream competencies (UVM Drivers, Assertions & Functional Coverage)."
        impact="+12% Career Readiness Gain upon lab completion"
        confidence={87}
        actionText="Start 25-Min Focused Session"
        onAction={() => (window.location.href = "/tutor")}
      />

      {/* ROW 3: TRAJECTORY SIMULATOR & SKILL GRAPH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TrajectoryChart />
        </div>

        {/* Skill Gap Vector Priority Box */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <div>
              <span className="status-badge badge-rose">Priority Matrix</span>
              <h3 className="text-base font-bold text-slate-100 mt-1">Critical Skill Gap Vector</h3>
            </div>
          </div>

          <div className="space-y-3">
            {gaps?.gaps?.slice(0, 4).map((g: any) => (
              <div key={g.skill_id} className="glass-card p-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-200 block">{g.skill_name}</span>
                  <span className="text-[10px] text-brand-textDim">Current: {g.current_mastery}% | Target: {g.target_mastery}%</span>
                </div>
                <span className={`status-badge ${g.priority === 'HIGH' ? 'badge-rose' : 'badge-amber'}`}>
                  {g.priority}
                </span>
              </div>
            )) || (
              <div className="text-xs text-brand-textMuted">Loading priority gaps...</div>
            )}
          </div>
        </div>
      </div>

      {/* ROW 4: UNIVERSAL SKILL GRAPH */}
      <SkillGraphCanvas />

      {/* Misconception Modal */}
      <MisconceptionModal
        isOpen={isMisconceptionOpen}
        onClose={() => setIsMisconceptionOpen(false)}
        details={modalDetails}
      />
    </div>
  );
}
