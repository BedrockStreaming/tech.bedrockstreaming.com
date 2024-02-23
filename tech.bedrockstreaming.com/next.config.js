const withYAML = require("next-yaml");
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};
module.exports = withYAML(nextConfig);
