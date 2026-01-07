"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { MdContacts } from "react-icons/md";

export default function Account() {
  const {
    user,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
  const router = useRouter();

  async function extractAllAddresses() {
    setPageLevelLoader(true);
    const res = await fetchAllAddresses(user?._id);

    if (res.success) {
      setPageLevelLoader(false);

      setAddresses(res.data);
    }
  }

  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditedAddressId !== null
        ? await updateAddress({
            ...addressFormData,
            _id: currentEditedAddressId,
          })
        : await addNewAddress({ ...addressFormData, userID: user?._id });

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: "top-right",
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
      extractAllAddresses();
      setCurrentEditedAddressId(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: "top-right",
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }
  }

  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    });
    setCurrentEditedAddressId(getCurrentAddress._id);
  }

  async function handleDelete(getCurrentAddressID) {
    setComponentLevelLoader({ loading: true, id: getCurrentAddressID });

    const res = await deleteAddress(getCurrentAddressID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.success(res.message, {
        position: "top-right",
      });
      extractAllAddresses();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.error(res.message, {
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllAddresses();
  }, [user]);

  return (
    <section>
      <div className="px-4 py-6 mx-auto bg-gray-100 sm:px-6 lg:px-8 sm:py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="flex flex-col gap-6 p-4 sm:p-8 lg:p-12 lg:flex-row lg:justify-between">
            <div className="flex flex-col items-start flex-1 gap-4 sm:flex-row sm:gap-6">
              <MdContacts className="w-10 h-10 sm:w-12 sm:h-12 text-[#A02F58] flex-shrink-0" />
              <div className="flex flex-col flex-1">
                <h4 className="text-base font-semibold sm:text-lg">
                  {user?.name}
                </h4>
                <p className="text-xs text-gray-600 sm:text-sm">{user?.email}</p>
                <p className="text-xs text-gray-600 capitalize sm:text-sm">{user?.role}</p>
                <button
                  onClick={() => router.push("/orders")}
                  className="mt-4 inline-block bg-[#A02F58] rounded-xl text-white px-4 sm:px-5 py-2 sm:py-3 text-xs font-medium uppercase tracking-wide hover:bg-[#8a234a] transition"
                >
                  View Your Orders
                </button>
              </div>
            </div>

            <div className="w-full p-4 bg-pink-100 sm:p-6 rounded-xl lg:w-auto lg:min-w-96">
              <div className="mt-4">
                <h1 className="text-base font-bold sm:text-lg">Your Addresses :</h1>
                {pageLevelLoader ? (
                  <PulseLoader
                    color={"#000000"}
                    loading={pageLevelLoader}
                    size={15}
                    data-testid="loader"
                  />
                ) : (
                  <div className="flex flex-col gap-3 mt-4 sm:gap-4">
                    {addresses && addresses.length ? (
                      addresses.map((item) => (
                        <div className="p-3 bg-white border rounded sm:p-4" key={item._id}>
                          <p className="text-xs sm:text-sm"><strong>Name:</strong> {item.fullName}</p>
                          <p className="text-xs sm:text-sm"><strong>Address:</strong> {item.address}</p>
                          <p className="text-xs sm:text-sm"><strong>City:</strong> {item.city}</p>
                          <p className="text-xs sm:text-sm"><strong>Country:</strong> {item.country}</p>
                          <p className="text-xs sm:text-sm"><strong>PostalCode:</strong> {item.postalCode}</p>
                          <div className="flex flex-col gap-2 mt-3 sm:flex-row">
                            <button
                              onClick={() => handleUpdateAddress(item)}
                              className="flex-1 inline-block bg-white border-2 border-pink-700 rounded-xl text-[#A02F58] px-3 sm:px-5 py-2 sm:py-3 text-xs font-medium uppercase tracking-wide hover:bg-pink-50 transition"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="flex-1 inline-block bg-[#A02F58] rounded-xl text-white px-3 sm:px-5 py-2 sm:py-3 text-xs font-medium uppercase tracking-wide hover:bg-[#8a234a] transition"
                            >
                              {componentLevelLoader &&
                              componentLevelLoader.loading &&
                              componentLevelLoader.id === item._id ? (
                                <ComponentLevelLoader
                                  text={"Deleting"}
                                  color={"#ffffff"}
                                  loading={
                                    componentLevelLoader &&
                                    componentLevelLoader.loading
                                  }
                                />
                              ) : (
                                "Delete"
                              )}
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-600 sm:text-sm">No address found ! Please add a new address below</p>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="w-full inline-block bg-[#A02F58] rounded-xl text-white px-4 sm:px-5 py-2 sm:py-3 text-xs font-medium uppercase tracking-wide hover:bg-[#8a234a] transition"
                >
                  {showAddressForm ? "Hide Address Form" : "Add New Address"}
                </button>
              </div>
              {showAddressForm ? (
                <div className="flex flex-col items-center justify-center pt-4 mt-6">
                  <div className="w-full mt-4 space-y-4 sm:space-y-6">
                    {addNewAddressFormControls.map((controlItem) => (
                      <InputComponent
                        key={controlItem.id}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        value={addressFormData[controlItem.id]}
                        onChange={(event) =>
                          setAddressFormData({
                            ...addressFormData,
                            [controlItem.id]: event.target.value,
                          })
                        }
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleAddOrUpdateAddress}
                    className="w-full mt-4 inline-block bg-[#A02F58] rounded-xl text-white px-4 sm:px-5 py-2 sm:py-3 text-xs font-medium uppercase tracking-wide hover:bg-[#8a234a] transition"
                  >
                    {componentLevelLoader && componentLevelLoader.loading ? (
                      <ComponentLevelLoader
                        text={"Saving"}
                        color={"#ffffff"}
                        loading={
                          componentLevelLoader && componentLevelLoader.loading
                        }
                      />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>S
    </section>
  );
}
