CREATE TABLE "games" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "stockTotal" INTEGER NOT NULL,
  "categoryId" INTEGER NOT NULL,
  "pricePerDay" INTEGER NOT NULL
);