//add a new product service

import api from "@/lib/api";

export const addNewProduct = async (formData) => {
  try {
    return await api.post("/api/admin/add-product", formData);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const getAllAdminProducts = async () => {
  try {
    return await api.get("/api/admin/all-products", { cache: "no-store" });
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

export const updateAProduct = async (formData) => {
  try {
    return await api.put("/api/admin/update-product", formData, { cache: "no-store" });
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: null,
      error: e.message,
    };
  }
};

export const deleteAProduct = async (id) => {
  try {
    return await api.delete(`/api/admin/delete-product?id=${id}`);
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: null,
      error: e.message,
    };
  }
};

export const productByCategory = async (id) => {
  try {
    return await api.get(`/api/admin/product-by-category?id=${id}`, { cache: "no-store" });
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: [],
      error: e.message,
    };
  }
};

export const productById = async (id) => {
  try {
    return await api.get(`/api/admin/product-by-id?id=${id}`, { cache: "no-store" });
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: null,
      error: e.message,
    };
  }
};
