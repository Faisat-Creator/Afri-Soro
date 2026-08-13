import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import XPBar from "@/components/ui/XPBar";
import Badge from "@/components/ui/Badge";
import { getLevelTitle } from "@/lib/gamification";

async function getProfile(userId: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/profile`, {
    headers: { cookie: `next-auth.session-token=${userId}` },
    cache:   "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const profile = await getProfile(session.user.id);
  if (!profile) redirect("/login");

  const achievements = [
    { key: "first_correct", icon: "🎯", name: "First Step", earned: profile.totalAttempts > 0 },
    { key: "xp_100",        icon: "⭐", name: "Rising Star", earned: profile.xp >= 100 },
    { key: "xp_500",        icon: "🏪", name: "Soroban Trader", earned: profile.xp >= 500 },
    { key: "streak_7",      icon: "🔥", name: "Week Warrior", earned: profile.streak >= 7 },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-brown to-brand-dark
                     px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-brand-gold">
              Welcome back, {profile.user.name}! 👋
            </h1>
            <p className="text-amber-200 mt-1">
              Lv {profile.level} · {getLevelTitle(profile.level)}
            </p>
          </div>
          <form action={async () => {
            "use server";
            const { signOut } = await import("@/lib/auth");
            await signOut();
          }}>
            <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg
                               text-white hover:bg-white/20 transition">
              Sign Out
            </button>
          </form>
        </div>

        {/* XP Bar */}
        <XPBar xp={profile.xp} level={profile.level} xpToNext={profile.xpToNext} />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-brand-gold">{profile.xp}</div>
            <div className="text-sm text-gray-400">Total XP</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-brand-orange">{profile.totalAttempts}</div>
            <div className="text-sm text-gray-400">Questions Attempted</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-brand-green">
              {(profile.accuracy * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-amber-100 mb-4">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {achievements.map((a) => (
              <Badge key={a.key} icon={a.icon} name={a.name} earned={a.earned} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/practice"
          className="block w-full py-4 bg-brand-orange text-white text-center
                     font-bold text-lg rounded-xl hover:opacity-90 transition shadow-lg"
        >
          Start Practice Session 🧮
        </Link>
      </div>
    </main>
  );
}
