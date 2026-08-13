# AfriSoro — African Soroban Learning Platform

AfriSoro combines the traditional Japanese Soroban abacus with African market contexts to teach mental mathematics through culturally relevant scenarios.

## Features

- 🧮 **Interactive Soroban Engine** — Digital abacus with bead manipulation
- 🌍 **African Scenarios** — Market, agriculture, transport, household contexts
- 🎮 **Gamification** — XP, levels, badges, streaks
- 📊 **Adaptive Learning** — Difficulty adjusts based on performance
- 🏆 **Progress Tracking** — Analytics for students and teachers
- 💱 **Multi-Currency** — Nigeria (₦), Ghana (₵), Kenya (KSh), and more

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes, NextAuth.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js with credentials provider

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

```bash
# Install Node.js from https://nodejs.org (if not already installed)

# Navigate to project
cd afrisoro

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and generate NEXTAUTH_SECRET

# Initialize database
npx prisma db push
npx prisma generate

# Seed scenarios and achievements
npx tsx prisma/seed.ts

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
afrisoro/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/               # Next.js 14 app router pages
│   │   ├── api/           # API routes
│   │   ├── (auth)/        # Auth pages (login, register)
│   │   ├── dashboard/     # Student dashboard
│   │   └── practice/      # Practice session
│   ├── components/
│   │   ├── soroban/       # Soroban engine & display
│   │   ├── scenarios/     # Question cards
│   │   └── ui/            # UI components
│   ├── lib/
│   │   ├── soroban.ts     # Core Soroban logic
│   │   ├── scenarios.ts   # Question generation
│   │   ├── adaptive.ts    # Difficulty engine
│   │   ├── gamification.ts # XP & levels
│   │   ├── auth.ts        # NextAuth config
│   │   └── prisma.ts      # Prisma client
│   └── types/             # TypeScript types
└── package.json
```

## Usage

1. **Register** — Create an account with name, email, password, and country
2. **Dashboard** — View your level, XP, accuracy, and achievements
3. **Practice** — Solve African market scenarios using the Soroban
4. **Level Up** — Earn XP, unlock badges, progress from Market Assistant to AfriSoro Champion

## Database Commands

```bash
# Push schema changes
npm run db:push

# Generate Prisma client
npm run db:generate

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database
npx tsx prisma/seed.ts
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL)
4. Deploy

### Environment Variables for Production

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
NODE_ENV="production"
```

## Roadmap

- [ ] Teacher dashboard with class management
- [ ] Offline-first PWA support
- [ ] More African countries and scenarios
- [ ] Mental Soroban mode (no visible beads)
- [ ] Multiplayer competitions
- [ ] Mobile app (React Native)
- [ ] Financial literacy modules

## License

MIT

## Contributing

Contributions welcome! Open an issue or submit a PR.

---

**AfriSoro** — Making mathematics engaging, practical, and culturally relevant for African learners.
