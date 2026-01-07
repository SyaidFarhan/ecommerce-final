"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CarouselCustomNavigation from "@/components/Cslide";
import CommonListing from "@/components/CommonListing";


export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllAdminProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  return (
    <main className="bg-white">
    <div className="flex flex-col items-center justify-between min-h-screen w-full">
      <section className="w-full">
        <CarouselCustomNavigation />
        {/* category */}
        <div className="w-full py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8">
          <div className="text-center">
          </div>
          <ul className="grid grid-cols-2 gap-2 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-3 md:gap-4 sm:mt-8">
            <li>
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=1973&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full rounded-lg aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-3 sm:p-4 lg:p-6">
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white">Electronic</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className="inline-block bg-[#A02F58]/50 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium uppercase tracking-wide text-white mt-1"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full rounded-lg aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-3 sm:p-4 lg:p-6">
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white">Sports</h3>
                  <button
                    onClick={() => router.push("/product/listing/Sports")}
                    className="inline-block bg-[#A02F58]/50 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium uppercase tracking-wide text-white mt-1"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>

            <li>
              <div className="relative block group">
                <img
                  src="https://plus.unsplash.com/premium_photo-1664105111034-33e24dc90a78?q=80&w=1887&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full rounded-lg aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-3 sm:p-4 lg:p-6">
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white">Stationery</h3>
                  <button
                    onClick={() => router.push("/product/listing/Stationery")}
                    className="inline-block bg-[#A02F58]/50 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium uppercase tracking-wide text-white mt-1"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            
            <li>
              <div className="relative block group">
                <img
                  src="https://plus.unsplash.com/premium_photo-1714265046086-4da004ff8a8d?q=80&w=2070&auto=auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full rounded-lg aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-3 sm:p-4 lg:p-6">
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white">Graduation</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className="inline-block bg-[#A02F58]/50 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium uppercase tracking-wide text-white mt-1"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1619646149277-ef710ae426fd?q=80&w=2070&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full rounded-lg aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-3 sm:p-4 lg:p-6">
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white">Merch</h3>
                  <button
                    onClick={() => router.push("/product/listing/Merch")}
                    className="inline-block bg-[#A02F58]/50 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium uppercase tracking-wide text-white mt-1"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=1936&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full rounded-lg aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-3 sm:p-4 lg:p-6">
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white">Lifestyle</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className="inline-block bg-[#A02F58]/50 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium uppercase tracking-wide text-white mt-1"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* banner */}
        <div className="w-full py-6 px-4 sm:py-10 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#A02F58] font-extrabold tracking-tight leading-tight">
                Tempat belanja Mahasiswa
              </h1>
              <p className="mb-4 text-xs sm:text-sm lg:text-base font-light text-gray-600">
                Temukan barang yang anda butuhkan di sini dan dapatkan pengalaman
                belanja mahasiswa terbaik.
              </p>

              <button
                type="button"
                onClick={() => router.push("/product/listing/all-products")}
                className="mt-2 inline-block w-fit bg-[#A02F58] rounded-xl px-4 sm:px-5 py-2 sm:py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-[#8a234a] transition"
              >
                Belanja sekarang
              </button>
            </div>
            <div className="items-center justify-center hidden lg:flex">
              <img
                src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D"
                alt="Explore Shop Collection"
                className="w-full max-w-sm"
              />
            </div>
          </div>
        </div>
        
        <div className="w-full py-6 px-4 sm:py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="bg-[#A02F58] rounded-lg p-4 sm:p-5 lg:p-6 flex flex-col justify-center">
              <div className="text-center lg:text-left">
                <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-white">
                  Diskonan Anak Kost-ann!!
                </h2>
                <button
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-3 inline-block bg-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs uppercase tracking-wide text-[#A02F58] hover:bg-[#EA3A7A] hover:text-white font-bold transition"
                >
                  Lihat Promo
                </button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <ul className="grid grid-cols-2 gap-2 sm:gap-3">
                {products && products.length
                  ? products
                      .filter((item) => item.onSale === "yes")
                      .splice(0, 2)
                      .map((productItem) => (
                        <li
                          onClick={() =>
                            router.push(`/product/${productItem._id}`)
                          }
                          className="cursor-pointer"
                          key={productItem._id}
                        >
                          <div>
                            <img
                              src={productItem.imageUrl}
                              alt="Sale Product Item"
                              className="object-cover w-full rounded-lg aspect-square"
                            />
                          </div>
                          <div className="mt-2 sm:mt-3">
                            <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                              {productItem.name}
                            </h3>
                            <p className="mt-1 text-xs sm:text-sm text-gray-800">
                              Rp{productItem.price}{" "}
                              <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                            </p>
                          </div>
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </section>
     
    </div>
    <CommonListing data={products} />
    </main>
  );
}
