"use client";

import { useRouter } from "next/navigation";
import ProductTile from "./ProductTile";
import { useEffect } from "react";

function SkeletonCard() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-100">
      <div className="skeleton aspect-square w-full" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-8 w-full rounded-lg mt-2" />
      </div>
    </div>
  );
}

export default function CommonListing({ data, title = "All Products", loading = false }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          {title && (
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading mb-6">
              {title}
            </h2>
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {[...Array(12)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="bg-white py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl text-center">
          <svg className="mx-auto w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-gray-500 text-base font-medium">No products available</p>
          <p className="text-gray-400 text-sm mt-1">Check back later for new arrivals.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {title && (
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading mb-6">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data.map((item) => (
            <ProductTile key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
