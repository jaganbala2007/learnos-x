"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("learnos_theme");
      if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      } else {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window !== "undefined") {
      if (isDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("learnos_theme", "light");
        setIsDark(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("learnos_theme", "dark");
        setIsDark(true);
      }
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-brand-elevated border border-brand-border text-xs font-semibold text-brand-textMuted hover:text-brand-textMain transition-all shadow-sm cursor-pointer"
      title="Toggle Light/Dark Theme"
    >
      {isDark ? (
        <>
          <Sun className="h-3.5 w-3.5 text-amber-400" />
          <span className="text-amber-300 font-mono text-[11px]">Warm Light</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-indigo-400" />
          <span className="text-indigo-300 font-mono text-[11px]">Cyber Dark</span>
        </>
      )}
    </button>
  );
}
