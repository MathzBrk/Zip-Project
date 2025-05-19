/*
  Warnings:

  - You are about to drop the `Enderecos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `enderecoId` on the `Tenant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenantId,nome]` on the table `Produtos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Produtos_id_tenantId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Enderecos";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tenant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Tenant" ("createdAt", "email", "id", "nome", "senha", "updatedAt") SELECT "createdAt", "email", "id", "nome", "senha", "updatedAt" FROM "Tenant";
DROP TABLE "Tenant";
ALTER TABLE "new_Tenant" RENAME TO "Tenant";
CREATE UNIQUE INDEX "Tenant_email_key" ON "Tenant"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Produtos_tenantId_nome_key" ON "Produtos"("tenantId", "nome");
