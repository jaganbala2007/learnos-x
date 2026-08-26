"use client";

import SocraticTutorChat from "../../components/SocraticTutorChat";

export default function TutorPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="badge badge-green">RAG Knowledge Engine</span>
        <h1 className="text-2xl font-extrabold text-slate-100 mt-1">Socratic AI Tutor Workspace</h1>
        <p className="text-xs text-slate-400 mt-1">
          Adaptive Socratic guidance grounded with cited technical sources.
        </p>
      </div>

      <SocraticTutorChat />
    </div>
  );
}
