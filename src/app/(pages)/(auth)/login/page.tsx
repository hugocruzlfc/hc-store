import LoginUser from "@/features/auth/login-user";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return <LoginUser />;
}
