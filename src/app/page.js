"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CarouselCustomNavigation from "@/components/Cslide";
import CommonListing from "@/components/CommonListing";

const CATEGORIES = [
  {
    label: "Electronic",
    path: "/product/listing/kids",
    image: "https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=774&auto=format&fit=crop",
  },
  {
    label: "Sports",
    path: "/product/listing/Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=774&auto=format&fit=crop",
  },
  {
    label: "Stationery",
    path: "/product/listing/Stationery",
    image: "https://plus.unsplash.com/premium_photo-1664105111034-33e24dc90a78?q=80&w=774&auto=format&fit=crop",
  },
  {
    label: "Graduation",
    path: "/product/listing/kids",
    image: "https://plus.unsplash.com/premium_photo-1714265046086-4da004ff8a8d?q=80&w=774&auto=format&fit=crop",
  },
  {
    label: "Merch",
    path: "/product/listing/Merch",
    image: "https://images.unsplash.com/photo-1619646149277-ef710ae426fd?q=80&w=774&auto=format&fit=crop",
  },
  {
    label: "Lifestyle",
    path: "/product/listing/kids",
    image: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=774&auto=format&fit=crop",
  },
];

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getListOfProducts() {
      try {
        const res = await getAllAdminProducts();
        if (res.success) {
          setProducts(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    getListOfProducts();
  }, []);

  const saleProducts = products.filter((item) => item.onSale === "yes").slice(0, 2);

  return (
    <main className="bg-white">
      <div className="flex flex-col items-center justify-between min-h-screen w-full">
        <section className="w-full">
          <CarouselCustomNavigation />

          {/* Categories */}
          <div className="w-full py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading mb-5">
              Shop by Category
            </h2>
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-6 sm:gap-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.label}>
                  <button
                    onClick={() => router.push(cat.path)}
                    className="relative block w-full group focus:outline-none focus:ring-2 focus:ring-brand rounded-xl"
                    aria-label={`Shop ${cat.label}`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      loading="lazy"
                      className="object-cover w-full rounded-xl aspect-square"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 to-transparent flex flex-col items-start justify-end p-2 sm:p-3">
                      <h3 className="text-xs sm:text-sm font-semibold text-white leading-tight">
                        {cat.label}
                      </h3>
                      <span className="mt-1 inline-block bg-brand/70 group-hover:bg-brand rounded-lg px-1.5 py-0.5 text-xs font-medium text-white transition-colors duration-150">
                        Shop Now
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Banner */}
          <div className="w-full py-6 px-4 sm:py-10 sm:px-6 lg:py-14 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2 items-center">
              <div className="flex flex-col">
                <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-brand font-extrabold tracking-tight leading-tight font-heading">
                  Tempat belanja Mahasiswa
                </h1>
                <p className="mb-5 text-sm lg:text-base font-light text-gray-500 leading-relaxed max-w-md">
                  Temukan barang yang anda butuhkan di sini dan dapatkan pengalaman
                  belanja mahasiswa terbaik.
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/product/listing/all-products")}
                  className="inline-flex items-center gap-2 w-fit bg-brand rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-brand-dark transition-colors duration-200"
                >
                  Belanja sekarang
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=600&auto=format&fit=crop&q=60"
                  alt="Student shopping experience"
                  loading="lazy"
                  className="w-full max-w-sm rounded-2xl shadow-lg object-cover aspect-square"
                />
              </div>
            </div>
          </div>

          {/* Sale Section */}
          <div className="w-full py-6 px-4 sm:py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
              <div className="bg-brand rounded-xl p-5 sm:p-6 flex flex-col justify-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-lg sm:text-xl font-bold text-white font-heading">
                    Diskonan Anak Kost-ann!!
                  </h2>
                  <p className="text-brand-50/80 text-sm mt-1 mb-4">Penawaran terbaik buat kamu!</p>
                  <button
                    onClick={() => router.push("/product/listing/all-products")}
                    className="inline-block bg-white rounded-lg px-4 py-2 text-xs uppercase tracking-wide text-brand hover:bg-brand-50 font-bold transition-colors duration-150"
                  >
                    Lihat Promo
                  </button>
                </div>
              </div>
              <div className="lg:col-span-2">
                {saleProducts.length > 0 ? (
                  <ul className="grid grid-cols-2 gap-3">
                    {saleProducts.map((productItem) => (
                      <li
                        onClick={() => router.push(`/product/${productItem._id}`)}
                        className="cursor-pointer group"
                        key={productItem._id}
                      >
                        <div className="rounded-xl overflow-hidden aspect-square bg-gray-50">
                          <img
                            src={productItem.imageUrl}
                            alt={productItem.name}
                            loading="lazy"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="mt-2">
                          <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                            {productItem.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-gray-700">
                            Rp {Number(productItem.price).toLocaleString("id-ID")}{" "}
                            <span className="text-red-600 font-medium">{`(-${productItem.priceDrop}%) Off`}</span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[120px] rounded-xl bg-gray-50 text-gray-400 text-sm">
                    No sale items at the moment
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <CommonListing data={products} title="All Products" loading={loading} />
      </div>
    </main>
  );
}
