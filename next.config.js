/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'utfs.io'],
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'utfs.io',
      port: ''
    }
  ],
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
