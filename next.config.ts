import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: '/creohold-web-wonder',
  assetPrefix: '/creohold-web-wonder/',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
