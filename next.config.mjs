import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/aquaforceforautocare",
        destination: "/",
      },
      {
        source: "/aquaforceforautocare/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
