"use client";

import { CATEGORY_LABELS } from "@/lib/scenarios";
import type { GeneratedQuestion } from "@/types";

interface Props {
  question: GeneratedQuestion;
}

export default function ScenarioCard({ question }: Props) {
  return (
    <div className="bg-brand-cream rounded-2xl p-6 shadow-md border border-amber-200 max-w-lg w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-brand-orange uppercase tracking-wide">
          {CATEGORY_LABELS[question.category] ?? question.category}
        </span>
        <span className="text-xs text-gray-400">
          {"⭐".repeat(question.difficulty)}
        </span>
      </div>
      <p className="text-brand-dark text-lg font-medium leading-relaxed">
        {question.prompt}
      </p>
      <p className="mt-3 text-sm text-gray-500">
        Use the Soroban below to calculate your answer, then press Submit.
      </p>
    </div>
  );
}
