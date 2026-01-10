import api from "@/lib/api";

export const registerNewUser = async (formData) => {
  try {
    const data = await api.post("/api/register", formData);
    return data || { success: false, message: "No response from server" };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
};
