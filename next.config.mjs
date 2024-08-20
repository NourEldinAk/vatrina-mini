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
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    // STRAPI_TOKEN: process.env.STRAPI_TOKEN
},
};

  
  export default nextConfig;
  