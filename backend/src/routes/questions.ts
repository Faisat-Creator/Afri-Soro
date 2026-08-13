import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth";
import { generateQuestion } from "../lib/scenarios";

const router = Router();

router.get("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const difficulty = parseInt(req.query.difficulty as string) || 1;
    const country = req.query.country as string | undefined;

    const where = {
      active: true,
      difficulty: { lte: difficulty + 1, gte: Math.max(1, difficulty - 1) },
      ...(country ? { country } : {}),
    };

    const scenarios = await prisma.scenario.findMany({ where });

    if (!scenarios.length) {
      return res.status(404).json({ error: "No scenarios found" });
    }

    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    const question = generateQuestion(scenario as any);

    const saved = await prisma.question.create({
      data: {
        id: question.id,
        scenarioId: question.scenarioId,
        prompt: question.prompt,
        correctAnswer: question.correctAnswer,
        difficulty: question.difficulty,
        operation: question.operation,
        params: question.params,
      },
    });

    res.json({ ...question, id: saved.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate question" });
  }
});

export default router;
