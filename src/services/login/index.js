import api from "@/lib/api";

export const login = async (formData) => {
  try {
    const data = await api.post("/api/login", formData);
    return data || { success: false, message: "No response from server" };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
};
