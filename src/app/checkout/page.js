"use client";

import { GlobalContext } from "@/context";
import { fetchAllAddresses } from "@/services/address";
import { createNewOrder } from "@/services/order";
import { callStripeSession } from "@/services/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

export default function Checkout() {
  const {
    cartItems,
    user,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  async function getAllAddresses() {
    const res = await fetchAllAddresses(user?._id);

    if (res.success) {
      setAddresses(res.data);
    }
  }

  useEffect(() => {
    if (user !== null) getAllAddresses();
  }, [user]);

  useEffect(() => {
    async function createFinalOrder() {
      const isStripe = JSON.parse(localStorage.getItem("stripe"));

      if (
        isStripe &&
        params.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0
      ) {
        setIsOrderProcessing(true);
        const getCheckoutFormData = JSON.parse(
          localStorage.getItem("checkoutFormData")
        );

        const createFinalCheckoutFormData = {
          user: user?._id,
          shippingAddress: getCheckoutFormData.shippingAddress,
          orderItems: cartItems.map((item) => ({
            qty: 1,
            product: item.productID,
          })),
          paymentMethod: "Stripe",
          totalPrice: cartItems.reduce(
            (total, item) => item.productID.price + total,
            0
          ),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };

        const res = await createNewOrder(createFinalCheckoutFormData);

        if (res.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          toast.success(res.message, {
            position: "top-right",
          });
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(false);
          toast.error(res.message, {
            position: "top-right",
          });
        }
      }
    }

    createFinalOrder();
  }, [params.get("status"), cartItems]);

  function handleSelectedAddress(getAddress) {
    if (getAddress._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });

      return;
    }

    setSelectedAddress(getAddress._id);
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        fullName: getAddress.fullName,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
        address: getAddress.address,
      },
    });
  }

  async function handleCheckout() {
    const stripe = await stripePromise;

    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "idr",
        product_data: {
          images: [item.productID.imageUrl],
          name: item.productID.name,
        },
        unit_amount: item.productID.price * 100,
      },
      quantity: 1,
    }));

    const res = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });

    console.log(error);
  }

  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        router.push("/orders");
      }, [2000]);
    }
  }, [orderSuccess]);

  if (orderSuccess) {
    return (
      <section className="min-h-screen bg-gray-200">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-screen-xl px-0 mx-auto mt-6 sm:mt-8">
            <div className="bg-white shadow">
              <div className="flex flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
                <h1 className="font-bold text-[#A02F58] text-base sm:text-lg lg:text-xl">
                  Pembayaran Berhasil!
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isOrderProcessing) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <PulseLoader
          color={"#000000"}
          loading={isOrderProcessing}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 py-4 sm:px-6 lg:grid-cols-2 lg:px-10 xl:px-20 sm:py-6 lg:py-8">
        <div className="px-2 pt-4 sm:px-4 sm:pt-8">
          <p className="font-bold font-poppins text-2xl sm:text-3xl text-[#A02F58]">
            Cart Summary
          </p>
          <div className="px-2 py-4 mt-6 space-y-2 bg-white border rounded-lg sm:px-5 sm:mt-8 sm:space-y-3">
            {cartItems && cartItems.length ? (
              cartItems.map((item) => (
                <div
                  className="flex flex-col gap-2 bg-white rounded-lg sm:flex-row sm:gap-3"
                  key={item._id}
                >
                  <img
                    src={item && item.productID && item.productID.imageUrl}
                    alt="Cart Item"
                    className="object-cover object-center w-20 h-20 m-2 border rounded-md sm:h-24 sm:w-28 sm:m-0"
                  />
                  <div className="flex flex-col w-full px-2 py-2 sm:px-4 sm:py-4">
                    <span className="text-xs font-medium text-gray-600 sm:text-sm">
                      Subtotal
                    </span>
                    <span className="text-sm font-bold sm:text-base">
                      {item && item.productID && item.productID.name}
                    </span>
                    <span className="text-sm font-semibold sm:text-base">
                      Rp {item && item.productID && item.productID.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm sm:text-base">Your cart is empty</div>
            )}
          </div>
        </div>
        <div className="px-2 pt-4 sm:px-4 sm:pt-8 bg-gray-50 lg:mt-0">
          <p className="text-2xl font-bold text-pink-700 sm:text-3xl">Address details</p>
          <p className="text-xs font-bold text-gray-400 sm:text-sm">
            Complete your order by selecting address below
          </p>
          <div className="w-full mt-4 mb-0 ml-0 mr-0 space-y-3 sm:mt-6 sm:space-y-4">
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  onClick={() => handleSelectedAddress(item)}
                  key={item._id}
                  className={`border p-3 sm:p-6 bg-[#A02F58] text-white rounded-lg font-semibold text-sm sm:text-base ${
                    item._id === selectedAddress
                      ? "border-red-900 rounded-xl border-2"
                      : ""
                  }`}
                >
                  <p className="text-xs sm:text-sm">Name : {item.fullName}</p>
                  <p className="text-xs sm:text-sm">Address : {item.address}</p>
                  <p className="text-xs sm:text-sm">City : {item.city}</p>
                  <p className="text-xs sm:text-sm">Country : {item.country}</p>
                  <p className="text-xs sm:text-sm">PostalCode : {item.postalCode}</p>
                  <button className="mt-3 sm:mt-5 mr-3 sm:mr-5 inline-block bg-white border border-[#A02F58] rounded-2xl text-pink-700 px-3 sm:px-5 py-2 sm:py-3 text-xs font-semibold uppercase tracking-wide hover:bg-blue-600 hover:text-white transition">
                    {item._id === selectedAddress
                      ? "Selected Address"
                      : "Select Address"}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs sm:text-sm">No addresses added</p>
            )}
          </div>
          <button
            onClick={() => router.push("/account")}
            className="flex items-center gap-2 mt-4 sm:mt-5 mr-3 sm:mr-5 bg-[#A02F58] rounded-xl text-white px-3 sm:px-5 py-2 sm:py-3 text-xs font-medium uppercase tracking-wide"
          >
            {" "}
            <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            Add new address
          </button>
          <div className="py-2 mt-4 border-t border-b sm:py-3 sm:mt-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <p className="text-xs font-medium text-gray-900 sm:text-sm">Subtotal</p>
              <p className="text-sm font-bold text-gray-900 sm:text-lg">
                Rp
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <p className="text-xs font-medium text-gray-900 sm:text-sm">Shipping</p>
              <p className="text-sm font-bold text-gray-900 sm:text-lg">Free</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium text-gray-900 sm:text-sm">Total</p>
              <p className="text-sm font-bold text-gray-900 sm:text-lg">
                Rp
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="pb-4 sm:pb-10">
              <button
                disabled={
                  (cartItems && cartItems.length === 0) ||
                  Object.keys(checkoutFormData.shippingAddress).length === 0
                }
                onClick={handleCheckout}
                className="disabled:opacity-50 mt-4 sm:mt-5 mr-3 sm:mr-5 w-full inline-block bg-[#A02F58] rounded-xl text-white px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-wide"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
