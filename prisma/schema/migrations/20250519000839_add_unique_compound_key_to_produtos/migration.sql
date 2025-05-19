/*
  Warnings:

  - A unique constraint covering the columns `[id,tenantId]` on the table `Produtos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Produtos_id_tenantId_key" ON "Produtos"("id", "tenantId");
