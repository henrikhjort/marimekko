import { HttpRequest } from "@azure/functions";
import * as jwt from "jsonwebtoken";

import type { User } from "@prisma/client";

/**
 * Get secret from environment variables
 *
 * @returns Secret string or throws an error if secret is not found
 */
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log("Secret not found");
    throw new Error("Secret not found");
  }
  return secret;
}

/**
 * Create a token for email verification
 *
 * @param email Email for signing token
 * @returns Email token or null if signing failed
 */
export function createEmailToken(email: string): string | null {
  try {
    return jwt.sign({ email: email, type: "email" }, getSecret(), {
      expiresIn: "5m",
    });
  } catch (error) {
    console.error(`Failed to create email token: ${error}`);
    return null;
  }
}

/**
 * Create an access token for user
 *
 * @param user User object
 * @returns Access token or null if signing failed
 */
export function createAccessToken(user: User): string | null {
  try {
    return jwt.sign({ userId: user.id }, getSecret(), { expiresIn: "24h" });
  } catch (error) {
    console.error(`Failed to create access token: ${error}`);
    return null;
  }
}

/**
 * Verify email token
 *
 * @param emailToken Email token string
 * @returns Email if token is valid, otherwise null
 */
export function verifyEmailToken(emailToken: string): string | null {
  try {
    const decoded = jwt.verify(emailToken, getSecret()) as {
      email: string;
      type: string;
    };
    if (decoded.type !== "email") {
      console.error(`Invalid token type: ${decoded.type}`);
      return null;
    }
    if (!decoded.email) {
      console.error("Email not found in token");
      return null;
    }
    return decoded.email;
  } catch (error) {
    console.error(`Failed to verify email token: ${error}`);
    return null;
  }
}

/**
 * Retrieve the 'emailToken' from the x-email-token header
 *
 * @param req Request object
 * @returns The 'emailToken' if it exists and is formatted correctly, otherwise null.
 */
export function getEmailTokenFromRequest(req: HttpRequest): string | null {
  const emailTokenHeader = req.headers["x-email-token"];

  if (!emailTokenHeader) {
    console.error("Email token header not found");
    return null;
  }

  return emailTokenHeader;
}

/**
 * Retrieve the access token from the Authorization header as a Bearer token
 *
 * @param req Request object
 * @returns The access token if it exists and is formatted correctly, otherwise null.
 */
export function getAccessTokenFromRequest(req: HttpRequest): string | null {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    console.error("Authorization header not found");
    return null;
  }

  // Check if the Authorization header is in the format: Bearer [token]
  if (!authHeader.startsWith("Bearer ")) {
    console.error("Authorization header is not in Bearer token format");
    return null;
  }

  // Extract the token part from the Authorization header
  const accessToken = authHeader.substring(7); // Skip the "Bearer " part

  return accessToken;
}

/**
 * Verify the access token
 *
 * @param accessToken Access token string
 * @returns User ID if token is valid, otherwise null
 */
export function verifyAccessToken(accessToken: string): string | null {
  try {
    const decoded = jwt.verify(accessToken, getSecret()) as { userId: string };
    if (!decoded.userId) {
      console.error("User ID not found in token");
      return null;
    }
    return decoded.userId;
  } catch (error) {
    console.error(`Failed to verify access token: ${error}`);
    return null;
  }
}
