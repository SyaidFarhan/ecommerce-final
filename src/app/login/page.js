"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { login } from "@/services/login";
import { loginFormControls } from "@/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormdata = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormdata);
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  console.log(formData);

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await login(formData);

    console.log(res);

    if (res.success) {
      toast.success(res.message, {
        position: "top-right",
      });
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormdata);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: "" });
      setTimeout(() => router.push("/"), 500);
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  console.log(isAuthUser, user);

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-white sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="p-6 bg-white shadow-lg rounded-2xl sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#A02F58] mb-6 sm:mb-8">
            Login
          </h1>
          
          <form className="mb-6 space-y-4 sm:space-y-5" onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}>
            {loginFormControls.map((controlItem) =>
              controlItem.componentType === "input" ? (
                <InputComponent
                  key={controlItem.id}
                  type={controlItem.type}
                  label={controlItem.label}
                  placeholder={controlItem.placeholder}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                  value={formData[controlItem.id]}
                />
              ) : null
            )}
          
            <button
              type="submit"
              className="w-full px-4 py-3 mt-6 font-semibold text-white bg-[#A02F58] rounded-full hover:bg-[#8a234a] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              disabled={!isValidForm() || (componentLevelLoader?.loading)}
            >
              {componentLevelLoader && componentLevelLoader.loading ? (
                <ComponentLevelLoader
                  text="Logging in..."
                  color="#ffffff"
                  loading={componentLevelLoader?.loading}
                />
              ) : (
                "Login"
              )}
            </button>
          </form>
          
          <p className="pt-4 text-sm text-center text-gray-600 sm:text-base">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="font-semibold text-[#A02F58] hover:text-[#8a234a] transition"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
