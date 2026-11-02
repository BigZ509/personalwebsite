import type { NextConfig } from "next";

const config: NextConfig = {
  allowedDevOrigins: ["192.168.1.28"],
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default config;
