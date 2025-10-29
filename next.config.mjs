/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    // Ensure webpack treats async functions as available in the target environment
    config.output = config.output || {};
    config.output.environment = {
      ...(config.output.environment || {}),
      asyncFunction: true,
    };
    return config;
  },
};

export default nextConfig;