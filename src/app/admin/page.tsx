"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("adminToken")) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${API_URL}/api/v1/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      sessionStorage.setItem("adminToken", data.data.token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center font-sans p-6">
      <Link href="/" className="absolute top-8 left-8 text-[#6B7280] hover:text-[#CCFF00] font-mono text-xs tracking-[0.2em] uppercase transition-colors">
        ← Return Home
      </Link>

      <div className="w-full max-w-md bg-[#111111] border border-[#222222] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-[#CCFF00] opacity-10 blur-[60px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl mb-6 shadow-[0_0_20px_rgba(204,255,0,0.3)] overflow-hidden">
            <img src="/assets/logo.png" alt="Equilibrium Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-white mb-2">Command Center</h1>
          <p className="text-[#6B7280] text-sm">Authenticate to access feature controls.</p>
        </div>

        <form onSubmit={handleLogin} className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono tracking-widest uppercase text-[#6B7280]">Clearance Code</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#333333] text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all font-mono"
              placeholder="••••••••••••"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#CCFF00] text-black font-bold py-3 rounded-xl shadow-[0_4px_14px_0_rgba(204,255,0,0.2)] hover:shadow-[0_6px_20px_rgba(204,255,0,0.4)] hover:-translate-y-0.5 transition-all mt-2 disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Authenticate"}
          </button>
        </form>
      </div>

      <p className="absolute bottom-8 font-mono text-[10px] tracking-widest text-[#444444] uppercase">
        Restricted Access • Logged Actions
      </p>
    </div>
  );
}
