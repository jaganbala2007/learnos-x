"use client";

import { useState } from "react";
import { Bot, Send, Award, CheckCircle2 } from "lucide-react";
import { fetchApi } from "../../lib/api";

export default function InterviewPage() {
  const [messages, setMessages] = useState([
    {
      role: "interviewer",
      content: "Welcome Alex! I am your Lead Hardware Verification Interviewer. Let's start: Can you explain why we use `virtual interfaces` in a UVM driver component rather than instantiating a regular interface directly inside the class?"
    }
  ]);
  const [input, setInput] = useState("");
  const [evaluation, setEvaluation] = useState<any>(null);

  const submitAnswer = async () => {
    if (!input.trim()) return;
    const ans = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "candidate", content: ans }]);

    try {
      const res: any = await fetchApi("/interview/respond", {
        method: "POST",
        body: JSON.stringify({ user_response: ans })
      });

      setEvaluation(res.evaluation);
      setMessages((prev) => [...prev, { role: "interviewer", content: res.next_question }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "interviewer",
          content: "Great answer! Next question: How do clocking blocks prevent race conditions between driver and monitor?"
        }
      ]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="badge badge-cyan">AI Interview Simulator</span>
        <h1 className="text-2xl font-extrabold text-slate-100 mt-1">Technical Interview Simulator</h1>
        <p className="text-xs text-slate-400 mt-1">
          Simulated technical & company-style interview evaluation updating Learner Digital Twin readiness.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-6 flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === "candidate" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl p-4 text-xs leading-relaxed ${
                  m.role === "candidate" ? "bg-cyan-600 text-slate-950 font-medium" : "bg-slate-900 border border-slate-800 text-slate-200"
                }`}>
                  <span className="font-bold text-[10px] uppercase block mb-1 opacity-75">
                    {m.role === "candidate" ? "Alex (Candidate)" : "Interviewer (Lead Architect)"}
                  </span>
                  <p>{m.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2 pt-4 border-t border-slate-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
              placeholder="Type your technical response..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={submitAnswer}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs flex items-center space-x-1"
            >
              <span>Submit</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-100">Live Interview Feedback</h3>
          {evaluation ? (
            <div className="space-y-3 text-xs">
              <div className="glass-card p-3">
                <span className="text-slate-400 block">Correctness Score</span>
                <strong className="text-emerald-400 text-base">{evaluation.correctness}</strong>
              </div>
              <div className="glass-card p-3">
                <span className="text-slate-400 block">Reasoning Quality</span>
                <p className="text-slate-200 mt-1">{evaluation.reasoning_clarity}</p>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 italic">Submit your first answer to receive real-time AI interview feedback.</div>
          )}
        </div>
      </div>
    </div>
  );
}
