"use client";

import { useState } from "react";
import { Bot, Send, BookOpen, Sparkles, Terminal } from "lucide-react";
import { fetchApi } from "../lib/api";
import VoiceTutorControl from "./ui/VoiceTutorControl";
import { useDomain } from "../lib/DomainContext";

const TUTOR_GREETINGS: Record<string, string> = {
  Socratic:
    "Hello Alex! I am your Socratic AI Tutor. I will guide you through questions to build intuition.\n\nQuick diagnostic question: What is the exact difference between blocking ('=') and nonblocking ('<=') assignments during the simulation time-step regions?",
  Practice:
    "Practice Lab Mode:\n\nHere is your first problem: Construct a SystemVerilog clocking block declaration `cb_bus` for an AXI interface sampled on `posedge clk`.",
  Explanation:
    "Conceptual Explanation Mode:\n\nSystemVerilog interfaces bundle directional signals and clocking blocks into reusable verification ports, preventing netlist wiring errors.",
  Interview:
    "Interview Simulation Mode:\n\nExplain how UVM virtual sequencers coordinate transactions across multiple independent interface agents without static compilation errors.",
  Debugging:
    "Interactive Debugging Mode:\n\nA testbench shows a race condition where data sampled by the monitor reads stale values. How would you diagnose the clocking block region setup?"
};

export default function SocraticTutorChat() {
  const { activeDomain } = useDomain();

  const [tutorMode, setTutorMode] = useState<"Socratic" | "Practice" | "Explanation" | "Interview" | "Debugging">("Socratic");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: TUTOR_GREETINGS["Socratic"],
      sources: [`${activeDomain.name} Technical Guide`, "IEEE 1800 Standard LRM"]
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVoiceInput = (text: string) => {
    setInput(text);
  };

  const handleTutorModeChange = (mode: typeof tutorMode) => {
    setTutorMode(mode);
    setMessages([
      {
        role: "assistant",
        content: TUTOR_GREETINGS[mode] || TUTOR_GREETINGS["Socratic"],
        sources: [`${activeDomain.name} Technical Guide`, "IEEE 1800 LRM"]
      }
    ]);
  };

  const lastAssistantMsg = messages.filter((m) => m.role === "assistant").slice(-1)[0]?.content;

  const sendMessage = async (customMsg?: string) => {
    const userMsg = (customMsg !== undefined ? customMsg : input).trim();
    if (!userMsg) return;
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
          content: res.reply || "Nonblocking assignments (`<=`) evaluate expressions in the Active region and schedule variable updates in the NBA region of the current time step.",
          sources: res.sources_cited || ["IEEE 1800 LRM Section 4.5"]
        }
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Nonblocking assignments (`<=`) schedule variable updates into the NBA region of the current time step slot, preventing race conditions in synchronous sequential logic.",
          sources: ["IEEE 1800 SystemVerilog LRM"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="space-y-2.5 pb-3 border-b border-brand-border">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-800 dark:text-teal-400 font-bold shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif-title font-bold text-base text-brand-textMain leading-tight truncate">
                Socratic AI Tutor Engine
              </h3>
              <span className="text-[10px] font-mono text-brand-textDim block truncate">
                RAG Grounded in Engineering Specs
              </span>
            </div>
          </div>

          <VoiceTutorControl onSpeechInput={handleVoiceInput} lastAiResponse={lastAssistantMsg} />
        </div>

        {/* Full-width Wrapped Mode Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-brand-elevated border border-brand-border p-1 rounded-lg text-[10px] font-mono font-semibold w-full">
          {(["Socratic", "Practice", "Explanation", "Interview", "Debugging"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => handleTutorModeChange(m)}
              className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                tutorMode === m
                  ? "bg-[#D99A2B] text-[#17221F] font-bold shadow-xs"
                  : "text-brand-textDim hover:text-brand-textMain hover:bg-brand-surface"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs min-h-[240px]">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] rounded-xl p-4 leading-relaxed ${
              m.role === "user" 
                ? "bg-[#D99A2B]/20 border border-[#D99A2B]/50 text-brand-textMain font-medium shadow-xs" 
                : "bg-brand-surface border border-brand-border text-brand-textMain"
            }`}>
              <p className="whitespace-pre-line text-xs font-sans">{m.content}</p>
              
              {m.sources && m.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-brand-border/60 text-[10px] text-brand-textDim font-mono">
                  <span className="font-bold text-brand-textMain block mb-1">Cited Grounding Sources:</span>
                  {m.sources.map((s, sIdx) => (
                    <div key={sIdx} className="flex items-center space-x-1 text-teal-800 dark:text-teal-400">
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
          <div className="flex items-center space-x-2 text-xs font-mono text-teal-800 dark:text-teal-400">
            <Sparkles className="h-4 w-4 animate-spin" />
            <span>RAG Querying Vector DB & Generating Diagnostic Response...</span>
          </div>
        )}
      </div>

      {/* Working Prompt Suggestions */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {[
          "Explain nonblocking vs blocking",
          "Show SystemVerilog interface code",
          "Give me an interview question",
          "What is an NBA region race condition?"
        ].map((sug, i) => (
          <button
            key={i}
            type="button"
            onClick={() => sendMessage(sug)}
            className="p-2 rounded bg-brand-elevated hover:bg-brand-surface border border-brand-border text-[11px] font-mono text-brand-textMain text-left truncate cursor-pointer hover:border-[#D99A2B]/50 transition-all shadow-xs"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Form Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center space-x-2 pt-2 border-t border-brand-border"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask AI Tutor in ${tutorMode} mode...`}
          className="flex-1 w-full min-w-0 bg-brand-surface border border-brand-border rounded-lg px-4 py-2 text-xs text-brand-textMain placeholder:text-brand-textDim outline-none focus:border-[#D99A2B]"
        />
        <button
          type="submit"
          className="btn-primary text-xs flex items-center space-x-1.5 cursor-pointer shrink-0 px-4 py-2"
        >
          <span>Send</span>
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
