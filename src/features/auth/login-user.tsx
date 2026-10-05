"use client";

import Link from "next/link";
import { useAuthFlow } from "./hooks/use-auth-flow";

export default function LoginUser() {
  const { step, emailForm, otpForm, handleRequestOtp, handleSubmitToken } =
    useAuthFlow();

  if (step === "otp") {
    return (
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

          <form
            onSubmit={otpForm.handleSubmit(handleSubmitToken)}
            className="flex w-full max-w-md flex-col gap-3 px-4 sm:px-0"
          >
            <input
              aria-label="Token"
              placeholder="Enter Token"
              className="w-full rounded-lg bg-white px-4 py-3 text-black placeholder-gray-400 shadow-sm transition-all duration-200"
              type="text"
              {...otpForm.register("token")}
            />
            {otpForm.formState.errors.token && (
              <p className="text-sm text-red-400">
                {otpForm.formState.errors.token.message}
              </p>
            )}

            <button
              className="mt-2 rounded-lg bg-[#043033] px-3 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={otpForm.formState.isSubmitting}
            >
              {otpForm.formState.isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-black">
      <section className="flex h-screen w-full flex-col items-center justify-center gap-6 px-4 text-white">
        <Link href="/">
          <h1 className="text-center text-4xl font-bold">HC Store</h1>
        </Link>

        <h1 className="text-center text-2xl font-bold max-md:text-xl md:text-2xl">
          Please Provide Your Email
        </h1>

        <form
          onSubmit={emailForm.handleSubmit(handleRequestOtp)}
          className="flex w-full max-w-150 flex-col gap-4"
        >
          <input
            placeholder="Your Email"
            type="email"
            id="Email"
            className="w-full rounded-lg bg-white px-4 py-3 text-black placeholder-gray-400 shadow-sm transition-all duration-200"
            {...emailForm.register("email")}
          />
          {emailForm.formState.errors.email && (
            <p className="text-sm text-red-400">
              {emailForm.formState.errors.email.message}
            </p>
          )}

          <button
            className="mt-4 rounded-lg bg-[#043033] px-3 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={emailForm.formState.isSubmitting}
          >
            {emailForm.formState.isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="align-center flex flex-row justify-center text-white">
          <p>We sign you up if you don&apos;t have an account? </p>
        </div>
      </section>
    </div>
  );
}
