"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";

function NavItems({ isModalView = false, isAdminView, router, isAuthUser, user, handleLogout, setShowNavModal, currentPath }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : "hidden"}`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {(isAdminView ? adminNavOptions : navOptions).map((item) => (
          <li
            className={`block py-2 pl-3 pr-4 rounded cursor-pointer md:p-0 transition-colors duration-150 ${
              currentPath === item.path
                ? "text-brand font-semibold"
                : "text-gray-700 hover:text-brand"
            }`}
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
            onClick={() => { router.push("/login"); setShowNavModal(false); }}
            className="w-full bg-white border-2 text-brand border-brand font-bold rounded-full px-3 py-2 text-sm uppercase tracking-wide hover:bg-brand hover:text-white transition-colors duration-200"
          >
            Login
          </button>
          <button
            onClick={() => { router.push("/register"); setShowNavModal(false); }}
            className="w-full bg-brand font-bold rounded-full px-3 py-2 text-sm uppercase tracking-wide text-white hover:bg-brand-dark transition-colors duration-200"
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
            className="w-full bg-brand font-bold rounded-full px-3 py-2 text-sm uppercase tracking-wide text-white hover:bg-brand-dark transition-colors duration-200 flex items-center justify-between"
          >
            Account
            <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="flex flex-col gap-1 p-2 mt-2 rounded-lg bg-gray-50 animate-fadeIn">
              <a href="/account" onClick={() => setShowNavModal(false)} className="block px-3 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150">Profile</a>
              <a href="/orders" onClick={() => setShowNavModal(false)} className="block px-3 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-150">Orders</a>
              <button onClick={() => { handleLogout(); setShowNavModal(false); }} className="block w-full text-left px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors duration-150">
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    if (pathName !== "/admin-view/add-product" && currentUpdatedProduct !== null) {
      setCurrentUpdatedProduct(null);
    }
  }, [pathName]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathName.includes("admin-view");

  return (
    <>
      <nav
        className="fixed top-0 left-0 z-20 w-full bg-white border-b border-gray-200 shadow-sm"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="flex flex-wrap items-center justify-between w-full px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-brand rounded"
            aria-label="Go to homepage"
          >
            <img
              src="https://github.com/zulfiasyalwa4/assets/blob/main/Elysian.svg?raw=true"
              className="h-7 sm:h-8"
              alt="Elysian Store"
            />
          </button>

          {/* Desktop Nav */}
          <NavItems
            router={router}
            isAdminView={isAdminView}
            currentPath={pathName}
          />

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:order-2">
            {/* Cart icon */}
            {!isAdminView && isAuthUser && (
              <button
                aria-label="Open cart"
                onClick={() => setShowCartModal(true)}
                className="p-1.5 text-brand hover:text-brand-dark transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand rounded"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            )}

            {/* Admin/Client toggle */}
            {user?.role === "admin" && (
              isAdminView ? (
                <button
                  className="bg-brand font-bold rounded-xl px-3 py-1.5 text-xs uppercase tracking-wide text-white hover:bg-brand-dark transition-colors duration-200"
                  onClick={() => router.push("/")}
                >
                  Client
                </button>
              ) : (
                <button
                  onClick={() => router.push("/admin-view")}
                  className="bg-brand font-bold rounded-xl px-3 py-1.5 text-xs uppercase tracking-wide text-white hover:bg-brand-dark transition-colors duration-200"
                >
                  Admin
                </button>
              )
            )}

            {/* Auth buttons */}
            {!isAuthUser ? (
              <Fragment>
                <button
                  onClick={() => router.push("/login")}
                  className="hidden sm:inline-block bg-white border-2 text-brand border-brand font-bold rounded-full px-4 py-1.5 text-xs uppercase tracking-wide hover:bg-brand hover:text-white transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="hidden sm:inline-block bg-brand font-bold rounded-full px-4 py-1.5 text-xs uppercase tracking-wide text-white hover:bg-brand-dark transition-colors duration-200"
                >
                  Sign Up
                </button>
              </Fragment>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                  aria-label="User menu"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 z-50 w-44 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg animate-fadeIn"
                  >
                    <a href="/account" role="menuitem" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-t-xl transition-colors duration-150">
                      Profile
                    </a>
                    <a href="/orders" role="menuitem" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                      Orders
                    </a>
                    <button
                      role="menuitem"
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl transition-colors duration-150"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              className="inline-flex items-center p-1.5 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand transition-colors duration-150"
              aria-controls="navbar-sticky"
              aria-expanded={showNavModal}
              aria-label="Open main menu"
              onClick={() => setShowNavModal(true)}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
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
            currentPath={pathName}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
