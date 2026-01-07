export const login = async (formData) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // Handle network or server errors
    if (!response.ok) {
      return {
        success: false,
        message: data?.message || "Login failed. Please try again.",
      };
    }

    return data || { success: false, message: "No response from server" };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
};
