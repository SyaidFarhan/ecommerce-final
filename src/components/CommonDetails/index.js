"use client";

import { GlobalContext } from "@/context";
import { useContext } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { addToCart } from "@/services/cart";
import Notification from "../Notification";

export default function CommonDetails({ item }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

  async function handleAddToCart(getItem) {
    setComponentLevelLoader({ loading: true, id: "" });

    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  }

  return (
    <section>
      <div className="flex flex-col max-w-[900px] p-4 mx-auto">
        <div className="flex gap-16 p-4 mb-10 lg:flex-row">
          {/* Image Section */}
          <div className="flex-shrink-0 max-w-[350px]">
            <img className="" src={item.imageUrl} alt={item.name} />
          </div>
          <div className="w-full p-2 mx-auto ">
            {/* Product Title */}
            <h1 className="mb-2 text-3xl font-bold">{item.name}</h1>

            {/* Ratings and Sales */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <span className="text-yellow-500">★★★★☆</span>
                <span className="ml-2 text-gray-600">4.5</span>
              </div>
              <div className="mx-2 text-gray-600">|</div>
              <div className="text-gray-600">241 Ratings</div>
              <div className="mx-2 text-gray-600">|</div>
              <div className="text-gray-600">315 Sold</div>
            </div>

            {/* Price */}
            <div className="mb-4 text-2xl font-bold text-red-500">
              Rp {item.price.toLocaleString("id-ID")}
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Quantity :</label>
              <input
                type="number"
                className="w-20 p-1 border rounded"
                defaultValue={1}
                min={1}
                
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-4">
              <button className="flex-grow font-bold text-pink-700 bg-white border-4 border-pink-700 py-1/4 rounded-3xl" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
              <button className="flex-grow w-1/4 py-2 font-bold text-white bg-pink-700 rounded-3xl">
                Buy Now
              </button>
              <button className="text-pink-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Details Section */}
        </div>

        <div className="items-center flex-grow w-full mt-10 justify-items-center">
          <div className="p-1 px-4 mb-4 pb-2 border border-[3px] border-pink-700 rounded-md">
            <h2 className="mb-2 text-xl font-bold">Store Information</h2>
            <div>
              <button className="px-4 py-2 font-bold bg-gray-200 rounded">
                Visit Store
              </button>
            </div>
          </div>
          <div className="mt-4 p-1 px-4 mb-4 border border-[3px] border-pink-700 rounded-md">
            <h2 className="mb-2 text-lg font-bold">Product Description:</h2>
            <p> {item.description}</p>
          </div>
          <div className="mt-4 p-1 px-4 mb-4 border border-[3px] border-pink-700 rounded-md">
            <h2 className="mb-2 text-lg font-bold">Product Reviews:</h2>
            <div className="pt-4 border-t border-gray-200">
              <p className="mb-2">
                <strong>Username:</strong> Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
