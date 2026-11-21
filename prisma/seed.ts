import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const existing = await prisma.creature.findFirst();

  if (!existing) {
    await prisma.creature.create({
      data: {
        type: "GODZILLA",
        name: "Kaiju",
        totalXp: 0,
        stage: 0,
      },
    });
    console.log("Seeded default Godzilla creature.");
  } else {
    console.log("Creature already exists; skipping seed.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
