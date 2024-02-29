/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-data.line.me",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
