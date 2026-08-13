"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd     = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email:    fd.get("email"),
      password: fd.get("password"),
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4
                     bg-gradient-to-br from-brand-dark via-brand-brown to-brand-dark">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-brand-gold">AfriSoro</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20
                       text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-orange text-white font-bold rounded-lg
                       hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          No account?{" "}
          <Link href="/register" className="text-brand-gold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
