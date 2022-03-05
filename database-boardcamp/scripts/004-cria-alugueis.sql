CREATE TABLE "rentals" (
  "id" SERIAL PRIMARY KEY,
  "customerId" INTEGER NOT NULL,
  "gameId" INTEGER NOT NULL,
  "rentDate" DATE NOT NULL,
  "daysRented" INTEGER NOT NULL,
  "returnDate" DATE,
  "originalPrice" INTEGER NOT NULL,
  "delayFee" DATE
);