-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "priceVat0Euro" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Vat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vatPercentage" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");
