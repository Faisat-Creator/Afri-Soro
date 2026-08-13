import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { suggestDifficulty, computePerformanceWindow } from "@/lib/adaptive";
import { levelFromXp, xpToNextLevel as calcXpToNext } from "@/lib/gamification";

const schema = z.object({
  questionId:   z.string(),
  answer:       z.number(),
  correct:      z.boolean(),
  responseTime: z.number().int().positive(),
  xpEarned:     z.number().int().min(0),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { questionId, answer, correct, responseTime, xpEarned } = parsed.data;
  const userId = session.user.id;

  // Record attempt
  await prisma.attempt.create({
    data: { studentId: userId, questionId, answer, correct, responseTime, xpEarned },
  });

  // Update student XP
  const profile = await prisma.studentProfile.update({
    where: { userId },
    data:  { xp: { increment: xpEarned } },
  });

  // Adaptive difficulty suggestion
  const recentAttempts = await prisma.attempt.findMany({
    where:   { studentId: userId },
    orderBy: { createdAt: "desc" },
    take:    10,
    select:  { correct: true, responseTime: true },
  });

  const perf = computePerformanceWindow(recentAttempts);
  const { next: nextDifficulty } = suggestDifficulty(profile.level, perf);

  const newLevel = levelFromXp(profile.xp);
  if (newLevel !== profile.level) {
    await prisma.studentProfile.update({
      where: { userId },
      data:  { level: newLevel },
    });
  }

  return NextResponse.json({
    xp:             profile.xp,
    level:          newLevel,
    xpToNext:       calcXpToNext(profile.xp),
    nextDifficulty,
  });
}
