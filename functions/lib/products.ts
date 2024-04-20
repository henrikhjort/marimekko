import prisma from "../prisma/client";

import type { Product } from "@prisma/client";

/**
 * Get all products.
 *
 * @returns List of products
 */
export async function getProducts(): Promise<Product[]> {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.error(`Failed to get products. Error: ${error}`);
    return [];
  }
}
