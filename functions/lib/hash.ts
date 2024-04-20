import * as bcrypt from "bcryptjs";

// The cost factor controls how much time is needed to calculate a single bcrypt hash.
const saltRounds = 10;

/**
 * A function to hash a login code.
 *
 * @param code unhashed login code
 * @returns hashed login code or null if hashing failed or code is not 4 digits
 */
export async function hashLoginCode(code: string): Promise<string | null> {
  if (!isFourDigitsAndNumeric(code)) {
    console.error(`Login code is not 4 digits: ${code}`);
    return null;
  }
  try {
    const hashedCode = await bcrypt.hash(code, saltRounds);
    return hashedCode;
  } catch (error) {
    console.error(`Failed to hash login code: ${error}`);
    return null;
  }
}

/**
 * A function to compare login code with stored hash.
 *
 * @param code unhashed login code
 * @param hash hashed login code
 * @returns true if login code matches hash, false otherwise
 */
export async function verifyLoginCode(
  code: string,
  hash: string
): Promise<boolean> {
  if (!isFourDigitsAndNumeric(code)) {
    console.error(`Login code is not 4 digits: ${code}`);
    return false;
  }
  try {
    return await bcrypt.compare(code, hash);
  } catch (error) {
    console.error(`Failed to verify login code: ${error}`);
    return false;
  }
}

/**
 * A function to check if a code is 4 digits and numeric.
 *
 * @param code login code
 * @returns true if code is 4 digits and numeric, false otherwise
 */
function isFourDigitsAndNumeric(code: string): boolean {
  return /^\d{4}$/.test(code);
}
