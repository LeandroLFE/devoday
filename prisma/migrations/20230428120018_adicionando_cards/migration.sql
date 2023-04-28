-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "donoId" INTEGER NOT NULL,
    "livro" VARCHAR(20) NOT NULL,
    "capitulo" INTEGER NOT NULL,
    "versInicial" INTEGER NOT NULL,
    "versFinal" INTEGER NOT NULL,
    "data" VARCHAR(15) NOT NULL,
    "q1" TEXT NOT NULL,
    "q2" TEXT NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_donoId_fkey" FOREIGN KEY ("donoId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
