/** @type {import('next').NextConfig} */
const nextConfig = {  
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['community.akamai.steamstatic.com']
  }
}
export default nextConfig;
