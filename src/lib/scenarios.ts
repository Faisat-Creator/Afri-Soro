/**
 * Question Generation Engine
 * Renders parameterized scenario templates into concrete questions.
 */

import type { GeneratedQuestion, ScenarioConfig } from "@/types";

interface RangeVar {
  min: number;
  max: number;
  step: number;
}

function randomFromRange(range: RangeVar): number {
  const steps = Math.floor((range.max - range.min) / range.step);
  return range.min + Math.floor(Math.random() * (steps + 1)) * range.step;
}

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function resolveVariable(def: unknown): number | string {
  if (Array.isArray(def)) return randomFromArray(def as string[]);
  if (typeof def === "object" && def !== null && "min" in def) {
    return randomFromRange(def as RangeVar);
  }
  return def as string | number;
}

function renderTemplate(
  template: string,
  params: Record<string, unknown>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const val = params[key];
    if (typeof val === "number") {
      return val.toLocaleString(); // e.g. 45,000
    }
    return String(val ?? `{${key}}`);
  });
}

function computeAnswer(
  operation: ScenarioConfig["operation"],
  params: Record<string, unknown>
): number {
  const nums = Object.values(params).filter(
    (v): v is number => typeof v === "number"
  );

  switch (operation) {
    case "ADDITION":
      return nums.reduce((a, b) => a + b, 0);

    case "SUBTRACTION": {
      // profit scenario: (sellPrice - buyPrice) * quantity
      const quantity = params.quantity as number | undefined;
      const buyPrice = params.buyPrice as number | undefined;
      const sellPrice = params.sellPrice as number | undefined;
      if (quantity && buyPrice && sellPrice) {
        return (sellPrice - buyPrice) * quantity;
      }
      return nums[0] - nums.slice(1).reduce((a, b) => a + b, 0);
    }

    case "MULTIPLICATION": {
      // multiply all numeric params
      const quantity = params.quantity as number | undefined;
      const price = params.price as number | undefined;
      const amount = params.amount as number | undefined;
      const members = params.members as number | undefined;
      const weeks = params.weeks as number | undefined;

      if (members && amount && weeks) return members * amount * weeks;
      if (quantity && price) return quantity * price;
      return nums.reduce((a, b) => a * b, 1);
    }

    case "DIVISION": {
      return nums[0] / nums[1];
    }
  }
}

export function generateQuestion(scenario: ScenarioConfig): GeneratedQuestion {
  const params: Record<string, unknown> = {};

  for (const [key, def] of Object.entries(scenario.variables)) {
    params[key] = resolveVariable(def);
  }

  const prompt = renderTemplate(scenario.template, params);
  const correctAnswer = computeAnswer(scenario.operation, params);

  return {
    id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    scenarioId: scenario.id,
    prompt,
    correctAnswer,
    difficulty: scenario.difficulty,
    operation: scenario.operation,
    params,
    category: scenario.category,
    symbol: scenario.symbol,
  };
}

// Category display helpers
export const CATEGORY_LABELS: Record<string, string> = {
  MARKET:        "🧺 Market",
  AGRICULTURE:   "🌾 Agriculture",
  TRANSPORT:     "🚌 Transport",
  HOUSEHOLD:     "🏠 Household",
  SMALL_BUSINESS:"🏪 Small Business",
  FASHION:       "🧵 Fashion",
  LIVESTOCK:     "🐄 Livestock",
  CONSTRUCTION:  "🏗️ Construction",
  SAVINGS:       "🏦 Savings",
  COMMUNITY:     "🎉 Community",
};

export const OPERATION_LABELS: Record<string, string> = {
  ADDITION:       "Addition",
  SUBTRACTION:    "Subtraction",
  MULTIPLICATION: "Multiplication",
  DIVISION:       "Division",
};
