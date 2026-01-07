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

  return (
    <section className="min-h-screen pb-5 bg-gray-100">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-6 sm:mt-8 w-full max-w-full">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
              <div className="mb-6">
                {" "}
                <AbsoluteComponents></AbsoluteComponents>
                <hr />
              </div>

              <div className="flow-root pt-5">
                {cartItems && cartItems.length ? (
                  <ul className="-my-6 sm:-my-8">
                    {cartItems.map((cartItem) => (
                      <li
                        className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-4 sm:space-y-0"
                        key={cartItem.id}
                      >
                        <div className="shrink-0">
                          <img
                            src={
                              cartItem &&
                              cartItem.productID &&
                              cartItem.productID.imageUrl
                            }
                            alt="Product image"
                            className="h-20 w-20 sm:h-24 sm:w-24 max-w-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-3">
                            <div className="pr-0 sm:pr-4">
                              <p className="text-sm sm:text-base font-semibold text-gray-900">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.name}
                              </p>
                            </div>
                            <div className="mt-3 flex gap-2 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 text-sm sm:text-base font-semibold text-gray-950 sm:order-1 sm:ml-4">
                                Rp
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.price}
                              </p>
                              <button
                                type="button"
                                className="font-medium text-yellow-700 text-xs sm:text-sm sm:order-2"
                                onClick={() =>
                                  handleDeleteCartItem(cartItem._id)
                                }
                              >
                                {componentLevelLoader &&
                                componentLevelLoader.loading &&
                                componentLevelLoader.id === cartItem._id ? (
                                  <ComponentLevelLoader
                                    text={"Removing"}
                                    color={"#0000000"}
                                    loading={
                                      componentLevelLoader &&
                                      componentLevelLoader.loading
                                    }
                                  />
                                ) : (
                                  "Remove"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="font-bold text-base sm:text-lg">Your cart is Empty !</h1>
                )}
              </div>
              <div className="mt-6 border-t border-b py-3 sm:py-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <p className="text-xs sm:text-sm text-gray-400">Subtotal</p>
                  <p className="text-sm sm:text-lg text-black font-semibold">
                    Rp
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <p className="text-xs sm:text-sm text-gray-400">Shipping</p>
                  <p className="text-sm sm:text-lg text-black font-semibold">Rp0</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs sm:text-sm text-gray-400">Total</p>
                  <p className="text-sm sm:text-lg text-black font-semibold">
                    Rp
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => router.push("/checkout")}
                    disabled={cartItems && cartItems.length === 0}
                    className="disabled:opacity-50 group inline-flex w-full items-center justify-center bg-[#A02F58] rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-lg text-white font-medium uppercase tracking-wide"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
