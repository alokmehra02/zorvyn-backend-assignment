import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

async function main() {
  console.log("Seeding database...");

  await prisma.role.createMany({
    data: [
      { name: "VIEWER" },
      { name: "ANALYST" },
      { name: "ADMIN" },
    ],
    skipDuplicates: true,
  });

  await prisma.category.createMany({
    data: [
      { name: "Food" },
      { name: "Transport" },
      { name: "Shopping" },
      { name: "Salary" },
      { name: "Investment" },
    ],
    skipDuplicates: true,
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });