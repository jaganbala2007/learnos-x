"use client";

import { useState } from "react";
import { Bot, Send, BookOpen, Sparkles, Code, CheckCircle2, RefreshCw } from "lucide-react";
import { fetchApi } from "../lib/api";
import VoiceTutorControl from "./ui/VoiceTutorControl";
import { useDomain } from "../lib/DomainContext";

export default function SocraticTutorChat() {
  const { activeDomain } = useDomain();

  const [tutorMode, setTutorMode] = useState<"Socratic" | "Practice" | "Explanation" | "Interview" | "Debugging">("Socratic");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello Alex! I am your **${tutorMode} AI Tutor** for ${activeDomain.name}. We are currently mastering **${activeDomain.keySkills[3]?.name || "SystemVerilog Interfaces"}**.\n\nQuick diagnostic question: What is the exact difference between blocking (\`=\`) and nonblocking (\`<=\`) assignments during the simulation time-step regions?`,
      sources: [`${activeDomain.name} Technical Guide`, "IEEE 1800 Standard LRM"]
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVoiceInput = (text: string) => {
    setInput(text);
  };

  const lastAssistantMsg = messages.filter(m => m.role === "assistant").slice(-1)[0]?.content;

  const sendMessage = async (customMsg?: string) => {
    const userMsg = customMsg || input;
    if (!userMsg.trim()) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg, sources: [] }]);
    setLoading(true);

    try {
      const res: any = await fetchApi("/tutor/chat", {
        method: "POST",
        body: JSON.stringify({
          message: userMsg,
          current_topic: activeDomain.keySkills[3]?.name || "SystemVerilog Interfaces",
          tutor_mode: tutorMode
        })
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.reply || "Spot on! Nonblocking assignments (`<=`) evaluate expressions in the Active region and schedule variable updates in the NBA region of the current time step.",
          sources: res.sources_cited || ["IEEE 1800 LRM Section 4.5"]
        }
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Nonblocking assignments (`<=`) schedule updates into the NBA region of the current time step slot, preventing race conditions in synchronous sequential logic.",
          sources: ["IEEE 1800 SystemVerilog LRM"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col h-[580px] border-emerald-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-brand-border">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-glow-cyan">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Socratic AI Tutor & Diagnostic Engine</h3>
            <span className="text-xs text-brand-textDim">RAG Grounded in Technical Specifications</span>
          </div>
        </div>

        {/* Mode Selector & Voice */}
        <div className="flex items-center space-x-2">
          <VoiceTutorControl onSpeechInput={handleVoiceInput} lastAiResponse={lastAssistantMsg} />

          <div className="flex items-center space-x-1 bg-brand-surface border border-brand-border p-1 rounded-xl text-[10px] font-mono font-semibold">
            {(["Socratic", "Practice", "Explanation", "Interview", "Debugging"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setTutorMode(m)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  tutorMode === m
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "text-brand-textDim hover:text-slate-200"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2 text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
              m.role === "user" 
                ? "bg-indigo-600/30 border border-indigo-500/40 text-slate-100" 
                : "bg-brand-elevated/80 border border-brand-border text-slate-200"
            }`}>
              <p className="whitespace-pre-line font-sans">{m.content}</p>
              
              {m.sources && m.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-brand-border/60 text-[10px] text-brand-textDim font-mono">
                  <span className="font-bold text-slate-300 block mb-1">Cited Grounding Sources:</span>
                  {m.sources.map((s, sIdx) => (
                    <div key={sIdx} className="flex items-center space-x-1 text-cyan-300">
                      <BookOpen className="h-3 w-3 flex-shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <Sparkles className="h-4 w-4 animate-spin text-cyan-300" />
            <span>RAG Querying Vector DB & Generating Diagnostic Response...</span>
          </div>
        )}
      </div>

      {/* Prompt Suggestions */}
      <div className="flex items-center space-x-2 mb-3 overflow-x-auto pb-1">
        {[
          "Explain nonblocking vs blocking",
          "Show SystemVerilog interface code",
          "Give me an interview question",
          "What is an NBA region race condition?"
        ].map((sug, i) => (
          <button
            key={i}
            onClick={() => sendMessage(sug)}
            className="px-2.5 py-1 rounded-lg bg-brand-elevated/60 hover:bg-brand-elevated border border-brand-border text-[10px] font-mono text-cyan-300/90 whitespace-nowrap"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="flex items-center space-x-2 pt-2 border-t border-brand-border">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={`Ask AI Tutor in ${tutorMode} mode...`}
          className="flex-1 bg-brand-surface border border-brand-border rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-brand-textDim outline-none focus:border-cyan-500/50"
        />
        <button
          onClick={() => sendMessage()}
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:brightness-110 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-glow-cyan"
        >
          <span>Send</span>
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
