/**
 * Stores a token in localStorage.
 *
 * @param key The key under which the token is stored.
 * @param token The token to be stored.
 */
export function storeToken(key: string, token: string): void {
  localStorage.setItem(key, token);
}

/**
 * Retrieves a token from localStorage.
 *
 * @param key The key under which the token is stored.
 * @returns The token if it exists, otherwise null.
 */
export function getToken(key: string): string | null {
  return localStorage.getItem(key);
}

/**
 * Removes a token from localStorage.
 *
 * @param key The key under which the token is stored.
 */
export function removeToken(key: string): void {
  localStorage.removeItem(key);
}

// Specific utility functions for emailToken and accessToken
export function storeEmailToken(token: string): void {
  storeToken("emailToken", token);
}

export function getEmailToken(): string | null {
  return getToken("emailToken");
}

export function removeEmailToken(): void {
  removeToken("emailToken");
}

export function storeAccessToken(token: string): void {
  storeToken("accessToken", token);
}

export function getAccessToken(): string | null {
  return getToken("accessToken");
}

export function removeAccessToken(): void {
  removeToken("accessToken");
}
