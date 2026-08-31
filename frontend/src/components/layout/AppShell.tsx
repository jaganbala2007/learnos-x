"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Cpu, Activity, GitMerge, Compass, Bot, Award, FileText, 
  BarChart3, Terminal, Sparkles, Search, X, ChevronLeft, ChevronRight,
  Zap, Brain, Code, Binary, ChevronDown, Send, MessageSquare, CheckCircle2,
  AlertCircle, ArrowRight, ShieldCheck, RefreshCw, User
} from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import { useDomain, DOMAINS } from "../../lib/DomainContext";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [domainDropdownOpen, setDomainDropdownOpen] = useState(false);
  
  // AI Copilot state
  const [copilotQuery, setCopilotQuery] = useState("");
  const [copilotMessages, setCopilotMessages] = useState<
    { sender: "user" | "ai"; text: string; reasoning?: string; actions?: string[] }[]
  >([
    {
      sender: "ai",
      text: "Hello Alex! I am your LEARNOS X Autonomous Career Copilot. How can I optimize your career velocity today?",
      reasoning: "Analyzed current vector DNA: RTL Verification (72% readiness). High-impact gap identified in SystemVerilog Assertions & UVM Scoreboards.",
      actions: ["Why learn UVM now?", "Simulate 3 hrs/day", "Find biggest skill gap", "Generate project prompt"]
    }
  ]);
  const [isCopilotThinking, setIsCopilotThinking] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { activeDomainKey, activeDomain, setActiveDomainKey, selectedRole, setSelectedRole } = useDomain();

  // Keyboard shortcut CMD+K / CTRL+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopilotSend = (queryText?: string) => {
    const q = queryText || copilotQuery;
    if (!q.trim()) return;

    setCopilotMessages((prev) => [...prev, { sender: "user", text: q }]);
    setCopilotQuery("");
    setIsCopilotThinking(true);

    setTimeout(() => {
      setIsCopilotThinking(false);
      if (q.toLowerCase().includes("uvm") || q.toLowerCase().includes("why")) {
        setCopilotMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "UVM (Universal Verification Methodology) is required for 84% of Tier-1 semiconductor design verification positions. Completing it now unlocks 37 target RTL roles.",
            reasoning: "Cross-referenced active market demand with your SystemVerilog OOP mastery (64%). Prerequisite chain satisfied.",
            actions: ["Start UVM Mission", "View Skill Graph Node", "Simulate Impact"]
          }
        ]);
      } else if (q.toLowerCase().includes("simulate") || q.toLowerCase().includes("3 hrs")) {
        setCopilotMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Simulating 3 hours/day (21 hrs/week): You will reach 88% Career Readiness in 6.4 weeks (October 15, 2026), saving 3.2 weeks versus your current pace.",
            reasoning: "Counterfactual Simulator Engine calculated trajectory delta based on historical learning velocity (81.0).",
            actions: ["Open Trajectory Simulator", "Apply 3h/day Schedule"]
          }
        ]);
      } else if (q.toLowerCase().includes("gap") || q.toLowerCase().includes("biggest")) {
        setCopilotMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Your single largest skill gap for 'RTL Verification Engineer' is UVM Scoreboard & Assertion Coverage (Current: 47%, Target: 85%, Gap: -38%).",
            reasoning: "Digital Twin vector state comparison against 1,420 industry job descriptions.",
            actions: ["Launch Socratic Diagnostic", "Generate Verification Project"]
          }
        ]);
      } else {
        setCopilotMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `Analyzing "${q}" against your ${activeDomain.name} career twin profile. Top recommendation: Focus on high-priority prerequisite nodes in your skill graph.`,
            reasoning: `Domain scope: ${activeDomain.name}. Active target role: ${selectedRole}.`,
            actions: ["View Adaptive Roadmap", "Launch AI Tutor"]
          }
        ]);
      }
    }, 900);
  };

  const navSections = [
    {
      title: "CORE INTELLIGENCE",
      items: [
        { label: "Command Center", href: "/", icon: Activity, badge: "Flagship" },
        { label: "Skill Graph Canvas", href: "/skill-graph", icon: GitMerge },
        { label: "Trajectory Simulator", href: "/simulator", icon: Compass },
      ],
    },
    {
      title: "LEARNING & PRACTICE",
      items: [
        { label: "Socratic AI Tutor", href: "/tutor", icon: Bot, badge: "AI" },
        { label: "AI Interview Lab", href: "/interview", icon: Terminal },
      ],
    },
    {
      title: "PROOF & PORTFOLIO",
      items: [
        { label: "Skill Passport", href: "/passport", icon: Award },
        { label: "Proof Portfolio", href: "/portfolio", icon: FileText },
        { label: "Market Intelligence", href: "/market", icon: BarChart3 },
      ],
    },
    {
      title: "SYSTEM DEMO",
      items: [
        { label: "5-Min Pitch Demo", href: "/demo", icon: Sparkles, badge: "Live" },
      ],
    },
  ];

  const domainIcons: Record<string, any> = {
    vlsi: Cpu,
    embedded: Binary,
    aiml: Brain,
    software: Code,
    fpga: Zap,
  };

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-textMain">
      {/* LEFT SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-brand-surface/95 backdrop-blur-2xl border-r border-brand-border transition-all duration-300 flex flex-col justify-between ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div>
          {/* Header Brand */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-brand-border">
            <Link href="/" className="flex items-center space-x-3 overflow-hidden">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] flex-shrink-0 shadow-glow-primary">
                <div className="h-full w-full bg-brand-surface rounded-[11px] flex items-center justify-center text-cyan-300">
                  <Cpu className="h-5 w-5" />
                </div>
              </div>
              {!collapsed && (
                <div>
                  <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">
                    LEARNOS X
                  </span>
                  <span className="block text-[9px] text-cyan-400 font-mono tracking-widest uppercase">
                    Career Intelligence OS
                  </span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-brand-textDim hover:text-brand-textMain p-1.5 rounded-lg hover:bg-brand-elevated transition-colors"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navSections.map((sec, idx) => (
              <div key={idx}>
                {!collapsed && (
                  <span className="px-3 text-[10px] font-mono font-bold text-brand-textDim tracking-wider block mb-2 uppercase">
                    {sec.title}
                  </span>
                )}
                <div className="space-y-1">
                  {sec.items.map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          active
                            ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold shadow-sm"
                            : "text-brand-textMuted hover:bg-brand-elevated/70 hover:text-brand-textMain"
                        }`}
                        title={collapsed ? item.label : undefined}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-4 w-4 ${active ? "text-cyan-400" : "text-brand-textDim"}`} />
                          {!collapsed && <span>{item.label}</span>}
                        </div>
                        {!collapsed && item.badge && (
                          <span className={`px-1.5 py-0.5 text-[9px] font-mono rounded font-bold ${
                            item.badge === "AI" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "badge-primary"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* SPECIALIZATIONS DIRECTORY */}
            {!collapsed && (
              <div className="pt-2 border-t border-brand-border/60">
                <span className="px-3 text-[10px] font-mono font-bold text-brand-textDim tracking-wider block mb-2 uppercase">
                  SPECIALIZATIONS
                </span>
                <div className="space-y-1">
                  {Object.entries(DOMAINS).map(([key, dom]) => {
                    const isSelected = activeDomainKey === key;
                    const DomIcon = domainIcons[key] || Cpu;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveDomainKey(key)}
                        className={`w-full text-left flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] transition-all ${
                          isSelected
                            ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold"
                            : "text-brand-textDim hover:text-brand-textMain hover:bg-brand-elevated/40"
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <DomIcon className={`h-3.5 w-3.5 ${isSelected ? "text-cyan-400" : "text-brand-textDim"}`} />
                          <span className="truncate">{dom.name}</span>
                        </div>
                        {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-glow-cyan"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Profile Footer */}
        <div className="p-3 border-t border-brand-border bg-brand-surface/60">
          <div className="flex items-center space-x-3 px-2 py-1.5">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1px] flex-shrink-0">
              <div className="h-full w-full bg-brand-surface rounded-full flex items-center justify-center text-cyan-300 font-extrabold text-xs">
                AV
              </div>
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-slate-100 block truncate">Alex Vance</span>
                <span className="text-[10px] text-cyan-400 font-mono block truncate">{selectedRole}</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTAINER */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"}`}>
        {/* GLOBAL TOPBAR */}
        <header className="h-16 sticky top-0 z-30 bg-brand-bg/85 backdrop-blur-md border-b border-brand-border px-6 flex items-center justify-between">
          {/* Left: Domain Switcher & Breadcrumb */}
          <div className="flex items-center space-x-4">
            {/* DOMAIN SWITCHER DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setDomainDropdownOpen(!domainDropdownOpen)}
                className="flex items-center space-x-2 bg-brand-elevated/80 border border-brand-border hover:border-cyan-500/40 px-3 py-1.5 rounded-xl text-xs text-brand-textMain font-medium transition-all shadow-sm"
              >
                <Cpu className="h-4 w-4 text-cyan-400" />
                <span className="font-bold text-slate-100">{activeDomain.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-brand-textDim" />
              </button>

              {domainDropdownOpen && (
                <div className="absolute top-11 left-0 w-64 glass-panel border-cyan-500/30 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-mono text-brand-textDim px-2 py-1 uppercase font-bold border-b border-brand-border mb-1">
                    Select Technical Domain
                  </div>
                  {Object.entries(DOMAINS).map(([key, dom]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveDomainKey(key);
                        setDomainDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        activeDomainKey === key
                          ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30"
                          : "text-brand-textMuted hover:bg-brand-elevated hover:text-white"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{dom.name}</div>
                        <div className="text-[10px] text-brand-textDim">{dom.category}</div>
                      </div>
                      {activeDomainKey === key && <CheckCircle2 className="h-4 w-4 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden lg:flex items-center space-x-2 text-xs text-brand-textDim">
              <span>Target:</span>
              <span className="font-mono text-cyan-300 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {selectedRole}
              </span>
            </div>
          </div>

          {/* Center Search / Command Trigger */}
          <button
            onClick={() => setCommandOpen(true)}
            className="hidden md:flex items-center space-x-3 bg-brand-elevated/60 border border-brand-border px-4 py-1.5 rounded-xl text-xs text-brand-textDim hover:border-indigo-500/40 transition-all w-72 justify-between"
          >
            <div className="flex items-center space-x-2">
              <Search className="h-3.5 w-3.5 text-indigo-400" />
              <span>Search skills, jobs, roadmap...</span>
            </div>
            <kbd className="bg-brand-surface px-1.5 py-0.5 rounded text-[10px] border border-brand-border text-brand-textMuted font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Right AI Status, Copilot Drawer Trigger & Theme */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />

            {/* AI COPILOT DRAWER TRIGGER */}
            <button
              onClick={() => setCopilotOpen(!copilotOpen)}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600/30 to-cyan-600/30 border border-indigo-500/40 hover:border-cyan-400 px-3 py-1.5 rounded-xl text-xs font-semibold text-cyan-300 shadow-glow-cyan transition-all"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>AI Copilot</span>
            </button>

            <div className="h-4 w-[1px] bg-brand-border"></div>

            <div className="hidden sm:flex items-center space-x-1.5 text-xs text-brand-textMuted">
              <span>Readiness:</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">{activeDomain.readinessScore}%</span>
            </div>
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT CANVAS */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
          {children}
        </main>
      </div>

      {/* AI COPILOT SLIDE-OUT DRAWER */}
      {copilotOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-brand-surface border-l border-brand-border h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
            {/* Copilot Header */}
            <div className="p-4 border-b border-brand-border flex items-center justify-between bg-brand-elevated/50">
              <div className="flex items-center space-x-2.5">
                <div className="h-8 w-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-glow-cyan">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100 flex items-center space-x-2">
                    <span>Career AI Copilot</span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">Active</span>
                  </h3>
                  <p className="text-[10px] text-brand-textDim">Autonomous Guidance & Intelligence Engine</p>
                </div>
              </div>
              <button
                onClick={() => setCopilotOpen(false)}
                className="text-brand-textDim hover:text-slate-100 p-1 rounded-lg hover:bg-brand-elevated"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Copilot Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {copilotMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-indigo-600/20 border border-indigo-500/30 text-slate-100 ml-8"
                      : "bg-brand-elevated/70 border border-brand-border text-slate-200 mr-4"
                  }`}
                >
                  <div className="font-bold mb-1 text-[11px] text-brand-textDim flex items-center justify-between">
                    <span>{msg.sender === "user" ? "You" : "LEARNOS AI"}</span>
                    <span className="font-mono text-[9px]">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>

                  {msg.reasoning && (
                    <div className="mt-2 pt-2 border-t border-brand-border/60 text-[10px] font-mono text-cyan-300/90 bg-cyan-950/30 p-2 rounded-lg border border-cyan-500/20">
                      <span className="font-bold text-cyan-400 block mb-0.5">🧠 AI Reasoning Telemetry:</span>
                      {msg.reasoning}
                    </div>
                  )}

                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, actIdx) => (
                        <button
                          key={actIdx}
                          onClick={() => handleCopilotSend(act)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 hover:text-white transition-all text-[10px] font-medium"
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isCopilotThinking && (
                <div className="flex items-center space-x-2 p-3 bg-brand-elevated/50 rounded-2xl text-cyan-400 font-mono text-[11px]">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Synthesizing vector digital twin & market signals...</span>
                </div>
              )}
            </div>

            {/* Copilot Input Footer */}
            <div className="p-4 border-t border-brand-border bg-brand-elevated/40">
              <div className="flex items-center space-x-2 bg-brand-surface border border-brand-border focus-within:border-cyan-500/50 p-2 rounded-xl">
                <input
                  type="text"
                  placeholder="Ask Copilot (e.g. 'Why learn UVM now?')..."
                  value={copilotQuery}
                  onChange={(e) => setCopilotQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCopilotSend()}
                  className="bg-transparent border-none outline-none text-xs text-slate-100 placeholder:text-brand-textDim w-full px-2"
                />
                <button
                  onClick={() => handleCopilotSend()}
                  className="h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white hover:brightness-110 transition-all flex-shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMMAND PALETTE MODAL (CMD+K) */}
      {commandOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 p-4">
          <div className="glass-panel max-w-lg w-full overflow-hidden border-cyan-500/30 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-brand-textMuted w-full">
                <Search className="h-4 w-4 text-cyan-400" />
                <input
                  type="text"
                  placeholder="Type a command or search skills, modules, projects..."
                  className="bg-transparent border-none outline-none text-slate-100 w-full text-xs placeholder:text-brand-textDim"
                  autoFocus
                />
              </div>
              <button onClick={() => setCommandOpen(false)} className="text-brand-textDim hover:text-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-2 space-y-1 max-h-80 overflow-y-auto text-xs">
              <div className="px-3 py-1 text-[10px] font-mono text-brand-textDim uppercase font-bold">Quick Navigation</div>
              
              <Link
                href="/"
                onClick={() => setCommandOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-brand-elevated text-slate-200"
              >
                <div className="flex items-center space-x-3">
                  <Activity className="h-4 w-4 text-indigo-400" />
                  <span>Flagship Command Center Dashboard</span>
                </div>
                <span className="text-[10px] font-mono text-brand-textDim">/</span>
              </Link>

              <Link
                href="/skill-graph"
                onClick={() => setCommandOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-brand-elevated text-slate-200"
              >
                <div className="flex items-center space-x-3">
                  <GitMerge className="h-4 w-4 text-purple-400" />
                  <span>Universal Skill Graph Canvas</span>
                </div>
                <span className="text-[10px] font-mono text-brand-textDim">/skill-graph</span>
              </Link>

              <Link
                href="/simulator"
                onClick={() => setCommandOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-brand-elevated text-slate-200"
              >
                <div className="flex items-center space-x-3">
                  <Compass className="h-4 w-4 text-blue-400" />
                  <span>Trajectory Simulator</span>
                </div>
                <span className="text-[10px] font-mono text-brand-textDim">/simulator</span>
              </Link>

              <Link
                href="/tutor"
                onClick={() => setCommandOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-brand-elevated text-slate-200"
              >
                <div className="flex items-center space-x-3">
                  <Bot className="h-4 w-4 text-emerald-400" />
                  <span>Socratic AI Tutor & Diagnostic Practice</span>
                </div>
                <span className="text-[10px] font-mono text-brand-textDim">/tutor</span>
              </Link>

              <Link
                href="/passport"
                onClick={() => setCommandOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-brand-elevated text-slate-200"
              >
                <div className="flex items-center space-x-3">
                  <Award className="h-4 w-4 text-amber-400" />
                  <span>Verified Skill Identity Passport</span>
                </div>
                <span className="text-[10px] font-mono text-brand-textDim">/passport</span>
              </Link>

              <Link
                href="/portfolio"
                onClick={() => setCommandOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-brand-elevated text-slate-200"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  <span>Proof of Skill Technical Portfolio</span>
                </div>
                <span className="text-[10px] font-mono text-brand-textDim">/portfolio</span>
              </Link>

              <Link
                href="/interview"
                onClick={() => setCommandOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-brand-elevated text-slate-200"
              >
                <div className="flex items-center space-x-3">
                  <Terminal className="h-4 w-4 text-rose-400" />
                  <span>AI Technical Interview Simulator</span>
                </div>
                <span className="text-[10px] font-mono text-brand-textDim">/interview</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
