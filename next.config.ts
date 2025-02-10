import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    //! https://linked-posts.routemisr.com/uploads/default-profile.png
    //* bnakhod link el sora we bn3ml el hagat bta3tha
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linked-posts.routemisr.com',
        port: '',
        pathname: '/uploads/**',
        search: '',
      },
    ],
  },};

export default nextConfig;
