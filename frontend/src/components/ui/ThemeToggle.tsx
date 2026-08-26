"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial document class or system preference
    if (typeof document !== "undefined") {
      const hasDark = document.documentElement.classList.contains("dark");
      setIsDark(hasDark);
    }
  }, []);

  const toggleTheme = () => {
    if (typeof document !== "undefined") {
      if (isDark) {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      } else {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-brand-elevated border border-brand-border text-xs font-semibold text-brand-textMuted hover:text-brand-textMain transition-all shadow-sm"
      title="Toggle Light/Dark Theme"
    >
      {isDark ? (
        <>
          <Sun className="h-3.5 w-3.5 text-amber-400" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-indigo-400" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}
