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
 * Convert float price into string
 * E.g. 350.0 -> 350,00 €
 *
 * @param price
 * @returns Formatted price string
 */
export function formatPrice(price: number, unit = "€") {
  return `${price.toFixed(2).replace(".", ",")} ${unit}`;
}
