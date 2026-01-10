/**
 * API Utility for handling fetch requests
 * Automatically uses relative paths which work on both localhost and Vercel
 */

import Cookies from "js-cookie";

/**
 * Get the base URL for API calls
 * - In browser (client-side): Use relative paths (empty string)
 * - In server-side: Use NEXT_PUBLIC_API_BASE_URL or VERCEL_URL
 */
export const getBaseUrl = () => {
  // Client-side: always use relative paths
  if (typeof window !== "undefined") {
    return "";
  }

  // Server-side: check for environment variables
  // Vercel automatically sets VERCEL_URL in production
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Custom base URL from environment
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // Fallback for local development
  return "http://localhost:3000";
};

/**
 * Build full API URL from endpoint
 * @param {string} endpoint - API endpoint (e.g., "/api/cart/add-to-cart")
 * @returns {string} Full URL
 */
export const buildApiUrl = (endpoint) => {
  const baseUrl = getBaseUrl();
  // Ensure endpoint starts with /
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
};

/**
 * Get authorization headers with token
 * @returns {Object} Headers object with Authorization
 */
export const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = buildApiUrl(endpoint);
    
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

/**
 * HTTP method shortcuts
 */
export const api = {
  get: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: "GET" }),

  post: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: "DELETE" }),
};

export default api;
