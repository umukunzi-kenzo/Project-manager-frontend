"use client";

import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group"
      aria-label="Toggle theme"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Main toggle button */}
      <div className="relative w-12 h-12 rounded-full bg-white dark:bg-[#2a2a2d] border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105">
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-yellow-400 transition-all duration-300" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700 transition-all duration-300" />
        )}
      </div>
    </button>
  );
}