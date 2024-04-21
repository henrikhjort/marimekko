"use client";

/**
 * Get the API URL from the environment variables
 *
 * @returns API URL
 */
export function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not set");
  }
  return apiUrl;
}

/**
 * Get the API key from the environment variables
 *
 * @returns API key
 */
export function getApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (!apiKey) {
    throw new Error("API Key is not set");
  }
  return apiKey;
}

/**
 * Convert float price into string
 * E.g. 350.0 -> 350,00 €
 *
 * @param price
 * @returns Formatted price string
 */
export function formatPrice(price: number, unit = "€") {
  return `${price.toFixed(2).replace(".", ",")} ${unit}`;
}

/**
 * Construct headers for API requests
 *
 * @param accessToken
 * @param emailToken
 *
 * @returns Headers
 */
export function constructHeaders(accessToken?: string, emailToken?: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  if (emailToken) {
    headers["x-email-token"] = emailToken;
  }
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API Key is not set");
  }
  headers["x-functions-key"] = apiKey;
  return headers;
}
