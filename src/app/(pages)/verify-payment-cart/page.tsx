import { checkOrder } from "@/features/orders/actions/order";
import VerifyPayCart from "@/features/verify-pay/verify-pay-cart";
import { env } from "@/lib/env/client";
import { redirect } from "next/navigation";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function VerifyPaymentPageCart({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { reference } = await searchParams;

  const orderExist = await checkOrder(reference);

  if (orderExist && orderExist.length > 0) {
    redirect("/");
  }

  const response = await fetch(
    `${env.NEXT_PUBLIC_SITE_URL}/api/verify-payment/${reference}`,
  );

  const result = await response.json();
  console.log("Payment Verification Result:", result);

  return (
    <VerifyPayCart
      reference={reference}
      amount={result.data.amount}
      email={result.data.customer.email}
    />
  );
}
