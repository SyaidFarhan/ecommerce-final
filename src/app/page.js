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
    <main>
    <div className="flex min-h-screen flex-col items-center justify-between px-28 py-10">
      <section className="">
        <CarouselCustomNavigation />
        {/* category */}
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-4">
          <div className="text-center">
          </div>
          <ul className=" flex gap-4 mt-8 ">
            <li>
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=1973&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full aspect-square rounded-lg"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-lg font-medium text-white">Electronic</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className="inline-block bg-[#A02F58]/50 rounded-lg  px-2 py-1 text-xs font-medium uppercase tracking-wide text-white"
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
                  className="object-cover w-full aspect-square rounded-lg"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-lg font-medium text-white">Sports</h3>
                  <button
                    onClick={() => router.push("/product/listing/women")}
                    className="inline-block bg-[#A02F58]/50 rounded-lg  px-2 py-1 text-xs font-medium uppercase tracking-wide text-white"
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
                  className="object-cover w-full aspect-square rounded-lg"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-lg font-medium text-white">Stationery</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className=" inline-block bg-[#A02F58]/50 rounded-lg  px-2 py-1 text-xs font-medium uppercase tracking-wide text-white"
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
                  className="object-cover w-full aspect-square rounded-lg"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-lg font-medium text-white">Graduation</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className=" inline-block bg-[#A02F58]/50 rounded-lg  px-2 py-1 text-xs font-medium uppercase tracking-wide text-white"
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
                  className="object-cover w-full aspect-square rounded-lg"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-lg font-medium text-white">Merch</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className=" inline-block bg-[#A02F58]/50 rounded-lg  px-2 py-1 text-xs font-medium uppercase tracking-wide text-white"
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
                  className="object-cover w-full aspect-square rounded-lg"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-lg font-medium text-white">Lifestyle</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className=" inline-block bg-[#A02F58]/50 rounded-lg  px-2 py-1 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* banner */}
        <div className="grid max-w-screen-xl px-4 py-8 mx-suto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl text-[#A02F58] font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Tempat belanja Mahasiswa
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Temukan barang yang anda butuhkan di sini dan dapatkan pengalaman
              belanja mahasiswa terbaik.
            </p>

            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="mt-1.5 inline-block bg-[#A02F58] rounded-xl  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
              Belanja sekarang
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D"
              alt="Explore Shop Collection"
            />
          </div>
        </div>
        
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-[#A02F58] rounded place-content-center sm:p-8  rounded-l-xl">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <div>
                  <h2 className="text-xl font-bold text-white sm:text-3xl">
                    Diskonan Anak Kost-ann!!
                  </h2>
                </div>
                <button
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-1.5 inline-block bg-white  rounded-xl  px-5 py-3 text-xs uppercase tracking-wide text-[#A02F58] hover:bg-[#EA3A7A] hover:scale-105 hover:text-white font-bold ring-[#EA3A7A]"
                >
                  click
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
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
                              className="object-cover w-full rounded aspect-square rounded-lg"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className="font-medium text-gray-900">
                              {productItem.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-800">
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
