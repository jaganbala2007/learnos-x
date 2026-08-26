"use client";

import { useState } from "react";
import { Bot, Send, BookOpen, Sparkles } from "lucide-react";
import { fetchApi } from "../lib/api";
import VoiceTutorControl from "./ui/VoiceTutorControl";

export default function SocraticTutorChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello Alex! I am your **Socratic AI Tutor**. We are exploring **SystemVerilog Interfaces & Clocking Blocks**. What happens to nonblocking assignment (`<=`) updates during time steps?",
      sources: ["SystemVerilog Interfaces Lab (EDA Playground)", "IEEE 1800 SystemVerilog LRM"]
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVoiceInput = (text: string) => {
    setInput(text);
  };

  const lastAssistantMsg = messages.filter(m => m.role === "assistant").slice(-1)[0]?.content;

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg, sources: [] }]);
    setLoading(true);

    try {
      const res: any = await fetchApi("/tutor/chat", {
        method: "POST",
        body: JSON.stringify({
          message: userMsg,
          current_topic: "SystemVerilog Interfaces",
          tutor_mode: "Socratic"
        })
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.reply || "Great response! Let's build a dynamic class driver to test it.",
          sources: res.sources_cited || ["SystemVerilog LRM"]
        }
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Nonblocking assignments schedule updates into the NBA region of the current time slot, preventing race conditions.",
          sources: ["SystemVerilog LRM"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col h-[500px]">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Socratic AI Tutor</h3>
            <span className="text-xs text-slate-400">RAG Knowledge Engine & Source Cited Grounding</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <VoiceTutorControl onSpeechInput={handleVoiceInput} lastAiResponse={lastAssistantMsg} />
          <span className="badge badge-green">Socratic Mode</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-xl p-4 text-xs leading-relaxed ${
              m.role === "user" 
                ? "bg-cyan-600 text-slate-950 font-medium" 
                : "bg-slate-900 border border-slate-800 text-slate-200"
            }`}>
              <p className="whitespace-pre-line">{m.content}</p>
              
              {m.sources && m.sources.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-300 block mb-1">Cited Grounding Sources:</span>
                  {m.sources.map((s, sIdx) => (
                    <div key={sIdx} className="flex items-center space-x-1">
                      <BookOpen className="h-3 w-3 text-cyan-400 flex-shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Sparkles className="h-4 w-4 text-cyan-400 animate-spin" />
            <span>AI Reasoning & Retrieval...</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 pt-2 border-t border-slate-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask a question or explain your reasoning..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
        />
        <button
          onClick={sendMessage}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs flex items-center space-x-1.5 transition-colors"
        >
          <span>Send</span>
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
