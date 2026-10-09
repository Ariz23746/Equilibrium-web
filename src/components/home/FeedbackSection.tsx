"use client";

import { useState } from "react";

export default function FeedbackSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; text: string }>({
    type: "idle",
    text: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", text: "Sending..." });

    const API_BASE = "https://api.hqequilibrium.com/api/v1";

    try {
      const response = await fetch(`${API_BASE}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", text: "Thanks! I got your message and will reply soon." });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error(data.message || "Submission interrupted");
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Something went wrong";
      setStatus({ type: "error", text: `Couldn't send: ${msg}. You can also email hq.equilibrium.ai@gmail.com` });
    }
  };

  return (
    <section id="contact" className="py-32 bg-bg-card border-t border-border-subtle">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-text-primary mb-6">Talk to the person who builds it.</h2>
          <p className="font-sans text-lg text-text-secondary">
            I&apos;m Ariz, and I build Equilibrium on my own. Found a bug, missing a feature, or just want to say what works
            for you? I read every message and reply myself.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-6">
            <input
              className="flex-1 bg-bg-main border border-border-subtle focus:border-text-primary focus:ring-0 px-6 py-4 rounded-2xl text-text-primary font-sans placeholder-text-secondary transition-colors"
              placeholder="Your name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="flex-1 bg-bg-main border border-border-subtle focus:border-text-primary focus:ring-0 px-6 py-4 rounded-2xl text-text-primary font-sans placeholder-text-secondary transition-colors"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <textarea
            className="w-full bg-bg-main border border-border-subtle focus:border-text-primary focus:ring-0 px-6 py-4 rounded-2xl text-text-primary font-sans placeholder-text-secondary transition-colors min-h-[150px] resize-y"
            placeholder="What would make Equilibrium better for you?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          
          <button
            type="submit"
            disabled={status.type === "loading"}
            className="bg-text-primary text-bg-main px-8 py-4 rounded-full font-mono text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-opacity shadow-button mt-4 disabled:opacity-50"
          >
            {status.type === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status.type !== "idle" && (
            <div
              className={`text-center mt-4 font-mono text-sm font-bold tracking-widest ${
                status.type === "success" ? "text-green-500" : status.type === "error" ? "text-red-500" : "text-text-primary"
              }`}
            >
              {status.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
