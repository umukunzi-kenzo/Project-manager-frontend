"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FolderKanban, CheckSquare, Users, TrendingUp, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";


const BRAND_LIGHT_MODE = "#4B0082";

const BRAND_DARK_MODE = "#A855F7"; 

const stats = [
  { label: "Total Projects", value: "12", sub: "+2 this month", icon: FolderKanban },
  { label: "Tasks Done", value: "84", sub: "+12 this week", icon: CheckSquare },
  { label: "Team Members", value: "9", sub: "1 pending invite", icon: Users },
  { label: "In Progress", value: "6", sub: "2 due today", icon: TrendingUp },
];

const activity = [
  { text: "New task added to E-learning", time: "2m ago", icon: CheckSquare },
  { text: "Wood Habitat marked complete", time: "1h ago", icon: FolderKanban },
  { text: "3 tasks overdue in E-commerce", time: "3h ago", icon: AlertCircle },
  { text: "Sarah joined the workspace", time: "Yesterday", icon: Users },
  { text: "CMS project deadline updated", time: "Yesterday", icon: Clock },
];

const deadlines = [
  { project: "E-learning", task: "Submit final report", due: "Today", urgent: true },
  { project: "E-commerce", task: "Review UI mockups", due: "Tomorrow", urgent: false },
  { project: "SMS", task: "API integration testing", due: "Apr 14", urgent: false },
  { project: "CMS", task: "Content migration", due: "Apr 18", urgent: false },
];

export default function DashboardPage() {
  const router = useRouter();
  const { themeClass, isDarkMode } = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    const stored = localStorage.getItem("user");
    if (stored) { try { setUser(JSON.parse(stored)); } catch {} }
  }, [router]);

  
  const brandColor = isDarkMode ? BRAND_DARK_MODE : BRAND_LIGHT_MODE;
  const brandColorLight = isDarkMode ? "#C084FC" : "#7B00D4";

  const card = `rounded-xl sm:rounded-2xl border p-4 sm:p-6 transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] ${
    isDarkMode
      ? "bg-[#1a1c23] border-[#2a2d35] shadow-xl shadow-black/50"
      : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
  }`;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
      
      
      <div 
        className="rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ backgroundColor: BRAND_LIGHT_MODE }}
      >
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Welcome back, {user?.name?.split(" ")[0] || "there"}
          </h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-white/80">
            Here's what's happening with your projects today.
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/projects")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#4B0082] text-sm font-medium px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:bg-gray-100"
        >
          View Projects <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {stats.map((s, idx) => (
          <div 
            key={s.label} 
            className={card}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = `2px solid ${brandColorLight}`;
              e.currentTarget.style.boxShadow = `0 10px 25px -5px ${brandColor}80`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = isDarkMode ? "1px solid #2a2d35" : "1px solid #f3f4f6";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 ${
              isDarkMode ? "bg-[#252832]" : "bg-gray-100"
            }`}>
              <s.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: brandColor }} />
            </div>
            <p className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{s.value}</p>
            <p className={`text-xs sm:text-sm mt-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>{s.label}</p>
            <p className="text-[11px] sm:text-xs font-semibold mt-1.5 sm:mt-2" style={{ color: brandColor }}>
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Two column section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        
        {/* Activity Feed */}
        <div className={card}>
          <h3 className={`text-base sm:text-lg font-bold mb-4 sm:mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Recent Activity</h3>
          <div className="space-y-3 sm:space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 sm:gap-4 group transition-all duration-200">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${
                  isDarkMode ? "bg-[#252832]" : "bg-gray-100"
                }`}>
                  <a.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: brandColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-gray-200 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"} transition-colors`}>
                    {a.text}
                  </p>
                  <p className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className={card}>
          <h3 className={`text-base sm:text-lg font-bold mb-4 sm:mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Upcoming Deadlines</h3>
          <div className="space-y-2 sm:space-y-3">
            {deadlines.map((d, i) => (
              <div 
                key={i} 
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer ${
                  isDarkMode ? "bg-[#252832] hover:bg-[#2d3038]" : "bg-gray-50 hover:bg-gray-100"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = `2px solid ${brandColorLight}`;
                  e.currentTarget.style.boxShadow = `0 4px 12px -2px ${brandColor}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "";
                  e.currentTarget.style.boxShadow = "";
                }}
                style={{ border: "none" }}
              >
                <div className="min-w-0 flex-1">
                  <p className={`text-sm sm:text-base font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{d.task}</p>
                  <p className={`text-xs sm:text-sm mt-0.5 sm:mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>{d.project}</p>
                </div>
                <span className={`text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full w-fit ${
                  d.urgent
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                    : isDarkMode 
                      ? "bg-[#3a3d47] text-gray-200"
                      : "bg-gray-200 text-gray-600"
                }`}>
                  {d.due}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}