/**
 * Client-side API Error Handler
 * Provides user-friendly error messages based on error codes
 */

export const getErrorMessage = (error) => {
  // Handle network errors
  if (!error) {
    return "Network error. Please check your connection and try again.";
  }

  // Handle error response object
  if (typeof error === "object") {
    // Standard API error response
    if (error.message) {
      return error.message;
    }

    // Generic error object
    if (error.error) {
      const errorMap = {
        UNAUTHORIZED: "Please log in to continue.",
        TOKEN_EXPIRED: "Your session has expired. Please log in again.",
        MISSING_TOKEN: "Authentication token is missing. Please log in.",
        INVALID_TOKEN: "Invalid authentication token. Please log in again.",
        INVALID_TOKEN_FORMAT: "Invalid token format. Please log in again.",
        TOKEN_NOT_ACTIVE: "Your token is not yet valid. Please try again later.",
        FORBIDDEN: "You don't have permission to access this resource.",
        NOT_FOUND: "The requested resource was not found.",
        VALIDATION_ERROR: "Please check your input and try again.",
        CONFLICT: "This resource already exists.",
        SERVER_ERROR: "Something went wrong on the server. Please try again later.",
        UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
      };

      return errorMap[error.error] || error.message || "An error occurred. Please try again.";
    }
  }

  // Handle string error messages
  if (typeof error === "string") {
    return error;
  }

  // Default message
  return "An unexpected error occurred. Please try again.";
};

/**
 * Get error severity level for styling
 */
export const getErrorSeverity = (errorCode) => {
  const severityMap = {
    UNAUTHORIZED: "error",
    TOKEN_EXPIRED: "warning",
    MISSING_TOKEN: "error",
    INVALID_TOKEN: "error",
    INVALID_TOKEN_FORMAT: "error",
    TOKEN_NOT_ACTIVE: "warning",
    FORBIDDEN: "error",
    NOT_FOUND: "info",
    VALIDATION_ERROR: "warning",
    CONFLICT: "warning",
    SERVER_ERROR: "error",
    UNKNOWN_ERROR: "error",
  };

  return severityMap[errorCode] || "error";
};

/**
 * Determine if error is authentication-related
 */
export const isAuthError = (errorCode) => {
  return [
    "UNAUTHORIZED",
    "TOKEN_EXPIRED",
    "MISSING_TOKEN",
    "INVALID_TOKEN",
    "INVALID_TOKEN_FORMAT",
    "TOKEN_NOT_ACTIVE",
  ].includes(errorCode);
};

/**
 * Handle API errors and return structured response
 */
export const handleApiError = (error, defaultMessage = "An error occurred") => {
  const errorMessage = getErrorMessage(error);
  const errorCode = error?.error || "UNKNOWN_ERROR";
  const severity = getErrorSeverity(errorCode);
  const isAuth = isAuthError(errorCode);

  return {
    message: errorMessage,
    code: errorCode,
    severity,
    isAuthError: isAuth,
  };
};

export default {
  getErrorMessage,
  getErrorSeverity,
  isAuthError,
  handleApiError,
};
