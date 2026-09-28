import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-start justify-center gap-10 border-b border-gray-500/30 bg-black px-6 py-14 text-white md:flex-row md:px-16 lg:px-32">
        <div className="w-4/5">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold text-[#fce3c7]">HC Store</h1>
          </Link>
          <p className="mt-6 text-sm">
            We are dedicated to providing the best service possible. Our team is
            committed to ensuring your satisfaction with every interaction. If
            you have any questions or concerns, please don&apos;t hesitate to
            reach out to us. We are here to help and will do our best to address
            any issues you may have. Thank you for choosing us, and we look
            forward to serving you again in the future.
          </p>
        </div>

        <div className="flex w-1/2 items-center justify-start md:justify-center">
          <div>
            <h2 className="mb-5 font-medium text-[#fce3c7]">Company</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="transition hover:underline" href="/">
                  Home
                </Link>
              </li>

              <li>
                <Link className="transition hover:underline" href="/about">
                  About us
                </Link>
              </li>

              <li>
                <Link className="transition hover:underline" href="/contact">
                  Contact us
                </Link>
              </li>

              <li>
                <Link className="transition hover:underline" href="/privacy">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-1/2 items-start justify-start md:justify-center">
          <div>
            <h2 className="mb-5 font-medium text-[#fce3c7]">Get in touch</h2>
            <div className="space-y-2 text-sm">
              <p>+34673528106</p>
              <p>contact@hcstore.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="bg-black py-4 text-center text-xs text-white md:text-sm">
        Copyright 2026 © Hug Cruz All Rights Reserved.
      </p>
    </footer>
  );
}
