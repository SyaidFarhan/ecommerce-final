"use client";

import { useRouter } from "next/navigation";
import { IoLocationSharp } from "react-icons/io5";
import ProductButton from "../ProductButtons";

function StarRating({ rating = 4.5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.204 3.713a1 1 0 00.95.69h3.905c.969 0 1.371 1.24.588 1.81l-3.158 2.3a1 1 0 00-.364 1.118l1.204 3.713c.3.921-.755 1.688-1.54 1.118l-3.158-2.3a1 1 0 00-1.176 0l-3.158 2.3c-.784.57-1.839-.197-1.54-1.118l1.204-3.713a1 1 0 00-.364-1.118l-3.158-2.3c-.783-.57-.38-1.81.588-1.81h3.905a1 1 0 00.95-.69l1.204-3.713z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-0.5">{rating}</span>
    </div>
  );
}

export default function ProductTile({ item }) {
  const router = useRouter();

  const discountedPrice = item.onSale === "yes"
    ? (item.price - item.price * (item.priceDrop / 100)).toFixed(0)
    : null;

  return (
    <div className="w-full flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-md hover:border-brand transition-all duration-200 cursor-pointer">
      <div onClick={() => router.push(`/product/${item._id}`)}>
        {/* Image */}
        <div className="relative w-full overflow-hidden aspect-square bg-gray-50">
          {item.onSale === "yes" && (
            <div className="absolute top-2 left-2 z-10 px-2 py-0.5 text-xs font-semibold text-white bg-brand rounded-full">
              Sale
            </div>
          )}
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="mb-1 text-sm font-semibold text-gray-900 line-clamp-2 leading-snug font-heading">
            {item.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-1.5">
            {item.onSale === "yes" ? (
              <>
                <span className="text-sm font-bold text-brand">
                  Rp {Number(discountedPrice).toLocaleString("id-ID")}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  Rp {Number(item.price).toLocaleString("id-ID")}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-gray-900">
                Rp {Number(item.price).toLocaleString("id-ID")}
              </span>
            )}
          </div>

          {/* Stars */}
          <div className="mb-1.5">
            <StarRating rating={4.5} />
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-1">
            <IoLocationSharp className="w-3 h-3 text-brand flex-shrink-0" aria-hidden="true" />
            <p className="text-xs text-gray-500 truncate">{item.deliveryInfo}</p>
          </div>
        </div>
      </div>

      <div className="px-3 pb-3 mt-auto">
        <ProductButton item={item} />
      </div>
    </div>
  );
}
