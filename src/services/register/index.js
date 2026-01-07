export const registerNewUser = async (formData) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const finalData = await response.json();

    // Handle network or server errors
    if (!response.ok) {
      return {
        success: false,
        message: finalData?.message || "Registration failed. Please try again.",
      };
    }

    return finalData || { success: false, message: "No response from server" };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
};
