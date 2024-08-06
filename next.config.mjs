/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dcr74a84gl00d.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

  
  export default nextConfig;
  