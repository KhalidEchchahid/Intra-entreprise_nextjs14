/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET:"hNvYJxherm9EBhejiCijk9pWzWi3dvn4sQ/hxORTMho="
    ,
  },
  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = nextConfig;
