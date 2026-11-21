import type { Creature, CreatureType } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { stageFromXp } from "@/lib/xp";

export async function ensureCreature(): Promise<Creature> {
  const existing = await prisma.creature.findFirst();
  if (existing) return existing;

  return prisma.creature.create({
    data: {
      type: "GODZILLA",
      name: "Kaiju",
      totalXp: 0,
      stage: 0,
    },
  });
}

export async function syncCreatureXp(): Promise<Creature> {
  const creature = await ensureCreature();
  const aggregate = await prisma.dailyLog.aggregate({
    _sum: { xpEarned: true },
  });
  const totalXp = aggregate._sum.xpEarned ?? 0;
  const stage = stageFromXp(totalXp);

  if (creature.totalXp === totalXp && creature.stage === stage) {
    return creature;
  }

  return prisma.creature.update({
    where: { id: creature.id },
    data: { totalXp, stage },
  });
}

export async function updateCreatureProfile(input: {
  name?: string;
  type?: CreatureType;
}): Promise<Creature> {
  const creature = await ensureCreature();
  return prisma.creature.update({
    where: { id: creature.id },
    data: {
      ...(input.name !== undefined ? { name: input.name.trim() || "Kaiju" } : {}),
      ...(input.type !== undefined ? { type: input.type } : {}),
    },
  });
}
