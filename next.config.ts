import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    formats: ["image/webp", "image/avif"],
  },
  compress: true,
  poweredByHeader: false,
  allowedDevOrigins: [
    "mdmy3c-3001.csb.app",
    "*.csb.app",
    "localhost:3000",
    "localhost:3001",
    "127.0.0.1:3000",
    "127.0.0.1:3001",
  ],
};

let finalConfig = nextConfig;

if (process.env.ANALYZE === "true") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const withBundleAnalyzer = require("@next/bundle-analyzer")({
      enabled: true,
      openAnalyzer: true,
    });
    finalConfig = withBundleAnalyzer(nextConfig);
  } catch {
    console.warn("Bundle analyzer not available, skipping...");
  }
}

export default finalConfig;
