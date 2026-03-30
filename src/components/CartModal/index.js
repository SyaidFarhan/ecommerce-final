"use client";

import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { useRouter } from "next/navigation";

export default function CartModal() {
  const {
    showCartModal,
    setShowCartModal,
    cartItems,
    setCartItems,
    user,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllCartItems() {
    const res = await getAllCartItems(user?._id);

    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item) => {
              const product = item.productID;
              if (!product) return item;
              return {
                ...item,
                productID: {
                  ...product,
                  price:
                    product.onSale === "yes"
                      ? parseInt(
                          (product.price - product.price * (product.priceDrop / 100)).toFixed(2)
                        )
                      : product.price,
                },
              };
            })
          : [];
      setCartItems(updatedData);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }
  }

  useEffect(() => {
    if (user) {
      extractAllCartItems();
    }
  }, [user]);

  async function handleDeleteCartItem(getCartItemID) {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message);
      extractAllCartItems();
    } else {
      toast.error(res.message);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  const isEmpty = !cartItems || cartItems.length === 0;

  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="w-14 h-14 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-500 font-medium text-sm">Your cart is empty</p>
            <p className="text-gray-400 text-xs mt-1">Add items to get started</p>
          </div>
        ) : (
          <ul role="list" className="-my-4 divide-y divide-gray-100">
            {cartItems.map((cartItem) => (
              <li key={cartItem._id} className="flex gap-3 py-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                  <img
                    src={cartItem?.productID?.imageUrl}
                    alt={cartItem?.productID?.name || "Cart item"}
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                      {cartItem?.productID?.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-brand">
                      Rp {Number(cartItem?.productID?.price).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-2 w-fit text-xs font-medium text-red-500 hover:text-red-700 transition-colors duration-150 focus:outline-none"
                    onClick={() => handleDeleteCartItem(cartItem._id)}
                  >
                    {componentLevelLoader?.loading && componentLevelLoader?.id === cartItem._id ? (
                      <ComponentLevelLoader text="Removing" color="#ef4444" loading={true} />
                    ) : (
                      "Remove"
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )
      }
      buttonComponent={
        <Fragment>
          <button
            type="button"
            onClick={() => { router.push("/cart"); setShowCartModal(false); }}
            className="mt-1.5 w-full inline-block bg-white border-2 border-brand text-brand rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wide hover:bg-brand hover:text-white transition-colors duration-200"
          >
            Go To Cart
          </button>
          <button
            disabled={isEmpty}
            type="button"
            onClick={() => { router.push("/checkout"); setShowCartModal(false); }}
            className="mt-1.5 w-full inline-block rounded-xl bg-brand text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide hover:bg-brand-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Checkout
          </button>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setShowCartModal(false)}
              className="text-xs text-gray-500 hover:text-brand transition-colors duration-150 focus:outline-none"
            >
              Continue Shopping &rarr;
            </button>
          </div>
        </Fragment>
      }
    />
  );
}
