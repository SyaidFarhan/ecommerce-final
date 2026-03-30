"use client";

import { GlobalContext } from "@/context";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { addToCart } from "@/services/cart";
import { useRouter } from "next/navigation";

function StarRating({ rating = 4.5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.204 3.713a1 1 0 00.95.69h3.905c.969 0 1.371 1.24.588 1.81l-3.158 2.3a1 1 0 00-.364 1.118l1.204 3.713c.3.921-.755 1.688-1.54 1.118l-3.158-2.3a1 1 0 00-1.176 0l-3.158 2.3c-.784.57-1.839-.197-1.54-1.118l1.204-3.713a1 1 0 00-.364-1.118l-3.158-2.3c-.783-.57-.38-1.81.588-1.81h3.905a1 1 0 00.95-.69l1.204-3.713z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating}</span>
    </div>
  );
}

export default function CommonDetails({ item }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  async function handleAddToCart(getItem) {
    setComponentLevelLoader({ loading: true, id: "add-to-cart" });
    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      toast.success(res.message);
      setShowCartModal(true);
    } else {
      toast.error(res.message);
    }
    setComponentLevelLoader({ loading: false, id: "" });
  }

  async function handleBuyNow(getItem) {
    setComponentLevelLoader({ loading: true, id: "buy-now" });
    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setComponentLevelLoader({ loading: false, id: "" });
    router.push("/checkout");
  }

  const isAddingToCart =
    componentLevelLoader?.loading && componentLevelLoader?.id === "add-to-cart";
  const isBuyingNow =
    componentLevelLoader?.loading && componentLevelLoader?.id === "buy-now";

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Image */}
          <div className="w-full lg:w-2/5 flex-shrink-0">
            <div className="aspect-square w-full max-w-sm mx-auto lg:max-w-none rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading mb-3 leading-tight">
              {item.name}
            </h1>

            {/* Rating row */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-500">
              <StarRating rating={4.5} />
              <span className="text-gray-300">|</span>
              <span>241 Ratings</span>
              <span className="text-gray-300">|</span>
              <span>315 Sold</span>
            </div>

            {/* Price */}
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl sm:text-3xl font-bold text-brand">
                Rp {item.price.toLocaleString("id-ID")}
              </p>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:border-brand hover:text-brand transition-colors duration-150"
                  aria-label="Decrease quantity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  className="w-16 text-center p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:border-brand hover:text-brand transition-colors duration-150"
                  aria-label="Increase quantity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                disabled={isAddingToCart || isBuyingNow}
                className="flex-1 py-3 px-4 font-semibold text-brand bg-white border-2 border-brand rounded-xl hover:bg-brand hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                onClick={() => handleAddToCart(item)}
              >
                {isAddingToCart ? (
                  <ComponentLevelLoader text="Adding..." color="#A02F58" loading={true} />
                ) : (
                  "Add to Cart"
                )}
              </button>
              <button
                disabled={isAddingToCart || isBuyingNow}
                className="flex-1 py-3 px-4 font-semibold text-white bg-brand rounded-xl hover:bg-brand-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                onClick={() => handleBuyNow(item)}
              >
                {isBuyingNow ? (
                  <ComponentLevelLoader text="Processing..." color="#ffffff" loading={true} />
                ) : (
                  "Buy Now"
                )}
              </button>
            </div>

            {/* Delivery */}
            {item.deliveryInfo && (
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{item.deliveryInfo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description & Store Info */}
        <div className="mt-10 space-y-4">
          <div className="border border-gray-200 rounded-xl p-5">
            <h2 className="text-base font-bold text-gray-900 font-heading mb-3">Store Information</h2>
            <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-150">
              Visit Store
            </button>
          </div>

          <div className="border border-gray-200 rounded-xl p-5">
            <h2 className="text-base font-bold text-gray-900 font-heading mb-3">Product Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-5">
            <h2 className="text-base font-bold text-gray-900 font-heading mb-3">Product Reviews</h2>
            <div className="pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Username: </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
