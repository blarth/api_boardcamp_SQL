CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "cpf" VARCHAR(11) NOT NULL,
  "birthday" DATE NOT NULL
);