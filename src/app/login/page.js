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
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  function isValidForm() {
    return formData?.email?.trim() !== "" && formData?.password?.trim() !== "";
  }

  async function handleLogin() {
    setComponentLevelLoader({ loading: true, id: "" });
    setStatusMessage({ type: "", text: "" });
    try {
      const res = await login(formData);

      if (res.success) {
        setStatusMessage({ type: "success", text: "Login successful! Redirecting..." });
        toast.success("Login successful!");
        setIsAuthUser(true);
        setUser(res?.finalData?.user);
        setFormData(initialFormdata);
        Cookies.set("token", res?.finalData?.token);
        localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
        setTimeout(() => router.push("/"), 500);
      } else {
        setStatusMessage({ type: "error", text: res.message || "Wrong email or password. Try again." });
        toast.error(res.message || "Wrong email or password");
        setIsAuthUser(false);
      }
    } catch (error) {
      setStatusMessage({ type: "error", text: "Something went wrong. Please try again." });
      toast.error("Something went wrong");
      setIsAuthUser(false);
    } finally {
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="p-6 sm:p-8 bg-white shadow-sm rounded-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-brand font-heading">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Sign in to your Elysian account</p>
          </div>

          {statusMessage.text && (
            <div
              role="alert"
              className={`mb-5 p-3.5 rounded-xl text-sm font-medium text-center ${
                statusMessage.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <form
            className="space-y-5"
            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            noValidate
          >
            {loginFormControls.map((controlItem) =>
              controlItem.componentType === "input" ? (
                controlItem.type === "password" ? (
                  <div key={controlItem.id} className="relative">
                    <InputComponent
                      id={controlItem.id}
                      type={showPassword ? "text" : "password"}
                      label={controlItem.label}
                      placeholder={controlItem.placeholder}
                      autocomplete="current-password"
                      onChange={(e) => setFormData({ ...formData, [controlItem.id]: e.target.value })}
                      value={formData[controlItem.id]}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                ) : (
                  <InputComponent
                    key={controlItem.id}
                    id={controlItem.id}
                    type={controlItem.type}
                    label={controlItem.label}
                    placeholder={controlItem.placeholder}
                    autocomplete={controlItem.type === "email" ? "email" : "on"}
                    onChange={(e) => setFormData({ ...formData, [controlItem.id]: e.target.value })}
                    value={formData[controlItem.id]}
                  />
                )
              ) : null
            )}

            <button
              type="submit"
              className="w-full px-4 py-3 mt-2 font-semibold text-white bg-brand rounded-xl hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
              disabled={!isValidForm() || componentLevelLoader?.loading}
            >
              {componentLevelLoader?.loading ? (
                <ComponentLevelLoader text="Signing in..." color="#ffffff" loading={true} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="font-semibold text-brand hover:text-brand-dark transition-colors duration-150"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
