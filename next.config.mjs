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
        source: "/:path((?!aquaforceforautocare|aquaforceforgigworkers|_next|favicon.ico).*)",
        destination: "/aquaforceforautocare/:path*",
        basePath: false,
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/aquaforceforgigworkers",
          destination: "https://gig-workers-aquaforce.vercel.app/aquaforceforgigworkers",
          basePath: false,
        },
        {
          source: "/aquaforceforgigworkers/:path*",
          destination: "https://gig-workers-aquaforce.vercel.app/aquaforceforgigworkers/:path*",
          basePath: false,
        },
      ],
    };
  },
  images: {
    unoptimized: true,
    qualities: [75, 100],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
