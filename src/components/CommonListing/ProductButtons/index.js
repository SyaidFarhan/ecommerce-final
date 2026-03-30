"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductButton({ item }) {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);
  const router = useRouter();

  const isAdminView = pathName.includes("admin-view");

  async function handleDeleteProduct(item) {
    setComponentLevelLoader({ loading: true, id: item._id });
    const res = await deleteAProduct(item._id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  async function handleAddToCart(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });
    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      toast.success(res.message);
      setShowCartModal(true);
    } else {
      toast.error(res.message);
      setShowCartModal(true);
    }
    setComponentLevelLoader({ loading: false, id: "" });
  }

  const isLoadingThis =
    componentLevelLoader?.loading && componentLevelLoader?.id === item._id;

  return isAdminView ? (
    <div className="flex flex-col gap-1.5 mt-2">
      <button
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-product");
        }}
        className="w-full flex justify-center items-center bg-brand text-white rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wide hover:bg-brand-dark transition-colors duration-200"
      >
        Update
      </button>
      <button
        onClick={() => handleDeleteProduct(item)}
        disabled={isLoadingThis}
        className="w-full flex justify-center items-center bg-red-600 text-white rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wide hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoadingThis ? (
          <ComponentLevelLoader text="Deleting" color="#ffffff" loading={true} />
        ) : (
          "Delete"
        )}
      </button>
    </div>
  ) : (
    <button
      onClick={() => handleAddToCart(item)}
      disabled={isLoadingThis}
      className="mt-2 w-full flex justify-center items-center bg-brand text-white rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wide hover:bg-brand-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoadingThis ? (
        <ComponentLevelLoader text="Adding" color="#ffffff" loading={true} />
      ) : (
        "Add To Cart"
      )}
    </button>
  );
}
