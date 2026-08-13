import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth";
import { computePerformanceWindow, suggestDifficulty } from "../lib/adaptive";
import { levelFromXp, xpToNextLevel } from "../lib/gamification";

const router = Router();

const attemptSchema = z.object({
  questionId: z.string(),
  answer: z.number(),
  correct: z.boolean(),
  responseTime: z.number().int().positive(),
  xpEarned: z.number().int().min(0),
});

router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const parsed = attemptSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { questionId, answer, correct, responseTime, xpEarned } = parsed.data;
    const userId = req.user!.userId;

    await prisma.attempt.create({
      data: { studentId: userId, questionId, answer, correct, responseTime, xpEarned },
    });

    const profile = await prisma.studentProfile.update({
      where: { userId },
      data: { xp: { increment: xpEarned } },
    });

    const recentAttempts = await prisma.attempt.findMany({
      where: { studentId: userId },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { correct: true, responseTime: true },
    });

    const perf = computePerformanceWindow(recentAttempts);
    const { next: nextDifficulty } = suggestDifficulty(profile.level, perf);

    const newLevel = levelFromXp(profile.xp);
    if (newLevel !== profile.level) {
      await prisma.studentProfile.update({
        where: { userId },
        data: { level: newLevel },
      });
    }

    res.json({
      xp: profile.xp,
      level: newLevel,
      xpToNext: xpToNextLevel(profile.xp),
      nextDifficulty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to record attempt" });
  }
});

export default router;
