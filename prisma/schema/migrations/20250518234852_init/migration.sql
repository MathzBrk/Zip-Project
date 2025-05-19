/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tenantId` to the `Pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usuario_enderecoId_key";

-- DropIndex
DROP INDEX "Usuario_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usuario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "enderecoId" TEXT,
    CONSTRAINT "Tenant_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Enderecos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "valor" INTEGER NOT NULL,
    "formaDePagamento" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,
    CONSTRAINT "Pedidos_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedidos" ("clientName", "data", "formaDePagamento", "id", "valor") SELECT "clientName", "data", "formaDePagamento", "id", "valor" FROM "Pedidos";
DROP TABLE "Pedidos";
ALTER TABLE "new_Pedidos" RENAME TO "Pedidos";
CREATE TABLE "new_Produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "preco" INTEGER NOT NULL,
    "quantidadeEstoque" INTEGER NOT NULL,
    "tenantId" TEXT NOT NULL,
    CONSTRAINT "Produtos_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produtos" ("id", "nome", "preco", "quantidadeEstoque") SELECT "id", "nome", "preco", "quantidadeEstoque" FROM "Produtos";
DROP TABLE "Produtos";
ALTER TABLE "new_Produtos" RENAME TO "Produtos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_email_key" ON "Tenant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_enderecoId_key" ON "Tenant"("enderecoId");
