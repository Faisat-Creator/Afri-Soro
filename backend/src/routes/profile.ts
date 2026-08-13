import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth";
import { xpToNextLevel } from "../lib/gamification";

const router = Router();

router.get("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;

    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: { user: { select: { name: true, email: true, country: true } } },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const totalAttempts = await prisma.attempt.count({ where: { studentId: userId } });
    const correctAttempts = await prisma.attempt.count({
      where: { studentId: userId, correct: true },
    });

    res.json({
      ...profile,
      xpToNext: xpToNextLevel(profile.xp),
      totalAttempts,
      accuracy: totalAttempts ? correctAttempts / totalAttempts : 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

export default router;
