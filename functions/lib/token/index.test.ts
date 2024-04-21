import * as jwt from "jsonwebtoken";
import { createEmailToken, verifyEmailToken, createAccessToken } from "./";

import type { User } from "@prisma/client";

// Mocking jsonwebtoken
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe("Token Utilities", () => {
  const mockUser: User = {
    id: "123",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    createdAt: new Date(),
    codeHash: "hash",
  };
  const mockSecret = "secret";
  process.env.JWT_SECRET = mockSecret;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createEmailToken", () => {
    it("should create a valid email token", () => {
      const email = "test@example.com";
      const expectedToken = "emailToken";
      (jwt.sign as jest.Mock).mockReturnValue(expectedToken);

      const token = createEmailToken(email);

      expect(jwt.sign).toHaveBeenCalledWith(
        { email, type: "email" },
        mockSecret,
        { expiresIn: "5m" }
      );
      expect(token).toBe(expectedToken);
    });

    it("should return null if signing fails", () => {
      (jwt.sign as jest.Mock).mockImplementation(() => {
        throw new Error("Failed to sign");
      });

      const token = createEmailToken("test@example.com");
      expect(token).toBeNull();
    });
  });

  describe("createAccessToken", () => {
    it("should create an access token", () => {
      const expectedToken = "accessToken";
      (jwt.sign as jest.Mock).mockReturnValue(expectedToken);

      const token = createAccessToken(mockUser);

      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser.id },
        mockSecret,
        { expiresIn: "24h" }
      );
      expect(token).toBe(expectedToken);
    });
  });

  describe("verifyEmailToken", () => {
    it("should verify email token and return email", () => {
      const decoded = { email: "test@example.com", type: "email" };
      (jwt.verify as jest.Mock).mockReturnValue(decoded);

      const email = verifyEmailToken("validToken");

      expect(jwt.verify).toHaveBeenCalledWith("validToken", mockSecret);
      expect(email).toEqual("test@example.com");
    });

    it("should return null if verification fails", () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid token");
      });

      const email = verifyEmailToken("invalidToken");
      expect(email).toBeNull();
    });
  });

  // Continue for other functions like verifyAccessToken, getEmailTokenFromRequest, etc.
});
