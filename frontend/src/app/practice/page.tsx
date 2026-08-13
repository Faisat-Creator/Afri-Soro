"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SorobanEngine from "@/components/soroban/SorobanEngine";
import ScenarioCard from "@/components/scenarios/ScenarioCard";
import type { GeneratedQuestion } from "@/types";

export default function PracticePage() {
  const router = useRouter();
  const [question, setQuestion] = useState<GeneratedQuestion | null>(null);
  const [loading, setLoading]   = useState(true);
  const [score, setScore]       = useState({ correct: 0, total: 0 });
  const [xp, setXp]             = useState(0);

  async function fetchQuestion() {
    setLoading(true);
    const res = await fetch("/api/questions?difficulty=1");
    if (res.ok) {
      const q = await res.json();
      setQuestion(q);
    } else {
      router.push("/login");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  async function handleComplete(result: {
    correct: boolean;
    responseTime: number;
    xpEarned: number;
  }) {
    if (!question) return;

    setScore((s) => ({ correct: s.correct + (result.correct ? 1 : 0), total: s.total + 1 }));
    setXp((x) => x + result.xpEarned);

    // Submit attempt
    await fetch("/api/attempts", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        questionId:   question.id,
        answer:       0,
        correct:      result.correct,
        responseTime: result.responseTime,
        xpEarned:     result.xpEarned,
      }),
    });

    // Load next question
    setTimeout(() => fetchQuestion(), 500);
  }

  if (loading || !question) {
    return (
      <main className="min-h-screen flex items-center justify-center
                       bg-gradient-to-br from-brand-dark via-brand-brown to-brand-dark">
        <div className="text-brand-gold text-xl">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-brown to-brand-dark
                     px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg
                       text-white hover:bg-white/20 transition"
          >
            ← Dashboard
          </button>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-gray-400">Score:</span>{" "}
              <span className="text-brand-gold font-bold">
                {score.correct}/{score.total}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Session XP:</span>{" "}
              <span className="text-brand-orange font-bold">+{xp}</span>
            </div>
          </div>
        </div>

        {/* Scenario */}
        <ScenarioCard question={question} />

        {/* Soroban */}
        <SorobanEngine question={question} onComplete={handleComplete} />
      </div>
    </main>
  );
}
