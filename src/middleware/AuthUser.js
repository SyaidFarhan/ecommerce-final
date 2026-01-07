import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const AuthUser = async (req) => {
  try {
    const authHeader = req.headers.get("Authorization");
    
    // Check if authorization header exists
    if (!authHeader) {
      console.warn("⚠️  No authorization header provided");
      return {
        success: false,
        error: "MISSING_TOKEN",
        message: "Authorization token is missing. Please log in.",
      };
    }

    // Extract token from Bearer token
    const token = authHeader.split(" ")[1];
    
    if (!token) {
      console.warn("⚠️  Invalid authorization header format");
      return {
        success: false,
        error: "INVALID_TOKEN_FORMAT",
        message: "Invalid authorization header format. Expected 'Bearer <token>'.",
      };
    }

    // Verify JWT token
    const extractAuthUserInfo = jwt.verify(token, "default_secret_key");
    
    if (extractAuthUserInfo) {
      return {
        success: true,
        user: extractAuthUserInfo,
      };
    }

    return {
      success: false,
      error: "INVALID_TOKEN",
      message: "Invalid or expired token.",
    };
  } catch (error) {
    // Handle specific JWT errors
    let errorType = "UNKNOWN_ERROR";
    let errorMessage = "An unexpected error occurred during authentication.";

    if (error.name === "TokenExpiredError") {
      errorType = "TOKEN_EXPIRED";
      errorMessage = "Your session has expired. Please log in again.";
      console.warn(`⚠️  ${errorType}: Token expired at ${error.expiredAt}`);
    } else if (error.name === "JsonWebTokenError") {
      errorType = "INVALID_TOKEN";
      errorMessage = "Invalid token provided.";
      console.warn(`⚠️  ${errorType}: ${error.message}`);
    } else if (error.name === "NotBeforeError") {
      errorType = "TOKEN_NOT_ACTIVE";
      errorMessage = "Token is not yet valid.";
      console.warn(`⚠️  ${errorType}: Token not valid before ${error.date}`);
    } else {
      console.error("❌ Unexpected authentication error:", error);
    }

    return {
      success: false,
      error: errorType,
      message: errorMessage,
    };
  }
};

export default AuthUser;
