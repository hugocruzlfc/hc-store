"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { emailValidationSchema } from "@/lib/schema-validations";
import { useState } from "react";
import toast from "react-hot-toast";
import { login, verifyToken } from "./actions/auth-action";
import { useAppContext } from "./context/app-context";

export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenPart, setTokenPart] = useState(false);
  const [token, setToken] = useState("");
  const { setSession } = useAppContext();
  const router = useRouter();

  const handleLogin = async () => {
    //Check the email and proceed with login or signup

    try {
      setLoading(true);
      const emailCheck = emailValidationSchema.safeParse({ email });
      if (!emailCheck.success) {
        toast.error("Please enter a valid email address");
        return;
      }

      toast.success("Please check email for OTP");
      const formData = new FormData();
      formData.append("email", email);

      const loginUser = await login(formData);

      if (loginUser?.error) {
        toast.error(loginUser.error);
        return;
      }
      setTokenPart(true);
      toast.success("Check your email for the login link!");
      //direct the user to authenticate with the otp
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitToken = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("token", token);
      const otpVerification = await verifyToken(formData);

      if (otpVerification?.error) {
        toast.error(otpVerification.error);
        return;
      }
      if (otpVerification?.session) {
        toast.success("You are now logged in!");
        setSession(otpVerification.session);
        router.push("/");
      }

      // You can redirect the user to the dashboard or home page after successful login
    } catch (error) {
      console.error("Error submitting token:", error);
    } finally {
      setLoading(false);
    }
  };

  return tokenPart ? (
    <div className="bg-black">
      <section className="mx-auto flex h-screen w-[80%] flex-col items-center justify-center gap-4 pt-10 text-white">
        <div className="self-center">
          <h1 className="mb-4 text-4xl font-bold max-md:text-xl">
            Token From Your Email
          </h1>
          <p className="text-center text-lg text-slate-500 max-md:text-sm md:text-2xl">
            Check the junk/spam mailbox too.
          </p>
        </div>

        <div className="px-4 sm:px-0">
          <input
            aria-label="Token"
            placeholder="Enter Token"
            className="w-full rounded-lg bg-white px-4 py-3 text-black placeholder-gray-400 shadow-sm transition-all duration-200"
            name="token"
            type="text"
            onChange={(e) => setToken(e.target.value)}
          />

          <button
            onClick={handleSubmitToken}
            className="mt-4 rounded-lg bg-[#043033] px-3 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 focus:outline-none"
            type="button"
          >
            {loading ? "submitting" : "Submit"}
          </button>
        </div>
      </section>
    </div>
  ) : (
    <div className="bg-black">
      <section className="flex h-screen w-full flex-col items-center justify-center gap-6 px-4 text-white">
        {/* Logo */}
        <Link href={"/"}>
          <h1 className="text-center text-4xl font-bold">HC Store</h1>
        </Link>

        {/* Heading */}
        <h1 className="text-center text-2xl font-bold max-md:text-xl md:text-2xl">
          Please Provide Your Email
        </h1>

        {/* Input + Button */}
        <div className="flex w-full max-w-150 flex-col gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            name="email"
            type="email"
            id="Email"
            className="w-full rounded-lg bg-white px-4 py-3 text-black placeholder-gray-400 shadow-sm transition-all duration-200"
          />
        </div>
        <button
          onClick={handleLogin}
          className="mt-4 rounded-lg bg-[#043033] px-3 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 focus:outline-none"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div className="align-center flex flex-row justify-center text-white">
          <p className="">We sign you up if you don&apos;t have an account? </p>
        </div>
      </section>
    </div>
  );
}
