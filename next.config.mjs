/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "zos.alipayobjects.com"],
  },
};

export default nextConfig;
