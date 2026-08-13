"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { COUNTRIES } from "@/types";

export default function RegisterPage() {
  const router  = useRouter();
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/register", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        name:     fd.get("name"),
        email:    fd.get("email"),
        password: fd.get("password"),
        country:  fd.get("country"),
      }),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Registration failed.");
    } else {
      router.push("/login?registered=1");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4
                     bg-gradient-to-br from-brand-dark via-brand-brown to-brand-dark">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-brand-gold">AfriSoro</h1>
          <p className="text-gray-400 text-sm mt-1">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full name"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20
                       text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20
                       text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold"
          />
          <input
            name="password"
            type="password"
            placeholder="Password (min 6 chars)"
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20
                       text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold"
          />
          <select
            name="country"
            defaultValue="NG"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20
                       text-white focus:outline-none focus:border-brand-gold"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code} className="bg-brand-dark">
                {c.flag} {c.name} ({c.symbol})
              </option>
            ))}
          </select>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-orange text-white font-bold rounded-lg
                       hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Creating account…" : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Have an account?{" "}
          <Link href="/login" className="text-brand-gold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
