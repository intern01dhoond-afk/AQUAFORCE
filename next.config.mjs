import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/aquaforceforautocare",
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/aquaforceforautocare",
        basePath: false,
        permanent: false,
      },
      {
        source: "/:path((?!aquaforceforautocare|_next|favicon.ico).*)",
        destination: "/aquaforceforautocare/:path*",
        basePath: false,
        permanent: false,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
