import prisma from "./client";
import * as bcrypt from "bcryptjs";

const saltRounds = 10;

// Mock users with hashed login codes.
const mockUsers = [
  {
    firstName: "Maija",
    lastName: "Poppanen",
    email: "maija.poppanen@email.com",
    codeHash: bcrypt.hashSync("1234", saltRounds),
  },
  {
    firstName: "Pekka",
    lastName: "Pouta",
    email: "pekka.pouta@email.com",
    codeHash: bcrypt.hashSync("5678", saltRounds),
  },
  {
    firstName: "Liisa",
    lastName: "Lumi",
    email: "liisa.lumi@email.com",
    codeHash: bcrypt.hashSync("9012", saltRounds),
  },
];

const mockProducts = [
  {
    name: "Toppa Pikkuinen Unikko",
    productId: "093441-219",
    priceVat0Euro: 350.0,
  },
  {
    name: "Kumarrus Unikko",
    productId: "093471-033",
    priceVat0Euro: 250.0,
  },
  {
    name: "Juhlissa Unikko",
    productId: "093469-099",
    priceVat0Euro: 300.0,
  },
];

const vat = {
  vatPercentage: 24,
};

// Insert companies and users into the database.
async function main() {
  for (const mockUser of mockUsers) {
    const createdUser = await prisma.user.create({
      data: mockUser,
    });
    console.log(`Created user with id: ${createdUser.id}`);
  }
  for (const product of mockProducts) {
    const createdProduct = await prisma.product.create({
      data: product,
    });
    console.log(`Created product with id: ${createdProduct.id}`);
  }
}

main();
