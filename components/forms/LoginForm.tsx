"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { authenticateUser } from "@/lib/functions/authenticateUser";

const LoginForm = () => {
  const [loginFormData, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [reqErrorMessage, setReqErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isFormInvalid =
    !loginFormData.email.trim() || !loginFormData.password.trim();

  const handleAction = async (event: React.SubmitEvent) => {
    event.preventDefault();
    setReqErrorMessage("");
    setIsLoading(true);
    const response = await authenticateUser(loginFormData);

    if (response.success) {
      setLoginForm({
        email: "",
        password: "",
      });
      router.push("/dashboard");
    } else {
      setReqErrorMessage(response.error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleAction}>
        <div className="w-full flex flex-col gap-1 ">
          <label className="font-semibold leading-6">Email</label>
          <input
            type="email"
            name="email"
            id="user-email"
            disabled={isLoading}
            value={loginFormData.email}
            onChange={(e) =>
              setLoginForm({ ...loginFormData, email: e.target.value })
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
            value={loginFormData.password}
            onChange={(e) =>
              setLoginForm({ ...loginFormData, password: e.target.value })
            }
            className="w-full h-10 px-3 py-1"
            placeholder="******"
          />
        </div>

        {reqErrorMessage && (
          <p style={{ color: "red", fontSize: "12px", margin: 0 }}>
            {reqErrorMessage}
          </p>
        )}

        <div className="flex flex-col gap-4">
          {/* isDisabled={isFormInvalid || isLoading} */}
          <Button type="submit" variant={"default"} className={"px-3 py-5"}>
            {isLoading ? "Signing user..." : "Sign in"}
          </Button>
          <p className="text-md">
            Don’t have an account?{" "}
            <Link href={"/signup"}>
              <span className="font-bold text-primary-500 underline">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
