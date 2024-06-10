"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";
import { FaPlus, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

function NavItems({ isModalView = false, isAdminView, router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

function NavItemss({ isAuthUser, isAdminView, adminNavOptions, router }) {
  const [isNavItemsOpen, setIsNavItemsOpen] = useState(false);

  const toggleNavItems = () => {
    setIsNavItemsOpen(!isNavItemsOpen);
  };

  return (
    <div className="relative flex items-center justify-center">
      {isAuthUser && isAdminView ? (
        <button onClick={toggleNavItems} className="flex items-center border hover:bg-pink-100">
          <FaPlus className="w-6 h-8 flex items-center text-pink-600" />
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
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
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl items-center flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
            <span className="self-center text-4xl font-poppins font-extrabold whitespace-nowrap text-pink-600">
              Elysian
            </span>
          </div>
          <div className="flex md:order-2 gap-2 items-center">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <FaShoppingCart
                  className="text-3xl pt-1 text-pink-600 cursor-pointer"
                  onClick={() => setShowCartModal(true)}
                />
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  className={
                    "mt-1.5 inline-block bg-pink-600 font-bold rounded-2xl px-3 py-2 text-xs font-bold uppercase tracking-wide text-white"
                  }
                  onClick={() => router.push("/")}
                >
                  Client View
                </button>
              ) : (
                <button
                  onClick={() => router.push("/admin-view")}
                  className={
                    " bg-pink-600 font-poppins mt-1.5 inline-block rounded-2xl px-3 py-2 text-xs font-bold uppercase tracking-wide text-white"
                  }
                >
                  Admin View
                </button>
              )
            ) : null}
            {!isAuthUser ? (
              <button
                onClick={() => router.push("/login")}
                className={
                  "mt-1.5 inline-block bg-pink-600 font-bold rounded-2xl px-5 py-3 text-xs font-bold uppercase tracking-wide text-white"
                }
              >
                Login
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="mt-1.5 inline-block rounded-full bg-pink-600 px-3 py-3 text-xs font-bold uppercase tracking-wide text-white"
                >
                  <FaUser />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                    <a
                      href="/account"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
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
              </div>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems router={router} isModalView={true} isAdminView={isAdminView} />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
