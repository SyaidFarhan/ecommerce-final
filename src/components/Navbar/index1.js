"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";
import { FaPlus, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useState } from "react";

function NavItems({ isModalView = false, isAdminView, router }) {
  const toggleNavItems = () => {
    setIsNavItemsOpen(!isNavItemsOpen);
  };

  return (
    <div className="relative">
      {isAuthUser && isAdminView ? (
        <button onClick={toggleNavItems} className="flex items-center border hover:bg-pink-100">
          <FaPlus className="w-6 h-6 text-pink-600" />
        </button>
      ) : null}

      {isNavItemsOpen && (
        <div className="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg md:w-56 lg:w-64">
          <ul className="flex flex-col">
            {isAdminView &&
              adminNavOptions.map((item) => (
                <li
                  className="block px-4 py-2 text-gray-800 rounded cursor-pointer hover:bg-gray-100 md:px-6 lg:px-8 md:text-lg lg:text-xl"
                  key={item.id}
                  onClick={() => router.push(item.path)}
                >
                  {item.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}



export default function Navbar() {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal
  } = useContext(GlobalContext);

  const pathName = usePathname();
  const router = useRouter();

  console.log(currentUpdatedProduct, "navbar");

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null);
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathName.includes("admin-view");

  return (
    <header className="flex items-center p-4 px-2 bg-white shadow-md justify-evenly">
      <div className="pb-1 text-2xl font-bold text-pink-600">Elysian</div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search in Elysian..."
          className="px-4 py-2 border rounded-full outline-none w-[50vw] focus:ring-1 focus:ring-pink-600"
        />
        <NavItems
          isAuthUser={isAuthUser}
          isAdminView={isAdminView}
          adminNavOptions={adminNavOptions}
          router={router}
        />
        <FaShoppingCart className="text-2xl text-pink-600 cursor-pointer" />
        <FaHeart className="text-2xl text-pink-600 cursor-pointer" />

        {isAdminView ? (
          <button
            className="font-semibold text-white bg-pink-600 border rounded-full hover:text-pink-600 hover:bg-pink-100 md:px-4 md:py-2 lg:text-lg md:text-sm lg:px-4 lg:py-1"
            onClick={() => router.push("/")}
          >
            Client View
          </button>
        ) : (
          <button
            className="font-semibold text-white bg-pink-600 border rounded-full hover:text-pink-600 hover:bg-pink-100 md:px-4 md:py-2 lg:text-lg md:text-sm lg:px-4 lg:py-1"
            onClick={() => router.push("/admin-view")}
          >
            Admin View
          </button>
        )}

        <div className="relative">
          {isAuthUser ? (
            <button onClick={toggleDropdown} className="flex items-center border border-pink-600 rounded-full hover:bg-pink-100">
              <img src={user?.profileImage || ""} alt="Profile" className="w-10 h-10 rounded-full" />
            </button>
          ) : (
            <Fragment>
              <button
                className="px-4 py-1 font-semibold text-pink-600 border-2 border-pink-600 rounded-full hover:bg-pink-100"
                onClick={() => router.push("/login")}
              >
                Log In
              </button>
            </Fragment>
          )}

          {isDropdownOpen && (
            <div className="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                View
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Log Out
              </a>
            </div>
          )}
            <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
         {showCartModal && <CartModal />}
        </div>
      </div>
    </header>
  );
}
