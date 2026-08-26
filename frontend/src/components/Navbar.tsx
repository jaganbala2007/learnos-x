"use client";

import Link from "next/link";
import { Cpu, Compass, GitMerge, Bot, Award, FileText, Activity, Zap } from "lucide-react";

export default function Navbar({ careerReadiness = 42 }: { careerReadiness?: number }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 cyan-glow">
          <Cpu className="h-5 w-5" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            LEARNOS X
          </span>
          <span className="ml-2 text-xs font-medium text-slate-400 hidden sm:inline-block">
            Autonomous Career OS
          </span>
        </div>
      </div>

      <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-300">
        <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
          <Activity className="h-4 w-4 text-cyan-400" />
          <span>Dashboard</span>
        </Link>
        <Link href="/skill-graph" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
          <GitMerge className="h-4 w-4 text-purple-400" />
          <span>Skill Graph</span>
        </Link>
        <Link href="/simulator" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
          <Compass className="h-4 w-4 text-blue-400" />
          <span>Future Simulator</span>
        </Link>
        <Link href="/tutor" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
          <Bot className="h-4 w-4 text-emerald-400" />
          <span>AI Tutor</span>
        </Link>
        <Link href="/passport" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
          <Award className="h-4 w-4 text-amber-400" />
          <span>Skill Passport</span>
        </Link>
        <Link href="/portfolio" className="hover:text-cyan-400 transition-colors flex items-center space-x-1.5">
          <FileText className="h-4 w-4 text-rose-400" />
          <span>Portfolio</span>
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400">Career Readiness:</span>
          <span className="font-bold text-cyan-400">{careerReadiness}%</span>
        </div>

        <Link
          href="/demo"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-cyan-500/20"
        >
          <Zap className="h-4 w-4 fill-slate-950" />
          <span>5-Min WOW Demo</span>
        </Link>
      </div>
    </header>
  );
}
