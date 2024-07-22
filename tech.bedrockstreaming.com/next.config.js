const withYAML = require("next-yaml");
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: ["@mdx-js/loader"],
    });
    return config;
  },
};
module.exports = withYAML(nextConfig);
