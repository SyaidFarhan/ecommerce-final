"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const { isAuthUser } =
    useContext(GlobalContext);

  const router = useRouter();

  console.log(formData);

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  console.log(isFormValid());

  async function handleRegisterOnSubmit() {
    setIsLoading(true);
    setStatusMessage({ type: "", text: "" });
    try {
      const data = await registerNewUser(formData);

      if (data.success) {
        setStatusMessage({
          type: "success",
          text: "Account created! You can now login.",
        });
        toast.success("Account created!");
        setIsRegistered(true);
        setFormData(initialFormData);
      } else {
        setStatusMessage({
          type: "error",
          text: data.message || "Registration failed. Please try again.",
        });
        toast.error(data.message || "Registration failed");
      }

      console.log(data);
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#A02F58] mb-6 sm:mb-8">
            {isRegistered ? "Registration Successful! 🎉" : "Create Account"}
          </h1>
          
          {isRegistered ? (
            <div className="space-y-4">
              <p className="text-center text-gray-600 text-sm sm:text-base">
                Your account has been created successfully. Please log in to continue.
              </p>
              <button
                className="w-full px-4 py-3 font-semibold text-white bg-[#A02F58] rounded-full hover:bg-[#8a234a] transition duration-200"
                onClick={() => router.push("/login")}
              >
                Go to Login
              </button>
            </div>
          ) : (
            <>
              {statusMessage.text && (
                <div
                  className={`mb-4 p-4 rounded-lg font-semibold text-center ${
                    statusMessage.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}
              <form className="space-y-4 sm:space-y-5" onSubmit={(e) => {
                e.preventDefault();
                handleRegisterOnSubmit();
              }}>
              {registrationFormControls.map((controlItem) =>
                controlItem.componentType === "input" ? (
                  <InputComponent
                    key={controlItem.id}
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    label={controlItem.label}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [controlItem.id]: event.target.value,
                      });
                    }}
                    value={formData[controlItem.id]}
                  />
                ) : controlItem.componentType === "select" ? (
                  <SelectComponent
                    key={controlItem.id}
                    options={controlItem.options}
                    label={controlItem.label}
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
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? (
                  <ComponentLevelLoader
                    text="Creating Account..."
                    color="#ffffff"
                    loading={isLoading}
                  />
                ) : (
                  "Register"
                )}
              </button>
            </form>
            </>
          )}
          
          {!isRegistered && (
            <p className="pt-4 text-center text-gray-600 text-sm sm:text-base">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="font-semibold text-[#A02F58] hover:text-[#8a234a] transition"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
