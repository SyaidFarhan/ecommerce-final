import api from "@/lib/api";

export const createNewOrder = async (formData) => {
  try {
    return await api.post("/api/order/create-order", formData);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const getAllOrdersForUser = async (id) => {
  try {
    return await api.get(`/api/order/get-all-orders?id=${id}`);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const getOrderDetails = async (id) => {
  try {
    return await api.get(`/api/order/order-details?id=${id}`);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const getAllOrdersForAllUsers = async () => {
  try {
    return await api.get("/api/admin/orders/get-all-orders");
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const updateStatusOfOrder = async (formData) => {
  try {
    return await api.put("/api/admin/orders/update-order", formData);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};
