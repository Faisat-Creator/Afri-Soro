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
- **Backend:** Express.js, Node.js, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT tokens

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

```bash
# Install Node.js from https://nodejs.org (if not already installed)

# Navigate to project
cd afrisoro

# Install all dependencies (root + frontend + backend)
npm run install:all

# Set up backend environment
cd backend
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

# Initialize database
npm run db:push
npm run db:generate
npm run db:seed

# Set up frontend environment
cd ../frontend
cp .env.example .env
# Edit .env with NEXT_PUBLIC_API_URL (default: http://localhost:5000)

# Run both frontend and backend
cd ..
npm run dev
```

**Frontend:** [http://localhost:3000](http://localhost:3000)  
**Backend API:** [http://localhost:5000](http://localhost:5000)

## Project Structure

```
afrisoro/
├── backend/                # Express.js API server
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Seed data
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── lib/            # Utilities (prisma, jwt, scenarios, adaptive, gamification)
│   │   └── server.ts       # Express server
│   └── package.json
├── frontend/               # Next.js 14 app
│   ├── src/
│   │   ├── app/            # Next.js pages
│   │   ├── components/     # React components
│   │   ├── lib/            # API client, soroban engine
│   │   └── types/          # TypeScript types
│   └── package.json
└── package.json            # Root monorepo config
```

## Usage

1. **Register** — Create an account with name, email, password, and country
2. **Dashboard** — View your level, XP, accuracy, and achievements
3. **Practice** — Solve African market scenarios using the Soroban
4. **Level Up** — Earn XP, unlock badges, progress from Market Assistant to AfriSoro Champion

## Development Commands

```bash
# Run both frontend and backend
npm run dev

# Run backend only
npm run dev:backend

# Run frontend only
npm run dev:frontend

# Build for production
npm run build

# Backend commands (from backend/ directory)
cd backend
npm run db:push          # Push schema changes
npm run db:generate      # Generate Prisma client
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database
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
