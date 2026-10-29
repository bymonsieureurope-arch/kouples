import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    // Keep full type checking through the compiler API in restricted cloud shells.
    useTypeScriptCli: false,
  },
};
export default nextConfig;
