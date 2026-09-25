"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { register } from "@/lib/functions/register";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [signupFormData, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [reqErrorMessage, setReqErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isPasswordMatch = signupFormData.password === confirmPassword;

  const isFormInvalid =
    !signupFormData.name.trim() ||
    !signupFormData.email.trim() ||
    !signupFormData.password.trim() ||
    !isPasswordMatch;

  const handleAction = async (event: React.SubmitEvent) => {
    event.preventDefault();
    setReqErrorMessage("");
    setIsLoading(true);
    const response = await register(signupFormData);

    if (response.success) {
      Object.entries(response.data.tokens).forEach(([key, value]: any) => {
        localStorage.setItem(key, value);
      });
      setSignupForm({
        name: "",
        email: "",
        password: "",
      });
      setConfirmPassword("");
      router.push("/dashboard");
    } else {
      setReqErrorMessage(response.error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleAction}>
        <div className="w-full flex flex-col gap-1">
          <label className="font-semibold leading-6">User Name</label>
          <input
            type="text"
            name="userName"
            id="user-name"
            value={signupFormData.name}
            disabled={isLoading}
            onChange={(e) =>
              setSignupForm({ ...signupFormData, name: e.target.value })
            }
            className="w-full h-10 px-3 py-1"
            placeholder="Edwin Rodger"
          />
        </div>
        <div className="w-full flex flex-col gap-1 ">
          <label className="font-semibold leading-6">Email</label>
          <input
            type="email"
            name="email"
            id="user-email"
            disabled={isLoading}
            value={signupFormData.email}
            onChange={(e) =>
              setSignupForm({ ...signupFormData, email: e.target.value })
            }
            className="w-full h-10 px-3 py-1"
            placeholder="your@email.com"
          />
        </div>
        <div className="w-full flex flex-col gap-1 ">
          <label className="font-semibold leading-6">Password</label>
          <input
            type="password"
            name="password"
            id="user-password"
            disabled={isLoading}
            value={signupFormData.password}
            onChange={(e) =>
              setSignupForm({ ...signupFormData, password: e.target.value })
            }
            className="w-full h-10 px-3 py-1"
            placeholder="******"
          />
        </div>
        <div className="w-full flex flex-col gap-1 ">
          <label className="font-semibold leading-6">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="user-confirm-password"
            value={confirmPassword}
            disabled={isLoading}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-10 px-3 py-1"
            placeholder="*******"
          />
        </div>
        {confirmPassword && !isPasswordMatch && (
          <p style={{ color: "red", fontSize: "12px", margin: 0 }}>
            Passwords do not match
          </p>
        )}
        {reqErrorMessage && (
          <p style={{ color: "red", fontSize: "12px", margin: 0 }}>
            {reqErrorMessage}
          </p>
        )}

        <div className="flex flex-col gap-4">
          {/* isDisabled={isFormInvalid || isLoading} */}
          <Button type="submit" variant={"default"} className={"px-2 py-4"}>
            {isLoading ? "Creating user..." : "Sign up"}
          </Button>
          <p className="text-md">
            Already have an account?{" "}
            <Link href={"/login"}>
              <span className="font-bold text-primary-500 underline">
                Sign in
              </span>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
