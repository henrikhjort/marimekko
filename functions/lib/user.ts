import prisma from "../prisma/client";
import type { User } from "@prisma/client";

// Define a type that omits the 'id' and 'createdAt' for MongoDB
type RegisterUserData = Omit<User, "id" | "createdAt">;

/**
 * Register a new user.
 */
export async function registerUser(
  data: RegisterUserData
): Promise<User | null> {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (error) {
    console.error(
      `Failed to create User: ${JSON.stringify(data)}. Error: ${error}`
    );
    return null;
  }
}

/**
 * Verify if email exists in the database.
 */
export async function verifyEmailExists(email: string): Promise<boolean> {
  try {
    const count = await prisma.user.count({
      where: { email },
    });
    return count > 0;
  } catch (error) {
    console.error(`Failed to verify email: ${email}. Error: ${error}`);
    return false;
  }
}

/**
 * Get user by email.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error(`Failed to find user with email: ${email}. Error: ${error}`);
    return null;
  }
}

/**
 * Get user by ID, excluding the codeHash field.
 */
export async function getUserById(
  userId: string
): Promise<Omit<User, "codeHash"> | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        // Exclude codeHash by not selecting it
      },
    });
    return user;
  } catch (error) {
    console.error(`Failed to find user with id: ${userId}. Error: ${error}`);
    return null;
  }
}
