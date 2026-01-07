"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect } from "react";

export default function CommonListing({ data }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <section className="bg-white py-6 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-full">
        <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6 lg:gap-6">
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
