# AfriSoro Backend

Express.js REST API for AfriSoro platform.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Questions
- `GET /api/questions?difficulty=1&country=NG` - Get random question

### Attempts
- `POST /api/attempts` - Submit answer attempt

### Profile
- `GET /api/profile` - Get student profile

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with DATABASE_URL and JWT_SECRET
npm run db:push
npm run db:generate
npm run db:seed
npm run dev
```

Server runs on http://localhost:5000
