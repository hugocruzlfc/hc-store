"use client";

import { createOrder } from "@/features/orders/actions/order";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface VerifyPayProps {
  reference: string;
  amount: number;
  email: string;
}

export default function VerifyPayCart({
  reference,
  amount,
  email,
}: VerifyPayProps) {
  useEffect(() => {
    const paymentInfo = JSON.parse(
      localStorage.getItem("paymentInformation") || "{}",
    );

    if (paymentInfo.amount !== amount || paymentInfo.userEmail !== email) {
      toast.error("Payment Verification Error");
      return;
    }

    toast.success("Payment Verified Successfully");

    const makeOrder = async () => {
      for (const eachItem of paymentInfo.items) {
        const orderItem = {
          user_id: paymentInfo.userId,
          amount: paymentInfo.amount,
          user_email: paymentInfo.userEmail,
          productName: eachItem.name,
          quantity: eachItem.quantity,
          productCategory: eachItem.category.name,
          productImage: eachItem.image_url_array[0],
          address: paymentInfo.fullAddressFields,
          paymentReference: reference,
        };

        await createOrder(orderItem);
      }
    };

    makeOrder();
  }, [amount, email, reference]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              Payment
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Verifying payment
            </h1>
          </div>

          <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-emerald-700 uppercase">
            Active
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">Reference</span>
            <span className="font-medium text-slate-800">{reference}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">Amount</span>
            <span className="font-medium text-slate-800">{amount}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">Customer</span>
            <span className="font-medium text-slate-800">{email}</span>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/orders"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-[#fce3c7] transition hover:bg-slate-700"
          >
            Go to orders
          </Link>
        </div>
      </div>
    </div>
  );
}
