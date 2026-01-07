import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-28 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-4 sm:pb-6 bg-[#A02F58]">
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-6">
          {/* Elysian Section */}
          <div className="flex flex-col">
            <div className="flex flex-col text-xs sm:text-sm text-white">
              <div className="text-lg sm:text-xl font-semibold">Elysian</div>
              <a href="#" className="mt-3 sm:mt-4 hover:opacity-80 transition text-white text-xs sm:text-sm">
                Profile
              </a>
              <a href="#" className="mt-2 sm:mt-3 hover:opacity-80 transition text-white text-xs sm:text-sm">
                Category
              </a>
              <a href="#" className="mt-2 sm:mt-3 hover:opacity-80 transition text-white text-xs sm:text-sm">
                Catalog
              </a>
              <a href="#" className="mt-2 sm:mt-3 hover:opacity-80 transition text-white text-xs sm:text-sm">
                Order Status
              </a>
            </div>
          </div>

          {/* Category Section */}
          <div className="flex flex-col">
            <div className="flex flex-col text-xs sm:text-sm text-white">
              <div className="text-lg sm:text-xl font-semibold">Category</div>
              <div className="mt-3 sm:mt-4 hover:opacity-80 transition">Men's Clothing</div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">Women's Clothing</div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">Men's Bags</div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">Women's Bags</div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">Men's Shoes</div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">Women's Shoes</div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">Men's Accessories</div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">Women's Accessories</div>
            </div>
          </div>

          {/* Order Status Section */}
          <div className="flex flex-col">
            <div className="flex flex-col text-xs sm:text-sm text-white">
              <div className="text-lg sm:text-xl font-semibold">Order Status</div>
              <div className="mt-3 sm:mt-4 hover:opacity-80 transition">Unpaid</div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">Packing</div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">Shipped</div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">Order History</div>
            </div>
          </div>

          {/* Customer Care Section */}
          <div className="flex flex-col">
            <div className="flex flex-col text-xs sm:text-sm text-white">
              <div className="text-lg sm:text-xl font-semibold">Customer Care</div>
              <div className="mt-3 sm:mt-4 hover:opacity-80 transition">+62 XXXX XXXX</div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">
                customer.care@elysian.com
              </div>
              <div className="mt-2 sm:mt-3 hover:opacity-80 transition">Help Center</div>
              
              {/* Social Media Section */}
              <div className="text-lg sm:text-xl font-semibold text-white mt-6 sm:mt-8">
                Follow Us
              </div>
              <div className="flex gap-3 sm:gap-4 mt-3 sm:mt-4">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3599c8381ad651c4c99ee1f93a5d2c8cd088d876d9e0006a8cacc46f3e4d3e1e?"
                  alt="Facebook"
                  className="shrink-0 aspect-square w-6 sm:w-7 hover:opacity-80 transition cursor-pointer"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2414291baf20b94d67f3b453936bbf5dd2400c95b0758d68dfd3704b75c2fa74?"
                  alt="Instagram"
                  className="shrink-0 aspect-square w-6 sm:w-7 hover:opacity-80 transition cursor-pointer"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7158b29c7cec1c1a386497a96a42a8e73df3a0f35cff09456a2bf3e23e26b51?"
                  alt="Twitter"
                  className="shrink-0 aspect-square w-6 sm:w-7 hover:opacity-80 transition cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white bg-opacity-50 border border-white border-opacity-50 border-solid shrink-0 mt-6 sm:mt-8 md:mt-10 lg:mt-14 w-full" />
      
      {/* Copyright */}
      <div className="self-center mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-center text-white">
        Elysian © 2024
      </div>
    </div>
  );
}
