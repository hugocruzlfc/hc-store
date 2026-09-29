import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qshhhieknqiqddpswzjx.supabase.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
