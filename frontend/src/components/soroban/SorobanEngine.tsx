"use client";

/**
 * SorobanEngine — orchestrates the interactive Soroban + question flow.
 * Handles timing, validation, XP, and calls back to parent on completion.
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SorobanDisplay from "./SorobanDisplay";
import { createSoroban, resetSoroban, checkAnswer } from "@/lib/soroban";
import { xpForAnswer } from "@/lib/gamification";
import type { GeneratedQuestion, SorobanState } from "@/types";

interface Props {
  question: GeneratedQuestion;
  onComplete: (result: {
    correct: boolean;
    responseTime: number;
    xpEarned: number;
  }) => void;
}

type FeedbackState = "idle" | "correct" | "wrong";

export default function SorobanEngine({ question, onComplete }: Props) {
  const [soroban, setSoroban] = useState<SorobanState>(createSoroban);
  const [startTime] = useState(() => Date.now());
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const [elapsed, setElapsed] = useState(0);

  // Live timer
  useEffect(() => {
    if (feedback !== "idle") return;
    const id = setInterval(() => setElapsed(Date.now() - startTime), 100);
    return () => clearInterval(id);
  }, [feedback, startTime]);

  const handleSubmit = useCallback(() => {
    if (feedback !== "idle") return;
    const responseTime = Date.now() - startTime;
    const correct = checkAnswer(soroban.value, question.correctAnswer);
    const xpEarned = xpForAnswer(correct, responseTime);
    setFeedback(correct ? "correct" : "wrong");

    setTimeout(() => {
      onComplete({ correct, responseTime, xpEarned });
      setSoroban(resetSoroban());
      setFeedback("idle");
    }, 1400);
  }, [feedback, soroban.value, question.correctAnswer, startTime, onComplete]);

  const handleReset = () => setSoroban(resetSoroban());

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Timer */}
      <div className="text-sm text-brand-gold font-mono">
        {(elapsed / 1000).toFixed(1)}s
      </div>

      {/* Soroban */}
      <SorobanDisplay
        state={soroban}
        onChange={setSoroban}
        readonly={feedback !== "idle"}
      />

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          disabled={feedback !== "idle"}
          className="px-5 py-2 rounded-lg bg-brand-brown text-amber-100 font-semibold
                     hover:bg-opacity-80 disabled:opacity-40 transition"
        >
          Reset
        </button>
        <button
          onClick={handleSubmit}
          disabled={feedback !== "idle"}
          className="px-6 py-2 rounded-lg bg-brand-orange text-white font-bold
                     hover:opacity-90 disabled:opacity-40 transition shadow-lg"
        >
          Submit
        </button>
      </div>

      {/* Feedback overlay */}
      <AnimatePresence>
        {feedback !== "idle" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`text-4xl font-extrabold ${
              feedback === "correct" ? "text-brand-green" : "text-red-500"
            }`}
          >
            {feedback === "correct" ? "✅ Correct!" : `❌ Answer: ${question.correctAnswer.toLocaleString()}`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
