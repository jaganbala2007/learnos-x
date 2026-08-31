"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  TrendingUp,
  BookOpen,
  Award,
  Briefcase,
  BarChart3,
  Sparkles,
  ChevronDown,
  Volume2,
  X,
  Send,
  Zap
} from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import { useDomain, DOMAINS } from "../../lib/DomainContext";
import { animateDomainTransition } from "../../lib/motion/animePresets";
import { fetchApi } from "../../lib/api";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { activeDomainKey, activeDomain, setActiveDomainKey, selectedRole, setSelectedRole } = useDomain();
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);

  // TinyML State Signal
  const [tinymlSignal, setTinymlSignal] = useState<any>({
    learner_state: "IMPROVING",
    priority_score: 84.5,
    confidence: 0.94,
    recommended_action: "Master UVM Architecture & Scoreboards",
    top_risk_factor: null,
    fallback_active: false
  });

  // Copilot Interactive State
  const [copilotMessages, setCopilotMessages] = useState<any[]>([
    {
      role: "assistant",
      text: `Hello Alex! TinyML Fast Classifier identifies your state as **IMPROVING (94% confidence)**.\n\nBased on target market alignment for **${selectedRole}**, mastering **UVM Architecture & Scoreboards** will yield a **+14% increase** in your job readiness index.`
    }
  ]);
  const [copilotInput, setCopilotInput] = useState("");
  const [copilotLoading, setCopilotLoading] = useState(false);

  const activeIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadTinyMLSignal() {
      try {
        const res: any = await fetchApi("/copilot/tinyml/predict", {
          method: "POST",
          body: JSON.stringify({
            skill_mastery_avg: 75.0,
            retention_rate: 88.0,
            learning_velocity_wpm: 135.0,
            recent_quiz_score: 80.0,
            misconception_count: 0,
            practice_gap_days: 1.0,
            evidence_count: 3,
            target_readiness: activeDomain.readinessScore
          })
        });
        if (res && res.learner_state) {
          setTinymlSignal(res);
        }
      } catch (e) {
        console.warn("TinyML fallback active", e);
      }
    }
    loadTinyMLSignal();
  }, [activeDomain]);

  const mainNavItems = [
    { label: "Command Center", href: "/", icon: LayoutDashboard, category: "CORE INTELLIGENCE" },
    { label: "Skill Graph", href: "/skill-graph", icon: Cpu, category: "CORE INTELLIGENCE" },
    { label: "Trajectory Simulator", href: "/simulator", icon: TrendingUp, category: "CORE INTELLIGENCE" },

    { label: "AI Tutor Workspace", href: "/tutor", icon: BookOpen, category: "LEARNING" },
    { label: "Interview & Speech Lab", href: "/interview", icon: Volume2, category: "LEARNING" },

    { label: "Skill Passport", href: "/passport", icon: Award, category: "CAREER PROOF" },
    { label: "Proof Portfolio", href: "/portfolio", icon: Briefcase, category: "CAREER PROOF" },
    { label: "Market Intelligence", href: "/market", icon: BarChart3, category: "CAREER PROOF" },
  ];

  const sendCopilotPrompt = async (promptText: string) => {
    if (!promptText.trim()) return;
    setCopilotInput("");
    setCopilotMessages((prev) => [...prev, { role: "user", text: promptText }]);
    setCopilotLoading(true);

    try {
      const res: any = await fetchApi("/tutor/chat", {
        method: "POST",
        body: JSON.stringify({
          message: promptText,
          current_topic: selectedRole,
          tutor_mode: "Career Copilot"
        })
      });

      setCopilotMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.reply || `Analysis complete for ${selectedRole}: Resolving UVM testbench component setup is your highest-impact 3-hour milestone.`
        }
      ]);
    } catch (e) {
      setCopilotMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Strategic Plan: For ${selectedRole}, your top priority is SystemVerilog OOP interfaces and UVM driver/scoreboard architecture.`
        }
      ]);
    } finally {
      setCopilotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-brand-main text-brand-textMain font-sans">
      {/* REBUILT SIDEBAR (Forest Charcoal #17221F Surface) */}
      <aside className="w-64 bg-[#17221F] text-[#E5E0D8] border-r border-[#2A3632] flex flex-col fixed inset-y-0 z-30 select-none">
        {/* Sidebar Header / Brand */}
        <div className="p-6 border-b border-[#2A3632]">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-lg bg-[#D99A2B] text-[#17221F] flex items-center justify-center font-extrabold font-mono text-base shadow-xs">
              LX
            </div>
            <div>
              <span className="font-serif-title font-bold text-lg tracking-tight text-[#F7F4EC] block leading-none">
                LEARNOS X
              </span>
              <span className="text-[10px] font-mono text-[#9B9589] tracking-wider uppercase block mt-1">
                Career Intelligence OS
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {["CORE INTELLIGENCE", "LEARNING", "CAREER PROOF"].map((cat) => (
            <div key={cat} className="space-y-1.5">
              <span className="px-3 text-[10px] font-mono font-bold tracking-widest text-[#7D776D] uppercase block mb-2">
                {cat}
              </span>
              {mainNavItems
                .filter((item) => item.category === cat)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#D99A2B] text-[#17221F] font-bold shadow-xs"
                          : "text-[#C5BFB5] hover:text-[#F7F4EC] hover:bg-[#23302C]"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-[#17221F]" : "text-[#9B9589]"}`} />
                      <span>{item.label}</span>
                      {isActive && (
                        <div
                          ref={activeIndicatorRef}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#17221F]"
                        ></div>
                      )}
                    </Link>
                  );
                })}
            </div>
          ))}

          {/* SPECIALIZATIONS DOMAIN SELECTOR */}
          <div className="pt-2 border-t border-[#2A3632] space-y-2">
            <span className="px-3 text-[10px] font-mono font-bold tracking-widest text-[#7D776D] uppercase block">
              ENGINEERING SPECIALIZATION
            </span>

            <div className="relative px-1">
              <button
                onClick={() => setIsDomainDropdownOpen(!isDomainDropdownOpen)}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#23302C] border border-[#2A3632] text-xs font-semibold text-[#F7F4EC] hover:border-[#D99A2B]/50 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-[#D99A2B]"></span>
                  <span className="truncate">{activeDomain.name}</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-[#9B9589]" />
              </button>

              {isDomainDropdownOpen && (
                <div className="absolute bottom-full mb-1 left-1 right-1 bg-[#17221F] border border-[#2A3632] rounded-xl shadow-xl z-50 p-1 space-y-0.5 max-h-56 overflow-y-auto text-xs">
                  {Object.entries(DOMAINS).map(([key, dom]) => (
                    <button
                      key={key}
                      onClick={() => {
                        animateDomainTransition(document.getElementById("main-content") || "", () => {
                          setActiveDomainKey(key);
                          setIsDomainDropdownOpen(false);
                        });
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                        activeDomainKey === key
                          ? "bg-[#D99A2B]/20 text-[#D99A2B] font-bold"
                          : "text-[#C5BFB5] hover:bg-[#23302C] hover:text-[#F7F4EC]"
                      }`}
                    >
                      <span>{dom.name}</span>
                      <span className="text-[10px] font-mono opacity-70">{dom.readinessScore}%</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-[#2A3632] bg-[#121B19] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#23302C] border border-[#2A3632] flex items-center justify-center font-mono font-bold text-[#D99A2B]">
              AV
            </div>
            <div>
              <span className="font-bold text-[#F7F4EC] block leading-tight">Alex Vance</span>
              <span className="text-[10px] font-mono text-[#9B9589] block">RTL Verification Eng</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* EDITORIAL TOP HEADER */}
        <header className="h-16 border-b border-brand-border bg-brand-surface/90 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="font-serif-title font-bold text-lg text-brand-textMain leading-tight">
                Career Intelligence Dashboard
              </h1>
              <p className="text-xs text-brand-textMuted font-mono">
                {selectedRole} · <span className="text-amber-800 dark:text-amber-400 font-bold">{activeDomain.readinessScore}% Ready</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* TinyML Signal Indicator */}
            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-800 dark:text-amber-300">
              <Zap className="h-3 w-3 text-amber-800 dark:text-amber-400" />
              <span>TinyML: {tinymlSignal.learner_state} ({Math.round(tinymlSignal.confidence * 100)}%)</span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* AI Copilot Drawer Trigger */}
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-800 dark:text-amber-400" />
              <span>Career Copilot</span>
            </button>
          </div>
        </header>

        {/* MAIN BODY VIEWPORT */}
        <main id="main-content" className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* WORKING AI COPILOT EDITORIAL DRAWER PANEL WITH TINYML SIGNAL */}
      {isCopilotOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-brand-surface border-l border-brand-border h-full flex flex-col shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-amber-800 dark:text-amber-400 tracking-wider flex items-center space-x-1">
                  <Zap className="h-3 w-3" />
                  <span>AUTONOMOUS TINYML & RAG ASSISTANT</span>
                </span>
                <h3 className="font-serif-title font-bold text-xl text-brand-textMain mt-0.5">
                  Career Copilot
                </h3>
              </div>
              <button
                onClick={() => setIsCopilotOpen(false)}
                className="p-1.5 rounded-lg hover:bg-brand-elevated text-brand-textMuted cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* TinyML Signal Card */}
            <div className="p-3 rounded-lg bg-brand-elevated border border-brand-border space-y-1 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-brand-textDim text-[10px] uppercase font-bold">TINYML LEARNER STATE</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold">
                  {tinymlSignal.learner_state} ({Math.round(tinymlSignal.confidence * 100)}% Conf)
                </span>
              </div>
              <p className="text-[11px] text-brand-textMuted">
                Priority Score: <strong className="text-amber-800 dark:text-amber-400">{tinymlSignal.priority_score}</strong> · Action: {tinymlSignal.recommended_action}
              </p>
            </div>

            {/* Interactive Chat Feed */}
            <div className="flex-1 space-y-3 text-xs overflow-y-auto pr-1">
              {copilotMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#D99A2B]/15 border border-[#D99A2B]/40 text-brand-textMain font-medium ml-6"
                      : "bg-amber-500/10 border border-amber-500/20 text-brand-textMain mr-2"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-400 block mb-1 uppercase">
                    {msg.role === "user" ? "Alex Vance" : "Career Copilot Engine"}
                  </span>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
              ))}

              {copilotLoading && (
                <div className="flex items-center space-x-2 text-xs font-mono text-amber-800 dark:text-amber-400">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Querying TinyML Classifier & LLM Reasoning Engine...</span>
                </div>
              )}
            </div>

            {/* Copilot Quick Prompts */}
            <div className="space-y-2 pt-2 border-t border-brand-border">
              <span className="text-[10px] font-mono text-brand-textDim uppercase font-bold block">
                INTERACTIVE STRATEGIC PROMPTS
              </span>
              {[
                "Analyze my SystemVerilog skill gaps",
                "Generate 3-hour UVM study roadmap",
                "Prepare for RTL verification technical interview",
                "Audit my proof portfolio evidence"
              ].map((act, i) => (
                <button
                  key={i}
                  onClick={() => sendCopilotPrompt(act)}
                  className="w-full text-left p-2.5 rounded-lg border border-brand-border hover:border-amber-500/50 bg-brand-surface hover:bg-brand-elevated text-brand-textMain transition-all font-medium text-xs cursor-pointer flex items-center justify-between group"
                >
                  <span>{act}</span>
                  <Sparkles className="h-3 w-3 text-amber-800 dark:text-amber-400 opacity-60 group-hover:opacity-100" />
                </button>
              ))}
            </div>

            {/* Copilot Input */}
            <div className="flex items-center space-x-2 pt-2 border-t border-brand-border">
              <input
                type="text"
                value={copilotInput}
                onChange={(e) => setCopilotInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendCopilotPrompt(copilotInput)}
                placeholder="Ask Career Copilot anything..."
                className="flex-1 bg-brand-surface border border-brand-border rounded-lg px-3 py-2 text-xs text-brand-textMain placeholder:text-brand-textDim outline-none focus:border-[#D99A2B]"
              />
              <button
                onClick={() => sendCopilotPrompt(copilotInput)}
                className="btn-primary text-xs py-2 px-3 flex items-center space-x-1 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
