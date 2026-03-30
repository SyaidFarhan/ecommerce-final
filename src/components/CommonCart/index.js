"use client";

import { useRouter } from "next/navigation";
import ComponentLevelLoader from "../Loader/componentlevel";
import AbsoluteComponents from "../Absolute";

export default function CommonCart({
  cartItems = [],
  handleDeleteCartItem,
  componentLevelLoader,
}) {
  const router = useRouter();

  const subtotal = cartItems.reduce((total, item) => item.productID.price + total, 0);

  return (
    <section className="min-h-screen pb-8 bg-gray-50">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 sm:mt-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-6 sm:px-6 sm:py-8">
              <div className="mb-6">
                <AbsoluteComponents />
                <hr className="border-gray-100" />
              </div>

              <div className="flow-root">
                {cartItems.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {cartItems.map((cartItem) => (
                      <li
                        className="flex gap-4 py-5"
                        key={cartItem._id}
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={cartItem?.productID?.imageUrl}
                            alt={cartItem?.productID?.name || "Cart item"}
                            loading="lazy"
                            className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover bg-gray-50 border border-gray-100"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 leading-tight">
                              {cartItem?.productID?.name}
                            </p>
                            <p className="flex-shrink-0 text-sm sm:text-base font-bold text-gray-900 ml-2">
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
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-600 font-semibold text-base">Your cart is empty</p>
                    <p className="text-gray-400 text-sm mt-1 mb-5">Looks like you haven't added anything yet.</p>
                    <button
                      onClick={() => router.push("/product/listing/all-products")}
                      className="bg-brand text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-dark transition-colors duration-200"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-500">Subtotal</p>
                      <p className="font-semibold text-gray-900">
                        Rp {Number(subtotal).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-500">Shipping</p>
                      <p className="font-semibold text-green-600">Free</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                      <p className="text-base font-bold text-gray-900">Total</p>
                      <p className="text-base font-bold text-brand">
                        Rp {Number(subtotal).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push("/checkout")}
                    disabled={cartItems.length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-brand text-white rounded-xl px-6 py-3.5 text-sm font-semibold uppercase tracking-wide hover:bg-brand-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
