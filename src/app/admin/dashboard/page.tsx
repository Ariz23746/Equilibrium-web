"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FeatureFlag {
  key: string;
  description: string;
  isEnabled: boolean;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSeedForm, setShowSeedForm] = useState(false);
  const [newFlagKey, setNewFlagKey] = useState("");
  const [newFlagDesc, setNewFlagDesc] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const fetchFlags = async (page = 1) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/flags?page=${page}&limit=10`);
      const data = await res.json();
      if (res.ok) {
        setFlags(data.data.flags);
        setCurrentPage(data.data.pagination.currentPage);
        setTotalPages(data.data.pagination.totalPages);
      } else {
        throw new Error("Failed to fetch flags");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
      return;
    }
    fetchFlags(currentPage);
  }, [router, currentPage]);

  const toggleFlag = async (key: string, currentValue: boolean) => {
    const token = sessionStorage.getItem("adminToken");
    try {
      // Optimistic update
      setFlags((prev) =>
        prev.map((f) => (f.key === key ? { ...f, isEnabled: !currentValue } : f))
      );

      const res = await fetch(`${API_URL}/api/v1/flags/${key}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isEnabled: !currentValue }),
      });

      if (!res.ok) {
        throw new Error("Failed to update flag");
      }
    } catch (err) {
      // Revert on error
      setFlags((prev) =>
        prev.map((f) => (f.key === key ? { ...f, isEnabled: currentValue } : f))
      );
      alert("Failed to update flag. Please check backend connection.");
    }
  };

  const handleDeleteFlag = async (key: string) => {
    if (!window.confirm(`Are you sure you want to delete the feature flag '${key}'? This cannot be undone.`)) {
      return;
    }

    const token = sessionStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_URL}/api/v1/flags/${key}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        // Optimistically remove it from UI, or re-fetch current page
        setFlags((prev) => prev.filter((f) => f.key !== key));
        // If the page is now empty and we're not on page 1, fetch the previous page
        if (flags.length === 1 && currentPage > 1) {
          fetchFlags(currentPage - 1);
        } else {
          fetchFlags(currentPage); // Re-fetch to get correct pagination metadata
        }
      } else {
        const errData = await res.json();
        alert(`Failed to delete flag: ${errData.message}`);
      }
    } catch (err) {
      alert("Error connecting to backend to delete flag.");
    }
  };

  const handleSeedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlagKey.trim() || !newFlagDesc.trim()) return;

    const token = sessionStorage.getItem("adminToken");
    const flagsToSeed = [{
      key: newFlagKey.trim(),
      description: newFlagDesc.trim(),
      isEnabled: false,
    }];

    try {
      const res = await fetch(`${API_URL}/api/v1/flags/seed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ flags: flagsToSeed }),
      });

      if (res.ok) {
        alert("Flag added successfully!");
        setNewFlagKey("");
        setNewFlagDesc("");
        setShowSeedForm(false);
        fetchFlags(currentPage);
      } else {
        const errData = await res.json();
        alert(`Seeding failed: ${errData.message}`);
      }
    } catch (err) {
      alert("Seeding failed");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    router.push("/admin");
  };

  if (loading) {
    return <div className="min-h-screen bg-bg-main flex items-center justify-center font-sans">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-bg-main font-sans text-text-primary">
      {/* Header */}
      <header className="border-b border-border-subtle bg-white">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/assets/logo.webp" alt="Equilibrium Logo" className="h-8 w-auto rounded-lg" />
            <h1 className="font-serif text-2xl font-medium tracking-tight">Admin Dashboard</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowSeedForm(!showSeedForm)}
              className="px-4 py-2 text-sm font-mono tracking-widest uppercase border border-border-subtle rounded-lg hover:bg-gray-50 transition-colors"
            >
              {showSeedForm ? "Cancel" : "Add New Flag"}
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-mono tracking-widest uppercase text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-2">Feature Flags</h2>
          <p className="text-text-secondary text-sm">Control the availability of features across the mobile application in real-time.</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}

        {showSeedForm && (
          <div className="mb-8 p-6 bg-white border border-border-subtle rounded-2xl shadow-sm">
            <h3 className="text-lg font-medium mb-4">Create New Feature Flag</h3>
            
            <form onSubmit={handleSeedSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono tracking-widest uppercase text-text-secondary mb-2">
                  Flag Key
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., dashboard.sms.auto.logging"
                  value={newFlagKey}
                  onChange={(e) => setNewFlagKey(e.target.value)}
                  className="w-full p-3 font-mono text-sm border border-border-subtle rounded-xl focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-widest uppercase text-text-secondary mb-2">
                  Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="Automatic SMS transaction detection and logging..."
                  value={newFlagDesc}
                  onChange={(e) => setNewFlagDesc(e.target.value)}
                  className="w-full p-3 text-sm border border-border-subtle rounded-xl focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]"
                />
              </div>

              <button
                type="submit"
                disabled={!newFlagKey.trim() || !newFlagDesc.trim()}
                className="mt-2 px-6 py-3 bg-[#CCFF00] text-black font-mono text-sm tracking-widest uppercase font-bold rounded-xl hover:-translate-y-0.5 transition-transform disabled:opacity-50"
              >
                Add Flag
              </button>
            </form>
          </div>
        )}

        <div className="grid gap-2">
          {flags.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-border-subtle rounded-2xl">
              <p className="text-text-secondary mb-4">No feature flags found in the database.</p>
              <button 
                onClick={() => setShowSeedForm(true)}
                className="px-6 py-3 bg-black text-white font-mono text-sm tracking-widest uppercase rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add First Flag
              </button>
            </div>
          ) : (
            flags.map((flag) => (
              <div key={flag.key} className="bg-white border border-border-subtle py-3 px-4 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="max-w-[80%]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold tracking-tight bg-gray-100 px-2 py-0.5 rounded text-gray-700">{flag.key}</span>
                  </div>
                  <p className="text-text-secondary text-sm truncate">{flag.description}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Toggle Switch */}
                  <button
                    onClick={() => toggleFlag(flag.key, flag.isEnabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                      flag.isEnabled ? 'bg-black' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-300 ${
                        flag.isEnabled ? 'translate-x-6 bg-[#CCFF00]' : 'translate-x-1 bg-white shadow-sm'
                      }`}
                    />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteFlag(flag.key)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete feature flag"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 p-4 bg-white border border-border-subtle rounded-xl">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-mono tracking-widest uppercase border border-border-subtle rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              Previous
            </button>
            <span className="font-mono text-sm text-text-secondary">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-mono tracking-widest uppercase border border-border-subtle rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
