import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { xpToNextLevel } from "@/lib/gamification";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.studentProfile.findUnique({
    where:   { userId: session.user.id },
    include: { user: { select: { name: true, email: true, country: true } } },
  });

  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const totalAttempts = await prisma.attempt.count({
    where: { studentId: session.user.id },
  });

  const correctAttempts = await prisma.attempt.count({
    where: { studentId: session.user.id, correct: true },
  });

  return NextResponse.json({
    ...profile,
    xpToNext:      xpToNextLevel(profile.xp),
    totalAttempts,
    accuracy:      totalAttempts ? correctAttempts / totalAttempts : 0,
  });
}
