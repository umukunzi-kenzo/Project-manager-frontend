"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] px-4">
      <div className="w-full max-w-md bg-[#1c1c1e] p-6 sm:p-10 rounded-2xl border border-gray-800">
        
        <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6 text-center">
          Create your account
        </h1>

        
        <button className="w-full flex items-center justify-center gap-3 p-2.5 sm:p-3 rounded-lg border border-gray-700 bg-[#2a2a2d] text-white hover:bg-[#333] transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        
        <div className="flex items-center my-6">
          <div className="grow h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="grow h-px bg-gray-700"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 sm:space-y-5">

            <input
              type="text"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 sm:p-3 rounded-lg bg-[#2a2a2d] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-purple-500"
            />

            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 sm:p-3 rounded-lg bg-[#2a2a2d] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-purple-500"
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 sm:p-3 rounded-lg bg-[#2a2a2d] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-3 rounded-lg bg-purple-700 text-white font-medium hover:bg-purple-800 transition"
          >
            Register
          </button>

          <p className="text-sm text-gray-400 mt-6 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 hover:underline">
              Login here
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}