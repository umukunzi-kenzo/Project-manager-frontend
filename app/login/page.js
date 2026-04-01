"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast from "react-hot-toast";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const { themeClass, isMounted } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const issues = result.error?.issues ?? result.error?.errors ?? [];
      const errors = {};
      issues.forEach((issue) => {
        if (issue.path[0]) errors[issue.path[0]] = issue.message;
      });
      setFieldErrors(errors);
      setFormError("Incorrect or missing field — please check and try again.");
      return;
    }

    setFieldErrors({});
    setFormError("");
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      toast.success("✓  Welcome back! Redirecting...", { position: "top-center" });
      setTimeout(() => router.push("/dashboard"), 1000);
      setIsLoading(false);
    }, 1000);
  };

  const clearError = (field) => {
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: null }));
    if (formError) setFormError("");
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#111111]">
        <div className="w-full max-w-md">
          <div className="p-8 rounded-2xl bg-[#1c1c1e] border border-gray-800 shadow-xl">
            <div className="h-8 bg-gray-800 rounded animate-pulse mb-8 mx-auto w-32"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-800 rounded animate-pulse mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = (field) =>
    "w-full pl-10 pr-4 p-3 rounded-lg border focus:outline-none focus:border-purple-500 transition " +
    (fieldErrors[field] ? "border-red-500 " : themeClass("border-gray-700 ", "border-gray-200 ")) +
    themeClass("bg-[#2a2a2d] text-white placeholder-gray-500", "bg-gray-50 text-gray-900 placeholder-gray-500");

  return (
    <div className={"min-h-screen flex items-center justify-center px-4 " + themeClass("bg-[#111111]", "bg-gray-50")}>
      <div className="w-full max-w-md">
        <div className={"p-8 rounded-2xl border shadow-xl " + themeClass("bg-[#1c1c1e] border-gray-800", "bg-white border-gray-200")}>

          <h1 className={"text-2xl font-semibold mb-8 text-center " + themeClass("text-white", "text-gray-900")}>
            Welcome back
          </h1>

          {formError && (
            <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {formError}
            </div>
          )}

          <button className={"w-full flex items-center justify-center gap-3 p-3 rounded-lg border transition " + themeClass("border-gray-700 bg-[#2a2a2d] text-white hover:bg-[#333]", "border-gray-300 bg-white text-gray-700 hover:bg-gray-50")}>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" className="fill-[#4285F4]"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" className="fill-[#34A853]"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" className="fill-[#FBBC05]"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" className="fill-[#EA4335]"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center my-6">
            <div className={"grow h-px " + themeClass("bg-gray-800", "bg-gray-200")}></div>
            <span className={"px-3 text-sm " + themeClass("text-gray-500", "text-gray-400")}>or</span>
            <div className={"grow h-px " + themeClass("bg-gray-800", "bg-gray-200")}></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <div className="relative">
                <Mail className={"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 " + themeClass("text-gray-500", "text-gray-400")} />
                <input type="email" placeholder="Email address" value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                  className={inputClass("email")} />
              </div>
              {fieldErrors.email && <p className="text-red-500 text-sm mt-1 ml-1">{fieldErrors.email}</p>}
            </div>

            <div>
              <div className="relative">
                <Lock className={"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 " + themeClass("text-gray-500", "text-gray-400")} />
                <input type="password" placeholder="Password" value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
                  className={inputClass("password")} />
              </div>
              {fieldErrors.password && <p className="text-red-500 text-sm mt-1 ml-1">{fieldErrors.password}</p>}
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full mt-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                : <> Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className={"text-sm mt-6 text-center " + themeClass("text-gray-400", "text-gray-600")}>
            Don't have an account?{" "}
            <a href="/register" className="text-purple-600 hover:underline">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}