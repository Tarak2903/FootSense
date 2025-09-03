/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          
  images: {
    unoptimized: true,      
  },
  basePath: "/FootSense",
  assetPrefix: "/FootSense/",
};

export default nextConfig;
