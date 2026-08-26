"use client";

import SkillGraphCanvas from "../../components/SkillGraphCanvas";

export default function SkillGraphPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="badge badge-purple">Knowledge Graph</span>
        <h1 className="text-2xl font-extrabold text-slate-100 mt-1">Universal Skill Graph Explorer</h1>
        <p className="text-xs text-slate-400 mt-1">
          Queryable Directed Acyclic Graph (DAG) mapping prerequisite skills, downstream competencies, and evidence nodes.
        </p>
      </div>

      <SkillGraphCanvas />
    </div>
  );
}
