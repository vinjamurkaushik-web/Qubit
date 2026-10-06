import type { NextConfig } from "next";

// GitHub Pages serves a project site from /<repo-name>/. The deploy workflow
// sets BASE_PATH for its build; local builds leave it unset (served from "/").
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
