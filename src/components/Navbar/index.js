"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";
import { FaPlus, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

function NavItems({ isModalView = false, isAdminView, router, isAuthUser, user, handleLogout, setShowNavModal }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                className="block py-2 pl-3 pr-4 text-gray-900 rounded cursor-pointer md:p-0"
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  if (isModalView) setShowNavModal(false);
                }}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="block py-2 pl-3 pr-4 text-gray-900 rounded cursor-pointer md:p-0"
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  if (isModalView) setShowNavModal(false);
                }}
              >
                {item.label}
              </li>
            ))}
      </ul>

      {/* Mobile Login/SignUp Buttons */}
      {isModalView && !isAuthUser && (
        <div className="flex flex-col gap-2 p-4 mt-4 border-t border-gray-100 md:hidden">
          <button
            onClick={() => {
              router.push("/login");
              setShowNavModal(false);
            }}
            className="w-full bg-white border-2 text-[#A02F58] border-[#A02F58] font-bold rounded-full px-3 py-1.5 text-sm uppercase tracking-wide hover:bg-[#A02F58] hover:text-white transition"
          >
            Login
          </button>
          <button
            onClick={() => {
              router.push("/register");
              setShowNavModal(false);
            }}
            className="w-full bg-[#A02F58] font-bold rounded-full px-3 py-1.5 text-sm uppercase tracking-wide text-white hover:bg-[#8a234a] transition"
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Mobile User Dropdown */}
      {isModalView && isAuthUser && (
        <div className="flex flex-col p-4 mt-4 border-t border-gray-100 md:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-[#A02F58] font-bold rounded-full px-3 py-1.5 text-sm uppercase tracking-wide text-white hover:bg-[#8a234a] transition flex items-center justify-between"
          >
            Account
            <svg className={`w-4 h-4 transition ${isDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="flex flex-col gap-1 p-2 mt-2 rounded-md bg-gray-50">
              <a
                href="/account"
                onClick={() => setShowNavModal(false)}
                className="block px-3 py-2 text-sm text-gray-800 transition rounded hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="/orders"
                onClick={() => setShowNavModal(false)}
                className="block px-3 py-2 text-sm text-gray-800 transition rounded hover:bg-gray-100"
              >
                Orders
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-sm text-gray-800 transition rounded cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleLogout();
                  setShowNavModal(false);
                }}
              >
                Log Out
              </a>
            </div>
          )}
        </div>
      )}
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
        <button
          onClick={toggleNavItems}
          className="flex items-center border hover:bg-pink-100"
        >
          <FaPlus className="w-6 h-8 flex items-center text-[#A02F58]" />
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
     <nav className="fixed top-0 left-0 z-20 w-full px-3 bg-white border-b border-gray-200 sm:px-4 md:px-6 lg:px-8" role="navigation" aria-label="Main Navigation">
  <div className="flex flex-wrap items-center justify-between w-full p-1.5 sm:p-2 md:p-3 lg:p-4">
    <div onClick={() => router.push("/")} className="flex items-center flex-shrink-0 cursor-pointer">
      <img
        src="https://github.com/zulfiasyalwa4/assets/blob/main/Elysian.svg?raw=true"
        className="h-6 sm:h-7 md:h-8"
        alt="Logo"
      />
    </div>
    <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 md:order-2 flex-wrap">
      {!isAdminView && isAuthUser ? (
        <Fragment>
          <FaShoppingCart
            className="text-base sm:text-lg md:text-xl pt-0.5 text-[#A02F58] cursor-pointer hover:opacity-80 transition"
            onClick={() => setShowCartModal(true)}
          />
        </Fragment>
      ) : null}
      {user?.role === "admin" ? (
        isAdminView ? (
          <button
            className="inline-block bg-[#A02F58] font-bold rounded-2xl px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-2 text-xs uppercase tracking-wide text-white whitespace-nowrap hover:bg-[#8a234a] transition"
            onClick={() => router.push("/")}
          >
            Client
          </button>
        ) : (
          <button
            onClick={() => router.push("/admin-view")}
            className="inline-block bg-[#A02F58] font-bold rounded-2xl px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-2 text-xs uppercase tracking-wide text-white whitespace-nowrap hover:bg-[#8a234a] transition"
          >
            Admin
          </button>
        )
      ) : null}
      {!isAuthUser ? (
        <Fragment>
          <button
            onClick={() => router.push("/login")}
            className="hidden sm:inline-block bg-white border-2 text-[#A02F58] border-[#A02F58] font-bold rounded-full px-2 sm:px-3 md:px-6 py-0.5 sm:py-1 md:py-1.5 text-xs uppercase tracking-wide whitespace-nowrap hover:bg-[#A02F58] hover:text-white transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="hidden sm:inline-block bg-[#A02F58] font-bold rounded-full px-2 sm:px-3 md:px-6 py-0.5 sm:py-1 md:py-1.5 text-xs uppercase tracking-wide text-white whitespace-nowrap hover:bg-[#8a234a] transition"
          >
            Sign Up
          </button>
        </Fragment>
      ) : (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="inline-block rounded-full bg-[#A02F58] px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#8a234a] transition"
          >
            <FaUser className="text-xs sm:text-sm md:text-base" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 z-50 w-32 mt-2 bg-white border border-gray-200 rounded-md shadow-lg sm:w-40 md:w-48">
              <a
                href="/account"
                className="block px-3 py-2 text-xs text-gray-800 transition sm:text-sm hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="/orders"
                className="block px-3 py-2 text-xs text-gray-800 transition sm:text-sm hover:bg-gray-100"
              >
                Orders
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-xs text-gray-800 transition cursor-pointer sm:text-sm hover:bg-gray-100"
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
        className="inline-flex items-center p-1.5 sm:p-2 text-xs sm:text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
        aria-controls="navbar-sticky"
        aria-expanded="false"
        onClick={() => setShowNavModal(true)}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
            isAuthUser={isAuthUser}
            user={user}
            handleLogout={handleLogout}
            setShowNavModal={setShowNavModal}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
