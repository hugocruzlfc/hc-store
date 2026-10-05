"use client";

import { emailValidationSchema } from "@/lib/schema-validations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { login, verifyToken } from "../actions/auth-action";
import { useAppContext } from "../context/app-context";

const otpSchema = z.object({
  token: z.string().trim().min(1, "Please enter the token from your email"),
});

export type EmailFormValues = {
  email: string;
};

export type TokenFormValues = {
  token: string;
};

export function useAuthFlow() {
  const router = useRouter();
  const { setSession } = useAppContext();
  const [step, setStep] = useState<"email" | "otp">("email");

  const emailForm = useForm<EmailFormValues>({
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const otpForm = useForm<TokenFormValues>({
    defaultValues: {
      token: "",
    },
    mode: "onSubmit",
  });

  const handleRequestOtp = async (values: EmailFormValues) => {
    const emailValidation = emailValidationSchema.safeParse({
      email: values.email,
    });

    if (!emailValidation.success) {
      emailForm.setError("email", {
        type: "manual",
        message: "Please enter a valid email address",
      });
      return;
    }

    const formData = new FormData();
    formData.append("email", values.email);

    const loginUser = await login(formData);

    if (loginUser?.error) {
      toast.error(loginUser.error);
      return;
    }

    setStep("otp");
    toast.success("Check your email for the login link!");
  };

  const handleSubmitToken = async (values: TokenFormValues) => {
    const parsedToken = otpSchema.safeParse(values);

    if (!parsedToken.success) {
      otpForm.setError("token", {
        type: "manual",
        message: parsedToken.error.issues[0]?.message ?? "Invalid token",
      });
      return;
    }

    const formData = new FormData();
    formData.append("email", emailForm.getValues("email"));
    formData.append("token", values.token.trim());

    const otpVerification = await verifyToken(formData);

    if (otpVerification?.error) {
      toast.error(otpVerification.error);
      return;
    }

    if (otpVerification?.session) {
      setSession(otpVerification.session);
      toast.success("You are now logged in!");
      router.push("/");
    }
  };

  return {
    step,
    emailForm,
    otpForm,
    handleRequestOtp,
    handleSubmitToken,
  };
}
