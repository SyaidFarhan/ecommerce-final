"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
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
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormdata);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
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
    <div className="relative bg-white">
      <div className="flex flex-col items-center justify-between w-full pt-0 pb-0 mt-8 mb-8 xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="relative w-full max-w-2xl mt-10 mb-0 ml-0 mr-0 lg:flex-row lg:mt-0">
            <div className="relative flex flex-col items-center justify-start pt-10 pb-10 pl-10 pr-10 bg-white shadow-xl rounded-xl">
              <p className="w-full font-sans text-3xl font-bold text-center text-pink-700">
                Login
              </p>
              <div className="relative w-full mt-6 mb-0 ml-0 mr-0 space-y-6">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
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
              </div>
              <button
                className="w-[45vw] px-4 py-2 mt-4 font-medium text-white bg-pink-600 rounded-full hover:bg-pink-700"
                disabled={!isValidForm()}
                onClick={handleLogin}
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text="Logging in..."
                    color="#ffffff"
                    loading={componentLevelLoader && componentLevelLoader.loading}
                  />
                ) : (
                  "Login"
                )}
              </button>
              <p className="pt-2 text-black">
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={() => router.push("/register")}
                  className="font-medium text-pink-600 hover:text-pink-700"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
