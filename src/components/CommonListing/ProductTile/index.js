"use client";

import { useRouter } from "next/navigation";
import { IoLocationSharp } from "react-icons/io5";
import ProductButton from "../ProductButtons";

export default function ProductTile({ item }) {
  const router = useRouter();
  
  return (
    <div className="w-full max-w-xs p-4 mx-auto border-2 border-pink-600 rounded-lg group">
        <div onClick={() => router.push(`/product/${item._id}`)} className="cursor-pointer">
            <div className="relative w-full mb-4 overflow-hidden h-52">
                {item.onSale == 'yes' && (
                    <div className="absolute top-0 left-0 z-10 px-2 py-1 mt-5 ml-4 text-xs text-white bg-pink-600 rounded-full">
                        Sale
                    </div>
                )}
                <img src={item.imageUrl} alt="product image" className="object-cover object-center w-full h-full transition-all duration-300 group-hover:scale-125" />
            </div>
            <h3 className="mb-2 text-lg font-bold">{item.name}</h3>
            <div className="flex mb-2">
      <p
        className={`mr-3 text-sm font-semibold ${
          item.onSale === "yes" ? "line-through" : ""
        }`}
      >{`Rp ${item.price}`}</p>
      {item.onSale === "yes" ? (
        <p className="mr-3 text-sm font-semibold text-red-700">{`Rp ${(
          item.price -
          item.price * (item.priceDrop / 100)
        ).toFixed(2)}`}</p>
      ) : null}
     
    </div>
            <div className="flex items-center mb-2">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.204 3.713a1 1 0 00.95.69h3.905c.969 0 1.371 1.24.588 1.81l-3.158 2.3a1 1 0 00-.364 1.118l1.204 3.713c.3.921-.755 1.688-1.54 1.118l-3.158-2.3a1 1 0 00-1.176 0l-3.158 2.3c-.784.57-1.839-.197-1.54-1.118l1.204-3.713a1 1 0 00-.364-1.118l-3.158-2.3c-.783-.57-.38-1.81.588-1.81h3.905a1 1 0 00.95-.69l1.204-3.713z" />
                        </svg>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <IoLocationSharp className="w-4 h-4 text-pink-600" />
                <p className="text-sm text-gray-500">{item.deliveryInfo}</p>
            </div>
        </div>
        <ProductButton item={item} />
    </div>
);
}
