import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateQuestion } from "@/lib/scenarios";
import { auth } from "@/lib/auth";
import type { ScenarioConfig } from "@/types";

export async function GET(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const difficulty = parseInt(searchParams.get("difficulty") ?? "1");
  const country    = searchParams.get("country") ?? undefined;

  const where = {
    active: true,
    difficulty: { lte: difficulty + 1, gte: Math.max(1, difficulty - 1) },
    ...(country ? { country } : {}),
  };

  const scenarios = await prisma.scenario.findMany({ where });

  if (!scenarios.length) {
    return NextResponse.json({ error: "No scenarios found" }, { status: 404 });
  }

  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  const question = generateQuestion(scenario as unknown as ScenarioConfig);

  // Persist generated question
  const saved = await prisma.question.create({
    data: {
      id:            question.id,
      scenarioId:    question.scenarioId,
      prompt:        question.prompt,
      correctAnswer: question.correctAnswer,
      difficulty:    question.difficulty,
      operation:     question.operation,
      params:        question.params,
    },
  });

  return NextResponse.json({ ...question, id: saved.id });
}
