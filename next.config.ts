import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AGENTS.md already points agents at the version-matched docs in
  // node_modules/next/dist/docs, so stop next dev re-adding its own block there.
  agentRules: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
