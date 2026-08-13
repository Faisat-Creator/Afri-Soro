import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4
                     bg-gradient-to-br from-brand-dark via-brand-brown to-brand-dark">
      {/* Logo / Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-6xl font-extrabold text-brand-gold tracking-tight">
          AfriSoro
        </h1>
        <p className="text-xl text-amber-200 max-w-md leading-relaxed">
          Master mental mathematics through African market scenarios and the Soroban abacus.
        </p>
      </div>

      {/* CTA */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/register"
          className="px-8 py-3 bg-brand-orange text-white font-bold rounded-xl
                     hover:opacity-90 transition shadow-lg text-lg"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="px-8 py-3 bg-transparent border-2 border-brand-gold text-brand-gold
                     font-bold rounded-xl hover:bg-brand-gold hover:text-brand-dark
                     transition text-lg"
        >
          Sign In
        </Link>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mt-4">
        {[
          { icon: "🧺", title: "African Scenarios", desc: "Practice with real market, farming, and business contexts." },
          { icon: "🧮", title: "Interactive Soroban", desc: "Move beads digitally to solve calculations." },
          { icon: "🏆", title: "Earn XP & Badges", desc: "Level up from Market Assistant to AfriSoro Champion." },
        ].map((f) => (
          <div key={f.title} className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-amber-100">{f.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
