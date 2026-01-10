import api from "@/lib/api";

export const callStripeSession = async (formData) => {
  try {
    return await api.post("/api/stripe", formData);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};
