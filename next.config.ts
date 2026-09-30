import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    browserToTerminal: true,
  },
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
