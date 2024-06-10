import React from "react";

function MyComponent() {
  return (
    <div className="flex flex-col px-12 pt-5 pb-5 bg-pink-800 max-md:px-5">
      <div className="max-md:pr-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-sm text-white max-md:mt-10">
              <div className="text-xl font-semibold">Elysian</div>
              <a href="" className="mt-3.5">Profile</a>
              <a href="" className="mt-3">Category</a>
              <a href="" className="mt-2">Catalog</a>
              <a href="" className="mt-2">Order Status</a>
            </div>
          </div>
          <a href="" className="flex flex-col w-3/12 ml-5 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-sm text-white grow max-md:mt-10">
              <div className="text-xl font-semibold">
                Category
                <br />
              </div>
              <div className="mt-3.5">Men’s Clothing</div>
              <div className="mt-1.5">Women’s Clothing</div>
              <div className="mt-2">Men’s Bags</div>
              <div className="mt-2">Women’s Bags</div>
              <div className="mt-2">Men’s Shoes</div>
              <div className="mt-2.5">Women’s Shoes</div>
              <div className="mt-2.5">Men’s Accessories</div>
              <div className="mt-2.5">Women’s Accessories</div>
            </div>
          </a>
          <div className="flex flex-col w-3/12 ml-5 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-sm text-white max-md:mt-10">
              <div className="text-xl font-semibold">Order Status</div>
              <div className="mt-5">Unpaid</div>
              <div className="mt-1.5">Packing</div>
              <div className="mt-1.5">Shipped</div>
              <div className="mt-1.5">Order History</div>
            </div>
          </div>
          <div className="flex flex-col w-3/12 ml-5 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col max-md:mt-10">
              <div className="text-xl font-semibold text-white">
                Customer Care
              </div>
              <div className="mt-5 text-sm text-white">+62 XXXX XXXX</div>
              <div className="mt-2.5 text-sm text-white">
                customer.care@elysian.com
              </div>
              <div className="mt-2 text-sm text-white">Help Center</div>
              <div className="mt-10 text-xl font-semibold text-white max-md:mt-10">
                Follow Us
              </div>
              <div className="flex gap-1.5 mt-3.5 max-md:pr-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3599c8381ad651c4c99ee1f93a5d2c8cd088d876d9e0006a8cacc46f3e4d3e1e?"
                  className="shrink-0 aspect-square w-[25px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2414291baf20b94d67f3b453936bbf5dd2400c95b0758d68dfd3704b75c2fa74?"
                  className="shrink-0 my-auto aspect-square w-[22px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7158b29c7cec1c1a386497a96a42a8e73df3a0f35cff09456a2bf3e23e26b51?"
                  className="shrink-0 aspect-square w-[25px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-white bg-opacity-50 border border-white border-opacity-50 border-solid shrink-0 mt-14 max-md:mt-5 max-md:max-w-full" />
      <div className="self-center mt-6 text-base text-center text-white">
        Elysian © 2024
      </div>
    </div>
  );
}

export default MyComponent;