import { NextResponse } from "next/server";

/**
 * Standard API Response Utility
 * Provides consistent response formatting for all API endpoints
 */

export const ApiResponse = {
  // Success response
  success: (data, message = "Success", statusCode = 200) => {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status: statusCode }
    );
  },

  // Error response
  error: (
    message = "An error occurred",
    statusCode = 400,
    errorCode = "ERROR",
    details = null
  ) => {
    return NextResponse.json(
      {
        success: false,
        message,
        errorCode,
        ...(details && { details }),
      },
      { status: statusCode }
    );
  },

  // Authentication error
  unauthorized: (message = "Unauthorized. Please log in.") => {
    return NextResponse.json(
      {
        success: false,
        message,
        errorCode: "UNAUTHORIZED",
      },
      { status: 401 }
    );
  },

  // Token expired error
  tokenExpired: (message = "Your session has expired. Please log in again.") => {
    return NextResponse.json(
      {
        success: false,
        message,
        errorCode: "TOKEN_EXPIRED",
      },
      { status: 401 }
    );
  },

  // Forbidden error
  forbidden: (message = "Access denied. You don't have permission.") => {
    return NextResponse.json(
      {
        success: false,
        message,
        errorCode: "FORBIDDEN",
      },
      { status: 403 }
    );
  },

  // Not found error
  notFound: (message = "Resource not found.") => {
    return NextResponse.json(
      {
        success: false,
        message,
        errorCode: "NOT_FOUND",
      },
      { status: 404 }
    );
  },

  // Validation error
  validationError: (message, details = null) => {
    return NextResponse.json(
      {
        success: false,
        message,
        errorCode: "VALIDATION_ERROR",
        ...(details && { details }),
      },
      { status: 422 }
    );
  },

  // Server error
  serverError: (message = "Something went wrong. Please try again later.") => {
    return NextResponse.json(
      {
        success: false,
        message,
        errorCode: "SERVER_ERROR",
      },
      { status: 500 }
    );
  },

  // Conflict error (e.g., duplicate resource)
  conflict: (message = "Resource already exists.") => {
    return NextResponse.json(
      {
        success: false,
        message,
        errorCode: "CONFLICT",
      },
      { status: 409 }
    );
  },
};

export default ApiResponse;
