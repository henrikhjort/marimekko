import prisma from "../prisma/client";

import type { User } from "@prisma/client";

// Omit id and createdAt fields from User type
type RegisterUserData = Omit<User, "id" | "createdAt">;

/**
 * Register a new user.
 *
 * @param data User data without id and createdAt fields
 * @returns User object if user was created successfully, null otherwise
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
      `Failed to create User with data: ${JSON.stringify(
        data
      )}. Error: ${error}`
    );
    return null;
  }
}

/**
 * Verify if email exists in the database.
 *
 * @param email Email
 * @returns True if email exists, false otherwise
 */
export async function verifyEmailExists(email: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user !== null;
  } catch (error) {
    console.error(`Failed to verify email: ${email}. Error: ${error}`);
    return false;
  }
}

/**
 * Get user by email.
 *
 * @param email User email
 * @returns User object if user was found, null otherwise
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error(`Failed to find user with email: ${email}. Error: ${error}`);
    return null;
  }
}

export async function getUserById(
  userId: number
): Promise<Omit<User, "codeHash"> | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    // Return user without codeHash field
    if (user) {
      const { codeHash, ...userData } = user;
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Failed to find user with id: ${userId}. Error: ${error}`);
    return null;
  }
}
