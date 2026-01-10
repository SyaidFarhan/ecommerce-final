import api from "@/lib/api";

export const addNewAddress = async (formData) => {
  try {
    return await api.post("/api/address/add-new-address", formData);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const fetchAllAddresses = async (id) => {
  try {
    return await api.get(`/api/address/get-all-address?id=${id}`);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const updateAddress = async (formData) => {
  try {
    return await api.put("/api/address/update-address", formData);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};

export const deleteAddress = async (id) => {
  try {
    return await api.delete(`/api/address/delete-address?id=${id}`);
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message };
  }
};
