"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { useTheme } from "../../context/ThemeContext";

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const pageTitles = {
  "/dashboard":           "Home",
  "/dashboard/projects":  "Projects",
  "/dashboard/tasks":     "Tasks",
  "/dashboard/calendar":  "Calendar",
  "/dashboard/messages":  "Messages",
  "/dashboard/members":   "Members",
  "/dashboard/activity":  "Activity",
  "/dashboard/settings":  "Settings",
};

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { themeClass, isDarkMode } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const title = pageTitles[pathname] || "Home";

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthorized(false);
      router.replace("/login");
      return;
    }
    
    setIsAuthorized(true);
    
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true");
    }
    
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, [router, pathname]);

  

  useEffect(() => {
    if (pathname && isAuthorized === true) {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        setDisplayChildren(children);
        setTimeout(() => {
          setIsExiting(false);
        }, 50);
      }, 450);
      
      return () => clearTimeout(exitTimer);
    }
  }, [pathname, children, isAuthorized]);

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState);
  };

  const bgColor = isDarkMode ? "bg-[#0f0f12]" : "bg-gray-50";

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f12]">
        <div className="w-8 h-8 border-4 border-[#4B0082] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthorized === false) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <TopBar title={title} sidebarCollapsed={sidebarCollapsed} />
      
      <main className={`${sidebarCollapsed ? "ml-20" : "ml-64"} pt-16 min-h-screen transition-all duration-300`}>
        <div className={`p-6 ${bgColor}`}>
          <div 
            className="transition-all duration-700"
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              opacity: isVisible && !isExiting ? 1 : 0,
              transform: isVisible && !isExiting ? "translateY(0) scale(1)" : "translateY(20px) scale(0.985)",
              filter: isVisible && !isExiting ? "blur(0)" : "blur(4px)",
            }}
          >
            {displayChildren}
          </div>
        </div>
      </main>
    </div>
  );
}