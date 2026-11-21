-- CreateEnum
CREATE TYPE "CreatureType" AS ENUM ('GODZILLA', 'DRAGON');

-- CreateTable
CREATE TABLE "DailyLog" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "leetcodeDone" BOOLEAN NOT NULL DEFAULT false,
    "systemDesignDone" BOOLEAN NOT NULL DEFAULT false,
    "applicationsCount" INTEGER NOT NULL DEFAULT 0,
    "projectDone" BOOLEAN NOT NULL DEFAULT false,
    "projectNote" TEXT,
    "projectMinutes" INTEGER,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "perfectDay" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creature" (
    "id" TEXT NOT NULL,
    "type" "CreatureType" NOT NULL DEFAULT 'GODZILLA',
    "name" TEXT NOT NULL DEFAULT 'Kaiju',
    "totalXp" INTEGER NOT NULL DEFAULT 0,
    "stage" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyLog_date_key" ON "DailyLog"("date");
