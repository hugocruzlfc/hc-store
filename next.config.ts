import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
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
