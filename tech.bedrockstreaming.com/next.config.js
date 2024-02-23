const withYAML = require("next-yaml");
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};
module.exports = withYAML();
