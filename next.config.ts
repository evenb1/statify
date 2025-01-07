import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co'], // Add the Spotify image domain here
  },
};

export default nextConfig;
