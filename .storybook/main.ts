import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs-vite",
  // The TypeScript-aware parser expands option types such as BadgeTone into
  // their values, so each one becomes a live control in the Controls panel.
  typescript: { reactDocgen: "react-docgen-typescript" },
  // Next.js compiles Tailwind through Turbopack; Storybook runs on Vite and
  // needs the Vite flavour of the same plugin to read globals.css tokens.
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    return viteConfig;
  },
};

export default config;
