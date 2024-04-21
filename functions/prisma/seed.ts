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
    category: "Quilted jacket",
    description:
      "The Pikkuinen Unikko quilted jacket blends timeless style with practical warmth, making it an essential addition to your cool-weather wardrobe. Crafted from a durable, water-resistant fabric, this jacket features a vibrant rendition of the iconic Unikko poppy print, reimagined in a smaller scale for a modern twist.",
    colors: [
      {
        name: "Soft beige",
        code: "#E2DDD4",
      },
      {
        name: "Blush pink",
        code: "#f5b3c4",
      },
    ],
  },
  {
    name: "Kumarrus Unikko",
    productId: "093471-033",
    priceVat0Euro: 250.0,
    category: "Skirt",
    description:
      "The Kumarrus Unikko skirt captures the essence of Marimekko's bold design ethos, showcasing the beloved Unikko print with a graceful, flowing twist. This skirt is cut from a soft, lightweight fabric that drapes beautifully, making it perfect for both casual and formal settings.",
    colors: [
      {
        name: "Soft almond",
        code: "#DECBBF",
      },
    ],
  },
  {
    name: "Juhlissa Unikko",
    productId: "093469-099",
    priceVat0Euro: 300.0,
    category: "Dress",
    description:
      "The Juhlissa Unikko dress is an elegant interpretation of Marimekko’s iconic Unikko pattern, tailored to bring sophistication to your evening wardrobe. Crafted from a luxurious black fabric, this dress features a subtle integration of the Unikko floral design in a tone-on-tone print that adds depth and texture without overpowering.",
    colors: [
      {
        name: "Jet black",
        code: "#000000",
      },
    ],
  },
];

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
