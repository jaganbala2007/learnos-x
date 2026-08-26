"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Cpu, Activity, GitMerge, Compass, Bot, Award, FileText, 
  BarChart3, Layers, BookOpen, Brain, Shield, ChevronLeft, ChevronRight,
  Search, Bell, Sparkles, Terminal, X, User
} from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

interface AppShellProps {
  children: React.ReactNode;
  careerReadiness?: number;
}

export default function AppShell({ children, careerReadiness = 57 }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const pathname = usePathname();

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

  interface NavItem {
    label: string;
    href: string;
    icon: any;
    badge?: string;
  }

  interface NavSection {
    title: string;
    items: NavItem[];
  }

  const navSections: NavSection[] = [
    {
      title: "MAIN",
      items: [
        { label: "Overview", href: "/", icon: Activity },
        { label: "Skill Graph", href: "/skill-graph", icon: GitMerge },
        { label: "AI Tutor", href: "/tutor", icon: Bot },
      ],
    },
    {
      title: "CAREER INTELLIGENCE",
      items: [
        { label: "Career Simulator", href: "/simulator", icon: Compass },
        { label: "Market Intelligence", href: "/market", icon: BarChart3 },
      ],
    },
    {
      title: "PROOF",
      items: [
        { label: "Skill Passport", href: "/passport", icon: Award },
        { label: "Portfolio", href: "/portfolio", icon: FileText },
        { label: "AI Interview", href: "/interview", icon: Terminal },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { label: "5-Min WOW Demo", href: "/demo", icon: Sparkles, badge: "Presentation" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-textMain">
      {/* LEFT SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-brand-surface/90 backdrop-blur-xl border-r border-brand-border transition-all duration-300 flex flex-col justify-between ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div>
          {/* Header Brand */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-brand-border">
            <Link href="/" className="flex items-center space-x-3 overflow-hidden">
              <div className="h-9 w-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
                <Cpu className="h-5 w-5" />
              </div>
              {!collapsed && (
                <div>
                  <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                    LEARNOS X
                  </span>
                  <span className="block text-[10px] text-brand-textDim font-medium">Autonomous Career OS</span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-brand-textDim hover:text-brand-textMain p-1 rounded-md hover:bg-brand-elevated transition-colors"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navSections.map((sec, idx) => (
              <div key={idx}>
                {!collapsed && (
                  <span className="px-3 text-[10px] font-bold text-brand-textDim tracking-wider block mb-2">
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
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          active
                            ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold"
                            : "text-brand-textMuted hover:bg-brand-elevated hover:text-brand-textMain"
                        }`}
                        title={collapsed ? item.label : undefined}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-4 w-4 ${active ? "text-indigo-400" : "text-brand-textDim"}`} />
                          {!collapsed && <span>{item.label}</span>}
                        </div>
                        {!collapsed && item.badge && (
                          <span className="badge-primary px-1.5 py-0.5 text-[9px]">{item.badge}</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Profile Footer */}
        <div className="p-3 border-t border-brand-border bg-brand-surface/40">
          <div className="flex items-center space-x-3 px-2 py-1.5">
            <div className="h-8 w-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-xs">
              AV
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-slate-200 block truncate">Alex Vance</span>
                <span className="text-[10px] text-cyan-400 font-medium block truncate">RTL Verification Eng</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTAINER */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"}`}>
        {/* GLOBAL TOPBAR */}
        <header className="h-16 sticky top-0 z-30 bg-brand-bg/85 backdrop-blur-md border-b border-brand-border px-6 flex items-center justify-between">
          {/* Breadcrumb / Page Title */}
          <div className="flex items-center space-x-2 text-xs text-brand-textDim">
            <span>LEARNOS X</span>
            <span>/</span>
            <span className="font-semibold text-brand-textMain capitalize">
              {pathname === "/" ? "Dashboard" : pathname.replace("/", "").replace("-", " ")}
            </span>
          </div>

          {/* Center Search / Command Trigger */}
          <button
            onClick={() => setCommandOpen(true)}
            className="hidden md:flex items-center space-x-3 bg-brand-elevated/60 border border-brand-border px-4 py-1.5 rounded-lg text-xs text-brand-textDim hover:border-indigo-500/40 transition-all w-64 justify-between"
          >
            <div className="flex items-center space-x-2">
              <Search className="h-3.5 w-3.5 text-brand-textDim" />
              <span>Search or type command...</span>
            </div>
            <kbd className="bg-brand-surface px-1.5 py-0.5 rounded text-[10px] border border-brand-border text-brand-textMuted font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Right AI Status & Profile */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />

            <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px]">AI Engine Online</span>
            </div>

            <div className="h-4 w-[1px] bg-brand-border"></div>

            <div className="flex items-center space-x-1.5 text-xs text-brand-textMuted">
              <span>Readiness:</span>
              <span className="font-bold text-cyan-400">{careerReadiness}%</span>
            </div>
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT CANVAS */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
          {children}
        </main>
      </div>

      {/* COMMAND PALETTE MODAL (CMD+K) */}
      {commandOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 p-4">
          <div className="glass-panel max-w-lg w-full overflow-hidden border-indigo-500/30 shadow-2xl">
            <div className="p-4 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-brand-textMuted w-full">
                <Search className="h-4 w-4 text-indigo-400" />
                <input
                  type="text"
                  placeholder="Jump to page or run action..."
                  className="bg-transparent border-none outline-none text-brand-textMain w-full text-xs"
                  autoFocus
                />
              </div>
              <button onClick={() => setCommandOpen(false)} className="text-brand-textDim hover:text-brand-textMain">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-2 space-y-1 max-h-72 overflow-y-auto text-xs">
              <Link
                href="/"
                onClick={() => setCommandOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded.lg hover:bg-brand-elevated text-slate-200"
              >
                <Activity className="h-4 w-4 text-indigo-400" />
                <span>Go to Dashboard / Command Center</span>
              </Link>
              <Link
                href="/skill-graph"
                onClick={() => setCommandOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-brand-elevated text-slate-200"
              >
                <GitMerge className="h-4 w-4 text-purple-400" />
                <span>Universal Skill Graph</span>
              </Link>
              <Link
                href="/simulator"
                onClick={() => setCommandOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-brand-elevated text-slate-200"
              >
                <Compass className="h-4 w-4 text-blue-400" />
                <span>Future Path Simulator</span>
              </Link>
              <Link
                href="/tutor"
                onClick={() => setCommandOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-brand-elevated text-slate-200"
              >
                <Bot className="h-4 w-4 text-emerald-400" />
                <span>Socratic AI Tutor</span>
              </Link>
              <Link
                href="/demo"
                onClick={() => setCommandOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-brand-elevated text-slate-200"
              >
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Run 5-Minute WOW Presentation Demo</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
