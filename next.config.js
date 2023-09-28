module.exports = {
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY: 'https://api-dev-minimal-v4.vercel.app',
  },
  images: {
    domains: ['unicef.xa.rahat.io', 'live.staticflickr.com'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
//   register: true,
//   scope: '/',
//   sw: 'service-worker.js',
// });

// module.exports = withPWA({
//   swcMinify: false,
//   trailingSlash: true,
//   env: {
//     // HOST
//   },
//   images: {
//     domains: ['unicef.xa.rahat.io', 'live.staticflickr.com'],
//   },
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
// });
