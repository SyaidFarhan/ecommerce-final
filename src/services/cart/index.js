import api from "@/lib/api";

export const addToCart = async (formData) => {
  try {
    return await api.post("/api/cart/add-to-cart", formData);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const getAllCartItems = async (id) => {
  try {
    return await api.get(`/api/cart/all-cart-items?id=${id}`);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const deleteFromCart = async (id) => {
  try {
    return await api.delete(`/api/cart/delete-from-cart?id=${id}`);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};
