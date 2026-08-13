import { PrismaClient, Category, Operation } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed scenarios for Nigeria market context
  const scenarios = [
    {
      category: Category.MARKET,
      country: "NG",
      currency: "NGN",
      symbol: "₦",
      difficulty: 1,
      operation: Operation.ADDITION,
      template:
        "A market woman sells {item1} for ₦{price1} and {item2} for ₦{price2}. What is her total revenue?",
      variables: {
        item1: ["tomatoes", "peppers", "onions"],
        price1: { min: 500, max: 5000, step: 500 },
        item2: ["garri", "beans", "rice"],
        price2: { min: 500, max: 5000, step: 500 },
      },
    },
    {
      category: Category.MARKET,
      country: "NG",
      currency: "NGN",
      symbol: "₦",
      difficulty: 2,
      operation: Operation.MULTIPLICATION,
      template:
        "A trader buys {quantity} bags of rice at ₦{price} each. What is the total cost?",
      variables: {
        quantity: { min: 2, max: 20, step: 1 },
        price: { min: 15000, max: 60000, step: 5000 },
      },
    },
    {
      category: Category.MARKET,
      country: "NG",
      currency: "NGN",
      symbol: "₦",
      difficulty: 3,
      operation: Operation.SUBTRACTION,
      template:
        "A trader buys {quantity} bags at ₦{buyPrice} each and sells each for ₦{sellPrice}. What is the total profit?",
      variables: {
        quantity: { min: 5, max: 25, step: 5 },
        buyPrice: { min: 10000, max: 40000, step: 5000 },
        sellPrice: { min: 12000, max: 50000, step: 5000 },
      },
    },
    {
      category: Category.AGRICULTURE,
      country: "GH",
      currency: "GHS",
      symbol: "₵",
      difficulty: 2,
      operation: Operation.MULTIPLICATION,
      template:
        "A farmer harvests {quantity} bags of cocoa. Each bag sells for ₵{price}. What is the total income?",
      variables: {
        quantity: { min: 3, max: 30, step: 3 },
        price: { min: 200, max: 800, step: 50 },
      },
    },
    {
      category: Category.TRANSPORT,
      country: "KE",
      currency: "KES",
      symbol: "KSh",
      difficulty: 1,
      operation: Operation.ADDITION,
      template:
        "A matatu carries {passengers} passengers. Each pays KSh{fare}. What is the total fare collected?",
      variables: {
        passengers: { min: 5, max: 14, step: 1 },
        fare: { min: 30, max: 200, step: 10 },
      },
    },
    {
      category: Category.SAVINGS,
      country: "NG",
      currency: "NGN",
      symbol: "₦",
      difficulty: 2,
      operation: Operation.MULTIPLICATION,
      template:
        "An Ajo group has {members} members. Each contributes ₦{amount} weekly. How much is collected in {weeks} weeks?",
      variables: {
        members: { min: 5, max: 20, step: 1 },
        amount: { min: 1000, max: 10000, step: 1000 },
        weeks: { min: 4, max: 12, step: 1 },
      },
    },
  ];

  for (const s of scenarios) {
    await prisma.scenario.upsert({
      where: {
        id: `seed-${s.category}-${s.country}-${s.difficulty}`,
      },
      update: {},
      create: {
        id: `seed-${s.category}-${s.country}-${s.difficulty}`,
        ...s,
      },
    });
  }

  // Seed achievements
  const achievements = [
    {
      key: "first_correct",
      name: "First Step",
      description: "Get your first correct answer",
      icon: "🎯",
      requirement: { type: "correct_answers", threshold: 1 },
    },
    {
      key: "market_apprentice",
      name: "Market Apprentice",
      description: "Complete 10 market scenarios",
      icon: "🧺",
      requirement: { type: "category_attempts", category: "MARKET", threshold: 10 },
    },
    {
      key: "xp_100",
      name: "Rising Star",
      description: "Earn 100 XP",
      icon: "⭐",
      requirement: { type: "xp", threshold: 100 },
    },
    {
      key: "xp_500",
      name: "Soroban Trader",
      description: "Earn 500 XP",
      icon: "🏪",
      requirement: { type: "xp", threshold: 500 },
    },
    {
      key: "streak_7",
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "🔥",
      requirement: { type: "streak", threshold: 7 },
    },
  ];

  for (const a of achievements) {
    await prisma.achievement.upsert({
      where: { key: a.key },
      update: {},
      create: a,
    });
  }

  console.log("✅ Seed complete");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
