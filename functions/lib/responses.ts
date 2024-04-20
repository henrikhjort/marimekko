/**
 * Invalid data response helper function.
 *
 * @param message Custom message or "Invalid data"
 * @returns Response object with status 400 and message
 */
export function invalidDataResponse(message: string | undefined) {
  return {
    status: 400,
    body: {
      success: false,
      message: message || "Invalid data",
      data: null,
    },
  };
}

/**
 * Unauthorized response helper function.
 *
 * @param message Custom message or "Unauthorized"
 * @returns Response object with status 403 and message
 */
export function unauthorizedResponse(message: string | undefined) {
  return {
    status: 403,
    body: {
      success: false,
      message: message || "Unauthorized",
      data: null,
    },
  };
}

/**
 * Server error response helper function.
 *
 * @param message Custom message or "Internal server error"
 * @returns Response object with status 500 and message
 */
export function serverErrorResponse(message: string | undefined) {
  return {
    status: 500,
    body: {
      success: false,
      message: message || "Internal server error",
      data: null,
    },
  };
}
